import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import { CashflowService } from '../../services/cashflow.service';
import { DashboardFilterService } from '../../services/dashboard-filter.service';
import { buildWaterfallOption } from '../../utils/forecast';
import { buildWaterfallForPeriod } from '../../utils/transforms';

@Component({
  selector: 'app-waterfall-panel',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './waterfall-panel.component.html',
})
export class WaterfallPanelComponent implements OnInit {
  private readonly svc    = inject(CashflowService);
  private readonly filter = inject(DashboardFilterService);

  readonly loaded = computed(() => this.svc.cashflowLoaded());

  readonly availablePeriods = computed(() => {
    const dates = this.svc.cashflowRows().map(r => r.date);
    return this.filter.availablePeriods(dates);
  });

  readonly selectedPeriod = this.filter.selectedPeriod;

  readonly currentPeriod = computed(() => {
    const p = this.selectedPeriod();
    const periods = this.availablePeriods();
    if (p && periods.includes(p)) return p;
    return periods[periods.length - 1] ?? '';
  });

  readonly chartOptions = computed(() => {
    const period = this.currentPeriod();
    if (!period) return {};
    const rows = this.svc.cashflowRows();
    const { labels, values } = buildWaterfallForPeriod(rows, period);
    if (!labels.length) return {};
    return buildWaterfallOption(labels, values);
  });

  ngOnInit(): void {
    this.svc.loadAll();
  }

  selectPeriod(p: string): void {
    this.filter.selectedPeriod.set(p);
  }
}
