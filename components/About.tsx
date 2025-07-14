import type React from "react"
import Image from "next/image"

export default function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="relative h-[400px] w-full overflow-hidden rounded-xl shadow-lg">
            <Image
              src="/placeholder.svg"
              alt="AI Coach"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Revolutionize Your Basketball Training with AI
            </h2>
            <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our AI-powered basketball training platform provides personalized coaching, real-time feedback, and
              data-driven insights to help you unlock your full potential on the court.
            </p>
            <ul className="grid gap-4 text-gray-300">
              <li className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 text-primary-400" />
                Personalized training plans tailored to your unique needs.
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 text-primary-400" />
                Real-time feedback on your form, technique, and performance.
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-5 w-5 text-primary-400" />
                Advanced analytics to track your progress and identify areas for improvement.
              </li>
            </ul>
          </div>
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
