import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import Papa from 'papaparse';
import { DashboardControlsService } from './dashboard-controls.service';
import {
  MaturityStats, HistogramBin, QQPoint, QQRef, SigmaEvent,
} from '../models/models';

@Injectable({ providedIn: 'root' })
export class TreasuryDataService {
  private readonly http     = inject(HttpClient);
  private readonly controls = inject(DashboardControlsService);

  readonly allStats     = signal<MaturityStats[]>([]);
  readonly statsLoaded  = signal(false);
  readonly histData     = signal<HistogramBin[]>([]);
  readonly qqData       = signal<QQPoint[]>([]);
  readonly qqRef        = signal<QQRef | null>(null);
  readonly eventsData   = signal<SigmaEvent[]>([]);
  readonly detailLoaded = signal(false);

  readonly currentStats = computed<MaturityStats | null>(() => {
    const mat    = this.controls.maturity();
    const metric = this.controls.metric();
    return this.allStats().find(s => s.maturity === mat && s.metric === metric) ?? null;
  });

  constructor() {
    // Reload detail data whenever maturity or metric changes (after initial stats load).
    effect(() => {
      const mat    = this.controls.maturity();
      const metric = this.controls.metric();
      if (this.statsLoaded()) {
        this.loadDetail(mat, metric);
      }
    });
  }

  loadAll(): void {
    this.http
      .get<MaturityStats[]>('/assets/data/processed/stats_all.json')
      .subscribe(data => {
        this.allStats.set(data);
        this.statsLoaded.set(true);
        // The effect above will fire when statsLoaded flips to true, triggering loadDetail.
      });
  }

  private loadDetail(mat: string, metric: string): void {
    this.detailLoaded.set(false);
    const base = '/assets/data/processed';
    forkJoin({
      hist:   this.http.get(`${base}/histogram_${mat}_${metric}.csv`,  { responseType: 'text' }),
      qq:     this.http.get(`${base}/qq_${mat}_${metric}.csv`,         { responseType: 'text' }),
      qqRef:  this.http.get<QQRef>(`${base}/qq_ref_${mat}_${metric}.json`),
      events: this.http.get(`${base}/events_${mat}_${metric}.csv`,     { responseType: 'text' }),
    }).subscribe(({ hist, qq, qqRef, events }) => {
      this.histData.set(this.parseHist(hist));
      this.qqData.set(this.parseQQ(qq));
      this.qqRef.set(qqRef);
      this.eventsData.set(this.parseEvents(events));
      this.detailLoaded.set(true);
    });
  }

  private parseHist(csv: string): HistogramBin[] {
    const r = Papa.parse<Record<string, string>>(csv, { header: true, skipEmptyLines: true });
    return r.data.map(row => ({
      bin_center:        parseFloat(row['bin_center'] ?? '0'),
      count:             parseFloat(row['count'] ?? '0'),
      normal_pdf_scaled: parseFloat(row['normal_pdf_scaled'] ?? '0'),
    }));
  }

  private parseQQ(csv: string): QQPoint[] {
    const r = Papa.parse<Record<string, string>>(csv, { header: true, skipEmptyLines: true });
    return r.data.map(row => ({
      theoretical_quantile: parseFloat(row['theoretical_quantile'] ?? '0'),
      sample_quantile:      parseFloat(row['sample_quantile'] ?? '0'),
    }));
  }

  private parseEvents(csv: string): SigmaEvent[] {
    const r = Papa.parse<Record<string, string>>(csv, { header: true, skipEmptyLines: true });
    return r.data
      .filter(row => row['date'])
      .map(row => ({
        date:           row['date'] ?? '',
        delta:          parseFloat(row['delta'] ?? '0'),
        sigma_distance: parseFloat(row['sigma_distance'] ?? '0'),
        direction:      (row['direction'] === 'up' ? 'up' : 'down') as 'up' | 'down',
        macro_tag:      row['macro_tag'] ?? '',
      }));
  }
}
