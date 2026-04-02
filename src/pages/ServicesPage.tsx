import React from "react";
import Navbar from "@/components/hospital/Navbar";
import Footer from "@/components/hospital/Footer";
import BackToTop from "@/components/hospital/BackToTop";
import ChatWidget from "@/components/hospital/ChatWidget";
import CookieBanner from "@/components/hospital/CookieBanner";

// Import the premium Services and AI components
import PremiumServices from "@/components/hospital/home/Services";
import DiseasePredictor from "@/components/hospital/ai/DiseasePredictor";

const ServicesPage = () => {
  return (
    <main className="relative selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden text-navy-500 min-h-screen flex flex-col pt-20">
      {/* We add pt-20 here so the main content doesn't get hidden behind the sticky navbar */}
      <Navbar />
      
      <div className="flex-1">
        <PremiumServices />
        <DiseasePredictor />
      </div>

      <Footer />
      <BackToTop />
      <ChatWidget />
      <CookieBanner />
    </main>
  );
};

export default ServicesPage;
