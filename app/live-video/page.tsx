"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Pause,
  StopCircle,
  Volume2,
  Settings,
  Fullscreen,
  Minimize,
  Share2,
  Download,
  MessageSquare,
  BarChart,
  RefreshCcw,
} from "lucide-react"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export default function LiveVideoPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [volume, setVolume] = useState(50)
  const [micEnabled, setMicEnabled] = useState(true)
  const [cameraEnabled, setCameraEnabled] = useState(true)
  const [analysisEnabled, setAnalysisEnabled] = useState(true)
  const [feedbackEnabled, setFeedbackEnabled] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [chatInput, setChatInput] = useState("")
  const [chatMessages, setChatMessages] = useState([
    { sender: "AI Coach", message: "Great dribbling! Keep your eyes up." },
    { sender: "User", message: "Thanks! Working on my crossover." },
  ])

  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate video stream
    const interval = setInterval(() => {
      if (isPlaying) {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5))
      }
    }, 100)
    return () => clearInterval(interval)
  }, [isPlaying])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // In a real app, this would start/stop media recording
  }

  const toggleFullscreen = () => {
    if (videoContainerRef.current) {
      if (!isFullscreen) {
        videoContainerRef.current.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
      setIsFullscreen(!isFullscreen)
    }
  }

  const handleVolumeChange = (val: number[]) => {
    setVolume(val[0])
    if (videoRef.current) {
      videoRef.current.volume = val[0] / 100
    }
  }

  const handleChatSend = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { sender: "User", message: chatInput.trim() }])
      setChatInput("")
      // Simulate AI response
      setTimeout(() => {
        setChatMessages((prev) => [...prev, { sender: "AI Coach", message: "Understood. Let's refine that." }])
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 text-primary-400"
      >
        Live Training Session
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Video and Controls */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="bg-dark-800 border-primary-500/20 shadow-lg h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Live Feed & Analysis</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col p-0">
              <div
                ref={videoContainerRef}
                className="relative w-full aspect-video bg-black rounded-t-xl overflow-hidden"
              >
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted loop>
                  <source src="/placeholder.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {/* Overlay for AI analysis visualization */}
                {analysisEnabled && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                    <div className="w-3/4 h-3/4 border-4 border-blue-400 rounded-full animate-pulse flex items-center justify-center text-blue-300 text-xl font-bold">
                      AI Analyzing...
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 bg-dark-700 rounded-b-xl">
                <Progress
                  value={progress}
                  className="w-full h-2 mb-4 bg-gray-700 [&::-webkit-progress-bar]:bg-gray-700 [&::-webkit-progress-value]:bg-primary-400"
                />
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={togglePlayPause}
                      className="text-primary-400 hover:bg-dark-600"
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleRecording}
                      className={`text-red-500 hover:bg-dark-600 ${isRecording ? "animate-pulse" : ""}`}
                    >
                      <StopCircle className="h-6 w-6" />
                    </Button>
                    <div className="flex items-center space-x-2">
                      <Volume2 className="h-5 w-5 text-gray-400" />
                      <Slider
                        value={[volume]}
                        onValueChange={handleVolumeChange}
                        max={100}
                        step={1}
                        className="w-24 [&::-webkit-slider-thumb]:bg-primary-400 [&::-webkit-slider-runnable-track]:bg-gray-600"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleFullscreen}
                      className="text-gray-400 hover:bg-dark-600"
                    >
                      {isFullscreen ? <Minimize className="h-6 w-6" /> : <Fullscreen className="h-6 w-6" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-dark-600">
                      <Share2 className="h-6 w-6" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-dark-600">
                      <Download className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Sidebar: Chat, Settings, Analytics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-8"
        >
          {/* Chat */}
          <Card className="bg-dark-800 border-primary-500/20 shadow-lg h-[400px] flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <MessageSquare className="h-6 w-6 mr-2 text-primary-400" /> AI Coach Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col p-4">
              <div className="flex-grow overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === "User" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.sender === "User" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"
                      }`}
                    >
                      <span className="font-semibold">{msg.sender}: </span>
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <Textarea
                  placeholder="Type your message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleChatSend()
                    }
                  }}
                  className="flex-grow bg-dark-700 border-primary-500/30 text-white placeholder:text-gray-500 focus:border-primary-400 resize-none"
                  rows={1}
                />
                <Button onClick={handleChatSend} className="bg-primary-500 hover:bg-primary-600">
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="bg-dark-800 border-primary-500/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <Settings className="h-6 w-6 mr-2 text-primary-400" /> Session Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="mic-toggle" className="text-gray-300">
                  Microphone
                </Label>
                <Switch
                  id="mic-toggle"
                  checked={micEnabled}
                  onCheckedChange={setMicEnabled}
                  className="data-[state=checked]:bg-primary-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="camera-toggle" className="text-gray-300">
                  Camera
                </Label>
                <Switch
                  id="camera-toggle"
                  checked={cameraEnabled}
                  onCheckedChange={setCameraEnabled}
                  className="data-[state=checked]:bg-primary-500"
                />
              </div>
              <Separator className="bg-primary-500/20" />
              <div className="flex items-center justify-between">
                <Label htmlFor="analysis-toggle" className="text-gray-300">
                  AI Analysis
                </Label>
                <Switch
                  id="analysis-toggle"
                  checked={analysisEnabled}
                  onCheckedChange={setAnalysisEnabled}
                  className="data-[state=checked]:bg-primary-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="feedback-toggle" className="text-gray-300">
                  Audio Feedback
                </Label>
                <Switch
                  id="feedback-toggle"
                  checked={feedbackEnabled}
                  onCheckedChange={setFeedbackEnabled}
                  className="data-[state=checked]:bg-primary-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback-level" className="text-gray-300">
                  Feedback Level
                </Label>
                <Select defaultValue="medium">
                  <SelectTrigger
                    id="feedback-level"
                    className="bg-dark-700 border-primary-500/30 text-white focus:ring-primary-400"
                  >
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-700 border-primary-500/30 text-white">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Quick Analytics */}
          <Card className="bg-dark-800 border-primary-500/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <BarChart className="h-6 w-6 mr-2 text-primary-400" /> Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="flex items-center justify-between">
                <span>Shots Made:</span>
                <span className="font-semibold text-primary-400">12/15</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Accuracy:</span>
                <span className="font-semibold text-primary-400">80%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Dribble Efficiency:</span>
                <span className="font-semibold text-primary-400">92%</span>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 border-primary-500 text-primary-400 hover:bg-primary-500/10 bg-transparent"
              >
                <RefreshCcw className="h-4 w-4 mr-2" /> View Full Report
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
