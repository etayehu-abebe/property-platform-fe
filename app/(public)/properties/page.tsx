import { Suspense } from "react";
import PropertyList from "@/components/properties/property-list";
import PropertyFilters from "@/components/properties/property-filters";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter } from "lucide-react";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await the searchParams Promise
  const params = await searchParams;

  // Extract filters from search params - USE params, not searchParams!
  const filters = {
    page: params?.page ? Number(params.page) : 1,
    limit: params?.limit ? Number(params.limit) : 10,
    status: params?.status as string | undefined,
    minPrice: params?.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params?.maxPrice ? Number(params.maxPrice) : undefined,
    location: params?.location as string | undefined,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Find Your Dream Property</h1>
          <p className="text-xl opacity-90">
            Browse through our curated selection of properties
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Filters</h2>
              </div>
              <PropertyFilters initialFilters={filters} />
            </div>
          </aside>

          <main className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Search className="h-6 w-6" />
                  Available Properties
                </h2>
                <p className="text-gray-600 mt-1">
                  Discover properties that match your criteria
                </p>
              </div>
            </div>

            <Suspense fallback={<PropertiesSkeleton />}>
              <PropertyList filters={filters} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}

function PropertiesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}
