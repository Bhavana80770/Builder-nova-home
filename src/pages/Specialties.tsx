import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ArrowLeft,
  Activity,
  Brain,
  Shield,
  Baby,
  Bone,
  Eye,
  Users,
  Stethoscope,
  Zap,
  HeartHandshake,
  Clock,
  Award,
  Phone,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";

const Specialties = () => {
  const specialties = [
    {
      name: "Cardiology",
      icon: Heart,
      color: "bg-red-100 text-red-600 border-red-200",
      bgColor: "bg-red-50",
      description:
        "Comprehensive heart care including diagnosis, treatment, and prevention of cardiovascular diseases.",
      services: [
        "Cardiac Catheterization",
        "Echocardiography",
        "Stress Testing",
        "Heart Surgery",
        "Pacemaker Implantation",
      ],
      doctors: 25,
      patients: "15,000+",
      emergencyAvailable: true,
    },
    {
      name: "Neurology",
      icon: Brain,
      color: "bg-purple-100 text-purple-600 border-purple-200",
      bgColor: "bg-purple-50",
      description:
        "Advanced neurological care for brain, spinal cord, and nervous system disorders.",
      services: [
        "Stroke Treatment",
        "Epilepsy Management",
        "Memory Disorders",
        "Migraine Treatment",
        "Neurosurgery",
      ],
      doctors: 18,
      patients: "8,500+",
      emergencyAvailable: true,
    },
    {
      name: "Oncology",
      icon: Shield,
      color: "bg-green-100 text-green-600 border-green-200",
      bgColor: "bg-green-50",
      description:
        "Comprehensive cancer care with advanced treatment options and supportive care.",
      services: [
        "Chemotherapy",
        "Radiation Therapy",
        "Surgical Oncology",
        "Immunotherapy",
        "Palliative Care",
      ],
      doctors: 22,
      patients: "5,200+",
      emergencyAvailable: false,
    },
    {
      name: "Pediatrics",
      icon: Baby,
      color: "bg-blue-100 text-blue-600 border-blue-200",
      bgColor: "bg-blue-50",
      description:
        "Specialized healthcare for infants, children, and adolescents with compassionate care.",
      services: [
        "Newborn Care",
        "Vaccination Programs",
        "Growth & Development",
        "Pediatric Surgery",
        "Child Psychology",
      ],
      doctors: 30,
      patients: "12,000+",
      emergencyAvailable: true,
    },
    {
      name: "Orthopedics",
      icon: Bone,
      color: "bg-orange-100 text-orange-600 border-orange-200",
      bgColor: "bg-orange-50",
      description:
        "Expert care for bones, joints, muscles, and sports-related injuries.",
      services: [
        "Joint Replacement",
        "Sports Medicine",
        "Spine Surgery",
        "Arthroscopy",
        "Trauma Care",
      ],
      doctors: 20,
      patients: "10,500+",
      emergencyAvailable: true,
    },
    {
      name: "Ophthalmology",
      icon: Eye,
      color: "bg-teal-100 text-teal-600 border-teal-200",
      bgColor: "bg-teal-50",
      description:
        "Complete eye care services from routine checkups to complex eye surgeries.",
      services: [
        "Cataract Surgery",
        "Retina Treatment",
        "Glaucoma Management",
        "LASIK Surgery",
        "Pediatric Ophthalmology",
      ],
      doctors: 15,
      patients: "7,800+",
      emergencyAvailable: false,
    },
    {
      name: "Gastroenterology",
      icon: Zap,
      color: "bg-yellow-100 text-yellow-600 border-yellow-200",
      bgColor: "bg-yellow-50",
      description:
        "Digestive system care including stomach, liver, and intestinal disorders.",
      services: [
        "Endoscopy",
        "Liver Treatment",
        "IBS Management",
        "Colonoscopy",
        "Hepatitis Care",
      ],
      doctors: 12,
      patients: "6,200+",
      emergencyAvailable: true,
    },
    {
      name: "Dermatology",
      icon: HeartHandshake,
      color: "bg-pink-100 text-pink-600 border-pink-200",
      bgColor: "bg-pink-50",
      description:
        "Comprehensive skin, hair, and nail care with cosmetic and medical treatments.",
      services: [
        "Skin Cancer Screening",
        "Acne Treatment",
        "Hair Loss Treatment",
        "Cosmetic Procedures",
        "Allergy Testing",
      ],
      doctors: 10,
      patients: "9,500+",
      emergencyAvailable: false,
    },
    {
      name: "General Medicine",
      icon: Stethoscope,
      color: "bg-indigo-100 text-indigo-600 border-indigo-200",
      bgColor: "bg-indigo-50",
      description:
        "Primary healthcare and management of common medical conditions.",
      services: [
        "Preventive Care",
        "Chronic Disease Management",
        "Health Screenings",
        "Vaccination",
        "General Consultation",
      ],
      doctors: 35,
      patients: "25,000+",
      emergencyAvailable: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-blue-900">AarogyaMitra</h1>
            </div>
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              Medical Specialties
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access world-class specialists across all major medical fields
              with comprehensive care and advanced treatment options.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <div className="text-3xl font-bold text-blue-900 mb-1">200+</div>
              <div className="text-sm text-gray-600">Specialist Doctors</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <div className="text-3xl font-bold text-blue-900 mb-1">9</div>
              <div className="text-sm text-gray-600">Major Specialties</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <div className="text-3xl font-bold text-blue-900 mb-1">100K+</div>
              <div className="text-sm text-gray-600">Patients Treated</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <div className="text-3xl font-bold text-blue-900 mb-1">24/7</div>
              <div className="text-sm text-gray-600">Emergency Care</div>
            </div>
          </div>

          {/* Specialties Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {specialties.map((specialty, index) => (
              <Card
                key={index}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${specialty.bgColor}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div
                        className={`w-16 h-16 rounded-xl flex items-center justify-center mr-4 ${specialty.color.split(" ")[0]} ${specialty.color.split(" ")[1]}`}
                      >
                        <specialty.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <CardTitle className="text-blue-900 text-xl mb-1">
                          {specialty.name}
                        </CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {specialty.doctors} Doctors
                          </span>
                          <span className="flex items-center">
                            <Activity className="w-3 h-3 mr-1" />
                            {specialty.patients} Patients
                          </span>
                        </div>
                      </div>
                    </div>
                    {specialty.emergencyAvailable && (
                      <Badge className="bg-red-100 text-red-700 border-red-200">
                        <Clock className="w-3 h-3 mr-1" />
                        24/7
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{specialty.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Services:
                    </h4>
                    <div className="grid grid-cols-1 gap-1">
                      {specialty.services.map((service, serviceIndex) => (
                        <div
                          key={serviceIndex}
                          className="text-sm text-gray-600"
                        >
                          • {service}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/doctors" className="flex-1">
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        size="sm"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Find Doctor
                      </Button>
                    </Link>
                    <Link to="/phone-verification" className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                        size="sm"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Appointment
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Emergency Services */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mb-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-red-900 mb-4">
                Emergency Services
              </h2>
              <p className="text-xl text-red-700 mb-6">
                24/7 emergency care available for critical medical situations
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="font-semibold text-red-900">Cardiology</div>
                  <div className="text-sm text-red-700">Heart Emergencies</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-red-900">Neurology</div>
                  <div className="text-sm text-red-700">Stroke & Brain</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-red-900">Pediatrics</div>
                  <div className="text-sm text-red-700">Child Emergencies</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-red-900">Orthopedics</div>
                  <div className="text-sm text-red-700">Trauma & Injuries</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Emergency - 108
                </Button>
                <Link to="/emergency">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-50"
                  >
                    Emergency Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Why Choose Our Specialists */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
              Why Choose Our Specialists
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  Expert Qualifications
                </h3>
                <p className="text-gray-600">
                  Board-certified specialists with years of experience and
                  international training
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  Advanced Technology
                </h3>
                <p className="text-gray-600">
                  State-of-the-art medical equipment and latest treatment
                  methodologies
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeartHandshake className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  Personalized Care
                </h3>
                <p className="text-gray-600">
                  Individualized treatment plans tailored to each patient's
                  unique needs
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Need Specialist Care?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Connect with our expert specialists for comprehensive medical care
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/doctors">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Find Specialist
                </Button>
              </Link>
              <Link to="/phone-verification">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Book Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialties;
