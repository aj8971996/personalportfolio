import { Component, inject, computed } from '@angular/core';
import { TreasuryDataService } from '../../services/treasury-data.service';
import { DashboardControlsService } from '../../services/dashboard-controls.service';
import { metricUnit } from '../../utils/transforms';

interface VarCard {
  label: string;
  sublabel: string;
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
    <div class="cf-panel">
      <div class="cf-panel-header">
        <div>
          <h2 class="cf-panel-title">What the model says you'd lose on a bad day</h2>
          <p class="cf-panel-caption">
            Value-at-Risk (VaR) — if you assume rate moves are normally distributed,
            these are the daily loss thresholds a treasury desk would set. Each number
            is the point where you'd expect a breach that often.
          </p>
        </div>
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
              <span class="kpi-sublabel">{{ card.sublabel }}</span>
              <span class="kpi-value">{{ card.value }}<span class="kpi-unit">{{ card.unit }}</span></span>
              <span class="kpi-foot">{{ card.footnote }}</span>
            </div>
          }
        </div>
        <div class="var-explainer">
          <p>
            VaR is the most common use of the normal distribution in risk management. A desk
            that sizes limits using this model should breach the 99% line about 2-3 times per
            year. When fat tails are present, that breach happens far more often. The sigma-band
            table below shows by how much.
          </p>
        </div>
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
    }
    .kpi-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; margin-bottom: 1rem; }
    .kpi-card {
      border-radius: 0.5rem;
      padding: 0.75rem;
      border: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }
    .kpi-card.tier-normal  { background: rgba(110,231,183,0.05); border-color: rgba(110,231,183,0.18); }
    .kpi-card.tier-warn    { background: rgba(252,211,77,0.05);  border-color: rgba(252,211,77,0.18);  }
    .kpi-card.tier-danger  { background: rgba(252,165,165,0.05); border-color: rgba(252,165,165,0.18); }
    .kpi-label {
      font-size: 0.62rem;
      font-family: var(--font-mono);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: var(--text-muted);
    }
    .kpi-sublabel {
      font-size: 0.65rem;
      color: var(--text-muted);
      opacity: 0.7;
      margin-bottom: 0.1rem;
    }
    .kpi-value {
      font-family: var(--font-display);
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.1;
    }
    .kpi-unit  { font-size: 0.72rem; font-weight: 400; color: var(--text-muted); margin-left: 0.2rem; }
    .kpi-foot  { font-size: 0.62rem; color: var(--text-muted); font-family: var(--font-mono); }
    .kpi-skeleton {
      height: 5rem;
      background: var(--bg-raised);
      border-radius: 0.5rem;
      margin-bottom: 0.65rem;
      animation: pulse 1.5s ease-in-out infinite;
    }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .var-explainer {
      font-size: 0.72rem;
      color: var(--text-muted);
      line-height: 1.6;
      padding: 0.7rem 0.85rem;
      background: var(--bg-raised);
      border-radius: 0.5rem;
      border: 1px solid var(--border);
    }
    .var-explainer p { margin: 0; }
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
        label: '95% VaR',
        sublabel: '1-in-20-day loss limit',
        value: fmt(vt['95'].var_loss),
        unit,
        footnote: `model expects 1 breach ~every 20 trading days`,
        tier: 'normal',
      },
      {
        label: '99% VaR',
        sublabel: '1-in-100-day loss limit',
        value: fmt(vt['99'].var_loss),
        unit,
        footnote: `model expects 1 breach ~every 100 trading days`,
        tier: 'warn',
      },
      {
        label: '99.9% VaR',
        sublabel: '1-in-1,000-day loss limit',
        value: fmt(vt['999'].var_loss),
        unit,
        footnote: `model expects 1 breach ~every 1,000 trading days`,
        tier: 'danger',
      },
      {
        label: 'Worst actual move',
        sublabel: 'single-day record',
        value: fmt(s.min),
        unit,
        footnote: `${s.min_date} — ${Math.abs(s.min / s.sigma).toFixed(1)}× the typical daily swing`,
        tier: 'danger',
      },
    ];
  });
}
