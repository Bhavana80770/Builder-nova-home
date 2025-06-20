import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-sand flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-gray-border shadow-lg text-center">
          <CardContent className="pt-8 pb-8">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-herbal rounded-xl flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-indigo">AarogyaMitra</h1>
                <p className="text-sm text-indigo/70">Your Health Companion</p>
              </div>
            </div>

            {/* 404 Content */}
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-herbal mb-4">404</h1>
              <h2 className="text-2xl font-semibold text-indigo mb-2">
                Page Not Found
              </h2>
              <p className="text-indigo/70 mb-6">
                The page you're looking for doesn't exist. It might have been
                moved or deleted.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link to="/" className="block">
                <Button className="w-full bg-herbal hover:bg-herbal-600 text-white">
                  <Home className="w-4 h-4 mr-2" />
                  Go to Homepage
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="w-full border-herbal text-herbal hover:bg-herbal-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>

            {/* Quick Links */}
            <div className="mt-8 pt-6 border-t border-gray-border">
              <p className="text-sm text-indigo/60 mb-4">
                Or try these popular pages:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link to="/chat">
                  <Button variant="outline" size="sm" className="text-xs">
                    Voice Chat
                  </Button>
                </Link>
                <Link to="/symptoms">
                  <Button variant="outline" size="sm" className="text-xs">
                    Symptoms
                  </Button>
                </Link>
                <Link to="/doctors">
                  <Button variant="outline" size="sm" className="text-xs">
                    Doctors
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Notice */}
        <div className="mt-6 p-4 bg-soft-red-50 border border-soft-red-200 rounded-lg text-center">
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

export default NotFound;
