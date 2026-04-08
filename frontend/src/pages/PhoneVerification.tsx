import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ArrowLeft,
  Smartphone,
  Shield,
  CheckCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { smsService } from "@/services/smsService";

const PhoneVerification = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"phone" | "sending">("phone");
  const [error, setError] = useState("");

  useEffect(() => {
    // Request notification permission for development OTP display
    smsService.requestNotificationPermission();
  }, []);

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) return;

    setIsLoading(true);
    setStep("sending");
    setError("");

    try {
      // Send OTP via SMS service
      const result = await smsService.sendOTP(phoneNumber);

      if (result.success) {
        // Show success message for development
        if (import.meta.env.VITE_APP_ENV === "development") {
          console.log(
            "🎉 OTP sent successfully! Check your browser notifications or console for the OTP code.",
          );
        }

        // Navigate to OTP verification
        navigate(`/verify-otp?phone=${phoneNumber}`);
      } else {
        setError(result.error || "Failed to send OTP. Please try again.");
        setStep("phone");
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.");
      setStep("phone");
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 10) {
      setPhoneNumber(cleaned);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand via-herbal-50 to-sand relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-herbal/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-coral/10 rounded-full blur-xl animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gender-blue/10 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gender-pink/10 rounded-full blur-xl animate-bounce delay-700"></div>
      </div>

      {/* Floating Medical Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-1/4 animate-float delay-100">
          <div className="w-6 h-6 bg-herbal/20 rounded-lg rotate-12"></div>
        </div>
        <div className="absolute top-64 right-1/3 animate-float delay-300">
          <div className="w-4 h-4 bg-coral/20 rounded-full"></div>
        </div>
        <div className="absolute bottom-72 left-1/2 animate-float delay-500">
          <div className="w-5 h-5 bg-gender-blue/20 rounded-lg -rotate-12"></div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <Link
              to="/"
              className="inline-flex items-center text-indigo hover:text-herbal mb-6 transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-herbal to-herbal-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce-gentle">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="animate-slide-in-right delay-200">
                <h1 className="text-3xl font-bold text-indigo">MediNova</h1>
                <p className="text-sm text-indigo/70">Your Health Companion</p>
              </div>
            </div>
          </div>

          {/* Verification Card */}
          <Card className="border-gray-border shadow-2xl backdrop-blur-sm bg-white/90 animate-scale-in delay-300">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-r from-herbal to-herbal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-gentle">
                <Smartphone className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-indigo animate-fade-in delay-500">
                Verify Your Mobile
              </CardTitle>
              <p className="text-indigo/70 animate-fade-in delay-700">
                We'll send you a verification code to ensure secure access
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {step === "phone" ? (
                <div className="animate-fade-in delay-900">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-indigo font-medium"
                      >
                        Mobile Number
                      </Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                          <span className="text-indigo font-medium">
                            🇮🇳 +91
                          </span>
                        </div>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter 10-digit mobile number"
                          value={phoneNumber}
                          onChange={(e) => formatPhoneNumber(e.target.value)}
                          className="pl-20 border-gray-border focus:border-herbal focus:ring-herbal text-lg py-6 transition-all duration-300 hover:shadow-md"
                          maxLength={10}
                        />
                      </div>
                      {phoneNumber && phoneNumber.length === 10 && !error && (
                        <div className="flex items-center text-herbal text-sm animate-slide-in-up">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Valid mobile number
                        </div>
                      )}
                      {error && (
                        <div className="flex items-center text-soft-red text-sm animate-slide-in-up">
                          <span className="mr-2">⚠️</span>
                          {error}
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={handleSendOTP}
                      disabled={phoneNumber.length !== 10 || isLoading}
                      className="w-full bg-gradient-to-r from-herbal to-herbal-600 hover:from-herbal-600 hover:to-herbal-700 text-white py-6 text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Sending OTP...
                        </div>
                      ) : (
                        <>
                          <Smartphone className="w-5 h-5 mr-2" />
                          Send Verification Code
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 bg-herbal/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <div className="w-8 h-8 border-3 border-herbal border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-indigo">
                    Sending verification code...
                  </h3>
                  <p className="text-indigo/70">
                    Please wait while we send the OTP to +91 {phoneNumber}
                  </p>
                </div>
              )}

              {/* Security Notice */}
              <div className="bg-herbal-50 border border-herbal-100 rounded-lg p-4 animate-fade-in delay-1100">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-herbal mt-0.5" />
                  <div>
                    <h4 className="font-medium text-herbal text-sm">
                      Secure Verification
                    </h4>
                    <p className="text-xs text-indigo/70 mt-1">
                      Your phone number is encrypted and used only for
                      verification. We respect your privacy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-3 animate-fade-in delay-1300">
                <h4 className="font-medium text-indigo text-sm">
                  What you get after verification:
                </h4>
                <div className="space-y-2">
                  {[
                    "🆓 Free health consultations",
                    "👨‍⚕️ Access to verified doctors",
                    "🔒 Secure health records",
                    "📱 24/7 AI health support",
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-indigo/80 animate-slide-in-left"
                      style={{ animationDelay: `${1400 + index * 100}ms` }}
                    >
                      <span className="mr-2">{benefit.split(" ")[0]}</span>
                      <span>{benefit.substring(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer Note */}
          <div className="text-center mt-6 animate-fade-in delay-1500">
            <p className="text-sm text-indigo/60">
              By continuing, you agree to our{" "}
              <Link to="/terms" className="text-herbal hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-herbal hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Emergency Contact */}
          <div className="mt-8 p-4 bg-soft-red-50 border border-soft-red-200 rounded-lg text-center animate-fade-in delay-1700">
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

export default PhoneVerification;
