import React from "react";
import EmergencyBanner from "@/components/hospital/layout/EmergencyBanner";
import Navbar from "@/components/hospital/layout/Navbar";
import Hero from "@/components/hospital/home/Hero";
import Stats from "@/components/hospital/home/Stats";
import Departments from "@/components/hospital/home/Departments";
import Doctors from "@/components/hospital/home/Doctors";
import AppointmentForm from "@/components/hospital/home/AppointmentForm";
import PatientPortal from "@/components/hospital/home/PatientPortal";
import InternationalSection from "@/components/hospital/home/InternationalSection";
import HealthTools from "@/components/hospital/home/HealthTools";
import HealthLibrary from "@/components/hospital/home/HealthLibrary";
import Testimonials from "@/components/hospital/home/Testimonials";
import Accreditations from "@/components/hospital/home/Accreditations";
import FAQ from "@/components/hospital/home/FAQ";
import Contact from "@/components/hospital/home/Contact";
import Footer from "@/components/hospital/layout/Footer";
import LiveChat from "@/components/hospital/layout/LiveChat";
import CookieConsent from "@/components/hospital/layout/CookieConsent";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <EmergencyBanner />
      <Navbar />
      
      <main>
        <Hero />
        <Stats />
        <Departments />
        <Doctors />
        <AppointmentForm />
        <PatientPortal />
        <InternationalSection />
        <HealthTools />
        <HealthLibrary />
        <Testimonials />
        <Accreditations />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <LiveChat />
      <CookieConsent />
      
      {/* Back to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-24 right-6 bg-emerald text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all z-[90] opacity-0 animate-fade-in"
        style={{ animationDelay: '1000ms' }}
      >
        <span className="text-xl">↑</span>
      </button>
    </div>
  );
};

export default Index;
