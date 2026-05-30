export interface YieldRow {
  date: string;
  maturity: string;
  yield_pct: number;
  tenor_yrs: number;
}

export interface CashflowRow {
  date: string;
  opening_balance: number;
  inflows: number;
  outflows: number;
  closing_balance: number;
  category: string;
  variance_vs_forecast: number;
  forecast_balance: number;
}

export interface ForecastRow {
  date: string;
  ACTUAL: number | null;
  FORECAST: number;
  L95: number | null;
  U95: number | null;
}

export interface VarianceRow {
  date: string;
  forecast: number;
  actual: number;
  var_abs: number;
  var_pct: number;
  status: 'green' | 'yellow' | 'red';
}

export interface KpiRow {
  observation_date: string;
  fed_funds: number;
  y2: number;
  y10: number;
  spread_2_10: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface Line {
  slope: number;
  intercept: number;
  r2: number;
}

export type SortKey = 'date' | 'forecast' | 'actual' | 'varAbs' | 'varPct';
export type SortDir = 'asc' | 'desc';
export type DataSource = 'synthetic' | 'real';
