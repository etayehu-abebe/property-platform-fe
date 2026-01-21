"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { useAuthStore } from "@/lib/store/auth-store";
import { useRouter } from "next/navigation";

interface FavoriteButtonProps {
  propertyId: string;
  size?: "sm" | "lg";
  showLabel?: boolean;
}

export default function FavoriteButton({
  propertyId,
  size = "sm",
  showLabel = false,
}: FavoriteButtonProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const { toggleFavorite, checkIsFavorite, isAdding, isRemoving } =
    useFavorites();

  const [isFavorite, setIsFavorite] = useState<void | boolean>();
  const [isChecking, setIsChecking] = useState(true);

  // Check favorite status on mount
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!user) {
        setIsChecking(false);
        return;
      }

      try {
        const result = await checkIsFavorite(propertyId);
        setIsFavorite(result);
      } catch (error) {
        console.error("Error checking favorite status:", error);
      } finally {
        setIsChecking(false);
      }
    };

    checkFavoriteStatus();
  }, [propertyId, user, checkIsFavorite]);

  const handleFavoriteClick = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      await toggleFavorite(propertyId, Boolean(isFavorite));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  if (isChecking) {
    return (
      <Button variant="outline" size={size} className="opacity-50" disabled>
        <Heart className={`h-${iconSizes[size]} w-${iconSizes[size]}`} />
      </Button>
    );
  }

  return (
    <Button
      variant={isFavorite ? "default" : "outline"}
      size={size}
      onClick={handleFavoriteClick}
      disabled={isAdding || isRemoving}
      className={`${
        isFavorite
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "hover:bg-red-50 hover:text-red-500"
      } transition-colors`}
    >
      <Heart
        className={`h-${iconSizes[size]} w-${iconSizes[size]} ${
          isFavorite ? "fill-white" : ""
        }`}
      />
      {showLabel && (
        <span className="ml-2">
          {isFavorite ? "Remove Favorite" : "Add to Favorites"}
        </span>
      )}
    </Button>
  );
}
