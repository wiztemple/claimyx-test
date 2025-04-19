"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Claim } from "@/types/types";
import { useTheme } from "../providers/theme-provider";
import { statusConfig } from "@/lib/status-config";
import { calculateMetrics } from "@/lib/utils";
import { StatusCard } from "./ui/status-card";
import { ClaimDistribution } from "./claims-table/claim-distribution";

interface DashboardSummaryProps {
  claims: Claim[];
  isLoading: boolean;
}

export function DashboardSummary({ claims, isLoading }: DashboardSummaryProps) {
  const { isDarkMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderSkeleton = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-28 w-full rounded-xl" />
        ))}
      </div>
      <div className="col-span-1 sm:col-span-2 lg:col-span-4">
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    </>
  );

  if (isLoading) return renderSkeleton();

  const statusData = calculateMetrics(claims, statusConfig);

  // Chart data
  const chartData = {
    labels: Object.keys(statusConfig).filter((status) => status !== "Total"),
    values: Object.keys(statusConfig)
      .filter((status) => status !== "Total")
      .map((status) => statusData[status].count),
    backgroundColor: [
      "rgba(250, 204, 21, 0.8)",
      "rgba(34, 197, 94, 0.8)",
      "rgba(239, 68, 68, 0.8)",
    ],
    borderColor: [
      "rgba(250, 204, 21, 1)",
      "rgba(34, 197, 94, 1)",
      "rgba(239, 68, 68, 1)",
    ],
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Object.keys(statusConfig).map((status) => (
          <div key={status}>
            <StatusCard
              status={status}
              config={statusConfig[status as keyof typeof statusConfig]}
              data={statusData[status]}
            />
          </div>
        ))}
      </div>
      
      <ClaimDistribution 
        chartData={chartData} 
        statusData={statusData} 
        statusConfig={statusConfig} 
        mounted={mounted} 
        isDarkMode={isDarkMode} 
      />
    </>
  );
}
