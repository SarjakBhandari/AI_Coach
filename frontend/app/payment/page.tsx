"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, CreditCard, Shield, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import StarField from "@/components/StarField"

const planDetails = {
  basic: {
    name: "Basic",
    price: "$9.99",
    features: ["Basic shot analysis", "Weekly progress reports", "Mobile app access"],
  },
  pro: {
    name: "Pro",
    price: "$19.99",
    features: ["Advanced AI analysis", "Real-time feedback", "Unlimited video uploads"],
  },
  team: { name: "Team", price: "$49.99", features: ["Everything in Pro", "Team management", "Advanced analytics"] },
}

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedPlan, setSelectedPlan] = useState("pro")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const plan = searchParams.get("plan")
    if (plan && planDetails[plan as keyof typeof planDetails]) {
      setSelectedPlan(plan)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to success page or dashboard
    router.push("/dashboard")
  }

  const currentPlan = planDetails[selectedPlan as keyof typeof planDetails]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-dark-900 relative overflow-hidden">
      <StarField />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
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
          <p className="text-xl text-gray-300">Secure checkout for your AI Coach subscription</p>
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
                <CardDescription className="text-gray-300">Enter your payment information securely</CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Plan Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="plan" className="text-white">
                      Selected Plan
                    </Label>
                    <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                      <SelectTrigger className="bg-dark-700 border-primary-500/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-700 border-primary-500/30">
                        <SelectItem value="basic">Basic - $9.99/month</SelectItem>
                        <SelectItem value="pro">Pro - $19.99/month</SelectItem>
                        <SelectItem value="team">Team - $49.99/month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Card Information */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber" className="text-white">
                        Card Number
                      </Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="bg-dark-700 border-primary-500/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry" className="text-white">
                          Expiry Date
                        </Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          className="bg-dark-700 border-primary-500/30 text-white placeholder-gray-400"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc" className="text-white">
                          CVC
                        </Label>
                        <Input
                          id="cvc"
                          placeholder="123"
                          className="bg-dark-700 border-primary-500/30 text-white placeholder-gray-400"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Billing Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Billing Address</h3>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="bg-dark-700 border-primary-500/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="bg-dark-700 border-primary-500/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-white">
                        Address
                      </Label>
                      <Input
                        id="address"
                        placeholder="123 Main St"
                        className="bg-dark-700 border-primary-500/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-white">
                          City
                        </Label>
                        <Input
                          id="city"
                          placeholder="New York"
                          className="bg-dark-700 border-primary-500/30 text-white placeholder-gray-400"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip" className="text-white">
                          ZIP Code
                        </Label>
                        <Input
                          id="zip"
                          placeholder="10001"
                          className="bg-dark-700 border-primary-500/30 text-white placeholder-gray-400"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="flex items-center space-x-2 text-sm text-gray-300 bg-dark-700/50 p-3 rounded-lg">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>Your payment information is encrypted and secure</span>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white py-3 text-lg font-semibold"
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Lock className="h-4 w-4 mr-2" />
                        Complete Purchase
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Summary */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-dark-800/50 backdrop-blur-sm border-primary-500/20 sticky top-8">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Order Summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Selected Plan */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-white">{currentPlan.name} Plan</span>
                    <span className="text-lg font-bold text-primary-400">{currentPlan.price}/month</span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Included Features:</h4>
                    <ul className="space-y-1">
                      {currentPlan.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="border-t border-primary-500/20 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>{currentPlan.price}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-white border-t border-primary-500/20 pt-2">
                    <span>Total</span>
                    <span>{currentPlan.price}</span>
                  </div>
                </div>

                {/* Guarantee */}
                <div className="bg-dark-700/50 p-4 rounded-lg">
                  <div className="flex items-center text-sm text-gray-300">
                    <Shield className="h-4 w-4 text-green-400 mr-2" />
                    <span>30-day money-back guarantee</span>
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
