import React from "react";
import { motion } from "framer-motion";
import { Activity, LayoutGrid } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import BMI from "./BMI";
import Calorie from "./Calorie";
import HeartRate from "./HeartRate";

const HealthTools = () => {
  const { t } = useLanguage();

  return (
    <section id="tools" className="py-24 bg-navy-50/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-sm tracking-widest uppercase mb-4"
          >
            <Activity className="w-4 h-4" />
            <span>{t("navbar.tools")}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-navy-500 mb-6"
          >
             Smart Medical <span className="text-emerald-500">Calculators</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-navy-400 max-w-2xl mx-auto text-lg"
          >
            Empower yourself with our interactive health tools designed to help you monitor your wellness and fitness journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
           >
             <BMI />
           </motion.div>
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
           >
             <Calorie />
           </motion.div>
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
           >
             <HeartRate />
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HealthTools;
