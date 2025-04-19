"use client";

import { Claim } from "@/types/types";
import { useTheme } from "../providers/theme-provider";
import { statusConfig } from "@/lib/status-config";
import { calculateMetrics } from "@/lib/utils";
import { StatusCard } from "./ui/status-card";
import { ClaimDistribution } from "./claims-table/claim-distribution";
import { useEffect, useState } from "react";

interface DashboardSummaryProps {
  claims: Claim[];
}

export function DashboardSummary({ claims }: DashboardSummaryProps) {
  const { isDarkMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
