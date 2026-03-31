import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
}

const quickOptions = [
  { id: "book", label: "📅 Book Appointment", reply: "I can help you with that! Just scroll up to our appointment section or click the 'Book Appointment' button in the navbar." },
  { id: "emergency", label: "🚨 Emergency Help", reply: "If this is a life-threatening emergency, please call 911 immediately. Our ER is open 24/7 at the Main Entrance." },
  { id: "doctor", label: "👨‍⚕️ Talk to Doctor", reply: "Would you like to schedule a video consultation? Our specialists are available for telemedicine daily." },
  { id: "insurance", label: "💳 Insurance Query", reply: "We accept most major insurance providers. Please have your card ready and our billing team will guide you." },
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "👋 Hello! I'm MediBot. How can we help you today?", sender: "bot" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleOptionClick = (optionId: string) => {
    const selectedOption = quickOptions.find((opt) => opt.id === optionId);
    if (!selectedOption) return;

    // Add user message
    const userMsg: Message = { id: Date.now(), text: selectedOption.label, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    // Bot is typing...
    setTimeout(() => {
      setIsTyping(true);
      
      // Bot response after delay
      setTimeout(() => {
        setIsTyping(false);
        const botMsg: Message = { id: Date.now() + 1, text: selectedOption.reply, sender: "bot" };
        setMessages((prev) => [...prev, botMsg]);
      }, 1500);
    }, 400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-white rounded-[40px] shadow-2xl flex flex-col overflow-hidden border border-navy-50"
          >
            {/* Header */}
            <div className="bg-navy-500 p-6 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                   <MessageCircle className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                   <h4 className="font-black text-lg">MediBot</h4>
                   <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                     <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                     Online now
                   </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Body */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 scroll-smooth"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.sender === "bot" ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "max-w-[80%] p-4 rounded-[24px] text-sm font-medium",
                    msg.sender === "bot" 
                       ? "bg-navy-50 text-navy-500 rounded-tl-none self-start" 
                       : "bg-emerald-500 text-white rounded-tr-none self-end shadow-lg shadow-emerald-200"
                  )}
                >
                  {msg.text}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-navy-50 text-navy-400 p-4 rounded-[24px] rounded-tl-none self-start flex gap-1 items-center"
                >
                  <span className="w-1 h-1 bg-navy-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1 h-1 bg-navy-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1 h-1 bg-navy-300 rounded-full animate-bounce" />
                </motion.div>
              )}
            </div>

            {/* Quick Options */}
            <div className="p-4 bg-navy-50/50 border-t border-navy-50">
               <h5 className="text-[10px] font-black text-navy-300 uppercase tracking-widest mb-3 ml-2">Quick help</h5>
               <div className="flex flex-wrap gap-2">
                 {quickOptions.map((opt) => (
                   <button
                    key={opt.id}
                    onClick={() => handleOptionClick(opt.id)}
                    className="bg-white px-3 py-2 rounded-xl text-xs font-bold text-navy-500 border border-navy-100 hover:border-emerald-200 hover:text-emerald-600 transition-all shadow-sm active:scale-95"
                   >
                     {opt.label}
                   </button>
                 ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
           "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all relative z-10",
           isOpen ? "bg-navy-500 text-white rotate-90" : "bg-emerald-500 text-white shadow-emerald-200"
        )}
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8 fill-white" />}
        {!isOpen && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-pulse" />
        )}
      </motion.button>
    </div>
  );
};

export default ChatWidget;
