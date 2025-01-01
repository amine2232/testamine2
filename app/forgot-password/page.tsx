"use client";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { LeftSection } from "@/components/auth/sections/left-section-forgot";
import { RightSection } from "@/components/auth/sections/right-section";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <LeftSection />
        <RightSection />
      </div>
    </div>
  );
}