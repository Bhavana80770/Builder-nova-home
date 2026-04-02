import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MoveRight
} from "lucide-react";
import { departmentsData, Department } from "../../data/departmentsData";
import DepartmentModal from "./DepartmentModal";
import { useLanguage } from "@/contexts/LanguageContext";

const Departments = () => {
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const { t } = useLanguage();

  return (
    <section id="departments" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-50 rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-emerald-600 font-bold text-sm tracking-wider uppercase mb-3 px-4 py-1 glass border-emerald-100/50 w-fit mx-auto rounded-full"
          >
            {t("departments.tag")}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-navy-500 font-sans"
          >
            {t("departments.title").split(" ").map((word, i) => i === 1 ? <span key={i} className="text-emerald-500 text-gradient ml-1">{word}</span> : word + " ")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-navy-400 mt-4 max-w-2xl mx-auto text-lg"
          >
            {t("departments.desc")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departmentsData.map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[40px] border border-navy-50 hover:border-emerald-100 hover:shadow-2xl hover:shadow-emerald-100/30 transition-all group bg-white"
            >
              <div className={`w-16 h-16 ${dept.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <dept.icon className={`${dept.iconColor} w-8 h-8`} />
              </div>
              <h3 className="text-2xl font-bold text-navy-500 mb-3 group-hover:text-emerald-500 transition-colors">
                {t(`departments.${dept.id}.name`)}
              </h3>
              <p className="text-navy-400 leading-relaxed mb-6">
                {t(`departments.${dept.id}.desc`)}
              </p>
              <button 
                onClick={() => setSelectedDept(dept)}
                className="flex items-center gap-2 text-emerald-600 font-bold hover:gap-4 transition-all uppercase text-xs tracking-widest active:scale-95 origin-left"
              >
                {t("services.learnMore")}
                <MoveRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Department Detail Modal */}
      <AnimatePresence>
        {selectedDept && (
          <DepartmentModal 
            department={selectedDept} 
            onClose={() => setSelectedDept(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Departments;
