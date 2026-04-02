import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ArrowLeft,
  MessageCircle,
  Users,
  Shield,
  Activity,
  Phone,
  Video,
  Calendar,
  Stethoscope,
  HeartHandshake,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-blue-900">MediNova</h1>
            </div>
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              Medical Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare services designed to meet all your
              medical needs with world-class care and advanced technology.
            </p>
          </div>

          {/* Main Services Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-900 text-xl">
                  AI Health Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  24/7 AI-powered health guidance in multiple Indian languages
                  with instant symptom analysis and medical advice.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>• Intelligent symptom checker</li>
                  <li>
                    • Multi-language support (Hindi, English, Bengali, Tamil,
                    Telugu)
                  </li>
                  <li>• Emergency situation detection</li>
                  <li>• Medication reminders and guidance</li>
                  <li>• Health tips and preventive care advice</li>
                </ul>
                <Link to="/chat">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Start AI Chat
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-blue-900 text-xl">
                  Doctor Consultations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Connect with qualified specialists through video, voice, or
                  chat consultations from the comfort of your home.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>• Video consultations with specialists</li>
                  <li>• Voice call consultations</li>
                  <li>• Chat-based medical advice</li>
                  <li>• Digital prescription services</li>
                  <li>• Follow-up appointment scheduling</li>
                </ul>
                <Link to="/doctors">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Find Doctor
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-blue-900 text-xl">
                  Health Checkups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Comprehensive health screening packages designed for early
                  detection and preventive healthcare.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>• Full body health checkups</li>
                  <li>• Specialized screening packages</li>
                  <li>• Preventive care programs</li>
                  <li>• Digital health reports</li>
                  <li>• Health monitoring and tracking</li>
                </ul>
                <Link to="/health-checkup">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Book Checkup
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Additional Services */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
              Specialized Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  Emergency Services
                </h3>
                <p className="text-sm text-gray-600">
                  24/7 emergency medical assistance and rapid response
                </p>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Video className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  Telemedicine
                </h3>
                <p className="text-sm text-gray-600">
                  Remote healthcare delivery through digital platforms
                </p>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  Health Monitoring
                </h3>
                <p className="text-sm text-gray-600">
                  Continuous health tracking and wellness programs
                </p>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  Appointment Management
                </h3>
                <p className="text-sm text-gray-600">
                  Easy scheduling and management of medical appointments
                </p>
              </Card>
            </div>
          </div>

          {/* Service Features */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
              Why Choose Our Services
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  Expert Care
                </h3>
                <p className="text-gray-600">
                  Access to qualified medical professionals and specialists with
                  years of experience
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  Accessible Healthcare
                </h3>
                <p className="text-gray-600">
                  Healthcare services available in multiple languages and
                  accessible to rural communities
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeartHandshake className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  Compassionate Care
                </h3>
                <p className="text-gray-600">
                  Patient-centered approach with personalized treatment plans
                  and continuous support
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Ready to Experience Better Healthcare?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get started with our comprehensive healthcare services today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/phone-verification">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Book Appointment
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
