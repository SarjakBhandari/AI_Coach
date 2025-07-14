"use client"

import type React from "react"

import { useEffect, useRef } from "react"

// Star shape component
const StarShape = ({ size, opacity, style }: { size: number; opacity: number; style: React.CSSProperties }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-white absolute animate-pulse"
    style={{ ...style, opacity, filter: size > 3 ? "drop-shadow(0 0 4px rgba(255,255,255,0.5))" : "none" }}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

export default function StarField() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Clear existing stars
    container.innerHTML = ""

    // Create different types of stars
    const starTypes = [
      { count: 80, size: 1, type: "circle" }, // Small circular stars
      { count: 15, size: 2, type: "star" }, // Medium star shapes
      { count: 5, size: 2, type: "circle" }, // Large circular stars
      { count: 5, size: 4, type: "star" }, // Extra large star shapes
    ]

    starTypes.forEach(({ count, size, type }) => {
      for (let i = 0; i < count; i++) {
        const star = document.createElement("div")
        const x = Math.random() * 100
        const y = Math.random() * 100
        const opacity = Math.random() * 0.8 + 0.2
        const animationDelay = Math.random() * 4

        if (type === "circle") {
          star.className = "absolute bg-white rounded-full animate-pulse"
          star.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            opacity: ${opacity};
            animation-delay: ${animationDelay}s;
            animation-duration: ${2 + Math.random() * 2}s;
          `
        } else {
          // Create star shape using CSS
          star.innerHTML = `
            <svg width="${size * 2}" height="${size * 2}" viewBox="0 0 24 24" fill="currentColor" class="text-white">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          `
          star.className = "absolute animate-pulse"
          star.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            opacity: ${opacity};
            animation-delay: ${animationDelay}s;
            animation-duration: ${2 + Math.random() * 2}s;
            filter: ${size > 3 ? "drop-shadow(0 0 4px rgba(255,255,255,0.5))" : "none"};
          `
        }

        container.appendChild(star)
      }
    })
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }} />
  )
}
