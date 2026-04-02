const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Validate API Key presence
if (!process.env.GEMINI_API_KEY) {
  console.warn("WARNING: GEMINI_API_KEY is not defined in the environment.");
}

router.post("/predict", async (req, res) => {
  try {
    const { symptoms } = req.body;
    
    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ success: false, message: "Symptoms are required." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ success: false, message: "Server misconfiguration: AI API key missing." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
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
    
    // Process markdown removal if model includes codeblock formatting
    const cleanedText = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();
    
    let prediction;
    try {
        prediction = JSON.parse(cleanedText);
    } catch (e) {
        console.error("Failed to parse AI response:", responseText);
        return res.status(500).json({ success: false, message: "Failed to parse AI response." });
    }

    res.json({ success: true, data: prediction });

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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const prompt = `
    You are MediBot, a helpful and professional medical AI assistant for MediCare Hospital.
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

module.exports = router;
