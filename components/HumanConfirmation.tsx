"use client"
import { ChevronDown } from "lucide-react"

export default function HumanConfirmation() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="flex flex-col items-center text-center space-y-6 max-w-md w-full">
        {/* Title */}
        <h1 className="text-4xl font-bold text-[#E87C07]">Let&apos;s confirm you are human</h1>

        {/* Description */}
        <p className="text-base text-gray-700 leading-relaxed">
          Complete the security check before continuing. This step verifies that you are not a bot, which helps to
          protect your account and prevent spam.
        </p>

        {/* Begin Button */}
        <button className="bg-[#E87C07] hover:bg-[#d47006] text-white font-semibold py-3 px-8 rounded-md shadow-md transition-colors duration-200 flex items-center justify-center space-x-2">
          <span>Begin</span>
          <span className="ml-1">{">"}</span>
        </button>

        {/* Language Dropdown */}
        <div className="relative mt-8">
          <select
            className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-4 pr-10 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#E87C07] focus:border-[#E87C07] cursor-pointer"
            defaultValue="English"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  )
}
