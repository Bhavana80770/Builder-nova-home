import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Info, RefreshCw, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HeartRate = () => {
  const { t } = useLanguage();
  const [age, setAge] = useState<string>("");
  const [result, setResult] = useState<{ zones: { name: string; range: string; color: string; desc: string }[] } | null>(null);

  const calculateZones = () => {
    const a = parseInt(age);
    if (a > 0 && a < 120) {
      const maxHR = 220 - a;
      const zones = [
        { 
          name: "Warm-up", 
          range: `${Math.round(maxHR * 0.5)}-${Math.round(maxHR * 0.6)}`, 
          color: "bg-emerald-500",
          desc: "Light exercise to prepare your body"
        },
        { 
          name: "Fat Burn", 
          range: `${Math.round(maxHR * 0.6)}-${Math.round(maxHR * 0.7)}`, 
          color: "bg-amber-500",
          desc: "Ideal for weight loss & endurance"
        },
        { 
          name: "Cardio", 
          range: `${Math.round(maxHR * 0.7)}-${Math.round(maxHR * 0.8)}`, 
          color: "bg-orange-500",
          desc: "Improves aerobics & fitness level"
        },
        { 
          name: "Peak", 
          range: `${Math.round(maxHR * 0.8)}-${Math.round(maxHR * 0.9)}`, 
          color: "bg-red-500",
          desc: "High-intensity performance training"
        },
      ];
      setResult({ zones });
    }
  };

  const reset = () => {
    setAge("");
    setResult(null);
  };

  return (
    <div className="bg-white p-8 rounded-[40px] shadow-xl border border-navy-50 h-full flex flex-col hover:shadow-2xl hover:shadow-red-100/20 transition-all">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-red-50 p-3 rounded-2xl text-red-600">
          <Activity className="w-6 h-6 border-red-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-navy-500">Heart Rate Zones</h3>
          <p className="text-navy-400 text-xs">Target intensity for your age</p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div className="space-y-2">
          <label className="text-sm font-bold text-navy-400 ml-2">How old are you?</label>
          <div className="relative">
             <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g. 25"
              className="w-full px-6 py-4 bg-navy-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all font-bold text-navy-500"
            />
          </div>
        </div>
      </div>

      <div className="mt-auto">
        {!result ? (
          <button
            onClick={calculateZones}
            className="w-full bg-navy-500 text-white py-4 rounded-2xl font-bold hover:bg-red-600 transition-all shadow-lg active:scale-95"
          >
            Calculate Zones
          </button>
        ) : (
          <div className="space-y-4">
             <div className="flex flex-col gap-3">
                {result.zones.map((zone, idx) => (
                  <motion.div 
                    key={zone.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center justify-between p-3 bg-navy-50 rounded-2xl group"
                  >
                     <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${zone.color} shadow-lg`} />
                        <div>
                           <div className="text-xs font-black text-navy-500">{zone.name}</div>
                           <div className="text-[10px] text-navy-300 font-bold leading-none">{zone.desc}</div>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="text-sm font-black text-navy-500">{zone.range}</div>
                        <div className="text-[10px] text-navy-300 font-bold">BPM</div>
                     </div>
                  </motion.div>
                ))}
             </div>
             <button
               onClick={reset}
               className="w-full flex items-center justify-center gap-2 text-navy-400 font-bold hover:text-navy-500 transition-colors py-2"
            >
              <RefreshCw className="w-4 h-4" />
              {t("common.reset")}
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-start gap-2 p-4 bg-red-50/50 rounded-2xl">
        <Heart className="w-4 h-4 text-red-300 shrink-0 mt-0.5 fill-red-500" />
        <p className="text-[10px] text-red-800 leading-tight">
          These zones are based on age-predicted maximum heart rates. Target ranges should be adjusted by a physician for individuals with heart conditions.
        </p>
      </div>
    </div>
  );
};

export default HeartRate;
