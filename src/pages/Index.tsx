import { useState } from "react";
import { PersonaSelector } from "../components/PersonaSelector";
import { ChatInterface } from "../components/ChatInterface";
import { personas } from "../lib/personas";

const Index = () => {
  const [selectedPersona, setSelectedPersona] = useState(personas[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-900 mb-4">The SOS Club AI Assistants</h1>
          <p className="text-lg text-indigo-700">Your personal team of AI experts for content creation and growth</p>
        </div>
        
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