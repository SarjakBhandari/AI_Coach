"use client"

import { motion } from "framer-motion"
import { Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import StarField from "./StarField"
import { useRouter } from "next/navigation"

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    period: "/month",
    description: "Perfect for individual players getting started",
    features: [
      "Basic shot analysis",
      "Weekly progress reports",
      "Mobile app access",
      "Community support",
      "5 video uploads per month",
    ],
    buttonText: "Start Basic Plan",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19.99",
    period: "/month",
    description: "Advanced features for serious players",
    features: [
      "Advanced AI analysis",
      "Real-time feedback",
      "Unlimited video uploads",
      "Performance insights",
      "Coach collaboration tools",
      "Priority support",
      "Custom training plans",
    ],
    buttonText: "Start Pro Plan",
    popular: true,
  },
  {
    name: "Team",
    price: "$49.99",
    period: "/month",
    description: "Complete solution for teams and coaches",
    features: [
      "Everything in Pro",
      "Team management dashboard",
      "Multi-player analysis",
      "Advanced team analytics",
      "Injury prevention monitoring",
      "Custom branding",
      "Dedicated account manager",
      "API access",
    ],
    buttonText: "Start Team Plan",
    popular: false,
  },
]

export default function Pricing() {
  const router = useRouter()

  const handlePlanClick = (planName: string) => {
    router.push(`/payment?plan=${planName.toLowerCase()}`)
  }

  return (
    <section id="pricing" className="relative py-24 bg-gradient-to-b from-black to-dark-900 overflow-hidden">
      <StarField />
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Choose Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">
              Training Plan
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Select the perfect plan to elevate your basketball skills with AI-powered coaching
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card
                className={`bg-dark-800/50 backdrop-blur-sm border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 hover:transform hover:scale-105 h-full ${
                  plan.popular ? "ring-2 ring-primary-500/50 relative z-10" : ""
                }`}
              >
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-white mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-300 mb-6">{plan.description}</CardDescription>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-2">{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="pb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-primary-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    onClick={() => handlePlanClick(plan.name)}
                    className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white"
                        : "bg-dark-700 hover:bg-dark-600 text-white border border-primary-500/30 hover:border-primary-500/50"
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-full px-6 py-3">
            <Star className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-gray-300">30-day money-back guarantee</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
