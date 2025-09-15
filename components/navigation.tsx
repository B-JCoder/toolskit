"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  ChevronDown,
  Zap,
  Globe,
  Calculator,
  GraduationCap,
  Heart,
  Keyboard,
} from "lucide-react"

const tools = [
  { name: "CPS Checker", href: "/cps-checker", icon: Zap, desc: "Test your clicking speed" },
  { name: "Japanese Name Generator", href: "/japanese-names", icon: Globe, desc: "Generate Japanese names" },
  { name: "GrowAGarden Calculator", href: "/growagarden", icon: Calculator, desc: "Garden growth metrics" },
  { name: "GPA Calculator", href: "/gpa-calculator", icon: GraduationCap, desc: "Calculate GPA easily" },
  { name: "BMI Calculator", href: "/bmi-calculator", icon: Heart, desc: "Check your body mass index" },
  { name: "Typing Speed Checker", href: "/typing-speed", icon: Keyboard, desc: "Test typing speed & accuracy" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-background/40 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            Toolkit
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors font-medium">
              About
            </Link>

            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-primary transition-colors font-medium">
                Tools <ChevronDown className="h-4 w-4" />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute top-12 left-0 w-[480px] 
                             bg-gradient-to-r from-primary to-accent 
                             text-white shadow-2xl rounded-xl 
                             border border-white/10 
                             p-4 grid grid-cols-2 gap-3"
                >
                  {tools.map((tool) => {
                    const Icon = tool.icon
                    return (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/20 transition-all duration-200"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">{tool.name}</div>
                          <div className="text-xs opacity-80">{tool.desc}</div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            <Link href="/contact" className="hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* Request Button */}
          <div className="hidden lg:flex">
            <Button className="rounded-xl shadow-md shadow-primary/30 bg-gradient-to-r from-primary to-accent text-white hover:scale-105 transition-transform">
              Request Custom Tool
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-2 space-y-2 bg-gradient-to-r from-primary to-accent text-white p-4 rounded-xl shadow-md border border-white/10">
            <Link href="/" className="block px-2 py-2 rounded-lg hover:bg-white/20 transition-colors">
              Home
            </Link>
            <Link href="/about" className="block px-2 py-2 rounded-lg hover:bg-white/20 transition-colors">
              About
            </Link>
            <details className="rounded-lg">
              <summary className="px-2 py-2 cursor-pointer hover:text-gray-200">
                Tools
              </summary>
              <div className="pl-2 mt-2 space-y-2">
                {tools.map((tool) => {
                  const Icon = tool.icon
                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <Icon className="h-4 w-4 text-white" />
                      {tool.name}
                    </Link>
                  )
                })}
              </div>
            </details>
            <Link href="/contact" className="block px-2 py-2 rounded-lg hover:bg-white/20 transition-colors">
              Contact
            </Link>
            <Button className="w-full mt-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white shadow-md">
              Request Custom Tool
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
