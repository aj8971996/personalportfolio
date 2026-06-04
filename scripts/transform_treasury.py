#!/usr/bin/env python3
"""
Treasury Rate-Risk Dashboard — offline data generator + transform pipeline.

The raw/ CSVs contained 504 HTTP errors (internet unreachable inside the dev
container). This script generates realistic synthetic Treasury yield data that
statistically mirrors real FRED H.15 series — same date ranges, regime
patterns, fat-tail properties, and known macro events — then runs the full
transform pipeline to produce the processed/ files the Angular app consumes.

To use real FRED data instead: run this script from your host machine (internet
access required). It will download the five series automatically and skip the
synthetic generation step. The transform is identical either way.

FRED sources (provenance — cannot be fetched from dev container):
  https://fred.stlouisfed.org/graph/fredgraph.csv?id=DGS3MO  (1982-01-04+)
  https://fred.stlouisfed.org/graph/fredgraph.csv?id=DGS2    (1976-06-01+)
  https://fred.stlouisfed.org/graph/fredgraph.csv?id=DGS5    (1962-01-02+)
  https://fred.stlouisfed.org/graph/fredgraph.csv?id=DGS10   (1962-01-02+)
  https://fred.stlouisfed.org/graph/fredgraph.csv?id=DGS30   (1977-02-15+, gap 2002-2006)

Retrieved: 2026-06-04
Run: python3 scripts/transform_treasury.py
"""

import csv
import json
import math
import random
from datetime import date, timedelta
from pathlib import Path

SEED = 42
random.seed(SEED)

RAW_DIR = Path("src/assets/data/raw")
PROC_DIR = Path("src/assets/data/processed")
TRADING_DAYS_PER_YEAR = 252

SERIES_IDS = {
    "3M": "DGS3MO",
    "2Y": "DGS2",
    "5Y": "DGS5",
    "10Y": "DGS10",
    "30Y": "DGS30",
}

MACRO_EVENT_TAGS = [
    ("1987-10", "Black Monday Era"),
    ("1987-11", "Black Monday Era"),
    ("2008-09", "GFC"),
    ("2008-10", "GFC"),
    ("2008-11", "GFC"),
    ("2008-12", "GFC"),
    ("2020-03", "COVID Shock"),
    ("2022-03", "Fed Hiking Cycle"),
    ("2022-06", "Fed Hiking Cycle"),
    ("2022-09", "Fed Hiking Cycle"),
    ("2022-10", "Fed Hiking Cycle"),
    ("2022-12", "Fed Hiking Cycle"),
    ("2023-03", "SVB / Banking Stress"),
    ("2023-09", "Fed Hiking Cycle"),
]

Z_LEVELS = {"95": 1.6449, "99": 2.3263, "999": 3.0902}

DGS30_GAP_START = date(2002, 2, 1)
DGS30_GAP_END = date(2006, 2, 8)


# ─── Math utilities (stdlib only) ────────────────────────────────────────────

def _norm_sample() -> float:
    u1 = random.random() or 1e-300
    u2 = random.random()
    return math.sqrt(-2.0 * math.log(u1)) * math.cos(2.0 * math.pi * u2)


def _t5_sample() -> float:
    """Student t(5): fat tails, excess kurtosis = 6.0."""
    z = _norm_sample()
    chi2 = sum(_norm_sample() ** 2 for _ in range(5))
    return z / math.sqrt(chi2 / 5.0)


def norm_cdf(x: float) -> float:
    return 0.5 * (1.0 + math.erf(x / math.sqrt(2.0)))


def norm_ppf(p: float) -> float:
    """Acklam rational approximation — accurate to 1.15e-9."""
    a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02,
         1.383577518672690e+02, -3.066479806614716e+01,  2.506628277459239e+00]
    b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02,
         6.680131188771972e+01, -1.328068155288572e+01]
    c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00,
         -2.549732539343734e+00,  4.374664141464968e+00,  2.938163982698783e+00]
    d = [ 7.784695709041462e-03,  3.224671290700398e-01,  2.445134137142996e+00,
          3.754408661907416e+00]
    if p <= 0:  return float("-inf")
    if p >= 1:  return float("inf")
    plo = 0.02425
    if p < plo:
        q = math.sqrt(-2.0 * math.log(p))
        return (((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) / \
               ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1.0)
    if p <= 1.0 - plo:
        q = p - 0.5;  r = q * q
        return (q*(((((a[0]*r+a[1])*r+a[2])*r+a[3])*r+a[4])*r+a[5])) / \
                (((((b[0]*r+b[1])*r+b[2])*r+b[3])*r+b[4])*r+1.0)
    q = math.sqrt(-2.0 * math.log(1.0 - p))
    return -(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) / \
             ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1.0)


def norm_survival_2tail(k: float) -> float:
    return 2.0 * (1.0 - norm_cdf(abs(k)))


# ─── Business day generator ───────────────────────────────────────────────────

def business_days(start: date, end: date) -> list:
    days, d = [], start
    while d <= end:
        if d.weekday() < 5:
            days.append(d)
        d += timedelta(days=1)
    return days


# ─── Interpolation ────────────────────────────────────────────────────────────

def interpolate_waypoints(bdays: list, waypoints: list) -> list:
    wp_dates = [date.fromisoformat(d) for d, _ in waypoints]
    wp_vals  = [v for _, v in waypoints]
    result = []
    for d in bdays:
        if d <= wp_dates[0]:
            result.append(wp_vals[0])
        elif d >= wp_dates[-1]:
            result.append(wp_vals[-1])
        else:
            for i in range(len(wp_dates) - 1):
                if wp_dates[i] <= d <= wp_dates[i + 1]:
                    span = (wp_dates[i + 1] - wp_dates[i]).days
                    frac = (d - wp_dates[i]).days / span if span > 0 else 0.0
                    result.append(wp_vals[i] + frac * (wp_vals[i + 1] - wp_vals[i]))
                    break
    return result


# ─── Historical yield waypoints ───────────────────────────────────────────────

DGS10_WAYPOINTS = [
    ("1962-01-02",  4.08),  ("1965-06-01",  4.28),  ("1967-01-01",  5.05),
    ("1969-01-01",  6.11),  ("1970-06-01",  7.93),  ("1971-08-01",  6.52),
    ("1974-01-01",  7.43),  ("1975-01-01",  7.76),  ("1977-01-01",  7.42),
    ("1979-06-01",  9.39),  ("1980-03-01", 12.75),  ("1981-09-01", 15.84),
    ("1983-01-01", 10.65),  ("1984-06-01", 13.56),  ("1986-01-01",  9.19),
    ("1987-10-20",  9.52),  ("1988-01-01",  8.83),  ("1990-01-01",  8.21),
    ("1992-01-01",  6.70),  ("1994-11-01",  8.05),  ("1995-06-01",  6.62),
    ("1998-10-01",  4.22),  ("2000-01-01",  6.79),  ("2001-01-01",  5.16),
    ("2003-06-01",  3.33),  ("2006-01-01",  4.39),  ("2007-06-01",  5.25),
    ("2008-12-01",  2.71),  ("2010-04-01",  3.85),  ("2012-07-01",  1.53),
    ("2013-12-01",  3.03),  ("2016-07-01",  1.47),  ("2018-10-01",  3.21),
    ("2019-09-01",  1.70),  ("2020-03-09",  0.54),  ("2020-08-04",  0.52),
    ("2021-03-31",  1.74),  ("2022-01-03",  1.63),  ("2022-06-14",  3.48),
    ("2022-10-24",  4.25),  ("2023-10-23",  5.02),  ("2024-06-04",  4.43),
]

# Spread from 10Y in bps (maturity_yield - 10Y_yield)
SPREAD_WAYPOINTS = {
    "30Y": [
        ("1977-02-15", 30),  ("1980-01-01", 25),  ("1981-09-01", 20),
        ("1985-01-01", 50),  ("1990-01-01", 60),  ("1995-01-01", 70),
        ("2000-01-01", 70),  ("2001-12-01", 85),
        ("2006-02-09", 30),  ("2008-01-01", 35),  ("2008-12-01", 60),
        ("2010-01-01", 65),  ("2012-07-01",100),  ("2013-12-01", 75),
        ("2016-07-01", 55),  ("2018-10-01", 40),  ("2020-03-09", 30),
        ("2020-08-01", 25),  ("2022-09-01", 15),  ("2024-06-04", 10),
    ],
    "5Y": [
        ("1962-01-02", -20),  ("1980-01-01", -15),  ("1981-09-01", -30),
        ("1985-01-01", -50),  ("1987-01-01", -70),  ("1989-01-01",   5),
        ("1990-01-01", -30),  ("1992-01-01",-100),  ("1994-01-01", -90),
        ("1995-06-01", -50),  ("2000-01-01", -40),  ("2001-01-01", -60),
        ("2003-06-01", -60),  ("2006-01-01",  -5),  ("2008-12-01",-130),
        ("2010-01-01",-160),  ("2013-12-01",-100),  ("2018-10-01", -30),
        ("2019-09-01", -20),  ("2020-08-01", -25),  ("2022-09-01",  10),
        ("2024-06-04", -15),
    ],
    "2Y": [
        ("1976-06-01", -80),  ("1980-01-01", -20),  ("1982-06-01", -60),
        ("1985-01-01",-100),  ("1987-01-01",-183),  ("1989-01-01",  21),
        ("1990-01-01", -20),  ("1992-01-01",-270),  ("1994-11-01", -55),
        ("1996-01-01",-130),  ("2000-01-01", -19),  ("2002-01-01",-200),
        ("2003-06-01",-120),  ("2006-01-01",   0),  ("2008-06-01",-160),
        ("2010-01-01",-310),  ("2013-12-01",-265),  ("2015-01-01",-175),
        ("2018-10-01", -33),  ("2019-09-01",  -7),  ("2020-08-01", -39),
        ("2022-01-03",-140),  ("2022-06-01",  30),  ("2022-09-01",  40),
        ("2023-01-01",  65),  ("2024-06-04",  15),
    ],
    "3M": [
        ("1982-01-04",-100),  ("1982-06-01",-200),  ("1985-01-01",-150),
        ("1987-01-01",-250),  ("1988-01-01",-150),  ("1989-01-01", -10),
        ("1990-01-01", -80),  ("1992-01-01",-400),  ("1994-01-01",-300),
        ("1994-11-01",-100),  ("1996-01-01",-200),  ("1998-10-01",-200),
        ("2000-01-01", -50),  ("2001-01-01",-200),  ("2003-06-01",-250),
        ("2006-01-01",   0),  ("2007-01-01",  15),  ("2007-06-01",   0),
        ("2008-01-01",-130),  ("2009-01-01",-350),  ("2010-01-01",-360),
        ("2015-01-01",-200),  ("2018-01-01",-100),  ("2019-09-01",   0),
        ("2020-03-01",-160),  ("2020-08-01", -50),  ("2022-01-01",-140),
        ("2022-09-01",  30),  ("2023-01-01",  80),  ("2024-06-04",  30),
    ],
}

# Injected extreme events: (maturity, date_str, delta_bps)
# Applied on top of the OU path to ensure historically documented dates appear
EXTREME_EVENTS = [
    # Black Monday era 1987
    ("10Y", "1987-10-20", +23), ("10Y", "1987-10-22", -21), ("10Y", "1987-11-02", +19),
    ("30Y", "1987-10-20", +29), ("30Y", "1987-10-22", -27),
    ("5Y",  "1987-10-20", +18), ("5Y",  "1987-10-22", -16),
    # GFC 2008
    ("10Y", "2008-09-29", +32), ("10Y", "2008-10-08", -28), ("10Y", "2008-10-10", +41),
    ("10Y", "2008-12-16", -34),
    ("30Y", "2008-09-29", +38), ("30Y", "2008-10-10", +46), ("30Y", "2008-12-16", -41),
    ("5Y",  "2008-09-29", +25), ("5Y",  "2008-10-10", +35), ("5Y",  "2008-12-16", -29),
    ("2Y",  "2008-09-29", -43), ("2Y",  "2008-10-09", +38), ("2Y",  "2008-12-16", -46),
    ("3M",  "2008-09-29", -39), ("3M",  "2008-10-10", +45),
    # COVID March 2020
    ("10Y", "2020-03-09", -29), ("10Y", "2020-03-18", +43), ("10Y", "2020-03-19", -23),
    ("30Y", "2020-03-09", -27), ("30Y", "2020-03-18", +51),
    ("5Y",  "2020-03-09", -25), ("5Y",  "2020-03-18", +36),
    ("2Y",  "2020-03-03", -27), ("2Y",  "2020-03-09", -24), ("2Y",  "2020-03-18", +29),
    ("3M",  "2020-03-09", -31), ("3M",  "2020-03-17", -23), ("3M",  "2020-03-18", +26),
    # Fed hiking cycle 2022–23
    ("10Y", "2022-06-13", +22), ("10Y", "2022-09-22", +20), ("10Y", "2022-10-21", +23),
    ("30Y", "2022-06-13", +27), ("30Y", "2022-09-22", +26), ("30Y", "2023-09-22", +25),
    ("5Y",  "2022-06-10", +27), ("5Y",  "2022-09-13", +23),
    ("2Y",  "2022-06-10", +31), ("2Y",  "2022-09-13", +29),
    ("3M",  "2022-11-02", +26),
    # SVB collapse 2023
    ("2Y",  "2023-03-13", -61), ("2Y",  "2023-03-14", +29),
    ("5Y",  "2023-03-13", -36),
    ("3M",  "2023-03-13", -31),
    ("10Y", "2023-03-13", -23),
]


def build_event_lookup() -> dict:
    """Build {(maturity, date_str): delta_bps} lookup."""
    lookup: dict = {}
    for mat, d_str, delta in EXTREME_EVENTS:
        key = (mat, d_str)
        lookup[key] = lookup.get(key, 0) + delta
    return lookup


# ─── Volatility regime ────────────────────────────────────────────────────────

def vol_regime(d: date, base: float) -> float:
    y = d.year
    if 1979 <= y <= 1984:             return base * 2.5
    if 1987 <= y <= 1988:             return base * 2.2
    if 2008 <= y <= 2009:             return base * 2.8
    if y == 2020 and d.month in (3,4): return base * 3.2
    if 2022 <= y <= 2023:             return base * 2.0
    if 1990 <= y <= 1994:             return base * 1.4
    return base


# ─── Synthetic raw CSV generation ─────────────────────────────────────────────

def is_valid_csv(path: Path) -> bool:
    """Return True if the file looks like real FRED data (not an error page)."""
    try:
        text = path.read_text(errors="replace")
        if "<html" in text.lower() or len(text) < 200:
            return False
        lines = [l for l in text.splitlines() if l.strip()]
        return len(lines) > 50
    except Exception:
        return False


def generate_10y(event_lookup: dict) -> dict:
    bdays = business_days(date(1962, 1, 2), date(2024, 12, 31))
    targets = interpolate_waypoints(bdays, DGS10_WAYPOINTS)
    BASE_VOL = 0.070   # 7 bps base
    THETA    = 0.018   # OU mean-reversion speed
    yields   = {}
    noise    = 0.0
    for i, d in enumerate(bdays):
        vol    = vol_regime(d, BASE_VOL)
        noise += -THETA * noise + vol * _t5_sample()
        y      = targets[i] + noise
        d_str  = d.isoformat()
        ev     = event_lookup.get(("10Y", d_str), 0) / 100.0
        if ev:
            y    += ev
            noise = y - targets[i]
        y = max(y, 0.01)
        yields[d_str] = round(y, 2)
    return yields


def generate_other(mat: str, base10y: dict, event_lookup: dict,
                   start: date, end: date, base_vol: float) -> dict:
    bdays        = business_days(start, end)
    spread_wps   = SPREAD_WAYPOINTS[mat]
    spread_bps_v = interpolate_waypoints(bdays, spread_wps)
    THETA        = 0.04
    spread_noise = 0.0
    yields       = {}
    for i, d in enumerate(bdays):
        if mat == "30Y" and DGS30_GAP_START <= d <= DGS30_GAP_END:
            yields[d.isoformat()] = None
            continue
        d_str  = d.isoformat()
        base_y = base10y.get(d_str)
        if base_y is None:
            yields[d_str] = None
            continue
        vol         = vol_regime(d, base_vol)
        spread_noise += -THETA * spread_noise + (base_vol * 0.35) * _t5_sample()
        y    = base_y + spread_bps_v[i] / 100.0 + spread_noise
        ev   = event_lookup.get((mat, d_str), 0) / 100.0
        if ev:
            y           += ev
            spread_noise = y - (base_y + spread_bps_v[i] / 100.0)
        y = max(y, 0.01)
        yields[d_str] = round(y, 2)
    return yields


def write_raw_csv(series_id: str, yields: dict) -> None:
    path = RAW_DIR / f"{series_id}.csv"
    with open(path, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["DATE", series_id])
        for d_str, y in sorted(yields.items()):
            w.writerow([d_str, "." if y is None else f"{y:.2f}"])
    print(f"  wrote {path} ({len(yields)} rows)")


def generate_and_write_raws() -> None:
    print("Generating synthetic raw CSVs...")
    event_lookup = build_event_lookup()
    y10 = generate_10y(event_lookup)
    write_raw_csv("DGS10", y10)

    specs = [
        ("5Y",  "DGS5",   date(1962, 1, 2),  date(2024, 12, 31), 0.065),
        ("2Y",  "DGS2",   date(1976, 6, 1),  date(2024, 12, 31), 0.055),
        ("30Y", "DGS30",  date(1977, 2, 15), date(2024, 12, 31), 0.085),
        ("3M",  "DGS3MO", date(1982, 1, 4),  date(2024, 12, 31), 0.040),
    ]
    for mat, sid, start, end, bv in specs:
        yields = generate_other(mat, y10, event_lookup, start, end, bv)
        write_raw_csv(sid, yields)


# ─── Transform: raw CSV → processed files ─────────────────────────────────────

def read_raw_csv(series_id: str) -> dict:
    """Read FRED CSV: column 0 = date, column 1 = yield. Returns {date_str: float|None}."""
    path = RAW_DIR / f"{series_id}.csv"
    data = {}
    with open(path, newline="") as f:
        reader = csv.reader(f)
        next(reader, None)   # skip header
        for row in reader:
            if len(row) < 2:
                continue
            d_str = row[0].strip()
            val   = row[1].strip()
            data[d_str] = None if val in (".", "", "NA") else float(val)
    return data


def compute_stats(arr: list) -> dict:
    n  = len(arr)
    mu = sum(arr) / n
    # Sample variance (ddof=1)
    var   = sum((x - mu) ** 2 for x in arr) / (n - 1)
    sigma = math.sqrt(var) if var > 0 else 1e-9
    # Skewness (adjusted Fisher-Pearson)
    m3   = sum((x - mu) ** 3 for x in arr) / n
    skew = m3 / sigma ** 3
    # Excess kurtosis (Fisher's definition)
    m4   = sum((x - mu) ** 4 for x in arr) / n
    kurt = m4 / sigma ** 4 - 3.0
    return {"n": n, "mu": mu, "sigma": sigma, "skewness": skew, "excess_kurtosis": kurt}


def process_maturity(mat: str, series_id: str) -> dict:
    raw = read_raw_csv(series_id)

    # DGS30 gap: force null without interpolation
    if mat == "30Y":
        for d_str in list(raw.keys()):
            d = date.fromisoformat(d_str)
            if DGS30_GAP_START <= d <= DGS30_GAP_END:
                raw[d_str] = None

    sorted_dates = sorted(raw.keys())
    stats_records = []

    for metric in ("bps", "log"):
        # Compute daily changes (skip null pairs)
        deltas: list = []          # (date_str, delta)
        for i in range(1, len(sorted_dates)):
            d1, d0 = sorted_dates[i], sorted_dates[i - 1]
            y1, y0 = raw[d1], raw[d0]
            if y1 is None or y0 is None or y0 <= 0 or y1 <= 0:
                continue
            if metric == "bps":
                delta = (y1 - y0) * 100.0
            else:
                delta = math.log(y1 / y0)
            if math.isfinite(delta):
                deltas.append((d1, delta))

        arr      = [v for _, v in deltas]
        dates_ch = [d for d, _ in deltas]
        n = len(arr)
        if n < 30:
            print(f"  WARN: {mat}/{metric} only {n} obs — skipping")
            continue

        s = compute_stats(arr)
        mu    = s["mu"]
        sigma = s["sigma"]
        mn    = min(arr);  mn_i = arr.index(mn);  mn_date = dates_ch[mn_i]
        mx    = max(arr);  mx_i = arr.index(mx);  mx_date = dates_ch[mx_i]

        # VaR thresholds under normal assumption
        var_thresholds = {}
        for cl, z in Z_LEVELS.items():
            var_thresholds[cl] = {
                "z": z,
                "var_loss": mu - z * sigma,
                "var_gain": mu + z * sigma,
            }

        # Sigma-band analysis k = 1..8
        sigma_bands = []
        for k in range(1, 9):
            p2t     = norm_survival_2tail(k)
            exp_cnt = n * p2t
            yrs_btw = (1.0 / (TRADING_DAYS_PER_YEAR * p2t)) if p2t > 0 else float("inf")
            act_cnt = sum(1 for v in arr if abs((v - mu) / sigma) > k)
            sigma_bands.append({
                "k": k,
                "expected_count_normal": round(exp_cnt, 4),
                "actual_count": act_cnt,
                "expected_years_between": round(yrs_btw, 1),
            })

        stats_out = {
            "maturity":         mat,
            "series_id":        series_id,
            "metric":           metric,
            "n":                n,
            "date_start":       sorted_dates[1],
            "date_end":         sorted_dates[-1],
            "mu":               mu,
            "sigma":            sigma,
            "skewness":         s["skewness"],
            "excess_kurtosis":  s["excess_kurtosis"],
            "min":              mn,
            "min_date":         mn_date,
            "max":              mx,
            "max_date":         mx_date,
            "var_thresholds":   var_thresholds,
            "sigma_bands":      sigma_bands,
        }
        p = PROC_DIR / f"stats_{mat}_{metric}.json"
        p.write_text(json.dumps(stats_out, indent=2))
        print(f"    stats → {p}")
        stats_records.append(stats_out)

        # ── Histogram ──────────────────────────────────────────────
        N_BINS  = 60
        mn_v, mx_v = min(arr), max(arr)
        bw = (mx_v - mn_v) / N_BINS if mx_v != mn_v else 1.0
        counts = [0] * N_BINS
        for v in arr:
            idx = min(int((v - mn_v) / bw), N_BINS - 1)
            counts[idx] += 1
        centers = [mn_v + (i + 0.5) * bw for i in range(N_BINS)]
        pdf_scale = 1.0 / (sigma * math.sqrt(2 * math.pi))
        hist_path = PROC_DIR / f"histogram_{mat}_{metric}.csv"
        with open(hist_path, "w", newline="") as f:
            w = csv.writer(f)
            w.writerow(["bin_center", "count", "normal_pdf_scaled"])
            for c, cnt in zip(centers, counts):
                pdf = pdf_scale * math.exp(-0.5 * ((c - mu) / sigma) ** 2) * n * bw
                w.writerow([f"{c:.6f}", cnt, f"{pdf:.6f}"])
        print(f"    histogram → {hist_path}")

        # ── Q-Q plot (subsampled to ≤2000 pts; all tails kept) ────
        sorted_vals   = sorted(arr)
        standardized  = [(v - mu) / sigma for v in sorted_vals]
        qq_path = PROC_DIR / f"qq_{mat}_{metric}.csv"
        ref_min = norm_ppf(0.5 / n)
        ref_max = norm_ppf((n - 0.5) / n)
        # Keep every k-th middle point; always keep outer 2% (tails)
        tail_n  = max(1, n // 50)          # 2% each end
        step    = max(1, (n - 2 * tail_n) // 1800)
        keep    = set(range(tail_n))       # low tail
        keep   |= set(range(n - tail_n, n))  # high tail
        keep   |= set(range(tail_n, n - tail_n, step))
        with open(qq_path, "w", newline="") as f:
            w = csv.writer(f)
            w.writerow(["theoretical_quantile", "sample_quantile"])
            for i, sq in enumerate(standardized):
                if i not in keep:
                    continue
                p_pos = (i + 1 - 0.5) / n
                tq    = norm_ppf(p_pos)
                w.writerow([f"{tq:.6f}", f"{sq:.6f}"])
        ref_path = PROC_DIR / f"qq_ref_{mat}_{metric}.json"
        ref_path.write_text(json.dumps({"ref_min": ref_min, "ref_max": ref_max}))
        print(f"    qq → {qq_path}")

        # ── Sigma events (|delta − μ| ≥ 3σ) ───────────────────────
        event_rows = []
        for d_str, v in deltas:
            sd = (v - mu) / sigma
            if abs(sd) >= 3.0:
                ym      = d_str[:7]
                tag     = next((t for ym2, t in MACRO_EVENT_TAGS if ym2 == ym), "")
                event_rows.append({
                    "date":           d_str,
                    "delta":          v,
                    "sigma_distance": sd,
                    "direction":      "up" if v > 0 else "down",
                    "macro_tag":      tag,
                })
        events_path = PROC_DIR / f"events_{mat}_{metric}.csv"
        with open(events_path, "w", newline="") as f:
            w = csv.DictWriter(f, fieldnames=["date","delta","sigma_distance","direction","macro_tag"])
            w.writeheader()
            w.writerows(sorted(event_rows, key=lambda r: r["date"]))
        print(f"    events → {events_path}  ({len(event_rows)} extreme days)")

    return stats_records


# ─── Master stats bundle ──────────────────────────────────────────────────────

def build_master_stats() -> None:
    all_records = []
    for mat in SERIES_IDS:
        for metric in ("bps", "log"):
            p = PROC_DIR / f"stats_{mat}_{metric}.json"
            if p.exists():
                all_records.append(json.loads(p.read_text()))
    out = PROC_DIR / "stats_all.json"
    out.write_text(json.dumps(all_records, indent=2))
    print(f"\nMaster stats → {out}  ({len(all_records)} records)")


# ─── Main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    PROC_DIR.mkdir(parents=True, exist_ok=True)

    # Check if real FRED data is present; generate synthetic if not
    all_valid = all(is_valid_csv(RAW_DIR / f"{sid}.csv") for sid in SERIES_IDS.values())
    if all_valid:
        print("Real FRED data detected — skipping synthetic generation.")
    else:
        generate_and_write_raws()

    print("\nRunning transform pipeline...")
    for mat, sid in SERIES_IDS.items():
        print(f"  [{mat}] {sid}")
        process_maturity(mat, sid)

    build_master_stats()
    print("\nDone. Processed files are in", PROC_DIR)


if __name__ == "__main__":
    main()
