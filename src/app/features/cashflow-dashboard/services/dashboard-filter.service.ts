import { Injectable, signal, computed } from '@angular/core';
import { DataSource } from '../models/models';

@Injectable({ providedIn: 'root' })
export class DashboardFilterService {
  readonly dataSource = signal<DataSource>('synthetic');
  readonly selectedPeriod = signal<string>('');

  /** Derived list of available YYYY-MM period strings from provided dates. */
  availablePeriods(dates: string[]): string[] {
    const months = [...new Set(dates.map(d => d.slice(0, 7)))].sort();
    return months;
  }
}
