import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

async function testPrefix() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const models = ["models/gemini-1.5-flash", "gemini-1.5-flash"];

  for (const modelName of models) {
    try {
      console.log(`Testing with model name: "${modelName}"...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Hi");
      console.log(`✅ Success with "${modelName}":`, result.response.text().substring(0, 20) + "...");
    } catch (e) {
      console.log(`❌ Failed with "${modelName}":`, e.message);
    }
  }
}
testPrefix();
