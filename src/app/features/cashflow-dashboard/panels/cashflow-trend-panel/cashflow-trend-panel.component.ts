import { Component, inject, computed, OnInit } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { CashflowService } from '../../services/cashflow.service';
import { zScoreAnomalies } from '../../utils/forecast';

@Component({
  selector: 'app-cashflow-trend-panel',
  standalone: true,
  imports: [NgxEchartsDirective],
  templateUrl: './cashflow-trend-panel.component.html',
  styleUrls: ['./cashflow-trend-panel.component.scss'],
})
export class CashflowTrendPanelComponent implements OnInit {
  private readonly svc = inject(CashflowService);

  readonly loaded = computed(() => this.svc.forecastLoaded());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly chartOptions = computed<any>(() => {
    const rows = this.svc.forecastRows();
    if (!rows.length) return {};

    const histRows = rows.filter(r => r.ACTUAL !== null);
    const fcastRows = rows.filter(r => r.L95 !== null && r.U95 !== null);

    const histDates  = histRows.map(r => r.date);
    const histVals   = histRows.map(r => r.ACTUAL as number);
    const histFcast  = histRows.map(r => r.FORECAST);

    const fcastDates = fcastRows.map(r => r.date);
    const fcastVals  = fcastRows.map(r => r.FORECAST);
    const lower      = fcastRows.map(r => r.L95 as number);
    const upper      = fcastRows.map(r => (r.U95 as number) - (r.L95 as number));

    const anomalyFlags = zScoreAnomalies(histVals, 2.0);

    const anomalyMarks = histRows
      .map((r, i) => anomalyFlags[i] ? { name: 'anomaly', coord: [r.date, r.ACTUAL as number] } : null)
      .filter((m): m is { name: string; coord: [string, number] } => m !== null);

    const allDates = [...histDates, ...fcastDates];

    return {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis', formatter: (p: unknown) => {
        const ps = p as Array<{ seriesName: string; value: number | null; marker: string }>;
        return ps.filter(s => s.value != null && !['Lower', 'Band'].includes(s.seriesName))
          .map(s => `${s.marker} ${s.seriesName}: <b>$${((s.value as number) / 1_000_000).toFixed(2)}M</b>`)
          .join('<br/>');
      }},
      legend: { show: true, bottom: 0, textStyle: { color: '#94a3b8', fontSize: 11 } },
      dataZoom: [{ type: 'inside', start: 60, end: 100 }],
      grid: { top: 20, bottom: 50, left: 70, right: 20 },
      xAxis: {
        type: 'category',
        data: allDates,
        axisLabel: { color: '#94a3b8', fontSize: 10, rotate: 30, showMaxLabel: true },
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#94a3b8',
          fontSize: 11,
          formatter: (v: number) => `$${(v / 1_000_000).toFixed(1)}M`,
        },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
      },
      series: [
        {
          name: 'Actual',
          type: 'line',
          data: [...histVals, ...Array(fcastDates.length).fill(null)],
          lineStyle: { color: '#3b82f6', width: 2 },
          itemStyle: { color: '#3b82f6' },
          symbol: 'none',
          markPoint: {
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: { color: '#ef4444' },
            data: anomalyMarks as unknown[],
            label: { show: false },
          },
        },
        {
          name: 'Forecast',
          type: 'line',
          data: [...Array(histDates.length).fill(null), ...fcastVals],
          lineStyle: { color: '#f59e0b', width: 2, type: 'dashed' },
          itemStyle: { color: '#f59e0b' },
          symbol: 'none',
        },
        {
          name: 'Lower',
          type: 'line',
          data: [...Array(histDates.length).fill(null), ...lower],
          lineStyle: { opacity: 0 },
          areaStyle: { opacity: 0 },
          itemStyle: { opacity: 0 },
          stack: 'band',
          symbol: 'none',
          silent: true,
          legendHoverLink: false,
        },
        {
          name: 'Band',
          type: 'line',
          data: [...Array(histDates.length).fill(null), ...upper],
          lineStyle: { opacity: 0 },
          areaStyle: { color: 'rgba(245,158,11,0.12)' },
          itemStyle: { opacity: 0 },
          stack: 'band',
          symbol: 'none',
          silent: true,
          legendHoverLink: false,
        },
      ],
    };
  });

  ngOnInit(): void {
    this.svc.loadAll();
  }
}
