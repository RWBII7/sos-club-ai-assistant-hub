import { hooksmith } from "./hooksmith";
import { dreamClientWhisperer } from "./dream-client-whisperer";

export type PersonaType = {
  id: string;
  name: string;
  description: string;
  icon: string;
  prompt: string;
  initialQuestion: string;
};

export const personas: PersonaType[] = [
  hooksmith,
  dreamClientWhisperer
];