import { groupBy, sumBy } from 'lodash-es';
import { CashflowRow, YieldRow } from '../models/models';

export const TENOR_ORDER = ['1Mo','1.5Mo','2Mo','3Mo','4Mo','6Mo','1Yr','2Yr','3Yr','5Yr','7Yr','10Yr','20Yr','30Yr'];
const TENOR_LABELS: Record<string, string> = {
  '1Mo':'1M','1.5Mo':'1.5M','2Mo':'2M','3Mo':'3M','4Mo':'4M','6Mo':'6M',
  '1Yr':'1Y','2Yr':'2Y','3Yr':'3Y','5Yr':'5Y','7Yr':'7Y','10Yr':'10Y','20Yr':'20Y','30Yr':'30Y',
};

export function tenorLabel(code: string): string {
  return TENOR_LABELS[code] ?? code;
}

/** Return the most recent N distinct dates from the yield data. */
export function latestDates(rows: YieldRow[], n: number): string[] {
  const dates = [...new Set(rows.map(r => r.date))].sort();
  return dates.slice(-n);
}

/** Build one yield curve series (ordered by tenor) for a given date. */
export function buildCurveForDate(rows: YieldRow[], date: string): (number | null)[] {
  const byMaturity: Record<string, number> = {};
  rows.filter(r => r.date === date).forEach(r => { byMaturity[r.maturity] = r.yield_pct; });
  return TENOR_ORDER.map(m => byMaturity[m] ?? null);
}

/** Return the 2Y and 10Y yields for the most recent date. */
export function latest2Y10Y(rows: YieldRow[]): { y2: number | null; y10: number | null } {
  const latest = latestDates(rows, 1)[0];
  if (!latest) return { y2: null, y10: null };
  const byMat: Record<string, number> = {};
  rows.filter(r => r.date === latest).forEach(r => { byMat[r.maturity] = r.yield_pct; });
  return { y2: byMat['2Yr'] ?? null, y10: byMat['10Yr'] ?? null };
}

/** Aggregate weekly rows to monthly opening/closing for the waterfall. */
export function buildWaterfallForPeriod(rows: CashflowRow[], period: string): {
  labels: string[];
  values: number[];
} {
  const periodRows = rows.filter(r => r.date.startsWith(period));
  if (!periodRows.length) {
    return { labels: [], values: [] };
  }

  const sorted = [...periodRows].sort((a, b) => a.date < b.date ? -1 : 1);
  const opening = sorted[0].opening_balance;
  const closing = sorted[sorted.length - 1].closing_balance;

  const grouped = groupBy(sorted, r => r.category);
  const cats = ['Operating', 'Financing', 'Investing'];

  const labels: string[] = ['Opening'];
  const values: number[] = [opening];

  for (const cat of cats) {
    const catRows = grouped[cat] ?? [];
    if (!catRows.length) continue;
    const net = sumBy(catRows, r => r.inflows - r.outflows);
    labels.push(cat);
    values.push(net);
  }

  labels.push('Closing');
  values.push(closing);

  return { labels, values };
}

export function formatCurrency(v: number): string {
  const abs = Math.abs(v);
  if (abs >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000)     return `$${(v / 1_000).toFixed(0)}K`;
  return `$${v.toFixed(0)}`;
}

export function formatPct(v: number): string {
  return `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`;
}
