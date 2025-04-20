import { Dispatch, ReactNode, SetStateAction } from "react";

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

export interface ClaimsTableHeaderProps {
  totalAmount: number;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: Dispatch<SetStateAction<string>>;
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: Dispatch<SetStateAction<boolean>>;
  resetFilters: () => void;
  statusBreakdown: {
    Approved: number;
    Pending: number;
    Denied: number;
  };
  totalClaims: number;
}

export interface ClaimsTableContentProps {
  filteredAndSortedClaims: any[];
  totalClaims: number;
  statusBreakdown: StatusBreakdown;
  sortField: SortField;
  sortDirection: "asc" | "desc";
  handleSort: (field: SortField) => void;
  resetFilters: () => void;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}
