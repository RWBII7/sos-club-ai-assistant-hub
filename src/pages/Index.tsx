import { ChatInterface } from "../components/ChatInterface";
import { personas } from "../lib/personas";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-900 mb-4">Hooksmith AI Assistant</h1>
          <p className="text-lg text-indigo-700">Your AI expert for creating viral hooks and attention-grabbing content</p>
        </div>
        
        <ChatInterface persona={personas[0]} />
      </div>
    </div>
  );
};

export default Index;