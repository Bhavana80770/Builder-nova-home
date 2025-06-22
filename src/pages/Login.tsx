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
import { Heart, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (!success) {
      // Handle login error - for now just log it
      console.error("Login failed");
    } else {
      // Check if coming from verification
      const urlParams = new URLSearchParams(window.location.search);
      const isVerified = urlParams.get("verified") === "true";

      if (isVerified) {
        // Redirect to profile completion
        window.location.href = "/profile-details";
      }
    }
    // Success case is handled by the auth context and routing
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGoogleLogin = () => {
    // Simulate successful Google login
    console.log("Simulating Google login...");

    // Show loading state
    const originalText = "Google";
    const button = document.querySelector("button:has(svg)");
    if (button) {
      button.textContent = "Signing in...";
      button.disabled = true;
    }

    // Simulate OAuth process
    setTimeout(() => {
      // Simulate successful login by calling the auth context
      login("user@gmail.com", "google_oauth_token").then((success) => {
        if (success) {
          // Redirect to dashboard
          window.location.href = "/dashboard";
        } else {
          // Reset button if login fails
          if (button) {
            button.textContent = originalText;
            button.disabled = false;
          }
        }
      });
    }, 1500);
  };

  const handleFacebookLogin = () => {
    // Simulate successful Facebook login
    console.log("Simulating Facebook login...");

    // Show loading state
    const buttons = document.querySelectorAll("button");
    const facebookButton = Array.from(buttons).find((btn) =>
      btn.textContent?.includes("Facebook"),
    );
    if (facebookButton) {
      facebookButton.textContent = "Signing in...";
      facebookButton.disabled = true;
    }

    // Simulate OAuth process
    setTimeout(() => {
      // Simulate successful login
      login("user@facebook.com", "facebook_oauth_token").then((success) => {
        if (success) {
          // Redirect to dashboard
          window.location.href = "/dashboard";
        } else {
          // Reset button if login fails
          if (facebookButton) {
            facebookButton.textContent = "Facebook";
            facebookButton.disabled = false;
          }
        }
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-sand flex items-center justify-center p-4">
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
              <h1 className="text-2xl font-bold text-indigo">AarogyaMitra</h1>
              <p className="text-sm text-indigo/70">Your Health Companion</p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border-gray-border shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-indigo">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to continue your health journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div className="space-y-2">
                <Label htmlFor="password" className="text-indigo font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    className="rounded border-gray-border text-herbal focus:ring-herbal"
                  />
                  <span className="text-indigo">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-herbal hover:text-herbal-600 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-herbal hover:bg-herbal-600 text-white py-6 text-lg font-medium"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="relative">
              <Separator className="bg-gray-border" />
              <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-indigo/60">
                Or continue with
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                onClick={handleGoogleLogin}
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
                type="button"
                onClick={handleFacebookLogin}
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

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-indigo/70">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-herbal hover:text-herbal-600 font-medium"
            >
              Sign up here
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

export default Login;
