"use client";

import { Button } from "@/app/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { StatusBreakdown } from "@/types/types";

interface TableFooterProps {
  filteredClaimsCount: number;
  totalClaimsCount: number;
  statusBreakdown: StatusBreakdown;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function TableFooter({
  filteredClaimsCount,
  totalClaimsCount,
  statusBreakdown,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
}: TableFooterProps) {
  // Calculate the range of items being displayed
  const startItem =
    filteredClaimsCount > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, filteredClaimsCount);

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const maxVisiblePages = 3; // Limited space, showing fewer pages
    const pageNumbers = [];

    if (totalPages <= maxVisiblePages) {
      // Show all pages if there are fewer than maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include current page
      if (currentPage > 1) {
        pageNumbers.push(currentPage - 1);
      }

      pageNumbers.push(currentPage);

      if (currentPage < totalPages) {
        pageNumbers.push(currentPage + 1);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="py-4 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm text-slate-600 dark:text-slate-400">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <div>
            {filteredClaimsCount > 0 ? (
              <>
                Showing{" "}
                <span className="font-medium text-slate-900 dark:text-slate-200">
                  {startItem}-{endItem}
                </span>{" "}
                of{" "}
                <span className="font-medium text-slate-900 dark:text-slate-200">
                  {filteredClaimsCount}
                </span>{" "}
                {filteredClaimsCount !== totalClaimsCount && (
                  <>
                    (from{" "}
                    <span className="font-medium text-slate-900 dark:text-slate-200">
                      {totalClaimsCount}
                    </span>{" "}
                    total)
                  </>
                )}
              </>
            ) : (
              <>
                <span className="font-medium text-slate-900 dark:text-slate-200">
                  0
                </span>{" "}
                claims found
              </>
            )}
          </div>
          {/* Pagination controls - only show if we have multiple pages */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1 mt-2 sm:mt-0 sm:ml-4">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 rounded-md bg-slate-200 dark:bg-gray-800 border-0 hover:bg-slate-300 dark:hover:bg-gray-700"
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
              >
                <span className="sr-only">First Page</span>
                <ChevronsLeft className="h-3.5 w-3.5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 rounded-md bg-slate-200 dark:bg-gray-800 border-0 hover:bg-slate-300 dark:hover:bg-gray-700"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <span className="sr-only">Previous Page</span>
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>

              <div className="flex gap-1 items-center">
                {pageNumbers.map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    className={`h-7 w-7 p-0 border-0 ${
                      currentPage === page
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : "text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-gray-800 hover:bg-slate-300 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 rounded-md bg-slate-200 dark:bg-gray-800 border-0 hover:bg-slate-300 dark:hover:bg-gray-700"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <span className="sr-only">Next Page</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 rounded-md bg-slate-200 dark:bg-gray-800 border-0 hover:bg-slate-300 dark:hover:bg-gray-700"
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                <span className="sr-only">Last Page</span>
                <ChevronsRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
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
    </div>
  );
}
