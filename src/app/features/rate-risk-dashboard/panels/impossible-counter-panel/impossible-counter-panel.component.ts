import { Component, inject, computed } from '@angular/core';
import { TreasuryDataService } from '../../services/treasury-data.service';
import { DashboardControlsService } from '../../services/dashboard-controls.service';
import { formatYears } from '../../utils/stats';

interface CounterData {
  k: number;
  yearsStr: string;
  actualCount: number;
  ratio: number;
  dateRange: string;
  n: number;
  maturity: string;
  metric: string;
  normal_expected: number;
}

@Component({
  selector: 'app-impossible-counter-panel',
  standalone: true,
  imports: [],
  template: `
    <div class="cf-panel-hero">
      @if (!svc.statsLoaded()) {
        <div class="hero-skeleton" style="height:200px"></div>
      } @else {
        @if (data(); as d) {
          @if (d.actualCount === 0) {
            <div class="honest-note">
              <p>No days that extreme found for {{ d.maturity }} in this window.</p>
              <p class="sub">Try the full history or a different maturity. The analysis is only as interesting as the data allows.</p>
            </div>
          } @else {
            <div class="counter-layout">
              <div class="counter-headline">
                <div class="k-badge">{{ d.k }}×</div>
                <div class="counter-main">
                  <div class="headline-stat">{{ d.actualCount }}</div>
                  <div class="headline-label">"impossible" days in {{ d.maturity }} history</div>
                </div>
              </div>
              <div class="counter-body">
                <p class="thesis-line">
                  A day where rates move {{ d.k }}× their typical daily swing shouldn't exist on any human timescale.
                  The normal model says it happens <strong>once every {{ d.yearsStr }} years.</strong>
                </p>
                <p class="thesis-line">
                  U.S. Treasury history has
                  <strong>{{ d.actualCount }} of them</strong> across {{ d.dateRange }}
                  ({{ d.n.toLocaleString() }} trading days)
                  — <strong class="ratio-highlight">{{ d.ratio.toFixed(0) }}×</strong> what the model predicts.
                </p>
              </div>
              <div class="counter-chips">
                <span class="chip">{{ d.maturity }} Treasury</span>
                <span class="chip">{{ d.metric === 'bps' ? 'Basis-point changes' : 'Log returns' }}</span>
                <span class="chip">{{ d.n.toLocaleString() }} trading days</span>
                <span class="chip dim">Model predicted: {{ d.normal_expected < 0.01 ? '≈0' : d.normal_expected.toFixed(2) }} days</span>
              </div>
            </div>
          }
        }
      }
    </div>
  `,
  styles: [`
    .cf-panel-hero {
      background: linear-gradient(135deg, #0f0f1a 0%, #1a1830 50%, #0f0f1a 100%);
      border: 1px solid rgba(99,102,241,0.2);
      border-radius: 12px;
      padding: 1.75rem;
      min-height: 160px;
      height: 100%;
      box-sizing: border-box;
    }
    .hero-skeleton {
      background: rgba(255,255,255,0.06);
      border-radius: 8px;
      animation: pulse 1.5s ease-in-out infinite;
    }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }
    .counter-layout { display: flex; flex-direction: column; gap: 1rem; }
    .counter-headline { display: flex; align-items: center; gap: 1rem; }
    .k-badge {
      background: var(--accent-primary);
      color: #fff;
      font-family: var(--font-mono);
      font-size: 1rem;
      font-weight: 700;
      border-radius: 0.5rem;
      padding: 0.4rem 0.7rem;
      flex-shrink: 0;
    }
    .headline-stat {
      font-family: var(--font-display);
      font-size: 3rem;
      font-weight: 800;
      color: #fff;
      line-height: 1;
      letter-spacing: -0.04em;
    }
    .headline-label { font-size: 0.78rem; color: #a5b4fc; margin-top: 0.2rem; }
    .thesis-line { color: #c7d2fe; font-size: 0.83rem; line-height: 1.6; margin: 0; }
    .thesis-line strong { color: #e0e7ff; }
    .ratio-highlight { color: #fbbf24 !important; font-size: 1rem; }
    .counter-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.25rem; }
    .chip {
      font-size: 0.63rem;
      font-family: var(--font-mono);
      background: rgba(255,255,255,0.07);
      color: #c7d2fe;
      border-radius: 0.25rem;
      padding: 0.18rem 0.45rem;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .chip.dim { color: #6366f1; background: transparent; }
    .honest-note { color: #a5b4fc; font-size: 0.85rem; }
    .honest-note p { margin: 0 0 0.5rem; }
    .honest-note .sub { font-size: 0.72rem; color: #6366f1; }
  `],
})
export class ImpossibleCounterPanelComponent {
  protected readonly svc     = inject(TreasuryDataService);
  private  readonly controls = inject(DashboardControlsService);

  protected readonly data = computed<CounterData | null>(() => {
    const s = this.svc.currentStats();
    if (!s) return null;

    const rev = [...s.sigma_bands].reverse();
    let best: typeof s.sigma_bands[0] | undefined =
      rev.find(b => b.actual_count > 0 && b.expected_count_normal < b.actual_count * 0.5);
    if (!best) best = rev.find(b => b.actual_count > 0);
    if (!best) return {
      k: 5, yearsStr: 'N/A', actualCount: 0, ratio: 0,
      dateRange: `${s.date_start.slice(0,4)}–${s.date_end.slice(0,4)}`,
      n: s.n, maturity: s.maturity, metric: s.metric, normal_expected: 0,
    };

    const yearsStr = formatYears(best.expected_years_between);
    const ratio    = best.expected_count_normal > 0
      ? best.actual_count / best.expected_count_normal
      : best.actual_count * 1000;

    return {
      k:               best.k,
      yearsStr,
      actualCount:     best.actual_count,
      ratio,
      dateRange:       `${s.date_start.slice(0,4)}–${s.date_end.slice(0,4)}`,
      n:               s.n,
      maturity:        s.maturity,
      metric:          s.metric,
      normal_expected: best.expected_count_normal,
    };
  });
}
