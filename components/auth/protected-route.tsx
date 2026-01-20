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
  const { user, token, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && (!token || !user)) {
      router.push("/auth/login");
      return;
    }

    if (!isLoading && user && requiredRole !== "USER") {
      const roleHierarchy = {
        USER: 1,
        OWNER: 2,
        ADMIN: 3,
      };

      if (
        roleHierarchy[user.role as keyof typeof roleHierarchy] <
        roleHierarchy[requiredRole]
      ) {
        router.push("/dashboard");
      }
    }
  }, [user, token, isLoading, router, requiredRole]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!token || !user) {
    return null; // Will redirect in useEffect
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
