import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ArrowLeft, Users, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-sand">
      {/* Header */}
      <header className="border-b border-gray-border bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-herbal rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-indigo">MediNova</h1>
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
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-indigo mb-4">
              About MediNova
            </h1>
            <p className="text-xl text-indigo/70 max-w-2xl mx-auto">
              Your trusted AI-powered health companion, connecting you with
              quality healthcare in your preferred language.
            </p>
          </div>

          {/* Mission */}
          <Card className="mb-8 border-gray-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-indigo flex items-center">
                <Heart className="w-5 h-5 mr-2 text-herbal" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-indigo/80 leading-relaxed">
                MediNova is dedicated to making quality healthcare
                accessible to everyone, regardless of language barriers or
                location. We leverage AI technology and connect you with
                qualified medical professionals to provide comprehensive health
                assistance when you need it most.
              </p>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-gray-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-indigo flex items-center text-lg">
                  <Users className="w-5 h-5 mr-2 text-coral" />
                  Multi-language Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-indigo/80">
                  Communicate in your preferred language - Hindi, English,
                  Bengali, Tamil, Telugu, and more.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-indigo flex items-center text-lg">
                  <Shield className="w-5 h-5 mr-2 text-gender-blue" />
                  AI-Powered Assistance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-indigo/80">
                  Advanced AI provides initial health guidance and symptom
                  checking before connecting you with doctors.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-indigo flex items-center text-lg">
                  <Clock className="w-5 h-5 mr-2 text-gender-pink" />
                  24/7 Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-indigo/80">
                  Round-the-clock access to health assistance and emergency
                  support whenever you need it.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Services */}
          <Card className="mb-8 border-gray-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-indigo">Our Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    Free Services
                  </h4>
                  <ul className="space-y-1 text-indigo/80">
                    <li>• Voice-powered health assistance</li>
                    <li>• Basic symptom checking</li>
                    <li>• Health tips and guidance</li>
                    <li>• Emergency number assistance</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    Premium Services
                  </h4>
                  <ul className="space-y-1 text-indigo/80">
                    <li>• Video consultations with doctors</li>
                    <li>• Voice calls with specialists</li>
                    <li>• Detailed health assessments</li>
                    <li>• Prescription management</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Link to="/">
              <Button
                size="lg"
                className="bg-herbal hover:bg-herbal-600 text-white"
              >
                Get Started with MediNova
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
