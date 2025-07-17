"use client"

import { motion } from "framer-motion"
import { Lightbulb, Target, Users, MessageSquare, Shield, TrendingUp } from "lucide-react"
import Image from "next/image"

export default function Features() {
  const features = [
    {
      icon: Lightbulb,
      title: "AI-Powered Analysis",
      description:
        "Leverage advanced AI to analyze your performance, identify strengths, and pinpoint areas for improvement.",
      image: "/images/ai-powered-analysis.png",
    },
    {
      icon: Target,
      title: "Precision Tracking",
      description: "Track every movement, shot, and drill with unparalleled accuracy, ensuring data-driven progress.",
      image: "/images/precision-tracking.png",
    },
    {
      icon: TrendingUp,
      title: "Performance Insights",
      description:
        "Gain deep insights into your game with detailed reports and visual breakdowns of your training sessions.",
      image: "/images/performance-insights.png",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Share progress, challenge teammates, and collaborate on training plans within a dedicated team environment.",
      image: "/images/team-collaboration.png",
    },
    {
      icon: MessageSquare,
      title: "Instant Feedback",
      description:
        "Receive real-time audio and visual feedback during your drills, correcting form and technique on the fly.",
      image: "/images/instant-feedback.png",
    },
    {
      icon: Shield,
      title: "Injury Prevention",
      description:
        "Our AI monitors your movements to detect potential risks and provides recommendations to prevent injuries.",
      image: "/images/injury-prevention.png",
    },
  ]

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-dark-900 to-black relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Unleash Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">
              Potential
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the powerful features that make AI Coach the ultimate training companion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-dark-800 rounded-xl p-8 border border-primary-500/20 shadow-lg flex flex-col items-center text-center"
            >
              <div className="mb-6">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  width={300}
                  height={200}
                  className="rounded-lg object-cover w-full h-48"
                />
              </div>
              <feature.icon className="h-12 w-12 text-primary-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 text-lg">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
