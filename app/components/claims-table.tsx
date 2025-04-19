
"use client";

import { useState, useMemo } from "react";
import { Claim, SortDirection, SortField } from "@/types/types";
import { ClaimsTableHeader } from "./claims-table/header";
import { ClaimsTableContent } from "./claims-table/content";
import { ClaimsTableSkeleton } from "./claims-table/skeleton";
import { ClaimsTableStatusIndicators } from "./claims-table/status-indicator";

interface ClaimsTableProps {
  claims: Claim[];
  isLoading: boolean;
}

export function ClaimsTable({ claims, isLoading }: ClaimsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("claim_date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedClaims = useMemo(() => {
    let filtered = [...claims];

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (claim) => claim.payment_status === statusFilter
      );
    }

    // Apply search filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (claim) =>
          claim.patient_name.toLowerCase().includes(lowercasedSearch) ||
          claim.patient_id.toLowerCase().includes(lowercasedSearch) ||
          claim.billing_code.toLowerCase().includes(lowercasedSearch) ||
          claim.insurance_provider.toLowerCase().includes(lowercasedSearch) ||
          claim.payment_status.toLowerCase().includes(lowercasedSearch)
      );
    }

    if (sortField) {
      filtered.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }

        if (sortField === "claim_date") {
          const dateA = new Date(a.claim_date);
          const dateB = new Date(b.claim_date);
          return sortDirection === "asc"
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        }

        return 0;
      });
    }

    return filtered;
  }, [claims, statusFilter, searchTerm, sortField, sortDirection]);

  const totalAmount = filteredAndSortedClaims.reduce(
    (sum, claim) => sum + claim.amount,
    0
  );
  const statusBreakdown = {
    Approved: filteredAndSortedClaims.filter(
      (claim) => claim.payment_status === "Approved"
    ).length,
    Pending: filteredAndSortedClaims.filter(
      (claim) => claim.payment_status === "Pending"
    ).length,
    Denied: filteredAndSortedClaims.filter(
      (claim) => claim.payment_status === "Denied"
    ).length,
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setSortField("claim_date");
    setSortDirection("desc");
    setMobileFiltersOpen(false);
  };

  if (isLoading) {
    return <ClaimsTableSkeleton />;
  }

  return (
    <div className="space-y-6">
      <ClaimsTableHeader
        totalAmount={totalAmount}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
        resetFilters={resetFilters}
        statusBreakdown={statusBreakdown}
        totalClaims={claims.length}
      />

      <ClaimsTableStatusIndicators statusBreakdown={statusBreakdown} />

      <ClaimsTableContent
        filteredAndSortedClaims={filteredAndSortedClaims}
        totalClaims={claims.length}
        statusBreakdown={statusBreakdown}
        sortField={sortField}
        sortDirection={sortDirection}
        handleSort={handleSort}
        resetFilters={resetFilters}
      />
    </div>
  );
}
