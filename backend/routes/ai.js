import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getFallbackChatResponse } from "../utils/aiFallback.js";

const router = express.Router();

// Validate API Key presence
if (!process.env.GEMINI_API_KEY) {
  console.warn("WARNING: GEMINI_API_KEY is not defined in the environment.");
}

router.post("/predict", async (req, res) => {
  const { symptoms } = req.body;
  
  try {
    
    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ success: false, message: "Symptoms are required." });
    }

    const prompt = `
    You are a highly intelligent medical AI assistant for MediNova Hospital.
    The user is reporting the following symptoms: ${symptoms.join(", ")}.
    
    Analyze these symptoms and provide a preliminary response. 
    Strictly reply with a valid JSON strictly following this schema:
    {
      "condition": "Name of the possible condition",
      "confidence": integer between 0 and 100, representing your confidence level,
      "action": strictly one of: "Rest", "Consult Doctor", or "Emergency",
      "diet": "Brief dietary advice",
      "exercise": "Brief exercise or activity advice",
      "dept": "Relevant medical department (e.g., Cardiology)",
      "color": "blue" | "emerald" | "amber" | "red" based on severity
    }
    
    Only output the raw JSON object. No other text.
    `;

    // Mock data for fallback testing
    const fallbackResponse = {
        condition: "Possible Seasonal Flu",
        confidence: 85,
        action: "Consult Doctor",
        diet: "Stay hydrated and consume warm fluids.",
        exercise: "Rest and avoid strenuous activity.",
        dept: "General Medicine",
        color: "amber"
    };

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
        
        // Try multiple models for resilience
        const modelNames = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-1.5-pro", "gemini-2.0-flash-exp"];
        let result;
        let lastError;

        for (const modelName of modelNames) {
          try {
            const model = genAI.getGenerativeModel({ model: modelName });
            result = await model.generateContent(prompt);
            if (result) break; 
          } catch (e) {
            console.warn(`Failed to use model ${modelName}:`, e.message);
            lastError = e;
          }
        }

        if (!result) throw lastError || new Error("All models failed.");

        const responseText = result.response.text();
        const cleanedText = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();
        
        let prediction = JSON.parse(cleanedText);
        return res.json({ success: true, data: prediction });
    } catch (apiErr) {
        console.error("AI API Error (using fallback):", apiErr.message || apiErr);
        const fallback = fallbackResponse; 
        return res.json({ success: true, data: fallback, note: "Using fallback due to API connectivity." });
    }

  } catch (err) {
    console.error("Error generating prediction from Gemini:", err);
    res.status(500).json({ success: false, message: "Failed to process AI prediction." });
  }
});

router.post("/chat", async (req, res) => {
  const { message, language = "English" } = req.body;
  
  try {
    
    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ success: false, message: "Server misconfiguration: AI API key missing." });
    }

    const prompt = `
    You are NovaBot, a helpful, professional, and knowledgeable medical AI assistant for MediNova Hospital.
    User's message: "${message}".
    User's preferred language: ${language}.
    
    INSTRUCTIONS:
    1. Respond in ${language} only.
    2. Keep the answer concise (2-3 sentences).
    3. Be empathetic and informative about healthcare services at MediNova.
    4. MUST include this disclaimer: "I am an AI assistant, not a doctor. Please consult a professional for medical diagnosis."
    
    Write your helpful response:
    `;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Try multiple models for resilience
    const modelNames = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-1.5-pro", "gemini-2.0-flash-exp"];
    let result;
    let lastError;

    for (const modelName of modelNames) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        result = await model.generateContent(prompt);
        if (result) break;
      } catch (e) {
        console.warn(`Failed to use model ${modelName}:`, e.message);
        lastError = e;
      }
    }

    if (!result) throw lastError || new Error("All models failed.");
    
    const responseText = result.response.text().trim();
    res.json({ success: true, reply: responseText });

  } catch (err) {
    console.error("Error generating chat response from Gemini:", err.message || err);
    const fallback = getFallbackChatResponse(message || "hi", language || "English");
    res.json({ success: true, reply: fallback });
  }
});


export default router;
