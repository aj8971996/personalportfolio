import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { YieldCurvePanelComponent }     from './panels/yield-curve-panel/yield-curve-panel.component';
import { CashflowTrendPanelComponent }  from './panels/cashflow-trend-panel/cashflow-trend-panel.component';
import { WaterfallPanelComponent }      from './panels/waterfall-panel/waterfall-panel.component';
import { RateKpiPanelComponent }        from './panels/rate-kpi-panel/rate-kpi-panel.component';
import { VarianceTablePanelComponent }  from './panels/variance-table-panel/variance-table-panel.component';

@Component({
  selector: 'app-cashflow-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    YieldCurvePanelComponent,
    CashflowTrendPanelComponent,
    WaterfallPanelComponent,
    RateKpiPanelComponent,
    VarianceTablePanelComponent,
  ],
  templateUrl: './cashflow-dashboard.component.html',
})
export class CashflowDashboardComponent {}
