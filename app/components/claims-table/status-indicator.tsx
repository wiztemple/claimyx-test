"use client";

import { ClaimsTableStatusIndicatorsProps } from "@/types/types";

export function ClaimsTableStatusIndicators({
  statusBreakdown,
}: ClaimsTableStatusIndicatorsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
      <div className="flex items-center gap-1.5 bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 px-3 py-1.5 rounded-full">
        <div className="h-2 w-2 rounded-full bg-amber-500"></div>
        <span className="text-xs">Pending: {statusBreakdown.Pending}</span>
      </div>
      <div className="flex items-center gap-1.5 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-3 py-1.5 rounded-full">
        <div className="h-2 w-2 rounded-full bg-green-500"></div>
        <span className="text-xs">Approved: {statusBreakdown.Approved}</span>
      </div>
      <div className="flex items-center gap-1.5 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 px-3 py-1.5 rounded-full">
        <div className="h-2 w-2 rounded-full bg-red-500"></div>
        <span className="text-xs">Denied: {statusBreakdown.Denied}</span>
      </div>
    </div>
  );
}
