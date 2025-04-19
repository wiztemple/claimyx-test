"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { ChevronUp, ChevronDown, ChevronsUpDown, Calendar } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ClaimsTableContentProps, SortField } from "@/types/types";
import { getStatusConfig } from "@/lib/claims-utils";
import { TableEmptyState } from "./empty-state";
import { TableFooter } from "./footer";

export function ClaimsTableContent({
  filteredAndSortedClaims,
  totalClaims,
  statusBreakdown,
  sortField,
  sortDirection,
  handleSort,
  resetFilters,
}: ClaimsTableContentProps) {
  const getSortIcon = (field: SortField) => {
    if (sortField !== field)
      return <ChevronsUpDown className="h-4 w-4 opacity-50" />;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
    ) : (
      <ChevronDown className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
    );
  };

  return (
    <>
      <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-900">
              <TableRow className="border-b border-slate-200 dark:border-slate-800 hover:bg-transparent">
                <TableHead className="py-3 min-w-[80px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("patient_id")}
                    className="font-semibold !px-0 hover:!bg-transparent flex items-center justify-start text-slate-800 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    ID {getSortIcon("patient_id")}
                  </Button>
                </TableHead>
                <TableHead className="py-3 min-w-[150px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("patient_name")}
                    className="font-semibold !px-0 hover:!bg-transparent flex items-center justify-start text-slate-800 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Patient {getSortIcon("patient_name")}
                  </Button>
                </TableHead>
                <TableHead className="py-3 min-w-[100px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("billing_code")}
                    className="font-semibold flex items-center justify-start text-slate-800 !px-0 hover:!bg-transparent dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Code {getSortIcon("billing_code")}
                  </Button>
                </TableHead>
                <TableHead className="py-3 min-w-[120px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("amount")}
                    className="font-semibold !px-0 hover:!bg-transparent flex items-center justify-start text-slate-800 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Amount {getSortIcon("amount")}
                  </Button>
                </TableHead>
                <TableHead className="py-3 min-w-[150px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("insurance_provider")}
                    className="font-semibold !px-0 hover:!bg-transparent flex items-center justify-start text-slate-800 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Insurance {getSortIcon("insurance_provider")}
                  </Button>
                </TableHead>
                <TableHead className="py-3 min-w-[120px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("payment_status")}
                    className="font-semibold !px-0 hover:!bg-transparent flex items-center justify-start text-slate-800 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Status {getSortIcon("payment_status")}
                  </Button>
                </TableHead>
                <TableHead className="py-3 min-w-[120px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("claim_date")}
                    className="font-semibold !px-0 hover:!bg-transparent flex items-center justify-start text-slate-800 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Date {getSortIcon("claim_date")}
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedClaims.length === 0 ? (
                <TableEmptyState resetFilters={resetFilters} />
              ) : (
                filteredAndSortedClaims.map((claim, index) => {
                  const statusConfig = getStatusConfig(claim.payment_status);

                  return (
                    <TableRow
                      key={claim.patient_id}
                      className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800 ${
                        index % 2 === 0
                          ? "bg-white dark:bg-slate-900/20"
                          : "bg-white dark:bg-transparent"
                      }`}
                    >
                      <TableCell className="font-medium py-3 text-slate-700 dark:text-slate-300">
                        <span className="inline-flex bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs">
                          {claim.patient_id}
                        </span>
                      </TableCell>
                      <TableCell className="py-3 font-medium text-slate-900 dark:text-slate-200">
                        {claim.patient_name}
                      </TableCell>
                      <TableCell className="py-3">
                        <span className="px-2 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 rounded text-xs font-mono">
                          {claim.billing_code}
                        </span>
                      </TableCell>
                      <TableCell className="font-semibold py-3 text-slate-900 dark:text-slate-200">
                        {formatCurrency(claim.amount)}
                      </TableCell>
                      <TableCell className="py-3 text-slate-800 dark:text-slate-300">
                        {claim.insurance_provider}
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${statusConfig.bgClass}`}
                          >
                            <span className={statusConfig.iconClass}>
                              {statusConfig.icon}
                            </span>
                            {claim.payment_status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(claim.claim_date)}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        <TableFooter
          filteredClaimsCount={filteredAndSortedClaims.length}
          totalClaimsCount={totalClaims}
          statusBreakdown={statusBreakdown}
        />
      </div>

      {/* Mobile scroll hint */}
      <div className="md:hidden text-xs text-center text-slate-500 dark:text-slate-400">
        <p>Swipe horizontally to see more data</p>
      </div>
    </>
  );
}
