import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Heart,
  User,
  Calendar,
  MapPin,
  Users,
  Stethoscope,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const ProfileDetails = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [profileData, setProfileData] = useState({
    // Step 1: Personal Info
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",

    // Step 2: Location & Contact
    address: "",
    city: "",
    state: "",
    pincode: "",
    emergencyContact: "",
    emergencyRelation: "",

    // Step 3: Health Info
    height: "",
    weight: "",
    allergies: "",
    currentMedications: "",
    chronicConditions: "",
    healthGoals: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Navigate to dashboard
    navigate("/dashboard?profile=completed");
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          profileData.firstName &&
          profileData.lastName &&
          profileData.dateOfBirth &&
          profileData.gender
        );
      case 2:
        return (
          profileData.address &&
          profileData.city &&
          profileData.state &&
          profileData.pincode
        );
      case 3:
        return true; // Health info is optional
      default:
        return false;
    }
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand via-coral-50 to-sand relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-16 w-32 h-32 bg-coral/10 rounded-full blur-xl animate-pulse delay-300"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-herbal/10 rounded-full blur-xl animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-1/4 w-36 h-36 bg-gender-blue/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-16 right-16 w-28 h-28 bg-gender-pink/10 rounded-full blur-xl animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen p-4">
        {/* Header */}
        <div className="text-center mb-8 pt-8 animate-fade-in">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-coral to-coral-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce-gentle">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="animate-slide-in-right delay-200">
              <h1 className="text-3xl font-bold text-indigo">
                Complete Your Profile
              </h1>
              <p className="text-sm text-indigo/70">
                Help us provide better healthcare
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-8 animate-scale-in delay-400">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-indigo/70">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-indigo/70">
                {Math.round((currentStep / totalSteps) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-coral to-coral-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-gray-border shadow-2xl backdrop-blur-sm bg-white/90 animate-scale-in delay-600">
            <CardHeader className="text-center">
              <CardTitle className="text-indigo">
                {currentStep === 1 && "Personal Information"}
                {currentStep === 2 && "Location & Emergency Contact"}
                {currentStep === 3 && "Health Information"}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="firstName"
                        className="text-indigo font-medium"
                      >
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Enter first name"
                        value={profileData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="border-gray-border focus:border-coral focus:ring-coral"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="lastName"
                        className="text-indigo font-medium"
                      >
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Enter last name"
                        value={profileData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="border-gray-border focus:border-coral focus:ring-coral"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="dateOfBirth"
                      className="text-indigo font-medium"
                    >
                      Date of Birth *
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) =>
                        handleInputChange("dateOfBirth", e.target.value)
                      }
                      className="border-gray-border focus:border-coral focus:ring-coral"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-indigo font-medium">Gender *</Label>
                    <RadioGroup
                      value={profileData.gender}
                      onValueChange={(value) =>
                        handleInputChange("gender", value)
                      }
                    >
                      <div className="flex space-x-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female">Female</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-indigo font-medium">
                      Blood Group
                    </Label>
                    <Select
                      value={profileData.bloodGroup}
                      onValueChange={(value) =>
                        handleInputChange("bloodGroup", value)
                      }
                    >
                      <SelectTrigger className="border-gray-border focus:border-coral">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodGroups.map((group) => (
                          <SelectItem key={group} value={group}>
                            {group}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 2: Location & Contact */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-2">
                    <Label
                      htmlFor="address"
                      className="text-indigo font-medium"
                    >
                      Address *
                    </Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your full address"
                      value={profileData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className="border-gray-border focus:border-coral focus:ring-coral"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-indigo font-medium">
                        City *
                      </Label>
                      <Input
                        id="city"
                        placeholder="Enter city"
                        value={profileData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        className="border-gray-border focus:border-coral focus:ring-coral"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="pincode"
                        className="text-indigo font-medium"
                      >
                        PIN Code *
                      </Label>
                      <Input
                        id="pincode"
                        placeholder="6-digit PIN"
                        value={profileData.pincode}
                        onChange={(e) =>
                          handleInputChange("pincode", e.target.value)
                        }
                        className="border-gray-border focus:border-coral focus:ring-coral"
                        maxLength={6}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-indigo font-medium">State *</Label>
                    <Select
                      value={profileData.state}
                      onValueChange={(value) =>
                        handleInputChange("state", value)
                      }
                    >
                      <SelectTrigger className="border-gray-border focus:border-coral">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-medium text-indigo mb-4 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-coral" />
                      Emergency Contact
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="emergencyContact"
                          className="text-indigo font-medium"
                        >
                          Phone Number
                        </Label>
                        <Input
                          id="emergencyContact"
                          placeholder="Emergency contact number"
                          value={profileData.emergencyContact}
                          onChange={(e) =>
                            handleInputChange(
                              "emergencyContact",
                              e.target.value,
                            )
                          }
                          className="border-gray-border focus:border-coral focus:ring-coral"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="emergencyRelation"
                          className="text-indigo font-medium"
                        >
                          Relationship
                        </Label>
                        <Input
                          id="emergencyRelation"
                          placeholder="e.g., Father, Mother, Spouse"
                          value={profileData.emergencyRelation}
                          onChange={(e) =>
                            handleInputChange(
                              "emergencyRelation",
                              e.target.value,
                            )
                          }
                          className="border-gray-border focus:border-coral focus:ring-coral"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Health Info */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="text-center mb-6">
                    <Badge className="bg-herbal-50 text-herbal border-herbal-100">
                      Optional but helps us serve you better
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="height"
                        className="text-indigo font-medium"
                      >
                        Height (cm)
                      </Label>
                      <Input
                        id="height"
                        placeholder="e.g., 170"
                        value={profileData.height}
                        onChange={(e) =>
                          handleInputChange("height", e.target.value)
                        }
                        className="border-gray-border focus:border-coral focus:ring-coral"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="weight"
                        className="text-indigo font-medium"
                      >
                        Weight (kg)
                      </Label>
                      <Input
                        id="weight"
                        placeholder="e.g., 65"
                        value={profileData.weight}
                        onChange={(e) =>
                          handleInputChange("weight", e.target.value)
                        }
                        className="border-gray-border focus:border-coral focus:ring-coral"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="allergies"
                      className="text-indigo font-medium"
                    >
                      Allergies
                    </Label>
                    <Textarea
                      id="allergies"
                      placeholder="List any known allergies (medicines, food, etc.)"
                      value={profileData.allergies}
                      onChange={(e) =>
                        handleInputChange("allergies", e.target.value)
                      }
                      className="border-gray-border focus:border-coral focus:ring-coral"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="currentMedications"
                      className="text-indigo font-medium"
                    >
                      Current Medications
                    </Label>
                    <Textarea
                      id="currentMedications"
                      placeholder="List medications you're currently taking"
                      value={profileData.currentMedications}
                      onChange={(e) =>
                        handleInputChange("currentMedications", e.target.value)
                      }
                      className="border-gray-border focus:border-coral focus:ring-coral"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="chronicConditions"
                      className="text-indigo font-medium"
                    >
                      Chronic Conditions
                    </Label>
                    <Textarea
                      id="chronicConditions"
                      placeholder="Any ongoing health conditions (diabetes, hypertension, etc.)"
                      value={profileData.chronicConditions}
                      onChange={(e) =>
                        handleInputChange("chronicConditions", e.target.value)
                      }
                      className="border-gray-border focus:border-coral focus:ring-coral"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="healthGoals"
                      className="text-indigo font-medium"
                    >
                      Health Goals
                    </Label>
                    <Textarea
                      id="healthGoals"
                      placeholder="What are your health goals? (weight management, fitness, etc.)"
                      value={profileData.healthGoals}
                      onChange={(e) =>
                        handleInputChange("healthGoals", e.target.value)
                      }
                      className="border-gray-border focus:border-coral focus:ring-coral"
                      rows={2}
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="border-coral text-coral hover:bg-coral-50"
                  >
                    Previous
                  </Button>
                )}

                {currentStep < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className={`ml-auto bg-gradient-to-r from-coral to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white transition-all duration-300 hover:scale-105 ${
                      !isStepValid()
                        ? "opacity-50 cursor-not-allowed hover:scale-100"
                        : ""
                    }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="ml-auto bg-gradient-to-r from-herbal to-herbal-600 hover:from-herbal-600 hover:to-herbal-700 text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Completing...
                      </div>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 mr-2" />
                        Complete Profile
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Skip Option */}
          {currentStep === 3 && (
            <div className="text-center mt-6 animate-fade-in delay-800">
              <Button
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                className="text-indigo/70 hover:text-indigo"
              >
                Skip for now, I'll complete later
              </Button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes bounce-gentle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-scale-in {
          animation: scale-in 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-400 {
          animation-delay: 400ms;
        }
        .delay-600 {
          animation-delay: 600ms;
        }
        .delay-800 {
          animation-delay: 800ms;
        }
      `}</style>
    </div>
  );
};

export default ProfileDetails;
