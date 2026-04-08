import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How do I book an appointment?",
    answer: "You can book an appointment through our website's 'Book Appointment' button, or by calling our 24/7 helpline at +1 234 567 890. Choose your preferred doctor and department for a seamless experience.",
  },
  {
    question: "Do you offer telemedicine services?",
    answer: "Yes, we provide high-quality video consultations with our specialists. You can schedule a virtual visit just like a regular appointment and consult with our doctors from the comfort of your home.",
  },
  {
    question: "What insurance providers do you accept?",
    answer: "We are partnered with major national and international insurance providers including BlueCross, Aetna, Cigna, and more. Please check our insurance page or contact billing for a complete list.",
  },
  {
    question: "How are emergency services handled?",
    answer: "Our Emergency department is open 24/7. We have a dedicated trauma team and state-of-the-art ambulances equipped with life-saving technology ready to respond to any critical situation.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <section id="faq" className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-sm tracking-widest uppercase mb-4"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Common Questions</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-navy-500 mb-6">
            Frequently Asked <span className="text-emerald-500">Questions</span>
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "border rounded-[32px] transition-all duration-300",
                activeIndex === index 
                   ? "border-emerald-200 bg-emerald-50/30 shadow-xl shadow-emerald-100/20" 
                   : "border-navy-50 bg-white hover:border-emerald-100"
              )}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-6"
              >
                <span className={cn(
                    "text-xl font-bold transition-colors",
                    activeIndex === index ? "text-navy-500" : "text-navy-400 group-hover:text-navy-500"
                )}>
                  {faq.question}
                </span>
                <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                    activeIndex === index ? "bg-emerald-500 text-white rotate-180" : "bg-navy-50 text-navy-400"
                )}>
                  {activeIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-8 text-navy-400 leading-relaxed text-lg border-t border-emerald-50 mt-2 pt-6">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
