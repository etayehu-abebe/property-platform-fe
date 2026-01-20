import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/auth-store";
import api from "@/lib/api";
import { RegisterFormData, LoginFormData, AuthResponse } from "@/types/auth";

export const useAuth = () => {
  const { setUser, setToken } = useAuthStore();

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const response = await api.post<AuthResponse>("/api/auth/register", data);
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.token);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }
    },
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await api.post<AuthResponse>("/api/auth/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.token);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }
    },
  });

  const register = async (data: RegisterFormData) => {
    return await registerMutation.mutateAsync(data);
  };

  const login = async (data: LoginFormData) => {
    return await loginMutation.mutateAsync(data);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  };

  return {
    // Register
    register,
    registerIsLoading: registerMutation.isPending,
    registerError: registerMutation.error?.message,
    registerIsError: registerMutation.isError,
    registerIsSuccess: registerMutation.isSuccess,

    // Login
    login,
    loginIsLoading: loginMutation.isPending,
    loginError: loginMutation.error?.message,
    loginIsError: loginMutation.isError,
    loginIsSuccess: loginMutation.isSuccess,

    // Shared
    logout,
    user: useAuthStore((state) => state.user),
    token: useAuthStore((state) => state.token),
  };
};
