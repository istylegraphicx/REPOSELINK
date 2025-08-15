import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard, Building2, CheckCircle, Shield, Clock } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

export default function Payment() {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan') || 'professional';
  const [paymentMethod, setPaymentMethod] = useState('eft');
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = {
    professional: { name: 'Professional', price: 299, popular: true },
    premium: { name: 'Premium', price: 599, popular: false },
    free: { name: 'Free', price: 0, popular: false }
  };

  const selectedPlan = plans[plan as keyof typeof plans] || plans.professional;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    if (paymentMethod === 'paypal') {
      // Redirect to PayPal
      window.open('https://paypal.me/istylegraphicx', '_blank');
    } else {
      // Simulate EFT processing
      setTimeout(() => {
        setIsProcessing(false);
        alert('Payment instructions sent to your email. Please complete the EFT transfer and contact us for activation.');
      }, 2000);
    }
  };

  const handleCardPayment = () => {
    setIsProcessing(true);
    // Simulate card payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert('Payment successful! Your account will be activated within 24 hours.');
    }, 3000);
  };

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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Complete Your Purchase</h1>
            <p className="text-gray-600">Choose your payment method to get started with ReposeLink</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-2 sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">{selectedPlan.name} Plan</h4>
                      {selectedPlan.popular && <Badge className="mt-1">Most Popular</Badge>}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">R{selectedPlan.price}</div>
                      <div className="text-sm text-gray-500">per month</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Professional website
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Online booking system
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Payment processing
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      24/7 support
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>Total</span>
                    <span>R{selectedPlan.price}/month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Methods */}
            <div className="lg:col-span-2">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Choose how you'd like to pay for your subscription</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {/* Credit Card */}
                    <Card className={`cursor-pointer transition-colors ${paymentMethod === 'card' ? 'ring-2 ring-blue-500' : ''}`}
                          onClick={() => setPaymentMethod('card')}>
                      <CardContent className="flex items-center p-4">
                        <input 
                          type="radio" 
                          name="payment" 
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-3"
                        />
                        <CreditCard className="w-5 h-5 mr-3 text-blue-600" />
                        <div className="flex-1">
                          <h4 className="font-semibold">Credit/Debit Card</h4>
                          <p className="text-sm text-gray-600">Pay securely with Mastercard, Visa</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* PayPal */}
                    <Card className={`cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'ring-2 ring-blue-500' : ''}`}
                          onClick={() => setPaymentMethod('paypal')}>
                      <CardContent className="flex items-center p-4">
                        <input 
                          type="radio" 
                          name="payment" 
                          value="paypal"
                          checked={paymentMethod === 'paypal'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-3"
                        />
                        <div className="w-5 h-5 mr-3 bg-blue-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">P</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">PayPal</h4>
                          <p className="text-sm text-gray-600">Pay with your PayPal account</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* EFT */}
                    <Card className={`cursor-pointer transition-colors ${paymentMethod === 'eft' ? 'ring-2 ring-blue-500' : ''}`}
                          onClick={() => setPaymentMethod('eft')}>
                      <CardContent className="flex items-center p-4">
                        <input 
                          type="radio" 
                          name="payment" 
                          value="eft"
                          checked={paymentMethod === 'eft'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-3"
                        />
                        <Building2 className="w-5 h-5 mr-3 text-green-600" />
                        <div className="flex-1">
                          <h4 className="font-semibold">Bank Transfer (EFT)</h4>
                          <p className="text-sm text-gray-600">Direct bank transfer</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Payment Forms */}
                  {paymentMethod === 'card' && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-4">Card Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="block text-sm font-medium mb-2">Card Number</label>
                          <Input placeholder="1234 5678 9012 3456" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Expiry Date</label>
                          <Input placeholder="MM/YY" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">CVV</label>
                          <Input placeholder="123" />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                          <Input placeholder="John Doe" />
                        </div>
                      </div>
                      <Button 
                        className="w-full mt-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                        onClick={handleCardPayment}
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Processing..." : `Pay R${selectedPlan.price}`}
                      </Button>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white font-bold text-xl">P</span>
                        </div>
                        <h4 className="font-semibold mb-2">PayPal Payment</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          You'll be redirected to PayPal to complete your payment securely.
                        </p>
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => window.open('https://paypal.me/istylegraphicx', '_blank')}
                        >
                          Continue with PayPal
                        </Button>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'eft' && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold mb-4">Bank Transfer Details</h4>
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between">
                          <span className="font-medium">Bank:</span>
                          <span>CAPITEC BANK</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Account Holder:</span>
                          <span>iStyle GraphicX (pty) ltd</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Account Type:</span>
                          <span>Transact</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Account No:</span>
                          <span className="font-mono">1052 1683 53</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Reference:</span>
                          <span className="font-mono">REPOSELINK-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                        </div>
                      </div>
                      <form onSubmit={handlePayment}>
                        <Button 
                          type="submit"
                          className="w-full bg-green-600 hover:bg-green-700"
                          disabled={isProcessing}
                        >
                          {isProcessing ? "Processing..." : "Confirm EFT Payment"}
                        </Button>
                      </form>
                    </div>
                  )}

                  {/* Security Notice */}
                  <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
                    <Shield className="w-4 h-4 mr-2" />
                    Your payment information is secure and encrypted
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}