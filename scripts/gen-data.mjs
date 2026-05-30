/**
 * gen-data.mjs — Generate all CSV assets for Dashboard 2
 * Run: node scripts/gen-data.mjs
 * Outputs: src/assets/data/{yield_curve_long,rate_kpis,cashflow_synthetic,cash_forecast,variance_table}.csv
 */
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('src/assets/data');
fs.mkdirSync(OUT, { recursive: true });

// ── helpers ──────────────────────────────────────────────────────────────────
function parseFred(file) {
  const lines = fs.readFileSync(file, 'utf8').trim().split('\n');
  const header = lines[0].split(',');
  const valCol = header[1];
  return lines.slice(1)
    .map(l => { const [d, v] = l.split(','); return { date: d, value: v === '.' ? null : parseFloat(v) }; })
    .filter(r => r.value !== null && !isNaN(r.value));
}

function parseTreasury(file) {
  const lines = fs.readFileSync(file, 'utf8').trim().split('\n');
  const rawHdr = lines[0].split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(h => h.replace(/"/g, '').trim());
  return lines.slice(1).map(l => {
    const cols = l.split(',').map(c => c.trim());
    const row = {};
    rawHdr.forEach((h, i) => { row[h] = cols[i] ?? ''; });
    return row;
  }).filter(r => r['Date']);
}

function toISO(treasuryDate) {
  // "05/29/2026" → "2026-05-29"
  const [m, d, y] = treasuryDate.split('/');
  return `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;
}

const TENOR_MAP = {
  '1 Mo':       { code: '1Mo',  years: 1/12 },
  '1.5 Month':  { code: '1.5Mo', years: 1.5/12 },
  '2 Mo':       { code: '2Mo',  years: 2/12 },
  '3 Mo':       { code: '3Mo',  years: 0.25 },
  '4 Mo':       { code: '4Mo',  years: 4/12 },
  '6 Mo':       { code: '6Mo',  years: 0.5 },
  '1 Yr':       { code: '1Yr',  years: 1 },
  '2 Yr':       { code: '2Yr',  years: 2 },
  '3 Yr':       { code: '3Yr',  years: 3 },
  '5 Yr':       { code: '5Yr',  years: 5 },
  '7 Yr':       { code: '7Yr',  years: 7 },
  '10 Yr':      { code: '10Yr', years: 10 },
  '20 Yr':      { code: '20Yr', years: 20 },
  '30 Yr':      { code: '30Yr', years: 30 },
};

// ── 1. Yield curve long ───────────────────────────────────────────────────────
console.log('1. Building yield_curve_long.csv …');
const tsy2025 = parseTreasury('raw/treasury_yields_2025.csv');
const tsy2026 = parseTreasury('raw/treasury_yields.csv');
const allTsy = [...tsy2025, ...tsy2026].sort((a, b) => toISO(a.Date) < toISO(b.Date) ? -1 : 1);

const yieldLongRows = [];
for (const row of allTsy) {
  const iso = toISO(row['Date']);
  for (const [col, { code, years }] of Object.entries(TENOR_MAP)) {
    const raw = row[col];
    if (!raw || raw === '') continue;
    const v = parseFloat(raw);
    if (isNaN(v)) continue;
    yieldLongRows.push({ date: iso, maturity: code, yield_pct: v.toFixed(2), tenor_yrs: years.toFixed(4) });
  }
}

const yieldLongCsv = 'date,maturity,yield_pct,tenor_yrs\n'
  + yieldLongRows.map(r => `${r.date},${r.maturity},${r.yield_pct},${r.tenor_yrs}`).join('\n');
fs.writeFileSync(path.join(OUT, 'yield_curve_long.csv'), yieldLongCsv);
console.log(`   → ${yieldLongRows.length} rows`);

// ── 2. Rate KPIs (last 90 trading days) ──────────────────────────────────────
console.log('2. Building rate_kpis.csv …');
const dff  = parseFred('raw/DFF.csv');
const dgs2 = parseFred('raw/DGS2.csv');
const dgs10= parseFred('raw/DGS10.csv');

// Index by date
const byDate = {};
for (const r of dff)  { byDate[r.date] ??= {}; byDate[r.date].fed_funds = r.value; }
for (const r of dgs2) { byDate[r.date] ??= {}; byDate[r.date].y2 = r.value; }
for (const r of dgs10){ byDate[r.date] ??= {}; byDate[r.date].y10 = r.value; }

const allDates = Object.keys(byDate).sort();
const last100 = allDates.slice(-100);

const kpiRows = last100
  .map(d => ({ date: d, ...byDate[d] }))
  .filter(r => r.fed_funds !== undefined && r.y2 !== undefined && r.y10 !== undefined)
  .map(r => ({
    observation_date: r.date,
    fed_funds: r.fed_funds.toFixed(2),
    y2: r.y2.toFixed(2),
    y10: r.y10.toFixed(2),
    spread_2_10: (r.y10 - r.y2).toFixed(3),
  }));

const kpiCsv = 'observation_date,fed_funds,y2,y10,spread_2_10\n'
  + kpiRows.map(r => `${r.observation_date},${r.fed_funds},${r.y2},${r.y10},${r.spread_2_10}`).join('\n');
fs.writeFileSync(path.join(OUT, 'rate_kpis.csv'), kpiCsv);
console.log(`   → ${kpiRows.length} rows`);

// ── 3. Synthetic cash flow (replicates SAS macro §5.1) ───────────────────────
console.log('3. Building cashflow_synthetic.csv …');

// Simple seeded PRNG (mulberry32)
function mulberry32(seed) {
  return function() {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20260528);
const N_WEEKS = 130;
const START_DATE = new Date('2023-01-06');

function addDays(d, n) {
  const r = new Date(d);
  r.setUTCDate(r.getUTCDate() + n);
  return r;
}
function fmtDate(d) {
  return d.toISOString().slice(0, 10);
}
function round100(v) { return Math.round(v / 100) * 100; }

const PI2 = 2 * Math.PI;
const synthRows = [];
let closing_balance = 5000000;
let prev_closing = closing_balance;

for (let i = 0; i < N_WEEKS; i++) {
  const date = fmtDate(addDays(START_DATE, i * 7));
  const opening_balance = closing_balance;

  const base_in = 1200000 + 90000 * Math.sin(PI2 * i / 52) + 4000 * i;
  const inflows = round100(base_in * (0.85 + 0.30 * rand()));

  let base_out = 1100000 + 70000 * Math.cos(PI2 * i / 52) + 3500 * i;
  let outflows = round100(base_out * (0.85 + 0.30 * rand()));
  if (rand() < 0.05) outflows += round100(700000 * rand());

  closing_balance = opening_balance + inflows - outflows;

  const forecast_balance = i === 0
    ? opening_balance
    : prev_closing + (inflows - outflows) * 0.95;
  const variance_vs_forecast = closing_balance - forecast_balance;

  const cats = ['Operating', 'Financing', 'Investing', 'Operating'];
  const category = cats[i % 4];

  synthRows.push({
    date, opening_balance, inflows, outflows, closing_balance,
    category, variance_vs_forecast: Math.round(variance_vs_forecast),
    forecast_balance: Math.round(forecast_balance),
  });
  prev_closing = closing_balance;
}

const synthCsv = 'date,opening_balance,inflows,outflows,closing_balance,category,variance_vs_forecast,forecast_balance\n'
  + synthRows.map(r =>
    `${r.date},${r.opening_balance},${r.inflows},${r.outflows},${r.closing_balance},${r.category},${r.variance_vs_forecast},${r.forecast_balance}`
  ).join('\n');
fs.writeFileSync(path.join(OUT, 'cashflow_synthetic.csv'), synthCsv);
console.log(`   → ${synthRows.length} rows`);

// ── 4. Cash forecast CSV (§5.3 — EXPO smoothing + 80% confidence band) ───────
console.log('4. Building cash_forecast.csv …');

// Simple exponential smoothing
function expSmooth(series, alpha = 0.3) {
  const fitted = [series[0]];
  for (let i = 1; i < series.length; i++) {
    fitted.push(alpha * series[i] + (1 - alpha) * fitted[i - 1]);
  }
  return fitted;
}

const actuals = synthRows.map(r => r.closing_balance);
const smoothed = expSmooth(actuals, 0.25);

// Residuals for std dev estimate
const residuals = actuals.map((a, i) => a - smoothed[i]);
const n = residuals.length;
const meanR = residuals.reduce((s, v) => s + v, 0) / n;
const stdR = Math.sqrt(residuals.reduce((s, v) => s + (v - meanR) ** 2, 0) / n);

// 80% band: z ≈ 1.2816
const Z80 = 1.2816;
const LEAD = 8;

const forecastRows = [];

// Historical: actual vs one-step-ahead smoothed
for (let i = 0; i < synthRows.length; i++) {
  forecastRows.push({
    date: synthRows[i].date,
    ACTUAL: Math.round(actuals[i]),
    FORECAST: Math.round(smoothed[i]),
    L95: '',
    U95: '',
  });
}

// Forecast horizon: last smoothed value + growing uncertainty
const lastSmoothed = smoothed[smoothed.length - 1];
const lastDate = addDays(START_DATE, (N_WEEKS - 1) * 7);
for (let k = 1; k <= LEAD; k++) {
  const fDate = fmtDate(addDays(lastDate, k * 7));
  const band = Z80 * stdR * Math.sqrt(k);
  forecastRows.push({
    date: fDate,
    ACTUAL: '',
    FORECAST: Math.round(lastSmoothed),
    L95: Math.round(lastSmoothed - band),
    U95: Math.round(lastSmoothed + band),
  });
}

const fcastCsv = 'date,ACTUAL,FORECAST,L95,U95\n'
  + forecastRows.map(r => `${r.date},${r.ACTUAL},${r.FORECAST},${r.L95},${r.U95}`).join('\n');
fs.writeFileSync(path.join(OUT, 'cash_forecast.csv'), fcastCsv);
console.log(`   → ${forecastRows.length} rows (${N_WEEKS} historical + ${LEAD} forecast)`);

// ── 5. Variance table (§5.4) ─────────────────────────────────────────────────
console.log('5. Building variance_table.csv …');

const varRows = synthRows.map(r => {
  const forecast = r.forecast_balance;
  const actual   = r.closing_balance;
  const var_abs  = actual - forecast;
  const var_pct  = forecast === 0 ? 0 : (var_abs / Math.abs(forecast)) * 100;
  const aPct = Math.abs(var_pct);
  const status = aPct <= 5 ? 'green' : aPct <= 15 ? 'yellow' : 'red';
  return {
    date: r.date,
    forecast: Math.round(forecast),
    actual: Math.round(actual),
    var_abs: Math.round(var_abs),
    var_pct: var_pct.toFixed(2),
    status,
  };
});

const varCsv = 'date,forecast,actual,var_abs,var_pct,status\n'
  + varRows.map(r => `${r.date},${r.forecast},${r.actual},${r.var_abs},${r.var_pct},${r.status}`).join('\n');
fs.writeFileSync(path.join(OUT, 'variance_table.csv'), varCsv);
console.log(`   → ${varRows.length} rows`);

console.log('\nAll CSV assets written to src/assets/data/ ✓');
