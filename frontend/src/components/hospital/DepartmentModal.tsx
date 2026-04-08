import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Calendar, User, ArrowRight } from "lucide-react";
import { Department } from "../../data/departmentsData";
import { cn } from "@/lib/utils";

interface DepartmentModalProps {
  department: Department | null;
  onClose: () => void;
}

const DepartmentModal: React.FC<DepartmentModalProps> = ({ department, onClose }) => {
  if (!department) return null;

  const handleBookNow = () => {
    onClose();
    // Small delay to allow modal exit animation to feel more natural before scroll
    setTimeout(() => {
      const element = document.getElementById("contact");
      element?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <AnimatePresence>
      {department && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy-500/40 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden border border-emerald-50"
          >
            {/* Header / Banner */}
            <div className={cn("h-32 md:h-40 relative px-8 py-10 flex items-end", department.color)}>
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-navy-500 hover:text-red-500 transition-colors shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <department.icon className={cn("w-8 h-8", department.iconColor)} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-navy-500 leading-tight">
                    {department.name}
                  </h2>
                  <div className="flex items-center gap-2 text-navy-400 text-sm font-bold opacity-80 uppercase tracking-widest mt-1">
                    <User className="w-3 h-3" />
                    Lead: {department.doctor}
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-8 md:p-10">
              <div className="mb-8">
                <h3 className="text-lg font-black text-navy-500 mb-3 flex items-center gap-2">
                  About Department
                </h3>
                <p className="text-navy-400 leading-relaxed text-base">
                  {department.details}
                </p>
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-black text-navy-500 mb-4">Core Services</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {department.services.map((service, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-navy-50/50 border border-transparent hover:border-emerald-100 hover:bg-emerald-50/30 transition-all cursor-default group"
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-sm font-bold text-navy-400 group-hover:text-navy-500 transition-colors">
                        {service}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Footer CTA */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={handleBookNow}
                  className="w-full sm:flex-1 bg-navy-500 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-navy-100 hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 group"
                >
                  <Calendar className="w-5 h-5" />
                  Book Appointment
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-10 py-5 rounded-2xl font-bold text-navy-400 hover:text-navy-500 hover:bg-navy-50 transition-all border border-navy-50"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Bottom Accent */}
            <div className={cn("h-2 w-full", department.iconColor.replace("text-", "bg-"))} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DepartmentModal;
