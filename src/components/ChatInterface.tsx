import { useState, useEffect } from "react";
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

  useEffect(() => {
    setMessages([{ role: "assistant", content: persona.initialQuestion }]);
  }, [persona]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            { 
              role: "system", 
              content: `You are ${persona.name}. ${persona.description}. Respond in a way that matches this persona.` 
            },
            ...messages,
            userMessage
          ],
          temperature: 0.7,
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from OpenAI');
      }

      const data = await response.json();
      const assistantMessage = {
        role: "assistant" as const,
        content: data.choices[0].message.content
      };
      
      setMessages(prev => [...prev, assistantMessage]);
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