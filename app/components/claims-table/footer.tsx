"use client";

import { StatusBreakdown } from "@/types/types";

interface TableFooterProps {
  filteredClaimsCount: number;
  totalClaimsCount: number;
  statusBreakdown: StatusBreakdown;
}

export function TableFooter({
  filteredClaimsCount,
  totalClaimsCount,
  statusBreakdown,
}: TableFooterProps) {
  return (
    <div className="py-4 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm text-slate-600 dark:text-slate-400 flex items-center justify-between">
      <div>
        Showing{" "}
        <span className="font-medium text-slate-900 dark:text-slate-200">
          {filteredClaimsCount}
        </span>{" "}
        of{" "}
        <span className="font-medium text-slate-900 dark:text-slate-200">
          {totalClaimsCount}
        </span>{" "}
        total claims
      </div>

      <div className="hidden md:flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-amber-500"></div>
          <span>Pending: {statusBreakdown.Pending}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span>Approved: {statusBreakdown.Approved}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-red-500"></div>
          <span>Denied: {statusBreakdown.Denied}</span>
        </div>
      </div>
    </div>
  );
}
