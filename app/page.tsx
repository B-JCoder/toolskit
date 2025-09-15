import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, Type, Sprout, GraduationCap, Heart, Keyboard, MousePointer } from "lucide-react"

const tools = [
  {
    name: "CPS Checker",
    description: "Test your clicking speed with our clicks per second checker",
    href: "/cps-checker",
    icon: MousePointer,
    category: "Testing",
  },
  {
    name: "Japanese Name Generator",
    description: "Generate authentic Japanese names for characters or projects",
    href: "/japanese-names",
    icon: Type,
    category: "Generator",
  },
  {
    name: "GrowAGarden Calculator",
    description: "Calculate optimal garden layouts and plant spacing",
    href: "/growagarden",
    icon: Sprout,
    category: "Calculator",
  },
  {
    name: "GPA Calculator",
    description: "Calculate your Grade Point Average with ease",
    href: "/gpa-calculator",
    icon: GraduationCap,
    category: "Calculator",
  },
  {
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index and health metrics",
    href: "/bmi-calculator",
    icon: Heart,
    category: "Calculator",
  },
  {
    name: "Typing Speed Checker",
    description: "Test and improve your typing speed and accuracy",
    href: "/typing-speed",
    icon: Keyboard,
    category: "Testing",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 text-balance drop-shadow-sm">
            Handy Web Tools
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto px-2">
            A collection of useful online tools to help you with calculations, testing, and generation tasks. All tools
            are free to use and work directly in your browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="#tools">Explore Tools</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-8 sm:mb-12 drop-shadow-sm">
            Available Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {tools.map((tool) => {
              const IconComponent = tool.icon
              return (
                <Card key={tool.href} className="hover:shadow-lg transition-shadow duration-200 h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                        <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {tool.category}
                      </span>
                    </div>
                    <CardTitle className="text-lg sm:text-xl leading-tight">{tool.name}</CardTitle>
                    <CardDescription className="text-muted-foreground text-sm sm:text-base">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button asChild className="w-full" size="sm">
                      <Link href={tool.href}>Use Tool</Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

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
