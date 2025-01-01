"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  LogOut, 
  User,
  CreditCard,
  DollarSign,
  FileText,
  Lightbulb,
  GitBranch,
  Users2,
  KeyRound,
  ChevronDown
} from "lucide-react";
import { signOut } from "@/lib/supabase/auth";
import { supabase } from "@/lib/supabase/client";

export function ProfileMenu() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.id) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, email')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setFullName(profile.full_name);
          setEmail(profile.email);
        }
      }
    }
    getProfile();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const initials = fullName
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-sm font-medium text-blue-600">{initials}</span>
          </div>
          <span className="text-sm font-medium">{fullName}</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-4 py-3 border-b">
          <p className="text-sm font-medium">{fullName}</p>
          <p className="text-xs text-gray-500">{email}</p>
        </div>
        <div className="p-2">
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Edit Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DollarSign className="mr-2 h-4 w-4" />
            <span>Pricing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileText className="mr-2 h-4 w-4" />
            <span>Documentation</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Lightbulb className="mr-2 h-4 w-4" />
            <span>Feature Request</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <GitBranch className="mr-2 h-4 w-4" />
            <span>Roadmaps</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Users2 className="mr-2 h-4 w-4" />
            <div className="flex items-center justify-between flex-1">
              <span>Community</span>
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded">New</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <KeyRound className="mr-2 h-4 w-4" />
            <span>Change Password</span>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <div className="p-2">
          <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>LOGOUT</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}