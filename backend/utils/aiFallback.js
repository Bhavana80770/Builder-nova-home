/**
 * Simple intelligent fallback for medical queries when Gemini API is unavailable.
 * Based on patterns detected in common health-related questions.
 */

const responses = {
    en: {
        greeting: "Hello! I'm NovaBot, your AI health assistant. I can help you with health concerns or guide you to our hospital departments. How can I assist you today?",
        fever: "I understand you have fever. Here's what you should do:\n\n• Rest and drink plenty of fluids\n• Take paracetamol if temperature is high\n• Monitor temperature regularly\n• If fever persists for more than 3 days, visit our hospital immediately.",
        headache: "For headache relief: Rest in a quiet room, stay hydrated, and avoid screen time. If the headache is severe or sudden, seek medical help.",
        stomach: "For stomach pain: Avoid solid food for a few hours, drink clear fluids, and rest. Seek help if the pain is severe or accompanied by fever.",
        emergency: "🚨 This sounds like an EMERGENCY! Please call 108 immediately or visit our emergency department.",
        default: "I understand your health concern. For better assistance, please describe your main symptoms and when they started. I can provide care tips and guide you to the right department."
    },
    hi: {
        greeting: "नमस्ते! मैं नोवा-बॉट हूं, आपका AI स्वास्थ्य सहायक। मैं आपकी स्वास्थ्य समस्याओं में मदद कर सकता हूं।",
        fever: "बुखार के लिए: आराम करें और खूब पानी पिएं। अगर बुखार 3 दिन से ज्यादा रहे तो अस्पताल आएं।",
        emergency: "🚨 यह एक आपातकाल लगता है! कृपया तुरंत 108 पर कॉल करें।"
    }
};

export const getFallbackChatResponse = (message, language = "English") => {
    const text = message.toLowerCase();
    const langCode = language.toLowerCase().includes("hindi") ? "hi" : "en";
    const currentLang = responses[langCode] || responses.en;

    if (text.includes("hi") || text.includes("hello") || text.includes("नमस्ते")) return currentLang.greeting;
    if (text.includes("fever") || text.includes("बुखार")) return currentLang.fever;
    if (text.includes("headache") || text.includes("सिर")) return currentLang.headache;
    if (text.includes("stomach") || text.includes("पेट")) return currentLang.stomach;
    if (text.includes("emergency") || text.includes("आपातकाल")) return currentLang.emergency;

    return currentLang.default + " (Note: Using fallback assistant)";
};
