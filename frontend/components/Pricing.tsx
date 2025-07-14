"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Pricing() {
  const pricingPlans = [
    {
      name: "Basic",
      price: "$19",
      frequency: "/month",
      features: [
        "AI-powered shot analysis",
        "Basic drill library",
        "Progress tracking",
        "Community forum access",
        "Email support",
      ],
      buttonText: "Start Free Trial",
      buttonLink: "/payment?plan=basic",
    },
    {
      name: "Pro",
      price: "$49",
      frequency: "/month",
      features: [
        "Everything in Basic, plus:",
        "Advanced movement tracking",
        "Personalized training plans",
        "Real-time audio feedback",
        "Video upload analysis",
        "Priority support",
      ],
      buttonText: "Get Pro",
      buttonLink: "/payment?plan=pro",
    },
    {
      name: "Elite",
      price: "$99",
      frequency: "/month",
      features: [
        "Everything in Pro, plus:",
        "Live coaching sessions",
        "Custom drill creation",
        "Injury prevention analysis",
        "Dedicated account manager",
        "Early access to new features",
      ],
      buttonText: "Go Elite",
      buttonLink: "/payment?plan=elite",
    },
  ]

  return (
    <section id="pricing" className="relative py-24 bg-gradient-to-b from-black to-dark-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            Select the perfect plan to elevate your game, from beginner to elite.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-dark-800 rounded-xl p-8 border border-primary-500/20 shadow-lg flex flex-col transition-all duration-300 hover:scale-[1.02] ${
                plan.name === "Pro" ? "z-10" : ""
              }`}
            >
              <h3 className="text-3xl font-bold text-white mb-4">{plan.name}</h3>
              <div className="text-5xl font-bold text-primary-400 mb-6">
                {plan.price}
                <span className="text-xl text-gray-400">{plan.frequency}</span>
              </div>
              <ul className="space-y-3 text-gray-300 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href={plan.buttonLink} passHref>
                  <Button className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 transition-colors duration-300">
                    {plan.buttonText}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
