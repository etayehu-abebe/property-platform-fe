import { Property } from "@/types/property";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "./favorite-button";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const firstImage = property.images[0] || "/placeholder-property.png";

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 pt-0">
      <div className="relative h-48 w-full">
        <Image
          src={firstImage}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`px-2 rounded-full text-xs font-semibold ${
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

      <CardHeader className="pb-2">
        <h3 className="font-bold text-lg truncate">{property.title}</h3>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {property.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">{property.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <span className="font-semibold text-gray-900">
              ${property.price.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">
              Listed {new Date(property.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`/properties/${property.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
