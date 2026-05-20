export interface FRPPRecord {
  id: number;
  agencyName: string;
  state: string;
  city: string;
  assetType: 'Building' | 'Land' | 'Structure';
  assetStatus: 'Active' | 'Excess' | 'Disposed';
  ownedOrLeased: 'Owned' | 'Leased';
  squareFeetRentable: number;
  squareFeetAvailable: number;
  annualRent: number;
  annualCost: number;
  utilizationPct: number;
  prevUtilizationPct: number;
  constructionYear: number;
  installationName: string;
}

export interface TravelRecord {
  date: string;
  employeeId: string;
  department: string;
  category: 'Travel' | 'Meals' | 'Lodging' | 'Fleet';
  amount: number;
  vendor: string;
}

export interface FilterState {
  state: string;
  assetType: 'All' | 'Building' | 'Land' | 'Structure';
  ownership: 'All' | 'Owned' | 'Leased';
}

export interface KPIData {
  totalAssets: number;
  avgUtilization: number;
  flaggedCount: number;
  leasedPct: number;
  ownedPct: number;
}

export interface StateUtilization {
  state: string;
  avgUtil: number;
  count: number;
}

export interface AgencyCost {
  agency: string;
  costPerSqft: number;
  totalCost: number;
  assetCount: number;
}

export interface ScatterPoint {
  x: number;
  y: number;
  r: number;
  label: string;
}

export interface PredictiveFlag {
  installationName: string;
  state: string;
  agencyName: string;
  assetType: string;
  squareFeetRentable: number;
  annualRent: number;
  currentUtil: number;
  prevUtil: number;
  trend: 'up' | 'down' | 'stable';
  predictedNext: number;
}
