import api  from '@/lib/api'
import { Property } from '@/types/property'

export interface FavoriteResponse {
  success: boolean
  message: string
  data?: any
}

// Get user's favorites
export const getFavorites = async (): Promise<Property[]> => {
  const response = await api.get('/favorites')
  return response.data.data || []
}

// Add property to favorites
export const addToFavorites = async (propertyId: string): Promise<FavoriteResponse> => {
  const response = await api.post(`/favorites/${propertyId}`)
  return response.data
}

// Remove property from favorites
export const removeFromFavorites = async (propertyId: string): Promise<FavoriteResponse> => {
  const response = await api.delete(`/favorites/${propertyId}`)
  return response.data
}

// Check if property is favorite
export const checkIsFavorite = async (propertyId: string): Promise<boolean> => {
  try {
    const response = await api.get(`/favorites/check/${propertyId}`)
    return response.data.isFavorite || false
  } catch (error) {
    return false
  }
}