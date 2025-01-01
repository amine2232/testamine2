"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

interface CreateAssistantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CreateAssistantDialog({ 
  open, 
  onOpenChange,
  onSuccess 
}: CreateAssistantDialogProps) {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error("Assistant name is required");
      return;
    }

    try {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to create an assistant");
        return;
      }

      const { error } = await supabase.from("assistants").insert({
        name: name.trim(),
        company_name: companyName.trim() || null,
        user_id: user.id,
        who_speaks_first: "Assistant Initiate",
        welcome_message: "Hi, How are you doing today?",
        script: "[Open with a Warm Welcome]\n\n\"Hello {first_name} thank you for reaching out! I'm here to assist you.\nCould you share a bit about what you're looking for or how I might help?\"\n\nGoal: Start with a friendly, open-ended question to understand the customer's needs and set a positive tone."
      });

      if (error) throw error;

      toast.success("Assistant created successfully!");
      onSuccess();
      onOpenChange(false);
      setName("");
      setCompanyName("");
    } catch (error) {
      toast.error("Failed to create assistant");
      console.error("Error creating assistant:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Voice Assistant</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="name">Assistant's Name*</Label>
              <HelpCircle className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              id="name"
              placeholder="Enter assistant name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="company">Enter your company name</Label>
              <HelpCircle className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              id="company"
              placeholder="eg : VoiceGenie"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreate} 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}