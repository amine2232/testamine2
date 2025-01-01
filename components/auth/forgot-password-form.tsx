"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Loader2 } from "lucide-react";
import { FormInput } from "./form/form-input";
import Link from "next/link";
import { resetPassword } from "@/lib/supabase/auth";
import { toast } from "sonner";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail()) return;

    try {
      setLoading(true);
      const { error: resetError } = await resetPassword(email);
      
      if (resetError) {
        toast.error("Error sending reset link");
        return;
      }

      toast.success("If an account exists with this email, you will receive a password reset link");
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Reset your <span className="text-blue-600">password</span>
        </h1>
        <p className="text-muted-foreground">
          Enter your email and we'll send you instructions to reset your password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateEmail}
          error={error}
          Icon={Mail}
        />

        <Button 
          type="submit" 
          className="w-full h-12 bg-blue-600 hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Sending...
            </div>
          ) : (
            "SEND RESET LINK"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Remember your password? </span>
        <Link href="/" className="text-blue-600 hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}