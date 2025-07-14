import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ScrollToTopButton from "@/components/ScrollToTopButton" // Import the new component

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Coach - Upgrade Your Game",
  description: "Revolutionary basketball training app powered by artificial intelligence",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ScrollToTopButton /> {/* Add the scroll to top button here */}
      </body>
    </html>
  )
}
