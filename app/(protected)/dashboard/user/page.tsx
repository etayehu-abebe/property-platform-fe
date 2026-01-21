'use client'

import DashboardOverview from "@/components/dashboard/dashboard-overview";
import { useAuthStore } from "@/lib/store/auth-store";
import { redirect } from "next/navigation";

export default async function UserDashboardPage() {
  const user = useAuthStore((state) => state.user);

  if (!user || user.role !== "USER") {
    redirect("/auth/login");
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
        <p className="text-gray-600">
          View your favorites and property searches
        </p>
      </div>

      <DashboardOverview role="USER" />
    </div>
  );
}
