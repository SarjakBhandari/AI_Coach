"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, CreditCard, Lock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import StarField from "@/components/StarField"

export default function PaymentPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState("Pro")
  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: "",
  })

  const plans = {
    Basic: { price: 29, features: ["AI shot analysis", "Basic performance metrics", "5 video uploads per month"] },
    Pro: { price: 79, features: ["Everything in Basic", "Advanced biomechanics analysis", "Unlimited video uploads"] },
    Elite: { price: 149, features: ["Everything in Pro", "Multi-player analysis", "Advanced team analytics"] },
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle payment processing here
    console.log("Processing payment for:", selectedPlan, formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-dark-900 relative overflow-hidden">
      <StarField />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="text-gray-300 hover:text-white mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Plans
          </Button>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Complete Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">
              Purchase
            </span>
          </h1>
          <p className="text-xl text-gray-300">Secure checkout for your AI basketball training subscription</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Payment Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-dark-800/50 backdrop-blur-sm border-primary-500/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <CreditCard className="h-6 w-6 mr-2 text-primary-400" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-gray-300">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-dark-700 border-gray-600 text-white"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  {/* Card Information */}
                  <div className="space-y-4">
                    <Label className="text-gray-300">Card Information</Label>

                    <Input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                      className="bg-dark-700 border-gray-600 text-white"
                      placeholder="1234 5678 9012 3456"
                      required
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="text"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                        className="bg-dark-700 border-gray-600 text-white"
                        placeholder="MM/YY"
                        required
                      />
                      <Input
                        type="text"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                        className="bg-dark-700 border-gray-600 text-white"
                        placeholder="CVV"
                        required
                      />
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <Label htmlFor="cardholderName" className="text-gray-300">
                      Cardholder Name
                    </Label>
                    <Input
                      id="cardholderName"
                      type="text"
                      value={formData.cardholderName}
                      onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                      className="bg-dark-700 border-gray-600 text-white"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  {/* Billing Address */}
                  <div className="space-y-4">
                    <Label className="text-gray-300">Billing Address</Label>

                    <Input
                      type="text"
                      value={formData.billingAddress}
                      onChange={(e) => handleInputChange("billingAddress", e.target.value)}
                      className="bg-dark-700 border-gray-600 text-white"
                      placeholder="123 Main Street"
                      required
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="bg-dark-700 border-gray-600 text-white"
                        placeholder="City"
                        required
                      />
                      <Input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        className="bg-dark-700 border-gray-600 text-white"
                        placeholder="ZIP Code"
                        required
                      />
                    </div>

                    <Select onValueChange={(value) => handleInputChange("country", value)}>
                      <SelectTrigger className="bg-dark-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-center text-sm text-gray-400 bg-dark-700/50 p-3 rounded-lg">
                    <Lock className="h-4 w-4 mr-2 text-primary-400" />
                    Your payment information is encrypted and secure
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 text-lg font-semibold"
                  >
                    Complete Purchase
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Summary */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-dark-800/50 backdrop-blur-sm border-primary-500/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Plan Selection */}
                <div>
                  <Label className="text-gray-300 mb-3 block">Selected Plan</Label>
                  <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                    <SelectTrigger className="bg-dark-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic">Basic - $29/month</SelectItem>
                      <SelectItem value="Pro">Pro - $79/month</SelectItem>
                      <SelectItem value="Elite">Elite - $149/month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Plan Features */}
                <div>
                  <h4 className="text-white font-semibold mb-3">What's included:</h4>
                  <ul className="space-y-2">
                    {plans[selectedPlan as keyof typeof plans].features.map((feature, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing Breakdown */}
                <div className="border-t border-gray-600 pt-4 space-y-3">
                  <div className="flex justify-between text-gray-300">
                    <span>{selectedPlan} Plan</span>
                    <span>${plans[selectedPlan as keyof typeof plans].price}/month</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>14-day free trial</span>
                    <span className="text-green-400">-${plans[selectedPlan as keyof typeof plans].price}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-white border-t border-gray-600 pt-3">
                    <span>Due today</span>
                    <span>$0.00</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    You'll be charged ${plans[selectedPlan as keyof typeof plans].price} after your 14-day free trial
                    ends.
                  </p>
                </div>

                {/* Security Badges */}
                <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-600">
                  <div className="flex items-center text-xs text-gray-400">
                    <Shield className="h-4 w-4 mr-1 text-primary-400" />
                    SSL Encrypted
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <Lock className="h-4 w-4 mr-1 text-primary-400" />
                    Secure Payment
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
