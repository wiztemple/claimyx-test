"use client";

import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Search, Filter, FileText, RefreshCw, Menu, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { ClaimsTableHeaderProps } from "@/types/types";

export function ClaimsTableHeader({
  totalAmount,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  mobileFiltersOpen,
  setMobileFiltersOpen,
  resetFilters,
  statusBreakdown,
  totalClaims,
}: ClaimsTableHeaderProps) {
  return (
    <div className="bg-slate-50 dark:bg-gradient-to-r dark:from-gray-900 dark:to-slate-800 rounded-tl-xl rounded-tr-xl p-5 -mx-6 -mt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Claims Management
          </h2>
          <p className="text-slate-600 dark:text-white/80 mt-1">
            Track and manage patient billing claims
          </p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 dark:bg-white/10 text-indigo-700 dark:text-white/90 px-3 py-1.5 rounded-lg mt-2 md:mt-0 border border-indigo-100 dark:border-transparent w-full md:w-auto justify-center md:justify-start">
          <FileText className="h-4 w-4 text-indigo-500 dark:text-white/80" />
          <span className="text-sm font-medium">
            Total: {formatCurrency(totalAmount)}
          </span>
        </div>
      </div>
      <div className="md:hidden mt-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 bg-white dark:bg-white/10 border-slate-200 dark:border-white/20 text-slate-700 dark:text-white"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
        >
          <Filter className="h-4 w-4" />
          <span>{mobileFiltersOpen ? "Hide Filters" : "Show Filters"}</span>
          {mobileFiltersOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div
        className={`mt-4 ${
          mobileFiltersOpen ? "flex" : "hidden md:flex"
        } flex-col md:flex-row items-center justify-between gap-4`}
      >
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500 dark:text-white/70" />
          <Input
            placeholder="Search claims..."
            className="pl-9 rounded-full h-10 bg-white dark:bg-white/20 border-slate-200 dark:border-white/30 text-slate-700 dark:text-white placeholder:text-slate-500 dark:placeholder:text-white/70 focus-visible:ring-2 focus-visible:ring-indigo-200 dark:focus-visible:ring-white/50 focus-visible:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 items-center w-full md:w-auto mt-2 md:mt-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-slate-100 dark:bg-white/10 border-slate-200 dark:border-white/30 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/20"
            onClick={resetFilters}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48 h-10 rounded-full bg-white dark:bg-white/10 border-slate-200 dark:border-white/30 text-slate-700 dark:text-white focus:ring-indigo-200 dark:focus:ring-white/50">
              <Filter className="h-4 w-4 mr-2 text-slate-500 dark:text-white/70" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
              <SelectItem
                value="all"
                className="text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 focus:bg-slate-100 dark:focus:bg-slate-700"
              >
                All Claims ({totalClaims})
              </SelectItem>
              <SelectItem
                value="Pending"
                className="text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 focus:bg-slate-100 dark:focus:bg-slate-700"
              >
                Pending Only ({statusBreakdown.Pending})
              </SelectItem>
              <SelectItem
                value="Approved"
                className="text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 focus:bg-slate-100 dark:focus:bg-slate-700"
              >
                Approved Only ({statusBreakdown.Approved})
              </SelectItem>
              <SelectItem
                value="Denied"
                className="text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 focus:bg-slate-100 dark:focus:bg-slate-700"
              >
                Denied Only ({statusBreakdown.Denied})
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
