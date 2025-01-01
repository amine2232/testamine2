"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function TrialProgress() {
  // In a real app, these values would come from your backend
  const usedMinutes = 0;
  const totalMinutes = 10;
  const progressPercentage = (usedMinutes / totalMinutes) * 100;

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <span className="text-sm text-gray-600">
          {usedMinutes}/{totalMinutes} minutes
        </span>
      </div>
      <Link href="/dashboard/pricing">
        <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
          Free Trial
        </Button>
      </Link>
    </div>
  );
}