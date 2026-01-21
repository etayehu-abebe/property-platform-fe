"use client";

import { UserRole } from "@/types/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  Users,
  Star,
  TrendingUp,
  Home,
  DollarSign,
} from "lucide-react";

interface DashboardOverviewProps {
  role: UserRole;
}

export default function DashboardOverview({ role }: DashboardOverviewProps) {
  // Mock data - in real app, fetch from API
  const stats = {
    ADMIN: [
      {
        title: "Total Users",
        value: "1,234",
        icon: <Users className="h-5 w-5" />,
        change: "+12%",
      },
      {
        title: "Total Properties",
        value: "567",
        icon: <Building2 className="h-5 w-5" />,
        change: "+8%",
      },
      {
        title: "Active Owners",
        value: "89",
        icon: <Users className="h-5 w-5" />,
        change: "+5%",
      },
      {
        title: "Revenue",
        value: "$45,678",
        icon: <DollarSign className="h-5 w-5" />,
        change: "+15%",
      },
    ],
    OWNER: [
      {
        title: "Total Properties",
        value: "12",
        icon: <Building2 className="h-5 w-5" />,
      },
      { title: "Published", value: "8", icon: <Home className="h-5 w-5" /> },
      { title: "Drafts", value: "3", icon: <Building2 className="h-5 w-5" /> },
      {
        title: "Total Views",
        value: "1,234",
        icon: <TrendingUp className="h-5 w-5" />,
      },
    ],
    USER: [
      { title: "Favorites", value: "15", icon: <Star className="h-5 w-5" /> },
      {
        title: "Viewed Properties",
        value: "42",
        icon: <Home className="h-5 w-5" />,
      },
      {
        title: "Searches",
        value: "28",
        icon: <Building2 className="h-5 w-5" />,
      },
      { title: "Messages", value: "3", icon: <Users className="h-5 w-5" /> },
    ],
  };

  const recentActivities = {
    ADMIN: [
      { action: "New user registered", time: "2 minutes ago" },
      { action: "Property published", time: "15 minutes ago" },
      { action: "System backup completed", time: "1 hour ago" },
    ],
    OWNER: [
      { action: 'Property "Beach House" published', time: "2 hours ago" },
      { action: 'Received inquiry for "City Apartment"', time: "1 day ago" },
      { action: 'Updated pricing for "Mountain Cabin"', time: "2 days ago" },
    ],
    USER: [
      { action: 'Added "Luxury Villa" to favorites', time: "1 day ago" },
      { action: 'Viewed "Modern Apartment"', time: "2 days ago" },
      { action: 'Saved search for "2-bedroom apartments"', time: "3 days ago" },
    ],
  };

  const currentStats = stats[role];
  const currentActivities = recentActivities[role];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {currentStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="text-gray-500">{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                  <span className="text-sm">{activity.action}</span>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {role === "ADMIN" && (
              <>
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Manage Users
                </button>
                <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
                  View All Properties
                </button>
                <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
                  System Settings
                </button>
              </>
            )}
            {role === "OWNER" && (
              <>
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Add New Property
                </button>
                <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
                  View My Properties
                </button>
                <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
                  Analytics Report
                </button>
              </>
            )}
            {role === "USER" && (
              <>
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Browse Properties
                </button>
                <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
                  View Favorites
                </button>
                <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
                  Update Profile
                </button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
