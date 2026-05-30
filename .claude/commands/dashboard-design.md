---
description: >
  Design principles, layout patterns, chart-type selection, and visual encoding for
  analytical and operational dashboards. Use this skill whenever building, reviewing,
  laying out, or critiquing ANY dashboard, data-visualization view, analytics screen,
  KPI panel, report page, or chart — even if the user only says "show the data,"
  "build a metrics page," "add a panel," "visualize this," or names a chart type
  (choropleth, scatter, treemap, heatmap, waterfall, sparkline). Trigger on questions
  about which chart to use, how to lay panels out, color/status conventions, skeleton
  loaders, responsive collapse, KPI hierarchy, or dashboard anti-patterns. Lean toward
  triggering: any time data is being arranged for a human to read at a glance, consult
  this skill before writing markup.
---

# Dashboard Design

This skill encodes the design layer for dense analytical dashboards — the *what goes
where and why*, independent of framework. For the Angular/ECharts implementation of
these decisions, the `angular-dashboard-dev` skill is the companion. For choosing the
chart type given an analytical question, `deep-analysis` carries the full taxonomy; the
short decision tree here is enough for layout work.

The governing references are Stephen Few (*Information Dashboard Design*), Edward Tufte
(data-ink ratio), and Nielsen Norman / Don Norman on visual hierarchy. The three
load-bearing principles, in priority order, are **information hierarchy**, **visual
flow**, and **cognitive-load management**. Everything below serves these three.

## First decision: what kind of dashboard is this?

Few's typology drives every later choice. Decide before laying anything out:

- **Strategic / executive** — a few high-level KPIs, generous whitespace, infrequent
  refresh, almost no interaction. Optimize for a 5-second glance.
- **Analytical** — dense, comparison-heavy, supports drill-down and filtering. The
  treasury/real-estate portfolio dashboards are analytical. Optimize for exploration.
- **Operational** — real-time monitoring, status-forward, alerting prominent. Optimize
  for "is anything wrong right now?"

State the type in one sentence before building. A dashboard that tries to be all three
fails at all three.

## Information architecture: filter → overview → detail

Lay the page out top-to-bottom as a narrowing funnel, matching the F/Z reading pattern:

1. **Filter controls** at the very top (top filter bar) or left (sidebar). Use a **top
   bar** when filters are few (1–4) and global; use a **left sidebar** when filters are
   many, faceted, or persistent across drill-downs. Filters always precede the data
   they govern in reading order.
2. **KPI bar** — the 3–6 numbers that answer "how are we doing?" at a glance. Largest
   type on the page sits here. This is the apex of the hierarchy.
3. **Hero panel** — one full-width chart or map that is the dashboard's reason to exist
   (the choropleth utilization map, the yield curve). It anchors visual flow.
4. **Analytical grid** — the supporting panels, in a responsive grid, ordered by
   importance left-to-right, top-to-bottom.
5. **Detail tables / flag lists** — ranked, exportable, lowest in the funnel.

Progressive disclosure of complexity: the top of the page is readable by anyone in
seconds; complexity (regression residuals, methodology, raw rows) lives lower, behind
expanders, or in a drawer — never in the first glance.

## Visual hierarchy: how to make the eye land correctly

Hierarchy is created by **size, position, and contrast — in that order**, not by color
alone. The single most important number is the largest. Position the most important
content top-left (F-pattern) or along the Z. Reserve the highest contrast (darkest text,
boldest weight) for the values that matter; everything else recedes to gray. If
everything is bold, nothing is.

## Panel card anatomy

Every analytical panel is the same card. Consistency *is* the design — varied card
shapes create false signals of importance. The canonical card:

```
┌─────────────────────────────────────────────┐
│  Panel Title              context/source tag │  ← header row
│                                               │
│            [ chart area ]                     │  ← fixed-height chart
│                                               │
│  data source · as-of date · methodology link │  ← footnote (muted)
└─────────────────────────────────────────────┘
```

- **Header**: left-aligned title (semibold, small), right-aligned context label or a
  single optional action button (export, drill). Never more than one action in the
  header — extra actions go in a menu.
- **Chart area**: fixed height so the grid stays even and skeletons match.
- **Footnote**: data source, as-of date, and a methodology link if the panel computes
  anything non-obvious (regression, forecast, anomaly threshold). Muted, smallest type.

The portfolio uses a dark-theme card shell across all dashboards. The canonical classes
are defined in each panel's component SCSS using CSS custom properties (`--bg-surface`,
`--border`, `--text-primary`, `--text-muted`, `--font-display`, `--font-mono`). The
`cf-panel` / `cf-panel-header` / `cf-panel-title` / `cf-panel-note` class names are the
agreed house standard — copy them verbatim when adding a new panel.

## Chart-type selection (layout-level decision tree)

Match the chart to the analytical question, never to decorative preference:

| Question shape | Chart | Notes |
|---|---|---|
| Value across a geography | Choropleth map | One metric per region; needs a legend with a sane color scale |
| How is X distributed? | Histogram / box plot | Box plot when comparing distributions across groups |
| Does X predict Y? | Scatter + trendline | Add a regression line; never a scatter without one if causation is the question |
| X over time | Line | Add a reference/average line via `markLine` for context |
| Compare a metric across groups | Horizontal bar (ranked) | Sort by value; horizontal when labels are long |
| Part-to-whole, few parts | Stacked bar | **Not** a pie — see anti-patterns |
| Sequential additive changes | Waterfall | Opening → deltas → closing (see `angular-dashboard-dev` for the ECharts pattern) |
| Two-dimension density | Heatmap | When both axes are categorical/binned |
| Single trend in a KPI card | Sparkline | No axes, no gridlines — context only |

When two charts could work, pick the one with the higher data-ink ratio (Tufte): the
one that spends less pixel on chrome and more on data.

## Color budget

**Do not exceed three semantic color families in a single view.** More than three and
the viewer can no longer hold the legend in working memory. Allocate them deliberately:

- **Status palette** — green (good / within tolerance), yellow (watch), red (breach /
  stress). Traffic-light semantics only; never use these three for non-status categories
  or the meaning collapses. On the dark theme: `#6EE7B7` / `#FCD34D` / `#FCA5A5` with
  low-opacity tinted backgrounds.
- **Categorical palette** — for non-status dimensions. Two to four hues, maximally
  distinct.
- **Neutral palette** — grays for axes, gridlines, labels, skeletons, and the panel
  chrome itself. Most of the page should be neutral so the colored bits mean something.

Color must never be the *only* channel carrying meaning (colorblind safety): pair status
color with an icon, a label, or position.

## Status, alerting, and predictive flags

Communicate urgency without alarming. Reserve red for genuine breaches; overuse of red
desensitizes. Patterns:

- **Threshold markers**: a horizontal reference line on a chart (`markLine` type
  `'value'`) communicates "the line you should not cross" far better than coloring bars.
- **Anomaly callouts**: mark only the outlier points (`markPoint`), not the whole series.
- **Predictive flag tables**: when surfacing "entities at risk," sort worst-first, show
  current value, projected value, and periods-until-threshold, with a small trend icon.
  A ranked table beats a chart for "which specific things need attention."
- Badge thresholds should be stated in the footnote so the color is auditable
  (e.g., "green ≤ ±5%, yellow ±5–15%, red > ±15%").

## Skeleton loading (no spinners, no layout shift)

Use skeleton loaders keyed to a boolean `loaded` flag, never a centered spinner.
Critically: **the skeleton must match the filled shape** — same card height, same chart
height, same KPI count — so that when data arrives there is zero layout shift. A skeleton
that is the wrong size is worse than none. Style: `cf-skeleton` (dark theme) sized to
the exact panel height via inline `style="height:Xpx"`.

## Responsive strategy

Design the desktop grid first, then decide per-panel how it collapses:

- Grid: `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6`. Panels reflow to a
  single column below `md`.
- KPI bar: `cf-kpi-grid` — two-up on phones, four-up on desktop via the component SCSS.
- The hero map/chart stays full-width at every breakpoint.
- Wide tables get horizontal scroll on mobile rather than truncation.
- Charts with many series or fine x-axis ticks need a **simplified mobile variant**
  (fewer ticks, hidden legend, larger touch targets ≥ 44px) — don't just shrink them.

## Typography scale for dashboards

A tight, consistent scale prevents the "ransom note" look:

- Metric value (KPI hero number): `cf-kpi-value` → Space Grotesk, large, font-weight 700.
- Metric label: `cf-kpi-label` → JetBrains Mono, 0.65rem, uppercase, `--text-muted`.
- Panel header: `cf-panel-title` → Space Grotesk, 1rem, font-weight 600, `--text-primary`.
- Chart axis / tick labels: `#94a3b8`, font-size 11.
- Footnote / source: `cf-panel-note` → JetBrains Mono, 0.68rem, `--text-muted`.

Two font families total (Space Grotesk for display/values, JetBrains Mono for labels/metadata)
and two weights (400 + 600/700) is the house rule.

## Anti-patterns (Few's list, applied)

Refuse these even if asked, or flag them explicitly:

- **Pie charts for comparison** — humans compare angles poorly; use a ranked bar.
- **Dual Y-axes** — they imply a correlation the data may not support and are near-
  impossible to read; use two stacked panels instead.
- **Chartjunk** — 3-D effects, drop shadows on data, decorative gradients that obscure
  values. Maximize data-ink ratio.
- **Decorative gradient fills** behind data that change apparent value.
- **Modal overuse for drill-down** — modals break flow and lose context; prefer inline
  expanders or a side drawer that keeps the overview visible.
- **More than ~6 KPIs** in the bar — past that, none get read.
- **Rainbow/sequential color confusion** — a sequential metric needs a sequential
  (single-hue) scale, not a categorical rainbow.

## Quick self-check before shipping a layout

1. Can a stranger name the dashboard's single most important number in 5 seconds?
2. Are there ≤ 3 semantic color families?
3. Does every panel share the identical card shell?
4. Does each computed panel cite its source/method in a footnote?
5. Do skeletons match filled shapes (zero layout shift)?
6. Does the grid collapse sanely to one column on mobile?
7. Is red used only for genuine breaches?
8. Is there a trendline on every "does X predict Y?" scatter?
