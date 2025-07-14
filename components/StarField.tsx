"use client"

import { useEffect, useRef } from "react"

// Star shape component
const StarShape = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Star arrays for different types
    const smallStars: Array<{ x: number; y: number; opacity: number; twinkle: number }> = []
    const mediumStars: Array<{ x: number; y: number; opacity: number; twinkle: number }> = []
    const largeStars: Array<{ x: number; y: number; opacity: number; twinkle: number }> = []

    // Create small circular stars
    for (let i = 0; i < 80; i++) {
      smallStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        opacity: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() * 0.02 + 0.01,
      })
    }

    // Create medium circular stars
    for (let i = 0; i < 15; i++) {
      mediumStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        opacity: Math.random() * 0.9 + 0.1,
        twinkle: Math.random() * 0.03 + 0.01,
      })
    }

    // Create large circular stars
    for (let i = 0; i < 5; i++) {
      largeStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        opacity: Math.random() * 1 + 0.3,
        twinkle: Math.random() * 0.04 + 0.01,
      })
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw small stars
      smallStars.forEach((star) => {
        star.opacity += star.twinkle * (Math.random() > 0.5 ? 1 : -1)
        star.opacity = Math.max(0.1, Math.min(0.8, star.opacity))

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, 1, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw medium stars
      mediumStars.forEach((star) => {
        star.opacity += star.twinkle * (Math.random() > 0.5 ? 1 : -1)
        star.opacity = Math.max(0.2, Math.min(0.9, star.opacity))

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw large stars
      largeStars.forEach((star) => {
        star.opacity += star.twinkle * (Math.random() > 0.5 ? 1 : -1)
        star.opacity = Math.max(0.3, Math.min(1, star.opacity))

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />

      {/* Additional star-shaped elements using React components */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {/* Medium star shapes */}
        {Array.from({ length: 15 }).map((_, i) => (
          <StarShape
            key={`medium-${i}`}
            size={16}
            className={`absolute text-white opacity-60 animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))",
            }}
          />
        ))}

        {/* Large star shapes */}
        {Array.from({ length: 5 }).map((_, i) => (
          <StarShape
            key={`large-${i}`}
            size={24}
            className={`absolute text-white opacity-80 animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))",
            }}
          />
        ))}
      </div>
    </>
  )
}
