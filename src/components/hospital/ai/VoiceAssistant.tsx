import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, X, Volume2, Loader2, Navigation, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import EmergencyModal from "./EmergencyModal";

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize Speech Recognition
  const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
  }

  const speak = (msg: string, lang: "en-US" | "hi-IN" = "en-US") => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(msg);
    utterance.lang = lang;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const navigateTo = (id: string, enMsg: string, hiMsg: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      
      // Dual Language Feedback
      speak(enMsg, "en-US");
      setTimeout(() => speak(hiMsg, "hi-IN"), 2500);
    }
  };

  const handleCommand = (cmd: string) => {
    const text = cmd.toLowerCase();
    
    // Command Logic
    if (text.includes("appointment") || text.includes("book") || text.includes("karo")) {
      navigateTo("contact", "Navigating to the appointment section.", "Appointment section open kar raha hoon.");
    } else if (text.includes("emergency") || text.includes("help") || text.includes("bachao")) {
      setShowEmergency(true);
      speak("Activating emergency alert. Call 108 immediately.", "en-US");
      setTimeout(() => speak("Emergency alert chalu kar raha hoon. 108 par call karen.", "hi-IN"), 4000);
    } else if (text.includes("doctor") || text.includes("chahiye") || text.includes("milna")) {
      navigateTo("doctors", "Finding available doctors for you.", "Aapke liye doctors dhoondh raha hoon.");
    } else if (text.includes("symptom") || text.includes("check") || text.includes("bimari")) {
      navigateTo("predictor", "Opening the symptom predictor tool.", "Symptom predictor tool open kar raha hoon.");
    } else {
      speak("I didn't quite catch that. Try saying 'book appointment' or 'emergency'.", "en-US");
    }
  };

  const startListening = () => {
    if (!recognition) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }
    setError(null);
    setIsListening(true);
    setTranscript("");
    recognition.start();
  };

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      handleCommand(result);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech Recognition Error", event.error);
      setIsListening(false);
      if (event.error === "not-allowed") {
        setError("Microphone access denied. Please enable it in browser settings.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }, [recognition]);

  return (
    <>
      <div className="fixed bottom-6 left-6 z-[100] font-sans">
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.8 }}
              className="absolute bottom-20 left-0 w-[300px] bg-white p-6 rounded-[32px] shadow-2xl border border-emerald-100 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                   <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                     <Volume2 className="text-white w-5 h-5 animate-pulse" />
                   </div>
                   <motion.div 
                     animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                     transition={{ duration: 2, repeat: Infinity }}
                     className="absolute inset-0 bg-emerald-500 rounded-full -z-10"
                   />
                </div>
                <div>
                   <h4 className="font-black text-navy-500 text-sm">Listening...</h4>
                   <p className="text-[10px] text-navy-300 font-bold uppercase tracking-widest">Try "Doctor chahiye"</p>
                </div>
              </div>

              {transcript && (
                <div className="bg-navy-50 p-4 rounded-2xl text-navy-500 font-black text-xs leading-relaxed italic">
                  "{transcript}"
                </div>
              )}

              <div className="flex gap-2">
                 <div className="h-1 flex-1 bg-emerald-100 rounded-full overflow-hidden">
                    <motion.div 
                       animate={{ x: ["-100%", "100%"] }}
                       transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                       className="h-full w-1/3 bg-emerald-500"
                    />
                 </div>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-20 left-0 w-[250px] bg-red-50 p-4 rounded-2xl border border-red-100 flex items-start gap-3"
            >
               <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
               <p className="text-[10px] text-red-900 font-bold leading-tight">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Mic Button */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={isListening ? () => {} : startListening}
            className={cn(
               "w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all border-4 relative overflow-hidden",
               isListening 
                 ? "bg-white border-emerald-500 text-emerald-500" 
                 : "bg-navy-500 border-navy-500 text-white hover:bg-navy-600"
            )}
          >
            {isListening ? (
              <div className="flex gap-1 items-center">
                 <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                 <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                 <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
              </div>
            ) : (
              <Mic className="w-8 h-8" />
            )}
            
            {/* Listening Wave Effect */}
            {isListening && (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 0.1 }}
                 className="absolute inset-0 bg-emerald-500 pointer-events-none"
               />
            )}
          </motion.button>

          {/* Pulse Ripple when idle */}
          {!isListening && (
             <motion.div 
               animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
               transition={{ duration: 3, repeat: Infinity }}
               className="absolute inset-0 bg-navy-500 rounded-full -z-10"
             />
          )}

          {/* Icon indicator for speaking */}
          {isSpeaking && (
             <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1 rounded-full shadow-lg">
                <Volume2 className="w-4 h-4" />
             </div>
          )}
        </div>
      </div>

      <EmergencyModal 
        isOpen={showEmergency} 
        onClose={() => setShowEmergency(false)} 
      />
    </>
  );
};

export default VoiceAssistant;
