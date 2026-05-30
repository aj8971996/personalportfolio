import { Component, inject, computed, OnInit } from '@angular/core';
import { CashflowService } from '../../services/cashflow.service';

interface KpiCard {
  label: string;
  value: string;
  unit: string;
  status: 'green' | 'yellow' | 'red';
  statusLabel: string;
  sparkData: number[];
  sparkColor: string;
  footnote: string;
}

@Component({
  selector: 'app-rate-kpi-panel',
  standalone: true,
  imports: [],
  templateUrl: './rate-kpi-panel.component.html',
})
export class RateKpiPanelComponent implements OnInit {
  private readonly svc = inject(CashflowService);

  readonly loaded = computed(() => this.svc.kpiLoaded());

  private spreadStatus(spread: number): { status: KpiCard['status']; label: string } {
    if (spread < 0)    return { status: 'red',    label: 'Inverted' };
    if (spread < 0.25) return { status: 'yellow', label: 'Flat' };
    return { status: 'green', label: 'Normal' };
  }

  readonly kpiCards = computed<KpiCard[]>(() => {
    const rows = this.svc.kpiRows();
    if (!rows.length) return [];

    const latest = rows[rows.length - 1];
    const spreadInfo = this.spreadStatus(latest.spread_2_10);
    const durationExposure = +(8.5 * 100_000_000 * 0.0001 / 1_000_000).toFixed(2);

    return [
      {
        label: 'Fed Funds Rate',
        value: latest.fed_funds.toFixed(2),
        unit: '%',
        status: 'green',
        statusLabel: 'Current',
        sparkData: rows.map(r => r.fed_funds),
        sparkColor: '#3b82f6',
        footnote: `FRED DFF · as of ${latest.observation_date}`,
      },
      {
        label: '10Y Treasury Yield',
        value: latest.y10.toFixed(2),
        unit: '%',
        status: 'green',
        statusLabel: 'Current',
        sparkData: rows.map(r => r.y10),
        sparkColor: '#6366f1',
        footnote: `FRED DGS10 · as of ${latest.observation_date}`,
      },
      {
        label: '2Y–10Y Spread',
        value: latest.spread_2_10 >= 0
          ? `+${latest.spread_2_10.toFixed(2)}`
          : latest.spread_2_10.toFixed(2),
        unit: 'pp',
        status: spreadInfo.status,
        statusLabel: spreadInfo.label,
        sparkData: rows.map(r => r.spread_2_10),
        sparkColor: spreadInfo.status === 'red' ? '#ef4444'
                  : spreadInfo.status === 'yellow' ? '#f59e0b' : '#22c55e',
        footnote: `DGS10 − DGS2 · as of ${latest.observation_date}`,
      },
      {
        label: 'Duration Exposure (est.)',
        value: `$${durationExposure.toFixed(1)}M`,
        unit: '/bp',
        status: 'yellow',
        statusLabel: 'Illustrative',
        sparkData: rows.map(r => 8.5 * r.y10 * 10),
        sparkColor: '#f59e0b',
        footnote: 'MD 8.5 · $100M notional · 1bp · illustrative',
      },
    ];
  });

  ngOnInit(): void {
    this.svc.loadAll();
  }

  statusDotClass(status: KpiCard['status']): string {
    return { green: 'bg-green-500', yellow: 'bg-yellow-500', red: 'bg-red-500' }[status];
  }

  statusTextClass(status: KpiCard['status']): string {
    return { green: 'text-green-600', yellow: 'text-yellow-600', red: 'text-red-600' }[status];
  }

  /** Convert data array to SVG polyline points string in a 120x48 viewBox. */
  toSparkPoints(data: number[]): string {
    if (data.length < 2) return '';
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const W = 120, H = 48;
    return data
      .map((v, i) => {
        const x = (i / (data.length - 1)) * W;
        const y = H - ((v - min) / range) * (H - 4) - 2;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  }
}
