import {
  FRPPRecord, TravelRecord, KPIData, StateUtilization,
  AgencyCost, PredictiveFlag, ScatterPoint,
} from './types';
import { linearRegression, detectAnomalies } from './regression';

export function computeKPIs(data: FRPPRecord[]): KPIData {
  const n = data.length;
  if (n === 0) return { totalAssets: 0, avgUtilization: 0, flaggedCount: 0, leasedPct: 0, ownedPct: 100 };
  const avgUtilization = data.reduce((s, r) => s + r.utilizationPct, 0) / n;
  const flaggedCount = data.filter(r => r.utilizationPct < 60).length;
  const leasedCount = data.filter(r => r.ownedOrLeased === 'Leased').length;
  return {
    totalAssets: n,
    avgUtilization,
    flaggedCount,
    leasedPct: (leasedCount / n) * 100,
    ownedPct: ((n - leasedCount) / n) * 100,
  };
}

export function computeStateUtilization(data: FRPPRecord[]): StateUtilization[] {
  const grouped: Record<string, { sum: number; count: number }> = {};
  for (const r of data) {
    if (!grouped[r.state]) grouped[r.state] = { sum: 0, count: 0 };
    grouped[r.state].sum += r.utilizationPct;
    grouped[r.state].count++;
  }
  return Object.entries(grouped)
    .filter(([, v]) => v.count >= 2)
    .map(([state, { sum, count }]) => ({ state, avgUtil: sum / count, count }))
    .sort((a, b) => a.avgUtil - b.avgUtil)
    .slice(0, 22);
}

export function computeAgencyCost(
  data: FRPPRecord[],
  ownership: 'All' | 'Owned' | 'Leased',
): AgencyCost[] {
  const subset = ownership === 'All' ? data : data.filter(r => r.ownedOrLeased === ownership);
  const grouped: Record<string, { totalCost: number; totalSqft: number; count: number }> = {};
  for (const r of subset) {
    const cost = r.ownedOrLeased === 'Leased' ? r.annualRent : r.annualCost;
    if (cost <= 0 || r.squareFeetRentable <= 0) continue;
    if (!grouped[r.agencyName]) grouped[r.agencyName] = { totalCost: 0, totalSqft: 0, count: 0 };
    grouped[r.agencyName].totalCost += cost;
    grouped[r.agencyName].totalSqft += r.squareFeetRentable;
    grouped[r.agencyName].count++;
  }
  return Object.entries(grouped)
    .filter(([, v]) => v.totalSqft > 0)
    .map(([agency, { totalCost, totalSqft, count }]) => ({
      agency,
      costPerSqft: totalCost / totalSqft,
      totalCost,
      assetCount: count,
    }))
    .sort((a, b) => b.costPerSqft - a.costPerSqft)
    .slice(0, 15);
}

export function computeScatterData(data: FRPPRecord[]): {
  owned: ScatterPoint[];
  leased: ScatterPoint[];
  trendLine: { x: number; y: number }[];
} {
  const buildings = data.filter(r => r.assetType === 'Building' && r.constructionYear > 0);
  const owned: ScatterPoint[] = [];
  const leased: ScatterPoint[] = [];

  for (const r of buildings) {
    const radius = Math.max(3, Math.min(18, Math.sqrt(r.squareFeetRentable / 3000)));
    const pt: ScatterPoint = {
      x: r.constructionYear,
      y: r.utilizationPct,
      r: radius,
      label: r.installationName,
    };
    if (r.ownedOrLeased === 'Owned') owned.push(pt); else leased.push(pt);
  }

  const allPts = [...owned, ...leased].map(p => ({ x: p.x, y: p.y }));
  const reg = linearRegression(allPts);
  const years = allPts.map(p => p.x);
  const minY = Math.min(...years), maxY = Math.max(...years);
  const trendLine = [
    { x: minY, y: reg.slope * minY + reg.intercept },
    { x: maxY, y: reg.slope * maxY + reg.intercept },
  ];

  return { owned, leased, trendLine };
}

export function computePredictiveFlags(data: FRPPRecord[]): PredictiveFlag[] {
  return data
    .filter(r => r.assetType === 'Building')
    .map(r => {
      const delta = r.utilizationPct - r.prevUtilizationPct;
      const trend: PredictiveFlag['trend'] = delta > 3 ? 'up' : delta < -3 ? 'down' : 'stable';
      const predictedNext = Math.round(Math.max(5, Math.min(100, r.utilizationPct + delta)) * 10) / 10;
      return {
        installationName: r.installationName,
        state: r.state,
        agencyName: r.agencyName,
        assetType: r.assetType,
        squareFeetRentable: r.squareFeetRentable,
        annualRent: r.annualRent,
        currentUtil: r.utilizationPct,
        prevUtil: r.prevUtilizationPct,
        trend,
        predictedNext,
      };
    })
    .sort((a, b) => a.currentUtil - b.currentUtil)
    .slice(0, 20);
}

export interface MonthlyTEData {
  labels: string[];
  labelsFull: string[];
  series: Record<string, number[]>;
  anomalies: Record<string, boolean[]>;
}

export function computeMonthlyTE(
  data: TravelRecord[],
  category: 'All' | 'Travel' | 'Meals' | 'Lodging' | 'Fleet',
): MonthlyTEData {
  const MONTHS: string[] = [];
  const LABELS_FULL: string[] = [];
  const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let y = 2023; y <= 2024; y++) {
    for (let m = 0; m < 12; m++) {
      MONTHS.push(`${y}-${String(m + 1).padStart(2, '0')}`);
      LABELS_FULL.push(`${MONTH_NAMES[m]} '${String(y).slice(2)}`);
    }
  }

  const cats: TravelRecord['category'][] =
    category === 'All' ? ['Travel', 'Meals', 'Lodging', 'Fleet'] : [category];

  const series: Record<string, number[]> = {};
  for (const cat of cats) {
    series[cat] = MONTHS.map(month =>
      data
        .filter(rec => rec.date.startsWith(month) && rec.category === cat)
        .reduce((s, rec) => s + rec.amount, 0),
    );
  }

  const anomalies: Record<string, boolean[]> = {};
  for (const [cat, vals] of Object.entries(series)) {
    anomalies[cat] = detectAnomalies(vals);
  }

  return { labels: MONTHS, labelsFull: LABELS_FULL, series, anomalies };
}

export function uniqueStates(data: FRPPRecord[]): string[] {
  return Array.from(new Set(data.map(r => r.state))).sort();
}

export function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}
