"use client";

import { useState, useMemo } from "react";
import {
  Claim,
  SortDirection,
  SortField,
  StatusBreakdown,
} from "@/types/types";
import { ClaimsTableHeader } from "./claims-table/header";
import { ClaimsTableContent } from "./claims-table/content";
import { ClaimsTableStatusIndicators } from "./claims-table/status-indicator";

interface ClaimsTableProps {
  claims: Claim[];
}

export function ClaimsTable({ claims }: ClaimsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("claim_date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    // Reset to first page when sorting changes
    setCurrentPage(1);
  };

  const filteredAndSortedClaims = useMemo(() => {
    let filtered = [...claims];

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (claim) => claim.payment_status === statusFilter
      );
    }

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

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedClaims.length / itemsPerPage);

  // When filters change and there are no results on the current page, go back to page 1
  useMemo(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // Get current page data
  const paginatedClaims = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedClaims.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedClaims, currentPage, itemsPerPage]);

  const totalAmount = filteredAndSortedClaims.reduce(
    (sum, claim) => sum + claim.amount,
    0
  );

  const statusBreakdown: StatusBreakdown = {
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
    setCurrentPage(1); // Reset pagination when filters are reset
  };

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
        filteredAndSortedClaims={paginatedClaims}
        totalClaims={claims.length}
        statusBreakdown={statusBreakdown}
        sortField={sortField}
        sortDirection={sortDirection}
        handleSort={handleSort}
        resetFilters={resetFilters}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
