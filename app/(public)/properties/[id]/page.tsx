import { notFound } from "next/navigation";
import PropertyDetail from "@/components/properties/property-detail";
// import { api } from "@/lib/api";x
import { Property } from "@/types/property";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;

  try {
    // Fetch property data on server
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error("Failed to fetch property");
    }

    const property: Property = await response.json();

    return <PropertyDetail property={property} />;
  } catch (error) {
    notFound();
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PropertyPageProps) {
  const { id } = await params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      return {
        title: "Property Not Found",
      };
    }

    const property: Property = await response.json();

    return {
      title: `${property.title} - ${property.location}`,
      description: property.description.substring(0, 160),
      openGraph: {
        title: property.title,
        description: property.description.substring(0, 160),
        images: property.images.length > 0 ? [property.images[0]] : [],
      },
    };
  } catch (error) {
    return {
      title: "Property Details",
    };
  }
}
