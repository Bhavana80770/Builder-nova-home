import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Clock, 
  ArrowRight, 
  Stethoscope, 
  Brain, 
  Heart, 
  Baby, 
  Bone, 
  Settings, 
  BellRing,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DeptQueue {
  id: string;
  name: string;
  icon: any;
  waiting: number;
  waitTime: number;
  current: number;
  trend: "up" | "down" | "stable";
}

const initialQueues: DeptQueue[] = [
  { id: "1", name: "Cardiology", icon: Heart, waiting: 12, waitTime: 45, current: 104, trend: "up" },
  { id: "2", name: "Neurology", icon: Brain, waiting: 5, waitTime: 20, current: 82, trend: "down" },
  { id: "3", name: "Pediatrics", icon: Baby, waiting: 18, waitTime: 65, current: 215, trend: "stable" },
  { id: "4", name: "Orthopedics", icon: Bone, waiting: 8, waitTime: 35, current: 45, trend: "up" },
  { id: "5", name: "General Med", icon: Stethoscope, waiting: 25, waitTime: 80, current: 312, trend: "stable" },
];

const QueueTracker = () => {
  const [queues, setQueues] = useState<DeptQueue[]>(initialQueues);
  const [selectedDept, setSelectedDept] = useState<string>("1");
  const [isNotified, setIsNotified] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setQueues(prev => prev.map(q => ({
        ...q,
        waiting: Math.max(1, q.waiting + (Math.random() > 0.5 ? 1 : -1)),
        waitTime: Math.max(5, q.waitTime + (Math.random() > 0.5 ? 5 : -5)),
        current: Math.random() > 0.8 ? q.current + 1 : q.current,
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeQueue = queues.find(q => q.id === selectedDept) || queues[0];

  return (
    <section id="queue-tracker" className="py-24 bg-navy-50/30 text-navy-500 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left: Interactive Tracker */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 w-full"
          >
            <div className="text-emerald-600 font-bold text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              Live Hospital Traffic
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-navy-500">
              Real-Time <br />
              <span className="text-emerald-500">Queue Intelligence</span>
            </h2>
            <p className="text-navy-400 text-lg mb-12 max-w-lg leading-relaxed font-medium">
              Check live OPD waiting times and patient traffic before you visit. Plan your consultation efficiently with our predictive queuing system.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {queues.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setSelectedDept(q.id)}
                  className={cn(
                    "p-6 rounded-[30px] border transition-all flex flex-col items-center gap-3 group text-center",
                    selectedDept === q.id 
                      ? "bg-emerald-500 border-emerald-400 shadow-xl shadow-emerald-500/20 text-white" 
                      : "bg-white border-navy-100 text-navy-400 hover:border-emerald-500/50 hover:bg-emerald-50/50"
                  )}
                >
                  <q.icon className={cn(
                    "w-8 h-8 transition-transform group-hover:scale-110",
                    selectedDept === q.id ? "text-white" : "text-emerald-500"
                  )} />
                  <span className="text-[10px] font-black uppercase tracking-widest truncate w-full">
                    {q.name}
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-lg font-black">{q.waitTime}</span>
                    <span className="text-[10px] font-bold opacity-60">min</span>
                  </div>
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setIsNotified(true)}
              className={cn(
                "mt-10 flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all active:scale-95",
                isNotified ? "bg-emerald-50 text-emerald-600 border border-emerald-500/30" : "bg-emerald-500 text-white shadow-xl shadow-emerald-200"
              )}
            >
              {isNotified ? (<><BellRing className="w-5 h-5" /> Notifications On</>) : (<><BellRing className="w-5 h-5" /> Notify Me of Wait Changes</>)}
            </button>
          </motion.div>

          {/* Right: Display Board */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 w-full"
          >
            <div className="bg-white rounded-[50px] p-8 md:p-12 border border-emerald-100 shadow-2xl relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl animate-pulse" />
              
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-navy-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                    <activeQueue.icon className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-navy-500">{activeQueue.name}</h3>
                    <p className="text-navy-300 text-xs font-bold uppercase tracking-widest">Department Status</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full text-emerald-600 font-bold border border-emerald-100 animate-pulse">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                  LIVE
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="bg-navy-50/50 p-8 rounded-[40px] border border-navy-100 text-center shadow-inner">
                   <Users className="w-6 h-6 text-emerald-500 mx-auto mb-3" />
                   <div className="text-4xl font-black mb-1 text-navy-500">{activeQueue.waiting}</div>
                   <div className="text-navy-300 text-[10px] font-black uppercase tracking-widest">Waiting Patients</div>
                </div>
                <div className="bg-navy-50/50 p-8 rounded-[40px] border border-navy-100 text-center shadow-inner">
                   <Clock className="w-6 h-6 text-emerald-500 mx-auto mb-3" />
                   <div className="text-4xl font-black mb-1 text-navy-500">{activeQueue.waitTime} <span className="text-sm font-bold text-navy-300 uppercase">m</span></div>
                   <div className="text-navy-300 text-[10px] font-black uppercase tracking-widest">Avg. Wait Time</div>
                </div>
              </div>

              <div className="mt-10 px-8 py-6 bg-navy-50 border-2 border-emerald-500/20 rounded-[40px] relative overflow-hidden group shadow-lg shadow-navy-100/50">
                <div className="flex justify-between items-center relative z-10">
                   <div>
                     <p className="text-navy-300 font-black text-[10px] uppercase tracking-[0.2em] mb-2">NOW SERVING TOKEN</p>
                     <div className="text-5xl font-black text-emerald-600 font-mono tracking-tighter">
                       #{activeQueue.current}
                     </div>
                   </div>
                   <div className="text-right">
                     <p className="text-navy-300 font-black text-[10px] uppercase tracking-[0.2em] mb-2">LAST UPDATED</p>
                     <p className="text-sm font-bold text-navy-500">Just Now</p>
                   </div>
                </div>
                {/* Decorative scanning line */}
                <div className="absolute inset-x-0 h-[2px] bg-emerald-500/20 blur-[1px] animate-pulse" style={{ top: '60%' }} />
              </div>

              <div className="mt-12 text-center">
                 <p className="text-navy-300 text-xs font-medium mb-6">Want to schedule for a specific time instead?</p>
                 <button 
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 font-black text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-widest text-xs group"
                >
                   Book Private Slot
                   <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                 </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative SVG backgrounds */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00C896" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </section>
  );
};

export default QueueTracker;
