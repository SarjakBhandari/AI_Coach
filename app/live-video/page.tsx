"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"
import Link from "next/link"
import StarField from "@/components/StarField" // Import StarField

export default function LiveVideoPage() {
  const [isStreaming, setIsStreaming] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      streamRef.current = stream
      setIsStreaming(true)
    } catch (err) {
      console.error("Error accessing camera:", err)
      alert("Could not access camera. Please ensure you have a camera and have granted permissions.")
    }
  }

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
      setIsStreaming(false)
    }
  }

  const resetStream = () => {
    stopStream()
    // Optionally, you could restart automatically here if desired
    // startStream();
  }

  useEffect(() => {
    // Cleanup stream when component unmounts
    return () => {
      stopStream()
    }
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white p-4 overflow-hidden">
      <StarField /> {/* Added StarField */}
      <div className="relative z-10 w-full max-w-4xl bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-xl p-8 shadow-lg space-y-8">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">
          Live Video Coaching
        </h1>
        <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
          {/* Placeholder for video feed */}
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover"></video>
          {!isStreaming && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg">Camera Feed</div>
          )}
        </div>
        <div className="flex justify-center gap-4">
          <Button
            onClick={isStreaming ? stopStream : startStream}
            className={`px-6 py-3 text-lg ${
              isStreaming
                ? "bg-destructive hover:bg-destructive/80"
                : "bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/25"
            }`}
          >
            {isStreaming ? <Pause className="mr-2" /> : <Play className="mr-2" />}
            {isStreaming ? "Stop" : "Start"}
          </Button>
          <Button
            onClick={resetStream}
            disabled={!isStreaming && videoRef.current?.srcObject === null}
            className="px-6 py-3 text-lg bg-gray-700 hover:bg-gray-600"
          >
            <RotateCcw className="mr-2" />
            Reset
          </Button>
        </div>
        <div className="text-center mt-4">
          <Link href="/" className="text-primary-400 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
