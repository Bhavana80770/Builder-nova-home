import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ArrowLeft, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
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
            <h1 className="text-4xl font-bold text-indigo mb-4">Contact Us</h1>
            <p className="text-xl text-indigo/70 max-w-2xl mx-auto">
              Need help or have questions? We're here to support you on your
              health journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="border-gray-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-indigo flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-herbal" />
                    Emergency Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-coral-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-coral" />
                      </div>
                      <div>
                        <p className="font-semibold text-indigo">
                          Emergency Helpline
                        </p>
                        <p className="text-indigo/80">108 (24/7 Available)</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gender-blue-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-gender-blue" />
                      </div>
                      <div>
                        <p className="font-semibold text-indigo">
                          Support Helpline
                        </p>
                        <p className="text-indigo/80">+91-XXXX-XXXXXX</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-indigo flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-coral" />
                    Email Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-indigo">
                        General Inquiries
                      </p>
                      <p className="text-indigo/80">support@aarogyamitra.com</p>
                    </div>
                    <div>
                      <p className="font-semibold text-indigo">
                        Medical Support
                      </p>
                      <p className="text-indigo/80">medical@aarogyamitra.com</p>
                    </div>
                    <div>
                      <p className="font-semibold text-indigo">
                        Technical Issues
                      </p>
                      <p className="text-indigo/80">tech@aarogyamitra.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-indigo flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gender-pink" />
                    Support Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-indigo">AI Assistant</span>
                      <span className="text-indigo/80">24/7 Available</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-indigo">Live Support</span>
                      <span className="text-indigo/80">6 AM - 10 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-indigo">Doctor Consultations</span>
                      <span className="text-indigo/80">24/7 Available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card className="border-gray-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-indigo">
                    Get Immediate Help
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link to="/phone-verification">
                    <Button className="w-full bg-herbal hover:bg-herbal-600 text-white">
                      <Heart className="w-4 h-4 mr-2" />
                      Start Free Consultation
                    </Button>
                  </Link>
                  <Link to="/doctors">
                    <Button
                      variant="outline"
                      className="w-full border-coral text-coral hover:bg-coral-50"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Connect with Doctor
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full border-soft-red text-soft-red hover:bg-soft-red-50"
                    onClick={() => (window.location.href = "tel:108")}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Emergency Call 108
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-gray-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-indigo">
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-indigo text-sm">
                        How do I start a consultation?
                      </p>
                      <p className="text-indigo/80 text-sm">
                        Click "Start Free Consultation" and verify your phone
                        number.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-indigo text-sm">
                        Is the service really free?
                      </p>
                      <p className="text-indigo/80 text-sm">
                        Yes! Basic consultations and AI chat are completely
                        free.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-indigo text-sm">
                        Can I speak in my local language?
                      </p>
                      <p className="text-indigo/80 text-sm">
                        Yes! We support Hindi, English, Bengali, Tamil, Telugu
                        and more.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-indigo flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-gender-blue" />
                    Office Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-indigo/80">
                    AarogyaMitra Healthcare Solutions
                    <br />
                    Rural Health Innovation Center
                    <br />
                    New Delhi, India
                    <br />
                    PIN: 110001
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Emergency Notice */}
          <div className="mt-8 p-4 bg-soft-red/10 border border-soft-red/20 rounded-lg">
            <div className="text-center">
              <h4 className="font-semibold text-soft-red mb-2">
                🚨 Medical Emergency?
              </h4>
              <p className="text-indigo/80 text-sm">
                For immediate medical emergencies, call <strong>108</strong> or
                visit your nearest hospital. AarogyaMitra is for consultation
                and guidance, not emergency treatment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
