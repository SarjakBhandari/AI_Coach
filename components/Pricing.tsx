"use client"

import { motion } from "framer-motion"
import { Check, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import StarField from "./StarField"

const plans = [
  {
    name: "Starter",
    price: "Rs 0",
    period: "",
    description: "Perfect for beginners getting started",
    features: [
      "Basic shot tracking",
      "Weekly progress reports",
      "Community access",
      "Mobile app access",
      "Basic analytics",
    ],
    popular: false,
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "Rs 1000",
    period: "/month",
    description: "For serious players ready to level up",
    features: [
      "Advanced AI analysis",
      "Real-time feedback",
      "Detailed performance metrics",
      "Video analysis",
      "Custom training plans",
      "Coach collaboration tools",
      "Priority support",
    ],
    popular: true,
    cta: "Start Pro Trial",
  },
  {
    name: "Team",
    price: "Rs 5000",
    period: "/month",
    description: "For teams and coaching staff",
    features: [
      "Everything in Pro",
      "Team management dashboard",
      "Multi-player analytics",
      "Advanced reporting",
      "Custom branding",
      "API access",
      "Dedicated support",
      "Team competitions",
    ],
    popular: false,
    cta: "Contact Sales",
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 bg-gradient-to-b from-black to-dark-900 overflow-hidden">
      <StarField />
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-current" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div
                className={`bg-dark-800/50 backdrop-blur-sm border rounded-2xl p-8 h-full transition-all duration-300 hover:transform hover:scale-105 ${
                  plan.popular
                    ? "border-primary-500/50 shadow-2xl shadow-primary-500/20 z-10"
                    : "border-primary-500/20 hover:border-primary-500/40"
                }`}
              >
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-1">{plan.period}</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-primary-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 text-white shadow-lg shadow-primary-500/25"
                      : "bg-dark-700 hover:bg-dark-600 text-white border border-primary-500/30 hover:border-primary-500/50"
                  }`}
                >
                  {plan.popular && <Zap className="h-5 w-5 mr-2" />}
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-lg">30-day money-back guarantee • Cancel anytime • No hidden fees</p>
        </motion.div>
      </div>
    </section>
  )
}
