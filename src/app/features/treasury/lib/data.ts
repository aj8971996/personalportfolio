import { FRPPRecord } from './types';

function mulberry32(seed: number): () => number {
  let s = seed;
  return () => {
    s |= 0; s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = mulberry32(2024);
const r = () => rng();
const ri = (min: number, max: number) => Math.floor(r() * (max - min + 1)) + min;
const pick = <T>(arr: T[]): T => arr[ri(0, arr.length - 1)];
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

function rNormal(mean: number, std: number): number {
  const u = Math.max(1e-10, r());
  const v = r();
  return mean + std * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

const AGENCIES: string[] = [
  'Dept. of Defense', 'Veterans Affairs', 'GSA', 'Dept. of Justice',
  'Dept. of Energy', 'Homeland Security', 'Dept. of State', 'Transportation',
  'Dept. of Interior', 'Agriculture', 'Health & Human Services', 'Treasury',
  'NASA', 'Social Security Admin.', 'Commerce', 'EPA',
  'Dept. of Labor', 'Dept. of Education', 'Housing & Urban Dev.', 'USPS',
];

const AGENCY_BASE_UTIL: Record<string, number> = {
  'Dept. of Defense': 78, 'Veterans Affairs': 85, 'GSA': 91, 'Dept. of Justice': 71,
  'Dept. of Energy': 64, 'Homeland Security': 82, 'Dept. of State': 88, 'Transportation': 69,
  'Dept. of Interior': 58, 'Agriculture': 62, 'Health & Human Services': 74, 'Treasury': 86,
  'NASA': 72, 'Social Security Admin.': 79, 'Commerce': 67, 'EPA': 61,
  'Dept. of Labor': 75, 'Dept. of Education': 88, 'Housing & Urban Dev.': 73, 'USPS': 81,
};

const STATES_W: [string, number][] = [
  ['CA', 12], ['TX', 8], ['VA', 7], ['NY', 6], ['FL', 6], ['DC', 5], ['MD', 4],
  ['GA', 4], ['IL', 4], ['PA', 3], ['WA', 3], ['CO', 3], ['AZ', 3], ['OH', 3],
  ['NJ', 2], ['NC', 2], ['TN', 2], ['KS', 2], ['MO', 2], ['NV', 2],
  ['MN', 1.5], ['AL', 1.5], ['SC', 1.5], ['OK', 1.5], ['NE', 1],
  ['MT', 1], ['WY', 1], ['ND', 1], ['SD', 1], ['NM', 1],
];

const STATE_MOD: Record<string, number> = {
  DC: 8, VA: 5, MD: 4, NY: 2, NJ: 1, IL: 1, CA: 3, WA: 2, PA: 1,
  TX: -2, FL: -1, AZ: -3, NM: -5, ND: -8, MT: -6, WY: -8, SD: -7, KS: -3,
};

const STATE_CITIES: Record<string, string[]> = {
  CA: ['Los Angeles', 'San Francisco', 'Sacramento', 'San Diego', 'Oakland'],
  TX: ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth'],
  VA: ['Arlington', 'Richmond', 'Norfolk', 'McLean', 'Alexandria'],
  NY: ['New York', 'Albany', 'Buffalo', 'Syracuse', 'Rochester'],
  FL: ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Tallahassee'],
  DC: ['Washington'],
  MD: ['Baltimore', 'Rockville', 'Bethesda', 'Silver Spring', 'Annapolis'],
  GA: ['Atlanta', 'Savannah', 'Augusta', 'Macon', 'Columbus'],
  IL: ['Chicago', 'Springfield', 'Rockford', 'Naperville', 'Peoria'],
  PA: ['Philadelphia', 'Pittsburgh', 'Harrisburg', 'Allentown'],
  WA: ['Seattle', 'Tacoma', 'Spokane', 'Olympia', 'Bellevue'],
  CO: ['Denver', 'Colorado Springs', 'Aurora', 'Boulder'],
  AZ: ['Phoenix', 'Tucson', 'Scottsdale', 'Tempe'],
  OH: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo'],
  NJ: ['Newark', 'Jersey City', 'Trenton', 'Camden'],
  NC: ['Charlotte', 'Raleigh', 'Durham', 'Greensboro'],
  TN: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga'],
  KS: ['Wichita', 'Kansas City', 'Topeka', 'Overland Park'],
  MO: ['St. Louis', 'Kansas City', 'Springfield', 'Columbia'],
  NV: ['Las Vegas', 'Henderson', 'Reno', 'Carson City'],
};

const INSTALL_PREFIXES = [
  'Federal Building', 'Regional Office', 'Field Office', 'Service Center',
  'Operations Center', 'Administrative Center', 'Processing Facility', 'Depot',
  'Training Facility', 'Records Center', 'Laboratory', 'Research Center',
];

function weightedPick(items: [string, number][]): string {
  const total = items.reduce((s, [, w]) => s + w, 0);
  let t = r() * total;
  for (const [item, w] of items) {
    t -= w;
    if (t <= 0) return item;
  }
  return items[items.length - 1][0];
}

function constructionYear(): number {
  const v = r();
  if (v < 0.08) return ri(1900, 1939);
  if (v < 0.28) return ri(1940, 1959);
  if (v < 0.58) return ri(1960, 1979);
  if (v < 0.86) return ri(1980, 1999);
  return ri(2000, 2023);
}

export const FRPP_DATA: FRPPRecord[] = (() => {
  const records: FRPPRecord[] = [];

  for (let i = 0; i < 640; i++) {
    const agency = pick(AGENCIES);
    const state = weightedPick(STATES_W);
    const city = pick(STATE_CITIES[state] ?? [state]);
    const typeRoll = r();
    const assetType = typeRoll < 0.72 ? 'Building' : typeRoll < 0.87 ? 'Land' : 'Structure';
    const statusRoll = r();
    const assetStatus = statusRoll < 0.80 ? 'Active' : statusRoll < 0.93 ? 'Excess' : 'Disposed';
    const ownedOrLeased = r() < 0.62 ? 'Owned' : 'Leased';

    const yr = constructionYear();
    const ageMod = Math.max(0, (2023 - yr - 25) / 120);
    const baseUtil = AGENCY_BASE_UTIL[agency] ?? 72;
    const stateMod = STATE_MOD[state] ?? 0;
    const rawUtil = rNormal(baseUtil + stateMod - ageMod * 22, 11);
    const utilizationPct = Math.round(clamp(rawUtil, 10, 100) * 10) / 10;

    // Simulated prior-year utilization: slight noise to create trend signal
    const prevDelta = rNormal(0, 7);
    const prevUtilizationPct = Math.round(clamp(utilizationPct - prevDelta, 10, 100) * 10) / 10;

    const logSqft = rNormal(Math.log(18000), 0.85);
    const sqft = Math.round(Math.exp(logSqft));
    const available = Math.round(sqft * clamp(1 - utilizationPct / 100 + rNormal(0, 0.03), 0, 0.95));

    let annualRent = 0;
    let annualCost = 0;
    if (ownedOrLeased === 'Leased') {
      const rentPerSqft = clamp(rNormal(44, 12), 18, 95);
      annualRent = Math.round(sqft * rentPerSqft);
      annualCost = annualRent;
    } else {
      const maintPerSqft = clamp(rNormal(14, 4), 6, 28);
      annualCost = Math.round(sqft * maintPerSqft);
    }

    records.push({
      id: i + 1,
      agencyName: agency,
      state,
      city,
      assetType: assetType as FRPPRecord['assetType'],
      assetStatus: assetStatus as FRPPRecord['assetStatus'],
      ownedOrLeased: ownedOrLeased as FRPPRecord['ownedOrLeased'],
      squareFeetRentable: sqft,
      squareFeetAvailable: available,
      annualRent,
      annualCost,
      utilizationPct,
      prevUtilizationPct,
      constructionYear: yr,
      installationName: `${pick(INSTALL_PREFIXES)} — ${city}, ${state} #${i + 1}`,
    });
  }

  // Force some severely underperforming assets to make Panel 4 interesting
  const badStates = ['WY', 'ND', 'MT', 'NM', 'SD'];
  for (let i = 0; i < 18; i++) {
    const state = pick(badStates);
    const city = pick(STATE_CITIES[state] ?? [state]);
    const yr = ri(1945, 1975);
    const util = clamp(rNormal(32, 10), 10, 59);
    const prevUtil = clamp(util + rNormal(6, 3), util + 2, 65);
    const sqft = Math.round(Math.exp(rNormal(Math.log(25000), 0.6)));
    const rentPsf = clamp(rNormal(38, 8), 20, 58);
    const annualRent = Math.round(sqft * rentPsf);
    records.push({
      id: 640 + i + 1,
      agencyName: pick(AGENCIES),
      state, city,
      assetType: 'Building',
      assetStatus: 'Active',
      ownedOrLeased: 'Leased',
      squareFeetRentable: sqft,
      squareFeetAvailable: Math.round(sqft * 0.65),
      annualRent,
      annualCost: annualRent,
      utilizationPct: Math.round(util * 10) / 10,
      prevUtilizationPct: Math.round(prevUtil * 10) / 10,
      constructionYear: yr,
      installationName: `${pick(INSTALL_PREFIXES)} — ${city}, ${state} #${640 + i + 1}`,
    });
  }

  return records;
})();
