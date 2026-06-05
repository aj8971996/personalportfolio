import { Component, inject, computed } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { TreasuryDataService } from '../../services/treasury-data.service';
import { DashboardControlsService } from '../../services/dashboard-controls.service';
import { metricLabel, maturityColor } from '../../utils/transforms';

@Component({
  selector: 'app-distribution-fit-panel',
  standalone: true,
  imports: [NgxEchartsDirective],
  template: `
    <div class="cf-panel">
      <div class="cf-panel-header">
        <div>
          <h2 class="cf-panel-title">How daily rate moves are spread out</h2>
          <p class="cf-panel-caption">
            Bars show how many trading days had each size of move. The red curve is what a perfectly
            normal distribution would predict. Shaded bands mark ±1σ, ±2σ, and ±3σ — where 68%, 95%,
            and 99.7% of days should land if markets were truly normal. Watch the bar tops at the edges:
            if they clear the red curve, real markets had more extremes than the model allows.
          </p>
        </div>
      </div>

      @if (!svc.detailLoaded()) {
        <div class="cf-skeleton" style="height:420px"></div>
      } @else {
        @if (stats(); as s) {
          <div class="stat-row">
            <span class="stat-chip">avg move: {{ s.mu.toFixed(2) }} {{ unit() }}</span>
            <span class="stat-chip">typical swing: ±{{ s.sigma.toFixed(2) }} {{ unit() }}</span>
            <span class="stat-chip" [class.warn]="Math.abs(s.skewness) > 0.5">
              lean: {{ s.skewness.toFixed(2) }}
              <span class="chip-gloss">(0 = symmetric)</span>
            </span>
            <span class="stat-chip" [class.warn]="s.excess_kurtosis > 1">
              tail weight: {{ s.excess_kurtosis.toFixed(1) }}
              <span class="chip-gloss">(0 = normal; higher = heavier tails)</span>
            </span>
          </div>
        }
        <div echarts [options]="chartOptions()" style="height:420px"></div>
        <p class="cf-panel-note">
          σ (sigma) = standard deviation of daily changes, the model's measure of a "typical" move.
          The empirical rule — 68/95/99.7% within ±1/2/3σ — holds only for a true normal distribution.
        </p>
      }
    </div>
  `,
  styles: [`
    .cf-panel {
      background: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.25rem 1.5rem;
      height: 100%;
      box-sizing: border-box;
    }
    .cf-panel-header { margin-bottom: 1rem; }
    .cf-panel-title {
      font-family: var(--font-display);
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.2rem;
    }
    .cf-panel-caption {
      font-size: 0.78rem;
      color: var(--text-muted);
      line-height: 1.55;
      max-width: 580px;
    }
    .cf-skeleton {
      background: var(--bg-raised);
      border-radius: 8px;
      animation: pulse 1.5s ease-in-out infinite;
    }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .stat-row { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.75rem; }
    .stat-chip {
      font-size: 0.68rem;
      font-family: var(--font-mono);
      background: var(--bg-raised);
      border: 1px solid var(--border);
      border-radius: 0.375rem;
      padding: 0.2rem 0.5rem;
      color: var(--text-secondary);
    }
    .stat-chip.warn {
      background: rgba(245,158,11,0.08);
      border-color: rgba(245,158,11,0.25);
      color: #fcd34d;
    }
    .chip-gloss { opacity: 0.55; margin-left: 0.2rem; }
    .cf-panel-note {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      color: var(--text-muted);
      margin-top: 0.75rem;
      border-top: 1px solid var(--border);
      padding-top: 0.6rem;
    }
  `],
})
export class DistributionFitPanelComponent {
  protected readonly svc      = inject(TreasuryDataService);
  private  readonly controls  = inject(DashboardControlsService);
  protected readonly Math     = Math;

  protected readonly stats = computed(() => this.svc.currentStats());
  protected readonly unit  = computed(() => this.controls.metric() === 'bps' ? 'bps' : '');

  readonly chartOptions = computed<EChartsOption>(() => {
    const hist   = this.svc.histData();
    const s      = this.svc.currentStats();
    const mat    = this.controls.maturity();
    const metric = this.controls.metric();
    if (!hist.length || !s) return {} as EChartsOption;

    const mu    = s.mu;
    const sigma = s.sigma;
    const color = maturityColor(mat);
    const xLabel = metricLabel(metric);

    const bandAlpha = 0.07;
    const bandData: [{ xAxis: number }, { xAxis: number }][] = [
      [{ xAxis: mu - 3 * sigma }, { xAxis: mu + 3 * sigma }],
      [{ xAxis: mu - 2 * sigma }, { xAxis: mu + 2 * sigma }],
      [{ xAxis: mu - sigma },     { xAxis: mu + sigma }],
    ];
    const bandColors = [
      `rgba(239,68,68,${bandAlpha})`,
      `rgba(245,158,11,${bandAlpha * 1.4})`,
      `rgba(34,197,94,${bandAlpha * 1.8})`,
    ];

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: '#18181F',
        borderColor: 'rgba(255,255,255,0.08)',
        textStyle: { color: '#f1f5f9', fontSize: 12 },
        formatter: (params: unknown) => {
          const ps = params as Array<{ seriesName: string; value: [number, number]; marker: string }>;
          if (!ps.length) return '';
          const center = ps[0].value[0].toFixed(metric === 'bps' ? 1 : 4);
          return ps.map(p =>
            `${p.marker} ${p.seriesName}: <b>${typeof p.value === 'object' ? p.value[1].toFixed(0) : p.value} days</b>`
          ).join('<br/>') + `<br/><span style="font-size:11px;color:#94a3b8">${xLabel} ≈ ${center}</span>`;
        },
      },
      legend: { bottom: 0, textStyle: { color: '#94a3b8', fontSize: 11 } },
      grid: { top: 20, bottom: 50, left: 65, right: 20 },
      xAxis: {
        type: 'value',
        name: xLabel,
        nameLocation: 'middle',
        nameGap: 30,
        axisLabel: { color: '#94a3b8', fontSize: 11, formatter: (v: number) => v.toFixed(metric === 'bps' ? 0 : 3) },
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } },
        splitLine: { show: false },
      },
      yAxis: {
        type: 'value',
        name: 'Days',
        axisLabel: { color: '#94a3b8', fontSize: 11 },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.04)' } },
      },
      series: [
        {
          name: 'Actual history',
          type: 'bar',
          data: hist.map(b => [b.bin_center, b.count]),
          barMaxWidth: 20,
          itemStyle: { color, opacity: 0.75 },
          markArea: {
            silent: true,
            data: bandData.map((bd, i) => [
              { xAxis: bd[0].xAxis, itemStyle: { color: bandColors[i] } },
              { xAxis: bd[1].xAxis },
            ]) as unknown as [object, object][],
          },
        },
        {
          name: 'Normal model prediction',
          type: 'line',
          data: hist.map(b => [b.bin_center, b.normal_pdf_scaled]),
          lineStyle: { color: '#ef4444', width: 2.5 },
          itemStyle: { color: '#ef4444' },
          symbol: 'none',
          smooth: true,
        },
      ],
    };
  });
}
