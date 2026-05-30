import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Papa from 'papaparse';
import { CashflowRow, ForecastRow, VarianceRow, KpiRow } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CashflowService {
  private readonly http = inject(HttpClient);

  readonly cashflowRows  = signal<CashflowRow[]>([]);
  readonly forecastRows  = signal<ForecastRow[]>([]);
  readonly varianceRows  = signal<VarianceRow[]>([]);
  readonly kpiRows       = signal<KpiRow[]>([]);

  readonly cashflowLoaded  = signal(false);
  readonly forecastLoaded  = signal(false);
  readonly varianceLoaded  = signal(false);
  readonly kpiLoaded       = signal(false);

  loadAll(): void {
    this.http.get('/assets/data/cashflow_synthetic.csv', { responseType: 'text' }).subscribe(csv => {
      const r = Papa.parse<Record<string, string>>(csv, { header: true, skipEmptyLines: true });
      this.cashflowRows.set(r.data.map(row => ({
        date:                 row['date'] ?? '',
        opening_balance:      parseFloat(row['opening_balance'] ?? '0'),
        inflows:              parseFloat(row['inflows'] ?? '0'),
        outflows:             parseFloat(row['outflows'] ?? '0'),
        closing_balance:      parseFloat(row['closing_balance'] ?? '0'),
        category:             row['category'] ?? '',
        variance_vs_forecast: parseFloat(row['variance_vs_forecast'] ?? '0'),
        forecast_balance:     parseFloat(row['forecast_balance'] ?? '0'),
      })).filter(row => row.date));
      this.cashflowLoaded.set(true);
    });

    this.http.get('/assets/data/cash_forecast.csv', { responseType: 'text' }).subscribe(csv => {
      const r = Papa.parse<Record<string, string>>(csv, { header: true, skipEmptyLines: true });
      this.forecastRows.set(r.data.map(row => ({
        date:     row['date'] ?? '',
        ACTUAL:   row['ACTUAL']   !== '' ? parseFloat(row['ACTUAL'])   : null,
        FORECAST: parseFloat(row['FORECAST'] ?? '0'),
        L95:      row['L95'] !== '' ? parseFloat(row['L95']) : null,
        U95:      row['U95'] !== '' ? parseFloat(row['U95']) : null,
      })).filter(row => row.date));
      this.forecastLoaded.set(true);
    });

    this.http.get('/assets/data/variance_table.csv', { responseType: 'text' }).subscribe(csv => {
      const r = Papa.parse<Record<string, string>>(csv, { header: true, skipEmptyLines: true });
      this.varianceRows.set(r.data.map(row => ({
        date:     row['date'] ?? '',
        forecast: parseFloat(row['forecast'] ?? '0'),
        actual:   parseFloat(row['actual'] ?? '0'),
        var_abs:  parseFloat(row['var_abs'] ?? '0'),
        var_pct:  parseFloat(row['var_pct'] ?? '0'),
        status:   (row['status'] ?? 'green') as 'green' | 'yellow' | 'red',
      })).filter(row => row.date));
      this.varianceLoaded.set(true);
    });

    this.http.get('/assets/data/rate_kpis.csv', { responseType: 'text' }).subscribe(csv => {
      const r = Papa.parse<Record<string, string>>(csv, { header: true, skipEmptyLines: true });
      this.kpiRows.set(r.data.map(row => ({
        observation_date: row['observation_date'] ?? '',
        fed_funds:   parseFloat(row['fed_funds'] ?? '0'),
        y2:          parseFloat(row['y2'] ?? '0'),
        y10:         parseFloat(row['y10'] ?? '0'),
        spread_2_10: parseFloat(row['spread_2_10'] ?? '0'),
      })).filter(row => row.observation_date));
      this.kpiLoaded.set(true);
    });
  }
}
