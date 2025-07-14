"use client"

import { motion } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import StarField from "./StarField" // Import StarField

export default function CallToAction() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-black to-dark-900 overflow-hidden">
      <StarField /> {/* Added StarField */}
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <Star className="h-12 w-12 text-primary-400 fill-current mx-auto animate-pulse" />
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Ready to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">
              Elevate Your Game?
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Join thousands of players who are already transforming their skills with AI Coach. Sign up today and start
            your journey to basketball excellence!
          </p>
          <Link href="/signup" passHref>
            <button className="group bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-xl flex items-center justify-center space-x-3 mx-auto transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary-500/25 text-lg font-semibold">
              <span>Get Started Free</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
