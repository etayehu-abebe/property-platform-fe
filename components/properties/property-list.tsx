"use client";

import { useProperties } from "@/hooks/use-properties";
import PropertyCard from "./property-card";
import { PropertyFilters } from "@/types/property";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyListProps {
  filters: PropertyFilters;
}

export default function PropertyList({ filters }: PropertyListProps) {
  const { data, isLoading, error } = useProperties(filters);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load properties</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!data?.properties.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          No properties found matching your criteria
        </p>
        <Button variant="outline" className="mt-4">
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Pagination */}
      {data.pagination.pages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <Button
            variant="outline"
            disabled={filters.page === 1}
            onClick={() => {
              const newParams = new URLSearchParams(window.location.search);
              newParams.set("page", (filters.page! - 1).toString());
              window.location.search = newParams.toString();
            }}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <span className="text-sm text-gray-600">
            Page {data.pagination.page} of {data.pagination.pages}
          </span>

          <Button
            variant="outline"
            disabled={filters.page === data.pagination.pages}
            onClick={() => {
              const newParams = new URLSearchParams(window.location.search);
              newParams.set("page", (filters.page! + 1).toString());
              window.location.search = newParams.toString();
            }}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </>
  );
}
