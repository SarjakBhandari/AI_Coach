"use client"

import type React from "react"
import { useRef, useEffect, useCallback } from "react"

const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | null>(null)
  const stars = useRef<
    {
      x: number
      y: number
      z: number
      size: number
      speed: number
      color: string
    }[]
  >([])

  const initStars = useCallback(() => {
    const numStars = 500
    const newStars = []
    for (let i = 0; i < numStars; i++) {
      newStars.push({
        x: Math.random() * 2 - 1, // -1 to 1
        y: Math.random() * 2 - 1, // -1 to 1
        z: Math.random(), // 0 to 1
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.005 + 0.001,
        color: `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`,
      })
    }
    stars.current = newStars
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    stars.current.forEach((star) => {
      star.z -= star.speed
      if (star.z <= 0) {
        star.z = 1 // Reset star to the back
        star.x = Math.random() * 2 - 1
        star.y = Math.random() * 2 - 1
      }

      const x = star.x * (canvas.width / 2) * (1 / star.z) + canvas.width / 2
      const y = star.y * (canvas.height / 2) * (1 / star.z) + canvas.height / 2
      const size = star.size * (1 / star.z)

      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fillStyle = star.color
      ctx.fill()
    })

    animationFrameId.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    initStars()
    animationFrameId.current = requestAnimationFrame(animate)

    const handleResize = () => {
      const canvas = canvasRef.current
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [initStars, animate])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ background: "linear-gradient(to bottom, #000000, #1a1a2e)" }}
    />
  )
}

export default StarField
