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
    { name: t("navbar.queue") || "Live Queue", href: "#queue-tracker" },
    { name: t("phcLocator.tag") || "Rural", href: "#rural-care" },
    { name: t("healthVault.tag") || "Urban", href: "#urban-vault" },
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
        const offset = 90; // Balanced offset for mobile/desktop
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] transition-all duration-700 ease-in-out px-4 md:px-8 py-5",
        isScrolled 
          ? "bg-white/85 backdrop-blur-xl py-3 shadow-xl shadow-navy-900/5" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-[1536px] mx-auto flex items-center justify-between gap-4">
        {/* LEFT: LOGO */}
        <div className="flex-1 lg:flex-none">
          <Logo 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            size="md"
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* CENTER: NAV LINKS (Desktop) */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <div className="flex items-center gap-6 px-10 py-2.5 rounded-full bg-white/40 border border-white/40 shadow-sm backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-navy-500 hover:text-emerald-500 font-bold text-[13px] tracking-wide transition-all uppercase whitespace-nowrap relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="flex items-center gap-4 flex-1 lg:flex-none justify-end">
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="hidden xl:block text-navy-500 hover:text-emerald-500 font-bold text-sm tracking-tight transition-colors"
          >
            {t("navbar.contact") || "Contact"}
          </a>

          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={cn(
                "flex items-center gap-2 text-navy-500 hover:bg-white/60 font-bold text-sm px-4 py-2 rounded-2xl transition-all border border-transparent",
                isLangOpen ? "bg-white/80 border-white/60 shadow-lg" : "bg-transparent"
              )}
            >
              <Globe className="w-4 h-4 text-emerald-500" />
              <span className="hidden sm:inline uppercase tracking-tighter">{language}</span>
              <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", isLangOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsLangOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute top-full right-0 mt-3 w-40 bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-white/80 p-3 z-[70] overflow-hidden"
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
                          "w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-between group",
                          language === lang.code ? "bg-emerald-50 text-emerald-600 shadow-sm" : "text-navy-400 hover:bg-emerald-50/50 hover:text-emerald-500"
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
            className="bg-[#0A1F44] text-white px-6 py-2.5 rounded-full shadow-lg shadow-navy-900/10 hover:scale-105 active:scale-95 transition-all font-bold text-sm tracking-tight"
          >
            {t("navbar.book")}
          </button>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-navy-500 p-2 hover:bg-white/60 rounded-xl transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="lg:hidden absolute top-full left-0 right-0 h-[calc(100vh-80px)] bg-white/95 backdrop-blur-2xl border-t border-navy-50/50 overflow-y-auto shadow-2xl flex flex-col z-[55]"
          >
            <div className="flex flex-col p-8 gap-1">
              <span className="text-[10px] text-navy-300 font-bold uppercase tracking-widest mb-4 px-4">Navigation</span>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-bold text-navy-500 hover:text-emerald-500 py-4 px-4 rounded-2xl hover:bg-emerald-50/30 transition-all"
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.name}
                </a>
              ))}
              
              <div className="mt-8 flex flex-col gap-6">
                <div className="flex flex-col gap-4 bg-navy-50/50 p-6 rounded-[2rem] border border-navy-100/20">
                  <div className="flex items-center gap-2 text-navy-500 font-bold border-b border-navy-100 pb-3">
                    <Globe className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm tracking-tight uppercase">{t("common.selectLanguage") || "Select Language"}</span>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
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
                          setIsMobileMenuOpen(false);
                        }}
                        className={cn(
                          "px-4 py-3 rounded-2xl text-xs font-bold transition-all text-center",
                          language === lang.code ? "bg-emerald-500 text-white shadow-xl shadow-emerald-200 scale-105" : "bg-white text-navy-400 border border-navy-100/50"
                        )}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={(e) => handleLinkClick(null, "#contact")}
                  className="bg-emerald-500 text-white w-full py-5 rounded-[2rem] font-bold text-lg shadow-2xl shadow-emerald-200 active:scale-95 transition-all"
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
