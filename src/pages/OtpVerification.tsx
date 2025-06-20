import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ArrowLeft,
  Shield,
  RotateCcw,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const OtpVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const phoneNumber = searchParams.get("phone") || "";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    // Countdown timer
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numeric values and single characters
    if (value.length > 1 || (value && !/^\d$/.test(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all fields are filled
    if (newOtp.every((digit) => digit !== "") && newOtp.join("").length === 6) {
      handleVerifyOtp(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (otpValue?: string) => {
    const otpToVerify = otpValue || otp.join("");
    if (otpToVerify.length !== 6) return;

    setIsVerifying(true);

    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Navigate to login page
    navigate("/login?verified=true");
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    setCanResend(false);
    setTimeLeft(60);

    // Simulate resending OTP
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsResending(false);
    // Clear OTP fields
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sand via-gender-blue-50 to-sand relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-8 w-40 h-40 bg-gender-blue/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-16 w-32 h-32 bg-herbal/10 rounded-full blur-xl animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-1/3 w-36 h-36 bg-coral/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-16 right-8 w-24 h-24 bg-gender-pink/10 rounded-full blur-xl animate-bounce delay-300"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-1/4 animate-float delay-200">
          <Shield className="w-8 h-8 text-herbal/20" />
        </div>
        <div className="absolute top-48 right-1/4 animate-float delay-500">
          <CheckCircle className="w-6 h-6 text-gender-blue/20" />
        </div>
        <div className="absolute bottom-48 left-1/2 animate-float delay-800">
          <Heart className="w-7 h-7 text-coral/20" />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <Link
              to="/phone-verification"
              className="inline-flex items-center text-indigo hover:text-herbal mb-6 transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Phone
            </Link>
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-gender-blue to-gender-blue-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce-gentle">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="animate-slide-in-right delay-200">
                <h1 className="text-3xl font-bold text-indigo">Verify Code</h1>
                <p className="text-sm text-indigo/70">Almost there!</p>
              </div>
            </div>
          </div>

          {/* OTP Card */}
          <Card className="border-gray-border shadow-2xl backdrop-blur-sm bg-white/90 animate-scale-in delay-300">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl text-indigo animate-fade-in delay-500">
                Enter Verification Code
              </CardTitle>
              <p className="text-indigo/70 animate-fade-in delay-700">
                We've sent a 6-digit code to
              </p>
              <Badge className="bg-herbal-50 text-herbal border-herbal-100 animate-scale-in delay-900">
                +91 {phoneNumber}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* OTP Input */}
              <div className="animate-fade-in delay-1100">
                <div className="flex justify-center space-x-3 mb-6">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-border focus:border-gender-blue focus:ring-gender-blue transition-all duration-300 hover:shadow-md"
                      style={{
                        animationDelay: `${1200 + index * 100}ms`,
                      }}
                    />
                  ))}
                </div>

                {/* Timer */}
                <div className="text-center mb-4">
                  {timeLeft > 0 ? (
                    <div className="flex items-center justify-center text-indigo/70 animate-pulse">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Resend code in {formatTime(timeLeft)}</span>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      onClick={handleResendOtp}
                      disabled={isResending}
                      className="text-herbal hover:text-herbal-600 hover:bg-herbal-50 transition-all duration-300"
                    >
                      {isResending ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-herbal border-t-transparent rounded-full animate-spin mr-2"></div>
                          Sending...
                        </div>
                      ) : (
                        <>
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Resend OTP
                        </>
                      )}
                    </Button>
                  )}
                </div>

                <Button
                  onClick={() => handleVerifyOtp()}
                  disabled={otp.some((digit) => !digit) || isVerifying}
                  className="w-full bg-gradient-to-r from-gender-blue to-gender-blue-600 hover:from-gender-blue-600 hover:to-gender-blue-700 text-white py-6 text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isVerifying ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Verifying...
                    </div>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Verify & Continue
                    </>
                  )}
                </Button>
              </div>

              {/* Instructions */}
              <div className="bg-gender-blue-50 border border-gender-blue-100 rounded-lg p-4 animate-fade-in delay-1500">
                <h4 className="font-medium text-gender-blue text-sm mb-2">
                  Didn't receive the code?
                </h4>
                <ul className="text-xs text-indigo/70 space-y-1">
                  <li>• Check your SMS inbox and spam folder</li>
                  <li>• Ensure you have good network connectivity</li>
                  <li>• The code expires in 5 minutes</li>
                  <li>• You can resend after the timer expires</li>
                </ul>
              </div>

              {/* Security Notice */}
              <div className="bg-herbal-50 border border-herbal-100 rounded-lg p-4 animate-fade-in delay-1700">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-herbal mt-0.5" />
                  <div>
                    <h4 className="font-medium text-herbal text-sm">
                      Secure & Encrypted
                    </h4>
                    <p className="text-xs text-indigo/70 mt-1">
                      Your verification code is encrypted and valid for one-time
                      use only. Never share it with anyone.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer Note */}
          <div className="text-center mt-6 animate-fade-in delay-1900">
            <p className="text-sm text-indigo/60">
              Having trouble? Contact our{" "}
              <Link to="/support" className="text-herbal hover:underline">
                support team
              </Link>
            </p>
          </div>

          {/* Emergency Contact */}
          <div className="mt-8 p-4 bg-soft-red-50 border border-soft-red-200 rounded-lg text-center animate-fade-in delay-2100">
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

export default OtpVerification;
