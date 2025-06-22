import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageCircle,
  Stethoscope,
  Users,
  Phone,
  Shield,
  ChevronRight,
  Star,
  Calendar,
  MapPin,
  Clock,
  Award,
  HeartHandshake,
  Activity,
  UserCheck,
  Zap,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="bg-blue-900 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <span className="flex items-center">
              <Phone className="w-3 h-3 mr-1" />
              Emergency: 108
            </span>
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              24/7 Available
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/about" className="hover:text-blue-200">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-blue-200">
              Contact
            </Link>
            <Link to="/careers" className="hover:text-blue-200">
              Careers
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-900">
                  AarogyaMitra
                </h1>
                <p className="text-sm text-gray-600">
                  Advanced Healthcare Solutions
                </p>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                to="/services"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Medical Services
              </Link>
              <Link
                to="/specialties"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Specialties
              </Link>
              <Link
                to="/doctors"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Find Doctor
              </Link>
              <Link
                to="/appointments"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Book Appointment
              </Link>
              <Link
                to="/health-checkup"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Health Checkup
              </Link>
            </nav>

            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Login
                </Button>
              </Link>
              <Link to="/phone-verification">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Book Appointment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Badge className="bg-green-100 text-green-800 border-green-200 mr-3">
                  Trusted Healthcare Partner
                </Badge>
                <div className="flex items-center text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="ml-2 text-gray-600 text-sm">
                    50,000+ Happy Patients
                  </span>
                </div>
              </div>

              <h1 className="text-5xl font-bold text-blue-900 mb-6 leading-tight">
                Your Health,
                <span className="text-blue-600 block">Our Priority</span>
              </h1>

              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Experience world-class healthcare with our AI-powered medical
                assistance, specialist consultations, and comprehensive health
                services designed for modern India.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/phone-verification">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Appointment
                  </Button>
                </Link>
                <Link to="/emergency">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-red-500 text-red-600 hover:bg-red-50 px-8 py-4 text-lg"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Emergency - 108
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">1000+</div>
                  <div className="text-sm text-gray-600">Expert Doctors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">24/7</div>
                  <div className="text-sm text-gray-600">Emergency Care</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900">50K+</div>
                  <div className="text-sm text-gray-600">Patients Served</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-blue-900 mb-6">
                  Quick Health Check
                </h3>
                <div className="space-y-4">
                  <Link
                    to="/symptoms"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <Stethoscope className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Symptom Checker
                      </h4>
                      <p className="text-sm text-gray-600">
                        AI-powered health assessment
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                  </Link>

                  <Link
                    to="/chat"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        AI Health Assistant
                      </h4>
                      <p className="text-sm text-gray-600">
                        24/7 intelligent support
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                  </Link>

                  <Link
                    to="/doctors"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Consult Doctor
                      </h4>
                      <p className="text-sm text-gray-600">
                        Video/Voice consultation
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Specialties */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Medical Specialties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare services across all major medical
              specialties with world-class experts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Cardiology",
                icon: Heart,
                color: "bg-red-100 text-red-600",
                patients: "15K+",
              },
              {
                name: "Neurology",
                icon: Activity,
                color: "bg-purple-100 text-purple-600",
                patients: "8K+",
              },
              {
                name: "Oncology",
                icon: Shield,
                color: "bg-green-100 text-green-600",
                patients: "5K+",
              },
              {
                name: "Pediatrics",
                icon: HeartHandshake,
                color: "bg-blue-100 text-blue-600",
                patients: "12K+",
              },
              {
                name: "Orthopedics",
                icon: UserCheck,
                color: "bg-orange-100 text-orange-600",
                patients: "10K+",
              },
              {
                name: "Gastroenterology",
                icon: Zap,
                color: "bg-yellow-100 text-yellow-600",
                patients: "7K+",
              },
              {
                name: "Dermatology",
                icon: Globe,
                color: "bg-pink-100 text-pink-600",
                patients: "6K+",
              },
              {
                name: "General Medicine",
                icon: Stethoscope,
                color: "bg-indigo-100 text-indigo-600",
                patients: "20K+",
              },
            ].map((specialty, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 rounded-full ${specialty.color} flex items-center justify-center mx-auto mb-4`}
                  >
                    <specialty.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {specialty.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {specialty.patients} patients treated
                  </p>
                  <Button variant="link" className="text-blue-600 p-0">
                    Learn More →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive healthcare solutions for all your medical needs
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-900">
                  AI Health Assistant
                </CardTitle>
                <CardDescription>
                  Advanced AI-powered health guidance available 24/7 in multiple
                  Indian languages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li>• Symptom analysis and guidance</li>
                  <li>• Multi-language support</li>
                  <li>• Emergency detection</li>
                  <li>• Medication reminders</li>
                </ul>
                <Link to="/chat">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Start Chat
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-blue-900">
                  Doctor Consultations
                </CardTitle>
                <CardDescription>
                  Connect with qualified specialists for video/voice
                  consultations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li>• Video & voice consultations</li>
                  <li>• Specialist appointments</li>
                  <li>• Digital prescriptions</li>
                  <li>• Follow-up care</li>
                </ul>
                <Link to="/doctors">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Find Doctor
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-blue-900">Health Checkups</CardTitle>
                <CardDescription>
                  Comprehensive health screening packages tailored to your needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li>• Full body checkups</li>
                  <li>• Specialized screenings</li>
                  <li>• Preventive care plans</li>
                  <li>• Health reports & analysis</li>
                </ul>
                <Link to="/health-checkup">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Book Checkup
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Why Choose AarogyaMitra
            </h2>
            <p className="text-xl text-gray-600">
              Leading healthcare provider with a commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                Expert Doctors
              </h3>
              <p className="text-gray-600">
                1000+ qualified specialists with international experience
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                24/7 Care
              </h3>
              <p className="text-gray-600">
                Round-the-clock emergency services and AI assistance
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                Advanced Technology
              </h3>
              <p className="text-gray-600">
                AI-powered diagnostics and modern medical equipment
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                Compassionate Care
              </h3>
              <p className="text-gray-600">
                Patient-centered approach with personalized treatment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Experience Better Healthcare?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of patients who trust AarogyaMitra for their
              healthcare needs. Get started with a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/phone-verification">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
                >
                  Book Free Consultation
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/emergency">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
                >
                  Emergency Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">AarogyaMitra</span>
              </div>
              <p className="text-blue-200 mb-4 max-w-md">
                Leading healthcare provider in India, committed to delivering
                world-class medical services through advanced technology and
                compassionate care.
              </p>
              <div className="flex items-center text-blue-200">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Multiple locations across India</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <Link to="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white">
                    Medical Services
                  </Link>
                </li>
                <li>
                  <Link to="/doctors" className="hover:text-white">
                    Find Doctor
                  </Link>
                </li>
                <li>
                  <Link to="/appointments" className="hover:text-white">
                    Appointments
                  </Link>
                </li>
                <li>
                  <Link to="/health-checkup" className="hover:text-white">
                    Health Checkup
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <Link to="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/emergency" className="hover:text-white">
                    Emergency: 108
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>
              &copy; 2024 AarogyaMitra. All rights reserved. Advanced Healthcare
              Solutions for Modern India.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
