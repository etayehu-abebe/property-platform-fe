"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Plus,
  List,
  Heart,
  Settings,
  User,
  Building2,
} from "lucide-react";
import { useAuthStore } from "@/lib/store/auth-store";

const userLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "My Favorites",
    href: "/dashboard/favorites",
    icon: Heart,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];

const ownerLinks = [
  {
    title: "My Properties",
    href: "/dashboard/properties",
    icon: List,
  },
  {
    title: "Add Property",
    href: "/properties/create",
    icon: Plus,
  },
];

const adminLinks = [
  {
    title: "All Properties",
    href: "/dashboard/admin/properties",
    icon: Building2,
  },
  {
    title: "System Settings",
    href: "/dashboard/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  if (!user) return null;

  const getLinks = () => {
    const links = [...userLinks];

    if (user.role === "OWNER" || user.role === "ADMIN") {
      links.push(...ownerLinks);
    }

    if (user.role === "ADMIN") {
      links.push(...adminLinks);
    }

    return links;
  };

  return (
    <aside className="hidden lg:block w-64 fixed h-[calc(100vh-8rem)]">
      <div className="bg-white rounded-lg shadow p-4 h-full">
        <div className="mb-6 p-4 bg-linear-to-r from-blue-50 to-blue-100 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-full">
              {user.role === "OWNER" ? (
                <Building2 className="h-5 w-5" />
              ) : user.role === "ADMIN" ? (
                <Settings className="h-5 w-5" />
              ) : (
                <User className="h-5 w-5" />
              )}
            </div>
            <div>
              <p className="font-semibold">{user.name || user.email}</p>
              <p className="text-sm text-gray-600 capitalize">
                {user.role.toLowerCase()}
              </p>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          {getLinks().map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href || pathname?.startsWith(link.href + "/");

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                    : "text-gray-700 hover:bg-gray-100",
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{link.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
