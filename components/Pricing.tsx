"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import StarField from "./StarField"
import { useRouter } from "next/navigation"

const plans = [
  {
    name: "Basic",
    price: "$29",
    period: "/month",
    description: "Perfect for individual players starting their AI training journey",
    features: [
      "AI shot analysis",
      "Basic performance metrics",
      "5 video uploads per month",
      "Email support",
      "Mobile app access",
    ],
    buttonText: "Start Basic Plan",
    popular: false,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    description: "Advanced features for serious players and coaches",
    features: [
      "Everything in Basic",
      "Advanced biomechanics analysis",
      "Unlimited video uploads",
      "Team collaboration tools",
      "Priority support",
      "Custom training programs",
      "Performance comparisons",
    ],
    buttonText: "Start Pro Plan",
    popular: true,
  },
  {
    name: "Elite",
    price: "$149",
    period: "/month",
    description: "Professional-grade tools for teams and academies",
    features: [
      "Everything in Pro",
      "Multi-player analysis",
      "Advanced team analytics",
      "API access",
      "White-label options",
      "Dedicated account manager",
      "Custom integrations",
      "Live coaching sessions",
    ],
    buttonText: "Start Elite Plan",
    popular: false,
  },
]

export default function Pricing() {
  const router = useRouter()

  const handlePlanClick = () => {
    router.push("/payment")
  }

  return (
    <section id="pricing" className="relative py-24 bg-gradient-to-b from-dark-900 to-black overflow-hidden">
      <StarField />
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
            Select the perfect plan to elevate your basketball skills with AI-powered training and analysis.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card
                className={`bg-dark-800/50 backdrop-blur-sm border-primary-500/20 hover:border-primary-500/40 transition-all duration-300 h-full ${
                  plan.popular ? "ring-2 ring-primary-500/50 z-10" : ""
                }`}
              >
                <CardHeader className="text-center pb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 text-lg">{plan.period}</span>
                  </div>
                  <p className="text-gray-300">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features List */}
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-primary-400 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    onClick={handlePlanClick}
                    className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                      plan.popular
                        ? "bg-primary-600 hover:bg-primary-700 text-white"
                        : "bg-dark-700 hover:bg-dark-600 text-white border border-primary-500/30 hover:border-primary-500/50"
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6">All plans include a 14-day free trial. No credit card required.</p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <span>✓ Cancel anytime</span>
            <span>✓ 24/7 support</span>
            <span>✓ Money-back guarantee</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
