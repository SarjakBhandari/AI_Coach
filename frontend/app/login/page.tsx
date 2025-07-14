"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Chrome } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password.")
      return
    }

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay
      if (email === "test@example.com" && password === "password123") {
        // Redirect or set auth state
        window.location.href = "/" // Redirect to home for demo
      } else {
        setError("Invalid email or password.")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-full max-w-md bg-dark-800 text-white border-primary-500/20 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary-400">Welcome Back!</CardTitle>
            <CardDescription className="text-gray-400">Log in to your AI Coach account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m.jordan@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-dark-700 border-primary-500/30 text-white placeholder:text-gray-500 focus:border-primary-400"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-300">
                    Password
                  </Label>
                  <Link href="/forgot-password" className="text-sm font-medium text-primary-400 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-dark-700 border-primary-500/30 text-white placeholder:text-gray-500 focus:border-primary-400"
                />
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 transition-colors duration-300"
              >
                Log In
              </Button>
            </form>
            <div className="relative mt-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-dark-800 px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <Button
                variant="outline"
                className="w-full bg-dark-700 border-primary-500/30 text-white hover:bg-dark-600"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button
                variant="outline"
                className="w-full bg-dark-700 border-primary-500/30 text-white hover:bg-dark-600"
              >
                <Chrome className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            <div className="mt-6 text-center text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-medium text-primary-400 hover:underline">
                Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
