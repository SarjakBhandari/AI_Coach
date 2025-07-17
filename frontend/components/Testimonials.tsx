"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import Image from "next/image"

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "AI Coach has transformed my training. The real-time feedback is incredibly accurate and has helped me correct my form instantly. My game has improved significantly!",
      name: "Michael J.",
      title: "Amateur Basketball Player",
      avatar: "/placeholder-user.jpg",
    },
    {
      quote:
        "As a coach, AI Coach is an invaluable tool. I can monitor my team's progress, identify areas for improvement, and even prevent potential injuries with their advanced analytics.",
      name: "Coach Sarah L.",
      title: "High School Basketball Coach",
      avatar: "/placeholder-user.jpg",
    },
    {
      quote:
        "The personalized training plans are a game-changer. It feels like having a professional coach guiding me through every drill, tailored to my specific needs.",
      name: "Anisha Sah",
      title: "Professional Athlete",
      avatar: "/images/anisha-sah.png",
    },
  ]

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-dark-900 to-black relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">
              Users Say
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from athletes and coaches who have transformed their game with AI Coach.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-dark-800 rounded-xl p-8 border border-primary-500/20 shadow-lg flex flex-col"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 text-lg mb-6 flex-grow">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-xl font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-gray-400">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
