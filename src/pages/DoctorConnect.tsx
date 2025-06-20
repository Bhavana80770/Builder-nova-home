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
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const DoctorConnect = () => {
  const { user, logout } = useAuth();
  const [selectedConsultationType, setSelectedConsultationType] =
    useState<string>("video");

  const allDoctors = [
    // General Physicians
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialization: "General Physician",
      experience: "8 years",
      rating: 4.8,
      availability: "Available Now",
      languages: ["Hindi", "English"],
      consultationTypes: ["video", "voice", "chat"],
      pricing: {
        video: { amount: 299, isFree: false },
        voice: { amount: 199, isFree: false },
        chat: { amount: 149, isFree: true },
      },
      badges: ["Verified", "Rural Specialist"],
    },
    {
      id: 2,
      name: "Dr. Anand Verma",
      specialization: "General Physician",
      experience: "12 years",
      rating: 4.7,
      availability: "Available in 20 min",
      languages: ["Hindi", "English", "Punjabi"],
      consultationTypes: ["video", "voice", "chat"],
      pricing: {
        video: { amount: 349, isFree: false },
        voice: { amount: 249, isFree: false },
        chat: { amount: 0, isFree: true },
      },
      badges: ["Free Chat", "Family Medicine"],
    },

    // Pediatricians
    {
      id: 3,
      name: "Dr. Rajesh Kumar",
      specialization: "Pediatrician",
      experience: "12 years",
      rating: 4.9,
      availability: "Available in 15 min",
      languages: ["Hindi", "English", "Bengali"],
      consultationTypes: ["video", "voice", "chat"],
      pricing: {
        video: { amount: 399, isFree: false },
        voice: { amount: 299, isFree: false },
        chat: { amount: 199, isFree: false },
      },
      badges: ["Premium", "Child Specialist"],
    },
    {
      id: 4,
      name: "Dr. Meera Joshi",
      specialization: "Pediatrician",
      experience: "9 years",
      rating: 4.6,
      availability: "Available Now",
      languages: ["Hindi", "English", "Marathi"],
      consultationTypes: ["video", "voice", "chat"],
      pricing: {
        video: { amount: 449, isFree: false },
        voice: { amount: 349, isFree: false },
        chat: { amount: 149, isFree: true },
      },
      badges: ["Newborn Care", "Vaccination Expert"],
    },

    // Gynecologists
    {
      id: 5,
      name: "Dr. Sunita Devi",
      specialization: "Gynecologist",
      experience: "10 years",
      rating: 4.7,
      availability: "Available at 6 PM",
      languages: ["Hindi", "English"],
      consultationTypes: ["video", "chat"],
      pricing: {
        video: { amount: 499, isFree: false },
        chat: { amount: 249, isFree: false },
      },
      badges: ["Women's Health", "Verified"],
    },
    {
      id: 6,
      name: "Dr. Kavya Menon",
      specialization: "Gynecologist",
      experience: "14 years",
      rating: 4.8,
      availability: "Available in 45 min",
      languages: ["English", "Malayalam", "Tamil"],
      consultationTypes: ["video", "voice", "chat"],
      pricing: {
        video: { amount: 599, isFree: false },
        voice: { amount: 449, isFree: false },
        chat: { amount: 299, isFree: false },
      },
      badges: ["Pregnancy Care", "Premium"],
    },

    // Cardiologists
    {
      id: 7,
      name: "Dr. Amit Patel",
      specialization: "Cardiologist",
      experience: "15 years",
      rating: 4.9,
      availability: "Available Now",
      languages: ["Hindi", "English", "Gujarati"],
      consultationTypes: ["video", "voice"],
      pricing: {
        video: { amount: 699, isFree: false },
        voice: { amount: 499, isFree: false },
      },
      badges: ["Heart Specialist", "Premium"],
    },
    {
      id: 8,
      name: "Dr. Sandeep Aggarwal",
      specialization: "Cardiologist",
      experience: "18 years",
      rating: 4.9,
      availability: "Available at 4 PM",
      languages: ["Hindi", "English"],
      consultationTypes: ["video", "voice", "chat"],
      pricing: {
        video: { amount: 799, isFree: false },
        voice: { amount: 599, isFree: false },
        chat: { amount: 399, isFree: false },
      },
      badges: ["Senior Consultant", "Heart Surgery"],
    },

    // Dermatologists
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
        video: { amount: 549, isFree: false },
        voice: { amount: 399, isFree: false },
        chat: { amount: 199, isFree: false },
      },
      badges: ["Skin Expert", "Verified"],
    },
    {
      id: 10,
      name: "Dr. Rahul Khanna",
      specialization: "Dermatologist",
      experience: "11 years",
      rating: 4.7,
      availability: "Available Now",
      languages: ["Hindi", "English", "Punjabi"],
      consultationTypes: ["video", "chat"],
      pricing: {
        video: { amount: 649, isFree: false },
        chat: { amount: 249, isFree: false },
      },
      badges: ["Acne Specialist", "Cosmetic"],
    },

    // Orthopedics
    {
      id: 11,
      name: "Dr. Manoj Singh",
      specialization: "Orthopedic",
      experience: "11 years",
      rating: 4.8,
      availability: "Available at 3 PM",
      languages: ["Hindi", "English"],
      consultationTypes: ["video", "chat"],
      pricing: {
        video: { amount: 599, isFree: false },
        chat: { amount: 299, isFree: false },
      },
      badges: ["Bone Specialist", "Rural Expert"],
    },
    {
      id: 12,
      name: "Dr. Vikram Rao",
      specialization: "Orthopedic",
      experience: "16 years",
      rating: 4.8,
      availability: "Available in 2 hours",
      languages: ["Hindi", "English", "Telugu"],
      consultationTypes: ["video", "voice", "chat"],
      pricing: {
        video: { amount: 699, isFree: false },
        voice: { amount: 549, isFree: false },
        chat: { amount: 349, isFree: false },
      },
      badges: ["Joint Replacement", "Sports Medicine"],
    },

    // Mental Health
    {
      id: 13,
      name: "Dr. Sita Gupta",
      specialization: "Mental Health",
      experience: "9 years",
      rating: 4.7,
      availability: "Available Now",
      languages: ["Hindi", "English"],
      consultationTypes: ["voice", "chat"],
      pricing: {
        voice: { amount: 449, isFree: false },
        chat: { amount: 0, isFree: true },
      },
      badges: ["Free Support", "Counselor"],
    },
    {
      id: 14,
      name: "Dr. Arjun Mehta",
      specialization: "Mental Health",
      experience: "13 years",
      rating: 4.9,
      availability: "Available in 40 min",
      languages: ["Hindi", "English", "Gujarati"],
      consultationTypes: ["video", "voice", "chat"],
      pricing: {
        video: { amount: 599, isFree: false },
        voice: { amount: 399, isFree: false },
        chat: { amount: 199, isFree: true },
      },
      badges: ["Anxiety Specialist", "Depression Care"],
    },

    // ENT Specialists
    {
      id: 15,
      name: "Dr. Ramesh Nair",
      specialization: "ENT Specialist",
      experience: "13 years",
      rating: 4.5,
      availability: "Available in 1 hour",
      languages: ["English", "Malayalam", "Tamil"],
      consultationTypes: ["video", "voice", "chat"],
      pricing: {
        video: { amount: 399, isFree: false },
        voice: { amount: 299, isFree: false },
        chat: { amount: 149, isFree: true },
      },
      badges: ["ENT Expert", "Verified"],
    },
    {
      id: 16,
      name: "Dr. Neha Saxena",
      specialization: "ENT Specialist",
      experience: "8 years",
      rating: 4.6,
      availability: "Available Now",
      languages: ["Hindi", "English"],
      consultationTypes: ["video", "voice", "chat"],
      pricing: {
        video: { amount: 449, isFree: false },
        voice: { amount: 349, isFree: false },
        chat: { amount: 0, isFree: true },
      },
      badges: ["Hearing Care", "Free Chat"],
    },

    // Diabetologists
    {
      id: 17,
      name: "Dr. Suresh Yadav",
      specialization: "Diabetologist",
      experience: "14 years",
      rating: 4.8,
      availability: "Available in 25 min",
      languages: ["Hindi", "English"],
      consultationTypes: ["video", "voice", "chat"],
      pricing: {
        video: { amount: 549, isFree: false },
        voice: { amount: 399, isFree: false },
        chat: { amount: 249, isFree: false },
      },
      badges: ["Diabetes Care", "Diet Planning"],
    },

    // Neurologists
    {
      id: 18,
      name: "Dr. Ravi Krishnan",
      specialization: "Neurologist",
      experience: "17 years",
      rating: 4.9,
      availability: "Available at 5 PM",
      languages: ["English", "Tamil", "Malayalam"],
      consultationTypes: ["video", "voice"],
      pricing: {
        video: { amount: 799, isFree: false },
        voice: { amount: 649, isFree: false },
      },
      badges: ["Brain Specialist", "Premium"],
    },

    // Ophthalmologists
    {
      id: 19,
      name: "Dr. Asha Iyer",
      specialization: "Ophthalmologist",
      experience: "10 years",
      rating: 4.7,
      availability: "Available Now",
      languages: ["English", "Hindi", "Kannada"],
      consultationTypes: ["video", "chat"],
      pricing: {
        video: { amount: 499, isFree: false },
        chat: { amount: 249, isFree: false },
      },
      badges: ["Eye Care", "Verified"],
    },

    // Gastroenterologists
    {
      id: 20,
      name: "Dr. Mukesh Jain",
      specialization: "Gastroenterologist",
      experience: "12 years",
      rating: 4.6,
      availability: "Available in 50 min",
      languages: ["Hindi", "English"],
      consultationTypes: ["video", "voice", "chat"],
      pricing: {
        video: { amount: 649, isFree: false },
        voice: { amount: 499, isFree: false },
        chat: { amount: 299, isFree: false },
      },
      badges: ["Digestive Health", "IBS Specialist"],
    },
  ];

  // Filter doctors based on selected consultation type
  const doctors = allDoctors.filter((doctor) =>
    doctor.consultationTypes.includes(selectedConsultationType),
  );

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
                        <div className="flex gap-1 mt-2">
                          {doctor.badges.map((badge) => (
                            <Badge
                              key={badge}
                              className={`text-xs ${
                                badge === "Free Support" ||
                                badge === "Rural Expert" ||
                                badge === "Rural Specialist"
                                  ? "bg-herbal-50 text-herbal border-herbal"
                                  : badge === "Premium"
                                    ? "bg-coral-50 text-coral border-coral"
                                    : "bg-gender-blue-50 text-gender-blue border-gender-blue"
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

                        return (
                          <>
                            <div className="mb-2">
                              {isFree ? (
                                <div className="flex flex-col items-end">
                                  <Badge className="bg-herbal text-white mb-1">
                                    FREE
                                  </Badge>
                                  <p className="text-sm text-indigo/60 line-through">
                                    ₹{amount}
                                  </p>
                                </div>
                              ) : (
                                <p className="text-lg font-bold text-indigo">
                                  ₹{amount}
                                </p>
                              )}
                            </div>
                            <Link
                              to={
                                isFree
                                  ? `/consultation/${selectedConsultationType}?doctorId=${doctor.id}&free=true`
                                  : `/payment?doctorId=${doctor.id}&type=${selectedConsultationType}`
                              }
                              className="inline-block"
                            >
                              <Button
                                size="sm"
                                className={`text-white ${
                                  isFree
                                    ? "bg-herbal hover:bg-herbal-600"
                                    : selectedConsultationType === "video"
                                      ? "bg-gender-blue hover:bg-gender-blue-600"
                                      : selectedConsultationType === "voice"
                                        ? "bg-gender-pink hover:bg-gender-pink-600"
                                        : "bg-coral hover:bg-coral-600"
                                }`}
                              >
                                <consultationInfo.icon className="w-4 h-4 mr-1" />
                                {isFree ? "Start Free" : "Pay & Start"}{" "}
                                {selectedConsultationType === "video"
                                  ? "Video"
                                  : selectedConsultationType === "voice"
                                    ? "Call"
                                    : "Chat"}
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
