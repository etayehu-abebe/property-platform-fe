"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, Search } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth-store";

export default function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Building2 className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold">PropertyPlatform</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link
            href="/properties"
            className="flex items-center gap-1 hover:text-blue-600"
          >
            <Search className="h-4 w-4" />
            Browse
          </Link>

          {user ? (
            <>
              <Link
                href={`/dashboard/${user.role.toLowerCase()}`}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <div className="flex items-center gap-4">
                <span className="text-sm">Hello, {user.name}</span>
                <Link href="/dashboard">
                  <Button size="sm">Dashboard</Button>
                </Link>
                <Button size="sm" variant="outline" onClick={logout}>
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
