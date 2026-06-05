import { Component, inject, computed } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { TreasuryDataService } from '../../services/treasury-data.service';
import { DashboardControlsService } from '../../services/dashboard-controls.service';
import { filterEventsByWindow, metricUnit } from '../../utils/transforms';
import { SigmaEvent } from '../../models/models';

@Component({
  selector: 'app-sigma-timeline-panel',
  standalone: true,
  imports: [NgxEchartsDirective],
  template: `
    <div class="cf-panel">
      <div class="cf-panel-header">
        <div>
          <h2 class="cf-panel-title">When the "impossible" actually happened</h2>
          <p class="cf-panel-caption">
            Every trading day where rates moved more than 3× their typical daily swing (3σ).
            The dotted lines mark levels so extreme that the normal model says they should happen
            once every few thousand years — or never in recorded history. Hover any point for detail.
          </p>
        </div>
      </div>

      @if (!svc.detailLoaded()) {
        <div class="cf-skeleton" style="height:420px"></div>
      } @else {
        <div echarts [options]="chartOptions()" style="height:420px"></div>
        <p class="cf-panel-note">
          <span class="dot dot-up"></span> Rate jumped &nbsp;
          <span class="dot dot-dn"></span> Rate fell &nbsp;&middot;&nbsp;
          Larger dots = more extreme moves. σ = standard deviation (typical daily swing).
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
      max-width: 640px;
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
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }
    .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; flex-shrink: 0; }
    .dot-up { background: #ef4444; }
    .dot-dn { background: #3b82f6; }
  `],
})
export class SigmaTimelinePanelComponent {
  protected readonly svc     = inject(TreasuryDataService);
  private  readonly controls = inject(DashboardControlsService);

  readonly chartOptions = computed<EChartsOption>(() => {
    const events = this.svc.eventsData();
    const win    = this.controls.window();
    const metric = this.controls.metric();
    const unit   = metricUnit(metric);
    const stats  = this.svc.currentStats();
    if (!events.length) return {} as EChartsOption;

    const filtered: SigmaEvent[] = filterEventsByWindow(events, win);
    const eventMap = new Map<string, SigmaEvent>(filtered.map(e => [e.date + '|' + e.sigma_distance.toFixed(4), e]));

    const upData: [string, number][] = filtered.filter(e => e.direction === 'up').map(e => [e.date, Math.abs(e.sigma_distance)]);
    const dnData: [string, number][] = filtered.filter(e => e.direction === 'down').map(e => [e.date, Math.abs(e.sigma_distance)]);

    const yFmt = (yrs: number) => {
      if (yrs > 1_000_000_000) return `${(yrs/1_000_000_000).toFixed(0)}B`;
      if (yrs > 1_000_000) return `${(yrs/1_000_000).toFixed(0)}M`;
      if (yrs > 1_000) return `${(yrs/1_000).toFixed(0)}K`;
      return yrs.toFixed(0);
    };

    const tooltipFormatter = (p: unknown): string => {
      const pt = p as { data: [string, number] };
      const [date, sigAbs] = pt.data;
      const key = date + '|' + sigAbs.toFixed(4);
      const e = eventMap.get(key) ?? filtered.find(ev => ev.date === date);
      if (!e) return `<b>${date}</b><br/>${sigAbs.toFixed(1)}× typical`;
      const k   = Math.floor(Math.abs(e.sigma_distance));
      const bd  = stats?.sigma_bands.find(b => b.k === k);
      const yrsLine = bd && bd.expected_years_between > 0
        ? `Normal model: once every ${yFmt(bd.expected_years_between)} years`
        : 'Normal model: should not happen';
      return [
        `<b>${e.date}</b>`,
        `Move: ${e.delta.toFixed(metric === 'bps' ? 1 : 5)} ${unit}`,
        `Size: ${e.sigma_distance.toFixed(1)}× the typical daily swing`,
        e.macro_tag ? `<span style="color:#818cf8;font-weight:600">${e.macro_tag}</span>` : '',
        `<span style="color:#94a3b8;font-size:11px">${yrsLine}</span>`,
      ].filter(Boolean).join('<br/>');
    };

    const markLineData = [3, 4, 5, 6].map(k => ({
      yAxis: k,
      label: { formatter: `${k}×`, position: 'end' as const, color: '#94a3b8', fontSize: 10 },
      lineStyle: { type: (k >= 5 ? 'dotted' : 'dashed') as 'dashed' | 'dotted', color: k >= 5 ? '#fca5a5' : 'rgba(255,255,255,0.15)', width: 1 },
    }));

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        formatter: tooltipFormatter,
        backgroundColor: '#18181F',
        borderColor: 'rgba(255,255,255,0.08)',
        textStyle: { color: '#f1f5f9', fontSize: 12 },
      },
      grid: { top: 20, bottom: 60, left: 55, right: 30 },
      xAxis: {
        type: 'time',
        axisLabel: { color: '#94a3b8', fontSize: 11 },
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } },
        splitLine: { show: false },
      },
      yAxis: {
        type: 'value',
        name: '× typical swing',
        min: 3,
        axisLabel: { color: '#94a3b8', fontSize: 11, formatter: (v: number) => `${v.toFixed(0)}×` },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.04)' } },
      },
      series: [
        {
          name: 'Rate jumped',
          type: 'scatter',
          data: upData,
          symbolSize: (val: unknown) => {
            const v = val as [string, number];
            return Math.min(4 + (v[1] - 3) * 2.5, 22);
          },
          itemStyle: { color: '#ef4444', opacity: 0.8 },
          markLine: {
            silent: true,
            symbol: ['none', 'none'],
            data: markLineData as unknown[],
          },
        },
        {
          name: 'Rate fell',
          type: 'scatter',
          data: dnData,
          symbolSize: (val: unknown) => {
            const v = val as [string, number];
            return Math.min(4 + (v[1] - 3) * 2.5, 22);
          },
          itemStyle: { color: '#60a5fa', opacity: 0.8 },
        },
      ],
    } as EChartsOption;
  });
}
