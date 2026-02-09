
import { GoogleGenAI, Type } from "@google/genai";
import { CompanyInfo, GeneratedMail } from "../types";

export const generateColdMail = async (info: CompanyInfo): Promise<GeneratedMail> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "undefined") {
    throw new Error("API_KEY_MISSING");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const strategyDetails = {
    trust: "Focus on long-term partnership and credibility. Use the LinkedIn profile as social proof.",
    quality: "Focus on high-end craftsmanship, material sensitivity, and meticulous quality control (QC).",
    speed: "Focus on fast market response, low MOQ, and trend-driven production cycles."
  };

  const prompt = `
    You are a world-class Japanese Business Cold Mail Expert for the apparel ODM industry. 
    Your goal is to generate a mail that gets a RESPONSE. 

    STRATEGY: ${strategyDetails[info.mailStrategy]}
    
    CRITICAL GUIDELINES:
    1. Perfect Keigo: Use professional level business Japanese.
    2. High-Impact Subject: Use brackets like 【】 for clarity.
    3. The Hook: Explain why we contact THEM specifically: ${info.targetCompanyFeatures}.
    4. Social Proof: Link: ${info.linkedin}.
    5. Soft CTA: Ask to send a catalog/samples first.
    6. Urgancy: Mention limited production slots.

    INPUT:
    - Sender: ${info.senderName} (${info.myCompanyName})
    - Product: ${info.productCategory}
    - Strengths: ${info.keyStrengths.join(", ")}
    - Target: ${info.targetCompanyName}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject_ko: { type: Type.STRING },
            body_ko: { type: Type.STRING },
            subject_jp: { type: Type.STRING },
            body_jp: { type: Type.STRING },
            strategy_tip: { type: Type.STRING }
          },
          required: ["subject_ko", "body_ko", "subject_jp", "body_jp", "strategy_tip"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) throw new Error("AI_EMPTY_RESPONSE");
    
    return JSON.parse(resultText) as GeneratedMail;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
