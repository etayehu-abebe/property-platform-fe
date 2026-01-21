"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/lib/schemas/register-schema";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { User, Building2, Mail, Lock, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RegisterForm() {
  const router = useRouter();

  const {
    register: registerUser,
    registerIsLoading,
    registerError,
  } = useAuth({
    onSuccess: (data) => {
      if (data?.user) {
        switch (data.user.role) {
          case "ADMIN":
            router.push("/dashboard/admin");
            break;
          case "OWNER":
            router.push("/dashboard/owner");
            break;
          case "USER":
            router.push("/dashboard/user");
            break;
          default:
            router.push("/properties");
        }
      }
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "USER",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await registerUser(data);
    } catch (error) {
      // Error handled by mutation
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <User className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl text-center">Create Account</CardTitle>
        <CardDescription className="text-center">
          Join our property listing platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {registerError && (
            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
              {registerError.message}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <UserCircle className="h-4 w-4" />
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              {...register("name")}
              disabled={registerIsLoading}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email")}
              disabled={registerIsLoading}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              disabled={registerIsLoading}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              onValueChange={(value: "USER" | "OWNER" | "ADMIN") =>
                register("role").onChange({ target: { value } })
              }
              disabled={registerIsLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">Regular User</SelectItem>
                <SelectItem value="OWNER">Property Owner</SelectItem>
                <SelectItem value="ADMIN">Administrator</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-destructive">{errors.role.message}</p>
            )}
          </div>

          {(selectedRole === "OWNER" || selectedRole === "ADMIN") && (
            <div className="space-y-2">
              <Label
                htmlFor="organizationName"
                className="flex items-center gap-2"
              >
                <Building2 className="h-4 w-4" />
                Organization Name {selectedRole === "OWNER" ? "(Optional)" : ""}
              </Label>
              <Input
                id="organizationName"
                placeholder="My Real Estate Company"
                {...register("organizationName")}
                disabled={registerIsLoading}
              />
              <p className="text-sm text-muted-foreground">
                {selectedRole === "OWNER"
                  ? "Create your property management organization"
                  : "System administration organization"}
              </p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={registerIsLoading}>
            {registerIsLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
