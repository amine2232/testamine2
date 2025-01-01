"use client";

import { ModeToggle } from "@/components/mode-toggle";

export function AppHeader() {
  return (
    <div className="flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-600">MaklachAI</div>
      <ModeToggle />
    </div>
  );
}