export type Claim = {
  patient_id: string;
  patient_name: string;
  billing_code: string;
  amount: number;
  insurance_provider: string;
  payment_status: "Pending" | "Approved" | "Denied";
  claim_date: string;
};

export interface RevenueSimulationParams {
  pendingProbability: number;
  approvedProbability: number;
  deniedProbability: number;
}

export interface SimulationResult {
  expectedRevenue: number;
  percentiles: number[];
  histogram: number[];
  minRevenue: number;
  maxRevenue: number;
}

export interface RevenueChartProps {
  simulationResult: SimulationResult | null;
  isDarkMode: boolean;
}

export interface RevenueSliderProps {
  value: number;
  onChange: (value: number[]) => void;
  label: string;
}

export interface RevenueForecastingProps {
  claims: Claim[];
  isLoading: boolean;
}

import { ReactNode } from "react";

export interface StatusDataType {
  count: number;
  amount: number;
  percentage: number;
}

export interface StatusDataMapType {
  [key: string]: StatusDataType;
}

export interface StatusConfigType {
  title: string;
  description: string;
  amountLabel: string;
  gradient: string;
  cardBg: string;
  textColor: string;
  textColorBold: string;
  indicatorBg: string;
  dotColor: string;
  iconBg: string;
  spriteBg: string;
  icon: ReactNode;
  trendIcon: ReactNode;
  spriteElements: ReactNode;
}

export interface StatusConfigMapType {
  [key: string]: StatusConfigType;
}

export interface ChartDataType {
  labels: string[];
  values: number[];
  backgroundColor: string[];
  borderColor: string[];
}

export interface StatusConfig {
  icon: ReactNode;
  bgClass: string;
  iconClass: string;
}

export interface StatusBreakdown {
  Approved: number;
  Pending: number;
  Denied: number;
}

export interface ClaimsTableStatusIndicatorsProps {
  statusBreakdown: StatusBreakdown;
}

export type SortField = keyof Claim | null;

export type SortDirection = "asc" | "desc";

export interface ClaimsTableContentProps {
  filteredAndSortedClaims: Claim[];
  totalClaims: number;
  statusBreakdown: {
    Approved: number;
    Pending: number;
    Denied: number;
  };
  sortField: SortField;
  sortDirection: SortDirection;
  handleSort: (field: SortField) => void;
  resetFilters: () => void;
}

export interface RevenueSimulationParams {
  pendingProbability: number;
  approvedProbability: number;
  deniedProbability: number;
}

export interface SimulationResult {
  expectedRevenue: number;
  percentiles: number[];
  histogram: number[];
  minRevenue: number;
  maxRevenue: number;
}
