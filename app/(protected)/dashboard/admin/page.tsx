'use client'

import DashboardOverview from '@/components/dashboard/dashboard-overview'
import { useAuthStore } from '@/lib/store/auth-store'
import { redirect } from 'next/navigation'


export default async function AdminDashboardPage() {
  const user = useAuthStore((state) => state.user)

  console.log(user)
  
  if (!user || user.role !== 'ADMIN') {
    redirect('/auth/login')
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage users, properties, and system settings
        </p>
      </div>

      <DashboardOverview role="ADMIN" />
    </div>
  )
}