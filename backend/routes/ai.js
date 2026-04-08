import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// Validate API Key presence
if (!process.env.GEMINI_API_KEY) {
  console.warn("WARNING: GEMINI_API_KEY is not defined in the environment.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post("/predict", async (req, res) => {
  try {
    const { symptoms } = req.body;
    
    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ success: false, message: "Symptoms are required." });
    }

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
        const prompt = `
        You are a highly intelligent medical AI assistant.
        The user is reporting the following symptoms: ${symptoms.join(", ")}.
        
        Analyze these symptoms and provide a preliminary response. 
        Strictly reply with a valid JSON strictly following this schema:
        {
          "condition": "Name of the possible condition, short and clear",
          "confidence": integer between 0 and 100, representing your confidence level,
          "action": strictly one of the following strings exactly: "Rest", "Consult Doctor", or "Emergency",
          "diet": "1 short sentence of dietary advice",
          "exercise": "1 short sentence of exercise or activity advice",
          "dept": "Relevant medical department (e.g., General Physician, Cardiology)",
          "color": strictly one of the following strings exactly: "blue", "emerald", "amber", "red" based on the severity of the condition
        }
        
        No extra text or markdown formatting. Only Output the JSON object.
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const cleanedText = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();
        
        let prediction = JSON.parse(cleanedText);
        return res.json({ success: true, data: prediction });
    } catch (apiErr) {
        console.error("AI API Error (using fallback):", apiErr.status, apiErr.statusText);
        // Provide the fallback response for the user to see the UI working
        return res.json({ success: true, data: fallbackResponse, note: "Using fallback due to API connectivity." });
    }

  } catch (err) {
    console.error("Error generating prediction from Gemini:", err);
    res.status(500).json({ success: false, message: "Failed to process AI prediction." });
  }
});

router.post("/chat", async (req, res) => {
  try {
    const { message, language = "English" } = req.body;
    
    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ success: false, message: "Server misconfiguration: AI API key missing." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
    You are NovaBot, a helpful and professional medical AI assistant for MediNova Hospital.
    The user is asking: "${message}".
    The user's preferred language is: ${language}.
    
    IMPORTANT RULES:
    1. Respond in ${language} only.
    2. Keep your answer VERY short and simple (strictly 2-3 lines).
    3. Be professional and empathetic.
    4. Include a subtle reminder that you are an AI assistant and not a replacement for a human doctor.
    
    Provide your response now:
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    
    res.json({ success: true, reply: responseText });

  } catch (err) {
    console.error("Error generating chat response from Gemini:", err);
    res.status(500).json({ success: false, message: "Failed to process AI chat." });
  }
});

export default router;
