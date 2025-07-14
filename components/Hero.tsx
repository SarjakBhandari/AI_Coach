"use client"

import { motion } from "framer-motion"
import { Upload, Video, Star } from "lucide-react"
import StarField from "./StarField" // Re-import StarField
import Link from "next/link" // Import Link for navigation

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/hero-basketball.png)", // <--- Make sure this path is correct
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-primary-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Star Field - Re-added */}
      <StarField />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center space-x-2 mb-6"
            >
              <Star className="h-8 w-8 text-primary-400 fill-current animate-pulse" />
              <span className="text-primary-400 font-semibold text-lg tracking-wider">AI POWERED TRAINING</span>
              <Star className="h-8 w-8 text-primary-400 fill-current animate-pulse" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
              UPGRADE YOUR{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">GAME.</span>
            </h1>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed"
          >
            AI Coach is the revolutionary basketball training app that uses artificial intelligence to analyze your
            performance and provide personalized coaching. Take your skills to the next level with real-time feedback
            and guided training sessions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8"
          >
            {/* Live Video Button */}
            <Link href="/live-video" passHref>
              <button className="group bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-xl flex items-center space-x-3 transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-primary-500">
                <Video className="h-6 w-6" />
                <span className="text-lg font-semibold">Live Video</span>
              </button>
            </Link>

            {/* Upload Video Button */}
            <Link href="/upload-video" passHref>
              <button className="group bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl flex items-center space-x-3 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary-500/25">
                <Upload className="h-6 w-6 fill-current" />
                <span className="text-lg font-semibold">Upload Video</span>
              </button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-400">1M+</div>
              <div className="text-gray-300 text-sm mt-1">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-400">50M+</div>
              <div className="text-gray-300 text-sm mt-1">Shots Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-400">95%</div>
              <div className="text-gray-300 text-sm mt-1">Improvement Rate</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-400 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}
