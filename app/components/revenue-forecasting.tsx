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
import { runMonteCarloSimulation } from "@/lib/simulation-utils";
import { RevenueSliders } from "./revenue-forecasting/revenue-sliders";
import { ResultCards } from "./revenue-forecasting/result-cards";

interface RevenueForecastingProps {
  claims: Claim[];
}

export function RevenueForecasting({ claims }: RevenueForecastingProps) {
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
    if (claims.length > 0 && !isSimulating) {
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
  }, [claims, simulationParams]);

  return (
    <div className="space-y-6">
      <RevenueSliders
        simulationParams={simulationParams}
        onSliderChange={handleSliderChange}
      />

{simulationResult && <ResultCards simulationResult={simulationResult} />}

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

     
    </div>
  );
}
