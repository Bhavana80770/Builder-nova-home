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
  Video,
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
    { code: "te-IN", name: "Telugu", nativeName: "తెలుగు" },
  ];

  // Initialize speech recognition
  useEffect(() => {
    // Clear any previous errors on initialization
    setMicrophoneError(null);

    // Check browser support
    const isSupported =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
    setIsMicrophoneSupported(isSupported);

    if (!isSupported) {
      console.warn("Speech Recognition not supported in this browser");
      // Don't set error immediately - only when user tries to use it
      addAssistantMessage(
        "Voice recognition is not supported in your browser. Please use Google Chrome for voice features, or use the chat interface instead.",
      );
      return;
    }

    try {
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
        setMicrophoneError(null); // Clear errors on successful start
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

        // Only show errors if the user was actually trying to use speech recognition
        if (isListening) {
          // Provide user-friendly error messages
          let errorMessage = "Voice recognition encountered an error. ";
          switch (event.error) {
            case "not-allowed":
              errorMessage +=
                "Please allow microphone access in your browser settings and try again.";
              setMicrophoneError("Microphone access denied");
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
              errorMessage += "Please try again or use the chat interface.";
              setMicrophoneError("Recognition error");
          }

          addAssistantMessage(errorMessage);
        }
      };

      recognition.onend = () => {
        console.log("Speech recognition ended");
        setIsListening(false);
      };

      // Don't test microphone access on initialization - wait for user click
      console.log("Speech recognition initialized successfully");
    } catch (error) {
      console.error("Error initializing speech recognition:", error);
      addAssistantMessage(
        "Unable to initialize voice recognition. Please try refreshing the page or use the chat interface.",
      );
    }

    // Add initial greeting
    if (messages.length === 0) {
      addAssistantMessage(
        "Hello! I'm AarogyaMitra, your AI health assistant. How can I help you today? You can speak in your preferred language.",
      );
    }

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
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate processing

    const response = generateResponse(text);
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
          te: "నేను ఇప్పుడే మీ కోసం 108 అత్యవసర నంబర్ డయల్ చేయాలా?",
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

  const generateResponse = (userText: string): string => {
    const text = userText.toLowerCase();
    const langCode = selectedLanguage.split("-")[0];

    // Language-specific responses
    const responses = {
      en: {
        greeting:
          "Hello! I'm AarogyaMitra, your AI health assistant. I can help you with health concerns, connect you with doctors, or provide medical advice. How can I assist you today?",
        fever:
          "I understand you have fever. Here's what you should do:\n\n• Rest and drink plenty of fluids\n• Take paracetamol (500mg) every 6 hours if temperature is above 100°F\n• Use cold compress on forehead\n• Monitor temperature regularly\n• If fever persists for more than 3 days or goes above 103°F, consult a doctor immediately\n\nWould you like me to connect you with a doctor for consultation?",
        headache:
          "For headache relief, try these steps:\n\n• Rest in a quiet, dark room\n• Apply cold or warm compress to head/neck\n• Stay hydrated - drink water\n• Take paracetamol 500mg if needed\n• Avoid screen time\n• Try gentle neck stretches\n\nIf headache is severe, sudden, or with fever/vision problems, seek immediate medical help. Should I connect you with a doctor?",
        stomach:
          "For stomach pain, here are immediate care tips:\n\n• Avoid solid food for 2-3 hours\n• Drink clear fluids (water, clear soup)\n• Try BRAT diet: Bananas, Rice, Applesauce, Toast\n• Avoid dairy, spicy, or fatty foods\n• Rest and avoid stress\n\nSeek immediate help if you have:\n• Severe pain\n• Blood in vomit/stool\n• High fever\n• Signs of dehydration\n\nWould you like to consult with a doctor?",
        cough:
          "For cough relief:\n\n• Drink warm water with honey and lemon\n• Stay hydrated\n• Use steam inhalation (hot water vapors)\n• Avoid cold drinks and ice cream\n• Sleep with head elevated\n• Avoid smoking and dust\n\nConsult a doctor if:\n• Cough persists more than 2 weeks\n• Blood in sputum\n• High fever\n• Breathing difficulty\n\nShall I help you connect with a doctor?",
        cold: "For cold and flu symptoms:\n\n• Rest and sleep well\n• Drink warm fluids (tea, soup, warm water)\n• Gargle with warm salt water\n• Use steam inhalation\n• Take vitamin C rich foods\n• Wash hands frequently\n\nAvoid antibiotics unless prescribed. See a doctor if symptoms worsen or persist beyond 7 days. Need medical consultation?",
        doctor:
          "I can connect you with qualified doctors. We have:\n\n🆓 FREE options:\n• Basic video consultations (15-20 min)\n• Chat support (unlimited)\n• Student doctors (supervised)\n\n💰 Affordable options:\n• Standard consultations (₹149-₹199)\n• Specialist consultations (₹399-₹499)\n\nChoose: Video call, Voice call, or Chat consultation?",
        emergency:
          "🚨 This sounds like an EMERGENCY! \n\nFor immediate help:\n📞 Call 108 (National Emergency)\n📞 Call 102 (Medical Emergency)\n\nEmergency signs:\n• Chest pain\n• Difficulty breathing\n• Severe bleeding\n• Unconsciousness\n• Severe burns\n\nShould I dial 108 for you right now?",
        default:
          "I understand your health concern. For better assistance, please describe:\n\n• Your main symptoms\n• When did it start?\n• How severe is it (1-10)?\n• Any other related issues?\n\nI can provide immediate care tips and connect you with doctors if needed. How can I help you specifically?",
      },
      hi: {
        greeting:
          "नमस्ते! मैं आरोग्यमित्र हूं, आपका AI स्वास्थ्य सहायक। मैं आपकी स्वास्थ्य समस्याओं में मदद कर सकता हूं, डॉक्टरों से जोड़ सकता हूं, या चिकित्सा सलाह दे सकता हूं। आज मैं आपकी कैसे सेवा कर सकता हूं?",
        fever:
          "मैं समझ गया कि आपको बुखार है। यह करें:\n\n• आराम करें और ���ूब पानी पिएं\n• अगर बुखार 100°F से ज्यादा है तो हर 6 घंटे में पैरासिटामोल (500mg) लें\n• माथे पर ठंडी पट्टी रखें\n• नियमित तापमान चेक करें\n• अगर बुखार 3 दिन से ज्यादा रहे या 103°F से ज्यादा हो तो तुरंत डॉक्टर से मिलें\n\nक्या मैं आपको डॉक्टर से सलाह के लिए जोड़ दूं?",
        headache:
          "सिर दर्द के लिए यह करें:\n\n• शांत, अंधेरे कमरे में आराम करें\n• सिर/गर्दन पर ठंडी या गर्म पट्टी लगाएं\n• खूब पानी पिएं\n• जरूरत हो तो पैरासिटामोल 500mg लें\n�� स्क्रीन से दूर रहें\n• गर्दन की हल्की स्ट्रेचिंग करें\n\nअगर सिर दर्द तेज़, अचानक, या बुखार/दिखने में समस्या के साथ है तो तुरंत इलाज लें। डॉक्टर से जोड़ दूं?",
        stomach:
          "पेट दर्द के लिए तुरंत यह करें:\n\n• 2-3 घंटे तक ठोस खाना न खाएं\n• साफ तरल पदार्थ पिएं (पानी, साफ सूप)\n• BRAT डाइट लें: केला, चावल, सेब का सॉस, टोस्ट\n• दूध, मसालेदार या तैलीय खाना न खाएं\n• आराम करें और तनाव न लें\n\nतुरंत मदद लें अगर:\n• तेज़ दर्द हो\n• उल्टी/मल में खून हो\n• तेज़ बुखार हो\n• डिहाइड्रेशन के लक्षण हों\n\nडॉक्टर से सलाह लेना चाहते हैं?",
        cough:
          "खांसी के लिए:\n\n• शहद और नींबू के साथ गर्म पानी पिएं\n• खूब पानी पिएं\n• भाप लें (गर्म पानी की भाप)\n• ठंडे पेय और आइसक्रीम से बचें\n• सिर ऊंचा करके सोएं\n• धूम्रपान और धूल से बचें\n\nडॉक्टर से मिलें अगर:\n• खांसी 2 हफ्ते से ज्यादा रहे\n• कफ में खून आए\n• तेज़ बुखार हो\n• सांस लेने में दिक्कत हो\n\nडॉक्टर से जोड़ने में मदद करूं?",
        cold: "सर्दी-जुकाम के लिए:\n\n• आराम करें और अच्छी नींद लें\n• गर्म तरल पदार्थ पिएं (चाय, सूप, गर्म पानी)\n• गर्म नमक के पानी से गरारे करें\n• भाप लें\n• विटामिन C वाले फल खाएं\n• बार-बार हाथ धोएं\n\nबिना डॉक्टर की सलाह के एंटीबायोटिक न लें। अगर लक्षण 7 दिन से ज्यादा रहें तो डॉक्टर से मिलें। चिकित्सा सलाह चाहिए?",
        doctor:
          "मैं आपको योग्य डॉक्टरों से जोड़ सकता हूं। हमारे पास है:\n\n🆓 मुफ्त विकल्प:\n• ���ेसिक वीडियो कंसल्टेशन (15-20 मिनट)\n• चैट सपोर्ट (असीमित)\n• छात्र डॉक्टर (निरीक्षित)\n\n💰 किफायती विकल्प:\n• स्टैंडर्ड कंसल्टेशन (₹149-₹199)\n• विशेषज्ञ कंसल्टेशन (₹399-₹499)\n\nच���नें: वीडियो कॉल, वॉयस कॉल, या चैट कंसल्टेशन?",
        emergency:
          "🚨 यह एक आपातकाल लगता है!\n\nतत्काल मदद के लिए:\n📞 108 कॉल करें (राष्ट्रीय आपातकाल)\n📞 102 कॉल करें (चिकित्सा आपातकाल)\n\nआपातकालीन संकेत:\n• छाती में दर्द\n• सांस लेने ��ें कठिनाई\n• अधिक खून बहना\n• बेहोशी\n• गंभीर जलन\n\nक्या मैं अभी आपके लिए 108 डायल करूं?",
        default:
          "मैं आपकी स्वास्थ्य चिंता समझ गया। बेहतर सहायता के लिए बताएं:\n\n• आपके मुख्य लक्षण क्या हैं?\n• यह कब शुरू हुआ?\n• कितना गंभीर है (1-10)?\n• कोई अन्य संबंधित समस्या?\n\nमैं तुरंत देखभाल की सलाह दे सकता हूं और जरूरत हो तो डॉक्टरों से जोड़ सकता हूं। मैं आपकी कैसे मदद कर सकता हूं?",
      },
      bn: {
        greeting:
          "হ্যালো! আমি আরোগ্যমিত্র, আপনার AI স্বাস্থ্য সহায়ক। আমি আপনার স্বাস্থ্য সমস্যায় সাহায্য করতে পারি, ডাক্তারদের সাথে যোগাযোগ করাতে পারি বা চিকিৎসা ��রামর্শ দিতে পারি। আজ আমি কীভাবে আপনাকে সাহায্য করতে পারি?",
        fever:
          "আমি বুঝতে পারছি আপনার জ্বর হয়েছে। এটি করুন:\n\n• বিশ্রাম নিন এবং প্রচুর পানি পান করুন\n• জ্বর 100°F এর বেশি হলে প্রতি 6 ঘন্টায় প্যারাসিটামল (500mg) খান\n• কপালে ঠান্ডা কাপড় দিন\n• নিয়মিত তাপমাত্রা পরীক্ষা করুন\n• জ্বর 3 দিনের বেশি থাকলে বা 103°F এর বেশি হলে অবিলম্বে ডাক্তার দেখান\n\nআমি কি আপনাকে ডাক্তারের পরামর্শের জন্য যোগাযোগ করিয়ে দিব?",
        headache:
          "মাথাব্যথার জন্য এগুলো করুন:\n\n• শান্ত, অন্ধকার ঘরে বিশ্রাম নিন\n• মাথা/ঘাড়ে ঠান্ডা বা গরম কাপড় দিন\n• প্রচুর পানি পা��� করুন\n• প্রয়োজনে প্যারাসিটামল 500mg খান\n• স্ক্রিন থেকে দূরে থাকুন\n• ঘাড়ের হালকা ব্যায়াম করুন\n\nমাথাব্যথা যদি তীব্র, হঠাৎ, বা জ্বর/দৃষ্টি সমস্যার সাথে হয় তাহলে অবিলম্বে চিকিৎসা নিন। ডাক্তারের সাথে যোগাযোগ করব?",
        stomach:
          "প��টের ব্যথার জন্য তাৎক্ষণিক যত্ন:\n\n• 2-3 ঘন্টা শক্ত খাবার এড়িয়ে চলুন\n• পরিষ্কার তরল পান করুন (পানি, পরিষ্কার স্যুপ)\n• BRAT ডায়েট: কলা, ভাত, আপেল সস, টোস্ট\n• দুধ, মসলাদার বা তৈলাক্ত খাবার এড়িয়ে চলুন\n• বিশ্রাম নিন এবং চাপ এড়িয়ে চলুন\n\nঅবিলম্বে সাহায্য নিন যদি:\n• তীব্র ব্যথা হয়\n• বমি/মলে রক্ত থাক��\n• উচ্চ জ্বর হয়\n• ডিহাইড্রেশনের লক্ষণ থাকে\n\nডাক্তারের পরামর্শ নিতে চান?",
        doctor:
          "আমি আপনাকে যোগ্য ডাক্তারদের সাথে যোগাযোগ করিয়ে দিতে পারি। আমাদের আছে:\n\n🆓 বিনামূল্যে অপশন:\n• বেসিক ভিডিও পরামর্শ (15-20 মিনিট)\n• চ্যাট সাপোর্ট (সীমাহীন)\n• ছাত্র ডাক্তার (তত্ত্বাবধানে)\n\n💰 সাশ্রয়ী অপশন:\n• স্ট্যান্ডার্ড পরামর্শ (₹149-₹199)\n• বিশেষজ্ঞ পরামর্শ (₹399-₹499)\n\nবেছে নিন: ভিডিও কল, ভয়েস কল, বা চ্যাট পরামর্শ?",
        emergency:
          "🚨 এটি একটি জরুরি অবস্থা মনে হচ্ছে!\n\nতৎক্ষণাৎ সাহায্যের জন্য:\n📞 108 কল করুন (জাতীয় জরুরি)\n📞 102 কল করুন (চিকিৎসা জরুরি)\n\nজরু���ি লক্ষণ:\n• বুকে ব্যথা\n• শ্বাসকষ্ট\n• অতিরিক্ত রক্তপাত\n• অজ্ঞান হওয়া\n• গুরুতর পোড়া\n\nআমি কি এখনই আপনার জন্য 108 ডায়াল করব?",
        default:
          "আমি আপনার স্বাস্থ্য সমস্যা বুঝতে পারছি। ভাল সাহায্যের জন্য বলুন:\n\n• আপনার প্রধান লক্ষণ কী?\n• এটি কখন শুরু হয়েছে?\n• কতটা গুরুতর (1-10)?\n• অন্য কোন সংশ্লিষ্ট সমস্যা?\n\nআমি তাৎক্ষণিক যত্নের পরামর্শ দিতে পারি এবং প্রয়োজনে ডাক্তারদের সাথে যোগাযোগ করিয়ে দিতে পারি। আমি কীভাবে আপনাকে সাহায্য করতে পারি?",
      },
      ta: {
        greeting:
          "வணக்கம்! நான் ஆரோக்யமித்ரா, உங்கள் AI ஆரோக்ய உதவியாளர். உங்கள் ஆரோக்ய பிரச்சனைகளில் உதவ முடியும், மருத்துவர்களுடன் இணைக்க முடியும், அல்லது மருத்துவ ஆலோசனை வழங்க முடியும். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
        fever:
          "உங்களுக்கு காய்ச்சல் இருப்பது புரிகிறது. இதை செய்யுங்கள்:\n\n• ஓய்வெடுத்து நிறைய தண்ணீர் குடியுங்கள்\n• காய்ச்சல் 100°F க்கு மேல் இருந்தால் 6 மணி நேரத்திற்கு ஒருமுறை பாராசிட்டமால் (500mg) எடுங்கள்\n• நெற்றியில் குளிர்ந்த துணி வையுங்கள்\n• வெப்பநிலையை தொடர்ந்து சரிபார்க்கவும்\n• காய்ச்சல் 3 நாட்களுக்கு மேல் நீடித்தால் அல்லது 103°F க்கு மேல் சென்றால் உடனே மருத்துவரை பாருங்கள்\n\nமருத்துவ ஆலோசனைக்காக உங்களை இணைக்கட்டுமா?",
        headache:
          "தலைவலிக்கு இதை செய்யுங்கள்:\n\n• அமைதியான, இருண்ட அறையில் ஓய்வெடுங்கள்\n• தலை/கழுத்தில் குளிர்ந்த அல்லது சூடான துணி வையுங்கள்\n• நிறைய தண்ணீர் குடியுங்கள்\n• தேவைப்பட்டால் பாராசிட்டமால் 500mg எடுங்கள்\n• திரையிலிருந்து விலகி இருங்கள்\n• கழுத்தின் லேசான பயிற்சி செய்யுங்கள்\n\nதலைவலி கடுமையானதாக, திடீரென்று, அல்லது காய்ச்சல்/பார்வை பிரச்சனையுடன் இருந்தால் உடனே மருத்துவ உதவி பெறுங்கள். மருத்துவருடன் இணைக்கட்டுமா?",
        stomach:
          "வயிற்று வலிக்கு உடனடி கவனிப்பு:\n\n• 2-3 மணி நேரம் திட உணவை தவிர்க்கவும்\n• தெளிவான திரவங்கள் குடியுங்கள் (தண்ணீர், தெளிவான சூப்)\n• BRAT உணவு: வாழைப்பழம், அரிசி, ஆப்பிள் சாஸ், டோஸ்ட்\n• பால், காரமான அல்லது எண்ணெய் உணவை தவிர்க்கவும்\n• ஓய்வெடுத்து மன அழுத்தத்தை தவிர்க்கவும்\n\nஉடனடி உதவி பெறுங்கள் இது இருந்தால்:\n• கடுமையான வலி\n• வாந்தி/மலத்தில் இரத்தம்\n• அதிக காய்ச்சல்\n• நீரிழப்பு அறிகுறிகள்\n\nமருத்துவ ஆலோசனை பெற விரும்புகிறீர்களா?",
        doctor:
          "நான் உங்களை தகுதிவாய்ந்த மருத்துவர்களுடன் இணைக்க முடியும். எங்களிடம் உள்ளது:\n\n🆓 இலவச விருப்பங்கள்:\n• அடிப்படை வீடியோ ஆலோசனை (15-20 நிமிடங்கள்)\n• சாட் ஆதரவு (வரம்பற்ற)\n• மாணவர் மருத்துவர்கள் (மேற்பார்வையில்)\n\n💰 மலிவு விருப்பங��கள்:\n• நிலையான ஆலோசனை (₹149-₹199)\n• நிபுணர் ஆலோசனை (₹399-₹499)\n\nதேர்வு செய்யுங்கள்: வீடியோ கால், குரல் அழைப்பு, அல்லது சாட் ஆலோசனை?",
        emergency:
          "🚨 இது அவசரநிலை போல் தெரிகிறது!\n\nஉடனடி உதவிக்கு:\n📞 108 அழைக்கவும் (தேசிய அவசரநிலை)\n📞 102 அழைக்கவும் (மருத்துவ அவசரநிலை)\n\nஅவசர அறிகுறிகள்:\n• மார்பு வலி\n• மூச்சுத்திணறல்\n• கடுமையான இரத்தப்போக்கு\n• மயக்கம்\n• கடுமையான தீப்பிடிப்பு\n\nநான் இப்போதே உங்களுக���காக 108 டயல் செய்யட்டுமா?",
        default:
          "உங்கள் ஆரோக்ய கவலை புரிகிறது. சிறந்த உதவிக்காக சொல்லுங்கள்:\n\n• உங்கள் முக்கிய அறிகுறிகள் என்ன?\n• இது எப்போது தொடங்கியது?\n• எவ்வளவு கடுமையானது (1-10)?\n• வேறு ஏதேனும் தொடர்புடைய பிரச்சனை?\n\nநான் உடனடி கவனிப்பு ஆலோசனை வழங்க முடியும் மற்றும் தேவைப்பட்டால் மருத்துவர்களுடன் இணைக்க முடியும். நான் உங்களுக்கு எப்படி குறிப்பாக உதவ முடியும்?",
      },
      te: {
        greeting:
          "హలో! నేను ఆరోగ్యమిత్రను, మీ AI ఆరోగ్య సహాయకుడను. నేను మీ ఆరోగ్య సమస్యలలో సహాయం చేయగలను, వైద్యులతో కలుపుతాను లేదా వైద్య సలహా ఇవ్వగలను. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?",
        fever:
          "మీకు జ్వరం వచ్చిందని అర్థమైంది. ఇలా చేయండి:\n\n• విశ్రమించి చాలా న���ళ్లు తాగండి\n• జ్వరం 100°F కంటే ఎక్కువ ఉంటే 6 గంటలకు ఒకసారి పారాసిటమాల్ (500mg) తీసుకోండి\n• నుదిటిపై చల్లని గుడ్డ వేయండి\n• ఉష్ణోగ్రతను క్రమం తప్పకుండా తనిఖీ చేయండి\n• జ్వరం 3 రోజులకు మించి ఉంటే లేదా 103°F కంటే ఎక్కువ అయితే వెంటనే వైద్యుడిని చూపించండి\n\nవైద్య సలహా కోసం మిమ్మల్ని కలిపించాలా?",
        headache:
          "తలనొప్పికి ఇలా చేయండి:\n\n• నిశ్శబ్ద, చీకటి గదిలో విశ్రమించండి\n• తల/మెడపై చల్లని లేదా వేడిమైన గుడ్డ వేయండి\n• చాలా నీళ్లు తాగండి\n• అవసరమైతే పారాసిటమాల్ 500mg తీసుకోండి\n• స్క్రీన్ నుండి దూరంగా ఉండండి\n• మెడ యొక్క తేలికపాట��� వ్యాయామాలు చేయండి\n\nతలనొప్పి తీవ్రంగా, అకస్మాత్తుగా లేదా జ్వరం/దృష్టి సమస్యలతో ఉంటే వెంటనే వైద్య సహాయం పొం���ండి. వైద్యుడితో కలిపించాలా?",
        stomach:
          "కడుపు నొప్పికి తక్షణ సంరక్షణ:\n\n• 2-3 గంటలపాటు దృఢమైన ఆహారాన్ని తవ్వండి\n• స్పష్టమైన ద్రవాలు తాగండి (నీళ్లు, స్పష్టమైన సూప్)\n• BRAT ఆహారం: అరటిపండు, అన్నం, ఆపిల్ సాస్, టోస్ట్\n• పాలు, కారంమసాలా లేదా నూనె ఆహారాన్ని తవ్వండి\n• విశ్రమించి ఒత్తిడిని తవ్వండి\n\nతక్షణ సహా���ం పొందండి ఇవి ఉంటే:\n• తీవ్రమైన నొప్పి\n• వాంతి/మలంలో రక్తం\n• అధిక జ్వరం\n• నిర్జలీకరణ లక్షణాలు\n\nవైద్య సలహా తీసుకోవాలనుకుంటున్నారా?",
        doctor:
          "నేను మిమ్మల్ని అర్హులైన వైద్యులతో కలిపించగలను. మా దగ్గర ఉంది:\n\n🆓 ఉచిత ఎంపికలు:\n• ప్రాథమిక వీడియో సలహా (15-20 నిమిషాలు)\n• చాట్ మద్దతు (అపరిమిత)\n• విద్యార్థి వైద్యులు (పర్యవేక్షణలో)\n\n💰 సరసమైన ఎంపికలు:\n• ప్రామాణిక సలహా (₹149-₹199)\n• నిపుణుల సలహా (₹399-₹499)\n\nఎంచుకోండి: వీడియో కాల్, వాయిస్ కాల్ లేదా చాట్ సలహా?",
        emergency:
          "🚨 ఇది అత్యవసర పరిస్థితిలా అనిపిస్తుంది!\n\nతక్షణ సహాయం కోసం:\n📞 108 కాల��� చేయండి (జాతీయ అత్యవసరం)\n📞 102 కాల్ చేయండి (వైద్య అత్యవసరం)\n\nఅత్యవసర సంకేతాలు:\n• ఛాతీ నొప్పి\n• ఊపిరాడక\n• తీవ్రమైన రక్తస్రావం\n• మూర్ఛ\n• తీవ్రమైన కాలిపోవడం\n\nనేను ఇప్పుడే మీ కోసం 108 డయల్ చేయాలా?",
        default:
          "మీ ఆరోగ్య ఆందోళన అర్థమైంది. మెరుగైన సహాయం కోసం చెప్పండి:\n\n• మీ ప్రధాన లక్షణాలు ఏమిటి?\n• ఇది ఎప్పుడు మొదలైంది?\n• ఎంత తీవ్రమైనది (1-10)?\n• ఏదైనా ఇతర సంబంధిత సమస్య?\n\nనేను తక్షణ సంరక్షణ సలహా ఇవ్వగలను మరియు అవసరమైతే వైద్యులతో కలిపించగలను. నేను మీకు ప్రత్యేకంగా ఎలా సహాయం చేయగలను?",
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
        setMicrophoneError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error stopping recognition:", error);
        setIsListening(false);
      }
    } else {
      // Check if speech recognition is available
      if (!recognitionRef.current) {
        const errorMsg =
          "Voice recognition is not available. Please make sure you're using a supported browser (Chrome/Edge) and have granted microphone permissions.";
        setMicrophoneError("Voice recognition not available");
        addAssistantMessage(errorMsg);
        return;
      }

      try {
        // Clear previous errors
        setMicrophoneError(null);

        // Check microphone permissions first
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          stream.getTracks().forEach((track) => track.stop()); // Stop the test stream
        }

        // Start speech recognition
        recognitionRef.current.lang = selectedLanguage;
        recognitionRef.current.start();
      } catch (error: any) {
        console.error("Microphone access error:", error);
        let errorMessage = "Unable to access microphone. ";
        let shortError = "Microphone error";

        if (error.name === "NotAllowedError") {
          errorMessage +=
            "Please allow microphone access in your browser settings.";
          shortError = "Access denied";
        } else if (error.name === "NotFoundError") {
          errorMessage +=
            "No microphone found. Please check your microphone connection.";
          shortError = "No microphone";
        } else if (error.name === "NotSupportedError") {
          errorMessage += "Your browser doesn't support microphone access.";
          shortError = "Not supported";
        } else {
          errorMessage +=
            "Please check your microphone settings and try again.";
        }

        setMicrophoneError(shortError);
        addAssistantMessage(errorMessage);
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
      te: "మీరు అత్యవసర సేవలను (108) కాల్ చేయాలనుకుంటున్నారా?",
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

  const startVideoCall = () => {
    navigate("/doctors?type=video");
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
              AarogyaMitra AI Assistant
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
                      onClick={startVideoCall}
                      className="w-full bg-gender-blue hover:bg-gender-blue-600 text-white"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Video Call Doctor
                    </Button>
                    <Button
                      onClick={startVoiceCall}
                      className="w-full bg-gender-pink hover:bg-gender-pink-600 text-white"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Voice Call Doctor
                    </Button>
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
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.sender === "user"
                                ? "bg-herbal text-white"
                                : "bg-white border border-gray-border text-indigo"
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <span className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
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
            <Link to="/pricing">
              <Button
                variant="outline"
                className="w-full border-gender-blue text-gender-blue hover:bg-gender-blue-50"
              >
                Pricing Plans
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
              <li>• Ask about symptoms, medications, or request a doctor</li>
              <li>• Use "Emergency" for urgent medical help</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatbot;
