import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Users, Calendar, CreditCard, BarChart3, CheckCircle, Globe, Shield, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function DemoVideo() {
  const demoSteps = [
    {
      title: "Create Your Account",
      description: "Sign up in minutes and set up your funeral home profile",
      icon: Users,
      duration: "30 seconds"
    },
    {
      title: "Client Management",
      description: "Add clients, manage their information securely",
      icon: Users,
      duration: "1 minute"
    },
    {
      title: "Service Scheduling",
      description: "Schedule services, set dates and manage your calendar",
      icon: Calendar,
      duration: "45 seconds"
    },
    {
      title: "Payment Processing",
      description: "Process payments securely with integrated gateway",
      icon: CreditCard,
      duration: "1 minute"
    },
    {
      title: "Business Analytics",
      description: "Track your performance with detailed reports",
      icon: BarChart3,
      duration: "45 seconds"
    }
  ];

  const features = [
    { icon: Shield, title: "Secure Data", description: "Bank-grade security for all client information" },
    { icon: Globe, title: "Online Presence", description: "Professional website for your funeral home" },
    { icon: FileCheck, title: "Compliance", description: "Built-in regulatory compliance tools" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ReposeLink</span>
          </Link>
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Product Demo</Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              See ReposeLink in Action
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Watch how ReposeLink transforms funeral home management with our intuitive platform
            </p>
          </div>

          {/* Video Player Section */}
          <Card className="border-2 shadow-2xl mb-12">
            <CardContent className="p-0">
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-t-lg">
                <div className="aspect-video flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/30 transition-colors">
                      <Play className="w-8 h-8 ml-1" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">ReposeLink Demo Video</h3>
                    <p className="text-gray-300">Click to watch the full demonstration</p>
                    <Badge variant="secondary" className="mt-4">4:30 minutes</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white rounded-b-lg">
                <h4 className="text-lg font-semibold mb-2">What you'll learn:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    How to set up your funeral home profile
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Managing clients and their information securely
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Processing payments and managing finances
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Using analytics to grow your business
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Demo Steps */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Demo Walkthrough</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demoSteps.map((step, index) => (
                <Card key={index} className="border-2">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <step.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      <Badge variant="outline" className="text-xs">{step.duration}</Badge>
                    </div>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Key Features Highlight */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Why Choose ReposeLink?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="text-center border-2">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="border-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-lg mb-6 opacity-90">
                Join hundreds of funeral homes already using ReposeLink
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth">
                  <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                    Start Free Trial
                  </Button>
                </Link>
                <Link to="/">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}