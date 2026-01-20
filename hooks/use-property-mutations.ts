import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Property } from "@/types/property";

interface CreatePropertyData {
  title: string;
  description: string;
  location: string;
  price: number;
  images: string[];
  status?: "DRAFT" | "PUBLISHED";
}

export const usePropertyMutations = () => {
  const queryClient = useQueryClient();

  const createPropertyMutation = useMutation({
    mutationFn: async (data: CreatePropertyData) => {
      const response = await api.post<Property>("/api/properties", data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate properties query to refetch
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });

  const publishPropertyMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.patch<Property>(
        `/api/properties/${id}/publish`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });

  return {
    createProperty: createPropertyMutation.mutateAsync,
    createIsLoading: createPropertyMutation.isPending,
    createError: createPropertyMutation.error?.message,
    createIsSuccess: createPropertyMutation.isSuccess,

    publishProperty: publishPropertyMutation.mutateAsync,
    publishIsLoading: publishPropertyMutation.isPending,
    publishError: publishPropertyMutation.error?.message,
    publishIsSuccess: publishPropertyMutation.isSuccess,
  };
};
