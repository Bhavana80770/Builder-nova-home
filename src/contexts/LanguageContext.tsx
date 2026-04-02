import React, { createContext, useContext, useState } from "react";

type Language = "EN" | "HI" | "TE" | "TA" | "MR";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
}

const translations: Record<Language, any> = {
  EN: {
    navbar: {
      home: "Home",
      departments: "Departments",
      doctors: "Doctors",
      services: "Services",
      contact: "Contact",
      book: "Book Appointment",
      tools: "Health Tools",
      telemedicine: "Telemedicine",
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
      error: "Server unavailable",
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
    },
    phcLocator: {
      tag: "Rural Accessibility",
      title: "Find Your Nearest Government Center",
      desc: "We help you locate state-run Primary Health Centers (PHC) and civil hospitals in your vicinity for free or specialized medical care.",
      btn: "Get My Location",
      detecting: "Detecting Location...",
      emptyTitle: "Find Healthcare Centers",
      emptyDesc: "Click 'Get My Location' to automatically detect your position and show the nearest primary health centers on a zero-cost interactive map.",
      mapHeader: "Interactive Map",
      showing: "Showing nearby centers",
      youAreHere: "You are here",
      liveTracking: "Live Tracking Active",
      accuracy: "High Accuracy Mode",
      fallback: "Using default location",
      zeroCost: "Zero Cost Map",
    },
    healthVault: {
      tag: "Urban Smart Healthcare",
      title: "Your Digital Health Vault",
      desc: "Securely store and manage your medical prescriptions, lab reports, and imaging history. Access them anytime with bank-grade encryption.",
      uploadTitle: "Click or Drag Reports",
      uploadDesc: "Supports PDF, JPG, PNG (Max 5MB)",
      uploading: "Uploading Securely...",
      searchPlaceholder: "Search records...",
      recentRecords: "Recent Records",
      stored: "Stored",
      syncing: "Syncing",
      encrypted: "Encrypted",
      removed: "Record removed from view",
      uploadSuccess: "File uploaded successfully!",
      uploadError: "Upload failed. Check settings.",
    },
    healthTools: {
      tag: "Health Precision",
      title: "Smart Health Tools",
      desc: "Quickly assess your key health metrics with our AI-powered calculators.",
      bmi: "BMI Calculator",
      weight: "Weight",
      height: "Height",
      category: "Category",
      underweight: "Underweight",
      normal: "Normal",
      overweight: "Overweight",
      obese: "Obese",
    },
    services: {
      tag: "Hospital Services",
      title: "Comprehensive Healthcare",
      desc: "Experience world-class medical services tailored to your needs with advanced technology and expert care.",
      ai: { 
        title: "AI Assistant", 
        desc: "24/7 AI-powered health guidance and instant support.",
        details: "Our 24/7 AI-powered health assistant provides instant answers to medical queries, helps triage symptoms using advanced algorithms, and offers personalized health tips based on your input. It's like having a doctor's guidance in your pocket at all times.",
        features: ["Symptom Triage", "Instant Medical Q&A", "Personalized Health Tips", "24/7 Availability"]
      },
      doctors: { 
        title: "Specialists", 
        desc: "Connect with top-rated medical professionals.",
        details: "Access a network of top-rated medical specialists across various fields including Cardiology, Neurology, and Oncology. Our platform simplifies the process of finding and connecting with the right expert for your specific health needs.",
        features: ["Expert Consultations", "Multi-Specialty Care", "Easy Connectivity", "Verified Professionals"]
      },
      checkup: { 
        title: "Health Checkups", 
        desc: "Comprehensive screening for early detection.",
        details: "Stay ahead of potential health issues with our comprehensive screening packages. From basic wellness exams to advanced diagnostic profiles, we offer tailored checkups for all ages to ensure early detection and prevention.",
        features: ["Full Body Screening", "Early Detection", "Tailored Packages", "Expert Analysis"]
      },
      mental: { 
        title: "Mental Health", 
        desc: "Professional counseling and support services.",
        details: "Prioritize your emotional well-being with our professional counseling services. We provide a safe, confidential environment for therapy sessions, stress management, and support for various mental health conditions.",
        features: ["Confidential Counseling", "Stress Management", "Therapy Sessions", "Emotional Support"]
      },
      lab: { 
        title: "Lab Services", 
        desc: "Advanced diagnostic and testing facilities.",
        details: "Experience precision diagnostics with our state-of-the-art laboratory facilities. We offer a wide range of tests with fast turnaround times, ensuring you get the accurate data needed for effective treatment planning.",
        features: ["Advanced Diagnostics", "Fast Results", "Wide Test Range", "Certified Labs"]
      },
      peds: { 
        title: "Pediatrics", 
        desc: "Specialized care for infants and children.",
        details: "Specialized, compassionate care for your little ones. Our pediatric department is designed to be child-friendly, offering everything from newborn care and vaccinations to specialized treatment for childhood illnesses.",
        features: ["Newborn Specialist", "Child-Friendly Environment", "Vaccinations", "Growth Monitoring"]
      },
      features: { 
        emergency: "Emergency", 
        telemedicine: "Video Consult", 
        monitoring: "Live Tracking", 
        scheduling: "Easy Booking" 
      }
    },
    departments: {
      tag: "Medical Excellence",
      title: "Specialized Departments",
      desc: "Our world-class specialists provide expert care across various medical fields.",
      cardiology: "Cardiology",
      neurology: "Neurology",
      orthopedics: "Orthopedics",
      emergency: "Emergency Med",
      pediatrics: "Pediatrics",
      oncology: "Oncology"
    },
    videoConsultation: {
      tag: "Telemedicine",
      title: "Real-Time Video Consultation",
      desc: "Connect with our expert doctors from the comfort of your home. Get instant medical advice, prescriptions, and follow-ups via high-quality video conferencing.",
      btn: "Join Consultation",
      popupTitle: "Start Video Consultation?",
      popupDesc: "You are about to enter a secure video meeting room with our medical staff. Please ensure your camera and microphone are ready.",
      instrCamera: "Allow access to camera & microphone",
      instrInternet: "Ensure stable internet connection",
      confirm: "Yes, Start Call",
      cancel: "Maybe Later"
    },
    chat: {
      welcome: "👋 Hello! I'm MediBot. How can we help you today?",
      placeholder: "Ask me anything about your health...",
      typing: "MediBot is typing...",
      disclaimer: "⚠️ This AI assistant is for informational purposes only. Consult a doctor for medical diagnosis.",
      error: "Something went wrong. Please try again.",
      quickHelp: "Quick Help",
      send: "Send"
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
      telemedicine: "टेलीमेडिसिन",
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
    },
    phcLocator: {
      tag: "ग्रामीण पहुंच",
      title: "अपने निकटतम सरकारी केंद्र का पता लगाएं",
      desc: "हम आपको मुफ्त या विशेष चिकित्सा देखभाल के लिए अपने आसपास के सरकारी प्राथमिक स्वास्थ्य केंद्रों (PHC) और नागरिक अस्पतालों का पता लगाने में मदद करते हैं।",
      btn: "मेरा स्थान प्राप्त करें",
      detecting: "स्थान का पता लगाया जा रहा है...",
      emptyTitle: "स्वास्थ्य देखभाल केंद्रों को खोजें",
      emptyDesc: "'मेरा स्थान प्राप्त करें' पर क्लिक करें ताकि स्वचालित रूप से आपकी स्थिति का पता लगाया जा सके और इंटरैक्टिव मानचित्र पर निकटतम सरकारी स्वास्थ्य केंद्रों को दिखाया जा सके।",
      mapHeader: "इंटरैक्टिव मानचित्र",
      showing: "पास के केंद्रों को दिखाया जा रहा है",
      youAreHere: "आप यहाँ हैं",
      liveTracking: "लाइव ट्रैकिंग सक्रिय है",
      accuracy: "उच्च सटीकता मोड",
      fallback: "डिफ़ॉल्ट स्थान का उपयोग किया जा रहा है",
      zeroCost: "शून्य लागत मानचित्र",
    },
    healthVault: {
      tag: "शहरी स्मार्ट स्वास्थ्य सेवा",
      title: "आपका डिजिटल हेल्थ वॉल्ट",
      desc: "बैंक-स्तरीय एन्क्रिप्शन के साथ अपने चिकित्सा नुस्खे, लैब रिपोर्ट और इमेजिंग इतिहास को सुरक्षित रूप से संग्रहीत और प्रबंधित करें।",
      uploadTitle: "रिपोर्ट पर क्लिक करें या खींचें",
      uploadDesc: "PDF, JPG, PNG (अधिकतम 5MB) का समर्थन करता है",
      uploading: "सुरक्षित रूप से अपलोड हो रहा है...",
      searchPlaceholder: "रिकॉर्ड खोजें...",
      recentRecords: "हाल के रिकॉर्ड",
      stored: "संग्रहीत",
      syncing: "सिंक हो रहा है",
      encrypted: "एन्क्रिप्टेड",
      removed: "रिकॉर्ड हटा दिया गया",
      uploadSuccess: "फ़ाइल सफलतापूर्वक अपलोड हो गई!",
      uploadError: "अपलोड विफल रहा। सेटिंग्स जांचें।",
    },
    healthTools: {
      tag: "स्वास्थ्य परिशुद्धता",
      title: "स्मार्ट स्वास्थ्य उपकरण",
      desc: "हमारे एआई-पावर्ड कैलकुलेटर के साथ अपने प्रमुख स्वास्थ्य मैट्रिक्स का तुरंत आकलन करें।",
      bmi: "बीएमआई कैलकुलेटर",
      weight: "वजन",
      height: "ऊंचाई",
      category: "श्रेणी",
      underweight: "कम वजन",
      normal: "सामान्य",
      overweight: "अधिक वजन",
      obese: "मोटापा",
    },
    services: {
      tag: "अस्पताल सेवाएं",
      title: "व्यापक स्वास्थ्य देखभाल",
      desc: "उन्नत तकनीक और विशेषज्ञ देखभाल के साथ आपकी आवश्यकताओं के अनुरूप विश्व स्तरीय चिकित्सा सेवाओं का अनुभव करें।",
      ai: { 
        title: "AI सहायक", 
        desc: "24/7 AI-संचालित स्वास्थ्य मार्गदर्शन।",
        details: "हमारा 24/7 AI-संचालित स्वास्थ्य सहायक चिकित्सा प्रश्नों के त्वरित उत्तर प्रदान करता है, उन्नत एल्गोरिदम का उपयोग करके लक्षणों को प्राथमिकता देने में मदद करता है, और आपके इनपुट के आधार पर व्यक्तिगत स्वास्थ्य सुझाव देता है।",
        features: ["लक्षण छँटाई", "त्वरित चिकित्सा प्रश्नोत्तरी", "व्यक्तिगत स्वास्थ्य सुझाव", "24/7 उपलब्धता"]
      },
      doctors: { 
        title: "विशेषज्ञ", 
        desc: "शीर्ष रेटेड चिकित्सा पेशेवरों से जुड़ें।",
        details: "विभिन्न क्षेत्रों में शीर्ष रेटेड चिकित्सा विशेषज्ञों के नेटवर्क तक पहुँचें। हमारा प्लेटफ़ॉर्म आपकी विशिष्ट स्वास्थ्य आवश्यकताओं के लिए सही विशेषज्ञ को खोजने और उनसे जुड़ने की प्रक्रिया को सरल बनाता है।",
        features: ["विशेषज्ञ परामर्श", "बहु-विशिष्ट देखभाल", "आसान कनेक्टिविटी", "सत्यापित पेशेवर"]
      },
      checkup: { 
        title: "स्वास्थ्य जांच", 
        desc: "जल्दी पता लगाने के लिए व्यापक जांच।",
        details: "हमारे व्यापक स्क्रीनिंग पैकेज के साथ संभावित स्वास्थ्य मुद्दों से आगे रहें। हम शीघ्र पता लगाने और रोकथाम सुनिश्चित करने के लिए सभी उम्र के लोगों के लिए विशेष जांच प्रदान करते हैं।",
        features: ["पूरे शरीर की स्क्रीनिंग", "प्रारंभिक पहचान", "अनुकूलित पैकेज", "विशेषज्ञ विश्लेषण"]
      },
      mental: { 
        title: "मानसिक स्वास्थ्य", 
        desc: "पेशेवर परामर्श और सहायता सेवाएँ।",
        details: "हमारी पेशेवर परामर्श सेवाओं के साथ अपने भावनात्मक कल्याण को प्राथमिकता दें। हम चिकित्सा सत्रों और तनाव प्रबंधन के लिए एक सुरक्षित, गोपनीय वातावरण प्रदान करते हैं।",
        features: ["गोपनीय परामर्श", "तनाव प्रबंधन", "चिकित्सा सत्र", "भावनात्मक समर्थन"]
      },
      lab: { 
        title: "लैब सेवाएं", 
        desc: "उन्नत नैदानिक परीक्षण सुविधाएं।",
        details: "हमारी अत्याधुनिक प्रयोगशाला सुविधाओं के साथ सटीक निदान का अनुभव करें। हम तेजी से परिणाम प्रदान करते हैं, यह सुनिश्चित करते हुए कि आपको प्रभावी उपचार योजना के लिए सटीक डेटा मिले।",
        features: ["उन्नत नैदानिक", "तेजी से परिणाम", "व्यापक परीक्षण रेंज", "प्रमाणित लैब"]
      },
      peds: { 
        title: "बाल रोग", 
        desc: "शिशुओं और बच्चों के लिए विशेष देखभाल।",
        details: "नन्हे-मुन्नों के लिए विशेष देखभाल। हमारा बाल रोग विभाग बच्चों के अनुकूल बनाया गया है, जो टीकाकरण से लेकर बचपन की बीमारियों के उपचार तक सब कुछ प्रदान करता है।",
        features: ["नवजात विशेषज्ञ", "बच्चों के अनुकूल माहौल", "टीकाकरण", "विकास की निगरानी"]
      },
      features: { 
        emergency: "आपातकालीन", 
        telemedicine: "वीडियो परामर्श", 
        monitoring: "लाइव ट्रैकिंग", 
        scheduling: "आसान बुकिंग" 
      }
    },
    departments: {
      tag: "चिकित्सा उत्कृष्टता",
      title: "विशेषज्ञ विभाग",
      desc: "हमारे विश्व स्तरीय विशेषज्ञ विभिन्न चिकित्सा क्षेत्रों में विशेषज्ञ देखभाल प्रदान करते हैं।",
      cardiology: "हृदय रोग विज्ञान",
      neurology: "तंत्रिका विज्ञान",
      orthopedics: "हड्डियों का रोग",
      emergency: "आपातकालीन चिकित्सा",
      pediatrics: "बाल रोग",
      oncology: "कैंसर विज्ञान"
    },
    videoConsultation: {
      tag: "टेलीमेडिसिन",
      title: "रियल-टाइम वीडियो परामर्श",
      desc: "अपने घर के आराम से हमारे विशेषज्ञ डॉक्टरों से जुड़ें। उच्च गुणवत्ता वाले वीडियो कॉन्फ्रेंसिंग के माध्यम से तत्काल चिकित्सा सलाह, नुस्खे और फॉलो-अप प्राप्त करें।",
      btn: "परामर्श में शामिल हों",
      popupTitle: "वीडियो परामर्श शुरू करें?",
      popupDesc: "आप हमारे मेडिकल स्टाफ के साथ एक सुरक्षित वीडियो मीटिंग रूम में प्रवेश करने वाले हैं। कृपया सुनिश्चित करें कि आपका कैमरा और माइक्रोफ़ोन तैयार है।",
      instrCamera: "कैमरा और माइक्रोफ़ोन के लिए अनुमति दें",
      instrInternet: "स्थिर इंटरनेट कनेक्शन सुनिश्चित करें",
      confirm: "हाँ, कॉल शुरू करें",
      cancel: "बाद में"
    },
    chat: {
      welcome: "👋 नमस्ते! मैं मेडीबॉट हूँ। आज हम आपकी क्या मदद कर सकते हैं?",
      placeholder: "अपने स्वास्थ्य के बारे में कुछ भी पूछें...",
      typing: "मेडीबॉट टाइप कर रहा है...",
      disclaimer: "⚠️ यह एआई सहायक केवल सूचनात्मक उद्देश्यों के लिए है।",
      error: "कुछ गलत हो गया। कृपया पुन: प्रयास करें।",
      quickHelp: "त्वरित सहायता",
      send: "भेजें"
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
      telemedicine: "టెలిమెడిసిన్",
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
    },
    phcLocator: {
      tag: "గ్రామీణ ప్రాప్యత",
      title: "మీకు దగ్గరలోని ప్రభుత్వ కేంద్రాన్ని కనుగొనండి",
      desc: "ఉచిత లేదా ప్రత్యేక వైద్య సంరక్షణ కోసం మీ ప్రాంతంలోని ప్రభుత్వ ప్రాథమిక ఆరోగ్య కేంద్రాలు (PHC) మరియు సివిల్ ఆసుపత్రులను కనుగొనడంలో మేము మీకు సహాయం చేస్తాము.",
      btn: "నా లొకేషన్ స్థితిని పొందండి",
      detecting: "లొకేషన్ గుర్తించబడుతోంది...",
      emptyTitle: "ఆరోగ్య సంరక్షణ కేంద్రాలను కనుగొనండి",
      emptyDesc: "మీ లొకేషన్ స్థితిని గుర్తించడానికి మరియు మ్యాప్‌లో సమీపంలోని ప్రభుత్వ ఆరోగ్య కేంద్రాలను చూడటానికి 'నా లొకేషన్ పొందండి' పై క్లిక్ చేయండి.",
      mapHeader: "ఇంటరాక్టివ్ మ్యాప్",
      showing: "సమీపంలోని కేంద్రాలను చూపుతోంది",
      youAreHere: "మీరు ఇక్కడ ఉన్నారు",
      liveTracking: "లైవ్ ట్రాకింగ్ యాక్టివ్",
      accuracy: "హై అక్యూరసీ మోడ్",
      fallback: "డిఫాల్ట్ లొకేషన్ ఉపయోగిస్తోంది",
      zeroCost: "ఉచిత మ్యాప్",
    },
    healthVault: {
      tag: "అర్బన్ స్మార్ట్ హెల్త్‌కేర్",
      title: "మీ డిజిటల్ హెల్త్ వాల్ట్",
      desc: "మీ వైద్య ప్రిస్క్రిప్షన్లు, ల్యాబ్ నివేదికలను బ్యాంక్-గ్రేడ్ ఎన్క్రిప్షన్ ద్వారా సురక్షితంగా నిల్వ చేయండి.",
      uploadTitle: "క్లిక్ చేయండి లేదా రిపోర్టులను డ్రాగ్ చేయండి",
      uploadDesc: "PDF, JPG, PNG (గరిష్టంగా 5MB) సపోర్ట్ చేస్తుంది",
      uploading: "సురక్షితంగా అప్‌లోడ్ చేయబడుతోంది...",
      searchPlaceholder: "రికార్డులను వెతకండి...",
      recentRecords: "ఇటీవలి రికార్డులు",
      stored: "సాధారణం",
      syncing: "సింక్ అవుతోంది",
      encrypted: "ఎన్క్రిప్టెడ్",
      removed: "రికార్డ్ తొలగించబడింది",
      uploadSuccess: "ఫైల్ విజయవంతంగా అప్‌లోడ్ చేయబడింది!",
      uploadError: "అప్‌లోడ్ ವಿಫಲమైంది. సెట్టింగ్‌లు తనిఖీ చేయండి.",
    },
    healthTools: {
      tag: "ఆరోగ్య ఖచ్చితత్వం",
      title: "స్మార్ట్ హెల్త్ టూల్స్",
      desc: "మా AI-ఆధారిత కాలిక్యులేటర్లతో మీ ఆరోగ్య ప్రమాణాలను త్వరగా అంచనా వేయండి.",
      bmi: "BMI కాలిక్యులేటర్",
      weight: "బరువు",
      height: "ఎత్తు",
      category: "వర్గం",
      underweight: "తక్కువ బరువు",
      normal: "సాధారణం",
      overweight: "అధిక బరువు",
      obese: "స్థూలకాయం",
    },
    services: {
      tag: "ఆసుపత్రి సేవలు",
      title: "సమగ్ర ఆరోగ్య సంరక్షణ",
      desc: "అధునాతన సాంకేతికత మరియు నిపుణుల సంరక్షణతో మీ అవసరాలకు తగిన ప్రపంచ స్థాయి వైద్య సేవలను అనుభవించండి.",
      ai: { 
        title: "AI అసిస్టెంట్", 
        desc: "24/7 AI-ఆధారిత ఆరోగ్య మార్గదర్శకత్వం.",
        details: "మా 24/7 AI-ఆధారిత ఆరోగ్య సహాయకుడు వైద్య ప్రశ్నలకు తక్షణ సమాధానాలను అందిస్తారు, నిపుణులైన అల్గారిథమ్‌లను ఉపయోగించి లక్షణాలను అంచనా వేయడానికి సహాయం చేస్తారు.",
        features: ["లక్షణాల అంచనా", "తక్షణ వైద్య ప్రశ్నలు", "వ్యక్తిగత ఆరోగ్య సూచనలు", "24/7 అందుబాటు"]
      },
      doctors: { 
        title: "నిపుణులు", 
        desc: "టాప్ రేటెడ్ వైద్య నిపుణులతో కనెక్ట్ అవ్వండి.",
        details: "కార్డియాలజీ, న్యూరాలజీ మరియు ఆంకాలజీ వంటి వివిధ రంగాలలోని అగ్రశ్రేణి వైద్య నిపుణుల నెట్‌వర్క్‌ను యాక్సెస్ చేయండి. మీ ఆరోగ్య అవసరాల కోసం సరైన నిపుణులను కనుగొనడం ఇప్పుడు సులభం.",
        features: ["నిపుణుల సంప్రదింపులు", "మల్టీ-స్పెషాలిటీ కేర్", "సులభమైన కనెక్టివిటీ", "ధృవీకరించబడిన నిపుణులు"]
      },
      checkup: { 
        title: "ఆరోగ్య పరీక్షలు", 
        desc: "ముందస్తు గుర్తింపు కోసం సమగ్ర స్క్రీనింగ్.",
        details: "మా సమగ్ర స్క్రీనింగ్ ప్యాకేజీలతో సంభావ్య ఆరోగ్య సమస్యల కంటే ముందే ఉండండి. వ్యాధులను ముందుగానే గుర్తించడానికి మరియు నివారించడానికి మేము అన్ని వయసుల వారికి తగిన పరీక్షలను అందిస్తాము.",
        features: ["పూర్తి బాడీ స్క్రీనింగ్", "ముందస్తు గుర్తింపు", "తగిన ప్యాకేజీలు", "నిపుణుల విశ్లేషణ"]
      },
      mental: { 
        title: "మానసిక ఆరోగ్యం", 
        desc: "వృత్తిపరమైన కౌన్సెలింగ్ మరియు మద్దతు.",
        details: "మా వృత్తిపరమైన కౌన్సెలింగ్ సేవలతో మీ మానసిక ఆరోగ్యాన్ని మెరుగుపరుచుకోండి. మేము థెరపీ సెషన్లు మరియు ఒత్తిడి నిర్వహణ కోసం సురక్షితమైన మరియు రహస్య వాతావరణాన్ని అందిస్తాము.",
        features: ["రహస్య కౌన్సెలింగ్", "ఒత్తిడి నిర్వహణ", "థెరపీ సెషన్లు", "మానసిక మద్దతు"]
      },
      lab: { 
        title: "ల్యాబ్ సేవలు", 
        desc: "అధునాతన రోగనిర్ధారణ పరీక్షా సౌకర్యాలు.",
        details: "మా అత్యాధునిక ప్రయోగశాల సౌకర్యాలతో ఖచ్చితమైన నిర్ధారణను అనుభవించండి. మేము వేగవంతమైన ఫలితాలను అందిస్తాము, తద్వారా మీరు సమర్థవంతమైన చికిత్స ప్రణాళికను పొందగలరు.",
        features: ["అధునాతన నిర్ధారణ", "వేగవంతమైన ఫలితాలు", "విస్తృత పరీక్షల శ్రేణి", "సర్టిఫైడ్ ల్యాబ్స్"]
      },
      peds: { 
        title: "పిల్లల వైద్యం", 
        desc: "శిశువులు మరియు పిల్లల కోసం ప్రత్యేక సంరక్షణ.",
        details: "మీ పిల్లల కోసం ప్రత్యేకమైన మరియు ప్రేమపూర్వకమైన సంరక్షణ. మా పీడియాట్రిక్ విభాగం పిల్లలకు అనుకూలంగా ఉంటుంది, టీకాల నుండి బాల్య అనారోగ్యాల చికిత్స వరకు ప్రతిదీ అందిస్తుంది.",
        features: ["నవజాత శిశు నిపుణులు", "పిల్లలకు అనుకూల వాతావరణం", "టీకాలు", "పెరుగుదల పర్యవేక్షణ"]
      },
      features: { 
        emergency: "అత్యవసర", 
        telemedicine: "వీడియో కన్సల్ట్", 
        monitoring: "లైవ్ ట్రాకింగ్", 
        scheduling: "ఈజీ బుకింగ్" 
      }
    },
    departments: {
      tag: "వైద్య శ్రేష్టత",
      title: "ప్రత్యేక విభాగాలు",
      desc: "మా ప్రపంచ స్థాయి నిపుణులు వివిధ వైద్య రంగాలలో నిపుణుల సంరక్షణను అందిస్తారు.",
      cardiology: "కార్డియాలజీ",
      neurology: "న్యూరాలజీ",
      orthopedics: "ఆర్తోపెడిక్స్",
      emergency: "ఎమర్జెన్సీ మెడిసిన్",
      pediatrics: "పీడియాట్రిక్స్",
      oncology: "ఆంకాలజీ"
    },
    videoConsultation: {
      tag: "టెలిమెడిసిన్",
      title: "రియల్ టైమ్ వీడియో సంప్రదింపులు",
      desc: "మీ ఇంటి వద్ద నుండే మా నిపుణులైన వైద్యులతో కనెక్ట్ అవ్వండి. వీడియో కాన్ఫరెన్స్ ద్వారా తక్షణ సలహాలు పొందండి.",
      btn: "మీటింగ్‌లో చేరండి",
      popupTitle: "వీడియో కాల్ ప్రారంభించాలా?",
      popupDesc: "మీరు మా వైద్య సిబ్బందితో సురక్షితమైన వీడియో మీటింగ్ గదిలోకి ప్రవేశించబోతున్నారు. కెమెరా మరియు మైక్రోఫోన్ సిద్ధంగా ఉంచుకోండి.",
      instrCamera: "కెమెరా మరియు మైక్రోఫోన్‌ను అనుమతించండి",
      instrInternet: "స్థిరమైన ఇంటర్నెట్ చూసుకోండి",
      confirm: "అవును, ప్రారంభించు",
      cancel: "తర్వాత"
    },
    chat: {
      welcome: "👋 నమస్కారం! నేను మెడిబోట్. మీకు ఎలా సహాయం చేయగలను?",
      placeholder: "ఆరోగ్యం గురించి ఏదైనా అడగండి...",
      typing: "మెడిబోట్ టైప్ చేస్తోంది...",
      disclaimer: "⚠️ ఈ AI సహాయం కేవలం సమాచారం కోసం మాత్రమే.",
      error: "ఏదో పొరపాటు జరిగింది. మళ్ళీ ప్రయత్నించండి.",
      quickHelp: "త్వరిత సహాయం",
      send: "పంపండి"
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
      telemedicine: "டெலிமெடிசின்",
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
    },
    phcLocator: {
      tag: "கிராமப்புற அணுகல்",
      title: "உங்கள் அருகிலுள்ள அரசு மையத்தைக் கண்டறியவும்",
      desc: "இலவச அல்லது சிறப்பு மருத்துவ சிகிச்சைக்காக உங்கள் அருகிலுள்ள அரசு ஆரம்ப சுகாதார நிலையங்கள் (PHC) மற்றும் சிவில் மருத்துவமனைகளைக் கண்டறிய நாங்கள் உதவுகிறோம்.",
      btn: "எனது இருப்பிடத்தைப் பெறுங்கள்",
      detecting: "இருப்பிடம் கண்டறியப்படுகிறது...",
      emptyTitle: "சுகாதார நிலையங்களைக் கண்டறியவும்",
      emptyDesc: "'எனது இருப்பிடத்தைப் பெறுங்கள்' என்பதைக் கிளிக் செய்து, அருகிலுள்ள அரசு சுகாதார நிலையங்களை வரைபடத்தில் பார்க்கவும்.",
      mapHeader: "ஊடாடும் வரைபடம்",
      showing: "அருகிலுள்ள மையங்களைக் காட்டுகிறது",
      youAreHere: "நீங்கள் இங்கே இருக்கிறீர்கள்",
      liveTracking: "நேரடி கண்காணிப்பு செயலில் உள்ளது",
      accuracy: "உயர் துல்லிய முறை",
      fallback: "இயல்பான இருப்பிடம் பயன்படுத்தப்படுகிறது",
      zeroCost: "இலவச வரைபடம்",
    },
    healthVault: {
      tag: "நகர்ப்புற ஸ்மார்ட் சுகாதாரம்",
      title: "உங்கள் டிஜிட்டல் ஹெல்த் வால்ட்",
      desc: "உங்கள் மருத்துவ அறிக்கைகள் மற்றும் ஆய்வக முடிவுகளை வங்கி தர குறியாக்கத்துடன் பாதுகாப்பாக சேமிக்கவும்.",
      uploadTitle: "கிளிக் செய்யவும் அல்லது அறிக்கைகளை இழுக்கவும்",
      uploadDesc: "PDF, JPG, PNG (அதிகபட்சம் 5MB) ஆதரிக்கிறது",
      uploading: "பாதுகாப்பாக பதிவேற்றப்படுகிறது...",
      searchPlaceholder: "பதிவுகளைத் தேடுங்கள்...",
      recentRecords: "சமீபத்திய பதிவுகள்",
      stored: "சேமிக்கப்பட்டது",
      syncing: "ஒத்திசைக்கப்படுகிறது",
      encrypted: "மறைக்குறியாக்கப்பட்டது",
      removed: "பதிவு நீக்கப்பட்டது",
      uploadSuccess: "கோப்பு வெற்றிகரமாக பதிவேற்றப்பட்டது!",
      uploadError: "பதிவேற்றம் தோல்வியடைந்தது. அமைப்புகளைச் சரிபார்க்கவும்.",
    },
    healthTools: {
      tag: "சுகாதார துல்லியம்",
      title: "ஸ்மார்ட் சுகாதார கருவிகள்",
      desc: "எங்கள் AI-அடிப்படையிலான கால்குலேட்டர்கள் மூலம் உங்கள் சுகாதார அளவீடுகளை விரைவாக மதிப்பிடுங்கள்.",
      bmi: "பிஎம்ஐ கால்குலேட்டர்",
      weight: "எடை",
      height: "உயரம்",
      category: "வகை",
      underweight: "குறைவான எடை",
      normal: "சாதாரண நிலை",
      overweight: "அதிக எடை",
      obese: "உடல் பருமன்",
    },
    services: {
      tag: "மருத்துவமனை சேவைகள்",
      title: "சமச்சீர் சுகாதார பராமரிப்பு",
      desc: "மேம்பட்ட தொழில்நுட்பம் மற்றும் நிபுணத்துவ பராமரிப்புடன் உங்கள் தேவைகளுக்கு ஏற்ப உலகத்தரம் வாய்ந்த மருத்துவ சேவைகளை அனுபவிக்கவும்.",
      ai: { 
        title: "AI உதவியாளர்", 
        desc: "24/7 AI-இயக்கப்படும் சுகாதார வழிகாட்டுதல்.",
        details: "எங்கள் 24/7 AI-இயக்கப்படும் சுகாதார உதவியாளர் மருத்துவ கேள்விகளுக்கு உடனடி பதில்களை வழங்குகிறது, மேம்பட்ட வழிமுறைகளைப் பயன்படுத்தி அறிகுறிகளைத் வரிசைப்படுத்த உதவுகிறது.",
        features: ["அறிகுறி வரிசையாக்கம்", "உடனடி மருத்துவக் கேள்விகள்", "தனிப்பயனாக்கப்பட்ட சுகாதார உதவிக்குறிப்புகள்", "24/7 கிடைக்கும் தன்மை"]
      },
      doctors: { 
        title: "நிபுணர்கள்", 
        desc: "சிறந்த மருத்துவ நிபுணர்களுடன் இணையுங்கள்.",
        details: "இதயவியல், நரம்பியல் போன்ற பல்வேறு துறைகளில் உள்ள சிறந்த மருத்துவ நிபுணர்களின் நெட்வொர்க்கை அணுகுங்கள். உங்கள் சுகாதாரத் தேவைகளுக்கான நிபுணரை எளிதாகக் கண்டறியலாம்.",
        features: ["நிபுணர் ஆலோசனைகள்", "மல்டி-ஸ்பெஷாலிட்டி கேர்", "எளிதான இணைப்பு", "சரிபார்க்கப்பட்ட நிபுணர்கள்"]
      },
      checkup: { 
        title: "சுகாதார பரிசோதனைகள்", 
        desc: "முன்கூட்டியே கண்டறிய விரிவான பரிசோதனை.",
        details: "எங்கள் விரிவான ஸ்கீனிங் தொகுப்புகள் மூலம் சாத்தியமான சுகாதார பிரச்சினைகளை முன்கூட்டியே கண்டறியலாம். அனைத்து வயதினருக்கும் ஏற்றவாறு பரிசோதனைகள் வழங்கப்படுகின்றன.",
        features: ["முழு உடல் பரிசோதனை", "முன்கூட்டியே கண்டறிதல்", "தனிப்பயனாக்கப்பட்ட தொகுப்புகள்", "நிபுணர் பகுப்பாய்வு"]
      },
      mental: { 
        title: "மனநலம்", 
        desc: "தொழில்முறை ஆலோசனை மற்றும் ஆதரவு.",
        details: "எங்கள் தொழில்முறை ஆலோசனை சேவைகள் மூலம் உங்கள் மன நலத்திற்கு முன்னுரிமை அளிக்கவும். சிகிச்சை அமர்வுகளுக்கு பாதுகாப்பான மற்றும் ரகசியமான சூழலை நாங்கள் வழங்குகிறோம்.",
        features: ["ரகசிய ஆலோசனை", "மன அழுத்த மேலாண்மை", "சிகிச்சை அமர்வுகள்", "மன உணர்வு ஆதரவு"]
      },
      lab: { 
        title: "ஆய்வக சேவைகள்", 
        desc: "மேம்பட்ட கண்டறியும் சோதனை வசதிகள்.",
        details: "எங்கள் நவீன ஆய்வக வசதிகள் மூலம் துல்லியமான கண்டறிதலை அனுபவியுங்கள். பயனுள்ள சிகிச்சைத் திட்டமிடலுக்குத் தேவையான துல்லியமான தரவை விரைவாக வழங்குகிறோம்.",
        features: ["மேம்பட்ட கண்டறிதல்", "விரைவான முடிவுகள்", "பரந்த சோதனை வரம்பு", "சான்றளிக்கப்பட்ட ஆய்வகங்கள்"]
      },
      peds: { 
        title: "குழந்தை மருத்துவம்", 
        desc: "குழந்தைகளுக்கான சிறப்பு பராமரிப்பு.",
        details: "உங்கள் குழந்தைகளுக்கான சிறப்பு மற்றும் கனிவான பராமரிப்பு. எங்கள் குழந்தை மருத்துவத் துறை குழந்தைகளுக்கு ஏற்றவாறு வடிவமைக்கப்பட்டுள்ளது, தடுப்பூசிகள் முதல் சிகிச்சைகள் வரை வழங்குகிறோம்.",
        features: ["பச்சிளம் குழந்தை நிபுணர்", "குழந்தைகளுக்கு ஏற்ற சூழல்", "தடுப்பூசிகள்", "வளர்ச்சி கண்காணிப்பு"]
      },
      features: { 
        emergency: "அவசரநிலை", 
        telemedicine: "வீடியோ ஆலோசனை", 
        monitoring: "நேரடி கண்காணிப்பு", 
        scheduling: "எளிதான முன்பதிவு" 
      }
    },
    departments: {
      tag: "மருத்துவ சிறப்பு",
      title: "சிறப்புத் துறைகள்",
      desc: "எங்கள் உலகத்தரம் வாய்ந்த நிபுணர்கள் பல்வேறு மருத்துவத் துறைகளில் நிபுணத்துவ பராமரிப்பை வழங்குகிறார்கள்.",
      cardiology: "இதயவியல்",
      neurology: "நரம்பியல்",
      orthopedics: "எலும்பியல்",
      emergency: "அவசர சிகிச்சை",
      pediatrics: "குழந்தை மருத்துவம்",
      oncology: "புற்றுநோயியல்"
    },
    videoConsultation: {
      tag: "டெலிமெடிசின்",
      title: "நிகழ்நேர வீடியோ ஆலோசனை",
      desc: "உங்கள் வீட்டிலிருந்து எங்கள் நிபுணர் மருத்துவர்களுடன் இணையுங்கள். நிகழ்நேர வீடியோ மூலம் ஆலோசனைகளைப் பெறுங்கள்.",
      btn: "ஆலோசனையில் இணையுங்கள்",
      popupTitle: "வீடியோ ஆலோசனையைத் தொடங்கவா?",
      popupDesc: "பாதுகாப்பான வீடியோ கூட்டத்தில் நுழையப் போகிறீர்கள். உங்கள் கேமரா மற்றும் மைக் தயாராக இருப்பதை உறுதி செய்யவும்.",
      instrCamera: "கேமரா மற்றும் மைக்கை அனுமதிக்கவும்",
      instrInternet: "சீரான இணையத்தை உறுதிப்படுத்தவும்",
      confirm: "ஆம், தொடங்கவும்",
      cancel: "பிறகு"
    },
    chat: {
      welcome: "👋 வணக்கம்! நான் மெடிபாட். நான் உங்களுக்கு எப்படி உதவ முடியும்?",
      placeholder: "ஏதாவது கேளுங்கள்...",
      typing: "மெடிபாட் டைப் செய்கிறது...",
      disclaimer: "⚠️ இந்த AI உதவியாளர் தகவல் நோக்கங்களுக்காக மட்டுமே.",
      error: "ஏதோ தவறு நடந்துவிட்டது. மீண்டும் முயற்சிக்கவும்.",
      quickHelp: "விரைவான உதவி",
      send: "அனுப்பு"
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
      telemedicine: "टेलीमेडिसिन",
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
    },
    phcLocator: {
      tag: "ग्रामीण सुलभता",
      title: "तुमचे जवळचे सरकारी केंद्र शोधा",
      desc: "आम्ही तुम्हाला मोफत किंवा विशेष उपचारांसाठी तुमच्या परिसरातील सरकारी प्राथमिक आरोग्य केंद्रे (PHC) आणि नागरी रुग्णालये शोधण्यात मदत करतो.",
      btn: "माझे स्थान मिळवा",
      detecting: "स्थान शोधत आहे...",
      emptyTitle: "आरोग्य सेवा केंद्रे शोधा",
      emptyDesc: "तुमचे स्थान शोधण्यासाठी आणि नकाशावर जवळची सरकारी आरोग्य केंद्रे पाहण्यासाठी 'माझे स्थान मिळवा' वर क्लिक करा.",
      mapHeader: "परस्परसंवादी नकाशा",
      showing: "जवळपासची केंद्रे दाखवत आहे",
      youAreHere: "तुम्ही इथे आहात",
      liveTracking: "थेट ट्रॅकिंग सुरू आहे",
      accuracy: "उच्च अचूकता मोड",
      fallback: "डिफॉल्ट स्थान वापरले जात आहे",
      zeroCost: "मोफत नकाशा",
    },
    healthVault: {
      tag: "शहरी स्मार्ट आरोग्य सेवा",
      title: "तुमची डिजिटल हेल्थ वॉल्ट",
      desc: "तुमची वैद्यकीय प्रिस्क्रिप्शन आणि लॅब रिपोर्ट बँक-ग्रेड एन्क्रिप्शनसह सुरक्षितपणे साठवा.",
      uploadTitle: "रिपोर्टवर क्लिक करा किंवा ड्रॅग करा",
      uploadDesc: "PDF, JPG, PNG (कमाल 5MB) ला समर्थन",
      uploading: "सुरक्षितपणे अपलोड होत आहे...",
      searchPlaceholder: "रेकॉर्ड शोधा...",
      recentRecords: "अलीकडील रेकॉर्ड",
      stored: "साठवले",
      syncing: "सिंक होत आहे",
      encrypted: "एन्क्रिप्टेड",
      removed: "रेकॉर्ड काढून टाकला",
      uploadSuccess: "फाईल यशस्वीरित्या अपलोड झाली!",
      uploadError: "अपलोड अयशस्वी. सेटिंग्ज तपासा.",
    },
    healthTools: {
      tag: "आरोग्य अचूकता",
      title: "स्मार्ट आरोग्य उपकरणे",
      desc: "आमच्या AI-सक्षम कॅल्क्युलेटरसह तुमच्या आरोग्य मेट्रिक्सचे त्वरित मूल्यांकन करा.",
      bmi: "बीएमआई कॅल्क्युलेटर",
      weight: "वजन",
      height: "उंची",
      category: "श्रेणी",
      underweight: "कमी वजन",
      normal: "सामान्य",
      overweight: "जास्त वजन",
      obese: "लठ्ठपणा",
    },
    services: {
      tag: "रुग्णालय सेवा",
      title: "सर्वसमावेशक आरोग्य सेवा",
      desc: "प्रगत तंत्रज्ञान आणि तज्ञ काळजीसह तुमच्या गरजांनुसार जागतिक दर्जाच्या वैद्यकीय सेवांचा अनुभव घ्या.",
      ai: { 
        title: "AI सहाय्यक", 
        desc: "24/7 AI-चालित आरोग्य मार्गदर्शन.",
        details: "आमचा 24/7 AI-चालित आरोग्य सहाय्यक वैद्यकीय प्रश्नांची त्वरित उत्तरे प्रदान करतो, प्रगत अल्गोरिदम वापरून लक्षणांचे वर्गीकरण करण्यास मदत करतो.",
        features: ["लक्षणे ट्राइएज", "त्वरीत वैद्यकीय प्रश्नोत्तरे", "वैयक्तिकृत आरोग्य टीप्स", "24/7 उपलब्धता"]
      },
      doctors: { 
        title: "तज्ञ", 
        desc: "उच्च-रेट केलेल्या वैद्यकीय व्यावसायिकांशी संपर्क साधा.",
        details: "हृदयरोगशास्त्र, न्यूरोलॉजी आणि ऑन्कोलॉजी यांसारख्या विविध क्षेत्रातील तज्ञ डॉक्टरांच्या नेटवर्कमध्ये प्रवेश करा.",
        features: ["तज्ञ सल्ला", "मल्टी-स्पेशालिटी केअर", "सुलभ कनेक्टिव्हिटी", "व्हेरिफाईड प्रोफेशनल"]
      },
      checkup: { 
        title: "आरोग्य तपासणी", 
        desc: "लवकर ओळखण्यासाठी सर्वसमावेशक स्क्रीनिंग.",
        details: "आमच्या सर्वसमावेशक स्क्रीनिंग पॅकेजसह संभाव्य आरोग्य समस्यांपासून दूर रहा. आम्ही लवकर ओळख आणि प्रतिबंध सुनिश्चित करण्यासाठी सर्व वयोगटांसाठी तपासणी ऑफर करतो.",
        features: ["फुल बॉडी स्क्रीनिंग", "लवकर शोधणे", "अनुकूलित पॅकेजेस", "तज्ञ विश्लेषण"]
      },
      mental: { 
        title: "मानसिक आरोग्य", 
        desc: "व्यावसायिक समुपदेशन आणि समर्थन.",
        details: "आमच्या व्यावसायिक समुपदेशन सेवांसह तुमच्या भावनिक कल्याणाला प्राधान्य द्या. आम्ही थेरपी सत्रांसाठी सुरक्षित, गोपनीय वातावरण प्रदान करतो.",
        features: ["गोपनीय समुपदेशन", "तणाव व्यवस्थापन", "थेरपी सत्र", "भावनिक आधार"]
      },
      lab: { 
        title: "लॅब सेवा", 
        desc: "प्रगत निदान चाचणी सुविधा.",
        details: "आमच्या अत्याधुनिक प्रयोगशाळा सुविधांसह अचूक निदानाचा अनुभव घ्या. आम्ही जलद परिणामांसह चाचण्यांची विस्तृत श्रेणी ऑफर करतो.",
        features: ["प्रगत निदान", "जलद निकाल", "विस्तृत चाचणी श्रेणी", "प्रमाणित प्रयोगशाळा"]
      },
      peds: { 
        title: "बालरोग", 
        desc: "शिशू आणि मुलांसाठी विशेष काळजी.",
        details: "तुमच्या लहान मुलांसाठी विशेष आणि प्रेमळ काळजी. आमचा बालरोग विभाग मुलांसाठी अनुकूल असा डिझाइन केला आहे, ज्यामध्ये लसीकरणापासून उपचारापर्यंत सर्व काही उपलब्ध आहे.",
        features: ["नवजात तज्ञ", "मुलांसाठी अनुकूल वातावरण", "लसीकरण", "वाढ देखरेख"]
      },
      features: { 
        emergency: "आणीबाणी", 
        telemedicine: "व्हिडिओ सल्ला", 
        monitoring: "लाइव्ह ट्रॅकिंग", 
        scheduling: "सोपे बुकिंग" 
      }
    },
    departments: {
      tag: "वैद्यकीय उत्कृष्टता",
      title: "विशेषज्ञ विभाग",
      desc: "आमचे जागतिक दर्जाचे तज्ञ विविध वैद्यकीय क्षेत्रांमध्ये तज्ञ काळजी प्रदान करतात.",
      cardiology: "हृदयरोग शास्त्र",
      neurology: "न्यूरोलॉजी",
      orthopedics: "अस्थिरोग शास्त्र",
      emergency: "आणीबाणी औषध",
      pediatrics: "बालरोग",
      oncology: "कर्करोग शास्त्र"
    },
    videoConsultation: {
      tag: "टेलीमेडिसिन",
      title: "रिअल-टाइम व्हिडिओ सल्ला",
      desc: "तुमच्या घराच्या आरामातून आमच्या तज्ज्ञ डॉक्टरांशी संपर्क साधा. व्हिडिओ कॉन्फरन्सिंगद्वारे झटपट वैद्यकीय सल्ला मिळवा.",
      btn: "कॉलमध्ये सामील व्हा",
      popupTitle: "व्हिडिओ सल्ला सुरू करायचा?",
      popupDesc: "तुम्ही सुरक्षित व्हिडिओ मीटिंग रूममध्ये प्रवेश करणार आहात. कृपया तुमचा कॅमेरा आणि माइक तयार असल्याची खात्री करा.",
      instrCamera: "कॅमेरा आणि माइकला परवानगी द्या",
      instrInternet: "स्थिर इंटरनेट कनेक्शन सुनिश्चित करा",
      confirm: "हो, सुरू करा",
      cancel: "नंतर"
    },
    chat: {
      welcome: "👋 नमस्कार! मी मेडीबॉट आहे. मी तुम्हाला कशी मदत करू शकतो?",
      placeholder: "आरोग्याबद्दल काहीही विचारा...",
      typing: "मेडीबॉट टाईप करत आहे...",
      disclaimer: "⚠️ हा एआय सहाय्यक फक्त माहितीसाठी आहे.",
      error: "काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",
      quickHelp: "त्वरित मदत",
      send: "पाठवा"
    }
  },
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
      if (!current || current[key] === undefined) return path;
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
