import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ArrowLeft,
  Phone,
  AlertTriangle,
  MapPin,
  Clock,
  Ambulance,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";

const Emergency = () => {
  const makeEmergencyCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

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
          {/* Emergency Alert */}
          <div className="bg-soft-red text-white p-6 rounded-lg mb-8 text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-bold mb-2">🚨 EMERGENCY SERVICES</h1>
            <p className="text-xl">
              For life-threatening emergencies, call immediately
            </p>
          </div>

          {/* Emergency Numbers */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="border-soft-red border-2 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-soft-red rounded-full flex items-center justify-center mx-auto mb-3">
                  <Ambulance className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-soft-red">
                  National Emergency
                </CardTitle>
                <Badge className="bg-soft-red text-white">PRIMARY</Badge>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-4xl font-bold text-soft-red">108</div>
                <p className="text-indigo/80">
                  All medical emergencies, accidents, disasters
                </p>
                <Button
                  onClick={() => makeEmergencyCall("108")}
                  className="w-full bg-soft-red hover:bg-soft-red-600 text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call 108 Now
                </Button>
              </CardContent>
            </Card>

            <Card className="border-coral border-2 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-coral rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-coral">Medical Emergency</CardTitle>
                <Badge className="bg-coral text-white">MEDICAL</Badge>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-4xl font-bold text-coral">102</div>
                <p className="text-indigo/80">
                  Medical emergencies, ambulance services
                </p>
                <Button
                  onClick={() => makeEmergencyCall("102")}
                  className="w-full bg-coral hover:bg-coral-600 text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call 102 Now
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gender-blue border-2 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gender-blue rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-gender-blue">Police</CardTitle>
                <Badge className="bg-gender-blue text-white">SECURITY</Badge>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-4xl font-bold text-gender-blue">100</div>
                <p className="text-indigo/80">
                  Crime, violence, security emergencies
                </p>
                <Button
                  onClick={() => makeEmergencyCall("100")}
                  className="w-full bg-gender-blue hover:bg-gender-blue-600 text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call 100 Now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* When to Call Emergency */}
          <Card className="border-gray-border shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-indigo flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-soft-red" />
                When to Call Emergency Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-soft-red mb-3">
                    🚨 IMMEDIATE EMERGENCY (Call 108):
                  </h4>
                  <ul className="text-indigo/80 space-y-1">
                    <li>• Severe chest pain or heart attack</li>
                    <li>• Difficulty breathing or choking</li>
                    <li>• Unconsciousness or severe head injury</li>
                    <li>• Severe bleeding or major trauma</li>
                    <li>• Severe burns or electrical shock</li>
                    <li>• Suspected stroke or paralysis</li>
                    <li>• Severe allergic reaction</li>
                    <li>• Poisoning or overdose</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-coral mb-3">
                    ⚠️ URGENT (Call 102 or MediNova):
                  </h4>
                  <ul className="text-indigo/80 space-y-1">
                    <li>• High fever with severe symptoms</li>
                    <li>• Severe abdominal pain</li>
                    <li>• Persistent vomiting or diarrhea</li>
                    <li>• Severe headache with vision problems</li>
                    <li>• Difficulty urinating or blood in urine</li>
                    <li>• Severe mental health crisis</li>
                    <li>• Pregnancy complications</li>
                    <li>• Severe pain not improving</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Preparation */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card className="border-gray-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-indigo flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-herbal" />
                  Emergency Preparation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    Keep Ready:
                  </h4>
                  <ul className="text-indigo/80 space-y-1 ml-4">
                    <li>• List of current medications</li>
                    <li>• Emergency contact numbers</li>
                    <li>• Medical history and allergies</li>
                    <li>• Insurance information</li>
                    <li>• Nearest hospital address</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    Important Information to Share:
                  </h4>
                  <ul className="text-indigo/80 space-y-1 ml-4">
                    <li>• Your exact location</li>
                    <li>• Nature of emergency</li>
                    <li>• Patient's age and condition</li>
                    <li>• Any medications taken</li>
                    <li>• When symptoms started</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-indigo flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gender-pink" />
                  What to Expect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    When You Call 108:
                  </h4>
                  <ul className="text-indigo/80 space-y-1 ml-4">
                    <li>• Stay calm and speak clearly</li>
                    <li>• Answer all questions asked</li>
                    <li>• Don't hang up until told to do so</li>
                    <li>• Ambulance typically arrives in 10-20 minutes</li>
                    <li>• Follow dispatcher's instructions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo mb-2">
                    While Waiting:
                  </h4>
                  <ul className="text-indigo/80 space-y-1 ml-4">
                    <li>• Keep patient calm and comfortable</li>
                    <li>• Don't move injured person unless necessary</li>
                    <li>• Apply pressure to bleeding wounds</li>
                    <li>• Clear airway if safe to do so</li>
                    <li>• Gather patient's medications</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Non-Emergency Options */}
          <Card className="border-gray-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-indigo">
                Non-Emergency Medical Help
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-herbal-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-herbal" />
                  </div>
                  <h4 className="font-semibold text-indigo mb-2">
                    NovaBot AI
                  </h4>
                  <p className="text-indigo/80 text-sm mb-3">
                    For non-urgent health questions and symptom checking
                  </p>
                  <Link to="/phone-verification">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-herbal text-herbal hover:bg-herbal-50"
                    >
                      Start Chat
                    </Button>
                  </Link>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-coral-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-6 h-6 text-coral" />
                  </div>
                  <h4 className="font-semibold text-indigo mb-2">
                    Doctor Consultation
                  </h4>
                  <p className="text-indigo/80 text-sm mb-3">
                    Video or voice consultation with qualified doctors
                  </p>
                  <Link to="/doctors">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-coral text-coral hover:bg-coral-50"
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gender-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-gender-blue" />
                  </div>
                  <h4 className="font-semibold text-indigo mb-2">
                    Nearest Hospital
                  </h4>
                  <p className="text-indigo/80 text-sm mb-3">
                    Find nearby hospitals and clinics
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(
                        "https://maps.google.com/maps?q=hospital+near+me",
                        "_blank",
                      )
                    }
                    className="border-gender-blue text-gender-blue hover:bg-gender-blue-50"
                  >
                    Find Hospitals
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Warning */}
          <div className="mt-8 p-4 bg-soft-red/10 border border-soft-red/20 rounded-lg text-center">
            <Badge className="bg-soft-red text-white mb-2">
              IMPORTANT REMINDER
            </Badge>
            <p className="text-indigo/80">
              <strong>
                MediNova is NOT an emergency service. For immediate
                life-threatening emergencies, always call 108 or visit your
                nearest hospital.
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
