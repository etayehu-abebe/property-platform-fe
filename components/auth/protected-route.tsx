"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth-store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "USER" | "OWNER" | "ADMIN";
}

export default function ProtectedRoute({
  children,
  requiredRole = "USER",
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, token, isLoading, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated) return; 

    if (!token) {
      router.replace("/auth/login");
      return;
    }

    if (!user) return; // token exists, user loading

    if (requiredRole && requiredRole !== "USER") {
      const roleHierarchy = {
        USER: 1,
        OWNER: 2,
        ADMIN: 3,
      } as const;

      type Role = keyof typeof roleHierarchy;
      const userRole = user.role as Role;
      const required = requiredRole as Role;

      if (roleHierarchy[userRole] < roleHierarchy[required]) {
        router.replace("/dashboard");
      }
    }
  }, [hasHydrated, token, user, requiredRole, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!token || !user) {
    return null; 
  }

  if (
    requiredRole !== "USER" &&
    user.role !== requiredRole &&
    user.role !== "ADMIN"
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p>You don&apos;t have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
