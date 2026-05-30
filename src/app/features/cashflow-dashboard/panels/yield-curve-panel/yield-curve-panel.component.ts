import { Component, inject, computed, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { YieldCurveService } from '../../services/yield-curve.service';

@Component({
  selector: 'app-yield-curve-panel',
  standalone: true,
  imports: [NgxEchartsDirective, SlicePipe],
  templateUrl: './yield-curve-panel.component.html',
})
export class YieldCurvePanelComponent implements OnInit {
  private readonly svc = inject(YieldCurveService);

  readonly loaded    = this.svc.loaded;
  readonly inverted  = this.svc.inverted;
  readonly latestDate = this.svc.latestDate;

  readonly chartOptions = computed<EChartsOption>(() => {
    const labels   = this.svc.xAxisLabels();
    const current  = this.svc.currentCurve();
    const overlays = this.svc.overlays();
    const inv = this.inverted();

    return {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis', formatter: (p: unknown) => {
        const ps = p as Array<{ seriesName: string; value: number | null; marker: string }>;
        const label = this.svc.xAxisLabels()[0]; // fallback
        return ps.filter(s => s.value != null)
          .map(s => `${s.marker} ${s.seriesName}: <b>${(s.value as number).toFixed(2)}%</b>`)
          .join('<br/>');
      }},
      legend: { show: true, bottom: 0, textStyle: { color: '#94a3b8', fontSize: 11 } },
      grid: { top: 20, bottom: 50, left: 50, right: 20 },
      xAxis: {
        type: 'category',
        data: labels,
        axisLabel: { color: '#94a3b8', fontSize: 11 },
        axisLine: { lineStyle: { color: '#e2e8f0' } },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#94a3b8', fontSize: 11, formatter: (v: number) => `${v.toFixed(1)}%` },
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        min: (v: { min: number }) => Math.max(0, +(v.min - 0.5).toFixed(1)),
      },
      series: [
        {
          name: 'Current',
          type: 'line',
          smooth: true,
          data: current,
          lineStyle: { color: '#3b82f6', width: 2.5 },
          itemStyle: { color: '#3b82f6' },
          symbol: 'circle',
          symbolSize: 6,
          markArea: inv ? {
            silent: true,
            data: [[{ xAxis: '2Y' }, { xAxis: '10Y' }]] as unknown as [],
            itemStyle: { color: 'rgba(239,68,68,0.07)' },
          } : undefined,
        },
        {
          name: '−3m',
          type: 'line',
          smooth: true,
          data: overlays.m3,
          lineStyle: { color: '#94a3b8', width: 1.5, type: 'dashed' },
          itemStyle: { color: '#94a3b8' },
          symbol: 'none',
        },
        {
          name: '−6m',
          type: 'line',
          smooth: true,
          data: overlays.m6,
          lineStyle: { color: '#cbd5e1', width: 1.5, type: 'dashed' },
          itemStyle: { color: '#cbd5e1' },
          symbol: 'none',
        },
        {
          name: '−12m',
          type: 'line',
          smooth: true,
          data: overlays.m12,
          lineStyle: { color: '#e2e8f0', width: 1.5, type: 'dashed' },
          itemStyle: { color: '#e2e8f0' },
          symbol: 'none',
        },
      ],
    };
  });

  ngOnInit(): void {
    this.svc.load();
  }
}
