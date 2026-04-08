import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Heart,
  ArrowLeft,
  Mic,
  MicOff,
  Volume2,
  Settings,
  LogOut,
  User,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
  language?: string;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: any) => void;
  onstart: () => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const VoiceChatbot = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMicrophoneSupported, setIsMicrophoneSupported] = useState(false);
  const [microphoneError, setMicrophoneError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check if this is a free consultation
  const urlParams = new URLSearchParams(window.location.search);
  const isFreeConsultation = urlParams.get("free") === "true";

  // Language options with native names
  const languages = [
    { code: "en-US", name: "English", nativeName: "English" },
    { code: "hi-IN", name: "Hindi", nativeName: "हिन्दी" },
    { code: "bn-IN", name: "Bengali", nativeName: "বাংলা" },
    { code: "ta-IN", name: "Tamil", nativeName: "தமிழ்" },
    { code: "te-IN", name: "Telugu", nativeName: "తెలుগু" },
  ];

  // Clear error state on component mount and ensure clean start
  useEffect(() => {
    setMicrophoneError(null);
    setIsMicrophoneSupported(true); // Assume supported until proven otherwise
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    // Force clear any previous errors on initialization
    setMicrophoneError(null);

    // Check browser support
    const isSupported =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
    setIsMicrophoneSupported(isSupported);

    if (!isSupported) {
      console.warn("Speech Recognition not supported in this browser");
      // Only show message, don't set error state
      addAssistantMessage(
        "Voice recognition is not supported in your browser. Please use Google Chrome for voice features, or use the chat interface instead.",
      );
    }

    // Add initial greeting
    if (messages.length === 0) {
      addAssistantMessage(
        "Hello! I'm NovaBot, your AI health assistant. How can I help you today? You can speak in your preferred language.",
      );
    }

    // Don't initialize speech recognition here - do it when user clicks microphone
    console.log("VoiceChatbot initialized");

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.log("Error stopping recognition:", error);
        }
      }
    };
  }, [selectedLanguage]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addAssistantMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "assistant",
      timestamp: new Date(),
      language: selectedLanguage,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleUserMessage = async (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
      language: selectedLanguage,
    };
    setMessages((prev) => [...prev, userMessage]);

    // Process the message and generate response
    setIsProcessing(true);
    
    let response = "";
    try {
      const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
      const apiResponse = await fetch(`${API_BASE}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: text, 
          language: languages.find(l => l.code === selectedLanguage)?.name || "English" 
        }),
      });

      const data = await apiResponse.json();
      if (data.success && data.reply) {
        response = data.reply;
      } else {
        // Fallback to local logic if API fails or returns error
        response = generateResponse(text);
      }
    } catch (error) {
      console.error("AI API Error:", error);
      // Fallback to local logic on network error
      response = generateResponse(text);
    }

    addAssistantMessage(response);
    setIsProcessing(false);


    // Check if it's an emergency and show quick action
    if (
      text.includes("emergency") ||
      text.includes("urgent") ||
      text.includes("आपातकाल") ||
      text.includes("জরুরি") ||
      text.includes("அவசரம்") ||
      text.includes("అత్యవసర") ||
      response.includes("108") ||
      response.includes("emergency")
    ) {
      // Auto-prompt for emergency call after 3 seconds
      setTimeout(() => {
        const langCode = selectedLanguage.split("-")[0];
        const messages = {
          en: "Should I dial 108 emergency number for you now?",
          hi: "क्या मैं अभी आपके लिए 108 आपातकालीन नंबर डायल करूं?",
          bn: "আমি কি এখনই আপনার জন্য 108 জরুরি নম্বর ডায়াল করব?",
          ta: "நான் இப்போது உங்களுக்காக 108 அவசர எண்ணை டயல் செய்யட்டுமா?",
          te: "నేను ఇప్పుడే మీ కోసం 108 అత్యవసర నంబర్ డ���ల్ చేయాలా?",
        };

        const message = messages[langCode] || messages.en;

        if (confirm(message)) {
          makeEmergencyCall();
        }
      }, 3000);
    }

    // Speak the response if language is supported
    speakText(response, selectedLanguage);
  };

  const detectLanguage = (text: string): string => {
    // Simple language detection based on script and common words
    if (/[\u0900-\u097F]/.test(text)) return "hi"; // Devanagari script (Hindi)
    if (/[\u0980-\u09FF]/.test(text)) return "bn"; // Bengali script
    if (/[\u0B80-\u0BFF]/.test(text)) return "ta"; // Tamil script
    if (/[\u0C00-\u0C7F]/.test(text)) return "te"; // Telugu script

    // Check for common words in different languages
    if (
      text.includes("नमस्ते") ||
      text.includes("हैलो") ||
      text.includes("मैं")
    )
      return "hi";
    if (
      text.includes("হ্যালো") ||
      text.includes("আমি") ||
      text.includes("কেমন")
    )
      return "bn";
    if (
      text.includes("வணக்கம்") ||
      text.includes("நான்") ||
      text.includes("எப்படி")
    )
      return "ta";
    if (text.includes("హలో") || text.includes("నేను") || text.includes("ఎలా"))
      return "te";

    return "en"; // Default to English
  };

  const generateResponse = (userText: string): string => {
    const text = userText.toLowerCase();
    const detectedLang = detectLanguage(userText);
    const langCode = detectedLang || selectedLanguage.split("-")[0];

    // Language-specific responses
    const responses = {
      en: {
        greeting:
          "Hello! I'm NovaBot, your AI health assistant. I can help you with health concerns, provide medical information, or guide you to our hospital departments. How can I assist you today?",
        fever:
          "I understand you have fever. Here's what you should do:\n\n• Rest and drink plenty of fluids\n• Take paracetamol (500mg) every 6 hours if temperature is above 100°F\n• Use cold compress on forehead\n• Monitor temperature regularly\n• If fever persists for more than 3 days or goes above 103°F, visit our hospital immediately.",
        headache:
          "For headache relief, try these steps:\n\n• Rest in a quiet, dark room\n• Apply cold or warm compress to head/neck\n• Stay hydrated - drink water\n• Take paracetamol 500mg if needed\n• Avoid screen time\n• Try gentle neck stretches\n\nIf headache is severe, sudden, or with fever/vision problems, seek immediate medical help.",
        stomach:
          "For stomach pain, here are immediate care tips:\n\n• Avoid solid food for 2-3 hours\n• Drink clear fluids (water, clear soup)\n• Try BRAT diet: Bananas, Rice, Applesauce, Toast\n• Avoid dairy, spicy, or fatty foods\n• Rest and avoid stress\n\nSeek immediate help if you have:\n• Severe pain\n• Blood in vomit/stool\n• High fever\n• Signs of dehydration",
        cough:
          "For cough relief:\n\n• Drink warm water with honey and lemon\n• Stay hydrated\n• Use steam inhalation (hot water vapors)\n• Avoid cold drinks and ice cream\n• Sleep with head elevated\n• Avoid smoking and dust\n\nConsult a doctor at our clinic if:\n• Cough persists more than 2 weeks\n• Blood in sputum\n• High fever\n• Breathing difficulty",
        cold: "For cold and flu symptoms:\n\n• Rest and sleep well\n• Drink warm fluids (tea, soup, warm water)\n• Gargle with warm salt water\n• Use steam inhalation\n• Take vitamin C rich foods\n• Wash hands frequently\n\nAvoid antibiotics unless prescribed. Visit our hospital if symptoms worsen or persist beyond 7 days.",
        doctor:
          "You can visit our hospital to meet our qualified specialists. We have various departments including Cardiology, Neurology, and Pediatrics. We are open 24/7 for your care.",
        emergency:
          "🚨 This sounds like an EMERGENCY! \n\nFor immediate help:\n📞 Call 108 (National Emergency)\n📞 Call 102 (Medical Emergency)\n\nEmergency signs:\n• Chest pain\n• Difficulty breathing\n• Severe bleeding\n• Unconsciousness\n• Severe burns\n\nShould I dial 108 for you right now?",
        diabetes:
          "For diabetes management:\n\n• Monitor blood sugar regularly\n• Follow prescribed medication schedule\n• Eat balanced meals with controlled portions\n• Exercise regularly (30 min daily)\n• Stay hydrated\n• Avoid sugary foods and drinks\n\nSeek immediate help if:\n• Blood sugar very high (>300) or very low (<70)\n• Persistent vomiting\n• Severe dehydration\n• Confusion or unconsciousness",
        pressure:
          "For blood pressure concerns:\n\n• Take medication as prescribed\n• Reduce salt intake\n• Exercise regularly\n• Manage stress\n• Limit alcohol\n• Maintain healthy weight\n• Monitor BP regularly\n\nSeek immediate help if:\n• BP very high (>180/120)\n• Severe headache with BP\n• Chest pain or shortness of breath\n• Vision problems",
        pregnancy:
          "For pregnancy-related concerns:\n\n• Take prenatal vitamins\n• Eat nutritious food\n• Stay hydrated\n• Get regular checkups at our maternity wing\n• Avoid alcohol and smoking\n• Get adequate rest\n• Exercise as advised by doctor\n\nSeek immediate help if:\n• Severe abdominal pain\n• Heavy bleeding\n• Severe headache or vision changes\n• Persistent vomiting\n• No fetal movement",
        mental:
          "For mental health support:\n\n• Talk to someone you trust\n• Practice deep breathing\n• Maintain regular sleep schedule\n• Exercise regularly\n• Eat balanced meals\n• Limit alcohol and caffeine\n• Practice mindfulness\n\nSeek help at our psychiatric department if experiencing:\n• Persistent sadness or anxiety\n• Thoughts of self-harm\n• Unable to function daily\n• Substance abuse",
        default:
          "I understand your health concern. For better assistance, please describe:\n\n• Your main symptoms\n• When did it start?\n• How severe is it (1-10)?\n• Any other related issues?\n\nI can provide immediate care tips and guide you to the right department at our hospital.",
      },
      hi: {
        greeting:
          "नमस्ते! मैं नोवा-बॉट (NovaBot) हूं, आपका AI स्वास्थ्य सहायक। मैं आपकी स्वास्थ्य समस्याओं में मदद कर सकता हूं, चिकित्सा जानकारी प्रदान कर सकता हूं, या हमारे अस्पताल के विभागों तक आपका मार्गदर्शन कर सकता हूं। आज मैं आपकी कैसे सेवा कर सकता हूं?",
        fever:
          "मैं समझ गया कि आपको बुखार है। यह करें:\n\n• आराम करें और खूब पानी पिएं\n• अगर बुखार 100°F से ज्यादा है तो हर 6 घंटे में पैरासिटामोल (500mg) लें\n• माथे पर ठंडी पट्टी रखें\n• नियमित तापमान चेक करें\n• अगर बुखार 3 दिन से ज्यादा रहे या 103°F से ज्यादा हो तो तुरंत हमारे अस्पताल आएं।",
        headache:
          "सिर दर्द के लिए यह करें:\n\n• शांत, अंधेरे कमरे में आराम करें\n• सिर/गर्दन पर ठंडी या गर्म पट्टी लगाएं\n• खूब पानी पिएं\n• जरूरत हो तो पैरासिटामोल 500mg लें\n• स्क्रीन से दूर रहें\n• गर्दन की हल्की स्ट्रेचिंग करें\n\nअगर सिर दर्द तेज़, अचानक, या बुखार/दिखने में समस्या के साथ है तो तुरंत चिकित्सा सहायता लें।",
        stomach:
          "पेट दर्द के लिए तुरंत यह करें:\n\n• 2-3 घंटे तक ठोस खाना न खाएं\n• साफ तरल पदार्थ पिएं (पानी, साफ सूप)\n• BRAT डाइट लें: केला, चावल, सेब का सॉस, टोस्ट\n• दूध, मसालेदार या तैलीय खाना न खाएं\n• आराम करें और तनाव न लें\n\nतुरंत मदद लें अगर:\n• तेज़ दर्द हो\n• उल्टी/मल में खून हो\n• तेज़ बुखार हो\n• डिहाइड्रेशन के लक्षण हों",
        cough:
          "खांसी के लिए:\n\n• शहद और नींबू के साथ गर्म पानी पिएं\n• खूब पानी पिएं\n• भाप लें (गर्म पानी की भाप)\n• ठंडे पेय और आइसक्रीम से बचें\n• सिर ऊंचा करके सोएं\n• धूम्रपान और धूल से बचें\n\nहमारे अस्पताल में डॉक्टर से मिलें अगर:\n• खांसी 2 हफ्ते से ज्यादा रहे\n• कफ में खून आए\n• तेज़ बुखार हो\n• सांस लेने में दिक्कत हो",
        cold: "सर्दी-जुकाम के लिए:\n\n• आराम करें और अच्छी नींद लें\n• गर्म तरल पदार्थ पिएं (चाय, सूप, गर्म पानी)\n• गर्म नमक के पानी से गरारे करें\n• भाप लें\n• विटामिन C वाले फल खाएं\n• बार-बार हाथ धोएं\n\nबिना डॉक्टर की सलाह के एंटीबायोटिक न लें। अगर लक्षण 7 दिन से ज्यादा रहें तो हमारे अस्पताल आएं।",
        doctor:
          "आप हमारे योग्य विशेषज्ञों से मिलने के लिए हमारे अस्पताल आ सकते हैं। हमारे यहाँ हृदय रोग, तंत्रिका विज्ञान और बाल रोग सहित विभिन्न विभाग हैं। हम आपकी सेवा के लिए 24/7 खुले हैं।",
        emergency:
          "🚨 यह एक आपातकाल लगता है!\n\nतत्काल मदद के लिए:\n📞 108 कॉल करें (राष्ट्रीय आपातकाल)\n📞 102 कॉल करें (चिकित्सा आपातकाल)\n\nआपातकालीन संकेत:\n• छाती में दर्द\n• सांस लेने में कठिनाई\n• अधिक खून बहना\n• बेहोशी\n• गंभीर जलन",
        default:
          "मैं आपकी स्वास्थ्य चिंता समझ गया। बेहतर सहायता के लिए बताएं:\n\n• आपके मुख्य लक्षण क्या हैं?\n• यह कब शुरू हुआ?\n• कितना गंभीर है (1-10)?\n• कोई अन्य संबंधित समस्या?\n\nमैं तुरंत देखभाल की सलाह दे सकता हूं और हमारे अस्पताल में सही विभाग के लिए आपका मार्गदर्शन कर सकता हूं।",
      },
      bn: {
        greeting:
          "হ্যালো! আমি নোভা-বট (NovaBot), আপনার AI স্বাস্থ্য সহায়ক। আমি আপনার স্বাস্থ্য সমস্যায় সাহায্য করতে পারি, চিকিৎসা তথ্য প্রদান করতে পারি বা আমাদের হাসপাতালের বিভাগগুলোতে আপনার পথপ্রদর্শন করতে পারি। আজ আমি কীভাবে আপনাকে সাহায্য করতে পারি?",
        fever:
          "আমি বুঝতে পারছি আপনার জ্বর হয়েছে। এটি করুন:\n\n• বিশ্রাম নিন এবং প্রচুর পানি পান করুন\n• জ্বর 100°F এর বেশি হলে প্রতি 6 ঘন্টায় প্যারাসিটামল (500mg) খান\n• কপালে ঠান্ডা কাপড় দিন\n• নিয়মিত তাপমাত্রা পরীক্ষা করুন\n• জ্বর 3 দিনের বেশি থাকলে বা 103°F এর বেশি হলে অবিলম্বে আমাদের হাসপাতালে আসুন।",
        headache:
          "মাথাব্যথার জন্য এগুলো করুন:\n\n• শান্ত, অন্ধকার ঘরে বিশ্রাম নিন\n• মাথা/ঘাড়ে ঠান্ডা বা গরম কাপড় দিন\n• প্রচুর পানি পান করুন\n• প্রয়োজনে প্যারাসিটামল 500mg খান\n• স্ক্রিন থেকে দূরে থাকুন\n• ঘাড়ের হালকা ব্যায়াম করুন\n\nমাথাব্যথা যদি তীব্র, হঠাৎ, বা জ্বর/দৃষ্টি সমস্যার সাথে হয় তাহলে অবিলম্বে চিকিৎসা নিন।",
        stomach:
          "পেটের ব্যথার জন্য তাৎক্ষণিক যত্ন:\n\n• 2-3 ঘন্টা শক্ত খাবার এড়িয়ে চলুন\n• পরিষ্কার তরল পান করুন (পানি, পরিষ্কার স্যুপ)\n• BRAT ডায়েট: কলা, ভাত, আপেল সস, টোস্ট\n• দুধ, মসলাদার বা তৈলাক্ত খাবার এড়িয়ে চলুন\n• বিশ্রাম নিন এবং চাপ এড়িয়ে চলুন\n\nঅবিলম্বে সাহায্য নিন যদি:\n• তীব্র ব্যথা হয়\n• বমি/মলে রক্ত থাকে\n• উচ্চ জ্বর হয়\n• ডিহাইড্রেশনের লক্ষণ থাকে",
        doctor:
          "আপনি আমাদের যোগ্য বিশেষজ্ঞদের সাথে দেখা করতে আমাদের হাসপাতালে আসতে পারেন। আমাদের কার্ডিওলজি, নিউরোলজি এবং পেডিয়াট্রিক্স সহ বিভিন্ন বিভাগ রয়েছে। আমরা আপনার সেবার জন্য 24/7 খোলা আছি।",
        emergency:
          "🚨 এটি একটি জরুরি অবস্থা মনে হচ্ছে!\n\nতৎক্ষণাৎ সাহায্যের জন্য:\n📞 108 কল করুন (জাতীয় জরুরি)\n📞 102 কল করুন (চিকিৎসা জরুরি)\n\nজরুরি লক্ষণ:\n• বুকে ব্যথা\n• শ্বাসকষ্ট\n• অতিরিক্ত রক্তপাত\n• অজ্ঞান হওয়া\n• গুরুতর পোড়া",
        default:
          "আমি আপনার স্বাস্থ্য সমস্যা বুঝতে পারছি। ভাল সাহায্যের জন্য বলুন:\n\n• আপনার প্রধান লক্ষণ কী?\n• এটি কখন শুরু হয়েছে?\n• কতটা গুরুতর (1-10)?\n• অন্য কোন সংশ্লিষ্ট সমস্যা?\n\nআমি তাৎক্ষণিক যত্নের পরামর্শ দিতে পারি এবং আমাদের হাসপাতালে সঠিক বিভাগের জন্য আপনার পথপ্রদর্শন করতে পারি।",
      },
      ta: {
        greeting:
          "வணக்கம்! நான் நோவா-பாட் (NovaBot), உங்கள் AI ஆரோக்ய உதவியாளர். உங்கள் ஆரோக்ய பிரச்சனைகளில் உதவ முடியும், மருத்துவ தகவல்களை வழங்க முடியும், அல்லது எங்கள் மருத்துவமனை துறைகளுக்கு உங்களை வழிநடத்த முடியும். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
        fever:
          "உங்களுக்கு காய்ச்சல் இருப்பது புரிகிறது. இதை செய்யுங்கள்:\n\n• ஓய்வெடுத்து நிறைய தண்ணீர் குடியுங்கள்\n• காய்ச்சல் 100°F க்கு மேல் இருந்தால் 6 மணி நேரத்திற்கு ஒருமுறை பாராசிட்டமால் (500mg) எடுங்கள்\n• நெற்றியில் குளிர்ந்த துணி வையுங்கள்\n• வெப்பநிலையை தொடர்ந்து சரிபார்க்கவும்\n• காய்ச்சல் 3 நாட்களுக்கு மேல் நீடித்தால் அல்லது 103°F க்கு மேல் சென்றால் உடனே எங்கள் மருத்துவமனைக்கு வாருங்கள்.",
        headache:
          "தலைவலிக்கு இதை செய்யுங்கள்:\n\n• அமைதியான, இருண்ட அறையில் ஓய்வெடுங்கள்\n• தலை/கழுத்தில் குளிர்ந்த அல்லது சூடான துணி வையுங்கள்\n• நிறைய தண்ணீர் குடியுங்கள்\n• தேவைப்பட்டால் பாராசிட்டமால் 500mg எடுங்கள்\n• திரையிலிருந்து விலகி இருங்கள்\n• கழுத்தின் லேசான பயிற்சி செய்யுங்கள்\n\nதலைவலி கடுமையானதாக, திடீரென்று, அல்லது காய்ச்சல்/பார்வை பிரச்சனையுடன் இருந்தால் உடனே மருத்துவ உதவி பெறுங்கள்.",
        stomach:
          "வயிற்று வலிக்கு உடனடி கவனிப்பு:\n\n• 2-3 மணி நேரம் திட உணவை தவிர்க்கவும்\n• தெளிவான திரவங்கள் குடியுங்கள் (தண்ணீர், தெளிவான சூப்)\n• BRAT உணவு: வாழைப்பழம், அரிசி, ஆப்பிள் சாஸ், டோஸ்ட்\n• பால், காரமான அல்லது எண்ணெய் உணவை தவிர்க்கவும்\n• ஓய்வெடுத்து மன அழுத்தத்தை தவிர்க்கவும்\n\nஉடனடி உதவி பெறுங்கள் இது இருந்தால்:\n• கடுமையான வலி\n• வாந்தி/மலத்தில் இரத்தம்\n• அதிக காய்ச்சல்\n• நீரிழப்பு அறிகுறிகள்",
        doctor:
          "எங்கள் தகுதிவாய்ந்த நிபுணர்களைச் சந்திக்க நீங்கள் எங்கள் மருத்துவமனைக்கு வரலாம். எங்களிடம் கார்டியாலஜி, நியூராலஜி மற்றும் பீடியாட்ரிக்ஸ் உள்ளிட்ட பல்வேறு துறைகள் உள்ளன. உங்கள் சேவைக்காக நாங்கள் 24/7 திறந்திருக்கிறோம்.",
        emergency:
          "🚨 இது அவசரநிலை போல் தெரிகிறது!\n\nஉடனடி உதவிக்கு:\n📞 108 அழைக்கவும் (தேசிய அவசரநிலை)\n📞 102 அழைக்கவும் (மருத்துவ அவசரநிலை)\n\nஅவசர அறிகுறிகள்:\n• மார்பு வலி\n• மூச்சுத்திணறல்\n• கடுமையான இரத்தப்போக்கு\n• மயக்கம்\n• கடுமையான தீப்பிடிப்பு",
        default:
          "உங்கள் ஆரோக்ய கவலை புரிகிறது. சிறந்த உதவிக்காக சொல்லுங்கள்:\n\n• உங்கள் முக்கிய அறிகுறிகள் என்ன?\n• இது எப்போது தொடங்கியது?\n• எவ்வளவு கடுமையானது (1-10)?\n• வேறு ஏதேனும் தொடர்புடைய பிரச்சனை?\n\nநான் உடனடி கவனிப்பு ஆலோசனை வழங்க முடியும் மற்றும் எங்கள் மருத்துவமனையில் சரியான துறைக்கு உங்களை வழிநடத்த முடியும்.",
      },
      te: {
        greeting:
          "హలో! నేను నోవా-బాట్ (NovaBot), మీ AI ఆరోగ్య సహాయకుడిని. నేను మీ ఆరోగ్య సమస్యలలో సహాయం చేయగలను, వైద్య సమాచారాన్ని అందించగలను లేదా మా ఆసుపత్రి విభాగాలకు మీకు మార్గనిర్దేశం చేయగలను. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?",
        fever:
          "మీకు జ్వరం వచ్చిందని అర్థమైంది. ఇలా చేయండి:\n\n• విశ్రమించి చాలా నీళ్లు తాగండి\n• జ్వరం 100°F కంటే ఎక్కువ ఉంటే 6 గంటలకు ఒకసారి పారాసిటమాల్ (500mg) తీసుకోండి\n• నుదిటిపై చల్లని గుడ్డ వేయండి\n• ఉష్ణోగ్రతను క్రమం తప్పకుండా తనిఖీ చేయండి\n• జ్వరం 3 రోజులకు మించి ఉంటే లేదా 103°F కంటే ఎక్కువ అయితే వెంటనే మా ఆసుపత్రికి రండి.",
        headache:
          "తలనొప్పికి ఇలా చేయండి:\n\n• నిశ్శబ్ద, చీకటి గదిలో విశ్రమించండి\n• తల/మెడపై చల్లని లేదా వేడిమైన గుడ్డ వేయండి\n• చాలా నీళ్లు తాగండి\n• అవసరమైతే పారాసిటమాల్ 500mg తీసుకోండి\n• స్క్రీన్ నుండి దూరంగా ఉండండి\n• మెడ యొక్క తేలికపాటి వ్యాయామాలు చేయండి\n\nతలనొప్పి తీవ్రంగా, అకస్మాత్తుగా లేదా జ్వరం/దృష్టి సమస్యలతో ఉంటే వెంటనే వైద్య సహాయం పొందండి.",
        stomach:
          "కడుపు నొప్పికి తక్షణ సంరక్షణ:\n\n• 2-3 గంటలపాటు దృఢమైన ఆహారాన్ని తవ్వండి\n• స్పష్టమైన ద్రవాలు తాగండి (నీళ్లు, స్పష్టమైన సూప్)\n• BRAT ఆహారం: అరటిపండు, అన్నం, ఆపిల్ సాస్, టోస్ట్\n• పాలు, కారంమసాలా లేదా నూనె ఆహారాన్ని తవ్వండి\n• విశ్రమించి ఒత్తిడిని తవ్వండి\n\nతక్షణ సహాయం పొందండి ఇవి ఉంటే:\n• తీవ్రమైన నొప్పి\n• వాంతి/మలంలో రక్తం\n• అధిక జ్వరం\n• నిర్జలీకరణ లక్షణాలు",
        doctor:
          "మా అర్హులైన నిపుణులను కలవడానికి మీరు మా ఆసుపత్రికి రావచ్చు. మా దగ్గర కార్డియాలజీ, న్యూరాలజీ మరియు పీడియాట్రిక్స్‌తో సహా వివిధ విభాగాలు ఉన్నాయి. మేము మీ సేవ కోసం 24/7 అందుబాటులో ఉన్నాము.",
        emergency:
          "🚨 ఇది అత్యవసర పరిస్థితిలా అనిపిస్తుంది!\n\nతక్షణ సహాయం కోసం:\n📞 108 కాల్ చేయండి (జాతీయ అత్యవసరం)\n📞 102 కాల్ చేయండి (వైద్య అత్యవసరం)\n\nఅత్యవసర సంకేతాలు:\n• ఛాతీ నొప్పి\n• ఊపిరాడక\n• తీవ్రమైన రక్తస్రావం\n• మూర్ఛ\n• తీవ్రమైన కాలిపోవడం",
        default:
          "మీ ఆరోగ్య ఆందోళన అర్థమైంది. మెరుగైన సహాయం కోసం చెప్పండి:\n\n• మీ ప్రధాన లక్షణాలు ఏమిటి?\n• ఇది ఎప్పుడు మొదలైంది?\n• ఎంత తీవ్రమైనది (1-10)?\n• ఏదైనా ఇతర సంబంధిత సమస్య?\n\nనేను తక్షణ సంరక్షణ సలహా ఇవ్వగలను మరియు మా ఆసుపత్రిలో సరైన విభాగానికి మీకు మార్గనిర్దేశం చేయగలను.",
      },
    };

    const currentLang = responses[langCode] || responses.en;

    // Greetings in multiple languages
    if (
      text.includes("hi") ||
      text.includes("hello") ||
      text.includes("hey") ||
      text.includes("नमस्ते") ||
      text.includes("हैलो") ||
      text.includes("হাই") ||
      text.includes("হ্যালো") ||
      text.includes("வணக்கம்") ||
      text.includes("ஹாய்") ||
      text.includes("హాయ్") ||
      text.includes("హలో")
    ) {
      return currentLang.greeting;
    }

    // Health-related queries with detailed solutions
    if (
      text.includes("fever") ||
      text.includes("बुखार") ||
      text.includes("জ্বর") ||
      text.includes("காய்ச்சல்") ||
      text.includes("జ్వరము")
    ) {
      return currentLang.fever;
    }

    if (
      text.includes("headache") ||
      text.includes("सिरदर्द") ||
      text.includes("মাথাব্যথা") ||
      text.includes("தலைவலி") ||
      text.includes("తలనొప్పి")
    ) {
      return currentLang.headache;
    }

    if (
      text.includes("stomach") ||
      text.includes("pain") ||
      text.includes("पेट") ||
      text.includes("পেট") ||
      text.includes("வயிற்று") ||
      text.includes("కడుపు")
    ) {
      return currentLang.stomach;
    }

    if (
      text.includes("cough") ||
      text.includes("खांसी") ||
      text.includes("ক���শি") ||
      text.includes("இருமல்") ||
      text.includes("దగ్గు")
    ) {
      return currentLang.cough;
    }

    if (
      text.includes("cold") ||
      text.includes("flu") ||
      text.includes("सर्दी") ||
      text.includes("জুকাম") ||
      text.includes("சளி") ||
      text.includes("జలుబు")
    ) {
      return currentLang.cold;
    }

    if (
      text.includes("doctor") ||
      text.includes("डॉक्टर") ||
      text.includes("ডাক্তার") ||
      text.includes("மருத்துவர்") ||
      text.includes("వైద్యుడు")
    ) {
      return currentLang.doctor;
    }

    if (
      text.includes("diabetes") ||
      text.includes("sugar") ||
      text.includes("मधुमेह") ||
      text.includes("চিনি") ||
      text.includes("சர்க்கரை") ||
      text.includes("చక్కెర")
    ) {
      return currentLang.diabetes || currentLang.default;
    }

    if (
      text.includes("pressure") ||
      text.includes("bp") ||
      text.includes("hypertension") ||
      text.includes("रक्तचाप") ||
      text.includes("চাপ") ||
      text.includes("அழுத்தம்") ||
      text.includes("ఒత్తిడి")
    ) {
      return currentLang.pressure || currentLang.default;
    }

    if (
      text.includes("pregnancy") ||
      text.includes("pregnant") ||
      text.includes("गर्भावस्था") ||
      text.includes("গর্ভাবস্থা") ||
      text.includes("கர்ப்பம்") ||
      text.includes("గర్భం")
    ) {
      return currentLang.pregnancy || currentLang.default;
    }

    if (
      text.includes("depression") ||
      text.includes("anxiety") ||
      text.includes("stress") ||
      text.includes("mental") ||
      text.includes("अवसाद") ||
      text.includes("বিষণ্নতা") ||
      text.includes("மன") ||
      text.includes("మానసిక")
    ) {
      return currentLang.mental || currentLang.default;
    }

    if (
      text.includes("emergency") ||
      text.includes("urgent") ||
      text.includes("आपातकाल") ||
      text.includes("জরুরি") ||
      text.includes("அவசரம்") ||
      text.includes("అత్యవసర")
    ) {
      return currentLang.emergency;
    }

    // Default response
    return currentLang.default;
  };

  const speakText = (text: string, language: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = 0.8;
      utterance.pitch = 1;

      // Find available voices for the language
      const voices = speechSynthesis.getVoices();
      const voice = voices.find((v) =>
        v.lang.startsWith(language.split("-")[0]),
      );
      if (voice) {
        utterance.voice = voice;
      }

      speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = async () => {
    if (isListening) {
      try {
        recognitionRef.current?.stop();
        setMicrophoneError(null);
      } catch (error) {
        console.error("Error stopping recognition:", error);
        setIsListening(false);
      }
    } else {
      try {
        // Clear previous errors
        setMicrophoneError(null);

        // Initialize speech recognition if not already done
        if (!recognitionRef.current) {
          if (
            "SpeechRecognition" in window ||
            "webkitSpeechRecognition" in window
          ) {
            const SpeechRecognition =
              window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();

            const recognition = recognitionRef.current;
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = selectedLanguage;

            recognition.onstart = () => {
              console.log("Speech recognition started");
              setIsListening(true);
              setCurrentTranscript("");
              setMicrophoneError(null);
            };

            recognition.onresult = (event: SpeechRecognitionEvent) => {
              let finalTranscript = "";
              let interimTranscript = "";

              for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                  finalTranscript += transcript;
                } else {
                  interimTranscript += transcript;
                }
              }

              setCurrentTranscript(interimTranscript);

              if (finalTranscript) {
                handleUserMessage(finalTranscript.trim());
                setCurrentTranscript("");
              }
            };

            recognition.onerror = (event) => {
              console.error("Speech recognition error:", event.error);
              setIsListening(false);
              setCurrentTranscript("");

              if (isListening) {
                let errorMessage = "Voice recognition encountered an error. ";
                switch (event.error) {
                  case "not-allowed":
                    errorMessage +=
                      "Please click 'Allow' when asked for microphone permission.";
                    setMicrophoneError("Click 'Allow' for microphone");
                    break;
                  case "no-speech":
                    errorMessage +=
                      "No speech was detected. Please try speaking again.";
                    setMicrophoneError("No speech detected");
                    break;
                  case "audio-capture":
                    errorMessage +=
                      "No microphone was found. Please check your microphone connection.";
                    setMicrophoneError("No microphone found");
                    break;
                  case "network":
                    errorMessage +=
                      "Network error occurred. Please check your internet connection.";
                    setMicrophoneError("Network error");
                    break;
                  default:
                    errorMessage +=
                      "Please try again or use the chat interface.";
                    setMicrophoneError("Recognition error");
                }

                addAssistantMessage(errorMessage);
              }
            };

            recognition.onend = () => {
              console.log("Speech recognition ended");
              setIsListening(false);
            };
          } else {
            setMicrophoneError("Browser not supported");
            addAssistantMessage(
              "Voice recognition is not supported in this browser. Please use Chrome or Edge.",
            );
            return;
          }
        }

        // Start speech recognition - this will trigger permission prompt
        recognitionRef.current.lang = selectedLanguage;
        recognitionRef.current.start();
      } catch (error: any) {
        console.error("Speech recognition start error:", error);
        setMicrophoneError("Failed to start");
        addAssistantMessage(
          "Failed to start voice recognition. Please try again or use the chat interface.",
        );
        setIsListening(false);
      }
    }
  };

  const makeEmergencyCall = () => {
    // Show confirmation dialog in user's language
    const langCode = selectedLanguage.split("-")[0];
    const confirmMessages = {
      en: "Do you want to call emergency services (108)?",
      hi: "क्या आप आपातकालीन सेवाओं (108) को कॉल करना चाहते हैं?",
      bn: "আপনি কি জরুরি সেবা (108) কল করতে চান?",
      ta: "நீங்கள் அவசர சேவைகளை (108) அழைக்க விரும்புகிறீர்களா?",
      te: "మీరు అ��్యవసర సేవలను (108) కాల్ చేయాలనుకుంటున్నారా?",
    };

    const message = confirmMessages[langCode] || confirmMessages.en;

    if (confirm(message)) {
      // Directly initiate the call without delay
      window.location.href = "tel:108";

      // Also add a backup method for mobile browsers
      setTimeout(() => {
        try {
          const link = document.createElement("a");
          link.href = "tel:108";
          link.click();
        } catch (e) {
          console.log("Fallback call method failed:", e);
        }
      }, 100);
    }
  };


  const startVoiceCall = () => {
    navigate("/doctors?type=voice");
  };

  return (
    <div className="min-h-screen bg-sand">
      {/* Header */}
      <header className="border-b border-gray-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-herbal rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-indigo">
                  Voice Assistant
                </h1>
                <p className="text-xs text-indigo/70">Welcome, {user?.name}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Avatar className="w-6 h-6 mr-2">
                    <AvatarFallback className="bg-herbal text-white text-xs">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Status Badge */}
          <div className="text-center mb-6">
            <div className="flex justify-center gap-2 mb-4">
              <Badge
                className={`${
                  !isMicrophoneSupported
                    ? "bg-gray-100 text-gray-600 border-gray-200"
                    : isListening
                      ? "bg-coral text-white animate-pulse"
                      : "bg-herbal-50 text-herbal border-herbal-100"
                }`}
              >
                🎙️{" "}
                {!isMicrophoneSupported
                  ? "Voice Unavailable"
                  : isListening
                    ? "Listening..."
                    : "Voice Assistant Ready"}
              </Badge>
              {isFreeConsultation && (
                <Badge className="bg-coral-50 text-coral border-coral-100">
                  FREE Service
                </Badge>
              )}
              {!isMicrophoneSupported && (
                <Badge className="bg-blue-50 text-blue-600 border-blue-200">
                  Use Chrome/Edge
                </Badge>
              )}
            </div>
            <h2 className="text-2xl font-bold text-indigo mb-2">
              NovaBot AI Assistant
            </h2>
            <p className="text-indigo/70">
              Speak naturally in your preferred language
            </p>
          </div>

          {/* Language Selection */}
          <div className="mb-6">
            <div className="flex flex-wrap justify-center gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedLanguage === lang.code
                      ? "bg-herbal text-white shadow-md"
                      : "bg-white text-indigo border border-gray-border hover:bg-herbal-50"
                  }`}
                >
                  {lang.nativeName}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Voice Controls */}
            <div className="lg:col-span-1">
              <Card className="border-gray-border shadow-lg h-fit">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-indigo">Voice Controls</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  {/* Mic Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={toggleListening}
                      disabled={!isMicrophoneSupported}
                      className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                        !isMicrophoneSupported
                          ? "bg-gray-300 cursor-not-allowed"
                          : isListening
                            ? "bg-coral scale-110 shadow-lg animate-pulse"
                            : "bg-herbal hover:bg-herbal-600 hover:scale-105"
                      }`}
                    >
                      {isListening ? (
                        <MicOff className="w-8 h-8 text-white" />
                      ) : (
                        <Mic
                          className={`w-8 h-8 ${!isMicrophoneSupported ? "text-gray-500" : "text-white"}`}
                        />
                      )}
                    </button>
                  </div>

                  {/* Status Text */}
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-indigo">
                      {!isMicrophoneSupported
                        ? "Voice not supported"
                        : isListening
                          ? "Listening..."
                          : "Tap to speak"}
                    </p>

                    {/* Error Message */}
                    {microphoneError && (
                      <p className="text-xs text-soft-red bg-soft-red/10 p-2 rounded border border-soft-red/20">
                        {microphoneError}
                      </p>
                    )}

                    {/* Browser Support Info */}
                    {!isMicrophoneSupported && (
                      <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                        Use Chrome or Edge for voice features
                      </p>
                    )}

                    {/* Current Transcript */}
                    {currentTranscript && (
                      <p className="text-sm text-coral bg-coral-50 p-2 rounded">
                        "{currentTranscript}"
                      </p>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <Button
                      onClick={makeEmergencyCall}
                      className="w-full bg-soft-red hover:bg-soft-red-600 text-white"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Emergency Call 108
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Conversation Interface */}
            <div className="lg:col-span-2">
              <Card className="border-gray-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-indigo flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Conversation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96 w-full pr-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[85%] p-4 rounded-lg ${
                              message.sender === "user"
                                ? "bg-herbal text-white"
                                : "bg-white border border-gray-border text-indigo shadow-sm"
                            }`}
                          >
                            {message.sender === "assistant" && (
                              <div className="flex items-center mb-2">
                                <div className="w-6 h-6 bg-herbal rounded-full flex items-center justify-center mr-2">
                                  <Heart className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-xs font-semibold text-herbal">
                                  NovaBot AI
                                </span>
                              </div>
                            )}
                            <div
                              className={`text-sm leading-relaxed ${
                                message.sender === "assistant"
                                  ? "whitespace-pre-line"
                                  : ""
                              }`}
                              style={{
                                fontSize:
                                  message.sender === "assistant"
                                    ? "14px"
                                    : "13px",
                                lineHeight:
                                  message.sender === "assistant"
                                    ? "1.6"
                                    : "1.4",
                              }}
                            >
                              {message.text}
                            </div>
                            <div className="flex justify-between items-center mt-3">
                              <span className="text-xs opacity-70">
                                {message.timestamp.toLocaleTimeString()}
                              </span>
                              {message.sender === "assistant" && (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() =>
                                      speakText(message.text, selectedLanguage)
                                    }
                                    className="text-xs text-herbal hover:text-herbal-600 flex items-center"
                                  >
                                    <Volume2 className="w-3 h-3 mr-1" />
                                    Listen
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {isProcessing && (
                        <div className="flex justify-start">
                          <div className="bg-white border border-gray-border p-3 rounded-lg">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-indigo/40 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-indigo/40 rounded-full animate-bounce delay-100"></div>
                              <div className="w-2 h-2 bg-indigo/40 rounded-full animate-bounce delay-200"></div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Access */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/symptoms">
              <Button
                variant="outline"
                className="w-full border-herbal text-herbal hover:bg-herbal-50"
              >
                Symptom Checker
              </Button>
            </Link>
            <Link to="/doctors">
              <Button
                variant="outline"
                className="w-full border-coral text-coral hover:bg-coral-50"
              >
                All Doctors
              </Button>
            </Link>
            <Button
              onClick={makeEmergencyCall}
              variant="outline"
              className="w-full border-soft-red text-soft-red hover:bg-soft-red-50"
            >
              Emergency 108
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-herbal-50 border border-herbal-100 rounded-lg">
            <h4 className="font-medium text-herbal mb-2">How to use:</h4>
            <ul className="text-sm text-indigo/80 space-y-1">
              <li>• Click the microphone and speak your health concerns</li>
              <li>• Choose your preferred language from the options above</li>
              <li>• Say "Hi" to start a conversation</li>
              <li>• Ask about symptoms, medications, or hospital departments</li>
              <li>• Use "Emergency" for urgent medical help</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatbot;
