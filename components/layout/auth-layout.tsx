"use client";

import { AuthForm } from "@/components/auth/auth-form";
import { AppHeader } from "@/components/layout/app-header";

export function AuthLayout() {
  return (
    <main className="min-h-screen bg-background flex">
      <div className="w-1/2 p-8 flex flex-col">
        <AppHeader />
        <AuthForm />
      </div>
      <div className="w-1/2 bg-blue-600">
        <div className="h-full flex items-center justify-center text-white">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold mb-4">Welcome to our Platform</h2>
            <p className="text-lg">Secure authentication system with modern features</p>
          </div>
        </div>
      </div>
    </main>
  );
}