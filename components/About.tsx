import type React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                About AI Coach
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Revolutionizing Basketball Training with AI
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                AI Coach leverages cutting-edge artificial intelligence to provide personalized training, real-time
                feedback, and in-depth performance analysis for basketball players of all levels.
              </p>
            </div>
            <ul className="grid gap-2 py-4">
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4" />
                Personalized training plans tailored to your needs.
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4" />
                Real-time feedback on your technique and performance.
              </li>
              <li>
                <CheckIcon className="mr-2 inline-block h-4 w-4" />
                In-depth analytics to track your progress and identify areas for improvement.
              </li>
            </ul>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button href="#" variant="default">
                Learn More
              </Button>
              <Button href="#" variant="outline">
                Sign Up
              </Button>
            </div>
          </div>
          <Image
            alt="About AI Coach"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            height="310"
            src="/placeholder.svg"
            width="550"
          />
        </div>
      </div>
    </section>
  )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
