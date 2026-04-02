import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ArrowLeft,
  CheckCircle,
  Video,
  Phone,
  MessageCircle,
  Clock,
  Shield,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Pricing = () => {
  const { user } = useAuth();

  const plans = [
    {
      title: "Basic Health Support",
      subtitle: "Essential healthcare for everyone",
      price: "FREE",
      description: "Get basic health guidance and support at no cost",
      features: [
        "AI Health Chatbot",
        "Basic symptom checker",
        "General health tips",
        "Emergency guidance",
        "Mental health support",
        "Medicine reminders",
      ],
      consultations: {
        chat: "Unlimited",
        voice: "30 min/month",
        video: "Not included",
      },
      buttonText: "Start Free",
      buttonLink: "/signup",
      popular: false,
      color: "herbal",
    },
    {
      title: "Premium Care",
      subtitle: "Complete healthcare solution",
      price: "₹499",
      priceSubtext: "/month",
      description: "Full access to all doctors and consultation types",
      features: [
        "All Basic features",
        "Unlimited consultations",
        "Video calls with doctors",
        "Digital prescriptions",
        "Health records storage",
        "24/7 doctor availability",
        "Specialist consultations",
        "Family health plans",
      ],
      consultations: {
        chat: "Unlimited",
        voice: "Unlimited",
        video: "Unlimited",
      },
      buttonText: "Choose Premium",
      buttonLink: "/signup",
      popular: true,
      color: "gender-blue",
    },
    {
      title: "Pay Per Consultation",
      subtitle: "Flexible healthcare payments",
      price: "₹149+",
      priceSubtext: "/consultation",
      description: "Pay only when you need professional medical advice",
      features: [
        "No monthly commitment",
        "Choose your doctor",
        "All consultation types",
        "Digital prescriptions",
        "Follow-up included",
        "Secure payments",
      ],
      consultations: {
        chat: "₹149 each",
        voice: "₹199 each",
        video: "₹299 each",
      },
      buttonText: "Find Doctors",
      buttonLink: "/doctors",
      popular: false,
      color: "coral",
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
                  Healthcare Plans
                </h1>
                <p className="text-xs text-indigo/70">
                  Choose the right plan for you
                </p>
              </div>
            </div>
            {user && (
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-herbal text-herbal hover:bg-herbal-50"
                >
                  Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Badge className="bg-herbal-50 text-herbal border-herbal-100 mb-4">
            🌿 Affordable Healthcare for Rural India
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-indigo mb-4">
            Healthcare That Fits Your Budget
          </h1>
          <p className="text-lg text-indigo/70 max-w-2xl mx-auto">
            From free basic support to premium care, we have healthcare
            solutions designed specifically for rural communities.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`border-gray-border relative ${
                plan.popular ? "ring-2 ring-gender-blue scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gender-blue text-white">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-indigo">{plan.title}</CardTitle>
                <p className="text-sm text-indigo/60">{plan.subtitle}</p>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-indigo">
                    {plan.price}
                  </div>
                  {plan.priceSubtext && (
                    <div className="text-sm text-indigo/60">
                      {plan.priceSubtext}
                    </div>
                  )}
                </div>
                <p className="text-sm text-indigo/70 mt-2">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Consultation Types */}
                <div>
                  <h4 className="font-medium text-indigo mb-3">
                    Consultation Access:
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 text-coral mr-2" />
                        <span className="text-sm">Chat</span>
                      </div>
                      <span className="text-sm font-medium">
                        {plan.consultations.chat}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-gender-pink mr-2" />
                        <span className="text-sm">Voice Call</span>
                      </div>
                      <span className="text-sm font-medium">
                        {plan.consultations.voice}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Video className="w-4 h-4 text-gender-blue mr-2" />
                        <span className="text-sm">Video Call</span>
                      </div>
                      <span className="text-sm font-medium">
                        {plan.consultations.video}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-medium text-indigo mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-herbal mr-2 flex-shrink-0" />
                        <span className="text-indigo/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <Link to={plan.buttonLink} className="block">
                  <Button
                    className={`w-full ${
                      plan.color === "herbal"
                        ? "bg-herbal hover:bg-herbal-600"
                        : plan.color === "gender-blue"
                          ? "bg-gender-blue hover:bg-gender-blue-600"
                          : "bg-coral hover:bg-coral-600"
                    } text-white`}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="border-gray-border text-center">
            <CardContent className="pt-6">
              <Shield className="w-12 h-12 text-herbal mx-auto mb-4" />
              <h3 className="font-semibold text-indigo mb-2">
                Secure & Private
              </h3>
              <p className="text-sm text-indigo/70">
                All consultations are encrypted and your health data is
                completely secure.
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-border text-center">
            <CardContent className="pt-6">
              <Clock className="w-12 h-12 text-coral mx-auto mb-4" />
              <h3 className="font-semibold text-indigo mb-2">24/7 Available</h3>
              <p className="text-sm text-indigo/70">
                Healthcare support available round the clock, whenever you need
                it most.
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-border text-center">
            <CardContent className="pt-6">
              <Users className="w-12 h-12 text-gender-blue mx-auto mb-4" />
              <h3 className="font-semibold text-indigo mb-2">Rural Focused</h3>
              <p className="text-sm text-indigo/70">
                Designed specifically for rural communities with local language
                support.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-indigo text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <Card className="border-gray-border">
              <CardContent className="pt-6">
                <h4 className="font-medium text-indigo mb-2">
                  Is the free plan really free?
                </h4>
                <p className="text-sm text-indigo/70">
                  Yes! Basic health support including AI chat, symptom checking,
                  and emergency guidance is completely free. No hidden charges.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-border">
              <CardContent className="pt-6">
                <h4 className="font-medium text-indigo mb-2">
                  Can I change plans anytime?
                </h4>
                <p className="text-sm text-indigo/70">
                  Absolutely! You can upgrade or downgrade your plan at any
                  time. Premium members can also use pay-per-consultation for
                  specialists.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-border">
              <CardContent className="pt-6">
                <h4 className="font-medium text-indigo mb-2">
                  What payment methods do you accept?
                </h4>
                <p className="text-sm text-indigo/70">
                  We accept UPI, digital wallets (Paytm, Google Pay), and
                  credit/debit cards. All payments are secure and encrypted.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="border-herbal-200 bg-herbal-50 max-w-2xl mx-auto">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-xl font-bold text-indigo mb-4">
                Ready to Start Your Health Journey?
              </h3>
              <p className="text-indigo/70 mb-6">
                Join thousands of users who trust MediNova for their
                healthcare needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button className="bg-herbal hover:bg-herbal-600 text-white">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/doctors">
                  <Button
                    variant="outline"
                    className="border-herbal text-herbal hover:bg-herbal/10"
                  >
                    Find a Doctor
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
