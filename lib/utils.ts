import { Claim, StatusConfigMapType, StatusDataMapType } from "@/types/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function calculateMetrics(claims: Claim[], statusConfig: StatusConfigMapType): StatusDataMapType {
    const totalAmount = claims.reduce((sum, claim) => sum + claim.amount, 0);
    const totalClaims = claims.length;
  
    // Status calculations
    const statusData = Object.keys(statusConfig)
      .filter((status) => status !== "Total")
      .reduce(
        (acc, status) => {
          const filteredClaims = claims.filter(
            (claim) => claim.payment_status === status
          );
          const count = filteredClaims.length;
          const amount = filteredClaims.reduce(
            (sum, claim) => sum + claim.amount,
            0
          );
          const percentage = totalClaims
            ? Math.round((count / totalClaims) * 100)
            : 0;
  
          return {
            ...acc,
            [status]: { count, amount, percentage },
          };
        },
        {
          Total: {
            count: totalClaims,
            amount: totalAmount,
            percentage: 100,
          },
        } as StatusDataMapType
      );
  
    return statusData;
  }