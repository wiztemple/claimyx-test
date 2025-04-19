"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { TableCell, TableRow } from "@/app/components/ui/table";

interface TableEmptyStateProps {
  resetFilters: () => void;
}

export function TableEmptyState({ resetFilters }: TableEmptyStateProps) {
  return (
    <TableRow>
      <TableCell colSpan={7} className="h-32 text-center">
        <div className="flex flex-col items-center justify-center space-y-2 py-8">
          <div className="rounded-full p-3 bg-slate-100 dark:bg-slate-800">
            <AlertCircle className="h-8 w-8 text-slate-500 dark:text-slate-400" />
          </div>
          <p className="text-lg font-medium text-slate-800 dark:text-slate-200">
            No claims found
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Try adjusting your search or filter
          </p>
          <Button
            variant="outline"
            className="mt-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
            onClick={resetFilters}
          >
            Reset filters
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
