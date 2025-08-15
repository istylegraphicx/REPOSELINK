import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, CreditCard, Globe, Bell, FileCheck, Star, Users, TrendingUp, BarChart3, Target, Eye, Facebook, Instagram, DollarSign, Building, MapPin, User, Mail, Phone, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function ReposeLink() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    plan: '',
    company: '',
    location: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create email body
    const emailBody = `
New ReposeLink Inquiry:

Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Interested Plan: ${formData.plan}
Company: ${formData.company}
Location: ${formData.location}
Message: ${formData.message}
    `;

    // Create mailto link
    const mailtoLink = `mailto:info@istylegraphicx.co.za?subject=ReposeLink Inquiry from ${formData.fullName}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your inquiry! Your default email client should have opened with your message. Please send the email to complete your request.');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ReposeLink</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Professional <span className="text-blue-600">Funeral Parlour</span> Management Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Streamline your funeral home operations with secure client management, online payments, and professional service delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-lg px-8 py-3">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-2">
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed specifically for funeral parlour professionals
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Business Management</CardTitle>
                <CardDescription>Complete funeral parlour registration and profile management</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Secure Payments</CardTitle>
                <CardDescription>Integrated payment processing for client bookings</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Data Security</CardTitle>
                <CardDescription>Bank-grade security for all sensitive information</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Online Presence</CardTitle>
                <CardDescription>Professional online presence for your funeral home</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Real-time Updates</CardTitle>
                <CardDescription>Instant notifications and real-time data synchronization</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <FileCheck className="w-6 h-6 text-teal-600" />
                </div>
                <CardTitle>Compliance Ready</CardTitle>
                <CardDescription>Built-in terms, policies, and regulatory compliance</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Professionals</h2>
            <p className="text-xl text-gray-600">See what funeral home professionals are saying about ReposeLink</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg text-gray-700 mb-6">
                  "ReposeLink has transformed how we manage our business. The payment integration is seamless."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">SJ</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Johnson</div>
                    <div className="text-gray-600">Funeral Director</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg text-gray-700 mb-6">
                  "Professional, secure, and incredibly user-friendly. Exactly what our industry needed."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">MC</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Michael Chen</div>
                    <div className="text-gray-600">Business Owner</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">Join hundreds of funeral professionals who trust ReposeLink</p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Marketing & Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Marketing & Pricing Solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Grow your funeral parlour business with our comprehensive marketing tools and transparent pricing
            </p>
          </div>

          {/* Marketing Tools */}
          <div className="mb-20">
            <div className="flex items-center justify-center mb-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center mr-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Marketing Tools</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle>Online Presence</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Professional website builder</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> SEO optimization tools</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Google My Business integration</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Social media management</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle>Targeted Advertising</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Facebook & Instagram ads</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Google Ads campaigns</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Local directory listings</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Community outreach tools</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle>Analytics & Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Performance tracking</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Customer insights</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> ROI measurement</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" /> Market analysis</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-20">
            <div className="flex items-center justify-center mb-12">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Transparent Pricing</h3>
            </div>
            <div className="text-center mb-8">
              <Badge variant="secondary" className="text-lg px-4 py-2">14-Day Free Trial</Badge>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-2 relative">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Free Plan</CardTitle>
                  <div className="text-4xl font-bold text-gray-900 mt-4">
                    R0<span className="text-lg font-normal text-gray-600">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /> Basic profile listing</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /> Contact information display</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /> Basic service descriptions</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /> 14-day premium trial</li>
                  </ul>
                  <Button className="w-full mt-6" variant="outline">Start Free Trial</Button>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-blue-500 relative shadow-lg scale-105">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 hover:bg-blue-600">Most Popular</Badge>
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Professional</CardTitle>
                  <div className="text-4xl font-bold text-gray-900 mt-4">
                    R299<span className="text-lg font-normal text-gray-600">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /> Everything in Free</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /> Professional website</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /> Online booking system</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /> Basic marketing tools</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /> Auto payment gateway</li>
                  </ul>
                  <Link to="/payment?plan=professional">
                    <Button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">Choose Professional</Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="border-2 relative">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Premium</CardTitle>
                  <div className="text-4xl font-bold text-gray-900 mt-4">
                    R599<span className="text-lg font-normal text-gray-600">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /> Everything in Professional</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /> Advanced marketing suite</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /> Priority support</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /> Analytics dashboard</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /> Custom branding</li>
                  </ul>
                  <Link to="/payment?plan=premium">
                    <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">Choose Premium</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Payment Gateway */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-20">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Auto Payment Gateway</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-2">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl flex items-center justify-center">
                    <div className="w-8 h-8 bg-blue-600 rounded mr-3 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">P</span>
                    </div>
                    PayPal
                  </CardTitle>
                  <CardDescription>Quick and secure online payments</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 w-full"
                    onClick={() => window.open('https://paypal.me/istylegraphicx', '_blank')}
                  >
                    Pay with PayPal
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Bank Transfer (EFT)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div><strong>Bank:</strong> CAPITEC BANK</div>
                    <div><strong>Account Holder:</strong> iStyle GraphicX (pty) ltd</div>
                    <div><strong>Account Type:</strong> Transact</div>
                    <div><strong>Account No:</strong> 1052 1683 53</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Started Today</h2>
            </div>
            <Card className="border-2 shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <Input 
                        placeholder="Enter your full name" 
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <Input 
                        type="email" 
                        placeholder="Enter your email" 
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <Input 
                        placeholder="Enter your phone number" 
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Interested Plan</label>
                      <Select value={formData.plan} onValueChange={(value) => handleInputChange('plan', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a plan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="free">Free Plan</SelectItem>
                          <SelectItem value="professional">Professional - R299/month</SelectItem>
                          <SelectItem value="premium">Premium - R599/month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                      <Input 
                        placeholder="Enter your company name" 
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <Input 
                        placeholder="Enter your location" 
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <Textarea 
                      placeholder="Tell us about your needs..." 
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-lg py-3"
                    disabled={isSubmitting}
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    {isSubmitting ? "Submitting..." : "Request Information"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-xl font-bold">ReposeLink</span>
          </div>
          <p className="text-gray-400">© 2024 ReposeLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}