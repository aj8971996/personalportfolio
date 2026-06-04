import { Component, inject, computed } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { TreasuryDataService } from '../../services/treasury-data.service';
import { DashboardControlsService } from '../../services/dashboard-controls.service';
import { maturityColor } from '../../utils/transforms';

@Component({
  selector: 'app-qq-plot-panel',
  standalone: true,
  imports: [NgxEchartsDirective],
  template: `
    <div class="panel-card">
      <div class="panel-header">
        <h2 class="panel-title">Q-Q Plot</h2>
        <p class="panel-sub">Observed quantiles vs. theoretical normal — points on the 45° line = normal; peeling away = fat tails</p>
      </div>

      @if (!svc.detailLoaded()) {
        <div class="skeleton" style="height:380px"></div>
      } @else {
        <div echarts [options]="chartOptions()" style="height:380px"></div>
        <p class="panel-verdict">{{ verdict() }}</p>
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
    .panel-verdict { font-size:0.72rem; color:#6b7280; margin-top:0.5rem; font-style:italic; }
  `],
})
export class QqPlotPanelComponent {
  protected readonly svc     = inject(TreasuryDataService);
  private  readonly controls = inject(DashboardControlsService);

  protected readonly verdict = computed(() => {
    const s = this.svc.currentStats();
    if (!s) return '';
    const ek = s.excess_kurtosis;
    if (ek > 5) return `Tails deviate sharply from normal beyond ≈±2.5σ. Excess kurtosis ${ek.toFixed(1)} vs. 0 for a true normal — the tails carry ${(ek / 1 + 1).toFixed(0)}× more probability mass than the bell curve allows.`;
    if (ek > 2) return `Moderate fat tails. Excess kurtosis ${ek.toFixed(1)} — points peel away from the reference line in both tails.`;
    return `Near-normal tails. Excess kurtosis ${ek.toFixed(1)}.`;
  });

  readonly chartOptions = computed<EChartsOption>(() => {
    const qq  = this.svc.qqData();
    const ref = this.svc.qqRef();
    const mat = this.controls.maturity();
    if (!qq.length || !ref) return {} as EChartsOption;

    const color = maturityColor(mat);
    const amin  = Math.min(ref.ref_min, -5);
    const amax  = Math.max(ref.ref_max,  5);

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        formatter: (p: unknown) => {
          const pt = p as { value: [number, number] };
          return `Theoretical: ${pt.value[0].toFixed(3)}<br/>Sample: ${pt.value[1].toFixed(3)}`;
        },
      },
      legend: { bottom: 0, textStyle: { color: '#6b7280', fontSize: 11 } },
      grid: { top: 20, bottom: 50, left: 65, right: 20 },
      xAxis: {
        type: 'value',
        name: 'Theoretical Normal Quantile',
        nameLocation: 'middle',
        nameGap: 32,
        min: amin,
        max: amax,
        axisLabel: { color: '#6b7280', fontSize: 11 },
        axisLine: { lineStyle: { color: '#e5e7eb' } },
        splitLine: { lineStyle: { color: '#f3f4f6' } },
      },
      yAxis: {
        type: 'value',
        name: 'Sample Quantile (standardized)',
        min: amin,
        max: amax,
        axisLabel: { color: '#6b7280', fontSize: 11 },
        splitLine: { lineStyle: { color: '#f3f4f6' } },
      },
      series: [
        {
          name: 'Observed',
          type: 'scatter',
          data: qq.map(p => [p.theoretical_quantile, p.sample_quantile]),
          symbolSize: 3,
          itemStyle: { color, opacity: 0.5 },
          large: true,
        },
        {
          name: '45° Normal Line',
          type: 'line',
          data: [[amin, amin], [amax, amax]],
          lineStyle: { color: '#ef4444', width: 1.5, type: 'dashed' },
          itemStyle: { color: '#ef4444' },
          symbol: 'none',
        },
      ],
    };
  });
}
