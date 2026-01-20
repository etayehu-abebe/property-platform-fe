export interface RegisterFormData {
  email: string;
  password: string;
  name: string;
  role: "USER" | "OWNER" | "ADMIN";
  organizationName?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  organizationId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}
