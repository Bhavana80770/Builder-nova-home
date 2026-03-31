import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/hospital/Navbar";
import Hero from "./components/hospital/Hero";
import Departments from "./components/hospital/Departments";
import Doctors from "./components/hospital/Doctors";
import HealthTools from "./components/hospital/tools/HealthTools";
import FAQ from "./components/hospital/FAQ";
import Testimonials from "./components/hospital/Testimonials";
import DiseasePredictor from "./components/hospital/ai/DiseasePredictor";
import Appointment from "./components/hospital/Appointment";
import Footer from "./components/hospital/Footer";
import NotFound from "./pages/NotFound";
import BackToTop from "./components/hospital/BackToTop";
import ChatWidget from "./components/hospital/ChatWidget";
import CookieBanner from "./components/hospital/CookieBanner";
import VoiceAssistant from "./components/hospital/ai/VoiceAssistant";
import { LanguageProvider } from "./contexts/LanguageContext";
import PHCLocator from "./components/hospital/rural/PHCLocator";
import HealthVault from "./components/hospital/urban/HealthVault";
import QueueTracker from "./components/hospital/urban/QueueTracker";


const queryClient = new QueryClient();

const LandingPage = () => {
  return (
    <main className="relative selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden text-navy-500">
      <Navbar />
      <Hero />
      <Departments />
      <PHCLocator />
      <Doctors />
      <HealthTools />
      <HealthVault />
      <Testimonials />
      <FAQ />
      <DiseasePredictor />
      <QueueTracker />
      <Appointment />

      <Footer />
      <BackToTop />
      <ChatWidget />
      <CookieBanner />
      <VoiceAssistant />
    </main>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* CATCH-ALL ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
