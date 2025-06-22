import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ArrowLeft, Shield, Lock, Eye, Database } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
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
            <h1 className="text-4xl font-bold text-indigo mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-indigo/70 max-w-2xl mx-auto">
              Your privacy and data security are our top priorities. Learn how
              we protect and handle your information.
            </p>
            <p className="text-sm text-indigo/60 mt-2">
              Last updated: December 2024
            </p>
          </div>

          <div className="space-y-8">
            {/* Data Collection */}
            <Card className="border-gray-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-indigo flex items-center">
                  <Database className="w-5 h-5 mr-2 text-herbal" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    Personal Information
                  </h4>
                  <ul className="text-indigo/80 space-y-1 ml-4">
                    <li>• Name, phone number, and age</li>
                    <li>• Health symptoms and medical history you share</li>
                    <li>
                      • Location data (with your permission) for emergency
                      services
                    </li>
                    <li>• Communication preferences and language settings</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    Technical Information
                  </h4>
                  <ul className="text-indigo/80 space-y-1 ml-4">
                    <li>• Device information and browser type</li>
                    <li>• Usage patterns and app interactions</li>
                    <li>• Voice recordings (only when using voice features)</li>
                    <li>
                      • Video data during consultations (encrypted and secure)
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Data Usage */}
            <Card className="border-gray-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-indigo flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-coral" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    Healthcare Services
                  </h4>
                  <ul className="text-indigo/80 space-y-1 ml-4">
                    <li>
                      • Provide AI-powered health assistance and symptom
                      checking
                    </li>
                    <li>• Connect you with qualified medical professionals</li>
                    <li>
                      • Maintain consultation history for continuity of care
                    </li>
                    <li>• Send health reminders and follow-up notifications</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    Service Improvement
                  </h4>
                  <ul className="text-indigo/80 space-y-1 ml-4">
                    <li>• Improve AI responses and diagnostic accuracy</li>
                    <li>• Enhance user experience and platform features</li>
                    <li>• Ensure platform security and prevent misuse</li>
                    <li>• Conduct medical research (anonymized data only)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Data Protection */}
            <Card className="border-gray-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-indigo flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-gender-blue" />
                  How We Protect Your Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    Security Measures
                  </h4>
                  <ul className="text-indigo/80 space-y-1 ml-4">
                    <li>• End-to-end encryption for all consultations</li>
                    <li>• Secure servers with 24/7 monitoring</li>
                    <li>• Regular security audits and updates</li>
                    <li>
                      • Limited access to authorized medical personnel only
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    Data Retention
                  </h4>
                  <ul className="text-indigo/80 space-y-1 ml-4">
                    <li>
                      • Medical records: 7 years (as per medical guidelines)
                    </li>
                    <li>• Chat history: 3 years for service improvement</li>
                    <li>• Voice recordings: Deleted after 30 days</li>
                    <li>
                      • Video calls: Not recorded unless explicitly requested
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Data Sharing */}
            <Card className="border-gray-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-indigo flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-gender-pink" />
                  Data Sharing and Disclosure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    We NEVER Share Your Data Except:
                  </h4>
                  <ul className="text-indigo/80 space-y-1 ml-4">
                    <li>
                      • With your consulting doctor (with your explicit consent)
                    </li>
                    <li>
                      • For emergency medical services (when your life is at
                      risk)
                    </li>
                    <li>• When required by law or court order</li>
                    <li>
                      • With your written permission for research (anonymized)
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    Third-Party Services
                  </h4>
                  <p className="text-indigo/80">
                    We use secure third-party services for payment processing
                    and video calling. These services are HIPAA-compliant and
                    follow strict medical privacy standards.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="border-gray-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-indigo">
                  Your Privacy Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-indigo mb-2">
                      You Have the Right To:
                    </h4>
                    <ul className="text-indigo/80 space-y-1 ml-4">
                      <li>• Access your personal data</li>
                      <li>• Correct inaccurate information</li>
                      <li>• Delete your account and data</li>
                      <li>• Export your medical records</li>
                      <li>• Opt-out of non-essential communications</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo mb-2">
                      How to Exercise Your Rights:
                    </h4>
                    <ul className="text-indigo/80 space-y-1 ml-4">
                      <li>• Email: privacy@aarogyamitra.com</li>
                      <li>• Phone: +91-XXXX-XXXXXX</li>
                      <li>• Settings page in your account</li>
                      <li>• Written request to our office</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="border-gray-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-indigo">
                  Questions About Privacy?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-indigo/80">
                  If you have any questions about this Privacy Policy or how we
                  handle your data, please contact us.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button className="bg-herbal hover:bg-herbal-600 text-white">
                      Contact Privacy Team
                    </Button>
                  </Link>
                  <Link to="/help">
                    <Button
                      variant="outline"
                      className="border-coral text-coral hover:bg-coral-50"
                    >
                      Visit Help Center
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Last Updated */}
          <div className="mt-8 p-4 bg-herbal-50 border border-herbal-100 rounded-lg text-center">
            <p className="text-sm text-indigo/80">
              This privacy policy was last updated on December 2024. We may
              update this policy from time to time. We will notify you of any
              significant changes via email or app notification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
