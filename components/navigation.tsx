"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  QrCode,
  Lock,
  Timer,
  RefreshCcw,
} from "lucide-react";

const tools = [
  {
    name: "CPS Checker",
    href: "/cps-checker",
    icon: Zap,
    desc: "Test your clicking speed",
  },
  {
    name: "Japanese Name Generator",
    href: "/japanese-names",
    icon: Globe,
    desc: "Generate Japanese names",
  },
  {
    name: "GrowAGarden Calculator",
    href: "/growagarden",
    icon: Calculator,
    desc: "Garden growth metrics",
  },
  {
    name: "GPA Calculator",
    href: "/gpa-calculator",
    icon: GraduationCap,
    desc: "Calculate GPA easily",
  },
  {
    name: "BMI Calculator",
    href: "/bmi-calculator",
    icon: Heart,
    desc: "Check your body mass index",
  },
  {
    name: "Typing Speed Checker",
    href: "/typing-speed",
    icon: Keyboard,
    desc: "Test typing speed & accuracy",
  },
  {
    name: "QR Code Generator",
    href: "/qr-code",
    icon: QrCode,
    desc: "Create custom QR codes",
  },
  {
    name: "Secure Password",
    href: "/password-generator",
    icon: Lock,
    desc: "Generate strong passwords",
  },
  {
    name: "Pomodoro Timer",
    href: "/pomodoro",
    icon: Timer,
    desc: "Focus timer technique",
  },
  {
    name: "Unit Converter",
    href: "/unit-converter",
    icon: RefreshCcw,
    desc: "Convert various units",
  },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-background/40 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-lg transition-all duration-300"
          >
            ToolFixo
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="hover:text-primary transition-colors font-medium hover:scale-105 duration-200"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-primary transition-colors font-medium hover:scale-105 duration-200"
            >
              About
            </Link>

            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-primary transition-colors font-medium hover:scale-105 duration-200">
                Tools{" "}
                <ChevronDown
                  className="h-4 w-4 transition-transform duration-300"
                  style={{
                    transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {/* Animated Dropdown */}
              <div
                className={`absolute top-6 left-0 w-[480px] 
                  bg-gradient-to-r from-primary to-accent 
                  text-white shadow-2xl rounded-xl 
                  border border-white/10 
                  p-4 grid grid-cols-2 gap-3
                  transition-all duration-300
                  ${
                    dropdownOpen
                      ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }
                `}
              >
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/20 transition-all duration-200 shadow hover:shadow-lg"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shadow">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{tool.name}</div>
                        <div className="text-xs opacity-80">{tool.desc}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <Link
              href="/contact"
              className="hover:text-primary transition-colors font-medium hover:scale-105 duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Request Button */}
          <div className="hidden lg:flex">
            <Button className="rounded-xl shadow-md shadow-primary/30 bg-gradient-to-r from-primary to-accent text-white hover:scale-105 transition-transform duration-200 hover:shadow-xl">
              Request Custom Tool
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="transition-all duration-200"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`lg:hidden absolute left-0 right-0 top-16 space-y-2 bg-gradient-to-r from-primary to-accent text-white p-4 shadow-md border-t border-white/10 transition-all duration-300 ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }`}
        >
          <Link
            href="/"
            className="block px-2 py-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block px-2 py-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            About
          </Link>

          <details className="rounded-lg">
            <summary className="px-2 py-2 cursor-pointer hover:text-gray-200 transition-colors">
              Tools
            </summary>
            <div className="pl-2 mt-2 space-y-2">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <Icon className="h-4 w-4 text-white" />
                    {tool.name}
                  </Link>
                );
              })}
            </div>
          </details>

          <Link
            href="/contact"
            className="block px-2 py-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            Contact
          </Link>
          <Button className="w-full mt-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white shadow-md">
            Request Custom Tool
          </Button>
        </div>
      </div>
    </nav>
  );
}
