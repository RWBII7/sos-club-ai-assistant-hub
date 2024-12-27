import { motion } from "framer-motion";
import { PersonaType } from "../lib/personas";

interface PersonaSelectorProps {
  personas: PersonaType[];
  selectedPersona: PersonaType;
  onSelect: (persona: PersonaType) => void;
}

export const PersonaSelector = ({ personas, selectedPersona, onSelect }: PersonaSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {personas.map((persona) => (
        <motion.div
          key={persona.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(persona)}
          className={`
            cursor-pointer rounded-xl p-6 
            ${selectedPersona.id === persona.id 
              ? 'bg-indigo-600 text-white' 
              : 'bg-white text-indigo-900 hover:bg-indigo-50'
            }
            transition-colors duration-200 shadow-lg
          `}
        >
          <div className="flex items-center space-x-4">
            <div className="text-2xl">{persona.icon}</div>
            <div>
              <h3 className="font-bold text-lg">{persona.name}</h3>
              <p className={`text-sm ${selectedPersona.id === persona.id ? 'text-indigo-100' : 'text-indigo-600'}`}>
                {persona.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};