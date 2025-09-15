import { Calculator, Keyboard, MousePointerClick, BarChart3 } from "lucide-react"

export interface Tool {
  href: string
  name: string
  description: string
  category: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export const tools: Tool[] = [
  {
    href: "/tools/cps-checker",
    name: "CPS Checker",
    description: "Test your clicks per second speed with our CPS tool.",
    category: "Testing",
    icon: MousePointerClick,
  },
  {
    href: "/tools/japanese-name-generator",
    name: "Japanese Name Generator",
    description: "Generate authentic Japanese names instantly.",
    category: "Generator",
    icon: Keyboard,
  },
  {
    href: "/tools/gpa-calculator",
    name: "GPA Calculator",
    description: "Easily calculate your GPA with weighted & unweighted options.",
    category: "Calculator",
    icon: Calculator,
  },
  {
    href: "/tools/bmi-calculator",
    name: "BMI Calculator",
    description: "Check your Body Mass Index for a healthier lifestyle.",
    category: "Health",
    icon: BarChart3,
  },
  // You can add more tools here...
]
