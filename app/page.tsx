

import { Calculator, Heart, Keyboard,  } from "lucide-react"
import HeroSection from "@/components/Hero"
import ToolsSection from "@/components/ToolsSection"

import { FeaturesSection } from "@/components/FeaturesSection"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
    <HeroSection />

      {/* Tools Grid */}
     <ToolsSection />
<FeaturesSection />
      {/* Features Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8 drop-shadow-sm">
            Why Choose Our Tools?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-primary mb-2 drop-shadow-sm">Fast & Accurate</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                All calculations and tests are performed instantly with precise results
              </p>
            </div>
            <div className="text-center">
              <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-primary mb-2 drop-shadow-sm">Free to Use</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                No registration required. All tools are completely free and always will be
              </p>
            </div>
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                <Keyboard className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-primary mb-2 drop-shadow-sm">Easy to Use</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Simple, intuitive interfaces designed for quick and efficient use
              </p>
            </div>
          </div>
        </div>
      </section>
       
    </div>
  )
}
