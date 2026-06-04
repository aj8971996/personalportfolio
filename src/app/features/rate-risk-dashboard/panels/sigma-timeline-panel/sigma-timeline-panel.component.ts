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
    <div class="panel-card">
      <div class="panel-header">
        <h2 class="panel-title">Sigma-Event Timeline — When the "Impossible" Happened</h2>
        <p class="panel-sub">Every day where |Δ&nbsp;yield| ≥ 3σ. Horizontal lines mark where the normal model places the boundary of the practically impossible.</p>
      </div>

      @if (!svc.detailLoaded()) {
        <div class="skeleton" style="height:420px"></div>
      } @else {
        <div echarts [options]="chartOptions()" style="height:420px"></div>
        <div class="legend-row">
          <span class="dot dot-up"></span><span class="leg-label">Rate spike</span>
          <span class="dot dot-dn"></span><span class="leg-label">Rate drop</span>
          <span class="leg-note">Point size scales with sigma distance. Hover for detail.</span>
        </div>
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
    .legend-row { display:flex; align-items:center; gap:0.5rem; margin-top:0.5rem;
      font-size:0.7rem; color:#6b7280; }
    .dot { width:8px; height:8px; border-radius:50%; display:inline-block; }
    .dot-up { background:#ef4444; } .dot-dn { background:#3b82f6; }
    .leg-label { margin-right:0.75rem; }
    .leg-note { color:#9ca3af; }
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

    // Build lookup for fast tooltip access
    const eventMap = new Map<string, SigmaEvent>(filtered.map(e => [e.date + '|' + e.sigma_distance.toFixed(4), e]));

    const upData: [string, number][]  = filtered.filter(e => e.direction === 'up').map(e => [e.date, Math.abs(e.sigma_distance)]);
    const dnData: [string, number][]  = filtered.filter(e => e.direction === 'down').map(e => [e.date, Math.abs(e.sigma_distance)]);

    const tooltipFormatter = (p: unknown): string => {
      const pt = p as { data: [string, number] };
      const [date, sigAbs] = pt.data;
      // Reconstruct event from data
      const key = date + '|' + sigAbs.toFixed(4);
      const e = eventMap.get(key) ?? filtered.find(ev => ev.date === date);
      if (!e) return `<b>${date}</b><br/>${sigAbs.toFixed(2)}σ`;
      const yFmt = (yrs: number) => yrs > 1_000_000 ? `${(yrs/1_000_000).toFixed(0)}M` : yrs > 1000 ? `${(yrs/1000).toFixed(0)}K` : yrs.toFixed(0);
      const k   = Math.floor(Math.abs(e.sigma_distance));
      const bd  = stats?.sigma_bands.find(b => b.k === k);
      const yrsLine = bd && bd.expected_years_between > 0
        ? `Normal model: ~once every ${yFmt(bd.expected_years_between)} yrs`
        : 'Normal model: effectively never';
      return [
        `<b>${e.date}</b>`,
        `Δ yield: ${e.delta.toFixed(metric === 'bps' ? 1 : 5)} ${unit}`,
        `Distance: ${e.sigma_distance.toFixed(2)}σ`,
        e.macro_tag ? `<span style="color:#6366f1;font-weight:600">${e.macro_tag}</span>` : '',
        `<span style="color:#9ca3af;font-size:11px">${yrsLine}</span>`,
      ].filter(Boolean).join('<br/>');
    };

    const markLineData = [3, 4, 5, 6].map(k => ({
      yAxis: k,
      label: { formatter: `${k}σ`, position: 'end' as const, color: '#9ca3af', fontSize: 10 },
      lineStyle: { type: (k >= 5 ? 'dotted' : 'dashed') as 'dashed' | 'dotted', color: k >= 5 ? '#fca5a5' : '#d1d5db', width: 1 },
    }));

    return {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'item', formatter: tooltipFormatter },
      grid: { top: 20, bottom: 60, left: 55, right: 20 },
      xAxis: {
        type: 'time',
        axisLabel: { color: '#6b7280', fontSize: 11 },
        axisLine: { lineStyle: { color: '#e5e7eb' } },
        splitLine: { show: false },
      },
      yAxis: {
        type: 'value',
        name: 'σ Distance',
        min: 3,
        axisLabel: { color: '#6b7280', fontSize: 11, formatter: (v: number) => `${v.toFixed(0)}σ` },
        splitLine: { lineStyle: { color: '#f3f4f6' } },
      },
      series: [
        {
          name: 'Rate spike (up)',
          type: 'scatter',
          data: upData,
          symbolSize: (val: unknown) => {
            const v = val as [string, number];
            return Math.min(4 + (v[1] - 3) * 2.5, 22);
          },
          itemStyle: { color: '#ef4444', opacity: 0.75 },
          markLine: {
            silent: true,
            symbol: ['none', 'none'],
            data: markLineData as unknown[],
          },
        },
        {
          name: 'Rate drop (down)',
          type: 'scatter',
          data: dnData,
          symbolSize: (val: unknown) => {
            const v = val as [string, number];
            return Math.min(4 + (v[1] - 3) * 2.5, 22);
          },
          itemStyle: { color: '#3b82f6', opacity: 0.75 },
        },
      ],
    } as EChartsOption;
  });
}
