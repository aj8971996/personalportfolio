export interface RegressionResult {
  slope: number;
  intercept: number;
}

export function linearRegression(points: { x: number; y: number }[]): RegressionResult {
  const n = points.length;
  if (n < 2) return { slope: 0, intercept: points[0]?.y ?? 50 };
  const sumX = points.reduce((a, p) => a + p.x, 0);
  const sumY = points.reduce((a, p) => a + p.y, 0);
  const sumXY = points.reduce((a, p) => a + p.x * p.y, 0);
  const sumX2 = points.reduce((a, p) => a + p.x * p.x, 0);
  const denom = n * sumX2 - sumX * sumX;
  if (denom === 0) return { slope: 0, intercept: sumY / n };
  const slope = (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
}

export function detectAnomalies(series: number[], windowSize = 6, threshold = 1.5): boolean[] {
  return series.map((val, i) => {
    if (i < windowSize) return false;
    const w = series.slice(i - windowSize, i);
    const mean = w.reduce((a, b) => a + b, 0) / windowSize;
    const std = Math.sqrt(w.reduce((a, b) => a + (b - mean) ** 2, 0) / windowSize);
    if (std === 0) return false;
    return Math.abs(val - mean) > threshold * std;
  });
}
