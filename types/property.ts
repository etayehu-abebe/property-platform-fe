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
