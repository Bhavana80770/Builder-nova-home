const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    // There isn't a direct listModels in the client, but we can try to access one
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hi");
    console.log("Success with gemini-1.5-flash:", result.response.text());
  } catch (e) {
    console.error("Error with gemini-1.5-flash:", e.status, e.statusText);
    
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hi");
        console.log("Success with gemini-pro:", result.response.text());
    } catch (e2) {
        console.error("Error with gemini-pro:", e2.status, e2.statusText);
    }
  }
}

listModels();
