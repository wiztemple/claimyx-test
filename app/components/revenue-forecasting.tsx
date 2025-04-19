"use client";

import { useState, useEffect } from "react";
import {
  Claim,
  RevenueSimulationParams,
  SimulationResult,
} from "@/types/types";
import { useTheme } from "@/app/providers/theme-provider";
import { RevenueChart } from "./revenue-forecasting/revenue-chart";
import { SimulationLoading } from "./revenue-forecasting/simulation-loading";
import { SimulationStart } from "./revenue-forecasting/simulation-start";
import { Skeleton } from "@/app/components/ui/skeleton";
import { runMonteCarloSimulation } from "@/lib/simulation-utils";
import { RevenueSliders } from "./revenue-forecasting/revenue-sliders";
import { ResultCards } from "./revenue-forecasting/result-cards";

interface RevenueForecastingProps {
  claims: Claim[];
  isLoading: boolean;
}

export function RevenueForecasting({
  claims,
  isLoading,
}: RevenueForecastingProps) {
  const { isDarkMode } = useTheme();

  const [simulationParams, setSimulationParams] =
    useState<RevenueSimulationParams>({
      pendingProbability: 60,
      approvedProbability: 90,
      deniedProbability: 20,
    });

  const [simulationResult, setSimulationResult] =
    useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSliderChange = (
    type: keyof RevenueSimulationParams,
    value: number
  ) => {
    setSimulationParams((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const startSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      try {
        const result = runMonteCarloSimulation(claims, simulationParams);
        setSimulationResult(result);
      } catch (error) {
        console.error("Simulation error:", error);
      } finally {
        setIsSimulating(false);
      }
    }, 0);
  };

  useEffect(() => {
    if (claims.length > 0 && !isLoading) {
      const delayTimer = setTimeout(() => {
        setIsSimulating(true);

        setTimeout(() => {
          try {
            const result = runMonteCarloSimulation(claims, simulationParams);
            setSimulationResult(result);
          } catch (error) {
            console.error("Simulation error:", error);
          } finally {
            setIsSimulating(false);
          }
        }, 0);
      }, 300);

      return () => clearTimeout(delayTimer);
    }
  }, [claims, simulationParams, isLoading]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </div>
        <Skeleton className="h-72 w-full rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-28 w-full rounded-xl" />
          <Skeleton className="h-28 w-full rounded-xl" />
          <Skeleton className="h-28 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <RevenueSliders
        simulationParams={simulationParams}
        onSliderChange={handleSliderChange}
      />

      {isSimulating ? (
        <SimulationLoading />
      ) : simulationResult ? (
        <RevenueChart
          simulationResult={simulationResult}
          isDarkMode={isDarkMode}
        />
      ) : (
        <SimulationStart onStart={startSimulation} />
      )}

      {simulationResult && <ResultCards simulationResult={simulationResult} />}
    </div>
  );
}
