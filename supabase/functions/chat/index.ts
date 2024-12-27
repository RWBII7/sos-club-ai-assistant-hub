import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Function to convert markdown-style lists to plain text
const formatResponse = (text: string) => {
  // Remove markdown headers
  text = text.replace(/###\s/g, '');
  text = text.replace(/##\s/g, '');
  text = text.replace(/#\s/g, '');
  
  // Convert numbered lists to plain text
  text = text.replace(/^\d+\.\s+/gm, '• ');
  
  // Convert bullet points and asterisks to plain text
  text = text.replace(/^\*\s/gm, '• ');
  text = text.replace(/^\-\s/gm, '• ');
  
  // Remove any remaining markdown symbols
  text = text.replace(/\*\*/g, '');
  text = text.replace(/\*/g, '');
  text = text.replace(/`/g, '');
  text = text.replace(/>/g, '');
  
  // Add extra line breaks between sections
  text = text.replace(/\n\n/g, '\n\n');
  
  return text;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, persona } = await req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: persona.prompt + "\n\nIMPORTANT: You must provide responses in plain text only. DO NOT use any markdown formatting, symbols, or special characters. Format your responses like this:\n\nMain points should be on their own line.\n\nFor lists, use simple bullet points with a dot (•) at the start of the line:\n\n• Like this\n• And this\n\nAdd empty lines between different sections for readability.\n\nNever use markdown symbols like #, *, >, or `." 
          },
          ...messages.map(({ role, content }) => ({
            role,
            content,
          })),
        ],
      }),
    });

    const data = await response.json();
    console.log('OpenAI Response:', data);

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to get response from OpenAI');
    }

    // Format the response before sending it back
    const formattedResponse = {
      ...data,
      choices: [{
        ...data.choices[0],
        message: {
          ...data.choices[0].message,
          content: formatResponse(data.choices[0].message.content)
        }
      }]
    };

    return new Response(JSON.stringify(formattedResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});