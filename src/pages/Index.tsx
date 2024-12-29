import { ChatInterface } from "../components/ChatInterface";
import { personas } from "../lib/personas";
import { PersonaSelector } from "../components/PersonaSelector";
import { useState } from "react";
import { PersonaType } from "../lib/personas";

const Index = () => {
  console.log("Index component rendering"); // Adding a console log to help debug
  const [selectedPersona, setSelectedPersona] = useState<PersonaType>(personas[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-900 mb-4">AI Assistant Hub</h1>
          <p className="text-lg text-indigo-700">Your AI experts for creating compelling content and marketing strategies</p>
        </div>
        
        <div className="mb-8">
          <PersonaSelector 
            personas={personas} 
            selectedPersona={selectedPersona}
            onSelect={setSelectedPersona}
          />
        </div>
        
        <ChatInterface persona={selectedPersona} />
      </div>
    </div>
  );
};

export default Index;