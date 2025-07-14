"use client"

import { motion } from "framer-motion"
import { Camera, Lightbulb, TrendingUp } from "lucide-react"

const steps = [
  {
    icon: Camera,
    title: "Record Your Session",
    description:
      "Use your phone or camera to record your basketball practice. Our AI is designed to work with various setups.",
  },
  {
    icon: Lightbulb,
    title: "AI Analyzes Your Game",
    description:
      "Upload your video, and our advanced AI will analyze every movement, shot, and decision, identifying strengths and areas for improvement.",
  },
  {
    icon: TrendingUp,
    title: "Get Personalized Feedback",
    description:
      "Receive instant, actionable insights and custom drills tailored to your unique playing style and goals.",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-dark-900 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            How AI Coach{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">Works</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Simple steps to transform your basketball training with cutting-edge AI.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-8 h-full text-center hover:border-primary-500/40 transition-all duration-300 hover:transform hover:scale-105">
                {/* Step Number */}
                <div className="mb-6">
                  <div className="bg-primary-600/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                    <span className="text-primary-400 text-3xl font-bold">{index + 1}</span>
                  </div>
                </div>

                {/* Step Icon */}
                <div className="mb-6">
                  <step.icon className="h-12 w-12 text-primary-400 mx-auto" />
                </div>

                {/* Step Content */}
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
