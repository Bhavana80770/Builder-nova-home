import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
}

const ChatWidget = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize with translated welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ id: 1, text: t("chat.welcome"), sender: "bot" }]);
    }
  }, [t]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const quickOptions = [
    { id: "book", label: "📅 " + (language === "HI" ? "अपॉइंटमेंट" : language === "TE" ? "అపాయింట్మెంట్" : "Book"), href: "#contact" },
    { id: "doctor", label: "👨‍⚕️ " + (language === "HI" ? "वीडियो कॉल" : language === "TE" ? "వీడియో కాల్" : "Video Call"), href: "#video-consultation" },
    { id: "symptoms", label: "🤒 " + (language === "HI" ? "लक्षण जांचें" : language === "TE" ? "లక్షణాలు" : "Symptoms"), href: "#disease-predictor" },
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = { id: Date.now(), text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, language }),
      });

      const data = await response.json();
      setIsTyping(false);

      if (data.success) {
        const botMsg: Message = { id: Date.now() + 1, text: data.reply, sender: "bot" };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setIsTyping(false);
      const errorMsg: Message = { id: Date.now() + 1, text: t("chat.error"), sender: "bot" };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  const handleQuickOption = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[550px] bg-white rounded-[40px] shadow-2xl flex flex-col overflow-hidden border border-navy-50"
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
              className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 scroll-smooth bg-gray-50/30"
            >
              {/* Disclaimer */}
              <div className="bg-amber-50 border border-amber-100 p-3 rounded-2xl flex gap-2 items-start mb-2">
                 <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                 <p className="text-[10px] text-amber-700 font-medium leading-tight">
                    {t("chat.disclaimer")}
                 </p>
              </div>

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.sender === "bot" ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "max-w-[85%] p-4 rounded-[24px] text-sm font-medium leading-relaxed shadow-sm",
                    msg.sender === "bot" 
                       ? "bg-white text-navy-500 rounded-tl-none self-start border border-navy-50" 
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
                  className="bg-white border border-navy-50 text-navy-400 p-4 rounded-[24px] rounded-tl-none self-start flex gap-2 items-center"
                >
                   <span className="text-xs font-bold italic">{t("chat.typing")}</span>
                   <div className="flex gap-1">
                    <span className="w-1 h-1 bg-navy-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1 h-1 bg-navy-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1 h-1 bg-navy-300 rounded-full animate-bounce" />
                   </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-navy-50">
               {/* Quick Options */}
               <div className="flex flex-wrap gap-2 mb-4">
                 {quickOptions.map((opt) => (
                   <button
                    key={opt.id}
                    onClick={() => handleQuickOption(opt.href)}
                    className="bg-navy-50 px-3 py-1.5 rounded-full text-[10px] font-bold text-navy-500 border border-transparent hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 transition-all active:scale-95"
                   >
                     {opt.label}
                   </button>
                 ))}
               </div>

               <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="flex items-center gap-2 group"
               >
                 <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t("chat.placeholder")}
                  className="flex-1 bg-navy-50 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                 />
                 <button 
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="w-11 h-11 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all disabled:opacity-50 disabled:grayscale"
                 >
                   <Send className="w-5 h-5" />
                 </button>
               </form>
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
