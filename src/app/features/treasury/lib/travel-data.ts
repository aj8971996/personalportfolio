import { TravelRecord } from './types';

function mulberry32(seed: number): () => number {
  let s = seed;
  return () => {
    s |= 0; s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = mulberry32(9999);
const r = () => rng();
const ri = (min: number, max: number) => Math.floor(r() * (max - min + 1)) + min;
const rf = (min: number, max: number) => r() * (max - min) + min;
const pick = <T>(arr: T[]): T => arr[ri(0, arr.length - 1)];

function rNormal(mean: number, std: number): number {
  const u = Math.max(1e-10, r());
  const v = r();
  return mean + std * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

const DEPARTMENTS = [
  'Real Estate', 'Treasury Ops', 'Finance', 'Facilities', 'Executive',
  'Legal', 'HR', 'Procurement', 'IT', 'Operations',
];

const TRAVEL_VENDORS = ['Delta Airlines', 'United Airlines', 'American Airlines', 'Southwest', 'JetBlue'];
const MEAL_VENDORS = ['Marriott Restaurant', 'Hilton Dining', 'Local Bistro', 'Conference Center', 'Business Café'];
const LODGING_VENDORS = ['Marriott', 'Hilton', 'Hyatt', 'Westin', 'Embassy Suites', 'Courtyard'];
const FLEET_VENDORS = ['Enterprise Rent-A-Car', 'Hertz', 'Avis', 'National Car Rental', 'Budget'];

// Spike multiplier by month key (YYYY-MM)
const SPIKE_MONTHS: Record<string, number> = {
  '2023-03': 2.6,  // annual real estate summit
  '2023-11': 2.1,  // year-end travel push
  '2024-03': 2.5,  // annual summit repeat
  '2024-09': 1.8,  // fiscal year end close-out
};

function getBaseline(category: TravelRecord['category']): { mean: number; std: number } {
  switch (category) {
    case 'Travel':  return { mean: 820,  std: 280 };
    case 'Meals':   return { mean: 68,   std: 22  };
    case 'Lodging': return { mean: 255,  std: 80  };
    case 'Fleet':   return { mean: 165,  std: 55  };
  }
}

function getVendor(category: TravelRecord['category']): string {
  switch (category) {
    case 'Travel':  return pick(TRAVEL_VENDORS);
    case 'Meals':   return pick(MEAL_VENDORS);
    case 'Lodging': return pick(LODGING_VENDORS);
    case 'Fleet':   return pick(FLEET_VENDORS);
  }
}

export const TRAVEL_DATA: TravelRecord[] = (() => {
  const records: TravelRecord[] = [];
  const categories: TravelRecord['category'][] = ['Travel', 'Meals', 'Lodging', 'Fleet'];
  let empCounter = 1;

  for (let year = 2023; year <= 2024; year++) {
    for (let month = 1; month <= 12; month++) {
      const monthKey = `${year}-${String(month).padStart(2, '0')}`;
      const spike = SPIKE_MONTHS[monthKey] ?? 1.0;
      const daysInMonth = new Date(year, month, 0).getDate();

      // Base records per month: ~18-22
      const baseCount = ri(18, 22);
      const count = Math.round(baseCount * spike);

      for (let j = 0; j < count; j++) {
        const category = pick(categories);
        const { mean, std } = getBaseline(category);
        const adjustedMean = mean * spike;
        const rawAmount = rNormal(adjustedMean, std * spike);
        const amount = Math.round(Math.max(10, rawAmount) * 100) / 100;
        const day = ri(1, daysInMonth);
        const date = `${monthKey}-${String(day).padStart(2, '0')}`;

        records.push({
          date,
          employeeId: `EMP-${String(ri(100, 300)).padStart(4, '0')}`,
          department: pick(DEPARTMENTS),
          category,
          amount,
          vendor: getVendor(category),
        });
      }
      empCounter++;
    }
  }

  return records.sort((a, b) => a.date.localeCompare(b.date));
})();
