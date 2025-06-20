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
        chat: { amount: 149, isFree: true }, // Free chat for basic health
      },
      badges: ["Verified", "Rural Specialist"],
    },
    {
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
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
      id: 7,
      name: "Dr. Sita Gupta",
      specialization: "Mental Health",
      experience: "9 years",
      rating: 4.7,
      availability: "Available Now",
      languages: ["Hindi", "English"],
      consultationTypes: ["voice", "chat"],
      pricing: {
        voice: { amount: 449, isFree: false },
        chat: { amount: 0, isFree: true }, // Free mental health support
      },
      badges: ["Free Support", "Counselor"],
    },
    {
      id: 8,
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
        chat: { amount: 149, isFree: true }, // Free for basic ENT queries
      },
      badges: ["ENT Expert", "Verified"],
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

          {/* Consultation Type Selector */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card
              className={`border-gray-border hover:shadow-lg transition-all duration-300 cursor-pointer ${
                selectedConsultationType === "video"
                  ? "ring-2 ring-gender-blue bg-gender-blue-50"
                  : ""
              }`}
              onClick={() => setSelectedConsultationType("video")}
            >
              <CardContent className="pt-6 text-center">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${
                    selectedConsultationType === "video"
                      ? "bg-gender-blue text-white"
                      : "bg-gender-blue-100 text-gender-blue"
                  }`}
                >
                  <Video className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-indigo mb-2">Video Call</h3>
                <p className="text-sm text-indigo/70 mb-4">
                  Face-to-face consultation with doctor
                </p>
                <Badge
                  variant={
                    selectedConsultationType === "video" ? "default" : "outline"
                  }
                >
                  {doctors.length} doctors available
                </Badge>
              </CardContent>
            </Card>

            <Card
              className={`border-gray-border hover:shadow-lg transition-all duration-300 cursor-pointer ${
                selectedConsultationType === "voice"
                  ? "ring-2 ring-gender-pink bg-gender-pink-50"
                  : ""
              }`}
              onClick={() => setSelectedConsultationType("voice")}
            >
              <CardContent className="pt-6 text-center">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${
                    selectedConsultationType === "voice"
                      ? "bg-gender-pink text-white"
                      : "bg-gender-pink-100 text-gender-pink"
                  }`}
                >
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-indigo mb-2">Voice Call</h3>
                <p className="text-sm text-indigo/70 mb-4">
                  Audio consultation with expert
                </p>
                <Badge
                  variant={
                    selectedConsultationType === "voice" ? "default" : "outline"
                  }
                >
                  {
                    allDoctors.filter((d) =>
                      d.consultationTypes.includes("voice"),
                    ).length
                  }{" "}
                  doctors available
                </Badge>
              </CardContent>
            </Card>

            <Card
              className={`border-gray-border hover:shadow-lg transition-all duration-300 cursor-pointer ${
                selectedConsultationType === "chat"
                  ? "ring-2 ring-coral bg-coral-50"
                  : ""
              }`}
              onClick={() => setSelectedConsultationType("chat")}
            >
              <CardContent className="pt-6 text-center">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${
                    selectedConsultationType === "chat"
                      ? "bg-coral text-white"
                      : "bg-coral-100 text-coral"
                  }`}
                >
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-indigo mb-2">Chat</h3>
                <p className="text-sm text-indigo/70 mb-4">
                  Text-based consultation
                </p>
                <Badge
                  variant={
                    selectedConsultationType === "chat" ? "default" : "outline"
                  }
                >
                  {
                    allDoctors.filter((d) =>
                      d.consultationTypes.includes("chat"),
                    ).length
                  }{" "}
                  doctors available
                </Badge>
              </CardContent>
            </Card>
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
