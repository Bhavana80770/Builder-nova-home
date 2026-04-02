import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowLeft, Eye, EyeOff, User, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Signup = () => {
  const { signup, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    age: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords don't match");
      return;
    }
    const success = await signup({ ...formData, gender: selectedGender });
    if (!success) {
      console.error("Signup failed");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-sand flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-indigo hover:text-herbal mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-herbal rounded-xl flex items-center justify-center">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-indigo">MediNova</h1>
              <p className="text-sm text-indigo/70">Your Health Companion</p>
            </div>
          </div>
        </div>

        {/* Signup Card */}
        <Card className="border-gray-border shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-indigo">
              Join MediNova
            </CardTitle>
            <CardDescription>
              Create your account to start your health journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-indigo font-medium"
                  >
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border-gray-border focus:border-herbal focus:ring-herbal"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-indigo font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border-gray-border focus:border-herbal focus:ring-herbal"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-indigo font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-gray-border focus:border-herbal focus:ring-herbal"
                  required
                />
              </div>

              {/* Phone and Age */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-indigo font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border-gray-border focus:border-herbal focus:ring-herbal"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-indigo font-medium">
                    Age
                  </Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Age"
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    className="border-gray-border focus:border-herbal focus:ring-herbal"
                    required
                  />
                </div>
              </div>

              {/* Gender Selection */}
              <div className="space-y-2">
                <Label className="text-indigo font-medium">Gender</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={selectedGender === "male" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedGender("male")}
                    className={
                      selectedGender === "male"
                        ? "bg-gender-blue text-white"
                        : "border-gender-blue text-gender-blue hover:bg-gender-blue-50"
                    }
                  >
                    <User className="w-4 h-4 mr-1" />
                    Male
                  </Button>
                  <Button
                    type="button"
                    variant={
                      selectedGender === "female" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedGender("female")}
                    className={
                      selectedGender === "female"
                        ? "bg-gender-pink text-white"
                        : "border-gender-pink text-gender-pink hover:bg-gender-pink-50"
                    }
                  >
                    <UserCheck className="w-4 h-4 mr-1" />
                    Female
                  </Button>
                  <Button
                    type="button"
                    variant={selectedGender === "other" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedGender("other")}
                    className={
                      selectedGender === "other"
                        ? "bg-indigo text-white"
                        : "border-indigo text-indigo hover:bg-indigo-50"
                    }
                  >
                    Other
                  </Button>
                </div>
              </div>

              {/* Password Fields */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-indigo font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border-gray-border focus:border-herbal focus:ring-herbal pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo/60 hover:text-indigo"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-indigo font-medium"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="border-gray-border focus:border-herbal focus:ring-herbal pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo/60 hover:text-indigo"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="rounded border-gray-border text-herbal focus:ring-herbal mt-1"
                  required
                />
                <label htmlFor="terms" className="text-sm text-indigo">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-herbal hover:text-herbal-600 font-medium"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-herbal hover:text-herbal-600 font-medium"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-herbal hover:bg-herbal-600 text-white py-6 text-lg font-medium"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="relative">
              <Separator className="bg-gray-border" />
              <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-indigo/60">
                Or sign up with
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="border-gray-border hover:bg-sand text-indigo"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                className="border-gray-border hover:bg-sand text-indigo"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-indigo/70">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-herbal hover:text-herbal-600 font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Emergency Contact */}
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
  );
};

export default Signup;
