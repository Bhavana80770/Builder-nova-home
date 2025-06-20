import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Heart,
  ArrowLeft,
  Mic,
  MicOff,
  Volume2,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const VoiceChatbot = () => {
  const { user, logout } = useAuth();
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-sand">
      {/* Header */}
      <header className="border-b border-gray-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-herbal rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-indigo">
                  Voice Assistant
                </h1>
                <p className="text-xs text-indigo/70">Welcome, {user?.name}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Avatar className="w-6 h-6 mr-2">
                    <AvatarFallback className="bg-herbal text-white text-xs">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Status Badge */}
          <div className="text-center mb-8">
            <Badge className="bg-herbal-50 text-herbal border-herbal-100 mb-4">
              🎙️ Voice Assistant Ready
            </Badge>
            <h2 className="text-2xl font-bold text-indigo mb-2">
              Talk to AarogyaMitra
            </h2>
            <p className="text-indigo/70">
              Speak naturally about your health concerns in your preferred
              language
            </p>
          </div>

          {/* Voice Interface */}
          <Card className="border-gray-border shadow-lg mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-indigo">
                Voice Chat Interface
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              {/* Mic Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => setIsListening(!isListening)}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isListening
                      ? "bg-coral scale-110 shadow-lg animate-pulse"
                      : "bg-herbal hover:bg-herbal-600 hover:scale-105"
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-10 h-10 text-white" />
                  ) : (
                    <Mic className="w-10 h-10 text-white" />
                  )}
                </button>
              </div>

              {/* Status Text */}
              <div className="space-y-2">
                <p className="text-lg font-medium text-indigo">
                  {isListening ? "Listening..." : "Tap to speak"}
                </p>
                <p className="text-sm text-indigo/60">
                  {isListening
                    ? "Speak clearly about your health concerns"
                    : "Press and hold the microphone to start"}
                </p>
              </div>

              {/* Language Options */}
              <div className="flex flex-wrap justify-center gap-2">
                {["Hindi", "English", "Bengali", "Tamil", "Telugu"].map(
                  (lang) => (
                    <Badge
                      key={lang}
                      variant="outline"
                      className="cursor-pointer hover:bg-herbal hover:text-white border-herbal text-herbal"
                    >
                      {lang}
                    </Badge>
                  ),
                )}
              </div>
            </CardContent>
          </Card>

          {/* Conversation History Placeholder */}
          <Card className="border-gray-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-indigo">Conversation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-center items-center h-32 text-indigo/50">
                  <div className="text-center">
                    <Volume2 className="w-8 h-8 mx-auto mb-2" />
                    <p>Start speaking to begin your conversation</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <Link to="/symptoms">
              <Button
                variant="outline"
                className="w-full border-herbal text-herbal hover:bg-herbal-50"
              >
                Symptom Checker
              </Button>
            </Link>
            <Link to="/doctors">
              <Button
                variant="outline"
                className="w-full border-coral text-coral hover:bg-coral-50"
              >
                Talk to Doctor
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

export default VoiceChatbot;
