"use client";

import { Button } from "@/components/ui/button";
import { Bell, ChevronDown } from "lucide-react";
import { ProfileMenu } from "./profile-menu";
import { TrialProgress } from "./trial-progress";

export function Header() {
  return (
    <header className="h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-between">
      <h1 className="text-lg font-semibold">ASSISTANTS</h1>
      
      <div className="flex items-center space-x-6">
        <TrialProgress />
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <ProfileMenu />
      </div>
    </header>
  );
}