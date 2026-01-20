"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-white p-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="text-6xl mb-6">🔍</div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-8 text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Home Button */}
          <Link href="/">
            <Button className="gap-2 min-w-35">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>

          {/* Properties Button */}
          <Link href="/properties">
            <Button variant="outline" className="gap-2 min-w-35">
              <Search className="h-4 w-4" />
              Browse Properties
            </Button>
          </Link>

          {/* Back Button */}
          <Button
            variant="outline"
            className="gap-2 min-w-35"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
