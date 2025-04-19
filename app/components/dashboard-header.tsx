"use client";

import { ThemeToggle } from "@/app/components/ui/theme-toggle";
import { BarChart3, Activity } from "lucide-react";
import { useEffect, useState } from "react";

export function DashboardHeader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-5 mb-6 border-b border-b-gray-200 dark:border-b-gray-800">
      <div className="flex items-center space-x-3">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-slate-100 to-white shadow-sm border border-slate-200 text-indigo-600 dark:bg-gradient-to-br dark:from-indigo-500 dark:to-purple-600 dark:text-white dark:shadow-md dark:border-transparent">
          <BarChart3 className="h-6 w-6" />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            <span className="text-gray-800 dark:bg-gradient-to-r dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 dark:bg-clip-text dark:text-transparent">
              Healthcare Billing Dashboard
            </span>
          </h1>
          <div className="flex items-center mt-1 space-x-1.5">
            <Activity className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
              Real-time claims monitoring and revenue forecasting
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3 mt-4 sm:mt-0">
        <div className="hidden md:flex items-center h-9 rounded-md border px-3 py-1 bg-white border-gray-200 text-gray-600 shadow-sm dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400">
          <span className="text-xs font-medium mr-1.5">Last updated:</span>
          <span className="text-xs">
            {mounted &&
              new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
          </span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
