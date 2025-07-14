"use client"

import { useEffect, useState } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  animationDelay: number
  isLarge?: boolean
  isStarShape?: boolean // New property for star-shaped stars
}

// Star shape component
const StarShape = ({ size, className }: { size: number; className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

export default function StarField() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = []

      // Generate small circular stars
      for (let i = 0; i < 80; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          animationDelay: Math.random() * 2,
          isLarge: false,
          isStarShape: false,
        })
      }

      // Generate medium star-shaped stars
      for (let i = 80; i < 95; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 6, // Medium size for star shapes
          opacity: Math.random() * 0.4 + 0.4,
          animationDelay: Math.random() * 3,
          isLarge: false,
          isStarShape: true,
        })
      }

      // Generate large circular stars
      for (let i = 95; i < 100; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 3,
          opacity: Math.random() * 0.5 + 0.5,
          animationDelay: Math.random() * 2,
          isLarge: true,
          isStarShape: false,
        })
      }

      // Generate extra large star-shaped stars
      for (let i = 100; i < 105; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 12 + 10, // Large size for prominent star shapes
          opacity: Math.random() * 0.3 + 0.6,
          animationDelay: Math.random() * 4,
          isLarge: true,
          isStarShape: true,
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
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            animationDelay: `${star.animationDelay}s`,
          }}
        >
          {star.isStarShape ? (
            <StarShape
              size={star.size}
              className={`text-white animate-twinkle ${
                star.isLarge ? "drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" : ""
              }`}
            />
          ) : (
            <div
              className={`bg-white rounded-full animate-twinkle ${star.isLarge ? "shadow-glow" : ""}`}
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
