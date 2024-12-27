import { useState } from "react";
import { PersonaType } from "../lib/personas";
import { toast } from "sonner";
import { MessageList } from "./chat/MessageList";
import { MessageInput } from "./chat/MessageInput";

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
        <MessageList messages={messages} isLoading={isLoading} />
        <MessageInput 
          input={input}
          setInput={setInput}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          personaName={persona.name}
        />
      </div>
    </div>
  );
};