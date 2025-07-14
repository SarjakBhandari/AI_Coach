"use client"

import { motion } from "framer-motion"
import { Brain, Target, TrendingUp, Users, Zap, Shield } from "lucide-react"
import StarField from "./StarField"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced computer vision analyzes your shooting form, footwork, and technique in real-time.",
    image: "/images/ai-powered-analysis.png",
  },
  {
    icon: Target,
    title: "Precision Tracking",
    description:
      "Track every shot with millimeter accuracy. Get detailed analytics on arc, release point, and follow-through.",
    image: "/images/precision-tracking.png",
  },
  {
    icon: TrendingUp,
    title: "Performance Insights",
    description: "Comprehensive performance metrics and progress tracking to monitor your improvement over time.",
    image: "/images/performance-insights.png",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share progress with coaches and teammates. Compare stats and challenge friends to improve together.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Get immediate coaching tips and corrections after every shot to accelerate your learning.",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    icon: Shield,
    title: "Injury Prevention",
    description: "AI monitors your form to identify potential injury risks and suggests safer shooting techniques.",
    image: "/placeholder.svg?height=300&width=400",
  },
]

export default function Features() {
  return (
    <section id="features" className="relative py-24 bg-gradient-to-b from-black to-dark-900 overflow-hidden">
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
            Revolutionary{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">
              Features
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of basketball training with cutting-edge AI technology that transforms how you learn
            and improve your game.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-8 h-full hover:border-primary-500/40 transition-all duration-300 hover:transform hover:scale-105">
                {/* Feature Image */}
                <div className="mb-6 overflow-hidden rounded-xl">
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Feature Icon */}
                <div className="mb-6">
                  <div className="bg-primary-600/20 p-3 rounded-xl w-fit">
                    <feature.icon className="h-8 w-8 text-primary-400" />
                  </div>
                </div>

                {/* Feature Content */}
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
