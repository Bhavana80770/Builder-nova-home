import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Benjamin Miller",
    country: "🇺🇸 USA",
    text: "The healthcare team was incredibly supportive throughout my surgery. Modern technology combined with human care made all the difference.",
    image: "https://i.pravatar.cc/150?u=ben",
    rating: 5,
  },
  {
    id: 2,
    name: "Sakura Tanaka",
    country: "🇯🇵 Japan",
    text: "I was impressed by the telemedicine platform. It was fast, secure, and I felt heard and respected by the specialist.",
    image: "https://i.pravatar.cc/150?u=sakura",
    rating: 5,
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    country: "🇮🇳 India",
    text: "Truly a world-class experience. The diagnosis was precise, and the recovery process was monitored with great attention to detail.",
    image: "https://i.pravatar.cc/150?u=rajesh",
    rating: 5,
  },
  {
    id: 4,
    name: "Elena Petrov",
    country: "🇷🇺 Russia",
    text: "The cardiology department is top-notch. I am so grateful for the expert care I received during my recovery.",
    image: "https://i.pravatar.cc/150?u=elena",
    rating: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const { t } = useLanguage();

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="testimonials" className="py-24 bg-navy-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-sm tracking-widest uppercase mb-4"
          >
            <Quote className="w-4 h-4 fill-emerald-500" />
            <span>Success Stories</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-navy-500 mb-6">
            Hear From Our <span className="text-emerald-500 text-gradient">Happy Patients</span>
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-20 z-10">
            <button
              onClick={prev}
              className="p-4 rounded-full bg-white shadow-xl hover:bg-emerald-500 hover:text-white transition-all text-navy-400 group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-20 z-10">
            <button
              onClick={next}
              className="p-4 rounded-full bg-white shadow-xl hover:bg-emerald-500 hover:text-white transition-all text-navy-400 group"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Carousel */}
          <div className="relative h-[480px] md:h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="absolute inset-0 bg-white p-8 md:p-12 rounded-[50px] shadow-2xl shadow-navy-100/30 flex flex-col items-center text-center justify-center border border-emerald-50"
              >
                <div className="relative mb-8">
                   <div className="absolute -top-4 -left-4 bg-emerald-500 p-2 rounded-full shadow-lg">
                      <Star className="text-white w-4 h-4 fill-white" />
                   </div>
                   <img 
                    src={testimonials[current].image} 
                    alt={testimonials[current].name} 
                    className="w-24 h-24 rounded-full object-cover border-4 border-emerald-50 shadow-lg"
                   />
                </div>

                <p className="text-xl md:text-2xl text-navy-500 font-medium leading-relaxed italic mb-8 max-w-2xl">
                  "{testimonials[current].text}"
                </p>

                <div className="flex flex-col items-center gap-1">
                   <h4 className="text-2xl font-black text-navy-500">{testimonials[current].name}</h4>
                   <p className="text-emerald-500 font-bold flex items-center gap-2">
                     {testimonials[current].country}
                   </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  current === idx ? "w-8 bg-emerald-500" : "w-2 bg-navy-100 hover:bg-navy-200"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
