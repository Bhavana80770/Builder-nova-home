import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Stethoscope, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Utensils, 
  Dumbbell, 
  UserRoundSearch,
  Activity,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Symptom {
  id: string;
  label: string;
}

const symptoms: Symptom[] = [
  { id: "fever", label: "Fever" },
  { id: "cough", label: "Cough" },
  { id: "headache", label: "Headache" },
  { id: "fatigue", label: "Fatigue" },
  { id: "chest_pain", label: "Chest Pain" },
  { id: "breath", label: "Shortness of Breath" },
  { id: "vomiting", label: "Vomiting" },
  { id: "dizziness", label: "Dizziness" },
];

interface Prediction {
  condition: string;
  confidence: number;
  action: "Rest" | "Consult Doctor" | "Emergency";
  diet: string;
  exercise: string;
  dept: string;
  color: string;
}

const DiseasePredictor = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const runPrediction = () => {
    if (selectedSymptoms.length === 0) return;

    let result: Prediction = {
      condition: "General Malaise",
      confidence: 50,
      action: "Rest",
      diet: "Light meals, plenty of fluids",
      exercise: "Walking, light stretching",
      dept: "General Physician",
      color: "blue",
    };

    // Rule-based logic
    const has = (id: string) => selectedSymptoms.includes(id);

    if (has("chest_pain") && has("breath")) {
      result = {
        condition: "Possible Cardiac Issue",
        confidence: 95,
        action: "Emergency",
        diet: "Low sodium, heart-healthy fats",
        exercise: "Strictly avoid exertion",
        dept: "Cardiology",
        color: "red",
      };
    } else if (has("fever") && has("cough")) {
      result = {
        condition: "Viral Flu / Infection",
        confidence: 85,
        action: "Consult Doctor",
        diet: "Warm soups, Vitamin C rich foods",
        exercise: "Rest until fever subsides",
        dept: "Internal Medicine",
        color: "emerald",
      };
    } else if (has("headache") && has("dizziness")) {
      result = {
        condition: "Migraine / Vertigo",
        confidence: 70,
        action: "Consult Doctor",
        diet: "Avoid caffeine and triggers",
        exercise: "Moderate aerobic activity",
        dept: "Neurology",
        color: "amber",
      };
    } else if (has("fatigue") && has("fever")) {
        result = {
            condition: "Possible Dehydration / Viral",
            confidence: 65,
            action: "Rest",
            diet: "Electrolytes, ORS, Water",
            exercise: "No strenuous exercise",
            dept: "General Physician",
            color: "blue",
        };
    }

    setPrediction(result);

    // Scroll to results
    setTimeout(() => {
        const el = document.getElementById("prediction-results");
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  return (
    <section id="predictor" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Side: Symptom Selection */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-emerald-600 font-bold text-sm tracking-widest uppercase mb-4"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Smart Diagnostic</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-navy-500 mb-6 font-sans">
              AI Symptom <span className="text-emerald-500">Predictor</span>
            </h2>
            <p className="text-navy-400 text-lg mb-10 leading-relaxed">
              Select the symptoms you are currently experiencing. Our rule-based AI will analyze the patterns and provide a preliminary condition check.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-10">
              {symptoms.map((symptom) => (
                <button
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom.id)}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-2xl border-2 transition-all font-bold text-left",
                    selectedSymptoms.includes(symptom.id)
                      ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-lg shadow-emerald-100"
                      : "bg-white border-navy-50 text-navy-400 hover:border-emerald-100 hover:text-navy-500"
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                    selectedSymptoms.includes(symptom.id) ? "bg-emerald-500 border-emerald-500" : "border-navy-100"
                  )}>
                    {selectedSymptoms.includes(symptom.id) && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  {symptom.label}
                </button>
              ))}
            </div>

            <button
              onClick={runPrediction}
              disabled={selectedSymptoms.length === 0}
              className="w-full bg-navy-500 text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-500 transition-all shadow-xl shadow-navy-100/20 disabled:bg-navy-100 disabled:shadow-none disabled:cursor-not-allowed group"
            >
              Check Condition
              <ChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-8 flex items-start gap-3 p-6 bg-amber-50 rounded-2xl border border-amber-100">
              <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900 font-medium leading-relaxed">
                <span className="font-black">IMPORTANT:</span> This is not a medical diagnosis. The results are based on predefined rules and patterns. Please consult a qualified doctor for clinical evaluation.
              </p>
            </div>
          </div>

          {/* Right Side: Prediction Results */}
          <div className="w-full lg:w-1/2 min-h-[400px]">
            <AnimatePresence mode="wait">
              {!prediction ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full border-4 border-dashed border-navy-50 rounded-[40px] flex flex-col items-center justify-center p-12 text-center"
                >
                  <div className="bg-navy-50 p-6 rounded-full mb-6">
                    <Activity className="w-12 h-12 text-navy-200" />
                  </div>
                  <h4 className="text-xl font-bold text-navy-300">Awaiting Input</h4>
                  <p className="text-navy-300 text-sm mt-2">Select your symptoms and click calculate to see medical recommendations.</p>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  id="prediction-results"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-navy-50/50 p-8 md:p-12 rounded-[50px] border border-navy-50 relative overflow-hidden"
                >
                  {/* Confidence Badge */}
                  <div className="absolute top-8 right-8">
                    <div className={cn(
                        "px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-lg",
                        prediction.color === "red" ? "bg-red-500 text-white" : 
                        prediction.color === "emerald" ? "bg-emerald-500 text-white" : 
                        prediction.color === "amber" ? "bg-amber-500 text-white" : "bg-blue-500 text-white"
                    )}>
                      {prediction.confidence}% Confidence
                    </div>
                  </div>

                  <div className="mb-10">
                    <div className="text-navy-400 font-bold text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                       <Info className="w-4 h-4" />
                       Possible Condition
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-navy-500 leading-tight">
                      {prediction.condition}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-navy-50 text-center">
                       <Stethoscope className="w-6 h-6 text-emerald-500 mx-auto mb-3" />
                       <div className="text-[10px] font-black text-navy-300 uppercase mb-1">Action</div>
                       <div className="text-sm font-bold text-navy-500">{prediction.action}</div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-navy-50 text-center">
                       <UserRoundSearch className="w-6 h-6 text-blue-500 mx-auto mb-3" />
                       <div className="text-[10px] font-black text-navy-300 uppercase mb-1">Department</div>
                       <div className="text-sm font-bold text-navy-500">{prediction.dept}</div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-navy-50 text-center">
                       <Activity className="w-6 h-6 text-red-500 mx-auto mb-3" />
                       <div className="text-[10px] font-black text-navy-300 uppercase mb-1">Priority</div>
                       <div className="text-sm font-bold text-navy-500">
                          {prediction.action === "Emergency" ? "Critical" : "Standard"}
                       </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                     <div className="flex gap-4 items-start">
                        <div className="bg-emerald-50 p-3 rounded-2xl shrink-0">
                           <Utensils className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                           <h5 className="font-black text-navy-500 text-sm">Diet Recommendation</h5>
                           <p className="text-navy-400 text-sm leading-relaxed">{prediction.diet}</p>
                        </div>
                     </div>
                     <div className="flex gap-4 items-start">
                        <div className="bg-blue-50 p-3 rounded-2xl shrink-0">
                           <Dumbbell className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                           <h5 className="font-black text-navy-500 text-sm">Exercise Support</h5>
                           <p className="text-navy-400 text-sm leading-relaxed">{prediction.exercise}</p>
                        </div>
                     </div>
                  </div>

                  {prediction.action === "Emergency" && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 p-6 bg-red-50 border border-red-100 rounded-3xl flex items-center justify-between gap-4"
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-red-500 p-2 rounded-full animate-pulse">
                                <AlertTriangle className="text-white w-5 h-5" />
                            </div>
                            <div className="text-red-900 font-bold truncate">Call Emergency 108</div>
                        </div>
                        <button className="bg-red-500 text-white px-6 py-2 rounded-2xl font-black text-xs hover:bg-red-600 transition-all shadow-lg shadow-red-200">
                            CALL NOW
                        </button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiseasePredictor;
