---
description: >
  SAS programming for financial and treasury analysis and its integration into Angular
  dashboards: DATA step cleaning/derivation, core PROC steps (MEANS, FREQ, REG, FORECAST,
  UNIVARIATE), reshaping wide↔long with PROC TRANSPOSE, parameterized macros, and exporting
  structured output for the front end via PROC EXPORT (CSV) and ODS JSON. Use this skill
  whenever SAS is mentioned or implied — writing or reviewing .sas code, a DATA step, any
  PROC, a SAS macro, forecasting or regression in SAS, computing a treasury metric
  (liquidity, cash-flow variance, VaR, yield interpolation), or wiring SAS output into an
  Angular/PapaParse pipeline. Trigger on "SAS," "PROC," "DATA step," "ODS," "macro,"
  "%MACRO," "forecast the cash balance," or "prepare the data for the dashboard." Lean
  toward triggering: if statistical data prep for the dashboards is in scope, consult this.
---

# SAS Analytics (financial/treasury) + Angular integration

This skill covers SAS as the *data-preparation and statistics engine* feeding the
alexbarkus.dev Angular dashboards. SAS does the heavy cleaning, joining, regression, and
forecasting; it exports CSV or JSON; Angular loads that static output with `HttpClient` +
PapaParse (see `angular-dashboard-dev`). For the equivalent client-side statistics, see
`deep-analysis` — the two are designed to agree (same IQR fence, same regression).

## DATA step: clean and derive

```sas
DATA work.filtered;
  LENGTH region $ 20;                 /* declare new char vars BEFORE the SET */
  SET library.source_data;
  WHERE fiscal_year = 2023 AND utilization_rate NE .;   /* subset BEFORE deriving */
  cost_per_sqft = annual_rent / gross_sqft;
  IF cost_per_sqft > 0 THEN OUTPUT;
RUN;
```

Why these patterns matter:

- **`WHERE` before derived columns.** `WHERE` subsets at read time, so derivations only run
  on rows you keep — faster and avoids dividing by missing values.
- **`LENGTH` before `SET`** when creating a new character variable, or SAS infers the length
  from first use and silently truncates later values.
- **Missing values propagate silently.** Numeric missing is `.`, character missing is `' '`.
  Always guard with `WHERE var NE .` before any statistical PROC.

## Core PROC steps for treasury/financial analysis

```sas
/* Descriptive statistics, grouped */
PROC MEANS DATA=work.filtered N MEAN STD MIN MAX P25 P75;
  CLASS state_code;
  VAR cost_per_sqft utilization_rate;
RUN;

/* Frequency / cross-tab */
PROC FREQ DATA=work.filtered;
  TABLES tenure_type * utilization_bucket / NOCUM NOPERCENT;
RUN;

/* Linear regression with predicted + residual output */
PROC REG DATA=work.filtered OUTEST=work.reg_params;
  MODEL utilization_rate = cost_per_sqft gross_sqft building_age;
  OUTPUT OUT=work.reg_output PREDICTED=yhat RESIDUAL=resid;
RUN;

/* Time-series forecast with confidence band */
PROC FORECAST DATA=work.timeseries METHOD=EXPO LEAD=4
              OUT=work.forecast OUTLIMIT INTERVAL=MONTH;
  VAR monthly_spend;
  ID period;
RUN;
```

Notes that save debugging time:

- **`PROC FORECAST ... OUTLIMIT`** produces the confidence band the dashboard's forecast
  panel needs. With `OUTLIMIT`, the `OUT=` data set gains rows where `_TYPE_` is `L95`/`U95`
  alongside `ACTUAL`, `FORECAST`, and `STD`. `ALPHA=0.05` (default) gives 95%; set
  `ALPHA=0.20` for an 80% band. `METHOD=EXPO` is simple exponential smoothing; use
  `METHOD=WINTERS` if the series is seasonal.
- **`OUTEST=`** on `PROC REG` captures slope/intercept parameters as data; **`OUTPUT OUT=`**
  captures per-row predicted/residual values. You usually want both.

### IQR anomaly detection (matches the client-side fence)

```sas
PROC UNIVARIATE DATA=work.filtered NOPRINT;
  VAR spend_amount;
  OUTPUT OUT=work.quartiles Q1=q1 Q3=q3;
RUN;

DATA work.anomalies;
  IF _N_ = 1 THEN SET work.quartiles;   /* broadcast the single quartile row */
  SET work.filtered;
  iqr = q3 - q1;
  IF spend_amount < q1 - 1.5 * iqr OR spend_amount > q3 + 1.5 * iqr
    THEN is_anomaly = 1; ELSE is_anomaly = 0;
RUN;
```

The `IF _N_ = 1 THEN SET` trick reads the one-row quartile summary into the program data
vector once and retains it across all rows — the idiomatic way to broadcast a scalar.

## Reshape wide ↔ long with PROC TRANSPOSE

FRED yield CSVs arrive **wide** (one column per maturity: `DGS1MO DGS3MO … DGS30`). ECharts
multi-series and tidy analysis want **long** (one row per date-maturity). Transpose:

```sas
PROC TRANSPOSE DATA=work.yields_wide OUT=work.yields_long(RENAME=(col1=yield_pct))
               NAME=maturity;
  BY date;
  VAR DGS1MO DGS3MO DGS1 DGS2 DGS5 DGS10 DGS30;
RUN;
```

Result: columns `date`, `maturity` (e.g. `"DGS10"`), `yield_pct`. Map the `maturity` codes
to numeric tenor-in-years in a follow-up DATA step if the x-axis needs ordering.

## Parameterized reporting macro

```sas
%MACRO run_analysis(fiscal_yr=, output_path=);
  DATA work.filtered_&fiscal_yr;
    SET library.frpp;
    WHERE fiscal_year = &fiscal_yr AND utilization_rate NE .;
  RUN;

  /* ... PROC MEANS / REG / etc. into work.analysis_&fiscal_yr ... */

  PROC EXPORT DATA=work.analysis_&fiscal_yr
    OUTFILE="&output_path/analysis_&fiscal_yr..csv"
    DBMS=CSV REPLACE;
    PUTNAMES=YES;
  RUN;
%MEND run_analysis;

%run_analysis(fiscal_yr=2023, output_path=C:\output)
```

Note the `..` before the extension — the first dot ends the macro-variable reference, the
second is a literal dot.

## Exporting for the Angular front end

The dashboard treats SAS output as a **static asset committed to `src/assets/data/`** at
build time (or fetched from an endpoint if SAS runs server-side).

### CSV for PapaParse (the default)

```sas
PROC EXPORT DATA=work.analysis_output
  OUTFILE="C:\repo\src\assets\data\dashboard_data.csv"
  DBMS=CSV REPLACE;
  PUTNAMES=YES;        /* header row so PapaParse header:true works */
RUN;
```

`PUTNAMES=YES` writes the header row PapaParse's `header: true` depends on. This is the
preferred path because the Angular side is already CSV-oriented.

### ODS JSON for structured/nested results

When the result is a summary table rather than a flat row set:

```sas
ODS JSON FILE="C:\repo\src\assets\data\analysis_results.json" PRETTY;
  PROC MEANS DATA=work.filtered MEAN STD N;
    CLASS state_code;
    VAR cost_per_sqft utilization_rate;
  RUN;
ODS JSON CLOSE;
```

For a portfolio where you control both ends, exporting a clean flat CSV is usually simpler
than parsing the ODS JSON envelope — reach for JSON only when nesting genuinely helps.

## Integration pipeline (SAS → Angular)

```
SAS DATA step        →  clean, join, derive, subset (WHERE)
PROC (MEANS/REG/...) →  statistical summaries, regression params, forecast + OUTLIMIT band
PROC TRANSPOSE       →  reshape wide yield columns to long date-maturity rows
PROC EXPORT / ODS    →  CSV (or JSON) into src/assets/data/
Angular HttpClient   →  GET /assets/data/dashboard_data.csv  { responseType: 'text' }
PapaParse            →  parse CSV → typed array
signal.set()         →  rawRows.set(result.data); loaded.set(true)
computed()           →  derive EChartsOption from the signal
```

For the portfolio, the CSVs are **pre-generated and committed** — no live SAS server. The
interview framing: in a real environment the same PROC steps run on a schedule against
Workday/Coupa/TMS extracts and publish to an endpoint; the analytical code is identical.

## Treasury-specific analysis recipes

- **Liquidity ratio**: `liquid_assets / short_term_liabilities` in a DATA step; trend with
  `PROC MEANS ... CLASS period`.
- **Cash-flow variance**: `var_amt = actual_cf - forecast_cf`; summarize by period with
  `PROC MEANS`; bucket into green/yellow/red in a DATA step (mirrors `deep-analysis`
  `variance()`).
- **Yield-curve interpolation**: `PROC EXPAND` with `CONVERT ... / METHOD=SPLINE` to
  interpolate missing tenors / fill a smooth curve between observed maturities.
- **Spend clustering**: `PROC CLUSTER` (e.g. `METHOD=WARD`) then `PROC TREE` to segment
  vendor spend.
- **Historical VaR (approximation)**: sort the return/residual series and take the 5th
  percentile (`PROC UNIVARIATE ... PCTLPTS=5`) — the loss not exceeded 95% of the time.

## Gotchas

- A division anywhere a denominator can be `0` or missing yields `.` silently — guard it.
- `DBMS=CSV` needs no extra engine, but `DBMS=XLSX` requires the SAS/ACCESS license; prefer
  CSV for portability.
- Macro path literals: remember the double dot before the extension (`&fiscal_yr..csv`).
- `PROC FORECAST` requires the series sorted by the `ID` variable and an even interval; set
  `INTERVAL=` explicitly so date-based leads line up.
