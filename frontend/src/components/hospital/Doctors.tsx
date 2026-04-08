import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Award, Calendar, ChevronRight, Search, UserRoundX } from "lucide-react";
import { useDoctors } from "@/hooks/useDoctors";
import { useLanguage } from "@/contexts/LanguageContext";

const Doctors = () => {
  const { filteredDoctors, searchTerm, setSearchTerm } = useDoctors();
  const { t } = useLanguage();

  return (
    <section id="doctors" className="py-24 bg-navy-50/30 relative">
      <div className="max-w-7xl mx-auto px-6 text-center lg:text-left">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-emerald-600 font-bold text-sm tracking-wider uppercase mb-3 flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>{t("doctors.tag")}</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-navy-500 font-sans"
            >
              {t("doctors.title").split(" ").map((word, i) => i > 2 ? <span key={i} className="text-emerald-500 ml-1">{word}</span> : word + " ")}
            </motion.h2>
          </div>

          {/* Search Input */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6 }}
             viewport={{ once: true }}
             className="relative w-full md:w-96"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-300 w-5 h-5 transition-colors group-focus-within:text-emerald-500" />
            <input 
              type="text" 
              placeholder={t("doctors.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-navy-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 ring-offset-2 transition-all outline-none text-navy-500 font-medium shadow-sm hover:border-emerald-200"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white p-6 rounded-[40px] shadow-xl shadow-navy-100/10 border border-transparent hover:border-emerald-100 transition-all text-center h-full flex flex-col">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="relative mx-auto w-32 h-32 mb-6"
                    >
                      <div className="absolute inset-0 bg-emerald-500 rounded-full scale-110 opacity-0 group-hover:opacity-10 transition-opacity" />
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg relative z-10"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full shadow-lg z-20">
                        <Star className="w-4 h-4 fill-white" />
                      </div>
                    </motion.div>

                    <h3 className="text-xl font-bold text-navy-500 mb-1 font-sans truncate">
                      {doctor.name}
                    </h3>
                    <p className="text-emerald-600 font-bold text-sm mb-4">
                      {t(`specialties.${doctor.specialty}`)}
                    </p>

                    <div className="flex items-center justify-center gap-4 py-4 px-2 bg-navy-50 rounded-2xl mb-6 mt-auto">
                      <div className="text-center">
                        <div className="text-navy-400 text-[10px] uppercase font-bold tracking-wider">{t("doctors.exp")}</div>
                        <div className="text-navy-500 font-bold text-sm">{doctor.experience}</div>
                      </div>
                      <div className="w-px h-8 bg-navy-200/50" />
                      <div className="text-center">
                        <div className="text-navy-400 text-[10px] uppercase font-bold tracking-wider">{t("doctors.rating")}</div>
                        <div className="text-navy-500 font-bold text-sm">{doctor.rating}</div>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        const contact = document.getElementById("contact");
                        contact?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full bg-navy-500 text-white py-3 rounded-2xl font-bold hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-emerald-200"
                    >
                      <Calendar className="w-4 h-4" />
                      {t("doctors.bookNow")}
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="col-span-full flex flex-col items-center justify-center py-20 gap-4"
              >
                <div className="bg-navy-50 p-6 rounded-full">
                  <UserRoundX className="w-12 h-12 text-navy-300" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-navy-500">{t("doctors.noFound")}</h3>
                  <p className="text-navy-400">{t("doctors.noFoundDesc")}</p>
                </div>
                <button 
                  onClick={() => setSearchTerm("")}
                  className="text-emerald-600 font-bold hover:underline"
                >
                  {t("doctors.clearSearch")}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Doctors;
