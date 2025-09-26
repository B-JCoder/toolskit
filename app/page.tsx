"use client"

import HeroSection from "@/components/Hero"
import ToolsSection from "@/components/ToolsSection"
import { BMICalculator } from "@/components/bmi-calculator/BMICalculator"
import { CPSChecker } from "@/components/cps-checker/cps-checker"
import { GPACalculator } from "@/components/gpa-calculator/gpa-calculator"
import { GrowAGarden } from "@/components/growagarden/growagarden"
import { JapaneseNames } from "@/components/japanese-names/japanese-names"
import  TypingSpeed  from "@/components/typing-speed/typing-speed"
import { FeaturesSection } from "@/components/FeaturesSection"
import CtaSection from "@/components/Ctasection"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"


export default function HomePage() {
   const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />
<FeaturesSection />
<ToolsSection />
      {/* Tools Section */}
      <section className="py-16 sm:py-20 bg-muted/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-lg">
              Explore Our Powerful Tools
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              A collection of smart and free utilities designed to make your life easier —
              from productivity to fun!
            </p>
          </div>

          {/* Grid of Tools */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* BMI Calculator */}
            <div className="p-6 rounded-2xl bg-card shadow-lg border border-border hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-primary mb-2">BMI Calculator</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Instantly check your Body Mass Index and stay aware of your health.
              </p>
              <BMICalculator />
            </div>

            {/* CPS Checker */}
            <div className="p-6 rounded-2xl bg-card shadow-lg border border-border hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-primary mb-2">CPS Checker</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Test your clicks per second and challenge your speed.
              </p>
              <CPSChecker />
            </div>

            {/* GPA Calculator */}
            <div className="p-6 rounded-2xl bg-card shadow-lg border border-border hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-primary mb-2">GPA Calculator</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Calculate your GPA with accuracy and keep track of academic progress.
              </p>
              <GPACalculator />
            </div>

            {/* GrowAGarden */}
            <div className="p-6 rounded-2xl bg-card shadow-lg border border-border hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-primary mb-2">GrowAGarden</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Plan and calculate your garden’s growth metrics in seconds.
              </p>
              <GrowAGarden />
            </div>

            {/* Japanese Name Generator */}
            <div className="p-6 rounded-2xl bg-card shadow-lg border border-border hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-primary mb-2">Japanese Name Generator</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Generate authentic Japanese names instantly for fun or projects.
              </p>
              <JapaneseNames />
            </div>

            {/* Typing Speed Checker */}
            <div className="p-6 rounded-2xl bg-card shadow-lg border border-border hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-primary mb-2">Typing Speed Checker</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Measure your typing speed and accuracy with instant feedback.
              </p>
              <TypingSpeed />
            </div>
          </div>
        </div>
      </section>
      <CtaSection />

 <AnimatedTestimonials testimonials={testimonials} />


      {/* Features Section */}
      
    </div>
  )
}
