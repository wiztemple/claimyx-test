"use client";

import { useEffect, useState } from "react";
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
import { fetchClaims } from "@/lib/server";

export function Dashboard() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadClaims() {
      try {
        setIsLoading(true);
        const data = await fetchClaims();
        setClaims(data);
      } catch (error) {
        console.error("Failed to fetch claims", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadClaims();
  }, []);

  return (
    <div className="container mx-auto space-y-6">
      <DashboardHeader />

      <div className="">
        <DashboardSummary claims={claims} isLoading={isLoading} />
      </div>

      <Card className="border border-gray-200 shadow-none dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <CardContent>
          <ClaimsTable claims={claims} isLoading={isLoading} />
        </CardContent>
      </Card>

      <Card className="shadow-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <CardHeader className="pb-2">
          <CardTitle className="text-gray-800 dark:text-gray-200">Revenue Forecasting</CardTitle>
        </CardHeader>
        <CardContent>
          <RevenueForecasting claims={claims} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}