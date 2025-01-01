"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideIcon, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface FormInputProps {
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Icon: LucideIcon;
  error?: string;
  onBlur?: () => void;
}

export function FormInput({ 
  type,
  label,
  placeholder,
  value,
  onChange,
  Icon,
  error,
  onBlur
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-2">
      <Label 
        htmlFor={label.toLowerCase().replace(/\s+/g, '-')}
        className="text-sm font-medium text-muted-foreground"
      >
        {label}
      </Label>
      <div className="relative">
        <div className="absolute left-3 top-3 text-muted-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <Input
          id={label.toLowerCase().replace(/\s+/g, '-')}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className={`pl-10 h-12 pr-10 ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}