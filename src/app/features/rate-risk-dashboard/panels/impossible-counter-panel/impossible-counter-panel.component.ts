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
  maturity: string;
  metric: string;
  normal_expected: number;
}

@Component({
  selector: 'app-impossible-counter-panel',
  standalone: true,
  imports: [],
  template: `
    <div class="panel-card">
      @if (!svc.statsLoaded()) {
        <div class="skeleton" style="height:180px"></div>
      } @else {
        @if (data(); as d) {
          @if (d.actualCount === 0) {
            <div class="honest-note">
              <p>No ±{{ d.k }}σ+ events detected for {{ d.maturity }} ({{ d.metric }}) in the selected window.</p>
              <p class="sub">Try a longer window or a different maturity. The analysis is only as interesting as the data allows.</p>
            </div>
          } @else {
            <div class="counter-layout">
              <div class="counter-headline">
                <div class="k-badge">±{{ d.k }}σ</div>
                <div class="counter-main">
                  <div class="headline-stat">{{ d.actualCount }}</div>
                  <div class="headline-label">"impossible" days in {{ d.maturity }} history</div>
                </div>
              </div>
              <div class="counter-body">
                <p class="thesis-line">
                  The normal distribution predicts a ±{{ d.k }}σ day in U.S. Treasury rates about
                  <strong>once every {{ d.yearsStr }} years.</strong>
                </p>
                <p class="thesis-line">
                  Over {{ d.dateRange }}, history delivered
                  <strong>{{ d.actualCount }} of them</strong> —
                  <strong class="ratio-highlight">{{ d.ratio.toFixed(0) }}× more</strong>
                  than the bell curve allows.
                </p>
              </div>
              <div class="counter-chips">
                <span class="chip">{{ d.maturity }} Treasury</span>
                <span class="chip">{{ d.metric === 'bps' ? 'Basis-point changes' : 'Log returns' }}</span>
                <span class="chip">{{ d.dateRange }}</span>
                <span class="chip dim">Normal model expected: {{ d.normal_expected < 0.01 ? '≈0' : d.normal_expected.toFixed(2) }}</span>
              </div>
            </div>
          }
        }
      }
    </div>
  `,
  styles: [`
    .panel-card { background:linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#1e1b4b 100%);
      border-radius:0.75rem; padding:1.75rem; min-height:160px; }
    .skeleton { background:rgba(255,255,255,0.08); border-radius:0.5rem;
      animation:shimmer 1.4s infinite; }
    @keyframes shimmer { 0%{opacity:0.5} 50%{opacity:0.8} 100%{opacity:0.5} }
    .counter-layout { display:flex; flex-direction:column; gap:1rem; }
    .counter-headline { display:flex; align-items:center; gap:1rem; }
    .k-badge { background:#6366f1; color:#fff; font-size:1.1rem; font-weight:800;
      border-radius:0.5rem; padding:0.4rem 0.75rem; letter-spacing:-0.02em; flex-shrink:0; }
    .headline-stat { font-size:3rem; font-weight:800; color:#fff; line-height:1;
      letter-spacing:-0.04em; }
    .headline-label { font-size:0.8rem; color:#a5b4fc; margin-top:0.2rem; }
    .thesis-line { color:#e0e7ff; font-size:0.85rem; line-height:1.55; margin:0; }
    .thesis-line strong { color:#fff; }
    .ratio-highlight { color:#fbbf24 !important; font-size:1rem; }
    .counter-chips { display:flex; flex-wrap:wrap; gap:0.4rem; margin-top:0.25rem; }
    .chip { font-size:0.65rem; background:rgba(255,255,255,0.1); color:#c7d2fe;
      border-radius:0.25rem; padding:0.2rem 0.45rem; border:1px solid rgba(255,255,255,0.15); }
    .chip.dim { color:#7c83b5; background:transparent; }
    .honest-note { color:#a5b4fc; font-size:0.85rem; }
    .honest-note p { margin:0 0 0.5rem; }
    .honest-note .sub { font-size:0.72rem; color:#6366f1; }
  `],
})
export class ImpossibleCounterPanelComponent {
  protected readonly svc     = inject(TreasuryDataService);
  private  readonly controls = inject(DashboardControlsService);

  protected readonly data = computed<CounterData | null>(() => {
    const s = this.svc.currentStats();
    if (!s) return null;

    // Pick highest k where actual_count > 0 and ratio is interesting
    const rev = [...s.sigma_bands].reverse();
    let best: typeof s.sigma_bands[0] | undefined =
      rev.find((b: typeof s.sigma_bands[0]) => b.actual_count > 0 && b.expected_count_normal < b.actual_count * 0.5);
    if (!best) best = rev.find((b: typeof s.sigma_bands[0]) => b.actual_count > 0);
    if (!best) return { k: 5, yearsStr: 'N/A', actualCount: 0, ratio: 0, dateRange: `${s.date_start.slice(0,4)}–${s.date_end.slice(0,4)}`, maturity: s.maturity, metric: s.metric, normal_expected: 0 };

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
      maturity:        s.maturity,
      metric:          s.metric,
      normal_expected: best.expected_count_normal,
    };
  });
}
