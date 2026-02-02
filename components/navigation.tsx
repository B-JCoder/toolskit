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

const legalLinks = [
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
  { name: "Disclaimer", href: "/disclaimer" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-background/40 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-lg"
          >
            ToolFixo
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/blog">Blog</NavLink>

            {/* Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 font-medium hover:text-primary transition">
                Tools
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute top-7 left-0 w-[30rem] rounded-xl bg-gradient-to-r from-primary to-accent 
                p-4 grid grid-cols-2 gap-3 text-white shadow-2xl border border-white/10 transition-all duration-300
                ${
                  dropdownOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                {tools.map(({ name, href, icon: Icon, desc }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex gap-3 p-3 rounded-xl hover:bg-white/20 transition"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{name}</p>
                      <p className="text-xs opacity-80">{desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* <NavLink href="/contact">Contact</NavLink> */}

            {/* Legal Links */}
            {legalLinks.map(({ name, href }) => (
              <NavLink key={href} href={href}>
                {name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
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
          className={`lg:hidden absolute left-0 right-0 top-16 bg-gradient-to-r from-primary to-accent 
          text-white p-4 space-y-2 shadow-md transition-all duration-300
          ${
            isOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <MobileLink href="/">Home</MobileLink>
          <MobileLink href="/about">About</MobileLink>
          <MobileLink href="/blog">Blog</MobileLink>

          <details className="rounded-lg">
            <summary className="cursor-pointer px-2 py-2">Tools</summary>
            <div className="pl-3 space-y-2">
              {tools.map(({ name, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/20"
                >
                  <Icon className="h-4 w-4" />
                  {name}
                </Link>
              ))}
            </div>
          </details>

          {/* <MobileLink href="/contact">Contact</MobileLink> */}

          {/* Legal Links Mobile */}
          {legalLinks.map(({ name, href }) => (
            <MobileLink key={href} href={href}>
              {name}
            </MobileLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* Reusable Components */
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="font-medium hover:text-primary transition hover:scale-105"
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block px-2 py-2 rounded-lg hover:bg-white/20 transition"
    >
      {children}
    </Link>
  );
}
