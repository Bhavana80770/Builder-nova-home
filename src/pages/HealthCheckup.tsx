import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ArrowLeft,
  Shield,
  Users,
  Clock,
  CheckCircle,
  Star,
  Calendar,
  FileText,
  Activity,
  Eye,
  Brain,
  Bone,
  Baby,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const HealthCheckup = () => {
  const checkupPackages = [
    {
      name: "Basic Health Checkup",
      price: "₹2,999",
      originalPrice: "₹4,500",
      duration: "2-3 hours",
      tests: 25,
      category: "Essential",
      color: "bg-green-100 text-green-800 border-green-200",
      popular: false,
      features: [
        "Complete Blood Count (CBC)",
        "Lipid Profile",
        "Blood Sugar (Fasting & PP)",
        "Kidney Function Test",
        "Liver Function Test",
        "Thyroid Function (TSH)",
        "Urine Analysis",
        "ECG",
        "Chest X-Ray",
        "BMI & Blood Pressure",
      ],
      suitableFor: "Ages 18-40, Annual checkup",
    },
    {
      name: "Comprehensive Health Checkup",
      price: "₹5,999",
      originalPrice: "₹8,500",
      duration: "4-5 hours",
      tests: 45,
      category: "Recommended",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      popular: true,
      features: [
        "All Basic Checkup tests",
        "Cardiac Risk Assessment",
        "Diabetes Panel (HbA1c)",
        "Vitamin D & B12",
        "Iron Studies",
        "Tumor Markers (Basic)",
        "2D Echo",
        "Ultrasound Abdomen",
        "Consultation with Physician",
        "Diet & Lifestyle Counseling",
      ],
      suitableFor: "Ages 40+, Family history concerns",
    },
    {
      name: "Executive Health Checkup",
      price: "₹12,999",
      originalPrice: "₹18,000",
      duration: "Full day",
      tests: 75,
      category: "Premium",
      color: "bg-purple-100 text-purple-800 border-purple-200",
      popular: false,
      features: [
        "All Comprehensive tests",
        "Full Body MRI Scan",
        "CT Coronary Angiography",
        "Advanced Tumor Markers",
        "Pulmonary Function Test",
        "Stress Test (TMT)",
        "Eye Examination",
        "Bone Density Scan",
        "Specialist Consultations (3)",
        "Detailed Health Report",
      ],
      suitableFor: "Executives, High-stress jobs",
    },
    {
      name: "Women's Health Checkup",
      price: "₹4,999",
      originalPrice: "₹7,000",
      duration: "3-4 hours",
      tests: 35,
      category: "Specialized",
      color: "bg-pink-100 text-pink-800 border-pink-200",
      popular: false,
      features: [
        "Basic Health Panel",
        "Gynecological Examination",
        "Pap Smear",
        "Mammography/Breast Ultrasound",
        "Pelvic Ultrasound",
        "Hormone Panel",
        "Bone Health Assessment",
        "Iron & Calcium Studies",
        "Gynecologist Consultation",
        "Women's Wellness Counseling",
      ],
      suitableFor: "Women 25+, Reproductive health",
    },
    {
      name: "Senior Citizen Checkup",
      price: "₹7,999",
      originalPrice: "₹11,000",
      duration: "5-6 hours",
      tests: 55,
      category: "Age-specific",
      color: "bg-orange-100 text-orange-800 border-orange-200",
      popular: false,
      features: [
        "Comprehensive Health Panel",
        "Cardiac Assessment (detailed)",
        "Diabetes & Complications",
        "Kidney & Liver Function",
        "Bone & Joint Health",
        "Memory & Cognitive Test",
        "Vision & Hearing Test",
        "Prostate (Men)/Gynec (Women)",
        "Geriatrician Consultation",
        "Age-appropriate Guidance",
      ],
      suitableFor: "Ages 60+, Regular monitoring",
    },
    {
      name: "Corporate Health Checkup",
      price: "₹3,999",
      originalPrice: "₹6,000",
      duration: "3 hours",
      tests: 30,
      category: "Group",
      color: "bg-indigo-100 text-indigo-800 border-indigo-200",
      popular: false,
      features: [
        "Essential Health Tests",
        "Stress & Lifestyle Assessment",
        "Fitness Evaluation",
        "Vision & Hearing Check",
        "Ergonomic Assessment",
        "Mental Health Screening",
        "Vaccination Status",
        "Work-related Health Risks",
        "Occupational Medicine Consult",
        "Corporate Wellness Report",
      ],
      suitableFor: "Corporate employees, Teams",
    },
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: "NABL Accredited Lab",
      description: "Quality assured with international standards",
    },
    {
      icon: Users,
      title: "Expert Doctors",
      description: "Consultation with qualified specialists",
    },
    {
      icon: Clock,
      title: "Same Day Reports",
      description: "Fast and accurate test results",
    },
    {
      icon: Heart,
      title: "Comprehensive Care",
      description: "Complete health assessment & guidance",
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
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              Health Checkup Packages
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive health screening packages designed for early
              detection and prevention. Choose the right package for your health
              needs.
            </p>
            <div className="flex justify-center items-center mt-6 space-x-4">
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="ml-2 text-gray-600 text-sm">
                  4.9/5 (2,500+ reviews)
                </span>
              </div>
              <Badge className="bg-green-100 text-green-800">
                NABL Accredited
              </Badge>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </Card>
            ))}
          </div>

          {/* Checkup Packages */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
              Choose Your Health Checkup Package
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {checkupPackages.map((pkg, index) => (
                <Card
                  key={index}
                  className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative ${
                    pkg.popular ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <CardTitle className="text-blue-900 text-xl mb-2">
                          {pkg.name}
                        </CardTitle>
                        <Badge className={pkg.color}>{pkg.category}</Badge>
                      </div>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-blue-900">
                        {pkg.price}
                      </span>
                      <span className="text-lg text-gray-500 line-through ml-2">
                        {pkg.originalPrice}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {pkg.duration}
                      </span>
                      <span className="flex items-center">
                        <FileText className="w-3 h-3 mr-1" />
                        {pkg.tests} tests
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4 p-2 bg-gray-50 rounded">
                      <strong>Suitable for:</strong> {pkg.suitableFor}
                    </p>
                    <div className="mb-6">
                      <h4 className="font-semibold text-blue-900 mb-3">
                        Includes:
                      </h4>
                      <ul className="space-y-1">
                        {pkg.features
                          .slice(0, 6)
                          .map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        {pkg.features.length > 6 && (
                          <li className="text-sm text-blue-600 font-medium">
                            +{pkg.features.length - 6} more tests included
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <Link to="/phone-verification">
                        <Button
                          className={`w-full ${
                            pkg.popular
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "bg-gray-800 hover:bg-gray-900"
                          } text-white`}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Now
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Process Steps */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
              Simple 4-Step Process
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  Choose Package
                </h3>
                <p className="text-sm text-gray-600">
                  Select the health checkup package that suits your needs
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  Book Appointment
                </h3>
                <p className="text-sm text-gray-600">
                  Schedule your convenient date and time for the checkup
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  Complete Tests
                </h3>
                <p className="text-sm text-gray-600">
                  Visit our center for sample collection and examinations
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">4</span>
                </div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  Get Reports
                </h3>
                <p className="text-sm text-gray-600">
                  Receive detailed reports with doctor consultation
                </p>
              </div>
            </div>
          </div>

          {/* Specialty Focus Areas */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
              Specialized Health Screenings
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Heart,
                  name: "Cardiac Health",
                  description: "Heart & cardiovascular screening",
                  color: "bg-red-100 text-red-600",
                },
                {
                  icon: Brain,
                  name: "Neurological",
                  description: "Brain & nervous system health",
                  color: "bg-purple-100 text-purple-600",
                },
                {
                  icon: Eye,
                  name: "Vision Care",
                  description: "Comprehensive eye examination",
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  icon: Bone,
                  name: "Bone Health",
                  description: "Bone density & joint health",
                  color: "bg-orange-100 text-orange-600",
                },
                {
                  icon: Baby,
                  name: "Women's Health",
                  description: "Gynecological & reproductive health",
                  color: "bg-pink-100 text-pink-600",
                },
                {
                  icon: Zap,
                  name: "Diabetes Care",
                  description: "Blood sugar & complications",
                  color: "bg-yellow-100 text-yellow-600",
                },
                {
                  icon: Activity,
                  name: "Fitness Assessment",
                  description: "Physical fitness & performance",
                  color: "bg-green-100 text-green-600",
                },
                {
                  icon: Shield,
                  name: "Cancer Screening",
                  description: "Early detection & prevention",
                  color: "bg-indigo-100 text-indigo-600",
                },
              ].map((specialty, index) => (
                <Card
                  key={index}
                  className="text-center p-4 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${specialty.color}`}
                  >
                    <specialty.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-blue-900 mb-1">
                    {specialty.name}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {specialty.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Invest in Your Health Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Early detection can save lives. Book your health checkup now and
              take the first step towards a healthier future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/phone-verification">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Book Health Checkup
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Speak to Expert
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthCheckup;
