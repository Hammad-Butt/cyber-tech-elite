
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";
import { ChatMessage } from "../types";

// Always initialize with the named apiKey parameter using process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getTechAdvice(userMessage: string, chatHistory: ChatMessage[]) {
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    You are a professional Tech Assistant for "CYBER-TECH Elite", a premium tech store.
    Your goal is to help customers find the best tech gadgets.
    Current available inventory: ${JSON.stringify(PRODUCTS.map(p => ({ name: p.name, category: p.category, price: p.price, specs: p.specs })))}
    
    Guidelines:
    1. Be concise, professional, and friendly.
    2. Recommend products from our inventory based on user needs.
    3. Explain WHY a product is good for their specific use case.
    4. If they ask for something not in stock, suggest the closest alternative from our list.
    5. Always maintain the "Cyberpunk/Modern Tech" brand voice.
  `;

  // Map history roles to Gemini roles: 'assistant' becomes 'model'
  const contents = [
    ...chatHistory.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    })),
    { role: 'user', parts: [{ text: userMessage }] }
  ];

  try {
    // Calling generateContent with model and prompt/contents together as per guidelines
    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    // Access .text property directly (not a method)
    return response.text || "I'm having trouble connecting to my neural network. Please try again later.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The system is currently undergoing maintenance. Please consult our catalog manually.";
  }
}
