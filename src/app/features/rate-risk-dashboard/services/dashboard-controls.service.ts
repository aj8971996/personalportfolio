import { Injectable, signal } from '@angular/core';
import { Maturity, Metric, Window } from '../models/models';

@Injectable({ providedIn: 'root' })
export class DashboardControlsService {
  readonly maturity = signal<Maturity>('10Y');
  readonly metric   = signal<Metric>('bps');
  readonly window   = signal<Window>('full');
}
