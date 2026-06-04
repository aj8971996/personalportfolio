import { SigmaEvent } from '../models/models';
import { Window } from '../models/models';

const WINDOW_RANGES: Record<Window, { start: string; end: string } | null> = {
  full:   null,
  '2008': { start: '2007-01-01', end: '2010-12-31' },
  '2020': { start: '2019-06-01', end: '2021-06-30' },
  '2022': { start: '2021-06-01', end: '2024-12-31' },
  custom: null,
};

export function filterEventsByWindow(events: SigmaEvent[], window: Window): SigmaEvent[] {
  const range = WINDOW_RANGES[window];
  if (!range) return events;
  return events.filter(e => e.date >= range.start && e.date <= range.end);
}

/** Maturity display color (consistent across all panels). */
export const MATURITY_COLORS: Record<string, string> = {
  '3M':  '#0ea5e9',  // sky-500
  '2Y':  '#14b8a6',  // teal-500
  '5Y':  '#f59e0b',  // amber-500
  '10Y': '#2563eb',  // blue-600
  '30Y': '#7c3aed',  // violet-600
};

export function maturityColor(mat: string): string {
  return MATURITY_COLORS[mat] ?? '#6366f1';
}

export function metricLabel(metric: string): string {
  return metric === 'bps' ? 'Δ Yield (bps)' : 'Log Return';
}

export function metricUnit(metric: string): string {
  return metric === 'bps' ? 'bps' : '';
}
