import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Phone, X, ShieldAlert } from "lucide-react";

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-red-950/40 backdrop-blur-md z-[200]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-[50px] shadow-2xl z-[210] overflow-hidden border-4 border-red-500"
          >
            <div className="bg-red-500 p-12 text-center text-white relative">
               <ShieldAlert className="w-24 h-24 mx-auto mb-6 text-white/20 absolute top-4 left-1/2 -translate-x-1/2" />
               <div className="relative z-10">
                 <h2 className="text-4xl font-black mb-2 uppercase tracking-tight">Emergency Alert</h2>
                 <p className="text-red-100 font-bold">Immediate medical assistance required</p>
               </div>
            </div>

            <div className="p-12 text-center">
               <div className="bg-red-50 p-8 rounded-[40px] mb-8">
                  <p className="text-navy-500 font-bold mb-1">Emergency Helpline</p>
                  <p className="text-6xl font-black text-red-500 tracking-tighter">108</p>
               </div>
               
               <div className="flex flex-col gap-4">
                  <a 
                    href="tel:108"
                    className="w-full bg-red-500 text-white py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 shadow-xl shadow-red-200 hover:bg-red-600 transition-all active:scale-95"
                  >
                    <Phone className="w-6 h-6 fill-white" />
                    CALL EMERGENCY
                  </a>
                  <button 
                    onClick={onClose}
                    className="text-navy-400 font-bold hover:text-navy-500 transition-colors py-2 flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Close Warning
                  </button>
               </div>
            </div>

            <div className="bg-red-500/5 py-4 px-8 border-t border-red-100">
               <div className="flex items-center gap-2 justify-center text-red-500 font-black text-[10px] uppercase tracking-widest">
                  <AlertCircle className="w-3 h-3" />
                  Life Threatening Service Only
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EmergencyModal;
