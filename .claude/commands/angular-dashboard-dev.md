---
description: >
  Portfolio-specific implementation patterns for the alexbarkus.dev Angular 19 analytics
  dashboards: standalone components, Angular Signals (signal/computed/effect), ngx-echarts
  + Apache ECharts, PapaParse CSV loading, lodash-es transforms, and the exact dark-theme
  panel-card conventions. Use this skill for ANY work on these dashboards or anything built
  on the same stack — adding or editing a panel, wiring a filter, loading CSV data, building
  chart options, fixing an invisible/zero-height ECharts chart, registering chart types,
  writing a transform or regression utility, or matching the existing visual style. Trigger
  whenever the request involves Angular + ECharts, Angular signals for data, "the dashboard,"
  "a panel," "the filter service," or maintaining consistency across the portfolio pieces.
  Lean toward triggering: if Angular and a chart are both in scope, consult this skill before
  writing code.
---

# Angular Dashboard Development (alexbarkus.dev stack)

This skill encodes the *exact* patterns used in the alexbarkus.dev portfolio dashboards
so that every new panel and every new dashboard component matches the existing ones.
Consistency across the pieces is the point — a reviewer should not be able to tell they
were built in different sessions. For *why* a given chart/layout is chosen, see
`dashboard-design`; for the statistics inside `computed()`, see `deep-analysis`.

## The stack (fixed — do not substitute)

```
Angular 19          standalone components only, NO NgModules
TypeScript          strict mode, no `any` in transforms/stats
SCSS                component-scoped SCSS files using CSS custom properties (no Tailwind in panels)
State               Angular Signals — signal(), computed(), effect(); NO NgRx
Charts (primary)    ngx-echarts + apache echarts
CSV                 PapaParse
Transforms          lodash-es (tree-shakeable, named imports only)
```

## Component architecture: one standalone component per panel

- `DashboardComponent` is the shell. It renders the header, tab nav, and section wrappers.
  It owns no chart logic.
- **Each panel is its own `@Component`** (`standalone: true`). A panel injects the services
  it needs and derives its own chart options. Panels do not know about each other.
- **Never pass raw data arrays into a panel via `@Input()`.** Data and filter state arrive
  through injected signal-based services so the source of truth stays single and reactive.

```
cashflow-dashboard.component.ts        // shell only — tab state, methodology toggle
services/
  cashflow.service.ts                  // owns rawRows signal + loaded signal + computed filteredRows
  dashboard-filter.service.ts          // owns filter signals (selectedPeriod, etc.)
panels/
  cashflow-trend-panel/
    cashflow-trend-panel.component.ts  // injects both services, derives its own EChartsOption
    cashflow-trend-panel.component.html
    cashflow-trend-panel.component.scss
```

## Signal patterns (the canonical contract)

Filter state lives in `DashboardFilterService` as writable signals. Data lives in a data
service as a writable `rawRows` signal plus a `computed` `filteredRows`. Panels read those
signals inside a `computed<EChartsOption>()` and return a **new** options object.

```typescript
@Component({
  selector: 'app-cashflow-trend-panel',
  imports: [NgxEchartsDirective],
  templateUrl: './cashflow-trend-panel.component.html',
  styleUrls: ['./cashflow-trend-panel.component.scss'],
})
export class CashflowTrendPanelComponent {
  private svc = inject(CashflowService);

  protected loaded = computed(() => this.svc.forecastLoaded());

  protected chartOptions = computed<EChartsOption>(() => {
    const rows = this.svc.forecastRows();   // signal read → dependency tracked
    return buildForecastOptions(rows);      // pure builder returns a NEW object
  });
}
```

Rules that matter and why:

- **Use `computed()` for derived chart options — never `effect()`.** `computed()` is
  pull-based, memoized, and side-effect-free. `effect()` is for side effects only:
  triggering a CSV download, firing an analytics event, syncing to the URL.
- **Always return a brand-new `EChartsOption` object from the `computed`.** ngx-echarts
  diffs by reference; a mutated-in-place object will not re-render.
- **Skeleton via `loaded` signal**: `loaded = signal(false)` in the data service, flipped
  to `true` in the PapaParse `complete` callback. Template gates on `@if (loaded())`.

## ngx-echarts integration (Angular 19, current API)

Install:

```bash
npm install echarts ngx-echarts
```

**Use `provideEchartsCore` + `echarts.use([...])`.** Register only the chart types and
components actually used so the bundle stays small.

In `app.config.ts`:

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart, LineChart, ScatterChart } from 'echarts/charts';
import {
  GridComponent, TooltipComponent, LegendComponent,
  MarkLineComponent, MarkPointComponent, MarkAreaComponent,
  DataZoomComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  BarChart, LineChart, ScatterChart,
  GridComponent, TooltipComponent, LegendComponent,
  MarkLineComponent, MarkPointComponent, MarkAreaComponent,
  DataZoomComponent,
  CanvasRenderer,
]);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'top' })),
    provideHttpClient(),
    provideEchartsCore({ echarts }),
  ],
};
```

In each panel, add `NgxEchartsDirective` to the component `imports` array. Template:

```html
<div echarts [options]="chartOptions()" style="height: 400px"></div>
```

**The single most common ECharts bug: an invisible chart.** ECharts measures its container
on init; if the container has no resolved height the canvas renders at 0px. The container
MUST have an explicit height — `style="height: 400px"` is the pattern here. If a chart is
blank, check height *first*.

### Dark-theme chart defaults

All charts use a dark background. Set these on every `EChartsOption`:

```typescript
{
  backgroundColor: 'transparent',
  tooltip: {
    backgroundColor: '#1E1E2A',
    textStyle: { color: '#F1F5F9' },
    borderColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
  },
  // axis:
  xAxis: {
    axisLabel: { color: '#94a3b8', fontSize: 11 },
    axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
  },
  yAxis: {
    axisLabel: { color: '#94a3b8', fontSize: 11 },
    splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
  },
  legend: { bottom: 0, textStyle: { color: '#94a3b8', fontSize: 11 } },
}
```

Never use light-mode axis colors (`#e2e8f0`, `#f1f5f9`) — the panel backgrounds are
`var(--bg-surface)` (#111117) and those values render as harsh white lines.

### Trendlines, anomaly markers, reference lines

- **Trendline on scatter**: a second `line` series whose `data` are the two endpoints
  of the regression, computed by `linearRegression()` (see `deep-analysis`).
- **Anomaly markers**: `markPoint` on the affected series with a `data` array of
  `{ coord: [x, y] }` for just the flagged points.
- **Threshold reference line**: `markLine` with `data: [{ yAxis: thresholdValue }]`.

## PapaParse CSV loading

Always fetch via Angular's `HttpClient`, hand the *string* to PapaParse. Do **not** use
`Papa.parse(url, { download: true })` — it bypasses Angular's HTTP layer.

```typescript
@Injectable({ providedIn: 'root' })
export class CashflowService {
  private http = inject(HttpClient);
  readonly rawRows  = signal<ForecastRow[]>([]);
  readonly loaded   = signal(false);

  loadAll(): void {
    this.http.get('/assets/data/cash_forecast.csv', { responseType: 'text' }).subscribe(csv => {
      Papa.parse<ForecastRow>(csv, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: result => {
          this.rawRows.set(result.data);
          this.loaded.set(true);
        },
      });
    });
  }
}
```

Every parse result goes through `.set()` on a signal — never a plain class property, or
reactivity is lost.

## TypeScript / file-organization conventions

- **No `any`** in `transforms.ts`, `regression.ts`, or any statistical function.
- **Pure functions only** in `transforms.ts` (no class, no injected state).
- **Regression in `regression.ts`**, forecasting helpers in `forecast.ts`.
- **`lodash-es` named imports** — `groupBy`, `sortBy`, `sumBy`, `meanBy`. Never the
  default import (`import _ from 'lodash'`) — it defeats tree-shaking.
- **Shared interfaces in `models.ts`**.

## Dark-theme panel conventions (copy verbatim)

The shell component (e.g. `cashflow-dashboard.component`) uses these SCSS classes for the
page wrapper, header, tab nav, and section spacing. The CSS custom properties are defined
in `src/styles.scss`:

```
--bg-base:       #09090B   (page background)
--bg-surface:    #111117   (panel card background)
--bg-raised:     #18181F   (table header, select, raised elements)
--border:        rgba(255,255,255,0.06)
--accent-primary: #6366F1
--accent-bright:  #818CF8
--text-primary:   #F1F5F9
--text-secondary: #94A3B8
--text-muted:     #475569
--font-display:  'Space Grotesk', sans-serif
--font-body:     'Inter', sans-serif
--font-mono:     'JetBrains Mono', monospace
```

Each panel sub-component owns its own SCSS file. Panel-level class names:

```scss
.cf-panel          { background: var(--bg-surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem 1.5rem; }
.cf-panel-header   { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; }
.cf-panel-title    { font-family: var(--font-display); font-size: 1rem; font-weight: 600; color: var(--text-primary); }
.cf-panel-caption  { font-size: 0.78rem; color: var(--text-muted); line-height: 1.5; }
.cf-panel-note     { font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-muted); margin-top: 0.75rem; border-top: 1px solid var(--border); padding-top: 0.6rem; }
.cf-skeleton       { background: var(--bg-raised); border-radius: 8px; animation: pulse 1.5s ease-in-out infinite; }
```

Status badges (dark theme):

```scss
.badge-ok      { background: rgba(16,185,129,0.1);  color: #6EE7B7; border: 1px solid rgba(16,185,129,0.2); }
.badge-watch   { background: rgba(245,158,11,0.12); color: #FCD34D; border: 1px solid rgba(245,158,11,0.3); }
.badge-breach  { background: rgba(239,68,68,0.15);  color: #FCA5A5; border: 1px solid rgba(239,68,68,0.3); }
```

Tab navigation and page shell classes (`dash-page`, `dash-header`, `tab-nav`, `tab-btn`,
etc.) live in the shell component's SCSS, not in panel SCSS files.

## Tab-based dashboard structure

Dashboards in this portfolio are organized around **question-driven tabs**. Each tab
answers exactly one question and shows only the panels that serve that question.

```typescript
export type CashTab = 'rates' | 'position' | 'waterfall' | 'variance';

readonly tabs: { id: CashTab; question: string }[] = [
  { id: 'rates',     question: 'What is the rate environment?' },
  { id: 'position',  question: 'Is cash flow healthy?'         },
  { id: 'waterfall', question: 'Where is cash moving?'         },
  { id: 'variance',  question: 'Are forecasts accurate?'       },
];
```

Tab switching uses `@if (activeTab === 'x')` blocks in the template (not `[hidden]`) so
panels are removed from the DOM when not active. This is intentional: it avoids running
`computed()` chains for off-screen panels and forces each panel to re-initialize cleanly
when revisited.

## Build & performance

- **Lazy-load each dashboard feature** in the route config:
  `loadComponent(() => import('./features/cashflow-dashboard/cashflow-dashboard.component').then(m => m.CashflowDashboardComponent))`
- **Register only the ECharts pieces in use** in `app.config.ts` — never
  `import * as echarts from 'echarts'`.
- **Aggregate before charting.** Filter → `groupBy` → `sumBy`/`meanBy` → build the small
  series inside `computed()`. Charts receive tens-to-hundreds of points, not raw rows.
- **Store derived data in a `computed()` signal**, not a mutable service property.

## Common failure modes (check these first when debugging)

1. **Blank chart** → container has no explicit height. Add `style="height: 400px"`.
2. **Chart never updates on filter change** → options object was mutated in place; return a
   new object from `computed()` instead.
3. **A `markLine`/`markPoint` silently missing** → its ECharts component wasn't passed
   to `echarts.use([...])` in `app.config.ts`.
4. **Data loads but nothing renders** → result was assigned to a class property instead of
   `.set()` on a signal.
5. **Axis lines look harsh/white** → axis colors are still set to light-mode values
   (`#e2e8f0`, `#f1f5f9`). Update to `rgba(255,255,255,0.08)` / `rgba(255,255,255,0.05)`.
6. **Huge bundle** → default lodash import or `import * as echarts from 'echarts'`.
