export type Maturity = '3M' | '2Y' | '5Y' | '10Y' | '30Y';
export type Metric   = 'bps' | 'log';
export type Window   = 'full' | '2008' | '2020' | '2022' | 'custom';

export interface SigmaBand {
  k: number;
  expected_count_normal: number;
  actual_count: number;
  expected_years_between: number;
}

export interface VarThreshold {
  z: number;
  var_loss: number;
  var_gain: number;
}

export interface MaturityStats {
  maturity: string;
  series_id: string;
  metric: string;
  n: number;
  date_start: string;
  date_end: string;
  mu: number;
  sigma: number;
  skewness: number;
  excess_kurtosis: number;
  min: number;
  min_date: string;
  max: number;
  max_date: string;
  var_thresholds: { '95': VarThreshold; '99': VarThreshold; '999': VarThreshold };
  sigma_bands: SigmaBand[];
}

export interface HistogramBin {
  bin_center: number;
  count: number;
  normal_pdf_scaled: number;
}

export interface QQPoint {
  theoretical_quantile: number;
  sample_quantile: number;
}

export interface QQRef {
  ref_min: number;
  ref_max: number;
}

export interface SigmaEvent {
  date: string;
  delta: number;
  sigma_distance: number;
  direction: 'up' | 'down';
  macro_tag: string;
}
