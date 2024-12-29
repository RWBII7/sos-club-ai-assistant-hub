import { PersonaType } from "../lib/personas";

interface PersonaSelectorProps {
  personas: PersonaType[];
  selectedPersona: PersonaType;
  onSelect: (persona: PersonaType) => void;
}

export const PersonaSelector = ({ personas, selectedPersona, onSelect }: PersonaSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {personas.map((persona) => (
        <button
          key={persona.id}
          onClick={() => !persona.disabled && onSelect(persona)}
          className={`
            relative p-4 rounded-xl text-left transition-all duration-200
            ${selectedPersona.id === persona.id 
              ? 'bg-indigo-600 text-white shadow-lg scale-105' 
              : 'bg-white text-gray-900 hover:bg-gray-50'
            }
            ${persona.disabled ? 'cursor-not-allowed' : 'hover:scale-105'}
          `}
        >
          <div className="text-2xl mb-2">{persona.icon}</div>
          <h3 className="font-semibold mb-1">{persona.name}</h3>
          <p className="text-sm opacity-90">{persona.description}</p>
          {persona.disabled && (
            <div className="absolute top-2 right-2 bg-[#8B5CF6] text-white text-xs px-2 py-1 rounded">
              Premium
            </div>
          )}
        </button>
      ))}
    </div>
  );
};