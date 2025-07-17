import Hero from "@/components/Hero"
import Features from "@/components/Features"
import HowItWorks from "@/components/HowItWorks"
import Testimonials from "@/components/Testimonials"
import Pricing from "@/components/Pricing"
import CallToAction from "@/components/CallToAction"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import ScrollToTopButton from "@/components/ScrollToTopButton"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <CallToAction />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}
