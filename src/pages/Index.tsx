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
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-sand">
      {/* Header */}
      <header className="border-b border-gray-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-herbal rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-indigo">AarogyaMitra</h1>
                <p className="text-xs text-indigo/70">Your Health Companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-indigo hover:text-herbal"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  size="sm"
                  className="bg-herbal hover:bg-herbal-600 text-white"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-herbal-50 text-herbal border-herbal-100">
              🌿 Bringing Healthcare to Rural India
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-indigo mb-6 leading-tight">
              Your Trusted
              <span className="text-herbal block">AI Health Assistant</span>
            </h1>
            <p className="text-lg md:text-xl text-indigo/80 mb-8 leading-relaxed">
              Get instant health advice, connect with doctors, and manage your
              wellbeing with our AI-powered chatbot designed specifically for
              rural communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/login">
                <Button
                  size="lg"
                  className="bg-herbal hover:bg-herbal-600 text-white px-8 py-6 text-lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Free Consultation
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-herbal text-herbal hover:bg-herbal-50 px-8 py-6 text-lg"
                >
                  <Stethoscope className="w-5 h-5 mr-2" />
                  Check Symptoms
                </Button>
              </Link>
            </div>

            {/* Free Services Notice */}
            <div className="mt-8 p-4 bg-herbal-50 border border-herbal-100 rounded-lg max-w-2xl mx-auto">
              <div className="text-center">
                <Badge className="bg-herbal text-white mb-2">
                  FREE SERVICES
                </Badge>
                <p className="text-sm text-indigo">
                  ✅ Basic health chat consultation • ✅ Mental health support •
                  ✅ Emergency guidance
                </p>
                <p className="text-xs text-indigo/70 mt-1">
                  No registration fee • Available 24/7 • Rural India focus
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo mb-4">
              How AarogyaMitra Helps You
            </h2>
            <p className="text-lg text-indigo/70 max-w-2xl mx-auto">
              Our AI-powered platform makes healthcare accessible, affordable,
              and available whenever you need it most.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-gray-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-herbal-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-herbal" />
                </div>
                <CardTitle className="text-indigo">AI Health Chatbot</CardTitle>
                <CardDescription>
                  Get instant answers to your health questions with our
                  intelligent AI assistant available 24/7.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-gray-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-coral-100 rounded-lg flex items-center justify-center mb-4">
                  <Stethoscope className="w-6 h-6 text-coral" />
                </div>
                <CardTitle className="text-indigo">Symptom Checker</CardTitle>
                <CardDescription>
                  Describe your symptoms and get preliminary health assessments
                  with personalized recommendations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-gray-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-gender-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-gender-blue" />
                </div>
                <CardTitle className="text-indigo">Doctor Connect</CardTitle>
                <CardDescription>
                  Connect with qualified doctors for video consultations and
                  professional medical advice.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-gray-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-gender-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-gender-pink" />
                </div>
                <CardTitle className="text-indigo">Voice Support</CardTitle>
                <CardDescription>
                  Speak your health concerns in your local language with our
                  voice-enabled AI assistant.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-gray-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-herbal-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-herbal" />
                </div>
                <CardTitle className="text-indigo">Privacy First</CardTitle>
                <CardDescription>
                  Your health data is completely secure and private. We follow
                  strict medical confidentiality standards.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-gray-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-coral-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-coral" />
                </div>
                <CardTitle className="text-indigo">Rural Focused</CardTitle>
                <CardDescription>
                  Specially designed for rural communities with offline
                  capabilities and local language support.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-herbal text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-herbal-100">Users Helped</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-herbal-100">Doctors Connected</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-herbal-100">Available Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15</div>
              <div className="text-herbal-100">Local Languages</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo mb-4">
              What Our Users Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                location: "Rajasthan",
                text: "AarogyaMitra helped me understand my health concerns when no doctor was available in my village.",
                rating: 5,
              },
              {
                name: "Rakesh Kumar",
                location: "Bihar",
                text: "The voice feature is amazing! I can ask questions in Hindi and get helpful health advice.",
                rating: 5,
              },
              {
                name: "Sunita Devi",
                location: "Uttar Pradesh",
                text: "Connected with a real doctor through the app. It saved me a 4-hour journey to the city.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-gray-border">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-coral text-coral" />
                    ))}
                  </div>
                  <p className="text-indigo/80 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-indigo">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-indigo/60">
                      {testimonial.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-herbal to-herbal-600">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-xl mb-8 text-herbal-100">
              Join thousands of users who trust AarogyaMitra for their
              healthcare needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-herbal hover:bg-sand px-8 py-6 text-lg"
                >
                  Get Started Free
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/chat">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
                >
                  Try Demo Chat
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-herbal rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">AarogyaMitra</span>
              </div>
              <p className="text-indigo-200 mb-4">
                Making healthcare accessible to every corner of rural India
                through AI-powered technology and compassionate care.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-indigo-200">
                <li>
                  <Link to="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-white">
                    Pricing Plans
                  </Link>
                </li>
                <li>
                  <Link to="/doctors" className="hover:text-white">
                    Our Doctors
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-indigo-200">
                <li>
                  <Link to="/help" className="hover:text-white">
                    Help Center
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
                    Emergency
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-indigo-700 mt-8 pt-8 text-center text-indigo-200">
            <p>
              &copy; 2024 AarogyaMitra. All rights reserved. Made with ❤️ for
              Rural India.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
