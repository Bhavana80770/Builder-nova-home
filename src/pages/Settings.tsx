import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Heart,
  ArrowLeft,
  Settings as SettingsIcon,
  Bell,
  Shield,
  Smartphone,
  Globe,
  Volume2,
  Moon,
  Sun,
  Wifi,
  Database,
  HelpCircle,
  Mail,
  Phone,
  Trash2,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Settings = () => {
  const { user, logout } = useAuth();
  const [settings, setSettings] = useState({
    notifications: {
      push: true,
      email: true,
      sms: false,
      appointments: true,
      healthTips: true,
      emergency: true,
    },
    privacy: {
      shareData: false,
      analytics: true,
      location: true,
      voiceRecording: true,
    },
    preferences: {
      theme: "light",
      language: "en",
      voiceSpeed: "normal",
      autoCall: false,
      offlineMode: false,
    },
  });

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  const languages = [
    { value: "en", label: "English" },
    { value: "hi", label: "हिन्दी (Hindi)" },
    { value: "bn", label: "বাংলা (Bengali)" },
    { value: "ta", label: "தமிழ் (Tamil)" },
    { value: "te", label: "తెలుగు (Telugu)" },
  ];

  return (
    <div className="min-h-screen bg-sand">
      {/* Header */}
      <header className="border-b border-gray-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link
                to="/dashboard"
                className="p-2 hover:bg-sand rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-indigo" />
              </Link>
              <div className="w-8 h-8 bg-herbal rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-indigo">Settings</h1>
                <p className="text-xs text-indigo/70">App preferences</p>
              </div>
            </div>
            <Button onClick={logout} variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Notifications */}
          <Card className="border-gray-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-indigo flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-indigo/70">
                    Receive notifications on your device
                  </p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={settings.notifications.push}
                  onCheckedChange={(checked) =>
                    updateSetting("notifications", "push", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-indigo/70">
                    Receive updates via email
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) =>
                    updateSetting("notifications", "email", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-indigo/70">
                    Receive important updates via SMS
                  </p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={settings.notifications.sms}
                  onCheckedChange={(checked) =>
                    updateSetting("notifications", "sms", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="appointment-reminders">
                    Appointment Reminders
                  </Label>
                  <p className="text-sm text-indigo/70">
                    Get reminded about upcoming consultations
                  </p>
                </div>
                <Switch
                  id="appointment-reminders"
                  checked={settings.notifications.appointments}
                  onCheckedChange={(checked) =>
                    updateSetting("notifications", "appointments", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="health-tips">Daily Health Tips</Label>
                  <p className="text-sm text-indigo/70">
                    Receive daily health and wellness tips
                  </p>
                </div>
                <Switch
                  id="health-tips"
                  checked={settings.notifications.healthTips}
                  onCheckedChange={(checked) =>
                    updateSetting("notifications", "healthTips", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emergency-alerts">Emergency Alerts</Label>
                  <p className="text-sm text-indigo/70">
                    Critical health and safety notifications
                  </p>
                  <Badge className="bg-soft-red-50 text-soft-red border-soft-red mt-1">
                    Recommended
                  </Badge>
                </div>
                <Switch
                  id="emergency-alerts"
                  checked={settings.notifications.emergency}
                  onCheckedChange={(checked) =>
                    updateSetting("notifications", "emergency", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="border-gray-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-indigo flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="share-data">Share Health Data</Label>
                  <p className="text-sm text-indigo/70">
                    Help improve healthcare by sharing anonymous data
                  </p>
                </div>
                <Switch
                  id="share-data"
                  checked={settings.privacy.shareData}
                  onCheckedChange={(checked) =>
                    updateSetting("privacy", "shareData", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analytics">Usage Analytics</Label>
                  <p className="text-sm text-indigo/70">
                    Allow collection of app usage data
                  </p>
                </div>
                <Switch
                  id="analytics"
                  checked={settings.privacy.analytics}
                  onCheckedChange={(checked) =>
                    updateSetting("privacy", "analytics", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="location">Location Services</Label>
                  <p className="text-sm text-indigo/70">
                    Allow location access for nearby doctors
                  </p>
                </div>
                <Switch
                  id="location"
                  checked={settings.privacy.location}
                  onCheckedChange={(checked) =>
                    updateSetting("privacy", "location", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="voice-recording">Voice Recording</Label>
                  <p className="text-sm text-indigo/70">
                    Allow voice recording for consultations
                  </p>
                </div>
                <Switch
                  id="voice-recording"
                  checked={settings.privacy.voiceRecording}
                  onCheckedChange={(checked) =>
                    updateSetting("privacy", "voiceRecording", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* App Preferences */}
          <Card className="border-gray-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-indigo flex items-center">
                <Smartphone className="w-5 h-5 mr-2" />
                App Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <p className="text-sm text-indigo/70">
                    Choose app appearance
                  </p>
                </div>
                <Select
                  value={settings.preferences.theme}
                  onValueChange={(value) =>
                    updateSetting("preferences", "theme", value)
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center">
                        <Sun className="w-4 h-4 mr-2" />
                        Light
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center">
                        <Moon className="w-4 h-4 mr-2" />
                        Dark
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <p className="text-sm text-indigo/70">
                    Choose your preferred language
                  </p>
                </div>
                <Select
                  value={settings.preferences.language}
                  onValueChange={(value) =>
                    updateSetting("preferences", "language", value)
                  }
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        <div className="flex items-center">
                          <Globe className="w-4 h-4 mr-2" />
                          {lang.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="voice-speed">Voice Speed</Label>
                  <p className="text-sm text-indigo/70">
                    Adjust AI voice speaking speed
                  </p>
                </div>
                <Select
                  value={settings.preferences.voiceSpeed}
                  onValueChange={(value) =>
                    updateSetting("preferences", "voiceSpeed", value)
                  }
                >
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slow">Slow</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="fast">Fast</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-call">Auto Emergency Call</Label>
                  <p className="text-sm text-indigo/70">
                    Automatically call 108 for severe emergencies
                  </p>
                </div>
                <Switch
                  id="auto-call"
                  checked={settings.preferences.autoCall}
                  onCheckedChange={(checked) =>
                    updateSetting("preferences", "autoCall", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="offline-mode">Offline Mode</Label>
                  <p className="text-sm text-indigo/70">
                    Enable basic features without internet
                  </p>
                </div>
                <Switch
                  id="offline-mode"
                  checked={settings.preferences.offlineMode}
                  onCheckedChange={(checked) =>
                    updateSetting("preferences", "offlineMode", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Support & Help */}
          <Card className="border-gray-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-indigo flex items-center">
                <HelpCircle className="w-5 h-5 mr-2" />
                Support & Help
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="border-herbal text-herbal hover:bg-herbal-50"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help Center
                </Button>
                <Button
                  variant="outline"
                  className="border-coral text-coral hover:bg-coral-50"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="border-gender-blue text-gender-blue hover:bg-gender-blue-50"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Support
                </Button>
                <Button
                  variant="outline"
                  className="border-gender-pink text-gender-pink hover:bg-gender-pink-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-soft-red-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-soft-red flex items-center">
                <Trash2 className="w-5 h-5 mr-2" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-soft-red-50 border border-soft-red-200 rounded-lg">
                <h4 className="font-medium text-soft-red mb-2">
                  Delete Account
                </h4>
                <p className="text-sm text-indigo/70 mb-4">
                  Permanently delete your account and all associated data. This
                  action cannot be undone.
                </p>
                <Button
                  variant="outline"
                  className="border-soft-red text-soft-red hover:bg-soft-red hover:text-white"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* App Info */}
          <Card className="border-gray-border">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-herbal rounded-lg flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-indigo mb-2">
                AarogyaMitra
              </h3>
              <p className="text-sm text-indigo/70 mb-4">
                Version 1.0.0 • Your trusted rural health companion
              </p>
              <div className="flex justify-center gap-2">
                <Badge className="bg-herbal-50 text-herbal border-herbal">
                  AI Powered
                </Badge>
                <Badge className="bg-coral-50 text-coral border-coral">
                  Rural Focused
                </Badge>
                <Badge className="bg-gender-blue-50 text-gender-blue border-gender-blue">
                  24/7 Support
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
