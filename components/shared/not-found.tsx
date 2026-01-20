import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, Building2 } from "lucide-react";

interface NotFoundProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  showBackButton?: boolean;
  showBrowseButton?: boolean;
  showHomeButton?: boolean;
  backUrl?: string;
  backLabel?: string;
}

export default function NotFound({
  title = "Page Not Found",
  message = "The page you're looking for doesn't exist or has been moved.",
  icon = "🔍",
  showBackButton = true,
  showBrowseButton = false,
  showHomeButton = true,
  backUrl = "/",
  backLabel = "Go Home",
}: NotFoundProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-white p-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="text-6xl mb-6">{icon}</div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>

        {/* Message */}
        <p className="text-gray-600 mb-8 text-lg">{message}</p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Back Button */}
          {showBackButton && (
            <Link href={backUrl}>
              <Button className="gap-2 min-w-35">
                <ArrowLeft className="h-4 w-4" />
                {backLabel}
              </Button>
            </Link>
          )}

          {/* Browse Properties Button */}
          {showBrowseButton && (
            <Link href="/properties">
              <Button variant="outline" className="gap-2 min-w-35">
                <Search className="h-4 w-4" />
                Browse Properties
              </Button>
            </Link>
          )}

          {/* Home Button */}
          {showHomeButton && (
            <Link href="/">
              <Button variant="outline" className="gap-2 min-w-35">
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
