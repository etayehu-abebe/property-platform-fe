'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  checkIsFavorite,
} from '@/lib/api/favorites'

export function useFavorites() {
  const queryClient = useQueryClient()

  // Get user's favorites
  const favoritesQuery = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    enabled: true, // Only fetch if user is logged in
  })

  // Add to favorites mutation
  const addFavoriteMutation = useMutation({
    mutationFn: addToFavorites,
    onSuccess: () => {
      // Invalidate favorites query
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      // Invalidate property details if needed
      queryClient.invalidateQueries({ queryKey: ['property'] })
    },
  })

  // Remove from favorites mutation
  const removeFavoriteMutation = useMutation({
    mutationFn: removeFromFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      queryClient.invalidateQueries({ queryKey: ['property'] })
    },
  })

  // Check if property is favorite
  const checkFavoriteMutation = useMutation({
    mutationFn: checkIsFavorite,
  })

  // Toggle favorite status
  const toggleFavorite = async (propertyId: string, isCurrentlyFavorite: boolean) => {
    if (isCurrentlyFavorite) {
      await removeFavoriteMutation.mutateAsync(propertyId)
    } else {
      await addFavoriteMutation.mutateAsync(propertyId)
    }
  }

  return {
    // Queries
    favorites: favoritesQuery.data || [],
    isLoading: favoritesQuery.isLoading,
    isError: favoritesQuery.isError,
    
    // Mutations
    addToFavorites: addFavoriteMutation.mutate,
    removeFromFavorites: removeFavoriteMutation.mutate,
    checkIsFavorite: checkFavoriteMutation.mutate,
    toggleFavorite,
    
    // Mutation states
    isAdding: addFavoriteMutation.isPending,
    isRemoving: removeFavoriteMutation.isPending,
    isChecking: checkFavoriteMutation.isPending,
  }
}