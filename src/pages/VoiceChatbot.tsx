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
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      const recognition = recognitionRef.current;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = selectedLanguage;

      recognition.onstart = () => {
        setIsListening(true);
        setCurrentTranscript("");
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
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }

    // Add initial greeting
    if (messages.length === 0) {
      addAssistantMessage(
        "Hello! I'm AarogyaMitra, your AI health assistant. How can I help you today? You can speak in your preferred language.",
      );
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
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

    // Speak the response if language is supported
    speakText(response, selectedLanguage);
  };

  const generateResponse = (userText: string): string => {
    const text = userText.toLowerCase();

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
      return "Hello! I'm here to help with your health concerns. You can tell me about any symptoms, ask health questions, or request to connect with a doctor.";
    }

    // Health-related queries
    if (
      text.includes("fever") ||
      text.includes("बुखार") ||
      text.includes("জ্বর") ||
      text.includes("காய்ச்சல்") ||
      text.includes("జ్వరము")
    ) {
      return "I understand you're experiencing fever. Can you tell me more about your symptoms? How long have you had the fever and what's your temperature?";
    }

    if (
      text.includes("headache") ||
      text.includes("सिरदर्द") ||
      text.includes("মাথাব্যথা") ||
      text.includes("தலைவலி") ||
      text.includes("తలనొప్పి")
    ) {
      return "Headaches can have various causes. Can you describe the type of pain and how long you've been experiencing it? Any other symptoms?";
    }

    if (
      text.includes("stomach") ||
      text.includes("pain") ||
      text.includes("पेट") ||
      text.includes("পেট") ||
      text.includes("வயிற்று") ||
      text.includes("కడుపు")
    ) {
      return "Stomach issues can be concerning. Can you tell me more about the pain - when it started, the intensity, and any other symptoms you're experiencing?";
    }

    if (
      text.includes("doctor") ||
      text.includes("डॉक्टर") ||
      text.includes("ডাক্তার") ||
      text.includes("மருத்துவர்") ||
      text.includes("వైద్యుడు")
    ) {
      return "I can help you connect with a qualified doctor. Would you like to start with a free consultation, affordable consultation, or premium specialist? You can also choose between video call, voice call, or chat.";
    }

    if (
      text.includes("emergency") ||
      text.includes("urgent") ||
      text.includes("आपातकाल") ||
      text.includes("জরুরি") ||
      text.includes("அவசரம்") ||
      text.includes("అత్యవసర")
    ) {
      return "This sounds urgent. For immediate medical emergency, please call 108 (National Emergency Number) or 102 (Medical Emergency). Would you like me to help you call emergency services?";
    }

    // Default response
    return "I understand your concern. Can you provide more details about your symptoms so I can better assist you? You can also ask me to connect you with a doctor for professional advice.";
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

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.lang = selectedLanguage;
        recognitionRef.current.start();
      }
    }
  };

  const makeEmergencyCall = () => {
    if (confirm("Do you want to call emergency services (108)?")) {
      window.location.href = "tel:108";
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
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
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
        <div className="max-w-2xl mx-auto">
          {/* Status Badge */}
          <div className="text-center mb-8">
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-herbal-50 text-herbal border-herbal-100">
                🎙️ Voice Assistant Ready
              </Badge>
              {isFreeConsultation && (
                <Badge className="bg-coral-50 text-coral border-coral-100">
                  FREE Service
                </Badge>
              )}
            </div>
            <h2 className="text-2xl font-bold text-indigo mb-2">
              Talk to AarogyaMitra
            </h2>
            <p className="text-indigo/70">
              Speak naturally about your health concerns in your preferred
              language
            </p>
          </div>

          {/* Voice Interface */}
          <Card className="border-gray-border shadow-lg mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-indigo">
                Voice Chat Interface
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              {/* Mic Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => setIsListening(!isListening)}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isListening
                      ? "bg-coral scale-110 shadow-lg animate-pulse"
                      : "bg-herbal hover:bg-herbal-600 hover:scale-105"
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-10 h-10 text-white" />
                  ) : (
                    <Mic className="w-10 h-10 text-white" />
                  )}
                </button>
              </div>

              {/* Status Text */}
              <div className="space-y-2">
                <p className="text-lg font-medium text-indigo">
                  {isListening ? "Listening..." : "Tap to speak"}
                </p>
                <p className="text-sm text-indigo/60">
                  {isListening
                    ? "Speak clearly about your health concerns"
                    : "Press and hold the microphone to start"}
                </p>
              </div>

              {/* Language Options */}
              <div className="flex flex-wrap justify-center gap-2">
                {["Hindi", "English", "Bengali", "Tamil", "Telugu"].map(
                  (lang) => (
                    <Badge
                      key={lang}
                      variant="outline"
                      className="cursor-pointer hover:bg-herbal hover:text-white border-herbal text-herbal"
                    >
                      {lang}
                    </Badge>
                  ),
                )}
              </div>
            </CardContent>
          </Card>

          {/* Conversation History Placeholder */}
          <Card className="border-gray-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-indigo">Conversation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-center items-center h-32 text-indigo/50">
                  <div className="text-center">
                    <Volume2 className="w-8 h-8 mx-auto mb-2" />
                    <p>Start speaking to begin your conversation</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-2 gap-4">
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
                Talk to Doctor
              </Button>
            </Link>
          </div>

          {/* Emergency Notice */}
          <div className="mt-8 p-4 bg-soft-red-50 border border-soft-red-200 rounded-lg text-center">
            <p className="text-sm text-indigo">
              <strong>Emergency?</strong> Call{" "}
              <a href="tel:108" className="text-soft-red font-semibold">
                108
              </a>{" "}
              for immediate medical assistance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatbot;
