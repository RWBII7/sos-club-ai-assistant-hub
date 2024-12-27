import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const mockResponses = {
  "viral-strategist": "For TikTok, I recommend creating short, engaging content that follows current trends. Start with a strong hook in the first 3 seconds!",
  "script-wizard": "Let's create an engaging script that captures attention immediately. Start with a surprising fact or question!",
  "calendar-builder": "I suggest posting 3 times per week on Instagram, focusing on educational content on Mondays, behind-the-scenes on Wednesdays, and engagement posts on Fridays.",
  "caption-master": "Here's a catchy caption: '✨ Transform your social media game! 🚀 Drop a 💡 below if you're ready to level up!'",
  "blog-pro": "For better SEO, make sure to include your main keyword in the title, first paragraph, and at least one subheading. Keep paragraphs short and engaging!",
  "graphics-generator": "Try using a bold color palette with complementary colors. For Instagram, maintain a consistent visual theme using similar filters or editing styles.",
  "email-assistant": "Start your email with a compelling subject line that creates curiosity. Keep the main message concise and end with a clear call-to-action.",
  "hashtag-optimizer": "Mix popular hashtags (#socialmedia #contentcreator) with niche-specific ones (#socialmediatips #contentstrategist) for better reach.",
  "monetization-coach": "Start by building a loyal community. Once you have 1000+ engaged followers, explore brand partnerships and create digital products.",
  "growth-specialist": "Focus on consistency and engagement. Post daily, respond to comments within 2 hours, and collaborate with creators in your niche."
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, persona } = await req.json();
    console.log('Demo mode: Using mock response for persona:', persona.name);

    // Create a mock response using the OpenAI API response format
    const mockResponse = {
      choices: [
        {
          message: {
            content: mockResponses[persona.id] || "I'm in demo mode right now, but I'd love to help you once we're fully operational!"
          }
        }
      ]
    };

    return new Response(JSON.stringify(mockResponse), {
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