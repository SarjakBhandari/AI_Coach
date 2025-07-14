"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"

interface Star {
  x: number
  y: number
  size: number
  alpha: number
  type: "circle" | "star"
  rotation?: number
}

const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stars, setStars] = useState<Star[]>([])
  const animationFrameId = useRef<number | null>(null)

  const createStars = useCallback(() => {
    const newStars: Star[] = []
    const numSmallCircles = 80
    const numMediumStars = 15
    const numLargeCircles = 5
    const numExtraLargeStars = 5

    // Small circles
    for (let i = 0; i < numSmallCircles; i++) {
      newStars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.3,
        type: "circle",
      })
    }

    // Medium stars
    for (let i = 0; i < numMediumStars; i++) {
      newStars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 2 + 1.5,
        alpha: Math.random() * 0.6 + 0.4,
        type: "star",
        rotation: Math.random() * Math.PI * 2,
      })
    }

    // Large circles
    for (let i = 0; i < numLargeCircles; i++) {
      newStars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 2.5 + 1.5,
        alpha: Math.random() * 0.7 + 0.5,
        type: "circle",
      })
    }

    // Extra large stars
    for (let i = 0; i < numExtraLargeStars; i++) {
      newStars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 3 + 2.5,
        alpha: Math.random() * 0.8 + 0.6,
        type: "star",
        rotation: Math.random() * Math.PI * 2,
      })
    }

    setStars(newStars)
  }, [])

  const drawStar = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    spikes: number,
    outerRadius: number,
    innerRadius: number,
    rotation: number,
  ) => {
    let rot = (Math.PI / 2) * 3 + rotation
    let x = cx
    let y = cy
    const step = Math.PI / spikes

    ctx.beginPath()
    ctx.moveTo(cx, cy - outerRadius)
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius
      y = cy + Math.sin(rot) * outerRadius
      ctx.lineTo(x, y)
      rot += step

      x = cx + Math.cos(rot) * innerRadius
      y = cy + Math.sin(rot) * innerRadius
      ctx.lineTo(x, y)
      rot += step
    }
    ctx.lineTo(cx, cy - outerRadius)
    ctx.closePath()
    ctx.fill()
  }

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    stars.forEach((star) => {
      star.alpha += Math.random() * 0.005 * (Math.random() > 0.5 ? 1 : -1)
      if (star.alpha > 1) star.alpha = 1
      if (star.alpha < 0.1) star.alpha = 0.1

      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`

      if (star.type === "circle") {
        ctx.beginPath()
        ctx.arc(star.x * canvas.width, star.y * canvas.height, star.size, 0, Math.PI * 2)
        ctx.fill()
      } else {
        // Draw a 5-pointed star
        const outerRadius = star.size * 2
        const innerRadius = star.size
        drawStar(ctx, star.x * canvas.width, star.y * canvas.height, 5, outerRadius, innerRadius, star.rotation || 0)

        // Add a subtle glow for larger stars
        if (star.size > 2) {
          ctx.shadowBlur = star.size * 2
          ctx.shadowColor = `rgba(173, 216, 230, ${star.alpha * 0.8})` // Light blue glow
          ctx.fill() // Redraw to apply shadow
          ctx.shadowBlur = 0 // Reset shadow
        }
      }
    })

    animationFrameId.current = requestAnimationFrame(animate)
  }, [stars])

  useEffect(() => {
    createStars()
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
  }, [animate, createStars])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  )
}

export default StarField
