"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Lock, Shield } from "lucide-react"

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-dark-900 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Complete Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">Payment</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Secure payment processing with 256-bit SSL encryption
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-dark-800/50 backdrop-blur-sm border border-primary-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CreditCard className="h-6 w-6 mr-2 text-primary-400" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-dark-700 border-primary-500/30 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-gray-300">
                    Card Number
                  </Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className="bg-dark-700 border-primary-500/30 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry" className="text-gray-300">
                      Expiry Date
                    </Label>
                    <Input id="expiry" placeholder="MM/YY" className="bg-dark-700 border-primary-500/30 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-gray-300">
                      CVV
                    </Label>
                    <Input id="cvv" placeholder="123" className="bg-dark-700 border-primary-500/30 text-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    Cardholder Name
                  </Label>
                  <Input id="name" placeholder="John Doe" className="bg-dark-700 border-primary-500/30 text-white" />
                </div>

                <Button className="w-full bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 text-white py-3 text-lg font-semibold">
                  <Lock className="h-5 w-5 mr-2" />
                  Complete Payment
                </Button>

                <div className="flex items-center justify-center text-gray-400 text-sm">
                  <Shield className="h-4 w-4 mr-2" />
                  Secured by 256-bit SSL encryption
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-dark-800/50 backdrop-blur-sm border border-primary-500/20">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Pro Plan</span>
                  <span className="text-white font-semibold">Rs 1000/month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Tax</span>
                  <span className="text-white font-semibold">Rs 180</span>
                </div>
                <hr className="border-primary-500/20" />
                <div className="flex justify-between items-center text-lg">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-primary-400 font-bold">Rs 1180</span>
                </div>

                <div className="mt-6 p-4 bg-primary-500/10 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">What's Included:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Advanced AI analysis</li>
                    <li>• Real-time feedback</li>
                    <li>• Detailed performance metrics</li>
                    <li>• Video analysis</li>
                    <li>• Custom training plans</li>
                    <li>• Coach collaboration tools</li>
                    <li>• Priority support</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
