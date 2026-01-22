'use client'

import { useQuery } from '@tanstack/react-query'
import { OwnerPropertiesResponse, OwnerPropertyFilters } from '@/types/property'
import { getPropertiesByOwner } from '@/lib/api/properties'
import { useAuthStore } from '@/lib/store/auth-store'

export const useOwnerProperties = (filters?: OwnerPropertyFilters) => {
  const { user } = useAuthStore()

  // Determine if we should fetch
  const shouldFetch = user && (user.role === 'OWNER' || user.role === 'ADMIN')

  return useQuery<OwnerPropertiesResponse, Error>({
    queryKey: ['owner-properties', filters, user?.id],
    queryFn: async () => {
      try {
        // If no ownerId specified and user is OWNER, use 'current'
        // If user is ADMIN and no ownerId, maybe don't fetch or show error
        const ownerFilters = {
          ...filters,
          ownerId: filters?.ownerId || (user?.role === 'OWNER' ? 'current' : undefined)
        }

        return await getPropertiesByOwner(ownerFilters)
      } catch (error) {
        console.error('Error fetching owner properties:', error)
        throw error
      }
    },
    enabled: shouldFetch,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Simplified hook for current owner's properties
export const useMyProperties = (filters?: Omit<OwnerPropertyFilters, 'ownerId'>) => {
  const { user } = useAuthStore()

  return useQuery({
    queryKey: ['my-properties', filters, user?.id],
    queryFn: async () => {
      if (!user || user.role !== 'OWNER') {
        throw new Error('Owner access required')
      }

      const response = await getPropertiesByOwner({
        ...filters,
        ownerId: 'current',
      })
      return response
    },
    enabled: !!user && user.role === 'OWNER',
  })
}