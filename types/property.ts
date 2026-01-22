export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  images: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  publishedAt: string | null;
  ownerId: string;
  organizationId: string | null;
  owner: {
    id: string;
    name: string | null;
    email: string;
  };
}

export interface PropertyFilters {
  page?: number;
  limit?: number;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  // viewMode if you want separate views
  viewMode?: 'all' | 'my' | 'published' | 'drafts'
}

export interface PaginatedResponse {
  properties: Property[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Add to your existing property types
export interface OwnerPropertyFilters {
  ownerId?: string
  page?: number
  limit?: number
  status?: string
  minPrice?: number
  maxPrice?: number
  search?: string
}

export interface OwnerPropertiesResponse {
  success: boolean
  data: Property[]
  owner?: {
    id: string
    name: string
    email: string
  }
  pagination?: {
    total: number
    page: number
    limit: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
  count?: number
}

export type PropertyStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
