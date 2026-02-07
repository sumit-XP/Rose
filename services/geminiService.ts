
import { GoogleGenAI, Type } from "@google/genai";
import { PoemResponse, MessageMood } from "../types";

export const generateRomanticPoem = async (
  userName: string, 
  partnerName: string, 
  mood: MessageMood = 'Sincere'
): Promise<PoemResponse | null> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.warn("API_KEY is missing. Using fallback poem.");
    return getFallbackPoem(partnerName, userName);
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const moodPrompts = {
    'Sincere': "Write a romantic and sincere message for Rose Day. It should express deep admiration and affection, focusing on heartfelt connection and gratitude. It should feel personal and culminate in a sweet proposal to be a Valentine.",
    'Playful': "Write a fun, flirty, and slightly cheeky Rose Day message. Include puns about roses and a playful 'Will you be my Valentine?' at the end.",
    'Poetic': "Write a beautiful, metaphorical, and rhythmic Rose Day poem. Use imagery of blooming gardens and changing seasons to describe love, ending with a classic Valentine's proposal."
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Context: Rose Day 2025. 
      Sender: ${userName}. 
      Recipient: ${partnerName}. 
      Style: ${moodPrompts[mood]}. 
      Keep it between 60-100 words. Return as JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            poem: { type: Type.STRING }
          },
          required: ["title", "poem"]
        }
      }
    });

    const text = response.text;
    if (!text) return getFallbackPoem(partnerName, userName);
    return JSON.parse(text) as PoemResponse;
  } catch (error) {
    console.error("Error generating poem:", error);
    return getFallbackPoem(partnerName, userName);
  }
};

function getFallbackPoem(partnerName: string, userName: string): PoemResponse {
  return {
    title: "A Rose for My Everything",
    poem: `My Dearest ${partnerName},\n\nEvery rose in this world reminds me of your grace and beauty. You have filled my life with a color I never knew existed. \n\nWalking through this garden of reasons, I realize that words could never truly capture how much you mean to me. You are my heart, my soul, and my constant inspiration.\n\nOn this Rose Day, I give you my heart once again.`
  };
}
