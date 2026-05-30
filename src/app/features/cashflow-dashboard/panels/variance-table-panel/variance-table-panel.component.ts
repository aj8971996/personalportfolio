import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { CashflowService } from '../../services/cashflow.service';
import { exportCsv } from '../../utils/forecast';
import { VarianceRow, SortKey, SortDir } from '../../models/models';
import { formatCurrency, formatPct } from '../../utils/transforms';

@Component({
  selector: 'app-variance-table-panel',
  standalone: true,
  imports: [],
  templateUrl: './variance-table-panel.component.html',
  styleUrls: ['./variance-table-panel.component.scss'],
})
export class VarianceTablePanelComponent implements OnInit {
  readonly tableCols: Array<{ key: SortKey; label: string }> = [
    { key: 'date',     label: 'Period'       },
    { key: 'forecast', label: 'Forecast'     },
    { key: 'actual',   label: 'Actual'       },
    { key: 'varAbs',   label: 'Variance ($)' },
    { key: 'varPct',   label: 'Variance (%)'  },
  ];
  private readonly svc = inject(CashflowService);

  readonly loaded = computed(() => this.svc.varianceLoaded());

  readonly sortKey = signal<SortKey>('date');
  readonly sortDir = signal<SortDir>('desc');

  readonly sortedRows = computed(() => {
    const rows = [...this.svc.varianceRows()];
    const key  = this.sortKey();
    const dir  = this.sortDir();

    const valueOf = (r: VarianceRow): string | number => {
      switch (key) {
        case 'date':     return r.date;
        case 'forecast': return r.forecast;
        case 'actual':   return r.actual;
        case 'varAbs':   return r.var_abs;
        case 'varPct':   return r.var_pct;
      }
    };

    rows.sort((a, b) => {
      const av = valueOf(a), bv = valueOf(b);
      if (av < bv) return dir === 'asc' ? -1 : 1;
      if (av > bv) return dir === 'asc' ?  1 : -1;
      return 0;
    });

    return rows;
  });

  ngOnInit(): void {
    this.svc.loadAll();
  }

  setSort(key: SortKey): void {
    if (this.sortKey() === key) {
      this.sortDir.update(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortKey.set(key);
      this.sortDir.set('asc');
    }
  }

  sortIcon(key: SortKey): string {
    if (this.sortKey() !== key) return '↕';
    return this.sortDir() === 'asc' ? '↑' : '↓';
  }

  statusBadgeClass(status: 'green' | 'yellow' | 'red'): string {
    return { green: 'badge-ok', yellow: 'badge-watch', red: 'badge-breach' }[status];
  }

  statusLabel(status: 'green' | 'yellow' | 'red'): string {
    return { green: 'On-track', yellow: 'Watch', red: 'Breach' }[status];
  }

  fmt(v: number): string { return formatCurrency(v); }
  fmtPct(v: number): string { return formatPct(v); }

  exportTable(): void {
    const rows = this.sortedRows().map(r => ({
      Period:       r.date,
      Forecast:     r.forecast,
      Actual:       r.actual,
      'Variance ($)': r.var_abs,
      'Variance (%)': r.var_pct,
      Status:        r.status,
    }));
    exportCsv(rows as unknown as Record<string, unknown>[], 'cashflow-variance.csv');
  }
}
