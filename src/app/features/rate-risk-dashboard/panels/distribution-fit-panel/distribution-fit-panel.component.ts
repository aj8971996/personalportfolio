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
    <div class="panel-card">
      <div class="panel-header">
        <h2 class="panel-title">Distribution Fit</h2>
        <p class="panel-sub">Observed daily changes vs. fitted normal — bars: actual, red line: normal model</p>
      </div>

      @if (!svc.detailLoaded()) {
        <div class="skeleton" style="height:420px"></div>
      } @else {
        <!-- Stats overlay -->
        @if (stats(); as s) {
          <div class="stat-row">
            <span class="stat-chip">μ = {{ s.mu.toFixed(3) }} {{ unit() }}</span>
            <span class="stat-chip">σ = {{ s.sigma.toFixed(3) }} {{ unit() }}</span>
            <span class="stat-chip" [class.warn]="Math.abs(s.skewness) > 0.5">Skew = {{ s.skewness.toFixed(2) }}</span>
            <span class="stat-chip" [class.warn]="s.excess_kurtosis > 1">Excess Kurt. = {{ s.excess_kurtosis.toFixed(2) }}</span>
          </div>
        }
        <div echarts [options]="chartOptions()" style="height:420px"></div>
        <p class="panel-footnote">
          Empirical rule: 68% of observations fall within ±1σ, 95% within ±2σ, 99.7% within ±3σ —
          only if the distribution is normal. Fat tails make the rule break down.
        </p>
      }
    </div>
  `,
  styles: [`
    .panel-card { background:#fff; border-radius:0.75rem; box-shadow:0 1px 2px rgba(0,0,0,.05);
      ring-width:1px; ring-color:#f3f4f6; padding:1.5rem; }
    .panel-header { margin-bottom:1rem; }
    .panel-title { font-size:1rem; font-weight:600; color:#111827; }
    .panel-sub { font-size:0.75rem; color:#6b7280; margin-top:0.25rem; }
    .skeleton { background:linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%);
      background-size:200% 100%; animation:shimmer 1.4s infinite; border-radius:0.5rem; }
    @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
    .stat-row { display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem; }
    .stat-chip { font-size:0.7rem; font-family:monospace; background:#f9fafb; border:1px solid #e5e7eb;
      border-radius:0.375rem; padding:0.2rem 0.5rem; color:#374151; }
    .stat-chip.warn { background:#fef3c7; border-color:#fcd34d; color:#92400e; }
    .panel-footnote { font-size:0.7rem; color:#9ca3af; margin-top:0.5rem; }
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

    const bandAlpha = 0.06;
    const bandData: [{ xAxis: number }, { xAxis: number }][] = [
      [{ xAxis: mu - 3 * sigma }, { xAxis: mu + 3 * sigma }],
      [{ xAxis: mu - 2 * sigma }, { xAxis: mu + 2 * sigma }],
      [{ xAxis: mu - sigma },     { xAxis: mu + sigma }],
    ];
    const bandColors = [
      `rgba(239,68,68,${bandAlpha})`,
      `rgba(245,158,11,${bandAlpha * 1.5})`,
      `rgba(34,197,94,${bandAlpha * 2})`,
    ];

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params: unknown) => {
          const ps = params as Array<{ seriesName: string; value: [number, number]; marker: string }>;
          if (!ps.length) return '';
          const center = ps[0].value[0].toFixed(metric === 'bps' ? 1 : 4);
          return ps.map(p =>
            `${p.marker} ${p.seriesName}: <b>${typeof p.value === 'object' ? p.value[1].toFixed(1) : p.value}</b>`
          ).join('<br/>') + `<br/><span style="font-size:11px;color:#9ca3af">${xLabel} = ${center}</span>`;
        },
      },
      legend: { bottom: 0, textStyle: { color: '#6b7280', fontSize: 11 } },
      grid: { top: 20, bottom: 50, left: 65, right: 20 },
      xAxis: {
        type: 'value',
        name: xLabel,
        nameLocation: 'middle',
        nameGap: 30,
        axisLabel: { color: '#6b7280', fontSize: 11, formatter: (v: number) => v.toFixed(metric === 'bps' ? 0 : 3) },
        axisLine: { lineStyle: { color: '#e5e7eb' } },
        splitLine: { show: false },
      },
      yAxis: {
        type: 'value',
        name: 'Days',
        axisLabel: { color: '#6b7280', fontSize: 11 },
        splitLine: { lineStyle: { color: '#f3f4f6' } },
      },
      series: [
        {
          name: 'Observed',
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
          name: 'Normal Model',
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
