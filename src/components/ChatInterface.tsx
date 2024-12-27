import { useState } from "react";
import { PersonaType } from "../lib/personas";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  persona: PersonaType;
}

const COMMUNITY_API_KEY_NAME = "community_openai_api_key";

export const ChatInterface = ({ persona }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: persona.initialQuestion }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  // Check for community API key on mount
  useState(() => {
    const savedApiKey = localStorage.getItem(COMMUNITY_API_KEY_NAME);
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setShowApiKeyInput(false);
    } else {
      setShowApiKeyInput(true);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!apiKey) {
      toast.error("Please enter the community API key first");
      setShowApiKeyInput(true);
      return;
    }

    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            { role: "system", content: persona.prompt },
            ...messages,
            userMessage,
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get response');
      }

      const data = await response.json();
      const assistantMessage = { 
        role: "assistant" as const, 
        content: data.choices[0].message.content 
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('API Error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to get response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem(COMMUNITY_API_KEY_NAME, apiKey);
      setShowApiKeyInput(false);
      toast.success("Community API key saved! You won't need to enter it again.");
    }
  };

  if (showApiKeyInput) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-4 md:p-6">
        <form onSubmit={handleApiKeySubmit} className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Enter Community API Key</h2>
            <p className="text-sm text-gray-600 mb-4">
              Enter the community API key provided by your administrator. This only needs to be done once.
            </p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter community API key..."
            />
          </div>
          <Button type="submit" disabled={!apiKey.trim()}>
            Save Community Key
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-4 md:p-6">
      <div className="h-[500px] flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`
                    max-w-[80%] rounded-lg p-4
                    ${message.role === "user" 
                      ? "bg-indigo-600 text-white" 
                      : "bg-gray-100 text-gray-900"
                    }
                  `}
                >
                  {message.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-100 rounded-lg p-4">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
              </div>
            </motion.div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask ${persona.name} anything...`}
            className="flex-1 resize-none"
            rows={2}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="self-end"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};