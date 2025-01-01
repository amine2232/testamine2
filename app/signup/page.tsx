"use client";

import { SignUpForm } from "@/components/auth/signup-form";
import { LeftSection } from "@/components/auth/sections/left-section-signup";
import { RightSection } from "@/components/auth/sections/right-section";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <LeftSection />
        <RightSection />
      </div>
    </div>
  );
}