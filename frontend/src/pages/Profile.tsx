import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Save,
  Camera,
  Shield,
  Bell,
  Smartphone,
  UserCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "Rural Area, India",
    dateOfBirth: "1990-01-01",
    gender: "Male",
    emergencyContact: "+91 9876543210",
    bloodGroup: "O+",
    allergies: "None",
    medicalHistory: "No major medical history",
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log("Saving profile:", editedProfile);
    setIsEditing(false);
  };

  const stats = [
    { label: "Consultations", value: "12", icon: UserCheck },
    { label: "Days Active", value: "45", icon: Calendar },
    { label: "Health Score", value: "85%", icon: Shield },
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
                <h1 className="text-lg font-bold text-indigo">Profile</h1>
                <p className="text-xs text-indigo/70">Manage your account</p>
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
          {/* Profile Header */}
          <Card className="border-gray-border shadow-lg">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="bg-herbal text-white text-3xl">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-coral hover:bg-coral-600 text-white p-0"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-center md:text-left flex-1">
                  <h2 className="text-2xl font-bold text-indigo">
                    {user?.name}
                  </h2>
                  <p className="text-indigo/70">{user?.email}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                    <Badge className="bg-herbal-50 text-herbal border-herbal">
                      Active User
                    </Badge>
                    <Badge className="bg-gender-blue-50 text-gender-blue border-gender-blue">
                      Verified
                    </Badge>
                  </div>
                </div>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`${
                    isEditing
                      ? "bg-herbal hover:bg-herbal-600"
                      : "bg-coral hover:bg-coral-600"
                  } text-white`}
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="border-gray-border">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-herbal-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-herbal" />
                  </div>
                  <p className="text-2xl font-bold text-indigo">{stat.value}</p>
                  <p className="text-sm text-indigo/70">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Personal Information */}
          <Card className="border-gray-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-indigo flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={editedProfile.name}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        name: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        email: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={editedProfile.phone}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        phone: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={editedProfile.dateOfBirth}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        dateOfBirth: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Input
                    id="gender"
                    value={editedProfile.gender}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        gender: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Input
                    id="bloodGroup"
                    value={editedProfile.bloodGroup}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        bloodGroup: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={editedProfile.address}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      address: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="border-gray-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-indigo flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Emergency Contact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="emergencyContact">
                  Emergency Contact Number
                </Label>
                <Input
                  id="emergencyContact"
                  value={editedProfile.emergencyContact}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      emergencyContact: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card className="border-gray-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-indigo flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Medical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea
                  id="allergies"
                  value={editedProfile.allergies}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      allergies: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className="mt-1"
                  placeholder="List any known allergies"
                />
              </div>
              <div>
                <Label htmlFor="medicalHistory">Medical History</Label>
                <Textarea
                  id="medicalHistory"
                  value={editedProfile.medicalHistory}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      medicalHistory: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className="mt-1"
                  placeholder="Describe any relevant medical history"
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button for Mobile */}
          {isEditing && (
            <div className="md:hidden">
              <Button
                onClick={handleSave}
                className="w-full bg-herbal hover:bg-herbal-600 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4">
            <Link to="/doctors">
              <Button
                variant="outline"
                className="w-full border-herbal text-herbal hover:bg-herbal-50"
              >
                <UserCheck className="w-4 h-4 mr-2" />
                Find Doctors
              </Button>
            </Link>
            <Link to="/pricing">
              <Button
                variant="outline"
                className="w-full border-coral text-coral hover:bg-coral-50"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                View Pricing
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                variant="outline"
                className="w-full border-gender-blue text-gender-blue hover:bg-gender-blue-50"
              >
                <Bell className="w-4 h-4 mr-2" />
                Health Assistant
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
