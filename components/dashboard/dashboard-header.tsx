'use client'

import { User } from '@/types/auth'
import { LogOut, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/lib/store/auth-store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

interface DashboardHeaderProps {
  user: User
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const { logout } = useAuthStore()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

//   if (!user) router.push('/auth/login')

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-white px-4 py-3 shadow-sm md:px-6 md:py-4">
      <div className="flex items-center justify-between">
        {/* Left: Logo and Mobile Menu */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600" />
            <span className="text-lg font-semibold">PropertyHub</span>
          </Link>
        </div>

        {/* Right: User Info and Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden text-right md:block">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
            <p className="text-xs text-gray-400 capitalize">
              {user.role.toLowerCase()}
            </p>
          </div>

          {/* User Avatar */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            {user && user.name!.charAt(0).toUpperCase()}
          </div>

          {/* Logout Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="hidden gap-2 md:flex"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="md:hidden"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}