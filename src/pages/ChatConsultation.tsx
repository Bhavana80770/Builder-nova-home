import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Heart,
  ArrowLeft,
  Send,
  Paperclip,
  Mic,
  MoreVertical,
  CheckCheck,
  Clock,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: string;
  text: string;
  sender: "user" | "doctor";
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}

const ChatConsultation = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("doctorId");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock doctor data
  const doctor = {
    id: doctorId || "1",
    name: "Dr. Priya Sharma",
    specialization: "General Physician",
    isOnline: true,
  };

  useEffect(() => {
    // Initial messages
    const initialMessages: Message[] = [
      {
        id: "1",
        text: "Hello! I'm Dr. Priya Sharma. I'm here to help you with your health concerns. How are you feeling today?",
        sender: "doctor",
        timestamp: new Date(Date.now() - 60000),
        status: "read",
      },
      {
        id: "2",
        text: "Please feel free to describe your symptoms in detail, and I'll do my best to help you.",
        sender: "doctor",
        timestamp: new Date(Date.now() - 50000),
        status: "read",
      },
    ];
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    // Simulate doctor typing
    setTimeout(() => {
      setIsTyping(true);
    }, 1000);

    // Simulate doctor response
    setTimeout(() => {
      setIsTyping(false);
      const doctorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateDoctorResponse(message),
        sender: "doctor",
        timestamp: new Date(),
        status: "read",
      };
      setMessages((prev) => [...prev, doctorResponse]);
    }, 3000);
  };

  const generateDoctorResponse = (userMessage: string) => {
    const responses = [
      "Thank you for sharing that information. Can you tell me how long you've been experiencing these symptoms?",
      "I understand your concern. Based on what you've described, I'd like to ask a few more questions to better assess your condition.",
      "That's helpful information. Have you noticed any triggers that make the symptoms worse or better?",
      "I see. Are you currently taking any medications or have you tried any treatments for this?",
      "Based on your symptoms, I recommend some initial steps. However, I'd also suggest scheduling an in-person examination if symptoms persist.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-sand flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-border bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link
                to="/doctors"
                className="p-2 hover:bg-sand rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-indigo" />
              </Link>
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-herbal text-white">
                  {doctor.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg font-bold text-indigo">{doctor.name}</h1>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${doctor.isOnline ? "bg-herbal" : "bg-gray-400"}`}
                  ></div>
                  <p className="text-xs text-indigo/70">
                    {doctor.isOnline ? "Online" : "Last seen 5 min ago"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-coral-50 text-coral border-coral-100">
                Chat Consultation
              </Badge>
              <Button variant="outline" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] ${
                    msg.sender === "user"
                      ? "bg-herbal text-white"
                      : "bg-white border border-gray-border"
                  } rounded-2xl px-4 py-3`}
                >
                  <p
                    className={
                      msg.sender === "user" ? "text-white" : "text-indigo"
                    }
                  >
                    {msg.text}
                  </p>
                  <div
                    className={`flex items-center justify-end mt-2 space-x-1 ${
                      msg.sender === "user" ? "text-white/70" : "text-indigo/50"
                    }`}
                  >
                    <span className="text-xs">{formatTime(msg.timestamp)}</span>
                    {msg.sender === "user" && (
                      <div className="flex">
                        {msg.status === "sent" && <Clock className="w-3 h-3" />}
                        {msg.status === "delivered" && (
                          <CheckCheck className="w-3 h-3" />
                        )}
                        {msg.status === "read" && (
                          <CheckCheck className="w-3 h-3 text-herbal-200" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-border rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-indigo/40 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-indigo/40 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-indigo/40 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="border-t border-gray-border bg-white p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="border-gray-border focus:border-herbal focus:ring-herbal pr-12 py-3 resize-none"
                  multiline
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo/60 hover:text-herbal"
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="border-herbal text-herbal hover:bg-herbal-50 p-3"
              >
                <Mic className="w-4 h-4" />
              </Button>

              <Button
                onClick={sendMessage}
                disabled={!message.trim()}
                className="bg-herbal hover:bg-herbal-600 text-white p-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Quick Responses */}
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMessage("I have a headache")}
                className="text-xs border-coral text-coral hover:bg-coral-50"
              >
                I have a headache
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMessage("I'm feeling feverish")}
                className="text-xs border-coral text-coral hover:bg-coral-50"
              >
                I'm feeling feverish
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMessage("Thank you doctor")}
                className="text-xs border-herbal text-herbal hover:bg-herbal-50"
              >
                Thank you doctor
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-herbal-50 border-t border-herbal-100 p-3">
        <div className="max-w-4xl mx-auto flex justify-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            className="border-herbal text-herbal"
          >
            Share Symptoms
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-gender-blue text-gender-blue"
          >
            Request Video Call
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-coral text-coral"
          >
            End Consultation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatConsultation;
