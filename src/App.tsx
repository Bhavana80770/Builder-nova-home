import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Emergency from "./pages/Emergency";
import Services from "./pages/Services";
import Careers from "./pages/Careers";
import Specialties from "./pages/Specialties";
import VoiceChatbot from "./pages/VoiceChatbot";
import SymptomInput from "./pages/SymptomInput";
import DoctorConnect from "./pages/DoctorConnect";
import VideoCall from "./pages/VideoCall";
import VoiceCall from "./pages/VoiceCall";
import ChatConsultation from "./pages/ChatConsultation";
import Payment from "./pages/Payment";
import Pricing from "./pages/Pricing";
import PhoneVerification from "./pages/PhoneVerification";
import OtpVerification from "./pages/OtpVerification";
import ProfileDetails from "./pages/ProfileDetails";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes - redirect to dashboard if already logged in */}
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" replace /> : <Index />}
      />
      <Route
        path="/phone-verification"
        element={
          user ? <Navigate to="/dashboard" replace /> : <PhoneVerification />
        }
      />
      <Route
        path="/verify-otp"
        element={
          user ? <Navigate to="/dashboard" replace /> : <OtpVerification />
        }
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/dashboard" replace /> : <Signup />}
      />
      <Route
        path="/profile-details"
        element={
          <ProtectedRoute>
            <ProfileDetails />
          </ProtectedRoute>
        }
      />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <VoiceChatbot />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <VoiceChatbot />
          </ProtectedRoute>
        }
      />
      <Route
        path="/symptoms"
        element={
          <ProtectedRoute>
            <SymptomInput />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors"
        element={
          <ProtectedRoute>
            <DoctorConnect />
          </ProtectedRoute>
        }
      />
      <Route
        path="/consultation/video"
        element={
          <ProtectedRoute>
            <VideoCall />
          </ProtectedRoute>
        }
      />
      <Route
        path="/consultation/voice"
        element={
          <ProtectedRoute>
            <VoiceCall />
          </ProtectedRoute>
        }
      />
      <Route
        path="/consultation/chat"
        element={
          <ProtectedRoute>
            <ChatConsultation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/help" element={<Help />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/emergency" element={<Emergency />} />

      {/* Catch all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
