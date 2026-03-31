import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "EN" | "HI" | "TE" | "TA" | "MR";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  EN: {
    navbar: {
      home: "Home",
      departments: "Departments",
      doctors: "Doctors",
      services: "Services",
      contact: "Contact",
      book: "Book Appointment",
      tools: "Health Tools",
    },
    hero: {
      tag: "Best Medical Care",
      title: "Your Health is Our",
      titleAccent: "Top Priority",
      desc: "Experience world-class healthcare with our expert team and state-of-the-art facilities.",
      cta: "Book Appointment",
      view: "View Services",
    },
    common: {
      calculate: "Calculate",
      reset: "Reset",
      loading: "Loading...",
      success: "Success!",
      results: "Results",
      error: "Server not available",
      booking: "Booking appointment...",
    },
    bmi: {
      title: "BMI Calculator",
      weight: "Weight (kg)",
      height: "Height (cm)",
      category: "Category",
      underweight: "Underweight",
      normal: "Normal",
      overweight: "Overweight",
      obese: "Obese",
    },
    footer: {
        rights: "All rights reserved.",
        quickLinks: "Quick Links",
        contactUs: "Contact Us",
    }
  },
  HI: {
    navbar: {
      home: "होम",
      departments: "विभाग",
      doctors: "डॉक्टर",
      services: "सेवाएं",
      contact: "संपर्क",
      book: "अपॉइंटमेंट बुक करें",
      tools: "स्वास्थ्य उपकरण",
    },
    hero: {
      tag: "सर्वश्रेष्ठ चिकित्सा देखभाल",
      title: "आपका स्वास्थ्य हमारी",
      titleAccent: "शीर्ष प्राथमिकता है",
      desc: "हमारी विशेषज्ञ टीम और अत्याधुनिक सुविधाओं के साथ विश्व स्तरीय स्वास्थ्य सेवा का अनुभव करें।",
      cta: "अपॉइंटमेंट बुक करें",
      view: "सेवाएं देखें",
    },
    common: {
      calculate: "गणना करें",
      reset: "रीसेट करें",
      loading: "लोड हो रहा है...",
      success: "सफलता!",
      results: "परिणाम",
      error: "सर्वर उपलब्ध नहीं है",
      booking: "अपॉइंटमेंट बुक हो रहा है...",
    },
    bmi: {
      title: "बीएमआई कैलकुलेटर",
      weight: "वजन (किलो)",
      height: "ऊंचाई (सेमी)",
      category: "श्रेणी",
      underweight: "अंडरवेट",
      normal: "सामान्य",
      overweight: "ओवरवेट",
      obese: "मोटापे से ग्रस्त",
    },
    footer: {
        rights: "सर्वाधिकार सुरक्षित।",
        quickLinks: "त्वरित लिंक",
        contactUs: "संपर्क करें",
    }
  },
  TE: {
    navbar: {
      home: "హోమ్",
      departments: "విభాగాలు",
      doctors: "వైద్యులు",
      services: "సేవలు",
      contact: "సంప్రదించండి",
      book: "అపాయింట్మెంట్ బుక్ చేయండి",
      tools: "ఆరోగ్య సాధనాలు",
    },
    hero: {
      tag: "ఉత్తమ వైద్య సంరక్షణ",
      title: "మీ ఆరోగ్యం మా",
      titleAccent: "అత్యున్నత ప్రాధాన్యత",
      desc: "మా నిపుణుల బృందం మరియు అత్యాధునిక సౌకర్యాలతో ప్రపంచ స్థాయి ఆరోగ్య సంరక్షణను అనుభవించండి.",
      cta: "అపాయింట్మెంట్ బుక్ చేయండి",
      view: "సేవలను చూడండి",
    },
    common: {
      calculate: "లెక్కించు",
      reset: "రీసెట్ చేయండి",
      loading: "లోడ్ అవుతోంది...",
      success: "విజయం!",
      results: "ఫలితాలు",
      error: "సర్వర్ అందుబాటులో లేదు",
      booking: "అపాయింట్మెంట్ బుక్ చేయబడుతోంది...",
    },
    bmi: {
      title: "BMI కాలిక్యులేటర్",
      weight: "బరువు (కేజీలు)",
      height: "ఎత్తు (సెం.మీ.)",
      category: "వర్గం",
      underweight: "తక్కువ బరువు",
      normal: "సాధారణం",
      overweight: "అధిక బరువు",
      obese: "స్థూలకాయం",
    },
    footer: {
        rights: "సర్వ హక్కులు ప్రత్యేకించబడినవి.",
        quickLinks: "త్వరిత లింక్లు",
        contactUs: "మమ్మల్ని సంప్రదించండి",
    }
  },
  TA: {
    navbar: {
      home: "முகப்பு",
      departments: "துறைகள்",
      doctors: "மருத்துவர்கள்",
      services: "சேவைகள்",
      contact: "தொடர்பு",
      book: "முன்பதிவு செய்யுங்கள்",
      tools: "சுகாதார கருவிகள்",
    },
    hero: {
      tag: "சிறந்த மருத்துவ சிகிச்சை",
      title: "உங்கள் ஆரோக்கியமே எங்களின்",
      titleAccent: "முதல் முன்னுரிமை",
      desc: "எங்கள் நிபுணர் குழு மற்றும் நவீன வசதிகளுடன் உலகத்தரம் வாய்ந்த சுகாதார சேவையை அனுபவியுங்கள்.",
      cta: "முன்பதிவு செய்யுங்கள்",
      view: "சேவைகளைப் பார்க்கவும்",
    },
    common: {
      calculate: "கணக்கிடு",
      reset: "மீட்டமை",
      loading: "ஏற்றப்படுகிறது...",
      success: "வெற்றி!",
      results: "முடிவுகள்",
      error: "சர்வர் கிடைக்கவில்லை",
      booking: "முன்பதிவு செய்யப்படுகிறது...",
    },
    bmi: {
      title: "பிஎம்ஐ கால்குலேட்டர்",
      weight: "எடை (கிலோ)",
      height: "உயரம் (செ.மீ)",
      category: "வகை",
      underweight: "குறைவான எடை",
      normal: "சாதாரண நிலை",
      overweight: "அதிக எடை",
      obese: "உடல் பருமன்",
    },
    footer: {
        rights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
        quickLinks: "விரைவான இணைப்புகள்",
        contactUs: "எங்களைத் தொடர்பு கொள்ளுங்கள்",
    }
  },
  MR: {
    navbar: {
      home: "मुख्यपृष्ठ",
      departments: "विभाग",
      doctors: "डॉक्टर",
      services: "सेवा",
      contact: "संपर्क",
      book: "अपॉइंटमेंट बुक करा",
      tools: "आरोग्य साधने",
    },
    hero: {
      tag: "सर्वोत्तम वैद्यकीय सेवा",
      title: "तुमचे आरोग्य आमची",
      titleAccent: "पहिली पसंती",
      desc: "आमच्या तज्ज्ञ टीम आणि आधुनिक सुविधांसह जागतिक दर्जाच्या आरोग्यसेवेचा अनुभव घ्या.",
      cta: "अपॉइंटमेंट बुक करा",
      view: "सेवा पहा",
    },
    common: {
      calculate: "गणना करा",
      reset: "रीसेट करा",
      loading: "लोड होत आहे...",
      success: "यशस्वी!",
      results: "निकाल",
      error: "सर्व्हर उपलब्ध नाही",
      booking: "अपॉइंटमेंट बुक होत आहे...",
    },
    bmi: {
      title: "BMI कॅल्क्युलेटर",
      weight: "वजन (किलो)",
      height: "उंची (सेमी)",
      category: "श्रेणी",
      underweight: "कमी वजन",
      normal: "सामान्य",
      overweight: "जास्त वजन",
      obese: "लठ्ठपणा",
    },
    footer: {
        rights: "सर्व हक्क राखीव.",
        quickLinks: "द्रुत दुवे",
        contactUs: "आमच्याशी संपर्क साधा",
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("medicare_lang");
    return (saved === "HI" || saved === "EN" || saved === "TE" || saved === "TA" || saved === "MR") ? (saved as Language) : "EN";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("medicare_lang", lang);
  };

  const t = (path: string) => {
    const keys = path.split(".");
    let current: any = translations[language];
    for (const key of keys) {
      if (current[key] === undefined) return path;
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
