"use client";

import { UserRole } from "@/types/auth";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Building2,
  Home,
  Settings,
  Star,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  role: UserRole;
}

export default function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Role-specific navigation items
  const getNavItems = () => {
    const baseItems = [
      {
        href: "/dashboard",
        label: "Overview",
        icon: <Home className="h-5 w-5" />,
        roles: ["ADMIN", "OWNER", "USER"],
      },
    ];

    const roleSpecificItems = {
      ADMIN: [
        {
          href: "/dashboard/admin/users",
          label: "Users",
          icon: <Users className="h-5 w-5" />,
        },
        {
          href: "/dashboard/admin/properties",
          label: "All Properties",
          icon: <Building2 className="h-5 w-5" />,
        },
        {
          href: "/dashboard/admin/analytics",
          label: "Analytics",
          icon: <BarChart3 className="h-5 w-5" />,
        },
      ],
      OWNER: [
        {
          href: "/dashboard/owner/properties",
          label: "My Properties",
          icon: <Building2 className="h-5 w-5" />,
        },
        {
          href: "/properties/create",
          label: "Add Property",
          icon: <Home className="h-5 w-5" />,
        },
        {
          href: "/dashboard/owner/analytics",
          label: "Analytics",
          icon: <BarChart3 className="h-5 w-5" />,
        },
      ],
      USER: [
        {
          href: "/dashboard/user/favorites",
          label: "Favorites",
          icon: <Star className="h-5 w-5" />,
        },
        {
          href: "/dashboard/user/properties",
          label: "My Searches",
          icon: <Home className="h-5 w-5" />,
        },
      ],
    };

    const commonItems = [
      {
        href: "/dashboard/settings",
        label: "Settings",
        icon: <Settings className="h-5 w-5" />,
        roles: ["ADMIN", "OWNER", "USER"],
      },
      {
        href: "/properties",
        label: "Browse Properties",
        icon: <Building2 className="h-5 w-5" />,
        roles: ["ADMIN", "OWNER", "USER"],
      },
    ];

    return [
      ...baseItems.filter((item) => item.roles.includes(role)),
      ...(roleSpecificItems[role] || []),
      ...commonItems.filter((item) => item.roles.includes(role)),
    ];
  };

  const navItems = getNavItems();

  const sidebarContent = (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 transform border-r bg-white pt-16 shadow-lg transition-transform duration-200 ease-in-out md:relative md:z-auto md:block md:translate-x-0 md:pt-0 md:shadow-none",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex h-full flex-col">
        {/* Mobile close button */}
        <div className="flex justify-end p-4 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t p-4">
          <div className="rounded-lg bg-gray-50 p-3 text-center">
            <p className="text-xs text-gray-600">
              {role === "ADMIN" && "System Administrator"}
              {role === "OWNER" && "Property Owner"}
              {role === "USER" && "Regular User"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {sidebarContent}
    </>
  );
}
