"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Goal, Settings, Play, Trash2 } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import Image from "next/image";

interface Assistant {
  id: string;
  name: string;
  who_speaks_first: string;
}

export function AssistantsPage() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchAssistants();
  }, []);

  const fetchAssistants = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("assistants")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setAssistants(data || []);
    } catch (error) {
      console.error("Error fetching assistants:", error);
      toast.error("Failed to load assistants");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("assistants")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Assistant deleted successfully");
      fetchAssistants();
    } catch (error) {
      toast.error("Failed to delete assistant");
    }
  };

  const handleCreateAssistant = async () => {
    try {
      setIsCreating(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("You must be logged in to create an assistant");
        return;
      }

      const { data, error } = await supabase.from("assistants").insert({
        name: "My New Assistant",
        user_id: user.id,
        who_speaks_first: "Assistant Initiate",
        welcome_message: "Hi, How are you doing today?",
        script: "[Open with a Warm Welcome]\n\n\"Hello {first_name} thank you for reaching out! I'm here to assist you.\nCould you share a bit about what you're looking for or how I might help?\"\n\nGoal: Start with a friendly, open-ended question to understand the customer's needs and set a positive tone."
      }).select().single();

      if (error) throw error;
      
      router.push(`/dashboard/assistant/${data.id}`);
    } catch (error) {
      toast.error("Failed to create assistant");
      console.error("Error creating assistant:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {loading && (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      )}
      
      {!loading && (
      <div className="flex items-start justify-between mb-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold mb-4 text-blue-600">
            Create Your Voice Assistant
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Build a personalized voice assistant that understands your needs and interacts with your users seamlessly. 
            Whether it's automating tasks, enhancing customer engagement, or providing tailored information, your 
            voice assistant will be fully customizable to your preferences. Let us help you bring your ideas to life with 
            advanced voice technology that supports a variety of accents and languages.
          </p>
          <Button 
            className="mt-6 bg-blue-600 hover:bg-blue-700"
            onClick={handleCreateAssistant}
            disabled={isCreating}
          >
            <Plus className="w-5 h-5 mr-2" /> Create an AI Voice Assistant
          </Button>
        </div>
        <div className="relative w-80 h-80">
          <Image
            src="https://img.zuzz.tv/assets/chatbot.png"
            alt="Assistant Illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>)}

      {!loading && assistants.length > 0 && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {assistants.map((assistant) => (
          <Card key={assistant.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-lg font-semibold">{assistant.name}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(assistant.id)}
              >
                <Trash2 className="h-5 w-5 text-gray-400 hover:text-red-500" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <Goal className="h-4 w-4 mr-2" />
                <span>Add assistant goal</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-xs text-muted-foreground">
                {assistant.who_speaks_first}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/dashboard/assistant/${assistant.id}`)}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  SETUP
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.info("Test functionality coming soon")}
                >
                  <Play className="w-4 h-4 mr-2" />
                  TEST
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>)}
    </div>
  );
}