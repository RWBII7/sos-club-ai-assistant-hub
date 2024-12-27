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

export const ChatInterface = ({ persona }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: persona.initialQuestion }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Mock response for now - replace this with your actual backend call
      const mockResponse = {
        role: "assistant" as const,
        content: "I'm sorry, but I'm currently in demo mode. Please contact the administrator to enable full functionality."
      };
      
      setMessages(prev => [...prev, mockResponse]);
      toast.info("This is a demo version. Please contact the administrator for full access.");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to get response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
