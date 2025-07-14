"use client"

import { motion } from "framer-motion"
import { Camera, BarChart, BookOpen, Users, Video, Upload } from "lucide-react"
import StarField from "./StarField" // Import StarField

const services = [
  {
    icon: Camera,
    title: "Real-time Form Analysis",
    description: "Get instant feedback on your shooting, dribbling, and defensive techniques.",
  },
  {
    icon: BarChart,
    title: "Detailed Performance Metrics",
    description: "Track your progress with comprehensive stats on accuracy, speed, and efficiency.",
  },
  {
    icon: BookOpen,
    title: "Personalized Training Plans",
    description: "Receive custom drills and workout routines tailored to your specific needs and goals.",
  },
  {
    icon: Users,
    title: "Coach & Team Collaboration",
    description: "Share your data with coaches and teammates to enhance collective improvement.",
  },
  {
    icon: Video,
    title: "Live Video Coaching",
    description: "Connect with certified coaches for live, interactive training sessions.",
  },
  {
    icon: Upload,
    title: "Video Upload & Review",
    description: "Upload your practice footage for in-depth AI analysis and expert review.",
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-24 bg-gradient-to-b from-black to-dark-900 overflow-hidden">
      <StarField /> {/* Added StarField */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">
              Services
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive tools and features designed to elevate every aspect of your game.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-8 h-full hover:border-primary-500/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="mb-6">
                  <div className="bg-primary-600/20 p-3 rounded-xl w-fit">
                    <service.icon className="h-8 w-8 text-primary-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
