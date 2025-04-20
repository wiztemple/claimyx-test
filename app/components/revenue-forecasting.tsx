"use client";

import { useState, useEffect, useRef } from "react";
import {
  Claim,
  RevenueSimulationParams,
  SimulationResult,
} from "@/types/types";
import { useTheme } from "@/app/providers/theme-provider";
import { RevenueChart } from "./revenue-forecasting/revenue-chart";
import { SimulationStart } from "./revenue-forecasting/simulation-start";
import { RevenueSliders } from "./revenue-forecasting/revenue-sliders";
import { ResultCards } from "./revenue-forecasting/result-cards";
import { runChunkedSimulation } from "@/lib/chunked-simulation";

interface RevenueForecastingProps {
  claims: Claim[];
}

export function RevenueForecasting({ claims }: RevenueForecastingProps) {
  const { isDarkMode } = useTheme();
  
  // For progress tracking
  const [progress, setProgress] = useState<number>(0);
  
  const [simulationParams, setSimulationParams] =
    useState<RevenueSimulationParams>({
      pendingProbability: 60,
      approvedProbability: 90,
      deniedProbability: 20,
    });

  const [simulationResult, setSimulationResult] =
    useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationError, setSimulationError] = useState<string | null>(null);
  
  // Use this to cancel ongoing simulations
  const currentSimulationRef = useRef<number>(0);

  const handleSliderChange = (
    type: keyof RevenueSimulationParams,
    value: number
  ) => {
    setSimulationParams((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const runSimulation = async (
    claimsData: Claim[],
    params: RevenueSimulationParams,
    simulationId: number
  ) => {
    if (claimsData.length === 0) return;
    
    try {
      setSimulationError(null);
      setProgress(0);
      
      // Run the chunked simulation
      const result = await runChunkedSimulation(claimsData, params, {
        iterations: 2000,
        chunkSize: 200,
        onProgress: (progressData) => {
          // Only update progress for the current simulation
          if (simulationId === currentSimulationRef.current) {
            setProgress(progressData.percent);
          }
        }
      });
      
      // Only update state if this is still the current simulation
      if (simulationId === currentSimulationRef.current) {
        setSimulationResult(result);
      }
    } catch (error) {
      console.error("Simulation error:", error);
      if (simulationId === currentSimulationRef.current) {
        setSimulationError(
          error instanceof Error ? error.message : "Unknown simulation error"
        );
      }
    } finally {
      if (simulationId === currentSimulationRef.current) {
        setIsSimulating(false);
      }
    }
  };

  const startSimulation = () => {
    if (claims.length === 0) return;
    
    setIsSimulating(true);
    const simulationId = Date.now();
    currentSimulationRef.current = simulationId;
    runSimulation(claims, simulationParams, simulationId);
  };

  // Run simulation when params change
  useEffect(() => {
    if (claims.length > 0) {
      const delayTimer = setTimeout(() => {
        setIsSimulating(true);
        const simulationId = Date.now();
        currentSimulationRef.current = simulationId;
        runSimulation(claims, simulationParams, simulationId);
      }, 300);
      
      return () => clearTimeout(delayTimer);
    }
  }, [claims, simulationParams]);

  // Create a modified loading component that shows progress
  const LoadingWithProgress = () => (
    <div className="h-72 w-full bg-slate-50 dark:bg-slate-900 p-6 rounded-xl shadow-none border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
        <div className="text-center">
          <p className="text-lg font-medium text-slate-800 dark:text-slate-200">
            Running Monte Carlo simulation...
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Calculating 2,000 possible outcomes
          </p>
        </div>
        
        {/* Progress bar */}
        <div className="w-full max-w-md h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {progress}% complete
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <RevenueSliders
        simulationParams={simulationParams}
        onSliderChange={handleSliderChange}
      />

      {simulationResult && <ResultCards simulationResult={simulationResult} />}

      {simulationError && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300">
          Error: {simulationError}
        </div>
      )}

      {isSimulating ? (
        <LoadingWithProgress />
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