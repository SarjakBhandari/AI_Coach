"use client"

import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-dark-900 text-gray-300 py-12 border-t border-primary-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <Link href="/" className="flex items-center">
            <Image src="/placeholder-logo.png" alt="AI Coach Logo" width={40} height={40} className="mr-3" />
            <span className="text-2xl font-bold text-white">AI Coach</span>
          </Link>
          <p className="text-gray-400">Revolutionizing basketball training with cutting-edge AI technology.</p>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-5">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link href="#features" className="hover:text-primary-400 transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="#how-it-works" className="hover:text-primary-400 transition-colors">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="#testimonials" className="hover:text-primary-400 transition-colors">
                Testimonials
              </Link>
            </li>
            <li>
              <Link href="#pricing" className="hover:text-primary-400 transition-colors">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#about" className="hover:text-primary-400 transition-colors">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-5">Support</h3>
          <ul className="space-y-3">
            <li>
              <Link href="#" className="hover:text-primary-400 transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary-400 transition-colors">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-5">Contact Us</h3>
          <address className="not-italic space-y-3">
            <p>123 AI Sports Blvd,</p>
            <p>Tech City, CA 90210</p>
            <p className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-primary-400" />
              <a href="mailto:info@aicoach.com" className="hover:text-primary-400 transition-colors">
                info@aicoach.com
              </a>
            </p>
            <p>+1 (555) 123-4567</p>
          </address>
        </div>
      </div>
      <div className="mt-12 text-center text-gray-500 text-sm border-t border-primary-500/10 pt-8">
        &copy; {new Date().getFullYear()} AI Coach. All rights reserved.
      </div>
    </motion.footer>
  )
}
