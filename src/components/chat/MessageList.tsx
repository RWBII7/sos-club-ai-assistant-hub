import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export const MessageList = ({ messages, isLoading }: MessageListProps) => {
  // Function to format message content with proper line breaks
  const formatMessage = (content: string) => {
    return content.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-2">
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
                max-w-[80%] rounded-lg p-4 whitespace-pre-wrap
                ${message.role === "user" 
                  ? "bg-indigo-600 text-white" 
                  : "bg-gray-100 text-gray-900"
                }
              `}
            >
              {formatMessage(message.content)}
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
  );
};