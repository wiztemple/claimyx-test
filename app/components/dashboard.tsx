"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { DashboardHeader } from "@/app/components/dashboard-header";
import { DashboardSummary } from "@/app/components/dashboard-summary";
import { ClaimsTable } from "@/app/components/claims-table";
import { RevenueForecasting } from "@/app/components/revenue-forecasting";
import { Claim } from "@/types/types";

interface DashboardProps {
  claims: Claim[];
}

export function Dashboard({ claims }: DashboardProps) {
  return (
    <div className="w-full space-y-6 sm:px-0 px-4 bg-white dark:bg-slate-900">
      <div className="container mx-auto bg-white dark:bg-slate-900 pb-10 sm:pb-20">
        <DashboardHeader />

        <div className="">
          <DashboardSummary claims={claims} />
        </div>

        <Card className="border border-gray-200 shadow-none dark:border-gray-800 bg-white dark:bg-gray-900">
          <CardContent>
            <ClaimsTable claims={claims} />
          </CardContent>
        </Card>

        <Card className="shadow-none border mt-5 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-800 dark:text-gray-200">
              Revenue Forecasting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueForecasting claims={claims} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
