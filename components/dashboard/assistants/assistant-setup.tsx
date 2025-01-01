"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, ChevronLeft } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

interface Assistant {
  id: string;
  name: string;
  who_speaks_first: string;
  welcome_message: string;
  script: string;
}

export function AssistantSetup() {
  const params = useParams();
  const router = useRouter();
  const [assistant, setAssistant] = useState<Assistant | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAssistant();
  }, []);

  async function fetchAssistant() {
    try {
      const { data, error } = await supabase
        .from("assistants")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) throw error;
      setAssistant(data);
    } catch (error) {
      toast.error("Failed to load assistant");
      console.error("Error:", error);
    }
  }

  async function handleSave() {
    if (!assistant) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from("assistants")
        .update({
          name: assistant.name,
          who_speaks_first: assistant.who_speaks_first,
          welcome_message: assistant.welcome_message,
          script: assistant.script,
        })
        .eq("id", assistant.id);

      if (error) throw error;
      toast.success("Changes saved successfully");
    } catch (error) {
      toast.error("Failed to save changes");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  if (!assistant) return null;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">{assistant.name}</h1>
          </div>
        </div>
        <div className="flex space-x-4">
          <Button
            onClick={() => toast.info("Test functionality coming soon")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Talk to Assistant
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Assistant's Name</label>
              <HelpCircle className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              value={assistant.name}
              onChange={(e) =>
                setAssistant({ ...assistant, name: e.target.value })
              }
              placeholder="Enter assistant name"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Who Speaks First</label>
              <HelpCircle className="h-4 w-4 text-gray-400" />
            </div>
            <Select
              value={assistant.who_speaks_first}
              onValueChange={(value) =>
                setAssistant({ ...assistant, who_speaks_first: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Assistant Initiate">
                  Assistant Initiate : Assistant begins with your Call Opening Message
                </SelectItem>
                <SelectItem value="User Initiate">
                  User Initiate : Assistant remains silent until user speaks first
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Welcome Message</label>
              <HelpCircle className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              value={assistant.welcome_message}
              onChange={(e) =>
                setAssistant({ ...assistant, welcome_message: e.target.value })
              }
              placeholder="Enter welcome message"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Script</label>
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600"
                onClick={() => toast.info("Sample script functionality coming soon")}
              >
                Apply Sample Script
              </Button>
            </div>
            <Textarea
              value={assistant.script}
              onChange={(e) =>
                setAssistant({ ...assistant, script: e.target.value })
              }
              placeholder="Enter your script"
              className="min-h-[300px] font-mono"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="general">
              <AccordionTrigger>General settings</AccordionTrigger>
              <AccordionContent>
                Coming soon...
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="speech">
              <AccordionTrigger>Speech settings</AccordionTrigger>
              <AccordionContent>
                Coming soon...
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="call">
              <AccordionTrigger>Call settings</AccordionTrigger>
              <AccordionContent>
                Coming soon...
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="functions">
              <AccordionTrigger>Functions</AccordionTrigger>
              <AccordionContent>
                Coming soon...
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}