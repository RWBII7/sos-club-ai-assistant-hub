import { useState } from "react";
import { PersonaSelector } from "../components/PersonaSelector";
import { ChatInterface } from "../components/ChatInterface";
import { personas } from "../lib/personas";
import { toast } from "sonner";

const Index = () => {
  const [selectedPersona, setSelectedPersona] = useState(personas[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-900">AI Assistant Hub</h1>
        
        <PersonaSelector 
          personas={personas}
          selectedPersona={selectedPersona}
          onSelect={setSelectedPersona}
        />
        
        <ChatInterface persona={selectedPersona} />
      </div>
    </div>
  );
};

export default Index;