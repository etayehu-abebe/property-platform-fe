import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Property, PropertyFilters, PaginatedResponse } from "@/types/property";

export const useProperties = (filters?: PropertyFilters) => {
  return useQuery({
    queryKey: ["properties", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      // Convert filters to backend expected format
      if (filters?.page) params.append("page", filters.page.toString());
      if (filters?.limit) params.append("limit", filters.limit.toString());
      if (filters?.status) params.append("status", filters.status);
      if (filters?.minPrice)
        params.append("minPrice", filters.minPrice.toString());
      if (filters?.maxPrice)
        params.append("maxPrice", filters.maxPrice.toString());
      if (filters?.location) params.append("location", filters.location);

      try {
        const response = await api.get<PaginatedResponse>(
          `/api/properties?${params}`,
        );

        return response.data;
      } catch (error) {
        console.error("API Error:", error);
        throw error;
      }
    },
  });
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const response = await api.get<Property>(`/api/properties/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};
