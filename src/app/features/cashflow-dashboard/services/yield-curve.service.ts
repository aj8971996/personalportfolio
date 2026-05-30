import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Papa from 'papaparse';
import { YieldRow } from '../models/models';
import { latestDates, buildCurveForDate, latest2Y10Y, TENOR_ORDER, tenorLabel } from '../utils/transforms';

@Injectable({ providedIn: 'root' })
export class YieldCurveService {
  private readonly http = inject(HttpClient);

  readonly rawRows = signal<YieldRow[]>([]);
  readonly loaded  = signal(false);

  readonly latestDate = computed(() => {
    const dates = latestDates(this.rawRows(), 1);
    return dates[0] ?? '';
  });

  readonly currentCurve = computed(() =>
    buildCurveForDate(this.rawRows(), this.latestDate())
  );

  /** Overlays at -3, -6, -12 months from the most recent trading date. */
  readonly overlays = computed(() => {
    const rows = this.rawRows();
    const dates = latestDates(rows, 300); // plenty of trading days
    if (!dates.length) return { m3: [], m6: [], m12: [] };

    const recent = dates[dates.length - 1];
    const recentMs = new Date(recent).getTime();

    const closest = (targetMs: number) => {
      return dates.reduce((best, d) => {
        const ms = new Date(d).getTime();
        return Math.abs(ms - targetMs) < Math.abs(new Date(best).getTime() - targetMs) ? d : best;
      }, dates[0]);
    };

    const DAY = 86400000;
    const d3m  = closest(recentMs - 91  * DAY);
    const d6m  = closest(recentMs - 182 * DAY);
    const d12m = closest(recentMs - 365 * DAY);

    return {
      m3:  buildCurveForDate(rows, d3m),
      m6:  buildCurveForDate(rows, d6m),
      m12: buildCurveForDate(rows, d12m),
      d3m, d6m, d12m,
    };
  });

  readonly inverted = computed(() => {
    const { y2, y10 } = latest2Y10Y(this.rawRows());
    return y2 !== null && y10 !== null && y2 > y10;
  });

  readonly xAxisLabels = computed(() => TENOR_ORDER.map(tenorLabel));

  load(): void {
    this.http.get('/assets/data/yield_curve_long.csv', { responseType: 'text' }).subscribe(csv => {
      const result = Papa.parse<Record<string, string>>(csv, { header: true, skipEmptyLines: true });
      const rows: YieldRow[] = result.data.map(r => ({
        date:      r['date'] ?? '',
        maturity:  r['maturity'] ?? '',
        yield_pct: parseFloat(r['yield_pct'] ?? '0'),
        tenor_yrs: parseFloat(r['tenor_yrs'] ?? '0'),
      })).filter(r => r.date && r.maturity && !isNaN(r.yield_pct));
      this.rawRows.set(rows);
      this.loaded.set(true);
    });
  }
}
