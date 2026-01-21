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

export type UserRole = "USER" | "OWNER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}
