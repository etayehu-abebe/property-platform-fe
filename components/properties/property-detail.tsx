"use client";

import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  DollarSign,
  Calendar,
  Building2,
  User,
  ArrowLeft,
  Heart,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/auth-store";

interface PropertyDetailProps {
  property: Property;
}

export default function PropertyDetail({ property }: PropertyDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useAuthStore();

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1,
    );
  };

  const handleToggleFavorite = () => {
    if (!user) {
      window.location.href = "/auth/login";
      return;
    }
    setIsFavorite(!isFavorite);
    // TODO: Implement favorite API call
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/properties"
              className="text-gray-600 hover:text-blue-600 flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Properties
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{property.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="lg:w-2/3">
            {/* Image Gallery */}
            <Card className="mb-8 overflow-hidden">
              <div className="relative h-96 w-full">
                {property.images.length > 0 ? (
                  <>
                    <Image
                      src={property.images[currentImageIndex]}
                      alt={`${property.title} - Image ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority
                    />

                    {/* Navigation Arrows */}
                    {property.images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                        >
                          <ArrowLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                        >
                          <ArrowLeft className="h-5 w-5 rotate-180" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {property.images.length}
                    </div>
                  </>
                ) : (
                  <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                    <Building2 className="h-20 w-20 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {property.images.length > 1 && (
                <div className="p-4 border-t">
                  <div className="flex gap-2 overflow-x-auto">
                    {property.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                          currentImageIndex === index
                            ? "border-blue-600"
                            : "border-transparent"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Property Details */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center gap-4 text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-5 w-5" />
                        {property.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-5 w-5" />
                        Listed{" "}
                        {new Date(property.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        property.status === "PUBLISHED"
                          ? "bg-green-100 text-green-800"
                          : property.status === "DRAFT"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {property.status}
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="text-4xl font-bold text-gray-900 flex items-center gap-2">
                    <DollarSign className="h-8 w-8" />
                    {property.price.toLocaleString()}
                  </div>
                  <p className="text-gray-600">Total Price</p>
                </div>
              </div>

              {/* Description */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {property.description}
                  </p>
                </CardContent>
              </Card>

              {/* Owner Information */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Property Owner
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {property.owner.name || property.owner.email}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {property.owner.email}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="sticky top-6 space-y-6">
              {/* Action Buttons */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <Button
                    size="lg"
                    className="w-full gap-2"
                    onClick={handleToggleFavorite}
                  >
                    <Heart
                      className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
                    />
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full gap-2"
                    onClick={handleShare}
                  >
                    <Share2 className="h-5 w-5" />
                    Share Property
                  </Button>

                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-2">
                      Interested in this property?
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Contact the owner for more information or to schedule a
                      viewing.
                    </p>
                    <Button
                      size="lg"
                      className="w-full"
                      onClick={() => {
                        if (!user) {
                          window.location.href = "/auth/login";
                          return;
                        }
                        // TODO: Implement contact form/modal
                        alert("Contact feature coming soon!");
                      }}
                    >
                      Contact Owner
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Property Details Card */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Property Details</h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Status</dt>
                      <dd className="font-medium">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            property.status === "PUBLISHED"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {property.status}
                        </span>
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Listed On</dt>
                      <dd className="font-medium">
                        {new Date(property.createdAt).toLocaleDateString()}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Last Updated</dt>
                      <dd className="font-medium">
                        {new Date(property.updatedAt).toLocaleDateString()}
                      </dd>
                    </div>
                    {property.publishedAt && (
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Published On</dt>
                        <dd className="font-medium">
                          {new Date(property.publishedAt).toLocaleDateString()}
                        </dd>
                      </div>
                    )}
                  </dl>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
