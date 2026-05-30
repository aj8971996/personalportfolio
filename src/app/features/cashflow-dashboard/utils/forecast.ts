import { ForecastRow, Point, Line, VarianceRow } from '../models/models';
import type { EChartsOption } from 'echarts';

export type VarianceStatus = 'green' | 'yellow' | 'red';

export function variance(actual: number, forecast: number): { abs: number; pct: number; status: VarianceStatus } {
  const abs = actual - forecast;
  const pct = forecast === 0 ? 0 : (abs / Math.abs(forecast)) * 100;
  const a = Math.abs(pct);
  const status: VarianceStatus = a <= 5 ? 'green' : a <= 15 ? 'yellow' : 'red';
  return { abs, pct, status };
}

export function zScoreAnomalies(values: number[], threshold = 2.5): boolean[] {
  const n = values.length;
  if (n === 0) return [];
  const mean = values.reduce((a, b) => a + b, 0) / n;
  const std = Math.sqrt(values.reduce((s, v) => s + (v - mean) ** 2, 0) / n);
  if (std === 0) return values.map(() => false);
  return values.map(v => Math.abs((v - mean) / std) > threshold);
}

export function linearRegression(pts: Point[]): Line {
  const n = pts.length;
  if (n < 2) return { slope: 0, intercept: pts[0]?.y ?? 0, r2: 0 };
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

export function exportCsv(rows: Record<string, unknown>[], filename: string): void {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown) => {
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

/** Build ECharts waterfall option from labels + signed delta values. */
export function buildWaterfallOption(labels: string[], values: number[]): EChartsOption {
  const help: (number | '-')[] = [];
  const pos:  (number | '-')[] = [];
  const neg:  (number | '-')[] = [];
  let sum = 0;
  values.forEach((v, i) => {
    if (v >= 0) { pos.push(v); neg.push('-'); } else { pos.push('-'); neg.push(-v); }
    if (i === 0) { help.push(0); }
    else { sum += values[i - 1]; help.push(v < 0 ? sum + v : sum); }
  });
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: unknown) => {
        const ps = params as Array<{ name: string; seriesName: string; value: number | string; color: string; dataIndex: number }>;
        const dataIdx = (ps[0] as { dataIndex?: number })?.dataIndex ?? 0;
        const label = labels[dataIdx] ?? '';
        const v = values[dataIdx];
        const sign = v >= 0 ? '+' : '';
        const formatted = v != null ? `${sign}$${Math.abs(v).toLocaleString()}` : '';
        return `${label}<br/>${formatted}`;
      },
    },
    grid: { left: '3%', right: '4%', bottom: '8%', top: '4%', containLabel: true },
    xAxis: {
      type: 'category',
      splitLine: { show: false },
      data: labels,
      axisLabel: { color: '#94a3b8', fontSize: 11 },
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#94a3b8',
        fontSize: 11,
        formatter: (v: number) => `$${(v / 1_000_000).toFixed(1)}M`,
      },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
    },
    series: [
      {
        name: 'base', type: 'bar', stack: 'all',
        itemStyle: { color: 'transparent', borderColor: 'transparent' },
        emphasis: { itemStyle: { color: 'transparent' } },
        data: help,
        silent: true,
      },
      { name: 'Inflow',  type: 'bar', stack: 'all', itemStyle: { color: '#22c55e', borderRadius: [4, 4, 0, 0] }, data: pos },
      { name: 'Outflow', type: 'bar', stack: 'all', itemStyle: { color: '#ef4444', borderRadius: [4, 4, 0, 0] }, data: neg },
    ],
  } as EChartsOption;
}
