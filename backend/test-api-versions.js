import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

async function testVersions() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const configs = [
    { model: "gemini-1.5-flash", version: "v1" },
    { model: "gemini-1.5-flash", version: "v1beta" },
    { model: "gemini-pro", version: "v1" }
  ];

  for (const config of configs) {
    try {
      console.log(`Testing ${config.model} with ${config.version}...`);
      const model = genAI.getGenerativeModel({ model: config.model }, { apiVersion: config.version });
      const result = await model.generateContent("Hi");
      console.log(`✅ Success with ${config.model} (${config.version}):`, result.response.text().substring(0, 20) + "...");
    } catch (e) {
      console.log(`❌ Failed ${config.model} (${config.version}):`, e.message);
    }
  }
}
testVersions();
