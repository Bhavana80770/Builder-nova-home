import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function test() {
  try {
    console.log("Testing Gemini API (v1) with key:", process.env.GEMINI_API_KEY ? "EXISTS" : "MISSING");
    
    // Explicitly try v1 if the default v1beta fails
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    
    // Attempting to use the model with v1
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: "v1" });
    
    try {
        const result = await model.generateContent("Say hello!");
        console.log("✅ Gemini (v1) Success:", result.response.text());
    } catch (err) {
        console.error("❌ Gemini (v1) Failed:", err.message);
        
        console.log("\nTrying v1beta explicitly...");
        const modelBeta = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: "v1beta" });
        const resultBeta = await modelBeta.generateContent("Say hello!");
        console.log("✅ Gemini (v1beta) Success:", resultBeta.response.text());
    }
  } catch (err) {
    console.error("General Failure:", err.message);
  }
}

test();


