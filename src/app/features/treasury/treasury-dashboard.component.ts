import {
  Component, OnInit, AfterViewInit, OnDestroy,
  ViewChild, ElementRef, ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  Chart,
  CategoryScale, LinearScale,
  BarController, BarElement,
  PointElement, LineElement, LineController,
  BubbleController, BubbleDataPoint,
  ScatterController,
  Tooltip, Legend,
} from 'chart.js';

import { FRPPRecord, TravelRecord, KPIData, PredictiveFlag } from './lib/types';
import { FRPP_DATA } from './lib/data';
import { TRAVEL_DATA } from './lib/travel-data';
import {
  computeKPIs, computeStateUtilization, computeAgencyCost,
  computeScatterData, computePredictiveFlags, computeMonthlyTE,
  uniqueStates, formatCurrency, formatNumber, MonthlyTEData,
} from './lib/transforms';

Chart.register(
  CategoryScale, LinearScale,
  BarController, BarElement,
  PointElement, LineElement, LineController,
  BubbleController, ScatterController,
  Tooltip, Legend,
);

const CHART_DEFAULTS = {
  plugins: {
    legend: {
      labels: { color: '#94A3B8', font: { family: "'Inter', sans-serif", size: 11 }, boxWidth: 12, padding: 16 },
    },
    tooltip: {
      backgroundColor: '#1E1E2A',
      titleColor: '#F1F5F9',
      bodyColor: '#94A3B8',
      borderColor: 'rgba(255,255,255,0.08)',
      borderWidth: 1,
      padding: 10,
    },
  },
  scales: {
    x: { ticks: { color: '#94A3B8', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.04)' } },
    y: { ticks: { color: '#94A3B8', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,0.04)' } },
  },
};

function utilColor(v: number): string {
  if (v >= 80) return 'rgba(16, 185, 129, 0.8)';
  if (v >= 60) return 'rgba(245, 158, 11, 0.8)';
  return 'rgba(239, 68, 68, 0.8)';
}

export type DashTab = 'exposure' | 'cost' | 'age' | 'te';

@Component({
  selector: 'app-treasury-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './treasury-dashboard.component.html',
  styleUrls: ['./treasury-dashboard.component.scss'],
})
export class TreasuryDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('utilizationChart') utilizationRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('costChart')        costRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('scatterChart')     scatterRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('teChart')          teRef!: ElementRef<HTMLCanvasElement>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private charts: Record<string, any> = {};
  private viewReady = false;
  private dataReady = false;

  // ── Raw data ───────────────────────────────────────────────
  allFRPP: FRPPRecord[] = FRPP_DATA;
  readonly allTravel: TravelRecord[] = TRAVEL_DATA;

  // ── UI state ───────────────────────────────────────────────
  activeTab: DashTab = 'exposure';
  selectedState = 'All';
  assetTypeFilter: 'All' | 'Building' | 'Land' | 'Structure' = 'All';
  ownershipFilter: 'All' | 'Owned' | 'Leased' = 'All';
  costOwnership: 'All' | 'Owned' | 'Leased' = 'All';
  teCategory: 'All' | 'Travel' | 'Meals' | 'Lodging' | 'Fleet' = 'All';
  showMethodology = false;
  isLoading = true;
  chartsReady = false;
  dataSource = 'Synthetic data';

  // ── Derived ───────────────────────────────────────────────
  filteredData: FRPPRecord[] = [];
  kpis: KPIData = { totalAssets: 0, avgUtilization: 0, flaggedCount: 0, leasedPct: 0, ownedPct: 0 };
  predictiveFlags: PredictiveFlag[] = [];
  stateOptions: string[] = [];
  teData!: MonthlyTEData;

  readonly tabs: { id: DashTab; question: string }[] = [
    { id: 'exposure', question: 'Where are we exposed?' },
    { id: 'cost',     question: 'Are we getting value from our space?' },
    { id: 'age',      question: 'Is our portfolio aging well?' },
    { id: 'te',       question: 'Are travel expenses in control?' },
  ];

  readonly assetTypes: ('All' | 'Building' | 'Land' | 'Structure')[] = ['All', 'Building', 'Land', 'Structure'];
  readonly ownershipOptions: ('All' | 'Owned' | 'Leased')[] = ['All', 'Owned', 'Leased'];
  readonly teCategories: ('All' | 'Travel' | 'Meals' | 'Lodging' | 'Fleet')[] = ['All', 'Travel', 'Meals', 'Lodging', 'Fleet'];

  constructor(private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    try {
      const res = await fetch('/assets/data/frpp-sampled.json');
      if (res.ok) {
        const real: FRPPRecord[] = await res.json();
        if (real.length > 0) {
          this.allFRPP = real;
          this.dataSource = 'GSA FRPP FY2023 (real data)';
        }
      }
    } catch {
      // synthetic fallback already set
    }

    this.stateOptions = uniqueStates(this.allFRPP.filter(r => r.assetStatus === 'Active'));
    this.teData = computeMonthlyTE(this.allTravel, 'All');
    this.applyFilters(false);
    this.isLoading = false;
    this.dataReady = true;
    this.cdr.detectChanges();

    if (this.viewReady) this.doInitCharts();
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    if (this.dataReady) this.doInitCharts();
  }

  ngOnDestroy(): void {
    Object.values(this.charts).forEach((c: Chart) => c.destroy());
  }

  // Only init the active tab's chart on first load (Tab 1 = utilization)
  private doInitCharts(): void {
    setTimeout(() => {
      this.initUtilizationChart();
      this.chartsReady = true;
      this.cdr.detectChanges();
    }, 50);
  }

  // Called on every tab switch — inits the chart if not yet created
  setTab(tab: DashTab): void {
    this.activeTab = tab;
    this.cdr.detectChanges();
    setTimeout(() => {
      switch (tab) {
        case 'exposure': if (!this.charts['util'])    this.initUtilizationChart(); break;
        case 'cost':     if (!this.charts['cost'])    this.initCostChart();        break;
        case 'age':      if (!this.charts['scatter']) this.initScatterChart();     break;
        case 'te':       if (!this.charts['te'])      this.initTEChart();          break;
      }
    }, 50);
  }

  // ── Filters ────────────────────────────────────────────────
  applyFilters(updateCharts = true): void {
    this.filteredData = this.allFRPP.filter(r => {
      if (r.assetStatus !== 'Active') return false;
      if (this.assetTypeFilter !== 'All' && r.assetType !== this.assetTypeFilter) return false;
      if (this.ownershipFilter !== 'All' && r.ownedOrLeased !== this.ownershipFilter) return false;
      if (this.selectedState !== 'All' && r.state !== this.selectedState) return false;
      return true;
    });
    this.kpis = computeKPIs(this.filteredData);
    this.predictiveFlags = computePredictiveFlags(this.filteredData);

    if (updateCharts && this.chartsReady) {
      // Update all initialized charts so switching tabs shows current filter state
      this.updateUtilizationChart();
      this.updateCostChart();
      this.updateScatterChart();
    }
  }

  onStateSelect(state: string): void {
    this.selectedState = state === this.selectedState ? 'All' : state;
    this.applyFilters();
  }

  onCostOwnershipChange(v: 'All' | 'Owned' | 'Leased'): void {
    this.costOwnership = v;
    if (this.charts['cost']) this.updateCostChart();
  }

  onTECategoryChange(v: 'All' | 'Travel' | 'Meals' | 'Lodging' | 'Fleet'): void {
    this.teCategory = v;
    this.teData = computeMonthlyTE(this.allTravel, v);
    if (this.charts['te']) this.updateTEChart();
  }

  resetFilters(): void {
    this.selectedState = 'All';
    this.assetTypeFilter = 'All';
    this.ownershipFilter = 'All';
    this.applyFilters();
  }

  // ── Chart init ─────────────────────────────────────────────
  private initUtilizationChart(): void {
    if (!this.utilizationRef?.nativeElement) return;
    const states = computeStateUtilization(this.filteredData);
    const labels = states.map(s => s.state);
    const values = states.map(s => Math.round(s.avgUtil * 10) / 10);

    this.charts['util'] = new Chart(this.utilizationRef.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Avg Utilization %',
          data: values,
          backgroundColor: values.map(v => utilColor(v)),
          borderRadius: 3,
          borderSkipped: false,
        }],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        onClick: (_e, elements) => {
          if (elements.length > 0) {
            const label = labels[elements[0].index] as string;
            this.onStateSelect(label);
          }
        },
        plugins: {
          ...CHART_DEFAULTS.plugins,
          legend: { display: false },
          tooltip: {
            ...CHART_DEFAULTS.plugins.tooltip,
            callbacks: {
              label: ctx => ` ${(ctx.raw as number).toFixed(1)}% utilization`,
              afterLabel: ctx => ` ${states[ctx.dataIndex].count} asset${states[ctx.dataIndex].count !== 1 ? 's' : ''}`,
            },
          },
        },
        scales: {
          x: {
            ...CHART_DEFAULTS.scales.x,
            min: 0, max: 100,
            title: { display: true, text: 'Avg Utilization %', color: '#64748B', font: { size: 11 } },
          },
          y: { ...CHART_DEFAULTS.scales.y },
        },
      },
    });
  }

  private initCostChart(): void {
    if (!this.costRef?.nativeElement) return;
    const costs = computeAgencyCost(this.filteredData, this.costOwnership);

    this.charts['cost'] = new Chart(this.costRef.nativeElement, {
      type: 'bar',
      data: {
        labels: costs.map(c => c.agency),
        datasets: [{
          label: 'Cost / Sq Ft ($)',
          data: costs.map(c => Math.round(c.costPerSqft * 100) / 100),
          backgroundColor: 'rgba(99, 102, 241, 0.75)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 1,
          borderRadius: 3,
          borderSkipped: false,
        }],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          ...CHART_DEFAULTS.plugins,
          legend: { display: false },
          tooltip: {
            ...CHART_DEFAULTS.plugins.tooltip,
            callbacks: {
              label: ctx => ` $${(ctx.raw as number).toFixed(2)} / sq ft`,
              afterLabel: ctx => ` ${costs[ctx.dataIndex].assetCount} assets`,
            },
          },
        },
        scales: {
          x: {
            ...CHART_DEFAULTS.scales.x,
            title: { display: true, text: 'Annual Cost / Sq Ft ($)', color: '#64748B', font: { size: 11 } },
          },
          y: { ...CHART_DEFAULTS.scales.y },
        },
      },
    });
  }

  private initScatterChart(): void {
    if (!this.scatterRef?.nativeElement) return;
    const { owned, leased, trendLine } = computeScatterData(this.filteredData);

    this.charts['scatter'] = new Chart(this.scatterRef.nativeElement, {
      type: 'bubble',
      data: {
        datasets: [
          {
            label: 'Owned',
            data: owned as unknown as BubbleDataPoint[],
            backgroundColor: 'rgba(99, 102, 241, 0.45)',
            borderColor: 'rgba(99, 102, 241, 0.7)',
            borderWidth: 1,
          },
          {
            label: 'Leased',
            data: leased as unknown as BubbleDataPoint[],
            backgroundColor: 'rgba(245, 158, 11, 0.45)',
            borderColor: 'rgba(245, 158, 11, 0.7)',
            borderWidth: 1,
          },
          {
            label: 'Linear Trend',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            type: 'line' as any,
            data: trendLine,
            borderColor: 'rgba(148, 163, 184, 0.5)',
            borderDash: [6, 3],
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          ...CHART_DEFAULTS.plugins,
          tooltip: {
            ...CHART_DEFAULTS.plugins.tooltip,
            callbacks: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              label: (ctx: any) => {
                if (ctx.datasetIndex === 2) return '';
                const d = ctx.raw as { x: number; y: number; r: number };
                return ` Built ${d.x}  ·  ${d.y.toFixed(1)}% utilization`;
              },
            },
          },
        },
        scales: {
          x: {
            ...CHART_DEFAULTS.scales.x,
            title: { display: true, text: 'Construction Year', color: '#64748B', font: { size: 11 } },
            min: 1895, max: 2028,
          },
          y: {
            ...CHART_DEFAULTS.scales.y,
            min: 0, max: 105,
            title: { display: true, text: 'Utilization %', color: '#64748B', font: { size: 11 } },
          },
        },
      },
    });
  }

  private initTEChart(): void {
    if (!this.teRef?.nativeElement) return;
    const { labelsFull, series, anomalies } = this.teData;
    const CAT_COLORS: Record<string, string> = {
      Travel: '#6366F1', Meals: '#F59E0B', Lodging: '#06B6D4', Fleet: '#10B981',
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const datasets: any[] = [];

    for (const [cat, vals] of Object.entries(series)) {
      datasets.push({
        label: cat,
        data: vals,
        borderColor: CAT_COLORS[cat] ?? '#94A3B8',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3,
      });
      const anomalyPts = (anomalies[cat] ?? []).map((a, i) => (a ? vals[i] : null));
      datasets.push({
        label: `${cat} anomaly`,
        data: anomalyPts,
        borderColor: 'transparent',
        backgroundColor: 'rgba(239,68,68,0.9)',
        pointRadius: anomalyPts.map(v => (v !== null ? 6 : 0)),
        pointStyle: 'circle',
        showLine: false,
      });
    }

    this.charts['te'] = new Chart(this.teRef.nativeElement, {
      type: 'line',
      data: { labels: labelsFull, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          ...CHART_DEFAULTS.plugins,
          legend: {
            ...CHART_DEFAULTS.plugins.legend,
            labels: {
              ...CHART_DEFAULTS.plugins.legend.labels,
              filter: (item: { text: string }) => !item.text.includes('anomaly'),
            },
          },
          tooltip: {
            ...CHART_DEFAULTS.plugins.tooltip,
            mode: 'index' as const,
            intersect: false,
            callbacks: {
              label: (ctx: { dataset: { label?: string }; raw: unknown }) => {
                if (ctx.dataset.label?.includes('anomaly')) return '';
                const v = ctx.raw as number | null;
                return v != null ? ` ${ctx.dataset.label}: $${formatNumber(Math.round(v))}` : '';
              },
            },
          },
        },
        scales: {
          x: {
            ...CHART_DEFAULTS.scales.x,
            ticks: { color: '#94A3B8', font: { size: 10 }, maxRotation: 45 },
          },
          y: {
            ...CHART_DEFAULTS.scales.y,
            title: { display: true, text: 'Total Spend ($)', color: '#64748B', font: { size: 11 } },
            ticks: {
              color: '#94A3B8',
              font: { size: 10 },
              callback: (v: unknown) => `$${Math.round(v as number / 1000)}K`,
            },
          },
        },
      },
    });
  }

  // ── Chart updates ──────────────────────────────────────────
  private updateUtilizationChart(): void {
    const ch = this.charts['util'] as Chart | undefined;
    if (!ch) return;
    const states = computeStateUtilization(this.filteredData);
    ch.data.labels = states.map(s => s.state);
    const values = states.map(s => Math.round(s.avgUtil * 10) / 10);
    ch.data.datasets[0].data = values;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ch.data.datasets[0] as any).backgroundColor = values.map(v => utilColor(v));
    ch.update('active');
  }

  private updateCostChart(): void {
    const ch = this.charts['cost'] as Chart | undefined;
    if (!ch) return;
    const costs = computeAgencyCost(this.filteredData, this.costOwnership);
    ch.data.labels = costs.map(c => c.agency);
    ch.data.datasets[0].data = costs.map(c => Math.round(c.costPerSqft * 100) / 100);
    ch.update('active');
  }

  private updateScatterChart(): void {
    const ch = this.charts['scatter'] as Chart | undefined;
    if (!ch) return;
    const { owned, leased, trendLine } = computeScatterData(this.filteredData);
    ch.data.datasets[0].data = owned as unknown as BubbleDataPoint[];
    ch.data.datasets[1].data = leased as unknown as BubbleDataPoint[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ch.data.datasets[2] as any).data = trendLine;
    ch.update('active');
  }

  private updateTEChart(): void {
    const ch = this.charts['te'] as Chart | undefined;
    if (ch) { ch.destroy(); delete this.charts['te']; }
    this.initTEChart();
  }

  // ── Utilities ──────────────────────────────────────────────
  trendIcon(t: PredictiveFlag['trend']): string {
    return t === 'up' ? '↑' : t === 'down' ? '↓' : '→';
  }

  trendClass(t: PredictiveFlag['trend']): string {
    return t === 'up' ? 'trend-up' : t === 'down' ? 'trend-down' : 'trend-stable';
  }

  predictedClass(pct: number): string {
    if (pct < 40) return 'flag-critical';
    if (pct < 60) return 'flag-warning';
    return '';
  }

  fmtPct(v: number): string { return `${v.toFixed(1)}%`; }
  fmtSqft(v: number): string { return formatNumber(v); }
  fmtCurrency(v: number): string { return formatCurrency(v); }

  exportCSV(): void {
    const headers = [
      'Installation', 'State', 'Agency', 'Type', 'Sq Ft',
      'Annual Rent', 'Current Util %', 'Prev Util %', 'Trend', 'Predicted Next %',
    ];
    const rows = this.predictiveFlags.map(f => [
      `"${f.installationName}"`, f.state, f.agencyName, f.assetType,
      f.squareFeetRentable, f.annualRent,
      f.currentUtil.toFixed(1), f.prevUtil.toFixed(1),
      f.trend === 'up' ? 'Improving' : f.trend === 'down' ? 'Declining' : 'Stable',
      f.predictedNext.toFixed(1),
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'utilization-predictive-flags.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}
