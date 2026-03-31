import React from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall, ShieldCheck, Heart, Activity } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-0 w-1/3 h-2/3 bg-emerald-50/50 rounded-l-[100px] -z-10 blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-navy-50/50 rounded-r-[100px] -z-10 blur-3xl opacity-40" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-emerald-100/50 text-emerald-600 font-bold text-sm w-fit shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>{t("hero.tag")}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-navy-500 leading-[1.1] font-sans">
            {t("hero.title")} <br />
            <span className="text-emerald-500 text-gradient">{t("hero.titleAccent")}</span>
          </h1>

          <p className="text-navy-400 text-lg md:text-xl max-w-xl leading-relaxed">
            {t("hero.desc")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button 
              onClick={() => {
                const element = document.getElementById("contact");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center justify-center gap-2 bg-navy-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-navy-600 transition-all shadow-xl hover:shadow-navy-100 group"
            >
              {t("hero.cta")}
              <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById("services");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center justify-center gap-2 border-2 border-emerald-500 text-emerald-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all"
            >
              <PhoneCall className="w-5 h-5" />
              {t("hero.view")}
            </button>
          </div>

          {/* Stats/Badges */}
          <div className="flex items-center gap-8 mt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-navy-500 flex items-center justify-center text-white text-xs font-bold">
                +2k
              </div>
            </div>
            <div className="text-sm font-medium text-navy-400">
              <span className="text-navy-500 font-bold">Happy Patients</span>
              <br />
              Trusted across the globe
            </div>
          </div>
        </motion.div>

        {/* Right Side: Modern UI Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative pt-10"
        >
          {/* Main SVG/Gradient Card */}
          <div className="relative w-full max-w-[500px] aspect-square mx-auto">
            {/* Primary Shape */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-[60px] shadow-2xl shadow-emerald-200 transform rotate-3 flex items-center justify-center"
            >
               <div className="w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] rounded-inherit" />
            </motion.div>

            {/* Overlapping Content Cards */}
            <motion.div 
              animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 glass p-6 rounded-3xl shadow-xl w-64 border-emerald-100/50"
            >
              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 p-3 rounded-2xl">
                  <Activity className="text-emerald-600 w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-navy-400 font-bold mb-1 uppercase tracking-wider">Heart Rate</div>
                  <div className="text-2xl font-bold text-navy-500">72 BPM</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 glass p-6 rounded-3xl shadow-xl w-64 border-emerald-100/50"
            >
               <div className="flex items-center gap-4">
                <div className="bg-emerald-100 p-3 rounded-2xl">
                  <Heart className="text-emerald-600 w-6 h-6 fill-emerald-600/20" />
                </div>
                <div>
                  <div className="text-xs text-navy-400 font-bold mb-1 uppercase tracking-wider">Health Status</div>
                  <div className="text-xl font-bold text-navy-500">Normal Range</div>
                </div>
              </div>
              <div className="mt-4 h-2 w-full bg-emerald-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-emerald-500" 
                />
              </div>
            </motion.div>

            {/* Center Decorative Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 rounded-full backdrop-blur-3xl border border-white/20 animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
