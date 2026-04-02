import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, HeartPulse, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

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
    { name: t("navbar.home"), href: "#" },
    { name: t("navbar.departments"), href: "#departments" },
    { name: t("navbar.doctors"), href: "#doctors" },
    { name: t("navbar.services"), href: "#services" },
    { name: t("navbar.telemedicine"), href: "#video-consultation" },
    { name: t("phcLocator.tag"), href: "#rural-care" },
    { name: t("healthVault.tag"), href: "#urban-vault" },
    { name: t("navbar.contact"), href: "#contact" },
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled 
          ? "glass py-3 shadow-lg shadow-navy-900/5 bg-white/80" 
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
            <HeartPulse className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-navy-500">
            Medi<span className="text-emerald-500">Care</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-navy-500 hover:text-emerald-500 font-bold text-sm transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right side Actions */}
        <div className="hidden lg:flex items-center gap-4">
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
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
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
            className="bg-navy-500 text-white px-6 py-2.5 rounded-full font-bold hover:bg-navy-600 transition-all shadow-lg hover:shadow-navy-100 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {t("navbar.book")}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-navy-500 p-2 hover:bg-navy-50 rounded-xl transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
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
                    <span>Select Language</span>
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
