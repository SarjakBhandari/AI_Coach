"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-dark-900/80 backdrop-blur-md shadow-lg border-b border-primary-500/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/placeholder-logo.png" alt="AI Coach Logo" width={32} height={32} className="mr-2" />
          <span className="text-2xl font-bold text-white">AI Coach</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-primary-400 transition-colors text-lg font-medium"
            >
              {link.name}
            </Link>
          ))}
          <Link href="/login" passHref>
            <Button variant="ghost" className="text-primary-400 hover:bg-primary-500/10 text-lg font-medium">
              Log In
            </Button>
          </Link>
          <Link href="/signup" passHref>
            <Button className="bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 transition-colors duration-300 text-lg font-medium">
              Sign Up
            </Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-8 w-8" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-dark-900 border-l border-primary-500/20 w-[300px] sm:w-[400px] flex flex-col"
            >
              <div className="flex items-center justify-between pb-6 border-b border-primary-500/20">
                <Link href="/" className="flex items-center" onClick={() => setIsSheetOpen(false)}>
                  <Image src="/placeholder-logo.png" alt="AI Coach Logo" width={32} height={32} className="mr-2" />
                  <span className="text-2xl font-bold text-white">AI Coach</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsSheetOpen(false)} className="text-white">
                  <X className="h-8 w-8" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="flex flex-col gap-6 pt-8 flex-grow">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors text-xl font-medium py-2"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex flex-col gap-4 mt-auto pt-8 border-t border-primary-500/20">
                  <Link href="/login" passHref>
                    <Button
                      variant="ghost"
                      className="w-full text-primary-400 hover:bg-primary-500/10 text-xl font-medium"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      Log In
                    </Button>
                  </Link>
                  <Link href="/signup" passHref>
                    <Button
                      className="w-full bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 transition-colors duration-300 text-xl font-medium"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
