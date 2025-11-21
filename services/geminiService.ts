import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize the client
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateNPCResponse = async (
  npcName: string,
  persona: string,
  history: ChatMessage[],
  userMessage: string
): Promise<string> => {
  if (!apiKey) {
    return "I seem to have lost my voice... (Missing API Key)";
  }

  try {
    // Construct a chat history context for the model
    // We only take the last few messages to keep context tight and tokens low
    const recentHistory = history.slice(-6).map(msg => 
      `${msg.isPlayer ? 'Player' : npcName}: ${msg.text}`
    ).join('\n');

    const fullPrompt = `
      ${persona}
      
      Current conversation:
      ${recentHistory}
      Player: ${userMessage}
      ${npcName}:
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        maxOutputTokens: 150, // Keep it short for game dialogue
        temperature: 0.7,
      }
    });

    return response.text || "...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm feeling a bit dizzy right now. Can we talk later?";
  }
};
