"use client"

import { motion } from "framer-motion"
import { UploadCloud, BarChart, MessageSquare, Award } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: UploadCloud,
      title: "Upload Your Video",
      description: "Simply upload your basketball training footage to our secure platform.",
    },
    {
      icon: BarChart,
      title: "AI Analysis",
      description: "Our advanced AI analyzes your movements, form, and performance metrics.",
    },
    {
      icon: MessageSquare,
      title: "Receive Feedback",
      description: "Get instant, personalized feedback and actionable insights to improve.",
    },
    {
      icon: Award,
      title: "Track Progress",
      description: "Monitor your development over time and see your game reach new heights.",
    },
  ]

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-black to-dark-900 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            How It{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">Works</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our intuitive process makes improving your basketball skills easier than ever.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-dark-800 rounded-xl p-8 border border-primary-500/20 shadow-lg flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="bg-primary-500/20 rounded-full p-4">
                  <step.icon className="h-12 w-12 text-primary-400" />
                </div>
                <div className="absolute -top-4 -right-4 bg-primary-500 text-white rounded-full h-10 w-10 flex items-center justify-center text-xl font-bold border-4 border-dark-800">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-gray-300 text-lg">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
