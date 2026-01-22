'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Plus, Home, Edit, Eye} from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { useMyProperties } from '@/hooks/use-owner-properties'
import PropertyCard from '@/components/properties/property-card'
import { PropertyStatus } from '@/types/property'

export default function OwnerPropertiesPage() {
  const { data, isLoading, error, refetch } = useMyProperties()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your properties...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Properties</h3>
        <p className="text-red-600 mb-4">{error.message}</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    )
  }

  const properties = data?.data || []
  const published = properties.filter(p => p.status === 'PUBLISHED')
  const drafts = properties.filter(p => p.status === 'DRAFT')
  const archived = properties.filter(p => p.status === 'ARCHIVED')

  const getStatusBadge = (status: PropertyStatus) => {
    const variants = {
      DRAFT: { label: 'Draft', variant: 'secondary' as const },
      PUBLISHED: { label: 'Published', variant: 'default' as const },
      ARCHIVED: { label: 'Archived', variant: 'outline' as const },
    }
    return variants[status]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Properties</h1>
          <p className="text-gray-600">
            Manage your property listings
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/properties">
            <Button variant="outline" className="gap-2">
              <Home className="h-4 w-4" />
              Browse Public
            </Button>
          </Link>
          <Link href="/dashboard/owner/properties/create">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Property
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Properties</p>
              <p className="text-2xl font-bold">{properties.length}</p>
            </div>
            <Home className="h-8 w-8 text-gray-400" />
          </div>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Published</p>
              <p className="text-2xl font-bold text-green-600">{published.length}</p>
            </div>
            <Eye className="h-8 w-8 text-green-400" />
          </div>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-amber-600">{drafts.length}</p>
            </div>
            <Edit className="h-8 w-8 text-amber-400" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="all">
            All <Badge variant="secondary" className="ml-2">{properties.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="published">
            Published <Badge className="ml-2">{published.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="drafts">
            Drafts <Badge variant="secondary" className="ml-2">{drafts.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="archived">
            Archived <Badge variant="outline" className="ml-2">{archived.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {properties.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
              <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No properties yet</h3>
              <p className="text-gray-600 mb-6">Start by adding your first property listing</p>
              <Link href="/dashboard/owner/properties/create">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add First Property
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map(property => {
                const badge = getStatusBadge(property.status)
                return (
                  <div key={property.id} className="relative group">
                    <PropertyCard property={property} />
                    <div className="absolute top-3 left-3">
                      <Badge variant={badge.variant}>{badge.label}</Badge>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/dashboard/owner/properties/edit/${property.id}`}>
                        <Button size="sm" variant="secondary" className="gap-1">
                          <Edit className="h-3 w-3" />
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="published">
          {published.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No published properties yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {published.map(property => (
                <div key={property.id} className="relative">
                  <PropertyCard property={property} />
                  <div className="absolute top-3 left-3">
                    <Badge>Published</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="drafts">
          {drafts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No draft properties</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {drafts.map(property => (
                <div key={property.id} className="relative">
                  <PropertyCard property={property} />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary">Draft</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="archived">
          {archived.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No archived properties</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {archived.map(property => (
                <div key={property.id} className="relative">
                  <PropertyCard property={property} />
                  <div className="absolute top-3 left-3">
                    <Badge variant="outline">Archived</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}