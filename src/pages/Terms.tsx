import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Heart,
  ArrowLeft,
  FileText,
  AlertTriangle,
  Users,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
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
              Terms of Service
            </h1>
            <p className="text-xl text-indigo/70 max-w-2xl mx-auto">
              Please read these terms carefully before using AarogyaMitra
              services.
            </p>
            <p className="text-sm text-indigo/60 mt-2">
              Last updated: December 2024
            </p>
          </div>

          <div className="space-y-8">
            {/* Service Description */}
            <Card className="border-gray-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-indigo flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-herbal" />
                  Service Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    What AarogyaMitra Provides:
                  </h4>
                  <ul className="text-indigo/80 space-y-1 ml-4">
                    <li>• AI-powered health assistance and symptom checking</li>
                    <li>• Connection with qualified medical professionals</li>
                    <li>• Multi-language health support</li>
                    <li>• Emergency guidance and support</li>
                    <li>• Health education and wellness information</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    What We Are NOT:
                  </h4>
                  <ul className="text-indigo/80 space-y-1 ml-4">
                    <li>• Emergency medical services</li>
                    <li>• Replacement for in-person medical care</li>
                    <li>• Diagnostic medical device</li>
                    <li>• Prescription medication provider</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* User Responsibilities */}
            <Card className="border-gray-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-indigo flex items-center">
                  <Users className="w-5 h-5 mr-2 text-coral" />
                  User Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    You Agree To:
                  </h4>
                  <ul className="text-indigo/80 space-y-1 ml-4">
                    <li>• Provide accurate and truthful health information</li>
                    <li>• Use the service responsibly and lawfully</li>
                    <li>• Respect medical professionals and other users</li>
                    <li>• Keep your account credentials secure</li>
                    <li>• Follow all applicable laws and regulations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    You Will NOT:
                  </h4>
                  <ul className="text-indigo/80 space-y-1 ml-4">
                    <li>• Share false or misleading health information</li>
                    <li>• Use the service for non-medical purposes</li>
                    <li>• Attempt to hack or misuse the platform</li>
                    <li>• Share your account with others</li>
                    <li>• Use offensive language or inappropriate behavior</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Medical Disclaimer */}
            <Card className="border-gray-border shadow-lg border-l-4 border-l-soft-red">
              <CardHeader>
                <CardTitle className="text-indigo flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-soft-red" />
                  Important Medical Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-soft-red/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-soft-red mb-2">
                    ⚠️ Critical Information:
                  </h4>
                  <ul className="text-indigo/80 space-y-2">
                    <li>
                      • <strong>Emergency:</strong> For life-threatening
                      emergencies, call 108 immediately
                    </li>
                    <li>
                      • <strong>Not a Substitute:</strong> AarogyaMitra is not a
                      replacement for professional medical care
                    </li>
                    <li>
                      • <strong>AI Limitations:</strong> AI responses are for
                      guidance only, not medical diagnosis
                    </li>
                    <li>
                      • <strong>Always Consult:</strong> Consult qualified
                      doctors for medical decisions
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    Liability Limitations:
                  </h4>
                  <p className="text-indigo/80">
                    AarogyaMitra provides health information and connects you
                    with medical professionals. We are not liable for medical
                    outcomes, misdiagnosis, or delayed treatment. Users are
                    responsible for seeking appropriate medical care for their
                    conditions.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Doctor Services */}
            <Card className="border-gray-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-indigo flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-gender-blue" />
                  Doctor Consultation Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    Doctor Qualifications:
                  </h4>
                  <ul className="text-indigo/80 space-y-1 ml-4">
                    <li>• All doctors are licensed medical professionals</li>
                    <li>• Verified credentials and experience</li>
                    <li>• Regular training on telemedicine best practices</li>
                    <li>• Adherence to medical ethics and standards</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    Consultation Terms:
                  </h4>
                  <ul className="text-indigo/80 space-y-1 ml-4">
                    <li>• Consultations are for guidance and advice</li>
                    <li>
                      • Physical examination may be required for diagnosis
                    </li>
                    <li>• Prescription policies follow legal requirements</li>
                    <li>• Follow-up care is recommended when needed</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Payment and Billing */}
            <Card className="border-gray-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-indigo">
                  Payment and Billing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    Free Services:
                  </h4>
                  <ul className="text-indigo/80 space-y-1 ml-4">
                    <li>• AI health chat and symptom checking</li>
                    <li>• Basic health information and guidance</li>
                    <li>• Emergency support and contact information</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    Paid Services:
                  </h4>
                  <ul className="text-indigo/80 space-y-1 ml-4">
                    <li>• Video and voice consultations with doctors</li>
                    <li>• Detailed health assessments</li>
                    <li>• Prescription services (where legally permitted)</li>
                    <li>• Premium health monitoring features</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    Refund Policy:
                  </h4>
                  <p className="text-indigo/80">
                    Refunds are available within 24 hours of consultation if
                    service was not provided as promised. Medical advice cannot
                    be "returned" once provided.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Privacy and Data */}
            <Card className="border-gray-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-indigo">
                  Privacy and Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-indigo/80">
                    Your privacy is protected under our comprehensive Privacy
                    Policy. By using AarogyaMitra, you consent to the collection
                    and use of your health information as described in our
                    Privacy Policy.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    Key Privacy Points:
                  </h4>
                  <ul className="text-indigo/80 space-y-1 ml-4">
                    <li>• Your health data is encrypted and secure</li>
                    <li>• Information is shared only with your consent</li>
                    <li>• You can delete your account and data anytime</li>
                    <li>
                      • We follow strict medical confidentiality standards
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <Link to="/privacy">
                    <Button
                      variant="outline"
                      className="border-herbal text-herbal hover:bg-herbal-50"
                    >
                      Read Full Privacy Policy
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card className="border-gray-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-indigo">
                  Account Termination
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    You May Terminate:
                  </h4>
                  <ul className="text-indigo/80 space-y-1 ml-4">
                    <li>• Your account at any time through app settings</li>
                    <li>• Specific services while keeping your account</li>
                    <li>• Data sharing permissions with doctors</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    We May Terminate If:
                  </h4>
                  <ul className="text-indigo/80 space-y-1 ml-4">
                    <li>• Terms of service are violated</li>
                    <li>• False information is repeatedly provided</li>
                    <li>• Platform is misused or abused</li>
                    <li>• Legal requirements mandate termination</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="border-gray-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-indigo">
                  Questions About Terms?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-indigo/80">
                  If you have questions about these Terms of Service, please
                  contact our legal team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button className="bg-herbal hover:bg-herbal-600 text-white">
                      Contact Legal Team
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

          {/* Acceptance */}
          <div className="mt-8 p-4 bg-herbal-50 border border-herbal-100 rounded-lg text-center">
            <p className="text-sm text-indigo/80">
              By using AarogyaMitra, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Service. These
              terms were last updated in December 2024.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
