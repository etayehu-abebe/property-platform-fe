"use client";

import PropertyCard from "@/components/properties/property-card";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { Heart, Home, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites, isLoading, isError } = useFavorites();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Error Loading Favorites
        </h3>
        <p className="text-red-600 mb-4">
          There was a problem loading your favorite properties.
        </p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="rounded-lg bg-gray-50 p-8 text-center">
        <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No favorites yet
        </h3>
        <p className="text-gray-600 mb-6">
          Properties you add to favorites will appear here.
        </p>
        <Link href="/properties">
          <Button className="gap-2">
            <Home className="h-4 w-4" />
            Browse Properties
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Favorites</h1>
            <p className="text-gray-600">
              {favorites.length} propert{favorites.length === 1 ? "y" : "ies"}{" "}
              saved
            </p>
          </div>
          <Link href="/properties">
            <Button variant="outline" className="gap-2">
              <Home className="h-4 w-4" />
              Browse More
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
