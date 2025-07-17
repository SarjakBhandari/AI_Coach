"use client"

import { motion } from "framer-motion"
import { Users, Award, Globe } from "lucide-react"
import StarField from "./StarField" // Import StarField
import Image from "next/image" // Import Next.js Image component

export default function About() {
  return (
    <section id="about" className="relative py-24 bg-gradient-to-b from-black to-dark-900 overflow-hidden">
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
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">
              AI Coach
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our mission is to revolutionize basketball training through cutting-edge AI technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/about-ai-coach.png"
              alt="About AI Coach"
              width={600}
              height={400}
              className="rounded-xl shadow-lg border border-primary-500/20"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-8 text-gray-300 text-lg"
          >
            <p>
              AI Coach was founded by a team of basketball enthusiasts and AI experts with a shared vision: to make
              elite-level coaching accessible to everyone. We believe that technology can unlock new potentials in
              athletic performance.
            </p>
            <p>
              Our platform uses advanced computer vision and machine learning algorithms to provide real-time feedback
              and personalized training plans. Whether you're a beginner or a seasoned pro, AI Coach is designed to help
              you refine your skills, prevent injuries, and achieve your basketball dreams.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="flex flex-col items-center text-center">
                <Users className="h-10 w-10 text-primary-400 mb-3" />
                <h4 className="font-semibold text-white text-xl">Community Focused</h4>
                <p className="text-sm">Building a global network of passionate players.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Award className="h-10 w-10 text-primary-400 mb-3" />
                <h4 className="font-semibold text-white text-xl">Excellence Driven</h4>
                <p className="text-sm">Committed to delivering the best training experience.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Globe className="h-10 w-10 text-primary-400 mb-3" />
                <h4 className="font-semibold text-white text-xl">Global Reach</h4>
                <p className="text-sm">Empowering athletes worldwide.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
