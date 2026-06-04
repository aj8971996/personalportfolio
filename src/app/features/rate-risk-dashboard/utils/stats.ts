/** Normal CDF using the error function. */
export function normCdf(x: number): number {
  return 0.5 * (1 + erf(x / Math.SQRT2));
}

/** Two-tailed survival probability P(|Z| > k) under the standard normal. */
export function normSurvival2Tail(k: number): number {
  return 2 * (1 - normCdf(Math.abs(k)));
}

/** Error function approximation (Abramowitz & Stegun 7.1.26). */
function erf(x: number): number {
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const y =
    1 -
    t *
      (0.254829592 +
        t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429)))) *
      Math.exp(-(x * x));
  return x >= 0 ? y : -y;
}

/** Format a large number: "2,011,101 years" → "2M years" etc. */
export function formatYears(years: number): string {
  if (years >= 1_000_000_000) return `${(years / 1_000_000_000).toFixed(0)}B`;
  if (years >= 1_000_000)     return `${(years / 1_000_000).toFixed(1)}M`;
  if (years >= 1_000)         return `${(years / 1_000).toFixed(0)}K`;
  return years.toFixed(0);
}
