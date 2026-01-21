"use client"; 

import { User } from "@/types/auth";

export function getCurrentUser(): User | null {
  // Client-side only function
  if (typeof window === "undefined") {
    return null;
  }

  try {
    // Try to get user from localStorage
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      return null;
    }

    const userData = JSON.parse(userStr);

    return {
      id: userData.id || userData.userId,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      organizationId: userData.organizationId,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

// Alternative: Get from Zustand store directly
import { useAuthStore } from "@/lib/store/auth-store";

export function getCurrentUserFromStore(): User | null {
  if (typeof window === "undefined") {
    return null;
  }
  return useAuthStore.getState().user;
}
