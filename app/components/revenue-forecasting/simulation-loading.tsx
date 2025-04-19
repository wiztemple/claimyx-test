"use client";

export function SimulationLoading() {
  return (
    <div className="h-72 flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400">
          Running Monte Carlo simulation...
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Calculating 2,000 possible outcomes
        </p>
      </div>
    </div>
  );
}
