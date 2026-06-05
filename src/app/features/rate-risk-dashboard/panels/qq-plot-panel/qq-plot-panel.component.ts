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
    <div class="cf-panel">
      <div class="cf-panel-header">
        <div>
          <h2 class="cf-panel-title">Are the tails fatter than the model assumes?</h2>
          <p class="cf-panel-caption">
            Each dot is one trading day, sorted by move size and compared against what a normal
            distribution would predict. Points hugging the dashed line = normal behavior.
            Dots bending away in the corners = more extreme moves than the model allows.
            That bend at both ends is the fat-tail problem.
          </p>
        </div>
      </div>

      @if (!svc.detailLoaded()) {
        <div class="cf-skeleton" style="height:380px"></div>
      } @else {
        <div echarts [options]="chartOptions()" style="height:380px"></div>
        <p class="cf-panel-note">{{ verdict() }}</p>
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
    .cf-panel-note {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      color: var(--text-muted);
      margin-top: 0.75rem;
      border-top: 1px solid var(--border);
      padding-top: 0.6rem;
      font-style: italic;
    }
  `],
})
export class QqPlotPanelComponent {
  protected readonly svc     = inject(TreasuryDataService);
  private  readonly controls = inject(DashboardControlsService);

  protected readonly verdict = computed(() => {
    const s = this.svc.currentStats();
    if (!s) return '';
    const ek = s.excess_kurtosis;
    if (ek > 5) return `Tail weight (excess kurtosis) = ${ek.toFixed(1)}. A normal distribution scores 0. This series scores ${ek.toFixed(1)} — the corners of this chart pull sharply away from the dashed line, showing that extreme moves happened far more often than the model expects.`;
    if (ek > 2) return `Tail weight (excess kurtosis) = ${ek.toFixed(1)} — moderately heavier tails than a normal distribution. Points peel away at the corners.`;
    return `Tail weight (excess kurtosis) = ${ek.toFixed(1)} — close to normal. The dots track the dashed line well.`;
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
        backgroundColor: '#18181F',
        borderColor: 'rgba(255,255,255,0.08)',
        textStyle: { color: '#f1f5f9', fontSize: 12 },
        formatter: (p: unknown) => {
          const pt = p as { value: [number, number] };
          return `Expected: ${pt.value[0].toFixed(2)}σ<br/>Actual: ${pt.value[1].toFixed(2)}σ`;
        },
      },
      legend: { bottom: 0, textStyle: { color: '#94a3b8', fontSize: 11 } },
      grid: { top: 20, bottom: 50, left: 65, right: 20 },
      xAxis: {
        type: 'value',
        name: 'Expected (if normal)',
        nameLocation: 'middle',
        nameGap: 32,
        min: amin,
        max: amax,
        axisLabel: { color: '#94a3b8', fontSize: 11, formatter: (v: number) => `${v.toFixed(0)}σ` },
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.04)' } },
      },
      yAxis: {
        type: 'value',
        name: 'Actual',
        min: amin,
        max: amax,
        axisLabel: { color: '#94a3b8', fontSize: 11, formatter: (v: number) => `${v.toFixed(0)}σ` },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.04)' } },
      },
      series: [
        {
          name: 'Actual days',
          type: 'scatter',
          data: qq.map(p => [p.theoretical_quantile, p.sample_quantile]),
          symbolSize: 3,
          itemStyle: { color, opacity: 0.5 },
          large: true,
        },
        {
          name: 'Perfect normal (reference)',
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
