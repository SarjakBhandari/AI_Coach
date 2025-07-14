"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, Eye } from "lucide-react"
import Link from "next/link"
import StarField from "@/components/StarField" // Import StarField

export default function UploadVideoPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setSelectedFile(file)
    if (file) {
      setPreviewUrl(URL.createObjectURL(file))
    } else {
      setPreviewUrl(null)
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      alert(`Uploading file: ${selectedFile.name}`)
      // In a real application, you would send this file to a server
      // e.g., using FormData and fetch API
      console.log("File to upload:", selectedFile)
      // Reset after simulated upload
      setSelectedFile(null)
      setPreviewUrl(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } else {
      alert("Please select a video file to upload.")
    }
  }

  const handleCancel = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white p-4 overflow-hidden">
      <StarField /> {/* Added StarField */}
      <div className="relative z-10 w-full max-w-4xl bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-xl p-8 shadow-lg space-y-8">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">
          Upload Video for Analysis
        </h1>
        <div className="space-y-4">
          <label
            htmlFor="video-upload"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-primary-500/50 rounded-lg cursor-pointer bg-gray-900 hover:bg-gray-800 transition-colors"
          >
            <Upload className="h-12 w-12 text-primary-400 mb-3" />
            <span className="text-lg font-semibold text-gray-300">Drag & Drop your video here</span>
            <span className="text-sm text-gray-500">or click to browse</span>
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </label>
          {selectedFile && <p className="text-center text-gray-300">Selected file: {selectedFile.name}</p>}
        </div>

        {previewUrl && (
          <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
            <video src={previewUrl} controls className="w-full h-full object-contain"></video>
          </div>
        )}

        <div className="flex justify-center gap-4">
          <Button
            onClick={handleUpload}
            disabled={!selectedFile}
            className="px-6 py-3 text-lg bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/25"
          >
            <Upload className="mr-2" />
            Upload Video
          </Button>
          <Button
            onClick={handleCancel}
            disabled={!selectedFile}
            className="px-6 py-3 text-lg bg-gray-700 hover:bg-gray-600"
          >
            <X className="mr-2" />
            Cancel
          </Button>
          {previewUrl && (
            <Button
              onClick={() => window.open(previewUrl, "_blank")}
              className="px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700"
            >
              <Eye className="mr-2" />
              Preview
            </Button>
          )}
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
