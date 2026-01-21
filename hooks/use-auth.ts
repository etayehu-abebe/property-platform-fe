import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { AuthResponse } from "@/types/auth";
import { useAuthStore } from "@/lib/store/auth-store";
import { LoginSchema } from "@/lib/schemas/login-schema";
import { RegisterSchema } from "@/lib/schemas/register-schema";

interface UseAuthOptions {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: Error) => void;
}

export function useAuth(options?: UseAuthOptions) {
  const { setUser, setToken, logout } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async (data: LoginSchema) => {
      const response = await api.post<AuthResponse>("/api/auth/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.token);
      // Save to localStorage - using your "token" key
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterSchema) => {
      const response = await api.post<AuthResponse>("/api/auth/register", data);
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.token);
      // Save to localStorage - using your "token" key
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }
      options?.onSuccess?.(data);
    },
    onError: options?.onError,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post("/api/auth/logout");
    },
    onSuccess: () => {
      logout();
      // Clear localStorage - using your "token" key
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
  });

  return {
    // Login
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    loginIsLoading: loginMutation.isPending,
    loginError: loginMutation.error,

    // Register
    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    registerIsLoading: registerMutation.isPending,
    registerError: registerMutation.error,

    // Logout
    logout: logoutMutation.mutate,
    logoutAsync: logoutMutation.mutateAsync,
    logoutIsLoading: logoutMutation.isPending,
  };
}
