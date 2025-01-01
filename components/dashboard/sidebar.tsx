"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Users,
  Phone,
  BookOpen,
  ContactRound,
  Megaphone,
  History,
  Grid,
  Code2,
  HelpCircle,
  DollarSign,
  FileText,
  ChevronLeft,
  ChevronRight,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";

const topNavigation = [
  { name: "Assistants", href: "/dashboard", icon: Users },
  { name: "Phone Numbers", href: "/dashboard/phone-numbers", icon: Phone },
  { name: "Contact List", href: "/dashboard/contacts", icon: ContactRound },
  { name: "Knowledge Base", href: "/dashboard/knowledge", icon: Database },
  { name: "Campaigns", href: "/dashboard/campaigns", icon: Megaphone },
  { name: "Call History", href: "/dashboard/history", icon: History },
  { name: "Integrations", href: "/dashboard/integrations", icon: Grid },
  { name: "Developer APIs", href: "/dashboard/api", icon: Code2 },
  { name: "Support", href: "/dashboard/support", icon: HelpCircle },
];

const bottomNavigation = [
  { name: "Pricing", href: "/dashboard/pricing", icon: DollarSign },
  { name: "Book a Demo", href: "/dashboard/demo", icon: BookOpen },
  { name: "Documentation", href: "/dashboard/docs", icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="h-16 flex items-center px-4 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            V
          </div>
          {!isCollapsed && <span className="text-xl font-semibold">VoiceGenie</span>}
        </Link>
      </div>

      <div className="flex-1 flex flex-col justify-between py-4 overflow-y-auto">
        <nav className="space-y-1 px-2">
          {topNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100",
                  isCollapsed && "justify-center"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 px-2">
          {bottomNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors",
                isCollapsed && "justify-center"
              )}
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          ))}
          
          <Button
            variant="ghost"
            className="w-full mt-4 justify-center"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}