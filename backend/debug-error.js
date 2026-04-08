import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

async function debug() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hi");
    console.log("Success:", result.response.text());
  } catch (e) {
    console.log("Full Error Object:", JSON.stringify(e, null, 2));
    console.log("Error Message:", e.message);
  }
}
debug();
