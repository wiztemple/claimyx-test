"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { SimulationResult } from "@/types/types";
import {
  TrendingUp,
  ArrowUp,
  DollarSign,
  ArrowRight,
  BarChart3,
  Hash,
} from "lucide-react";

interface ResultCardsProps {
  simulationResult: SimulationResult;
}

export function ResultCards({ simulationResult }: ResultCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <Card className="rounded-xl sm:h-[180px] shadow-none overflow-hidden bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700">
        <CardContent className="py-3 px-5">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Expected Revenue
                </p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                  {formatCurrency(simulationResult.expectedRevenue)}
                </p>
              </div>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-1 rounded-md">
              <ArrowRight className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1">
              <Hash className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
              Average of all 2,000 simulation runs
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl sm:h-[180px] shadow-none overflow-hidden bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700">
        <CardContent className="py-3 px-5">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                <ArrowUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Best Case (95th)
                </p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                  {formatCurrency(simulationResult.percentiles[6])}
                </p>
              </div>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/30 p-1 rounded-md">
              <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1">
              <Hash className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
              Only 5% of outcomes exceed this value
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl sm:h-[180px] shadow-none overflow-hidden bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700">
        <CardContent className="py-3 px-5">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Median Revenue
                </p>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                  {formatCurrency(simulationResult.percentiles[3])}
                </p>
              </div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/30 p-1 rounded-md">
              <Hash className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1">
              <Hash className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
              Middle value (50th percentile) of outcomes
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
