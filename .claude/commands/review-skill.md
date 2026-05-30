---
description: >
  Structured review framework for skill file drafts before they are committed to
  .claude/commands/. Use this skill whenever reviewing, editing, or auditing a drafted
  skill file — whether it came from a web-based agent, a previous session, or was written
  inline. Trigger on: "review this skill," "edit this draft," "check this against the
  codebase," "skill draft," "brought back from the web agent," or any time a .md file is
  being evaluated for inclusion in .claude/commands/. Covers format compliance, factual
  accuracy against the current stack, consistency with existing skills, voice compliance,
  and actionability. Always run this before committing a new skill. When reviewing
  multiple drafts at once, process them in dependency order — skills that cross-reference
  others should be reviewed after their dependencies.
---

# Skill review

Structured review process for incoming skill drafts. Web-agent drafts need the most
scrutiny — they can't read the actual codebase, so they guess at file paths, class
names, and current patterns. This skill closes that gap.

5 review categories. Run them in order. Categories 1 and 2 block commit if they fail.
Categories 3–5 are quality gates that require fixes before the skill is useful.

---

## Category 1: format & frontmatter (blocking)

The file must open with a `---` YAML block. The `description:` field is what Claude Code
reads to decide whether to trigger the skill — a weak description means the skill never
fires.

- [ ] File opens with `---` frontmatter block, closes with `---`
- [ ] `description:` field is present and specific — not a one-word label
- [ ] Description lists concrete trigger words and situations (not just "use when relevant")
- [ ] Description leans toward triggering — better to over-trigger than miss
- [ ] Body opens with a `# Skill Title` H1 immediately after the frontmatter
- [ ] All headers use sentence case — per `/voice` rule 4K (not Title Case)
- [ ] No `## Overview` or `## Introduction` section that restates the title — start with content

---

## Category 2: factual accuracy against the current stack (blocking)

Verify every technical claim against the actual codebase before accepting it. Web agents
draft from training data, not from the real files — outdated patterns slip through often.

**The facts to check against:**

Angular / bootstrap:
- Angular 19, standalone components only. No `NgModules`.
- `main.ts` calls `bootstrapApplication(AppComponent, appConfig)` — unified, no duplicate provider setup
- `provideZoneChangeDetection({ eventCoalescing: true })` lives in `app.config.ts`, not `main.ts`
- Routing uses lazy `loadComponent` per route + `withInMemoryScrolling` in `appConfig`
- `provideEchartsCore({ echarts })` in `app.config.ts` — not `NgxEchartsModule.forRoot()`

Dark theme (CSS custom properties, `src/styles.scss`):
- `--bg-base: #09090B` · `--bg-surface: #111117` · `--bg-raised: #18181F`
- `--border: rgba(255,255,255,0.06)`
- `--accent-primary: #6366F1` · `--accent-bright: #818CF8`
- `--text-primary: #F1F5F9` · `--text-secondary: #94A3B8` · `--text-muted: #475569`
- `--font-display: 'Space Grotesk'` · `--font-body: 'Inter'` · `--font-mono: 'JetBrains Mono'`

Panel class names (component SCSS files, `cf-` prefix):
- Card: `.cf-panel` · Header row: `.cf-panel-header` · Title: `.cf-panel-title`
- Caption: `.cf-panel-caption` · Footnote: `.cf-panel-note`
- Loading state: `.cf-skeleton`
- Status badges: `.badge-ok` · `.badge-watch` · `.badge-breach`

Dashboard shell classes (shell component SCSS):
- `.dash-page` · `.dash-header` · `.dash-header-inner` · `.dash-section`
- `.tab-nav` · `.tab-nav-inner` · `.tab-btn`

KPI panel: `.cf-kpi-grid` · `.cf-kpi-card` · `.cf-kpi-label` · `.cf-kpi-value`

**Patterns that are no longer in use — flag and reject any draft that references these:**
- `NgModules` or `forRoot()` patterns
- `bg-white rounded-xl shadow-sm ring-1 ring-gray-100` — old light-theme Tailwind panel style
- `animate-pulse bg-gray-100` skeleton style — replaced by `.cf-skeleton`
- `import * as echarts from 'echarts'` — replaced by tree-shaken chart/component imports
- `ng-apexcharts` / ApexCharts sparklines — removed from stack
- `text-gray-700`, `text-gray-400`, `bg-white` in panel components — all replaced by CSS var classes
- ECharts axis colors `#e2e8f0` or `#f1f5f9` — replaced by `rgba(255,255,255,0.08)` / `rgba(255,255,255,0.05)`

**Deployment facts:**
- Source on `main` branch; `docs/` folder committed to `main` and also deployed
- Live site served from `gh-pages` branch root
- Deploy: `npx ng deploy` (runs `angular-cli-ghpages`)
- `.claude/commands/` committed to `main` only — never reaches `gh-pages`
- `.claude/settings.local.json` is gitignored; everything else in `.claude/` is tracked

For each factual claim in the draft: verify against the above or grep/read the relevant
file before marking it correct. If unsure, check first.

---

## Category 3: consistency with existing skills (quality gate)

Current skill set — check the draft against each potentially overlapping one:

| Skill | Covers |
|---|---|
| `/voice` | Writing rules, banned vocabulary, banned patterns, formatting |
| `/dashboard-design` | Few/Tufte layout, chart-type selection, color budget, anti-patterns |
| `/angular-dashboard-dev` | Angular 19 + dark theme implementation, Signals, ngx-echarts, tab structure |
| `/deep-analysis` | TypeScript statistics: regression, z-score/IQR, rolling avg, forecasting, variance |
| `/sas-analytics` | SAS DATA step, PROC patterns, SAS→Angular export pipeline |

Check for:
- [ ] No direct contradiction with an existing skill (different advice on the same topic)
- [ ] No significant duplication (if content belongs in an existing skill, note which one)
- [ ] Cross-references are accurate — if the draft says "see `/angular-dashboard-dev`," that
  skill actually covers the referenced topic

When there's overlap, the fix is to trim the duplicate section and add a one-line
cross-reference instead. Don't rewrite the existing skill to accommodate the new one —
fix the new draft.

---

## Category 4: voice compliance (quality gate)

Skills are read by Claude and by humans. Hard rule violations must be fixed. Strong
preference violations should be fixed. Code blocks and YAML examples are exempt.

Hard rules — any failure means rewrite the sentence:
- [ ] No em dashes anywhere in prose — replace with comma, colon, semicolon, or parentheses
- [ ] No negative parallelisms: "It's not X. It's Y." / "Not X, Y." / "Stop thinking X. Start thinking Y." — delete the negated framing and state the positive claim directly
- [ ] No banned vocabulary: delve, leverage, harness, unlock, robust, seamless, cutting-edge,
  innovative, transformative, paradigm, pivotal, crucial, holistic, utilize, synergy,
  showcase, foster, align, empower — full list in `/voice` §3A

Strong preferences — fix unless the prose genuinely reads better without the change:
- [ ] Short paragraphs in body prose — 2-3 sentences max
- [ ] Sentence case in all headers
- [ ] Numbers as digits in body text (3 steps, 10 patterns, 2 rules)
- [ ] Contractions in prose sections
- [ ] No meta-commentary ("this section covers...", "let's explore...", "in this skill we will...")
- [ ] No "rule of three" — lists of exactly 3 adjectives/phrases are an AI tell; use 2 or 4

---

## Category 5: actionability & specificity (quality gate)

The test: can someone read a guideline and know exactly what to do, without asking a
follow-up question? If the answer is "it depends" with no further guidance, the guideline
is underspecified.

- [ ] Every "do X" recommendation is specific enough to act on
- [ ] Every "don't do Y" includes either a reason or a "do Z instead"
- [ ] Examples are real and concrete — not "imagine a hypothetical scenario"
- [ ] Any threshold, ratio, or number is stated explicitly — not "a few," "several," "appropriate"
- [ ] Checklist items are binary yes/no — not open-ended assessments
- [ ] No placeholder sections ("further research needed," "TBD," "add examples here")

---

## Review output format

After running all 5 categories, produce a finding in this structure:

```
## Review: [filename]

**Status:** READY TO COMMIT / NEEDS EDITS / BLOCKING ISSUES

### Blocking issues (fix before anything else)
- [issue]: [specific line or section] → [what to change]

### Recommended edits
- [issue]: [specific section] → [suggested fix or replacement text]

### Verify against codebase
- [claim in draft]: grep or read [file] to confirm

### Minor notes
- [observation that doesn't require action but is worth knowing]
```

Skip empty sections. If status is BLOCKING ISSUES, do not proceed to commit — fix the
blocking issues first, then re-run the review.

---

## Batch review (multiple drafts at once)

When reviewing a set of drafts from one web session, process them in dependency order:

1. Skills that are referenced by others first (e.g., `/role-positioning` before `/portfolio-copy`)
2. Skills with no dependencies in any order
3. Update cross-references in earlier drafts if a later draft changes a skill's scope

After each skill passes review, commit it before reviewing the next. This keeps the
`.claude/commands/` state clean and makes partial completion recoverable.

---

## Definition of done

A skill is ready to commit when:
1. Format and frontmatter correct
2. Every factual claim verified against the actual codebase
3. No contradictions with existing skills
4. No `/voice` hard-rule violations
5. Every guideline is specific enough to act on without follow-up
6. No placeholder sections remaining

After committing, update the `reference_skills.md` memory file with the new skill name
and a one-line hook describing what it covers.
