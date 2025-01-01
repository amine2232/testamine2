"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import { AuthDivider } from "./auth-divider";
import { GoogleButton } from "./google-button";
import { FormInput } from "./form/form-input";
import Link from "next/link";
import { signUp } from "@/lib/supabase/auth";
import { toast } from "sonner";

export function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const validateName = () => {
    if (!name.trim()) {
      setErrors(prev => ({ ...prev, name: "Name is required" }));
      return false;
    }
    setErrors(prev => ({ ...prev, name: "" }));
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setErrors(prev => ({ ...prev, email: "Email is required" }));
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: "Invalid email format" }));
      return false;
    }
    setErrors(prev => ({ ...prev, email: "" }));
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setErrors(prev => ({ ...prev, password: "Password is required" }));
      return false;
    }
    if (password.length < 6) {
      setErrors(prev => ({ ...prev, password: "Password must be at least 6 characters" }));
      return false;
    }
    setErrors(prev => ({ ...prev, password: "" }));
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateName() || !validateEmail() || !validatePassword()) {
      return;
    }

    try {
      setLoading(true);
      const { error } = await signUp(email, password, name);
      
      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Successfully signed up! Please check your email to confirm your account.");
      router.push("/");
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Create your <span className="text-blue-600">account</span>
        </h1>
        <p className="text-muted-foreground">Join MaklachAI today</p>
      </div>

      <GoogleButton />
      <AuthDivider />

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          type="text"
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={validateName}
          error={errors.name}
          Icon={User}
        />
        <FormInput
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateEmail}
          error={errors.email}
          Icon={Mail}
        />
        <FormInput
          type="password"
          label="Password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validatePassword}
          error={errors.password}
          Icon={Lock}
        />

        <Button 
          type="submit" 
          className="w-full h-12 bg-blue-600 hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Creating account...
            </div>
          ) : (
            "SIGN UP"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Already have an account? </span>
        <Link href="/" className="text-blue-600 hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}