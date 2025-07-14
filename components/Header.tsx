"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Star } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Reordered navItems to include "Features"
  const navItems = ["Home", "Features", "About", "Services", "Plan", "Feedback", "Contact"]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-primary-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Star className="h-6 w-6 text-white fill-current" />
            </div>
            <span className="text-white font-bold text-xl">AI Coach</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item}
                href={
                  item === "Home"
                    ? "#"
                    : item === "Features" // Link "Features" to the features section
                      ? "#features"
                      : item === "Contact"
                        ? "#contact"
                        : item === "Feedback"
                          ? "#feedback"
                          : item === "Services"
                            ? "#services"
                            : item === "About"
                              ? "#about"
                              : item === "Plan"
                                ? "#pricing"
                                : "#" // Default fallback
                }
                className="text-white hover:text-primary-400 transition-colors duration-200 text-sm font-medium tracking-wide"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Login/Signup Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" passHref>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors">
                Log In
              </button>
            </Link>
            <Link href="/signup" passHref>
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-primary-400 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-dark-900/95 backdrop-blur-sm border-t border-primary-500/20">
            <nav className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={
                    item === "Home"
                      ? "#"
                      : item === "Features"
                        ? "#features"
                        : item === "Contact"
                          ? "#contact"
                          : item === "Feedback"
                            ? "#feedback"
                            : item === "Services"
                              ? "#services"
                              : item === "About"
                                ? "#about"
                                : item === "Plan"
                                  ? "#pricing"
                                  : "#" // Default fallback
                  }
                  className="block text-white hover:text-primary-400 transition-colors duration-200 text-sm font-medium tracking-wide py-2"
                >
                  {item}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 pt-4">
                <Link href="/login" passHref>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors w-full">
                    Log In
                  </button>
                </Link>
                <Link href="/signup" passHref>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors w-full">
                    Sign Up
                  </button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
