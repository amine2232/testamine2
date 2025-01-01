"use client";

import { AppHeader } from "@/components/layout/app-header";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export function LeftSection() {
  return (
    <div className="w-1/2 p-8 flex flex-col">
      <AppHeader />
      <ForgotPasswordForm />
    </div>
  );
}