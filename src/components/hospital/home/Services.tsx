import React from "react";
import { motion } from "framer-motion";
import { 
  MessageCircle, 
  Users, 
  Shield, 
  Phone, 
  Video, 
  Activity, 
  Calendar,
  Stethoscope,
  HeartPulse,
  Brain,
  Microscope,
  Baby
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";

const Services = () => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<any>(null);

  const services = [
    {
      icon: MessageCircle,
      title: t('services.ai.title'),
      desc: t('services.ai.desc'),
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
      delay: 0.1,
      details: t("services.ai.details"),
      features: t("services.ai.features")
    },
    {
      icon: Users,
      title: t('services.doctors.title'),
      desc: t('services.doctors.desc'),
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      delay: 0.2,
      details: t("services.doctors.details"),
      features: t("services.doctors.features")
    },
    {
      icon: Shield,
      title: t('services.checkup.title'),
      desc: t('services.checkup.desc'),
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
      textColor: "text-purple-600",
      delay: 0.3,
      details: t("services.checkup.details"),
      features: t("services.checkup.features")
    },
    {
      icon: Brain,
      title: t('services.mental.title'),
      desc: t('services.mental.desc'),
      color: "bg-amber-500",
      lightColor: "bg-amber-50",
      textColor: "text-amber-600",
      delay: 0.4,
      details: t("services.mental.details"),
      features: t("services.mental.features")
    },
    {
      icon: Microscope,
      title: t('services.lab.title'),
      desc: t('services.lab.desc'),
      color: "bg-rose-500",
      lightColor: "bg-rose-50",
      textColor: "text-rose-600",
      delay: 0.5,
      details: t("services.lab.details"),
      features: t("services.lab.features")
    },
    {
      icon: Baby,
      title: t('services.peds.title'),
      desc: t('services.peds.desc'),
      color: "bg-cyan-500",
      lightColor: "bg-cyan-50",
      textColor: "text-cyan-600",
      delay: 0.6,
      details: t("services.peds.details"),
      features: t("services.peds.features")
    }
  ];

  const features = [
    { icon: Phone, title: t('services.features.emergency') },
    { icon: Video, title: t('services.features.telemedicine') },
    { icon: Activity, title: t('services.features.monitoring') },
    { icon: Calendar, title: t('services.features.scheduling') }
  ];

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-emerald-600 font-bold text-xs tracking-widest uppercase mb-4 flex items-center justify-center gap-2"
          >
            <HeartPulse className="w-4 h-4" />
            {t('services.tag')}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-navy-500 mb-6 leading-tight"
          >
            {t('services.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-navy-400 text-lg leading-relaxed"
          >
            {t('services.desc')}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: service.delay }}
              viewport={{ once: true }}
              className="group bg-white p-8 rounded-[40px] border border-navy-50 hover:border-emerald-100 hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500"
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6",
                service.lightColor,
                service.textColor
              )}>
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-navy-500 mb-4 group-hover:text-emerald-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-navy-300 leading-relaxed mb-6">
                {service.desc}
              </p>
              <button 
                onClick={() => setSelectedService(service)}
                className={cn(
                  "flex items-center gap-2 font-bold text-sm uppercase tracking-wider transition-all group/btn",
                  service.textColor
                )}
              >
                Learn More
                <div className="w-6 h-0.5 bg-current transform origin-left transition-transform group-hover/btn:scale-x-150" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Floating Features Strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 bg-navy-500 py-10 px-8 rounded-[40px] shadow-2xl flex flex-wrap justify-center gap-12 lg:gap-24"
        >
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                <feature.icon className="w-6 h-6" />
              </div>
              <span className="text-white font-bold tracking-wide uppercase text-sm">
                {feature.title}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 -left-24 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl opacity-60 -z-10" />
      <div className="absolute bottom-0 -right-24 w-64 h-64 bg-navy-50/50 rounded-full blur-3xl opacity-40 -z-10" />

      {/* Service Detail Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none bg-white rounded-[40px]">
          {selectedService && (
            <div className="relative">
              {/* Header with Background Color */}
              <div className={cn("p-10 text-white relative overflow-hidden", selectedService.color)}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                     <selectedService.icon className="w-8 h-8 text-white" />
                  </div>
                  <DialogTitle className="text-4xl font-black mb-2 text-white">{selectedService.title}</DialogTitle>
                  <p className="text-white/80 font-medium tracking-wide uppercase text-sm">Official Hospital Service</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-10 bg-white">
                <DialogDescription className="text-navy-400 text-lg leading-relaxed mb-8">
                  {selectedService.details}
                </DialogDescription>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  {selectedService.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-navy-50/50 rounded-2xl">
                      <div className={cn("w-2 h-2 rounded-full", selectedService.color)} />
                      <span className="text-navy-500 font-bold text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                        setSelectedService(null);
                        const contact = document.getElementById('contact');
                        contact?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={cn("flex-1 text-white py-4 rounded-2xl font-bold transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]", selectedService.color)}
                  >
                    Get This Service
                  </button>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="px-8 py-4 bg-navy-50 text-navy-500 rounded-2xl font-bold hover:bg-navy-100 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Services;
