import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Heart,
  ArrowLeft,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  MessageSquare,
  Settings,
  MoreVertical,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const VideoCall = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("doctorId");
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [callStatus, setCallStatus] = useState<
    "connecting" | "connected" | "ended"
  >("connecting");
  const [callDuration, setCallDuration] = useState(0);

  // Mock doctor data - in real app, fetch based on doctorId
  const doctor = {
    id: doctorId || "1",
    name: "Dr. Priya Sharma",
    specialization: "General Physician",
    avatar: null,
  };

  useEffect(() => {
    // Simulate connection process
    const timer = setTimeout(() => {
      setCallStatus("connected");
    }, 3000);

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
    <div className="min-h-screen bg-indigo-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between">
          <Link
            to="/doctors"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <div className="text-center">
            <Badge className="bg-white/20 text-white border-white/30">
              {callStatus === "connecting"
                ? "Connecting..."
                : `${formatDuration(callDuration)}`}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Video Area */}
      <div className="relative z-10 flex-1 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          {/* Doctor Video */}
          <Card className="bg-black/30 border-white/20 backdrop-blur-sm">
            <CardContent className="p-4 h-full flex flex-col">
              <div className="flex-1 bg-gradient-to-br from-gender-blue/20 to-gender-blue/40 rounded-lg flex items-center justify-center relative overflow-hidden">
                {callStatus === "connecting" ? (
                  <div className="text-center text-white">
                    <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                    <p>Connecting to {doctor.name}...</p>
                  </div>
                ) : (
                  <>
                    {/* Simulated doctor video background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200">
                      {/* Office background simulation */}
                      <div className="absolute top-4 left-4 w-16 h-12 bg-green-200 rounded opacity-60"></div>
                      <div className="absolute top-4 right-4 w-20 h-8 bg-brown-200 rounded opacity-40"></div>
                      <div className="absolute bottom-8 left-8 w-12 h-12 bg-white rounded-full opacity-30"></div>
                    </div>

                    {/* Doctor avatar with professional appearance */}
                    <div className="relative z-10 flex flex-col items-center">
                      <Avatar className="w-40 h-40 mb-4 ring-4 ring-white/50">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-5xl">
                          {doctor.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      {/* Speech indicator */}
                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="w-2 h-6 bg-green-400 rounded-full animate-pulse"
                            style={{
                              animationDelay: `${i * 0.2}s`,
                              animationDuration: "1s",
                            }}
                          ></div>
                        ))}
                      </div>
                      <p className="text-white/80 text-sm">
                        Dr. is speaking...
                      </p>
                    </div>

                    {/* Doctor info overlay */}
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg">
                      <p className="font-semibold">{doctor.name}</p>
                      <p className="text-xs text-white/80">
                        {doctor.specialization}
                      </p>
                    </div>

                    {/* Video quality indicator */}
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded text-xs">
                      HD
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Your Video */}
          <Card className="bg-black/30 border-white/20 backdrop-blur-sm">
            <CardContent className="p-4 h-full flex flex-col">
              <div className="flex-1 bg-gradient-to-br from-herbal/20 to-herbal/40 rounded-lg flex items-center justify-center relative">
                {isVideoOn ? (
                  <>
                    <Avatar className="w-24 h-24">
                      <AvatarFallback className="bg-herbal text-white text-3xl">
                        {user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
                      You ({user?.name})
                    </div>
                  </>
                ) : (
                  <div className="text-center text-white">
                    <VideoOff className="w-12 h-12 mx-auto mb-2 text-white/60" />
                    <p className="text-white/80">Camera Off</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-10 p-6 bg-black/30 backdrop-blur-sm">
        <div className="flex items-center justify-center space-x-6">
          {/* Mute/Unmute */}
          <Button
            onClick={() => setIsAudioOn(!isAudioOn)}
            className={`w-14 h-14 rounded-full ${
              isAudioOn
                ? "bg-white/20 hover:bg-white/30 text-white"
                : "bg-soft-red hover:bg-soft-red-600 text-white"
            }`}
          >
            {isAudioOn ? (
              <Mic className="w-6 h-6" />
            ) : (
              <MicOff className="w-6 h-6" />
            )}
          </Button>

          {/* End Call */}
          <Button
            onClick={endCall}
            className="w-16 h-16 rounded-full bg-soft-red hover:bg-soft-red-600 text-white"
          >
            <PhoneOff className="w-7 h-7" />
          </Button>

          {/* Video On/Off */}
          <Button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`w-14 h-14 rounded-full ${
              isVideoOn
                ? "bg-white/20 hover:bg-white/30 text-white"
                : "bg-soft-red hover:bg-soft-red-600 text-white"
            }`}
          >
            {isVideoOn ? (
              <Video className="w-6 h-6" />
            ) : (
              <VideoOff className="w-6 h-6" />
            )}
          </Button>

          {/* Chat */}
          <Button className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 text-white">
            <MessageSquare className="w-6 h-6" />
          </Button>

          {/* Settings */}
          <Button className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 text-white">
            <Settings className="w-6 h-6" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 flex justify-center space-x-4">
          <Badge className="bg-white/20 text-white border-white/30">
            Video Quality: HD
          </Badge>
          <Badge
            className={`${isAudioOn ? "bg-herbal" : "bg-soft-red"} text-white`}
          >
            {isAudioOn ? "Mic On" : "Mic Off"}
          </Badge>
          <Badge
            className={`${isVideoOn ? "bg-herbal" : "bg-soft-red"} text-white`}
          >
            {isVideoOn ? "Video On" : "Video Off"}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
