import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Info, RefreshCw, Layers } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Calorie = () => {
  const { t } = useLanguage();
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [activity, setActivity] = useState<string>("1.2");
  const [result, setResult] = useState<number | null>(null);

  const calculateCalories = () => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const act = parseFloat(activity);

    if (a > 0 && w > 0 && h > 0) {
      let bmr = 0;
      if (gender === "male") {
        bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a);
      } else {
        bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
      }
      setResult(Math.round(bmr * act));
    }
  };

  const reset = () => {
     setAge("");
     setWeight("");
     setHeight("");
     setResult(null);
  }

  return (
    <div className="bg-white p-8 rounded-[40px] shadow-xl border border-navy-50 h-full flex flex-col transition-all hover:border-emerald-100">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-emerald-50 p-3 rounded-2xl text-emerald-600">
          <Zap className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-navy-500">Calorie Tracker</h3>
          <p className="text-navy-400 text-xs text-nowrap">Daily energy requirement</p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex bg-navy-50 p-1 rounded-2xl">
          <button 
            onClick={() => setGender("male")}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${gender === "male" ? "bg-white text-navy-500 shadow-md" : "text-navy-400 hover:text-navy-500"}`}
          >
            Male
          </button>
          <button 
            onClick={() => setGender("female")}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${gender === "female" ? "bg-white text-navy-500 shadow-md" : "text-navy-400 hover:text-navy-500"}`}
          >
            Female
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-navy-400 ml-2 uppercase tracking-wide">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              className="w-full px-4 py-3 bg-navy-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold text-navy-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-navy-400 ml-2 uppercase tracking-wide">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="kg"
              className="w-full px-4 py-3 bg-navy-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold text-navy-500"
            />
          </div>
        </div>

        <div className="space-y-1">
           <label className="text-[10px] font-bold text-navy-400 ml-2 uppercase tracking-wide">Height (cm)</label>
           <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="cm"
              className="w-full px-4 py-3 bg-navy-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold text-navy-500"
            />
        </div>

        <div className="space-y-1">
           <label className="text-[10px] font-bold text-navy-400 ml-2 uppercase tracking-wide">Activity Level</label>
           <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full px-4 py-3 bg-navy-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold text-navy-500 appearance-none cursor-pointer"
            >
              <option value="1.2">Sedentary (Little to no exercise)</option>
              <option value="1.375">Lightly Active (1-3 days/week)</option>
              <option value="1.55">Moderately Active (3-5 days/week)</option>
              <option value="1.725">Very Active (6-7 days/week)</option>
              <option value="1.9">Extra Active (Very hard exercise)</option>
            </select>
        </div>
      </div>

      <div className="mt-auto">
        {!result ? (
          <button
            onClick={calculateCalories}
            className="w-full bg-navy-500 text-white py-4 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg active:scale-95"
          >
            Show Requirement
          </button>
        ) : (
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="text-center"
          >
             <div className="text-4xl font-black text-navy-500 mb-1 flex items-baseline justify-center gap-2">
                <span>{result}</span>
                <span className="text-sm text-navy-300 font-bold">kcal/day</span>
             </div>
             <p className="text-emerald-500 font-bold text-sm mb-4">Maintain Weight</p>
             <button
               onClick={reset}
               className="w-full flex items-center justify-center gap-2 text-navy-400 font-bold hover:text-navy-500 transition-colors py-2"
            >
              <RefreshCw className="w-4 h-4" />
              {t("common.reset")}
            </button>
          </motion.div>
        )}
      </div>

      <div className="mt-6 flex items-start gap-2 p-4 bg-emerald-50 rounded-2xl">
        <Layers className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
        <p className="text-[10px] text-emerald-700 leading-tight">
          This estimate is based on the Harris-Benedict formula. Your actual biological needs may vary.
        </p>
      </div>
    </div>
  );
};

export default Calorie;
