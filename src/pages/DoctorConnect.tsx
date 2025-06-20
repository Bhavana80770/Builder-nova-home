import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Heart,
  ArrowLeft,
  Video,
  Phone,
  MessageCircle,
  Star,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

const DoctorConnect = () => {
  const doctors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialization: "General Physician",
      experience: "8 years",
      rating: 4.8,
      availability: "Available Now",
      languages: ["Hindi", "English"],
      consultationFee: "₹299",
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialization: "Pediatrician",
      experience: "12 years",
      rating: 4.9,
      availability: "Available in 15 min",
      languages: ["Hindi", "English", "Bengali"],
      consultationFee: "₹399",
    },
    {
      id: 3,
      name: "Dr. Sunita Devi",
      specialization: "Gynecologist",
      experience: "10 years",
      rating: 4.7,
      availability: "Available at 6 PM",
      languages: ["Hindi", "English"],
      consultationFee: "₹499",
    },
  ];

  return (
    <div className="min-h-screen bg-sand">
      {/* Header */}
      <header className="border-b border-gray-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link
                to="/"
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
                <p className="text-xs text-indigo/70">Consult with experts</p>
              </div>
            </div>
            <Link to="/chat">
              <Button
                variant="outline"
                size="sm"
                className="border-herbal text-herbal hover:bg-herbal-50"
              >
                AI Chat First
              </Button>
            </Link>
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

          {/* Consultation Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-gray-border hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-gender-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Video className="w-6 h-6 text-gender-blue" />
                </div>
                <h3 className="font-semibold text-indigo mb-2">Video Call</h3>
                <p className="text-sm text-indigo/70 mb-4">
                  Face-to-face consultation with doctor
                </p>
                <Button
                  size="sm"
                  className="bg-gender-blue hover:bg-gender-blue-600 text-white"
                >
                  Start Video Call
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-border hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-gender-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-gender-pink" />
                </div>
                <h3 className="font-semibold text-indigo mb-2">Voice Call</h3>
                <p className="text-sm text-indigo/70 mb-4">
                  Audio consultation with expert
                </p>
                <Button
                  size="sm"
                  className="bg-gender-pink hover:bg-gender-pink-600 text-white"
                >
                  Start Voice Call
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-border hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-coral-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-coral" />
                </div>
                <h3 className="font-semibold text-indigo mb-2">Chat</h3>
                <p className="text-sm text-indigo/70 mb-4">
                  Text-based consultation
                </p>
                <Button
                  size="sm"
                  className="bg-coral hover:bg-coral-600 text-white"
                >
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Available Doctors */}
          <Card className="border-gray-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-indigo">Available Doctors</CardTitle>
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
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-indigo mb-2">
                        {doctor.consultationFee}
                      </p>
                      <Button
                        size="sm"
                        className="bg-herbal hover:bg-herbal-600 text-white"
                      >
                        Consult Now
                      </Button>
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
