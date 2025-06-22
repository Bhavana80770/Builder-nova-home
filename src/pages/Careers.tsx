import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ArrowLeft,
  Users,
  MapPin,
  Clock,
  DollarSign,
  Award,
  Building,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";

const Careers = () => {
  const jobOpenings = [
    {
      title: "Senior Frontend Developer",
      department: "Technology",
      location: "Hyderabad / Remote",
      type: "Full-time",
      experience: "3-5 years",
      salary: "₹8-15 LPA",
    },
    {
      title: "General Physician",
      department: "Medical",
      location: "Mumbai",
      type: "Full-time",
      experience: "2+ years",
      salary: "₹12-20 LPA",
    },
    {
      title: "AI/ML Engineer",
      department: "Technology",
      location: "Bangalore / Remote",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹10-18 LPA",
    },
    {
      title: "Telemedicine Coordinator",
      department: "Operations",
      location: "Delhi",
      type: "Full-time",
      experience: "1-3 years",
      salary: "₹5-8 LPA",
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Pune / Remote",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹6-12 LPA",
    },
    {
      title: "Medical Content Writer",
      department: "Content",
      location: "Remote",
      type: "Contract",
      experience: "1-2 years",
      salary: "₹4-7 LPA",
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
              Join Our Mission
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Be part of revolutionizing healthcare in India. Join AarogyaMitra
              and help us make quality healthcare accessible to everyone.
            </p>
          </div>

          {/* Why Work With Us */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                Make a Difference
              </h3>
              <p className="text-gray-600">
                Work on meaningful projects that directly impact people's lives
                and improve healthcare accessibility across India.
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                Collaborative Culture
              </h3>
              <p className="text-gray-600">
                Join a diverse team of passionate professionals who believe in
                innovation, collaboration, and continuous learning.
              </p>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                Growth Opportunities
              </h3>
              <p className="text-gray-600">
                Advance your career with comprehensive training, mentorship
                programs, and opportunities to lead innovative projects.
              </p>
            </Card>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
              Why Choose AarogyaMitra
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-blue-900 mb-1">
                  Competitive Salary
                </h4>
                <p className="text-sm text-gray-600">
                  Industry-leading compensation packages
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-blue-900 mb-1">
                  Health Benefits
                </h4>
                <p className="text-sm text-gray-600">
                  Comprehensive medical coverage for you and family
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-blue-900 mb-1">
                  Work-Life Balance
                </h4>
                <p className="text-sm text-gray-600">
                  Flexible working hours and remote options
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-blue-900 mb-1">
                  Learning & Development
                </h4>
                <p className="text-sm text-gray-600">
                  Continuous learning and skill development programs
                </p>
              </div>
            </div>
          </div>

          {/* Job Openings */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
              Current Openings
            </h2>
            <div className="space-y-6">
              {jobOpenings.map((job, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-semibold text-blue-900 mr-3">
                            {job.title}
                          </h3>
                          <Badge className="bg-blue-100 text-blue-800">
                            {job.department}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-4 lg:mb-0">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {job.type}
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {job.experience}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {job.salary}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4 lg:mt-0">
                        <Button
                          variant="outline"
                          className="border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                          View Details
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Application Process
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-2">Apply Online</h4>
                <p className="text-blue-100 text-sm">
                  Submit your application through our careers portal
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-2">Initial Screening</h4>
                <p className="text-blue-100 text-sm">
                  Our HR team will review your application and profile
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-2">Interview Process</h4>
                <p className="text-blue-100 text-sm">
                  Technical and cultural fit interviews with our team
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold">4</span>
                </div>
                <h4 className="font-semibold mb-2">Welcome Aboard</h4>
                <p className="text-blue-100 text-sm">
                  Join our team and start making a difference
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Ready to Join Our Team?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Don't see a position that fits? Send us your resume and we'll keep
              you in mind for future opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Submit Resume
              </Button>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Contact HR
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
