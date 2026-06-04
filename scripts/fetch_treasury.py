#!/usr/bin/env python3
# Treasury Rate-Risk Dashboard — FRED data fetch & transform
# Sources (all public, no API key required):
#   https://fred.stlouisfed.org/graph/fredgraph.csv?id=DGS3MO
#   https://fred.stlouisfed.org/graph/fredgraph.csv?id=DGS2
#   https://fred.stlouisfed.org/graph/fredgraph.csv?id=DGS5
#   https://fred.stlouisfed.org/graph/fredgraph.csv?id=DGS10
#   https://fred.stlouisfed.org/graph/fredgraph.csv?id=DGS30
# Retrieved: 2026-06-04
# Run: python3 scripts/fetch_treasury.py

import json
import math
import urllib.request
from pathlib import Path

import numpy as np
import pandas as pd
from scipy import stats

RAW_DIR  = Path("src/assets/data/raw")
PROC_DIR = Path("src/assets/data/processed")

SERIES = {
    "3M":  "DGS3MO",
    "2Y":  "DGS2",
    "5Y":  "DGS5",
    "10Y": "DGS10",
    "30Y": "DGS30",
}

FRED_BASE = "https://fred.stlouisfed.org/graph/fredgraph.csv?id="

MACRO_EVENTS = [
    ("1987-10", "Black Monday Era"),
    ("2008-09", "GFC"),
    ("2008-10", "GFC"),
    ("2020-03", "COVID Shock"),
    ("2022-03", "Fed Hiking Cycle"),
    ("2022-06", "Fed Hiking Cycle"),
    ("2022-09", "Fed Hiking Cycle"),
    ("2022-12", "Fed Hiking Cycle"),
    ("2023-03", "Fed Hiking Cycle"),
]

TRADING_DAYS = 252
Z_LEVELS = {0.95: 1.6449, 0.99: 2.3263, 0.999: 3.0902}


# ─── Download ────────────────────────────────────────────────────────────────

def download_series(mat: str, series_id: str) -> pd.Series:
    url = FRED_BASE + series_id
    raw_path = RAW_DIR / f"{series_id}.csv"
    if raw_path.exists():
        print(f"  {series_id}: using cached {raw_path}")
    else:
        print(f"  {series_id}: downloading...")
        urllib.request.urlretrieve(url, raw_path)
        print(f"  {series_id}: saved to {raw_path}")

    df = pd.read_csv(raw_path, na_values=[".", ""])
    df.columns = ["date", "yield"]
    df["date"] = pd.to_datetime(df["date"])
    df = df.set_index("date").sort_index()
    return df["yield"]


# ─── Normal distribution helpers ─────────────────────────────────────────────

def normal_survival(k: float) -> float:
    """Two-tailed: P(|Z| > k)."""
    return 2 * (1 - stats.norm.cdf(k))


# ─── Per-maturity transform ───────────────────────────────────────────────────

def process_maturity(mat: str, series_id: str, yields: pd.Series):
    # Drop DGS30 structural gap (Feb 2002 – Feb 2006) without interpolation
    if mat == "30Y":
        gap_mask = (yields.index >= "2002-02-01") & (yields.index <= "2006-02-08")
        yields = yields.copy()
        yields[gap_mask] = np.nan

    # Valid yield observations only
    yields_valid = yields.dropna()

    for metric in ("bps", "log"):
        # Compute daily changes — skip any pair where either side is null
        if metric == "bps":
            deltas = (yields_valid.diff() * 100).dropna()
        else:
            log_yields = np.log(yields_valid)
            deltas = log_yields.diff().dropna()
            # Guard: skip steps where prior yield was 0 or negative (shouldn't occur in treasuries)
            deltas = deltas[np.isfinite(deltas)]

        deltas = deltas.dropna()
        n = len(deltas)
        if n < 30:
            print(f"  WARNING: {mat}/{metric} only {n} observations — skipping")
            continue

        arr = deltas.values
        mu = float(np.mean(arr))
        sigma = float(np.std(arr, ddof=1))
        skew = float(stats.skew(arr))
        ex_kurt = float(stats.kurtosis(arr))  # excess kurtosis (Fisher definition)
        mn = float(np.min(arr))
        mx = float(np.max(arr))
        mn_date = deltas.idxmin().strftime("%Y-%m-%d")
        mx_date = deltas.idxmax().strftime("%Y-%m-%d")

        # VaR thresholds under normal assumption: μ ± z·σ
        var_thresholds = {
            str(int(cl * 100)): {
                "z": z,
                "var_loss": mu - z * sigma,
                "var_gain": mu + z * sigma,
            }
            for cl, z in Z_LEVELS.items()
        }

        # Sigma band analysis k = 1..8
        sigma_bands = []
        for k in range(1, 9):
            p_two_tail = normal_survival(k)
            exp_count  = n * p_two_tail
            years_between = (1.0 / (TRADING_DAYS * p_two_tail)) if p_two_tail > 0 else float("inf")
            std_deltas = np.abs((arr - mu) / sigma)
            actual_count = int(np.sum(std_deltas > k))
            sigma_bands.append({
                "k": k,
                "expected_count_normal": round(exp_count, 4),
                "actual_count": actual_count,
                "expected_years_between": round(years_between, 1),
            })

        # Date range
        date_start = deltas.index.min().strftime("%Y-%m-%d")
        date_end   = deltas.index.max().strftime("%Y-%m-%d")

        stats_out = {
            "maturity": mat,
            "series_id": series_id,
            "metric": metric,
            "n": n,
            "date_start": date_start,
            "date_end": date_end,
            "mu": mu,
            "sigma": sigma,
            "skewness": skew,
            "excess_kurtosis": ex_kurt,
            "min": mn,
            "min_date": mn_date,
            "max": mx,
            "max_date": mx_date,
            "var_thresholds": var_thresholds,
            "sigma_bands": sigma_bands,
        }

        stats_path = PROC_DIR / f"stats_{mat}_{metric}.json"
        with open(stats_path, "w") as f:
            json.dump(stats_out, f, indent=2)
        print(f"    stats → {stats_path}")

        # ── Histogram ────────────────────────────────────────────────
        n_bins = 60
        counts, bin_edges = np.histogram(arr, bins=n_bins)
        bin_centers = 0.5 * (bin_edges[:-1] + bin_edges[1:])
        bin_width = bin_edges[1] - bin_edges[0]
        # Normal PDF scaled to histogram area
        normal_pdf = stats.norm.pdf(bin_centers, mu, sigma) * n * bin_width
        hist_df = pd.DataFrame({
            "bin_center": bin_centers,
            "count": counts,
            "normal_pdf_scaled": normal_pdf,
        })
        hist_path = PROC_DIR / f"histogram_{mat}_{metric}.csv"
        hist_df.to_csv(hist_path, index=False, float_format="%.6f")
        print(f"    histogram → {hist_path}")

        # ── Q-Q plot ─────────────────────────────────────────────────
        sorted_vals = np.sort(arr)
        standardized = (sorted_vals - mu) / sigma
        plotting_positions = (np.arange(1, n + 1) - 0.5) / n  # Filliben
        theoretical_quantiles = stats.norm.ppf(plotting_positions)
        qq_df = pd.DataFrame({
            "theoretical_quantile": theoretical_quantiles,
            "sample_quantile": standardized,
        })
        # Reference line endpoints (45° in standardized space)
        ref_min = float(theoretical_quantiles[0])
        ref_max = float(theoretical_quantiles[-1])
        qq_path = PROC_DIR / f"qq_{mat}_{metric}.csv"
        qq_df.to_csv(qq_path, index=False, float_format="%.6f")
        # Save ref line endpoints alongside
        ref_path = PROC_DIR / f"qq_ref_{mat}_{metric}.json"
        with open(ref_path, "w") as f:
            json.dump({"ref_min": ref_min, "ref_max": ref_max}, f)
        print(f"    qq → {qq_path}")

        # ── Sigma events (|delta − μ| ≥ 3σ) ─────────────────────────
        std_series = (deltas - mu) / sigma
        extreme = deltas[np.abs(std_series) >= 3.0]
        if len(extreme) == 0:
            events_df = pd.DataFrame(columns=["date", "delta", "sigma_distance", "direction", "macro_tag"])
        else:
            events_df = pd.DataFrame({
                "date": extreme.index.strftime("%Y-%m-%d"),
                "delta": extreme.values,
                "sigma_distance": std_series[extreme.index].values,
                "direction": np.where(extreme.values > 0, "up", "down"),
            })
            # Macro event tagging by date proximity (same month)
            def tag(date_str: str) -> str:
                ym = date_str[:7]
                for event_ym, label in MACRO_EVENTS:
                    if ym == event_ym:
                        return label
                return ""
            events_df["macro_tag"] = events_df["date"].apply(tag)
            events_df = events_df.sort_values("date")

        events_path = PROC_DIR / f"events_{mat}_{metric}.csv"
        events_df.to_csv(events_path, index=False, float_format="%.6f")
        print(f"    events → {events_path} ({len(events_df)} extreme days)")


# ─── Master stats summary (for the Angular service to load once) ─────────────

def build_master_stats():
    records = []
    for mat in SERIES:
        for metric in ("bps", "log"):
            p = PROC_DIR / f"stats_{mat}_{metric}.json"
            if p.exists():
                with open(p) as f:
                    records.append(json.load(f))
    out = PROC_DIR / "stats_all.json"
    with open(out, "w") as f:
        json.dump(records, f, indent=2)
    print(f"\nMaster stats → {out}")


# ─── Main ────────────────────────────────────────────────────────────────────

def main():
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    PROC_DIR.mkdir(parents=True, exist_ok=True)

    all_yields = {}
    print("Downloading FRED series...")
    for mat, sid in SERIES.items():
        s = download_series(mat, sid)
        all_yields[mat] = (sid, s)

    print("\nComputing transforms...")
    for mat, (sid, yields) in all_yields.items():
        print(f"  [{mat}] {sid}")
        process_maturity(mat, sid, yields)

    build_master_stats()
    print("\nDone.")


if __name__ == "__main__":
    main()
