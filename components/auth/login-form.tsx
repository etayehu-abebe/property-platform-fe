"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/lib/schemas/login-schema";
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
import Link from "next/link";
import { Mail, Lock, LogIn } from "lucide-react";
// import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

export default function LoginForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  // Use auth mutation with onSuccess callback
  const { login, loginIsLoading } = useAuth({
    onSuccess: (data) => {
      if (data?.user) {
        // Redirect based on role
        switch (data.user.role) {
          case 'ADMIN':
            router.push('/dashboard/admin')
            break
          case 'OWNER':
            router.push('/dashboard/owner')
            break
          case 'USER':
            router.push('/dashboard/user') 
            break
          default:
            router.push('/properties')
        }
      }
    },
  })

  const onSubmit = async (data: LoginSchema) => {
    login(data)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <LogIn className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
        <CardDescription className="text-center">
          Sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loginIsLoading}
          >
            {loginIsLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}