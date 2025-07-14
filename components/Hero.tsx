"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import StarField from "./StarField"

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden bg-black">
      <StarField />
      <Image
        src="/hero-bg.png"
        alt="Basketball court background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0 z-0 opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />

      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6"
        >
          Elevate Your Game with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">AI Coach</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto"
        >
          Unleash your full potential with personalized AI-powered basketball training and real-time feedback.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link href="/signup" passHref>
            <Button className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 transition-colors duration-300 shadow-lg">
              Start Free Trial
            </Button>
          </Link>
          <Link href="#features" passHref>
            <Button
              variant="outline"
              className="px-8 py-4 text-lg font-semibold border-primary-500 text-primary-400 hover:bg-primary-500/10 transition-colors duration-300 shadow-lg bg-transparent"
            >
              Learn More
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-0 right-0 z-10 w-full md:w-1/2 lg:w-2/3 xl:w-1/2"
      >
        <Image
          src="/hero-basketball.png"
          alt="Basketball player"
          width={1200}
          height={800}
          className="object-contain w-full h-auto"
        />
      </motion.div>
    </section>
  )
}
