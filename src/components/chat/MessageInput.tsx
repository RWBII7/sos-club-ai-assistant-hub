import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface MessageInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  personaName: string;
}

export const MessageInput = ({ input, setInput, onSubmit, isLoading, personaName }: MessageInputProps) => {
  return (
    <form onSubmit={onSubmit} className="flex space-x-2">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`Ask ${personaName} anything...`}
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
  );
};