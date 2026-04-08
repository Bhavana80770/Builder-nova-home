import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Scale, Info, RefreshCw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const BMI = () => {
  const { t } = useLanguage();
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [result, setResult] = useState<{ bmi: number; category: string; color: string } | null>(null);

  const handleWearableSync = () => {
    setIsSyncing(true);
    // Simulate fetching data from a smartwatch/wearable
    setTimeout(() => {
      setWeight("72");
      setHeight("178");
      setIsSyncing(false);
      // Optional: Auto-calculate after sync
    }, 1500);
  };

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const bmi = parseFloat((w / (h * h)).toFixed(1));
      let category = "";
      let color = "";

      if (bmi < 18.5) {
        category = t("bmi.underweight");
        color = "#3b82f6"; // Blue
      } else if (bmi < 25) {
        category = t("bmi.normal");
        color = "#10b981"; // Emerald
      } else if (bmi < 30) {
        category = t("bmi.overweight");
        color = "#f59e0b"; // Amber
      } else {
        category = t("bmi.obese");
        color = "#ef4444"; // Red
      }

      setResult({ bmi, category, color });
    }
  };

  const reset = () => {
    setWeight("");
    setHeight("");
    setResult(null);
  };

  // Rotation for the gauge pointer (-90 to 90 degrees)
  // BMI range for gauge: 15 to 40
  const pointerRotation = useMemo(() => {
    if (!result) return -90;
    const min = 15;
    const max = 40;
    const clamped = Math.min(Math.max(result.bmi, min), max);
    return ((clamped - min) / (max - min)) * 180 - 90;
  }, [result]);

  return (
    <div className="bg-white p-8 rounded-[40px] shadow-xl border border-navy-50 h-full flex flex-col relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-navy-500">{t("bmi.title")}</h3>
            <p className="text-navy-400 text-xs">Check your body mass index</p>
          </div>
        </div>
        
        <button 
          onClick={handleWearableSync}
          disabled={isSyncing}
          className={cn(
            "p-3 rounded-xl transition-all active:scale-95 flex items-center justify-center",
            isSyncing ? "bg-navy-50 text-navy-200" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
          )}
          title="Sync from Wearable"
        >
          <RefreshCw className={cn("w-5 h-5", isSyncing && "animate-spin")} />
        </button>
      </div>

      <div className="flex flex-col gap-6 mb-8">
        <div className="space-y-2">
          <label className="text-sm font-bold text-navy-400 ml-2">{t("bmi.weight")}</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 70"
            className="w-full px-6 py-4 bg-navy-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-navy-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-navy-400 ml-2">{t("bmi.height")}</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 175"
            className="w-full px-6 py-4 bg-navy-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-navy-500"
          />
        </div>
      </div>

      <div className="mt-auto">
        {!result ? (
          <button
            onClick={calculateBMI}
            className="w-full bg-navy-500 text-white py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg active:scale-95"
          >
            {t("common.calculate")}
          </button>
        ) : (
          <div className="space-y-8">
            {/* Animated Gauge */}
            <div className="relative w-48 h-24 mx-auto overflow-hidden">
               {/* Semicircle track */}
              <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[16px] border-navy-50" />
              {/* Colored segments (approximation) */}
              <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[16px] border-transparent border-l-blue-400 border-t-emerald-400 rotate-[-45deg]" />
              <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[16px] border-transparent border-r-red-400 border-t-amber-400 rotate-[45deg]" />
              
              {/* Pointer */}
              <motion.div 
                initial={{ rotate: -90 }}
                animate={{ rotate: pointerRotation }}
                transition={{ type: "spring", stiffness: 50 }}
                className="absolute bottom-0 left-24 w-1 h-20 bg-navy-500 origin-bottom -translate-x-1/2 z-10"
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-navy-500 rounded-full" />
              </motion.div>
              <div className="absolute bottom-0 left-24 w-4 h-4 bg-navy-500 rounded-full -translate-x-1/2 translate-y-1/2 z-20" />
            </div>

            <div className="text-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-4xl font-black text-navy-500 mb-1"
              >
                {result.bmi}
              </motion.div>
              <div 
                className="inline-block px-4 py-1 rounded-full text-white text-sm font-bold shadow-sm"
                style={{ backgroundColor: result.color }}
              >
                {result.category}
              </div>
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

      <div className="mt-6 flex items-start gap-2 p-4 bg-navy-50 rounded-2xl">
        <Info className="w-4 h-4 text-navy-300 shrink-0 mt-0.5" />
        <p className="text-[10px] text-navy-400 leading-tight">
          BMI is a general indicator of body fat based on height and weight. Consult a professional for a detailed assessment.
        </p>
      </div>
    </div>
  );
};

export default BMI;
