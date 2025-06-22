import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ArrowLeft,
  MessageCircle,
  Phone,
  Video,
  HelpCircle,
  Users,
  Shield,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Help = () => {
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
              <h1 className="text-lg font-bold text-indigo">AarogyaMitra</h1>
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
            <h1 className="text-4xl font-bold text-indigo mb-4">Help Center</h1>
            <p className="text-xl text-indigo/70 max-w-2xl mx-auto">
              Find answers to common questions and learn how to make the most of
              AarogyaMitra.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Link to="/phone-verification">
              <Card className="border-gray-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-herbal-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-6 h-6 text-herbal" />
                  </div>
                  <CardTitle className="text-indigo">Start Chat</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-indigo/80">
                    Begin a free consultation with our AI health assistant
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/contact">
              <Card className="border-gray-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-coral-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-6 h-6 text-coral" />
                  </div>
                  <CardTitle className="text-indigo">Contact Support</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-indigo/80">
                    Get help from our support team via phone or email
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/doctors">
              <Card className="border-gray-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gender-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Video className="w-6 h-6 text-gender-blue" />
                  </div>
                  <CardTitle className="text-indigo">
                    Video Consultation
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-indigo/80">
                    Connect with qualified doctors for video consultations
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-indigo mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <Card className="border-gray-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-indigo flex items-center">
                    <HelpCircle className="w-5 h-5 mr-2 text-herbal" />
                    Getting Started
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-indigo mb-2">
                      How do I start using AarogyaMitra?
                    </h4>
                    <p className="text-indigo/80">
                      Simply click "Start Free Consultation" and verify your
                      phone number. You can then chat with our AI assistant or
                      connect with doctors.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo mb-2">
                      Is the service really free?
                    </h4>
                    <p className="text-indigo/80">
                      Yes! Basic AI consultations, symptom checking, and health
                      guidance are completely free. Premium services like doctor
                      consultations have affordable fees.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo mb-2">
                      What languages are supported?
                    </h4>
                    <p className="text-indigo/80">
                      We support Hindi, English, Bengali, Tamil, Telugu, and
                      more Indian languages. Our voice assistant can understand
                      and respond in your preferred language.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-indigo flex items-center">
                    <Users className="w-5 h-5 mr-2 text-coral" />
                    Using the Platform
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-indigo mb-2">
                      How does the AI health assistant work?
                    </h4>
                    <p className="text-indigo/80">
                      Our AI analyzes your symptoms and health concerns to
                      provide preliminary guidance. It can help with common
                      health questions and determine if you need to see a
                      doctor.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo mb-2">
                      Can I speak instead of typing?
                    </h4>
                    <p className="text-indigo/80">
                      Yes! Use the voice assistant feature to speak your health
                      concerns. Make sure to allow microphone access when
                      prompted.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo mb-2">
                      How do I connect with a real doctor?
                    </h4>
                    <p className="text-indigo/80">
                      From the chat interface, you can request to speak with a
                      doctor. Choose from video call, voice call, or chat
                      consultation based on your preference.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-indigo flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-gender-blue" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-indigo mb-2">
                      Is my health information secure?
                    </h4>
                    <p className="text-indigo/80">
                      Absolutely! We follow strict medical confidentiality
                      standards and use encryption to protect your data. Your
                      information is never shared without your consent.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo mb-2">
                      Who can access my consultation history?
                    </h4>
                    <p className="text-indigo/80">
                      Only you and the medical professionals you consult with
                      can access your health information. Our staff follows
                      strict privacy protocols.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-indigo flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gender-pink" />
                    Emergency & Urgent Care
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-indigo mb-2">
                      What should I do in a medical emergency?
                    </h4>
                    <p className="text-indigo/80">
                      For life-threatening emergencies, call 108 immediately or
                      visit your nearest hospital. AarogyaMitra is for
                      consultation and guidance, not emergency treatment.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo mb-2">
                      Is AarogyaMitra available 24/7?
                    </h4>
                    <p className="text-indigo/80">
                      Yes! Our AI assistant is available 24/7. Doctor
                      consultations are also available around the clock, though
                      response times may vary during peak hours.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Still Need Help */}
          <Card className="border-gray-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-indigo text-center">
                Still Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-indigo/80">
                Can't find what you're looking for? Our support team is here to
                help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button className="bg-herbal hover:bg-herbal-600 text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </Link>
                <Link to="/phone-verification">
                  <Button
                    variant="outline"
                    className="border-coral text-coral hover:bg-coral-50"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Free Chat
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Notice */}
          <div className="mt-8 p-4 bg-soft-red/10 border border-soft-red/20 rounded-lg">
            <div className="text-center">
              <Badge className="bg-soft-red text-white mb-2">EMERGENCY</Badge>
              <p className="text-indigo/80 text-sm">
                For medical emergencies, call <strong>108</strong> immediately.
                AarogyaMitra provides consultation and guidance but is not a
                substitute for emergency medical care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
