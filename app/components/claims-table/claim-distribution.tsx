"use client";

import { Card } from "@/app/components/ui/card";
import { PieChart } from "lucide-react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/app/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import {
  ChartDataType,
  StatusConfigMapType,
  StatusDataMapType,
} from "@/types/types";

const DoughnutChart = dynamic(() => import("../doughnut-chart"), {
  ssr: false,
  loading: () => <Skeleton className="h-36 w-full rounded-xl" />,
});

interface ClaimDistributionProps {
  chartData: ChartDataType;
  statusData: StatusDataMapType;
  statusConfig: StatusConfigMapType;
  mounted: boolean;
  isDarkMode: boolean;
}

export function ClaimDistribution({
  chartData,
  statusData,
  statusConfig,
  mounted,
  isDarkMode,
}: ClaimDistributionProps) {
  return (
    <Card
      className="shadow-none rounded-xl mb-5 overflow-hidden relative border-transparent dark:border-slate-700
        bg-gradient-to-br from-slate-50 to-slate-100
        dark:bg-gradient-to-br dark:from-gray-900 dark:to-slate-900"
    >
      <div
        className="absolute top-0 right-0 w-40 h-40 rounded-full
        bg-slate-200/30 dark:bg-white/5 -mt-20 -mr-20 blur-lg"
      ></div>
      <div
        className="absolute bottom-0 left-0 w-40 h-40 rounded-full
        bg-slate-100/30 dark:bg-white/5 -mb-20 -ml-20 blur-lg"
      ></div>
      <div
        className="absolute top-0 left-1/3 w-10 h-10 rounded-full
        bg-gray-200/20 dark:bg-white/10 blur-md"
      ></div>
      <div
        className="absolute bottom-1/3 right-0 w-16 h-16 rounded-full
        bg-slate-200/20 dark:bg-white/5 blur-md"
      ></div>

      <div className="p-4 sm:p-6 flex flex-col text-gray-800 dark:text-white relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-slate-200/50 dark:bg-white/20 backdrop-blur-sm">
            <PieChart className="h-5 w-5 text-gray-700 dark:text-white" />
          </div>
          <h3 className="text-lg font-semibold">Claim Distribution</h3>
        </div>

        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/3 h-48 sm:h-60 mb-6 lg:mb-0">
            {mounted && (
              <DoughnutChart
                data={chartData}
                isDarkMode={isDarkMode}
                centerText="Total Claims"
              />
            )}
          </div>

          <div className="w-full lg:w-2/3 lg:pl-6 lg:border-l lg:border-slate-200 lg:dark:border-white/10">
            <h4 className="text-lg mb-4 text-center lg:text-left">
              Status Breakdown
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {Object.keys(statusConfig)
                .filter((status) => status !== "Total")
                .map((status) => {
                  const config =
                    statusConfig[status as keyof typeof statusConfig];
                  const data = statusData[status];

                  return (
                    <div
                      key={status}
                      className="bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-lg p-3 shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`h-3 w-3 rounded-full ${config.dotColor}`}
                        ></div>
                        <h5 className="font-medium">{status}</h5>
                      </div>
                      <p className="text-xl font-bold">{data.count}</p>
                      <div className="flex justify-between mt-1 text-xs text-gray-600 dark:text-white/70">
                        <span>{data.percentage}% of total</span>
                        <span>{formatCurrency(data.amount)}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
