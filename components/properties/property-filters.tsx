"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

interface PropertyFiltersProps {
  initialFilters: {
    status?: string;
    minPrice?: number;
    maxPrice?: number;
    location?: string;
  };
}

export default function PropertyFilters({
  initialFilters,
}: PropertyFiltersProps) {
  const router = useRouter();
  const [filters, setFilters] = useState({
    status: initialFilters.status || "",
    minPrice: initialFilters.minPrice || 0,
    maxPrice: initialFilters.maxPrice || 1000000,
    location: initialFilters.location || "",
  });

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (filters.status) params.set("status", filters.status);
    if (filters.minPrice > 0)
      params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice < 1000000)
      params.set("maxPrice", filters.maxPrice.toString());
    if (filters.location) params.set("location", filters.location);

    router.push(`/properties?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setFilters({
      status: "",
      minPrice: 0,
      maxPrice: 1000000,
      location: "",
    });
    router.push("/properties");
  };

  return (
    <div className="space-y-6">
      {/* Status Filter */}
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={filters?.status}
          onValueChange={(value) => setFilters({ ...filters, status: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="PUBLISHED">Published</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <Label>Price Range</Label>
        <div className="space-y-2">
          <Slider
            min={0}
            max={1000000}
            step={10000}
            value={[filters.minPrice, filters.maxPrice]}
            onValueChange={([min, max]) =>
              setFilters({ ...filters, minPrice: min, maxPrice: max })
            }
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${filters.minPrice.toLocaleString()}</span>
            <span>${filters.maxPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          placeholder="City, State, or ZIP"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        <Button onClick={handleApplyFilters} className="w-full gap-2">
          <Search className="h-4 w-4" />
          Apply Filters
        </Button>

        <Button
          variant="outline"
          onClick={handleClearFilters}
          className="w-full gap-2"
        >
          <X className="h-4 w-4" />
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
