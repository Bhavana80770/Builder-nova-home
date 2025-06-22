import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Heart,
  ArrowLeft,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Volume2,
  VolumeX,
  Settings,
  MessageSquare,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const VoiceCall = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("doctorId");
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [callStatus, setCallStatus] = useState<
    "connecting" | "connected" | "ended"
  >("connecting");
  const [callDuration, setCallDuration] = useState(0);
  const [isDoctorSpeaking, setIsDoctorSpeaking] = useState(false);

  // Mock doctor data
  const doctor = {
    id: doctorId || "1",
    name: "Dr. Priya Sharma",
    specialization: "General Physician",
    avatar: null,
  };

  // Simulate doctor speaking at intervals
  useEffect(() => {
    if (callStatus === "connected") {
      const speakingInterval = setInterval(
        () => {
          setIsDoctorSpeaking(true);

          // Doctor speaks for 3-8 seconds randomly
          const speakDuration = Math.random() * 5000 + 3000;

          setTimeout(() => {
            setIsDoctorSpeaking(false);
          }, speakDuration);
        },
        Math.random() * 10000 + 5000,
      ); // Doctor speaks every 5-15 seconds

      return () => clearInterval(speakingInterval);
    }
  }, [callStatus]);

  useEffect(() => {
    // Simulate connection process
    const timer = setTimeout(() => {
      setCallStatus("connected");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Call duration timer
    if (callStatus === "connected") {
      const interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [callStatus]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const endCall = () => {
    setCallStatus("ended");
  };

  if (callStatus === "ended") {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-gray-border shadow-lg text-center">
          <CardContent className="pt-8 pb-8">
            <div className="w-16 h-16 bg-soft-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PhoneOff className="w-8 h-8 text-soft-red" />
            </div>
            <h2 className="text-2xl font-bold text-indigo mb-2">Call Ended</h2>
            <p className="text-indigo/70 mb-4">
              Call duration: {formatDuration(callDuration)}
            </p>
            <p className="text-sm text-indigo/60 mb-6">
              Thank you for consulting with {doctor.name}
            </p>
            <div className="space-y-3">
              <Link to="/doctors" className="block">
                <Button className="w-full bg-herbal hover:bg-herbal-600 text-white">
                  Back to Doctors
                </Button>
              </Link>
              <Link to="/dashboard" className="block">
                <Button variant="outline" className="w-full">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gender-pink-500 to-gender-pink-700">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <Link
            to="/doctors"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <div className="text-center">
            <Badge className="bg-white/20 text-white border-white/30">
              Voice Call
            </Badge>
          </div>
          <div className="w-9"></div>
        </div>
      </div>

      {/* Main Call Interface */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          {/* Doctor Avatar */}
          <div className="mb-8">
            <Avatar className="w-40 h-40 mx-auto mb-4 ring-4 ring-white/30">
              <AvatarFallback className="bg-white/20 text-white text-6xl">
                {doctor.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-3xl font-bold text-white mb-2">
              {doctor.name}
            </h2>
            <p className="text-white/80 mb-4">{doctor.specialization}</p>

            {/* Call Status */}
            <div className="mb-6">
              {callStatus === "connecting" ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse delay-100"></div>
                  <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse delay-200"></div>
                  <span className="text-white/80 ml-3">Connecting...</span>
                </div>
              ) : (
                <Badge className="bg-herbal text-white text-lg px-4 py-2">
                  {formatDuration(callDuration)}
                </Badge>
              )}
            </div>
          </div>

          {/* Audio Visualization */}
          {callStatus === "connected" && (
            <div className="mb-8">
              <div className="flex justify-center items-end space-x-1 h-20">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white/40 rounded-full animate-pulse"
                    style={{
                      width: "8px",
                      height: `${Math.random() * 60 + 20}px`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: "1.5s",
                    }}
                  ></div>
                ))}
              </div>
              <p className="text-white/60 text-sm mt-2">
                {isAudioOn ? "Speaking..." : "Microphone muted"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Call Controls */}
      <div className="p-8 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center justify-center space-x-8">
          {/* Mute/Unmute */}
          <Button
            onClick={() => setIsAudioOn(!isAudioOn)}
            className={`w-16 h-16 rounded-full ${
              isAudioOn
                ? "bg-white/20 hover:bg-white/30 text-white"
                : "bg-soft-red hover:bg-soft-red-600 text-white"
            }`}
          >
            {isAudioOn ? (
              <Mic className="w-7 h-7" />
            ) : (
              <MicOff className="w-7 h-7" />
            )}
          </Button>

          {/* Speaker */}
          <Button
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`w-16 h-16 rounded-full ${
              isSpeakerOn
                ? "bg-herbal hover:bg-herbal-600 text-white"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            {isSpeakerOn ? (
              <Volume2 className="w-7 h-7" />
            ) : (
              <VolumeX className="w-7 h-7" />
            )}
          </Button>

          {/* End Call */}
          <Button
            onClick={endCall}
            className="w-20 h-20 rounded-full bg-soft-red hover:bg-soft-red-600 text-white"
          >
            <PhoneOff className="w-8 h-8" />
          </Button>

          {/* Chat */}
          <Button className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 text-white">
            <MessageSquare className="w-7 h-7" />
          </Button>

          {/* Settings */}
          <Button className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 text-white">
            <Settings className="w-7 h-7" />
          </Button>
        </div>

        {/* Status Indicators */}
        <div className="mt-6 flex justify-center space-x-4">
          <Badge
            className={`${isAudioOn ? "bg-herbal" : "bg-soft-red"} text-white`}
          >
            {isAudioOn ? "Mic On" : "Mic Muted"}
          </Badge>
          <Badge
            className={`${isSpeakerOn ? "bg-herbal" : "bg-white/20"} text-white`}
          >
            {isSpeakerOn ? "Speaker On" : "Earpiece"}
          </Badge>
          <Badge className="bg-white/20 text-white border-white/30">
            Audio Quality: HD
          </Badge>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 text-center">
          <p className="text-white/60 text-sm">
            Tip: You can use the chat button to send messages during the call
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceCall;
