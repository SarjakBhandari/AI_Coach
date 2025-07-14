import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import HowItWorks from "@/components/HowItWorks"
import Services from "@/components/Services" // Import new component
import About from "@/components/About" // Import new component
import Testimonials from "@/components/Testimonials"
import Pricing from "@/components/Pricing"
import CallToAction from "@/components/CallToAction"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Services /> {/* Added Services section */}
      <About /> {/* Added About section */}
      <Testimonials />
      <Pricing />
      <CallToAction />
      <Footer />
    </main>
  )
}
