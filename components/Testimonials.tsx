"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import StarField from "./StarField" // Import StarField

const testimonials = [
  {
    name: "Anisha Sah", // Updated name
    role: "High School Player",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "AI Coach completely transformed my shooting. I went from 45% to 78% free throw accuracy in just 3 months. The real-time feedback is incredible!",
  },
  {
    name: "Rabindra Bhattarai", // Updated name
    role: "College Basketball Coach",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "As a coach, AI Coach gives me detailed analytics on each player's performance. It's like having an assistant coach that never sleeps.",
  },
  {
    name: "Sarjak Bhattarai", // Updated name
    role: "Professional Player",
    image: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "The precision tracking is unmatched. I can see exactly what I need to work on after every training session. Game-changer for serious players.",
  },
]

export default function Testimonials() {
  return (
    <section id="feedback" className="relative py-24 bg-gradient-to-b from-dark-900 to-black overflow-hidden">
      <StarField /> {/* Added StarField */}
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
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
            What Players{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">
              Are Saying
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of players who have elevated their game with AI Coach
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-8 h-full hover:border-primary-500/40 transition-all duration-300 hover:transform hover:scale-105 relative">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary-400 mb-6 opacity-50" />

                {/* Rating */}
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 text-lg leading-relaxed mb-8">"{testimonial.text}"</p>

                {/* Author */}
                <div className="flex items-center">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-primary-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">4.9</div>
            <div className="text-gray-300">App Store Rating</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">1M+</div>
            <div className="text-gray-300">Active Users</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">50M+</div>
            <div className="text-gray-300">Shots Analyzed</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">95%</div>
            <div className="text-gray-300">Improvement Rate</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
