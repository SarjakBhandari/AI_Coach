"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { UploadCloud, CheckCircle, XCircle, Video } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

export default function UploadVideoPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [videoTitle, setVideoTitle] = useState("")
  const [videoDescription, setVideoDescription] = useState("")
  const { toast } = useToast()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0]
      if (selectedFile.type.startsWith("video/")) {
        setFile(selectedFile)
        setUploadStatus("idle")
        setUploadProgress(0)
        toast({
          title: "File Selected",
          description: `${selectedFile.name} is ready for upload.`,
        })
      } else {
        setFile(null)
        toast({
          title: "Invalid File Type",
          description: "Please select a video file.",
          variant: "destructive",
        })
      }
    }
  }

  const handleUpload = useCallback(async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a video file to upload.",
        variant: "destructive",
      })
      return
    }

    if (!videoTitle.trim()) {
      toast({
        title: "Missing Title",
        description: "Please enter a title for your video.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadStatus("idle")
    setUploadProgress(0)

    // Simulate upload progress
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 10
      setUploadProgress(currentProgress)
      if (currentProgress >= 100) {
        clearInterval(interval)
        setIsUploading(false)
        setUploadStatus("success")
        toast({
          title: "Upload Complete!",
          description: `${file.name} has been successfully uploaded and is being processed.`,
          className: "bg-green-500 text-white",
        })
        // Reset form after successful upload
        setFile(null)
        setVideoTitle("")
        setVideoDescription("")
      }
    }, 200)

    // Simulate API call for actual upload
    try {
      // In a real application, you would send the file and metadata to your backend
      // const formData = new FormData();
      // formData.append('video', file);
      // formData.append('title', videoTitle);
      // formData.append('description', videoDescription);
      // await fetch('/api/upload-video', { method: 'POST', body: formData });
    } catch (error) {
      clearInterval(interval)
      setIsUploading(false)
      setUploadStatus("error")
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your video. Please try again.",
        variant: "destructive",
      })
    }
  }, [file, videoTitle, videoDescription, toast])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 text-primary-400"
      >
        Upload Your Training Video
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="bg-dark-800 border-primary-500/20 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center">
              <UploadCloud className="h-6 w-6 mr-2 text-primary-400" /> Upload Video
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="video-file" className="text-gray-300">
                Select Video File
              </Label>
              <Input
                id="video-file"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="bg-dark-700 border-primary-500/30 text-white file:text-primary-400 file:bg-dark-600 file:border-0 file:rounded-md file:px-3 file:py-1 hover:file:bg-dark-500"
              />
              {file && (
                <p className="text-sm text-gray-400 mt-2 flex items-center">
                  <Video className="h-4 w-4 mr-1" /> Selected: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                </p>
              )}
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="video-title" className="text-gray-300">
                Video Title
              </Label>
              <Input
                id="video-title"
                type="text"
                placeholder="e.g., My Crossover Drill Session"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="bg-dark-700 border-primary-500/30 text-white placeholder:text-gray-500 focus:border-primary-400"
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="video-description" className="text-gray-300">
                Video Description (Optional)
              </Label>
              <Textarea
                id="video-description"
                placeholder="Add a description for your video..."
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
                className="bg-dark-700 border-primary-500/30 text-white placeholder:text-gray-500 focus:border-primary-400 resize-y min-h-[80px]"
              />
            </div>

            {isUploading && (
              <div className="space-y-2">
                <Label className="text-gray-300">Upload Progress</Label>
                <Progress
                  value={uploadProgress}
                  className="w-full h-3 bg-gray-700 [&::-webkit-progress-bar]:bg-gray-700 [&::-webkit-progress-value]:bg-primary-400"
                />
                <p className="text-sm text-gray-400 text-center">{uploadProgress}% Complete</p>
              </div>
            )}

            {uploadStatus === "success" && (
              <div className="flex items-center justify-center text-green-500 text-lg font-semibold">
                <CheckCircle className="h-6 w-6 mr-2" /> Upload Successful!
              </div>
            )}

            {uploadStatus === "error" && (
              <div className="flex items-center justify-center text-red-500 text-lg font-semibold">
                <XCircle className="h-6 w-6 mr-2" /> Upload Failed!
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={isUploading || !file || !videoTitle.trim()}
              className="w-full bg-gradient-to-r from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 transition-colors duration-300 py-3 text-lg font-semibold"
            >
              {isUploading ? "Uploading..." : "Upload Video for Analysis"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
