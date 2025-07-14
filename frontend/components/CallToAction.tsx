"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CallToAction() {
  return (
    <section id="cta" className="relative py-24 bg-gradient-to-b from-dark-900 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">
              Transform Your Game?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Join thousands of athletes who are already using AI Coach to reach their full potential.
          </p>
          <Link href="/signup" passHref>
            <Button className="px-8 py-4 text-xl font-semibold bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 transition-colors duration-300 shadow-lg">
              Get Started Today
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
