import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import Logo from "../Logo";

import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("navbar.home") || "Home", href: "#" },
    { name: t("navbar.departments") || "Departments", href: "#departments" },
    { name: t("navbar.doctors") || "Doctors", href: "#doctors" },
    { name: t("navbar.services") || "Services", href: "#services" },
    { name: t("navbar.telemedicine") || "Telemedicine", href: "#video-consultation" },
    { name: t("navbar.queue") || "Live Queue", href: "#queue-tracker" },
    { name: t("phcLocator.tag") || "Rural Accessibility", href: "#rural-care" },
    { name: t("healthVault.tag") || "Urban Healthcare", href: "#urban-vault" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement> | null, href: string) => {
    if (e) e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href.startsWith("/")) {
      navigate(href);
      window.scrollTo(0, 0);
      return;
    }

    if (location.pathname !== "/") {
      navigate(`/${href}`);
      return;
    }

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        const offset = 100; // Increased to generously account for sticky navbar and breathing room
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        
        // Optionally update the URL cleanly
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 py-4",
        isScrolled 
          ? "glass py-3 shadow-xl shadow-navy-900/5 bg-white/90" 
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 py-2">
        {/* LEFT SECTION (LOGO) - flex-shrink-0 prevents logo from being squashed */}
        <div className="flex items-center flex-shrink-0">
          <Logo 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            size="md"
          />
        </div>

        {/* CENTER SECTION (NAV LINKS) - flex-1 and justify-center ensures links are in the middle */}
        <div className="hidden xl:flex items-center justify-center flex-1 gap-5 text-sm font-medium px-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-navy-500 hover:text-[#00C896] transition-all whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* RIGHT SECTION - flex-shrink-0 and gap-5 for consistent spacing */}
        <div className="flex items-center gap-5 flex-shrink-0">
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="hidden lg:block text-navy-500 hover:text-[#00C896] transition font-bold text-sm"
          >
            {t("navbar.contact") || "Contact"}
          </a>

          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={cn(
                "flex items-center gap-1 text-navy-500 hover:text-emerald-500 font-bold text-sm px-3 py-2 rounded-xl transition-all",
                isLangOpen ? "bg-navy-50" : "bg-transparent"
              )}
            >
              <Globe className="w-4 h-4 text-emerald-500" />
              <span>{language}</span>
              <ChevronDown className={cn("w-3 h-3 transition-transform", isLangOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsLangOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-32 bg-white rounded-2xl shadow-xl border border-navy-50 p-2 z-20"
                  >
                    {[
                      { code: "EN", name: "English" },
                      { code: "HI", name: "हिंदी" },
                      { code: "TE", name: "తెలుగు" },
                      { code: "TA", name: "தமிழ்" },
                      { code: "MR", name: "मराठी" },
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setIsLangOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-xl text-sm font-bold transition-all flex items-center justify-between group",
                          language === lang.code ? "bg-emerald-50 text-emerald-600" : "text-navy-400 hover:bg-navy-50"
                        )}
                      >
                        {lang.name}
                        {language === lang.code && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={(e) => handleLinkClick(null, "#contact")}
            className="bg-[#0A1F44] text-white px-5 py-2 rounded-full shadow-md hover:scale-105 transition font-bold"
          >
            {t("navbar.book")}
          </button>

          {/* Mobile Toggle */}
          <button
            className="xl:hidden text-navy-500 p-2 hover:bg-navy-50 rounded-xl transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 glass border-t border-white/20 overflow-hidden shadow-2xl bg-white/95"
          >
            <div className="flex flex-col p-6 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-bold text-navy-500 hover:text-emerald-500 py-3 px-4 rounded-xl hover:bg-navy-50 transition-all"
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-navy-100/20 my-2" />
              <div className="flex flex-col gap-6 mt-2 px-4 pb-4">
                <div className="flex flex-col gap-4 bg-navy-50 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-navy-500 font-bold border-b border-navy-100 pb-2">
                    <Globe className="w-5 h-5 text-emerald-500" />
                    <span>{t("common.selectLanguage") || "Select Language"}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { code: "EN", name: "English" },
                      { code: "HI", name: "हिंदी" },
                      { code: "TE", name: "తెలుగు" },
                      { code: "TA", name: "தமிழ்" },
                      { code: "MR", name: "मराठी" },
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code as any)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold transition-all text-center",
                          language === lang.code ? "bg-emerald-500 text-white shadow-lg" : "bg-white text-navy-400"
                        )}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={(e) => handleLinkClick(null, "#contact")}
                  className="bg-emerald-500 text-white w-full py-4 rounded-2xl font-bold shadow-lg shadow-emerald-200 active:scale-95 transition-all text-center"
                >
                  {t("navbar.book")}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
