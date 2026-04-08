import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Calendar, Clock, User, Phone, CheckCircle2, Loader2, PartyPopper } from "lucide-react";
import { useDoctors } from "@/hooks/useDoctors";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import Modal from "../common/Modal";

const Appointment = () => {
  const { departments, getDoctorsByDepartment } = useDoctors();
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    department: "",
    doctor: "",
    date: "",
    time: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableDoctors = formData.department ? getDoctorsByDepartment(formData.department) : [];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = t("appointment.nameReq");
    if (!formData.phone) {
      newErrors.phone = t("appointment.phoneReq");
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = t("appointment.phoneDigits");
    }
    if (!formData.department || formData.department === "Select Department") {
      newErrors.department = t("appointment.deptReq");
    }
    if (!formData.doctor || formData.doctor === "Select Doctor") {
      newErrors.doctor = t("appointment.docReq");
    }
    if (!formData.date) {
      newErrors.date = t("appointment.dateReq");
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = t("appointment.datePast");
      }
    }
    if (!formData.time) newErrors.time = t("appointment.timeReq");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset doctor if department changes
      ...(name === "department" ? { doctor: "" } : {}),
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      setErrors({}); // Clear previous errors
      
      try {
        const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
        const response = await fetch(`${API_BASE}/api/appointments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, language }),
        });

        const result = await response.json();

        if (result.success) {
          setShowSuccess(true);
          setFormData({
            name: "",
            phone: "",
            department: "",
            doctor: "",
            date: "",
            time: "",
            message: "",
          });
        } else {
          setErrors({ submit: result.message || t("common.error") });
        }
      } catch (err) {
        console.error("Booking Error:", err);
        setErrors({ submit: t("common.error") });
      } finally {
        setLoading(false);
      }
    }
  };

  const isFormValid = formData.name && /^\d{10}$/.test(formData.phone) && formData.department && formData.doctor && formData.date && formData.time;

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative SVG Patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-50/30 -skew-x-[20deg] origin-top translate-x-1/2 -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Content */}
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6 }}
           viewport={{ once: true }}
           className="flex flex-col gap-6"
        >
          <div className="text-emerald-600 font-bold text-sm tracking-wider uppercase mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{t("appointment.consultExperts")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-navy-500 font-sans leading-tight">
            {t("appointment.title").split(" ").map((word, i) => i > 2 ? <span key={i} className="text-emerald-500 text-gradient ml-1">{word}</span> : word + " ")}
          </h2>
          <p className="text-navy-400 text-lg leading-relaxed max-w-lg">
            {t("appointment.desc")}
          </p>

          <div className="mt-8 flex flex-col gap-6 font-sans">
            {[
              "State-of-the-art medical facilities",
              "Expert doctors with global experience",
              "Advanced diagnostic equipment",
              "Compassionate and patient-centric care",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-navy-500 font-medium">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Form UI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white p-8 lg:p-12 rounded-[50px] shadow-2xl shadow-navy-100/30 border border-emerald-50 relative"
        >
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-navy-500 font-bold text-sm ml-2">{t("appointment.nameLabel")}</label>
                <div className="relative">
                  <User className={cn("absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors", errors.name ? "text-red-400" : "text-navy-300")} />
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={cn(
                      "w-full pl-12 pr-4 py-4 bg-navy-50 border-none rounded-2xl focus:ring-2 ring-offset-2 transition-all outline-none text-navy-500 font-medium",
                      errors.name ? "ring-2 ring-red-400" : "focus:ring-emerald-500"
                    )}
                  />
                </div>
                {errors.name && <span className="text-red-500 text-xs ml-2 font-medium">{errors.name}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-navy-500 font-bold text-sm ml-2">{t("appointment.phoneLabel")}</label>
                <div className="relative">
                  <Phone className={cn("absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors", errors.phone ? "text-red-400" : "text-navy-300")} />
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit number"
                    className={cn(
                      "w-full pl-12 pr-4 py-4 bg-navy-50 border-none rounded-2xl focus:ring-2 ring-offset-2 transition-all outline-none text-navy-500 font-medium",
                      errors.phone ? "ring-2 ring-red-400" : "focus:ring-emerald-500"
                    )}
                  />
                </div>
                {errors.phone && <span className="text-red-500 text-xs ml-2 font-medium">{errors.phone}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-navy-500 font-bold text-sm ml-2">{t("appointment.deptLabel")}</label>
                <select 
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full px-4 py-4 bg-navy-50 border-none rounded-2xl focus:ring-2 ring-offset-2 transition-all outline-none text-navy-500 font-medium appearance-none cursor-pointer",
                    errors.department ? "ring-2 ring-red-400" : "focus:ring-emerald-500"
                  )}
                >
                  <option value="">{t("appointment.selectDept")}</option>
                  {departments.map(dept => {
                    const translatedDept = t(`departments.${dept.toLowerCase()}`);
                    return (
                      <option key={dept} value={dept}>
                        {typeof translatedDept === 'object' ? (translatedDept as any).name : translatedDept}
                      </option>
                    );
                  })}
                </select>
                {errors.department && <span className="text-red-500 text-xs ml-2 font-medium">{errors.department}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-navy-500 font-bold text-sm ml-2">{t("appointment.docLabel")}</label>
                <select 
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleInputChange}
                  disabled={!formData.department}
                  className={cn(
                    "w-full px-4 py-4 bg-navy-50 border-none rounded-2xl focus:ring-2 ring-offset-2 transition-all outline-none text-navy-500 font-medium appearance-none cursor-pointer",
                    !formData.department && "opacity-50 cursor-not-allowed",
                    errors.doctor ? "ring-2 ring-red-400" : "focus:ring-emerald-500"
                  )}
                >
                  <option value="">{formData.department ? t("appointment.selectDoc") : t("appointment.selectDeptFirst")}</option>
                  {availableDoctors.map(doctor => <option key={doctor.id} value={doctor.name}>{doctor.name}</option>)}
                </select>
                {errors.doctor && <span className="text-red-500 text-xs ml-2 font-medium">{errors.doctor}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-navy-500 font-bold text-sm ml-2">{t("appointment.dateLabel")}</label>
                <div className="relative">
                  <Calendar className={cn("absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none transition-colors", errors.date ? "text-red-400" : "text-navy-300")} />
                  <input 
                    type="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full pl-12 pr-4 py-4 bg-navy-50 border-none rounded-2xl focus:ring-2 ring-offset-2 transition-all outline-none text-navy-500 font-medium cursor-pointer",
                      errors.date ? "ring-2 ring-red-400" : "focus:ring-emerald-500"
                    )}
                  />
                </div>
                {errors.date && <span className="text-red-500 text-xs ml-2 font-medium">{errors.date}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-navy-500 font-bold text-sm ml-2">{t("appointment.timeLabel")}</label>
                <div className="relative">
                  <Clock className={cn("absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none transition-colors", errors.time ? "text-red-400" : "text-navy-300")} />
                  <input 
                    type="time" 
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full pl-12 pr-4 py-4 bg-navy-50 border-none rounded-2xl focus:ring-2 ring-offset-2 transition-all outline-none text-navy-500 font-medium cursor-pointer",
                      errors.time ? "ring-2 ring-red-400" : "focus:ring-emerald-500"
                    )}
                  />
                </div>
                {errors.time && <span className="text-red-500 text-xs ml-2 font-medium">{errors.time}</span>}
              </div>
            </div>

             <div className="flex flex-col gap-2">
              <label className="text-navy-500 font-bold text-sm ml-2">{t("appointment.msgLabel")}</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder={t("appointment.msgPlaceholder")}
                rows={3}
                className="w-full px-4 py-4 bg-navy-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 ring-offset-2 transition-all outline-none text-navy-500 font-medium resize-none"
              />
            </div>

            {errors.submit && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl text-sm font-bold animate-shake text-center">
                {errors.submit}
              </div>
            )}

            <button
               type="submit"
               disabled={loading || !isFormValid}
               className={cn(
                 "w-full py-5 rounded-2xl font-bold text-lg transition-all shadow-xl mt-4 flex items-center justify-center gap-3 active:scale-95",
                 loading || !isFormValid 
                  ? "bg-navy-200 text-navy-400 cursor-not-allowed shadow-none" 
                  : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-200"
               )}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t("common.booking")}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {t("navbar.book")}
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>

      <Modal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)}
        className="text-center"
      >
        <div className="flex flex-col items-center gap-6 py-4">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-navy-500 mb-2">{t("common.success")}</h3>
            <div className="inline-block px-4 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black uppercase tracking-widest mb-4">
               {t("appointment.status")}: {t("appointment.confirmed")}
            </div>
            <p className="text-navy-400 text-lg">{t("appointment.successDesc")}</p>
          </div>
          
          <div className="flex flex-col w-full gap-3">
            <button 
              onClick={() => setShowSuccess(false)}
              className="bg-navy-50 text-navy-500 w-full py-5 rounded-2xl font-bold hover:bg-navy-100 transition-all text-lg"
            >
              {t("appointment.thanks")}
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Appointment;
