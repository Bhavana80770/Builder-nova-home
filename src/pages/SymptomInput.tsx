import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowLeft, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";

const SymptomInput = () => {
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
                  Symptom Checker
                </h1>
                <p className="text-xs text-indigo/70">Describe your symptoms</p>
              </div>
            </div>
            <Link to="/chat">
              <Button
                variant="outline"
                size="sm"
                className="border-herbal text-herbal hover:bg-herbal-50"
              >
                Voice Chat
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Instructions */}
          <div className="text-center mb-8">
            <Badge className="bg-herbal-50 text-herbal border-herbal-100 mb-4">
              🩺 Symptom Assessment
            </Badge>
            <h2 className="text-2xl font-bold text-indigo mb-2">
              Tell us about your symptoms
            </h2>
            <p className="text-indigo/70">
              Add your symptoms to get a preliminary health assessment and
              recommendations
            </p>
          </div>

          {/* Symptom Input Form */}
          <Card className="border-gray-border shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-indigo">
                Describe Your Symptoms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Placeholder for symptom input interface */}
              <div className="text-center py-16 text-indigo/50">
                <Plus className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  Symptom Input Interface
                </h3>
                <p>
                  Interactive symptom selection and input form will be
                  implemented here
                </p>
                <div className="mt-6">
                  <Button className="bg-herbal hover:bg-herbal-600 text-white">
                    Add Symptoms
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Symptoms */}
          <Card className="border-gray-border shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-indigo">Common Symptoms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Fever",
                  "Headache",
                  "Cough",
                  "Fatigue",
                  "Nausea",
                  "Stomach Pain",
                  "Dizziness",
                  "Chest Pain",
                  "Shortness of Breath",
                  "Joint Pain",
                ].map((symptom) => (
                  <Button
                    key={symptom}
                    variant="outline"
                    size="sm"
                    className="justify-start border-gray-border hover:border-herbal hover:bg-herbal-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {symptom}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Link to="/chat">
              <Button
                variant="outline"
                className="w-full border-coral text-coral hover:bg-coral-50"
              >
                Voice Chat Instead
              </Button>
            </Link>
            <Link to="/doctors">
              <Button
                variant="outline"
                className="w-full border-herbal text-herbal hover:bg-herbal-50"
              >
                Consult Doctor
              </Button>
            </Link>
          </div>

          {/* Emergency Notice */}
          <div className="mt-8 p-4 bg-soft-red-50 border border-soft-red-200 rounded-lg text-center">
            <p className="text-sm text-indigo">
              <strong>Emergency?</strong> Call{" "}
              <a href="tel:108" className="text-soft-red font-semibold">
                108
              </a>{" "}
              for immediate medical assistance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomInput;
