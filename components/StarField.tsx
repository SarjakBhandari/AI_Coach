"use client"

import { useEffect, useState } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  animationDelay: number
  isLarge?: boolean // New property for larger stars
}

export default function StarField() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = []
      // Generate small stars
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1, // Smaller size range
          opacity: Math.random() * 0.6 + 0.2, // Slightly less opaque
          animationDelay: Math.random() * 2,
          isLarge: false,
        })
      }
      // Generate a few large, brighter stars
      for (let i = 100; i < 105; i++) {
        // 5 large stars
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 3, // Larger size range
          opacity: Math.random() * 0.5 + 0.5, // More opaque for brightness
          animationDelay: Math.random() * 2,
          isLarge: true,
        })
      }
      setStars(newStars)
    }

    generateStars()
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute bg-white rounded-full animate-twinkle ${star.isLarge ? "shadow-glow" : ""}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.animationDelay}s`,
          }}
        />
      ))}
    </div>
  )
}
