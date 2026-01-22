import api from '@/lib/api'
import { OwnerPropertiesResponse, OwnerPropertyFilters } from '@/types/property'

// Add to existing property API functions
export const getPropertiesByOwner = async (
  filters?: OwnerPropertyFilters
): Promise<OwnerPropertiesResponse> => {
  const params = new URLSearchParams()

  // Build query parameters (EXCLUDE ownerId from params)
  if (filters?.page) params.append('page', filters.page.toString())
  if (filters?.limit) params.append('limit', filters.limit.toString())
  if (filters?.status) params.append('status', filters.status)
  if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString())
  if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString())
  if (filters?.search) params.append('search', filters.search)

  // Choose the right endpoint
  let endpoint = '/api/properties/owner/my-properties'
  
  // Only use specific owner endpoint if ownerId is provided AND it's not 'current'
  if (filters?.ownerId && filters.ownerId !== 'current') {
    endpoint = `/api/properties/owner/${filters.ownerId}`
  }

  const queryString = params.toString()
  const url = `${endpoint}${queryString ? `?${queryString}` : ''}`

  console.log('Fetching owner properties from:', url) // Debug log
  
  const response = await api.get<OwnerPropertiesResponse>(url)
  return response.data
}