import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("medinova_cookie_accepted");
    if (!hasAccepted) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("medinova_cookie_accepted", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-12 md:right-auto md:max-w-md z-[90] font-sans"
        >
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[32px] shadow-2xl border border-emerald-100 flex flex-col md:flex-row items-center gap-6">
            <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-200">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-navy-500 mb-1">Privacy & Cookies</h4>
              <p className="text-navy-400 text-xs leading-relaxed">
                We use cookies to enhance your experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button 
                onClick={accept}
                className="flex-1 md:flex-none px-6 py-3 bg-navy-500 text-white rounded-xl font-bold text-xs hover:bg-navy-600 transition-all active:scale-95 whitespace-nowrap"
              >
                Accept All
              </button>
              <button 
                 onClick={() => setIsVisible(false)}
                 className="p-3 text-navy-300 hover:text-navy-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
