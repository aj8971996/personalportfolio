import { Component, inject, computed } from '@angular/core';
import { TreasuryDataService } from '../../services/treasury-data.service';
import { DashboardControlsService } from '../../services/dashboard-controls.service';
import { metricUnit } from '../../utils/transforms';

interface VarCard {
  label: string;
  value: string;
  unit: string;
  footnote: string;
  tier: 'normal' | 'warn' | 'danger';
}

@Component({
  selector: 'app-var-kpi-panel',
  standalone: true,
  imports: [],
  template: `
    <div class="panel-card">
      <div class="panel-header">
        <h2 class="panel-title">Value-at-Risk (Normal Assumption)</h2>
        <p class="panel-sub">1-day parametric VaR under the normal distribution — the standard treasury risk sizing model</p>
      </div>

      @if (!svc.statsLoaded()) {
        @for (n of [1,2,3,4]; track n) {
          <div class="kpi-skeleton"></div>
        }
      } @else {
        <div class="kpi-grid">
          @for (card of cards(); track card.label) {
            <div class="kpi-card" [class]="'tier-' + card.tier">
              <span class="kpi-label">{{ card.label }}</span>
              <span class="kpi-value">{{ card.value }}<span class="kpi-unit">{{ card.unit }}</span></span>
              <span class="kpi-foot">{{ card.footnote }}</span>
            </div>
          }
        </div>
        <div class="var-explainer">
          <p>
            <strong>How VaR works:</strong> Assume daily yield changes are normally distributed with
            the historical mean (μ) and standard deviation (σ). The 99% VaR is μ&nbsp;−&nbsp;2.326σ —
            meaning there is a 1% chance of exceeding that loss in a single day <em>if</em> the normal
            model holds. That "if" is where fat tails matter: see the sigma-band analysis below.
          </p>
        </div>
      }
    </div>
  `,
  styles: [`
    .panel-card { background:#fff; border-radius:0.75rem; box-shadow:0 1px 2px rgba(0,0,0,.05);
      ring-width:1px; ring-color:#f3f4f6; padding:1.5rem; height:100%; }
    .panel-header { margin-bottom:1rem; }
    .panel-title { font-size:1rem; font-weight:600; color:#111827; }
    .panel-sub { font-size:0.75rem; color:#6b7280; margin-top:0.25rem; }
    .kpi-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-bottom:1rem; }
    .kpi-card { border-radius:0.5rem; padding:0.875rem; border:1px solid #e5e7eb;
      display:flex; flex-direction:column; gap:0.25rem; }
    .kpi-card.tier-normal  { background:#f0fdf4; border-color:#bbf7d0; }
    .kpi-card.tier-warn    { background:#fffbeb; border-color:#fde68a; }
    .kpi-card.tier-danger  { background:#fef2f2; border-color:#fecaca; }
    .kpi-label { font-size:0.68rem; font-weight:600; text-transform:uppercase;
      letter-spacing:0.06em; color:#6b7280; }
    .kpi-value { font-size:1.35rem; font-weight:700; color:#111827; line-height:1.1; }
    .kpi-unit  { font-size:0.75rem; font-weight:400; color:#6b7280; margin-left:0.2rem; }
    .kpi-foot  { font-size:0.65rem; color:#9ca3af; }
    .kpi-skeleton { height:5rem; background:linear-gradient(90deg,#f3f4f6 25%,#e5e7eb 50%,#f3f4f6 75%);
      background-size:200% 100%; animation:shimmer 1.4s infinite; border-radius:0.5rem; margin-bottom:0.75rem; }
    @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
    .var-explainer { font-size:0.72rem; color:#6b7280; line-height:1.6;
      padding:0.75rem; background:#f9fafb; border-radius:0.5rem; border:1px solid #e5e7eb; }
    .var-explainer p { margin:0; }
    .var-explainer strong { color:#374151; }
  `],
})
export class VarKpiPanelComponent {
  protected readonly svc     = inject(TreasuryDataService);
  private  readonly controls = inject(DashboardControlsService);

  protected readonly cards = computed<VarCard[]>(() => {
    const s = this.svc.currentStats();
    if (!s) return [];
    const unit = metricUnit(this.controls.metric());
    const fmt  = (v: number) => (this.controls.metric() === 'bps' ? v.toFixed(1) : v.toFixed(5));

    const vt = s.var_thresholds;
    return [
      {
        label: '95% 1-Day VaR',
        value: fmt(vt['95'].var_loss),
        unit,
        footnote: `z = 1.645 · σ = ${fmt(s.sigma)} · μ = ${fmt(s.mu)}`,
        tier: 'normal',
      },
      {
        label: '99% 1-Day VaR',
        value: fmt(vt['99'].var_loss),
        unit,
        footnote: `z = 2.326 — normal model: 1 breach per ~100 trading days`,
        tier: 'warn',
      },
      {
        label: '99.9% 1-Day VaR',
        value: fmt(vt['999'].var_loss),
        unit,
        footnote: `z = 3.090 — normal model: 1 breach per ~1,000 trading days`,
        tier: 'danger',
      },
      {
        label: 'Worst Actual Move',
        value: fmt(s.min),
        unit,
        footnote: `${s.min_date} · ${Math.abs(s.min / s.sigma).toFixed(1)}σ from mean`,
        tier: 'danger',
      },
    ];
  });
}
