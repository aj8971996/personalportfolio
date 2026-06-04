import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TreasuryDataService } from './services/treasury-data.service';
import { DashboardControlsService } from './services/dashboard-controls.service';
import { DistributionFitPanelComponent } from './panels/distribution-fit-panel/distribution-fit-panel.component';
import { QqPlotPanelComponent } from './panels/qq-plot-panel/qq-plot-panel.component';
import { VarKpiPanelComponent } from './panels/var-kpi-panel/var-kpi-panel.component';
import { SigmaTimelinePanelComponent } from './panels/sigma-timeline-panel/sigma-timeline-panel.component';
import { ImpossibleCounterPanelComponent } from './panels/impossible-counter-panel/impossible-counter-panel.component';
import { Maturity, Metric, Window } from './models/models';

@Component({
  selector: 'app-rate-risk-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    DistributionFitPanelComponent,
    QqPlotPanelComponent,
    VarKpiPanelComponent,
    SigmaTimelinePanelComponent,
    ImpossibleCounterPanelComponent,
  ],
  templateUrl: './rate-risk-dashboard.component.html',
  styleUrls: ['./rate-risk-dashboard.component.scss'],
})
export class RateRiskDashboardComponent implements OnInit {
  protected readonly svc      = inject(TreasuryDataService);
  protected readonly controls = inject(DashboardControlsService);
  showMethodology = false;

  readonly maturities: Maturity[] = ['3M', '2Y', '5Y', '10Y', '30Y'];
  readonly windows: { id: Window; label: string }[] = [
    { id: 'full',   label: 'Full History' },
    { id: '2008',   label: '2007–2010 (GFC)' },
    { id: '2020',   label: '2019–2021 (COVID)' },
    { id: '2022',   label: '2022–2024 (Hiking)' },
  ];

  ngOnInit(): void {
    this.svc.loadAll();
  }

  setMaturity(m: Maturity): void { this.controls.maturity.set(m); }
  setMetric(m: Metric):    void { this.controls.metric.set(m); }
  setWindow(w: Window):    void { this.controls.window.set(w); }
}
