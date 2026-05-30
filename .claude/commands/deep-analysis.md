---
description: >
  Client-side statistical analysis patterns in TypeScript for analytical dashboards:
  linear regression and trendlines, z-score and IQR anomaly/outlier detection, rolling
  averages and time-series smoothing, threshold-based predictive flagging and forecast
  extrapolation, variance analysis, and the mapping from analytical question to chart
  type. Use this skill whenever a task involves analyzing data rather than just plotting
  it — computing a trendline, finding outliers or anomalies, smoothing a series,
  projecting/forecasting forward, ranking entities at risk, building a flag table, or
  deciding which chart answers a given question. Trigger on words like regression,
  correlation, outlier, anomaly, z-score, IQR, rolling/moving average, forecast,
  projection, variance, distribution, or "which entities are at risk." Lean toward
  triggering: if numbers are being turned into insight, consult this skill.
---

# Deep Analysis (client-side statistics in TypeScript)

This skill carries the analytical layer: how to turn data into insight in browser-side
TypeScript, and which visualization pairs with each analytical question. It complements
`dashboard-design` (visual/layout decisions) and `angular-dashboard-dev` (how the
resulting series gets into an ECharts panel via signals). All implementations here are
pure functions intended to live in `transforms.ts`, `regression.ts`, or `forecast.ts` and
be called from inside a `computed()`.

## Start from the analytical question, not the chart

Every panel should answer one explicit question. Name the question first; the method and
the chart follow from it. The taxonomy:

- **Distribution** — *How is X spread across a dimension?* → histogram, box plot, treemap.
- **Trend** — *How does X change over time?* → line chart, with a `markLine`
  average/threshold for context.
- **Correlation** — *Does X predict Y?* → scatter plot **with a regression line** (a bare
  scatter does not answer a predictive question).
- **Comparison** — *How does X compare across groups?* → ranked horizontal bar, or a
  sorted table.
- **Anomaly** — *Which values are outliers?* → z-score or IQR flagging + `markPoint`.
- **Predictive flagging** — *Which entities are at risk of crossing a threshold?* →
  regression extrapolation + a ranked, exportable flag table.

## Statistical implementations

### Linear regression (slope, intercept, R²)

Used for scatter trendlines and for the projection step of predictive flagging. Returns R²
so the panel can disclose fit quality (a trendline on a near-zero-R² relationship is
misleading and should be labeled as weak).

```typescript
export interface Point { x: number; y: number; }
export interface Line  { slope: number; intercept: number; r2: number; }

export function linearRegression(pts: Point[]): Line {
  const n = pts.length;
  const sumX  = pts.reduce((s, p) => s + p.x, 0);
  const sumY  = pts.reduce((s, p) => s + p.y, 0);
  const sumXY = pts.reduce((s, p) => s + p.x * p.y, 0);
  const sumX2 = pts.reduce((s, p) => s + p.x * p.x, 0);
  const denom = n * sumX2 - sumX * sumX;
  if (denom === 0) return { slope: 0, intercept: sumY / n, r2: 0 };
  const slope     = (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;
  const yMean = sumY / n;
  const ssTot = pts.reduce((s, p) => s + (p.y - yMean) ** 2, 0);
  const ssRes = pts.reduce((s, p) => s + (p.y - (slope * p.x + intercept)) ** 2, 0);
  return { slope, intercept, r2: ssTot === 0 ? 0 : 1 - ssRes / ssTot };
}
```

To draw the line in ECharts, evaluate it at the data's x-extent and feed the two endpoints
to a second `line` series:

```typescript
const { slope, intercept } = linearRegression(points);
const xs = points.map(p => p.x);
const x0 = Math.min(...xs), x1 = Math.max(...xs);
const trendData = [[x0, slope * x0 + intercept], [x1, slope * x1 + intercept]];
```

### Z-score anomaly detection

Best when the series is roughly normal. Flags points more than `threshold` standard
deviations from the mean. 2.5–3.0 is the usual range; lower flags more.

```typescript
export function zScoreAnomalies(values: number[], threshold = 2.5): boolean[] {
  const n = values.length;
  const mean = values.reduce((a, b) => a + b, 0) / n;
  const std  = Math.sqrt(values.reduce((s, v) => s + (v - mean) ** 2, 0) / n);
  if (std === 0) return values.map(() => false);
  return values.map(v => Math.abs((v - mean) / std) > threshold);
}
```

### IQR (interquartile range) outlier detection

Distribution-free and robust to skew — prefer it over z-score when the data is skewed or
heavy-tailed (financial spend usually is). Flags points outside `Q1 − k·IQR … Q3 + k·IQR`
with `k = 1.5` (Tukey's fence).

```typescript
function quantile(sorted: number[], q: number): number {
  const pos  = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  return sorted[base + 1] !== undefined
    ? sorted[base] + rest * (sorted[base + 1] - sorted[base])
    : sorted[base];
}

export function iqrAnomalies(values: number[], k = 1.5): boolean[] {
  const sorted = [...values].sort((a, b) => a - b);
  const q1  = quantile(sorted, 0.25);
  const q3  = quantile(sorted, 0.75);
  const iqr = q3 - q1;
  const lo  = q1 - k * iqr, hi = q3 + k * iqr;
  return values.map(v => v < lo || v > hi);
}
```

This mirrors the SAS `PROC UNIVARIATE` + Tukey-fence pattern in `sas-analytics`, so a
client-side flag and a SAS-computed flag agree.

### Rolling (moving) average

Smooths a noisy time series so the trend reads. Trailing window of size `window`.

```typescript
export function rollingAverage(values: number[], window: number): number[] {
  return values.map((_, i) => {
    const slice = values.slice(Math.max(0, i - window + 1), i + 1);
    return slice.reduce((a, b) => a + b, 0) / slice.length;
  });
}
```

Overlay the smoothed series as a second `line` (`smooth: true`) above the raw series; keep
the raw series faint so the smoothing reads as interpretation, not replacement.

### Variance analysis

Forecast-vs-actual variance, the core of the treasury variance table. Compute both dollar
and percent variance and a status bucket so the table is self-describing.

```typescript
export type VarianceStatus = 'green' | 'yellow' | 'red';

export function variance(actual: number, forecast: number) {
  const abs = actual - forecast;
  const pct = forecast === 0 ? 0 : (abs / forecast) * 100;
  const a   = Math.abs(pct);
  const status: VarianceStatus = a <= 5 ? 'green' : a <= 15 ? 'yellow' : 'red';
  return { abs, pct, status };
}
```

State the thresholds in the panel footnote so the color is auditable.

## Predictive flagging pattern

The highest-value analytical panel: "which specific entities should someone act on?" Steps:

1. Aggregate to one current metric per entity.
2. Sort **ascending by current metric** (worst performers first).
3. For each entity with enough history, fit `linearRegression` over its time points and
   **project forward N periods**: `projected = slope * (t_now + N) + intercept`.
4. **Flag** entities whose projection crosses the threshold within the horizon.
5. Emit a ranked table: entity name, current value, projected value, periods-until-
   threshold, and a trend-direction icon (▲ improving / ▼ worsening / ▬ flat).
6. Add a CSV export button.

### CSV export (Blob + anchor pattern)

```typescript
export function exportCsv(rows: Record<string, unknown>[], filename: string): void {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const escape  = (v: unknown) => {
    const s = v == null ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [
    headers.join(','),
    ...rows.map(r => headers.map(h => escape(r[h])).join(',')),
  ].join('\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
```

In Angular, trigger from a button `(click)` handler. Export is a side effect, so `effect()`
is correct if export is signal-driven — unlike chart options, which always use `computed()`.

## Visualization–analysis pairing (implementation map)

| Analytical question | Chart type | Pattern |
|---|---|---|
| Distribution by geography | Choropleth | ECharts `map` series + registered GeoJSON |
| Cost vs. driver correlation | Scatter + trendline | `scatter` + second `line` from `linearRegression` |
| Spend anomalies over time | Line + markers | `line` + `markPoint` on `iqrAnomalies`/`zScoreAnomalies` points |
| Threshold vs. actual | Bar + reference line | `bar` + `markLine` at threshold `yAxis` value |
| Predictive flag ranking | Sorted table | `@for` over a signal sorted ascending by current metric |
| Smoothed trend | Line (raw + smoothed) | raw `line` + `rollingAverage` `line` with `smooth: true` |

## Data-preparation principles

- **Filter before you compute.** Never pass the full raw dataset into a statistic or chart.
- **Group → aggregate → chart.** `lodash-es groupBy` → `sumBy`/`meanBy` → build the small
  series. Charts receive tens-to-hundreds of points.
- **Normalize units before comparing.** Compare cost-per-sqft, variance-pct. Un-normalized
  magnitudes produce false rankings.
- **Store derived data in a `computed()` signal**, not a mutable service field.
- **Disclose method and fit.** If a panel computes a regression, anomaly threshold, or
  forecast, state the method and threshold/R² in the footnote so the analysis is auditable.

## Sensitivity / honesty checks

- Report R² (or at least flag low-fit trendlines) — don't imply a relationship the data
  doesn't support.
- Prefer IQR over z-score for skewed financial data; note which you used.
- A rolling average lags the true series by ~half the window — don't read the last smoothed
  point as "current."
- Extrapolating a linear fit far beyond the observed range is fragile; keep the projection
  horizon short and say so.
