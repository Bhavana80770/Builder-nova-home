import React from "react";
import { 
  HeartPulse, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ChevronRight
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-500 text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative SVG */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-navy-400/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Logo & About */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20">
                <HeartPulse className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-white">
                Medi<span className="text-emerald-500">Care</span>
              </span>
            </div>
            <p className="text-navy-200 leading-relaxed text-sm">
              Providing world-class healthcare services with a focus on patient comfort and advanced medical technologies. Your health is our priority.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 bg-navy-400/50 rounded-xl flex items-center justify-center hover:bg-emerald-500 transition-all group"
                >
                  <Icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold">{t("footer.quickLinks")}</h3>
            <ul className="flex flex-col gap-4">
              {[t("navbar.home"), t("navbar.departments"), t("navbar.doctors"), t("navbar.services"), t("navbar.tools")].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-navy-200 hover:text-emerald-500 transition-colors text-sm inline-flex items-center gap-2 group font-bold"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-6">
             <h3 className="text-lg font-bold">Support</h3>
            <ul className="flex flex-col gap-4">
              {["General FAQs", "Emergency Services", "Appointments", "Medical Records", "Careers"].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-navy-200 hover:text-emerald-500 transition-colors text-sm inline-flex items-center gap-2 group font-bold"
                  >
                     <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold">{t("footer.contactUs")}</h3>
            <ul className="flex flex-col gap-5">
              <li className="flex gap-4">
                <div className="w-10 h-10 bg-navy-400/50 rounded-xl flex shrink-0 items-center justify-center">
                  <Phone className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-navy-300 font-bold uppercase tracking-wider">Phone</span>
                  <span className="text-sm font-medium">+1 (234) 567 890</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 bg-navy-400/50 rounded-xl flex shrink-0 items-center justify-center">
                  <Mail className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-navy-300 font-bold uppercase tracking-wider">Email</span>
                  <span className="text-sm font-medium">contact@medicare.com</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 bg-navy-400/50 rounded-xl flex shrink-0 items-center justify-center">
                  <MapPin className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-navy-300 font-bold uppercase tracking-wider">Location</span>
                  <span className="text-sm font-medium leading-relaxed">Medical Street, Central Park, NY 10012, USA</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-navy-400/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-navy-300 text-sm font-bold">
            © {currentYear} MediCare Hospital. {t("footer.rights")}
          </p>
          <div className="flex gap-8 text-sm text-navy-300">
            <a href="#" className="hover:text-emerald-500 transition-colors font-bold">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-500 transition-colors font-bold">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
