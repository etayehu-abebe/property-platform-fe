'use client'

import DashboardOverview from "@/components/dashboard/dashboard-overview";
import { useAuthStore } from "@/lib/store/auth-store";
import { redirect } from "next/navigation";

export default async function OwnerDashboardPage() {
  const user = useAuthStore((state) => state.user);

  if (!user || user.role !== "OWNER") {
    redirect("/auth/login");
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Owner Dashboard</h1>
        <p className="text-gray-600">
          Manage your properties and view analytics
        </p>
      </div>

      <DashboardOverview role="OWNER" />
    </div>
  );
}
