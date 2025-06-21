import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Heart,
  ArrowLeft,
  Video,
  Phone,
  MessageCircle,
  Star,
  Clock,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const DoctorConnect = () => {
  const { user, logout } = useAuth();
  const [searchParams] = useSearchParams();
  const urlType = searchParams.get("type");
  const [selectedConsultationType, setSelectedConsultationType] =
    useState<string>(urlType || "video");
  const [selectedTier, setSelectedTier] = useState<string>("all"); // all, free, affordable, premium

  // Update consultation type when URL parameter changes
  useEffect(() => {
    if (urlType && ["video", "voice", "chat"].includes(urlType)) {
      setSelectedConsultationType(urlType);
    }
  }, [urlType]);

  const allDoctors = [
    // FREE VIDEO CONSULTATIONS
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialization: "General Physician",
      experience: "3 years",
      rating: 4.5,
      availability: "Available Now",
      languages: ["Hindi", "English"],
      consultationTypes: ["video", "voice", "chat"],
      pricing: {
        video: { amount: 0, isFree: true, tier: "basic", duration: "15 min" },
        voice: {
          amount: 149,
          isFree: false,
          tier: "standard",
          duration: "30 min",
        },
        chat: { amount: 0, isFree: true, tier: "free", duration: "unlimited" },
      },
      badges: ["Free Video", "Rural Care", "New Graduate"],
      tier: "free",
    },
    {
      id: 2,
      name: "Dr. Ankit Kumar",
      specialization: "Medical Student (Final Year)",
      experience: "1 year",
      rating: 4.3,
      availability: "Available in 30 min",
      languages: ["Hindi", "English", "Bengali"],
      consultationTypes: ["video", "chat"],
      pricing: {
        video: { amount: 0, isFree: true, tier: "student", duration: "20 min" },
        chat: { amount: 0, isFree: true, tier: "free", duration: "unlimited" },
      },
      badges: ["Free Video", "Student Doctor", "Supervised"],
      tier: "free",
    },

    // FREE VOICE CONSULTATIONS
    {
      id: 3,
      name: "Dr. Meera Joshi",
      specialization: "Community Health Worker",
      experience: "2 years",
      rating: 4.4,
      availability: "Available Now",
      languages: ["Hindi", "English", "Marathi"],
      consultationTypes: ["voice", "chat"],
      pricing: {
        voice: { amount: 0, isFree: true, tier: "basic", duration: "15 min" },
        chat: { amount: 0, isFree: true, tier: "free", duration: "unlimited" },
      },
      badges: ["Free Voice", "Community Care", "Local Expert"],
      tier: "free",
    },
    {
      id: 4,
      name: "Dr. Rahul Trainee",
      specialization: "Medical Intern",
      experience: "6 months",
      rating: 4.2,
      availability: "Available in 1 hour",
      languages: ["Hindi", "English"],
      consultationTypes: ["voice", "chat"],
      pricing: {
        voice: { amount: 0, isFree: true, tier: "trainee", duration: "20 min" },
        chat: { amount: 0, isFree: true, tier: "free", duration: "unlimited" },
      },
      badges: ["Free Voice", "Medical Intern", "Learning"],
      tier: "free",
    },
    {
      id: 5,
      name: "Dr. Sneha Volunteer",
      specialization: "Volunteer Doctor",
      experience: "5 years",
      rating: 4.6,
      availability: "Available at 6 PM",
      languages: ["Hindi", "English", "Tamil"],
      consultationTypes: ["voice", "chat"],
      pricing: {
        voice: {
          amount: 0,
          isFree: true,
          tier: "volunteer",
          duration: "15 min",
        },
        chat: { amount: 0, isFree: true, tier: "free", duration: "unlimited" },
      },
      badges: ["Free Voice", "Volunteer", "Weekend Available"],
      tier: "free",
    },

    // AFFORDABLE PAID CONSULTATIONS
    {
      id: 6,
      name: "Dr. Rajesh Kumar",
      specialization: "General Physician",
      experience: "8 years",
      rating: 4.7,
      availability: "Available in 15 min",
      languages: ["Hindi", "English", "Bengali"],
      consultationTypes: ["video", "voice", "chat"],
      pricing: {
        video: {
          amount: 199,
          isFree: false,
          tier: "standard",
          duration: "30 min",
        },
        voice: {
          amount: 149,
          isFree: false,
          tier: "standard",
          duration: "30 min",
        },
        chat: { amount: 0, isFree: true, tier: "free", duration: "unlimited" },
      },
      badges: ["Verified", "Family Medicine", "Affordable"],
      tier: "affordable",
    },
    {
      id: 7,
      name: "Dr. Sunita Devi",
      specialization: "Pediatrician",
      experience: "6 years",
      rating: 4.6,
      availability: "Available Now",
      languages: ["Hindi", "English"],
      consultationTypes: ["video", "voice", "chat"],
      pricing: {
        video: {
          amount: 199,
          isFree: false,
          tier: "standard",
          duration: "30 min",
        },
        voice: {
          amount: 149,
          isFree: false,
          tier: "standard",
          duration: "30 min",
        },
        chat: { amount: 0, isFree: true, tier: "free", duration: "unlimited" },
      },
      badges: ["Child Specialist", "Vaccination Expert", "Affordable"],
      tier: "affordable",
    },
    {
      id: 8,
      name: "Dr. Manoj Singh",
      specialization: "General Physician",
      experience: "7 years",
      rating: 4.5,
      availability: "Available in 45 min",
      languages: ["Hindi", "English", "Punjabi"],
      consultationTypes: ["video", "voice", "chat"],
      pricing: {
        video: {
          amount: 199,
          isFree: false,
          tier: "standard",
          duration: "30 min",
        },
        voice: {
          amount: 149,
          isFree: false,
          tier: "standard",
          duration: "30 min",
        },
        chat: { amount: 0, isFree: true, tier: "free", duration: "unlimited" },
      },
      badges: ["Rural Expert", "Diabetes Care", "Affordable"],
      tier: "affordable",
    },
    {
      id: 9,
      name: "Dr. Kavitha Reddy",
      specialization: "Dermatologist",
      experience: "7 years",
      rating: 4.6,
      availability: "Available in 30 min",
      languages: ["English", "Telugu", "Tamil"],
      consultationTypes: ["video", "voice", "chat"],
      pricing: {
        video: {
          amount: 199,
          isFree: false,
          tier: "standard",
          duration: "30 min",
        },
        voice: {
          amount: 149,
          isFree: false,
          tier: "standard",
          duration: "30 min",
        },
        chat: { amount: 0, isFree: true, tier: "free", duration: "unlimited" },
      },
      badges: ["Skin Expert", "Acne Treatment", "Affordable"],
      tier: "affordable",
    },
    {
      id: 10,
      name: "Dr. Arjun Mehta",
      specialization: "Mental Health Counselor",
      experience: "5 years",
      rating: 4.7,
      availability: "Available in 40 min",
      languages: ["Hindi", "English", "Gujarati"],
      consultationTypes: ["voice", "chat"],
      pricing: {
        voice: {
          amount: 149,
          isFree: false,
          tier: "standard",
          duration: "30 min",
        },
        chat: { amount: 0, isFree: true, tier: "free", duration: "unlimited" },
      },
      badges: ["Mental Health", "Anxiety Support", "Affordable"],
      tier: "affordable",
    },
    {
      id: 11,
      name: "Dr. Neha Saxena",
      specialization: "ENT Specialist",
      experience: "6 years",
      rating: 4.5,
      availability: "Available Now",
      languages: ["Hindi", "English"],
      consultationTypes: ["video", "voice", "chat"],
      pricing: {
        video: {
          amount: 199,
          isFree: false,
          tier: "standard",
          duration: "30 min",
        },
        voice: {
          amount: 149,
          isFree: false,
          tier: "standard",
          duration: "30 min",
        },
        chat: { amount: 0, isFree: true, tier: "free", duration: "unlimited" },
      },
      badges: ["ENT Expert", "Hearing Care", "Affordable"],
      tier: "affordable",
    },
    {
      id: 12,
      name: "Dr. Vikram Rao",
      specialization: "Orthopedic",
      experience: "8 years",
      rating: 4.6,
      availability: "Available in 2 hours",
      languages: ["Hindi", "English", "Telugu"],
      consultationTypes: ["video", "voice", "chat"],
      pricing: {
        video: {
          amount: 199,
          isFree: false,
          tier: "standard",
          duration: "30 min",
        },
        voice: {
          amount: 149,
          isFree: false,
          tier: "standard",
          duration: "30 min",
        },
        chat: { amount: 0, isFree: true, tier: "free", duration: "unlimited" },
      },
      badges: ["Bone Specialist", "Joint Care", "Affordable"],
      tier: "affordable",
    },
    {
      id: 13,
      name: "Dr. Asha Iyer",
      specialization: "Ophthalmologist",
      experience: "7 years",
      rating: 4.5,
      availability: "Available Now",
      languages: ["English", "Hindi", "Kannada"],
      consultationTypes: ["video", "voice", "chat"],
      pricing: {
        video: {
          amount: 199,
          isFree: false,
          tier: "standard",
          duration: "30 min",
        },
        voice: {
          amount: 149,
          isFree: false,
          tier: "standard",
          duration: "30 min",
        },
        chat: { amount: 0, isFree: true, tier: "free", duration: "unlimited" },
      },
      badges: ["Eye Care", "Vision Expert", "Affordable"],
      tier: "affordable",
    },

    // PREMIUM EXPERT CONSULTATIONS
    {
      id: 14,
      name: "Dr. Amit Patel",
      specialization: "Senior Cardiologist",
      experience: "15 years",
      rating: 4.9,
      availability: "Available Now",
      languages: ["Hindi", "English", "Gujarati"],
      consultationTypes: ["video", "voice"],
      pricing: {
        video: {
          amount: 499,
          isFree: false,
          tier: "premium",
          duration: "45 min",
        },
        voice: {
          amount: 399,
          isFree: false,
          tier: "premium",
          duration: "45 min",
        },
      },
      badges: ["Heart Specialist", "Premium", "15+ Years"],
      tier: "premium",
    },
    {
      id: 15,
      name: "Dr. Sandeep Aggarwal",
      specialization: "Senior Cardiologist",
      experience: "18 years",
      rating: 4.9,
      availability: "Available at 4 PM",
      languages: ["Hindi", "English"],
      consultationTypes: ["video", "voice"],
      pricing: {
        video: {
          amount: 499,
          isFree: false,
          tier: "premium",
          duration: "45 min",
        },
        voice: {
          amount: 399,
          isFree: false,
          tier: "premium",
          duration: "45 min",
        },
      },
      badges: ["Senior Consultant", "Heart Surgery", "Premium"],
      tier: "premium",
    },
    {
      id: 16,
      name: "Dr. Ravi Krishnan",
      specialization: "Senior Neurologist",
      experience: "17 years",
      rating: 4.9,
      availability: "Available at 5 PM",
      languages: ["English", "Tamil", "Malayalam"],
      consultationTypes: ["video", "voice"],
      pricing: {
        video: {
          amount: 499,
          isFree: false,
          tier: "premium",
          duration: "45 min",
        },
        voice: {
          amount: 399,
          isFree: false,
          tier: "premium",
          duration: "45 min",
        },
      },
      badges: ["Brain Specialist", "Premium", "Neurologist"],
      tier: "premium",
    },
    {
      id: 17,
      name: "Dr. Kavya Menon",
      specialization: "Senior Gynecologist",
      experience: "14 years",
      rating: 4.8,
      availability: "Available in 45 min",
      languages: ["English", "Malayalam", "Tamil"],
      consultationTypes: ["video", "voice"],
      pricing: {
        video: {
          amount: 499,
          isFree: false,
          tier: "premium",
          duration: "45 min",
        },
        voice: {
          amount: 399,
          isFree: false,
          tier: "premium",
          duration: "45 min",
        },
      },
      badges: ["Women's Health", "Pregnancy Care", "Premium"],
      tier: "premium",
    },
    {
      id: 18,
      name: "Dr. Suresh Yadav",
      specialization: "Senior Diabetologist",
      experience: "14 years",
      rating: 4.8,
      availability: "Available in 25 min",
      languages: ["Hindi", "English"],
      consultationTypes: ["video", "voice"],
      pricing: {
        video: {
          amount: 499,
          isFree: false,
          tier: "premium",
          duration: "45 min",
        },
        voice: {
          amount: 399,
          isFree: false,
          tier: "premium",
          duration: "45 min",
        },
      },
      badges: ["Diabetes Expert", "Diet Planning", "Premium"],
      tier: "premium",
    },
    {
      id: 19,
      name: "Dr. Mukesh Jain",
      specialization: "Senior Gastroenterologist",
      experience: "12 years",
      rating: 4.7,
      availability: "Available in 50 min",
      languages: ["Hindi", "English"],
      consultationTypes: ["video", "voice"],
      pricing: {
        video: {
          amount: 499,
          isFree: false,
          tier: "premium",
          duration: "45 min",
        },
        voice: {
          amount: 399,
          isFree: false,
          tier: "premium",
          duration: "45 min",
        },
      },
      badges: ["Digestive Health", "IBS Specialist", "Premium"],
      tier: "premium",
    },
    {
      id: 20,
      name: "Dr. Rahul Khanna",
      specialization: "Senior Dermatologist",
      experience: "11 years",
      rating: 4.8,
      availability: "Available Now",
      languages: ["Hindi", "English", "Punjabi"],
      consultationTypes: ["video", "voice"],
      pricing: {
        video: {
          amount: 499,
          isFree: false,
          tier: "premium",
          duration: "45 min",
        },
        voice: {
          amount: 399,
          isFree: false,
          tier: "premium",
          duration: "45 min",
        },
      },
      badges: ["Senior Dermatologist", "Cosmetic Expert", "Premium"],
      tier: "premium",
    },

    // CHAT SUPPORT DOCTORS (All Free)
    {
      id: 21,
      name: "Dr. Ramesh Nair",
      specialization: "ENT Specialist",
      experience: "13 years",
      rating: 4.5,
      availability: "Available in 1 hour",
      languages: ["English", "Malayalam", "Tamil"],
      consultationTypes: ["chat"],
      pricing: {
        chat: { amount: 0, isFree: true, tier: "free", duration: "unlimited" },
      },
      badges: ["Free Chat", "ENT Expert", "Text Support"],
      tier: "free",
    },
  ];

  // Filter doctors based on selected consultation type and tier
  const doctors = allDoctors.filter((doctor) => {
    const hasConsultationType = doctor.consultationTypes.includes(
      selectedConsultationType,
    );
    const hasPricingForType =
      doctor.pricing[selectedConsultationType as keyof typeof doctor.pricing];

    if (!hasConsultationType || !hasPricingForType) return false;

    if (selectedTier === "all") return true;

    // For tier filtering
    if (selectedTier === "free") {
      return hasPricingForType.isFree;
    } else if (selectedTier === "affordable") {
      return !hasPricingForType.isFree && hasPricingForType.amount < 300;
    } else if (selectedTier === "premium") {
      return !hasPricingForType.isFree && hasPricingForType.amount >= 300;
    }

    return true;
  });

  // Get counts for each tier
  const tierCounts = {
    free: allDoctors.filter((d) => {
      const pricing =
        d.pricing[selectedConsultationType as keyof typeof d.pricing];
      return (
        d.consultationTypes.includes(selectedConsultationType) &&
        pricing?.isFree
      );
    }).length,
    affordable: allDoctors.filter((d) => {
      const pricing =
        d.pricing[selectedConsultationType as keyof typeof d.pricing];
      return (
        d.consultationTypes.includes(selectedConsultationType) &&
        pricing &&
        !pricing.isFree &&
        pricing.amount < 300
      );
    }).length,
    premium: allDoctors.filter((d) => {
      const pricing =
        d.pricing[selectedConsultationType as keyof typeof d.pricing];
      return (
        d.consultationTypes.includes(selectedConsultationType) &&
        pricing &&
        !pricing.isFree &&
        pricing.amount >= 300
      );
    }).length,
  };

  const getConsultationTypeInfo = (type: string) => {
    switch (type) {
      case "video":
        return {
          title: "Video Call Consultation",
          description: "Face-to-face consultation with high-quality video",
          icon: Video,
          color: "gender-blue",
        };
      case "voice":
        return {
          title: "Voice Call Consultation",
          description: "Audio-only consultation for privacy and convenience",
          icon: Phone,
          color: "gender-pink",
        };
      case "chat":
        return {
          title: "Chat Consultation",
          description: "Text-based consultation with quick responses",
          icon: MessageCircle,
          color: "coral",
        };
      default:
        return {
          title: "Consultation",
          description: "Professional medical consultation",
          icon: Video,
          color: "herbal",
        };
    }
  };

  const consultationInfo = getConsultationTypeInfo(selectedConsultationType);

  return (
    <div className="min-h-screen bg-sand">
      {/* Header */}
      <header className="border-b border-gray-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link
                to="/dashboard"
                className="p-2 hover:bg-sand rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-indigo" />
              </Link>
              <div className="w-8 h-8 bg-herbal rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-indigo">
                  Doctor Connect
                </h1>
                <p className="text-xs text-indigo/70">Welcome, {user?.name}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Avatar className="w-6 h-6 mr-2">
                    <AvatarFallback className="bg-herbal text-white text-xs">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Instructions */}
          <div className="text-center mb-8">
            <Badge className="bg-herbal-50 text-herbal border-herbal-100 mb-4">
              👨‍⚕️ Expert Consultation
            </Badge>
            <h2 className="text-2xl font-bold text-indigo mb-2">
              Connect with Qualified Doctors
            </h2>
            <p className="text-indigo/70">
              Get professional medical advice from experienced doctors via video
              or phone call
            </p>
          </div>

          {/* Consultation Type Selector with Pricing Tiers */}
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border border-gray-border">
                <button
                  onClick={() => setSelectedConsultationType("video")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedConsultationType === "video"
                      ? "bg-gender-blue text-white shadow-sm"
                      : "text-indigo hover:text-gender-blue"
                  }`}
                >
                  <Video className="w-4 h-4 inline mr-2" />
                  Video Calls
                </button>
                <button
                  onClick={() => setSelectedConsultationType("voice")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedConsultationType === "voice"
                      ? "bg-gender-pink text-white shadow-sm"
                      : "text-indigo hover:text-gender-pink"
                  }`}
                >
                  <Phone className="w-4 h-4 inline mr-2" />
                  Voice Calls
                </button>
                <button
                  onClick={() => setSelectedConsultationType("chat")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedConsultationType === "chat"
                      ? "bg-coral text-white shadow-sm"
                      : "text-indigo hover:text-coral"
                  }`}
                >
                  <MessageCircle className="w-4 h-4 inline mr-2" />
                  Chat
                </button>
              </div>
            </div>

            {/* Pricing Tiers for Selected Consultation Type */}
            {(selectedConsultationType === "video" ||
              selectedConsultationType === "voice") && (
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                {/* Free Tier 1 */}
                <Card className="border-herbal-200 bg-herbal-50 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-herbal text-white">FREE</Badge>
                  </div>
                  <CardContent className="pt-8 pb-4 text-center">
                    <h4 className="font-semibold text-indigo mb-2">
                      {selectedConsultationType === "video"
                        ? "Basic Video"
                        : "Basic Voice"}
                    </h4>
                    <p className="text-2xl font-bold text-herbal mb-2">₹0</p>
                    <p className="text-sm text-indigo/70 mb-3">
                      15 min consultation
                    </p>
                    <ul className="text-xs text-indigo/80 space-y-1">
                      <li>• General health queries</li>
                      <li>• Basic symptom check</li>
                      <li>• Health tips</li>
                    </ul>
                    <Badge variant="outline" className="mt-3 text-xs">
                      {selectedConsultationType === "video" ? "2" : "3"} doctors
                    </Badge>
                  </CardContent>
                </Card>

                {/* Free Tier 2 */}
                <Card className="border-herbal-200 bg-herbal-50 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-herbal text-white">FREE</Badge>
                  </div>
                  <CardContent className="pt-8 pb-4 text-center">
                    <h4 className="font-semibold text-indigo mb-2">
                      {selectedConsultationType === "video"
                        ? "Student Doctor"
                        : "Trainee Support"}
                    </h4>
                    <p className="text-2xl font-bold text-herbal mb-2">₹0</p>
                    <p className="text-sm text-indigo/70 mb-3">
                      20 min consultation
                    </p>
                    <ul className="text-xs text-indigo/80 space-y-1">
                      <li>• Medical students</li>
                      <li>• Supervised guidance</li>
                      <li>• Educational purpose</li>
                    </ul>
                    <Badge variant="outline" className="mt-3 text-xs">
                      {selectedConsultationType === "video" ? "3" : "2"} doctors
                    </Badge>
                  </CardContent>
                </Card>

                {/* Paid Tier 1 */}
                <Card className="border-coral-200 bg-coral-50 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-coral text-white">AFFORDABLE</Badge>
                  </div>
                  <CardContent className="pt-8 pb-4 text-center">
                    <h4 className="font-semibold text-indigo mb-2">
                      {selectedConsultationType === "video"
                        ? "Standard Video"
                        : "Standard Voice"}
                    </h4>
                    <p className="text-2xl font-bold text-coral mb-2">
                      ₹{selectedConsultationType === "video" ? "199" : "149"}
                    </p>
                    <p className="text-sm text-indigo/70 mb-3">
                      30 min consultation
                    </p>
                    <ul className="text-xs text-indigo/80 space-y-1">
                      <li>• Qualified doctors</li>
                      <li>• Digital prescription</li>
                      <li>• Follow-up support</li>
                    </ul>
                    <Badge variant="outline" className="mt-3 text-xs">
                      {selectedConsultationType === "video" ? "8" : "6"} doctors
                    </Badge>
                  </CardContent>
                </Card>

                {/* Paid Tier 2 */}
                <Card className="border-gender-blue-200 bg-gender-blue-50 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gender-blue text-white">PREMIUM</Badge>
                  </div>
                  <CardContent className="pt-8 pb-4 text-center">
                    <h4 className="font-semibold text-indigo mb-2">
                      {selectedConsultationType === "video"
                        ? "Expert Video"
                        : "Expert Voice"}
                    </h4>
                    <p className="text-2xl font-bold text-gender-blue mb-2">
                      ₹{selectedConsultationType === "video" ? "499" : "399"}
                    </p>
                    <p className="text-sm text-indigo/70 mb-3">
                      45 min consultation
                    </p>
                    <ul className="text-xs text-indigo/80 space-y-1">
                      <li>• Senior specialists</li>
                      <li>• Detailed analysis</li>
                      <li>• Priority support</li>
                    </ul>
                    <Badge variant="outline" className="mt-3 text-xs">
                      {selectedConsultationType === "video" ? "7" : "5"} doctors
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Chat is always free */}
            {selectedConsultationType === "chat" && (
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="border-herbal-200 bg-herbal-50">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-herbal rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-indigo mb-2">
                      Free Chat Support
                    </h3>
                    <p className="text-coral text-3xl font-bold mb-4">₹0</p>
                    <p className="text-indigo/70 mb-4">
                      Get unlimited text-based health consultations with our AI
                      and human experts
                    </p>
                    <Badge className="bg-herbal text-white">
                      {
                        allDoctors.filter((d) =>
                          d.consultationTypes.includes("chat"),
                        ).length
                      }{" "}
                      doctors available
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="border-gray-border">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-coral rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-indigo mb-2">
                      Why Chat is Free?
                    </h3>
                    <div className="text-left text-sm text-indigo/80 space-y-2">
                      <p>
                        • <strong>Accessible Healthcare:</strong> No barriers
                        for basic health queries
                      </p>
                      <p>
                        • <strong>Rural Focus:</strong> Text works even with
                        slow internet
                      </p>
                      <p>
                        • <strong>24/7 Support:</strong> AI + human experts
                        always available
                      </p>
                      <p>
                        • <strong>Community Care:</strong> Building trust
                        through free services
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Tier Filter */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border border-gray-border">
                <button
                  onClick={() => setSelectedTier("all")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedTier === "all"
                      ? "bg-indigo text-white shadow-sm"
                      : "text-indigo/70 hover:text-indigo"
                  }`}
                >
                  All ({doctors.length})
                </button>
                <button
                  onClick={() => setSelectedTier("free")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedTier === "free"
                      ? "bg-herbal text-white shadow-sm"
                      : "text-indigo/70 hover:text-herbal"
                  }`}
                >
                  Free ({tierCounts.free})
                </button>
                <button
                  onClick={() => setSelectedTier("affordable")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedTier === "affordable"
                      ? "bg-coral text-white shadow-sm"
                      : "text-indigo/70 hover:text-coral"
                  }`}
                >
                  Affordable ({tierCounts.affordable})
                </button>
                <button
                  onClick={() => setSelectedTier("premium")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedTier === "premium"
                      ? "bg-gender-blue text-white shadow-sm"
                      : "text-indigo/70 hover:text-gender-blue"
                  }`}
                >
                  Premium ({tierCounts.premium})
                </button>
              </div>
            </div>
          </div>

          {/* Available Doctors for Selected Consultation Type */}
          <Card className="border-gray-border shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-indigo flex items-center gap-2">
                    <consultationInfo.icon className="w-5 h-5" />
                    {consultationInfo.title}
                  </CardTitle>
                  <p className="text-sm text-indigo/70 mt-1">
                    {consultationInfo.description}
                  </p>
                </div>
                <Badge className="bg-herbal-50 text-herbal">
                  {doctors.length} Available
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="flex items-center justify-between p-4 border border-gray-border rounded-lg hover:bg-sand/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={`/api/placeholder/64/64`} />
                        <AvatarFallback className="bg-herbal text-white">
                          {doctor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-indigo">
                          {doctor.name}
                        </h3>
                        <p className="text-sm text-indigo/70">
                          {doctor.specialization}
                        </p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center text-sm">
                            <Star className="w-4 h-4 fill-coral text-coral mr-1" />
                            <span className="text-indigo">{doctor.rating}</span>
                          </div>
                          <span className="text-sm text-indigo/60">
                            {doctor.experience}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <Clock className="w-4 h-4 text-herbal" />
                          <span className="text-sm text-herbal font-medium">
                            {doctor.availability}
                          </span>
                        </div>
                        <div className="flex gap-1 mt-2">
                          {doctor.languages.map((lang) => (
                            <Badge
                              key={lang}
                              variant="outline"
                              className="text-xs border-indigo text-indigo"
                            >
                              {lang}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {doctor.badges.map((badge) => (
                            <Badge
                              key={badge}
                              className={`text-xs ${
                                badge.includes("Free") ||
                                badge === "Rural Expert" ||
                                badge === "Rural Specialist" ||
                                badge === "Volunteer"
                                  ? "bg-herbal-50 text-herbal border-herbal"
                                  : badge === "Premium" ||
                                      badge.includes("Senior") ||
                                      badge.includes("15+")
                                    ? "bg-gender-blue-50 text-gender-blue border-gender-blue"
                                    : badge === "Affordable" ||
                                        badge.includes("Child") ||
                                        badge.includes("Expert")
                                      ? "bg-coral-50 text-coral border-coral"
                                      : badge.includes("Student") ||
                                          badge.includes("Trainee") ||
                                          badge.includes("Learning")
                                        ? "bg-gender-pink-50 text-gender-pink border-gender-pink"
                                        : "bg-gray-50 text-gray-600 border-gray-200"
                              }`}
                            >
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {(() => {
                        const pricing =
                          doctor.pricing[
                            selectedConsultationType as keyof typeof doctor.pricing
                          ];
                        const isFree = pricing?.isFree || false;
                        const amount = pricing?.amount || 0;
                        const duration = pricing?.duration || "30 min";
                        const tier = pricing?.tier || "standard";

                        return (
                          <>
                            <div className="mb-3">
                              {isFree ? (
                                <div className="flex flex-col items-end">
                                  <Badge className="bg-herbal text-white mb-2 px-3 py-1">
                                    FREE
                                  </Badge>
                                  <p className="text-sm text-indigo/70">
                                    {duration} consultation
                                  </p>
                                </div>
                              ) : (
                                <div className="flex flex-col items-end">
                                  <p className="text-2xl font-bold text-indigo mb-1">
                                    ₹{amount}
                                  </p>
                                  <p className="text-sm text-indigo/70 mb-1">
                                    {duration} consultation
                                  </p>
                                  <Badge
                                    className={`text-xs ${
                                      tier === "premium"
                                        ? "bg-gender-blue-50 text-gender-blue border-gender-blue"
                                        : "bg-coral-50 text-coral border-coral"
                                    }`}
                                  >
                                    {tier === "premium"
                                      ? "Premium"
                                      : "Standard"}
                                  </Badge>
                                </div>
                              )}
                            </div>
                            <Link
                              to={
                                isFree
                                  ? `/consultation/${selectedConsultationType}?doctorId=${doctor.id}&free=true`
                                  : `/payment?doctorId=${doctor.id}&type=${selectedConsultationType}`
                              }
                              className="inline-block w-full"
                            >
                              <Button
                                size="sm"
                                className={`w-full text-white transition-all duration-300 hover:scale-105 ${
                                  isFree
                                    ? "bg-herbal hover:bg-herbal-600"
                                    : tier === "premium"
                                      ? "bg-gender-blue hover:bg-gender-blue-600"
                                      : "bg-coral hover:bg-coral-600"
                                }`}
                              >
                                <consultationInfo.icon className="w-4 h-4 mr-2" />
                                {isFree ? "Start Free" : "Book Now"}
                              </Button>
                            </Link>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Notice */}
          <div className="mt-8 p-4 bg-soft-red-50 border border-soft-red-200 rounded-lg text-center">
            <p className="text-sm text-indigo">
              <strong>Emergency?</strong> Call{" "}
              <a href="tel:108" className="text-soft-red font-semibold">
                108
              </a>{" "}
              for immediate medical assistance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorConnect;
