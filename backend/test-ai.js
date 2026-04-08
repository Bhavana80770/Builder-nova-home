import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

async function runTest() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  console.log("Testing API Key:", process.env.GEMINI_API_KEY ? "EXISTS" : "MISSING");

  try {
    // Standard test
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hi");
    console.log("Success with gemini-1.5-flash ✅");
    console.log("Response:", result.response.text());
  } catch (e) {
    console.error("Error with gemini-1.5-flash ❌");
    console.error("Details:", e.message);
    
    console.log("\nAttempting to find available models...");
    // The fetch way to list models since SDK version might vary in behavior
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        const data = await response.json();
        if (data.models) {
            console.log("Available models:");
            data.models.forEach(m => console.log(`- ${m.name}`));
        } else {
            console.log("Could not list models. Data received:", JSON.stringify(data));
        }
    } catch (fetchErr) {
        console.error("Failed to fetch models list:", fetchErr.message);
    }
  }
}

runTest();


