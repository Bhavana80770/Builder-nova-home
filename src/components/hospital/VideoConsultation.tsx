import React, { useState } from "react";
import { motion } from "framer-motion";
import { Video, Camera, Mic, Wifi, ArrowRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const VideoConsultation = () => {
  const { t } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleJoinCall = () => {
    const room = "medinova-" + Date.now();
    window.open(`https://meet.jit.si/${room}`, "_blank");
    setIsDialogOpen(false);
  };

  const steps = [
    {
      icon: Camera,
      text: t("videoConsultation.instrCamera"),
      color: "text-emerald-500",
    },
    {
      icon: Wifi,
      text: t("videoConsultation.instrInternet"),
      color: "text-navy-500",
    },
  ];

  return (
    <section id="video-consultation" className="py-24 relative overflow-hidden bg-white">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50/50 rounded-full blur-3xl -mr-64 -mt-64 opacity-60" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-navy-50/30 rounded-full blur-3xl -ml-64 -mb-64 opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {t("videoConsultation.tag")}
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-navy-500 mb-6 leading-tight flex items-center gap-4">
              <div className="w-12 h-12 bg-navy-500 rounded-2xl flex items-center justify-center shrink-0 shadow-xl shadow-navy-100">
                <Video className="text-white w-6 h-6" />
              </div>
              {t("videoConsultation.title")}
            </h2>

            <p className="text-lg text-navy-400 mb-10 leading-relaxed max-w-xl">
              {t("videoConsultation.desc")}
            </p>

            <div className="space-y-6 mb-10">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-navy-50/50 rounded-2xl border border-navy-100/50">
                  <div className={cn("p-2 rounded-xl bg-white shadow-sm", step.color)}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="text-navy-500 font-bold">{step.text}</span>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsDialogOpen(true)}
              className="bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-emerald-100 hover:bg-emerald-600 transition-all flex items-center gap-3 group"
            >
              {t("videoConsultation.btn")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
             <div className="aspect-square rounded-[60px] bg-navy-50 overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=1000" 
                  alt="Doctor on video call"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                
                {/* Floating Elements */}
                <div className="absolute bottom-10 left-10 right-10 glass border-white/20 p-6 rounded-3xl backdrop-blur-md">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border-2 border-emerald-500 p-1 overflow-hidden">
                        <img src="https://i.pravatar.cc/150?u=doc1" className="w-full h-full object-cover rounded-full" />
                      </div>
                      <div>
                        <div className="text-white font-bold">Dr. Sarah Jenkins</div>
                        <div className="text-emerald-300 text-xs font-bold">Available Now</div>
                      </div>
                      <div className="ml-auto w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                         <Mic className="text-white w-5 h-5" />
                      </div>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-none bg-white rounded-[40px]">
          <div className="p-10 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 blur-2xl opacity-50" />
            
            <div className="w-16 h-16 bg-emerald-100 rounded-3xl flex items-center justify-center mb-6 relative z-10 animate-bounce">
              <Video className="text-emerald-600 w-8 h-8" />
            </div>

            <DialogHeader className="relative z-10 mb-6">
              <DialogTitle className="text-3xl font-black text-navy-500">
                {t("videoConsultation.popupTitle")}
              </DialogTitle>
              <DialogDescription className="text-lg text-navy-400 py-2">
                {t("videoConsultation.popupDesc")}
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={handleJoinCall}
                className="flex-1 bg-emerald-500 text-white py-4 rounded-2xl font-black hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-emerald-50 shadow-navy-100"
              >
                <span>{t("videoConsultation.confirm")}</span>
                <ExternalLink className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="flex-1 bg-navy-50 text-navy-500 py-4 rounded-2xl font-bold hover:bg-navy-100 transition-all"
              >
                {t("videoConsultation.cancel")}
              </button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default VideoConsultation;
