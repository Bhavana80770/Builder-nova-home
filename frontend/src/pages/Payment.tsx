import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Heart,
  ArrowLeft,
  CreditCard,
  Smartphone,
  Wallet,
  Shield,
  CheckCircle,
  Clock,
  Video,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Payment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("doctorId");
  const consultationType = searchParams.get("type") || "appointment";
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  // Mock doctor data
  const doctor = {
    id: doctorId || "1",
    name: "Dr. Priya Sharma",
    specialization: "General Physician",
    experience: "8 years",
    rating: 4.8,
    consultationFees: {
      appointment: 499,
    },
  };

  const getConsultationInfo = () => {
    return {
      icon: Clock,
      title: "Hospital Appointment",
      price: doctor.consultationFees.appointment,
      duration: "Priority Slot",
    };
  };

  const consultationInfo = getConsultationInfo();
  const discountAmount = couponCode === "HEALTH50" ? 50 : 0;
  const finalAmount = consultationInfo.price - discountAmount;

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);

    // Redirect to confirmation
    navigate(
      `/appointment/success?doctorId=${doctorId}&paid=true`,
    );
  };

  const applyCoupon = () => {
    // Simulate coupon validation
    if (couponCode === "HEALTH50") {
      // Valid coupon applied
      console.log("Coupon applied successfully");
    }
  };

  return (
    <div className="min-h-screen bg-sand">
      {/* Header */}
      <header className="border-b border-gray-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link
                to="/doctors"
                className="p-2 hover:bg-sand rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-indigo" />
              </Link>
              <div className="w-8 h-8 bg-herbal rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-indigo">Payment</h1>
                <p className="text-xs text-indigo/70">Secure checkout</p>
              </div>
            </div>
            <Badge className="bg-herbal-50 text-herbal border-herbal-100">
              <Shield className="w-3 h-3 mr-1" />
              Secure Payment
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Consultation Details */}
          <div className="space-y-6">
            {/* Doctor Info */}
            <Card className="border-gray-border">
              <CardHeader>
                <CardTitle className="text-indigo flex items-center">
                  <consultationInfo.icon className="w-5 h-5 mr-2" />
                  {consultationInfo.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-herbal text-white text-xl">
                      {doctor.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-indigo">{doctor.name}</h3>
                    <p className="text-sm text-indigo/70">
                      {doctor.specialization}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-indigo/60">
                        {doctor.experience}
                      </span>
                      <span className="text-sm text-indigo/60">
                        ⭐ {doctor.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="border-gray-border">
              <CardHeader>
                <CardTitle className="text-indigo">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                >
                  <div className="space-y-4">
                    {/* UPI */}
                    <div className="flex items-center space-x-3 p-3 border border-gray-border rounded-lg hover:bg-sand/50">
                      <RadioGroupItem value="upi" id="upi" />
                      <Smartphone className="w-5 h-5 text-herbal" />
                      <div className="flex-1">
                        <Label htmlFor="upi" className="font-medium">
                          UPI Payment
                        </Label>
                        <p className="text-sm text-indigo/60">
                          Pay with Google Pay, PhonePe, Paytm
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-herbal-50 text-herbal"
                      >
                        Instant
                      </Badge>
                    </div>

                    {/* Wallet */}
                    <div className="flex items-center space-x-3 p-3 border border-gray-border rounded-lg hover:bg-sand/50">
                      <RadioGroupItem value="wallet" id="wallet" />
                      <Wallet className="w-5 h-5 text-coral" />
                      <div className="flex-1">
                        <Label htmlFor="wallet" className="font-medium">
                          Digital Wallet
                        </Label>
                        <p className="text-sm text-indigo/60">
                          Paytm, Amazon Pay, Mobikwik
                        </p>
                      </div>
                    </div>

                    {/* Credit/Debit Card */}
                    <div className="flex items-center space-x-3 p-3 border border-gray-border rounded-lg hover:bg-sand/50">
                      <RadioGroupItem value="card" id="card" />
                      <CreditCard className="w-5 h-5 text-gender-blue" />
                      <div className="flex-1">
                        <Label htmlFor="card" className="font-medium">
                          Credit/Debit Card
                        </Label>
                        <p className="text-sm text-indigo/60">
                          Visa, Mastercard, RuPay
                        </p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>

                {/* Card Details (if card selected) */}
                {paymentMethod === "card" && (
                  <div className="mt-4 space-y-3 p-4 bg-sand/50 rounded-lg">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="expiry">Expiry</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          placeholder="Full Name"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Coupon Code */}
            <Card className="border-gray-border">
              <CardHeader>
                <CardTitle className="text-indigo">Coupon Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={applyCoupon}
                    className="border-herbal text-herbal hover:bg-herbal-50"
                  >
                    Apply
                  </Button>
                </div>
                {couponCode === "HEALTH50" && (
                  <div className="mt-2 text-sm text-herbal flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Coupon applied! ₹50 discount
                  </div>
                )}
                <div className="mt-3">
                  <p className="text-xs text-indigo/60">
                    Try:{" "}
                    <span className="font-mono bg-sand px-1 rounded">
                      HEALTH50
                    </span>{" "}
                    for ₹50 off
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Bill Summary */}
            <Card className="border-gray-border">
              <CardHeader>
                <CardTitle className="text-indigo">Bill Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-indigo">
                    {consultationInfo.title} ({consultationInfo.duration})
                  </span>
                  <span className="font-semibold text-indigo">
                    ₹{consultationInfo.price}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-herbal">
                    <span>Coupon Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-sm text-indigo/60">
                  <span>Platform Fee</span>
                  <span>₹0</span>
                </div>

                <Separator />

                <div className="flex justify-between items-center text-lg font-bold text-indigo">
                  <span>Total Amount</span>
                  <span>₹{finalAmount}</span>
                </div>

                {/* Benefits */}
                <div className="mt-4 p-3 bg-herbal-50 rounded-lg">
                  <h4 className="font-medium text-herbal mb-2">
                    What you get:
                  </h4>
                  <ul className="text-sm text-indigo space-y-1">
                    <li className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2 text-herbal" />
                      Priority Hospital Visit
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2 text-herbal" />
                      Confirmed Doctor Slot
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2 text-herbal" />
                      Digital Health Guard
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2 text-herbal" />
                      Instant Confirmation
                    </li>
                  </ul>
                </div>

                {/* Pay Button */}
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-herbal hover:bg-herbal-600 text-white py-6 text-lg font-medium"
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Pay ₹{finalAmount} Securely
                    </div>
                  )}
                </Button>

                {/* Security Notice */}
                <div className="text-xs text-indigo/60 text-center">
                  <Shield className="w-3 h-3 inline mr-1" />
                  Your payment is secured with 256-bit SSL encryption
                </div>
              </CardContent>
            </Card>

            {/* Free Consultation Note */}
            <Card className="border-coral-200 bg-coral-50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h4 className="font-medium text-coral mb-2">
                    Need Emergency Help?
                  </h4>
                  <p className="text-sm text-indigo/70 mb-3">
                    Basic health consultations are available for free
                  </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-coral text-coral hover:bg-coral/10"
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      Check Emergency Status
                    </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
