import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Preloader from "@/components/Preloader"
export const metadata: Metadata = {
  title: {
    default: "Toolkit — Handy Web Tools",
    template: "%s | Toolkit",
  },
  description:
    "A comprehensive collection of handy web tools including BMI calculator, typing speed test, GPA calculator, and more. Free online utilities for productivity and calculations.",
  keywords: [
    "web tools",
    "calculator",
    "typing speed",
    "BMI calculator",
    "GPA calculator",
    "online tools",
    "utilities",
  ],
  authors: [{ name: "Toolkit" }],
  creator: "Toolkit",
  publisher: "Toolkit",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toolkit.example.com",
    title: "Toolkit — Handy Web Tools",
    description: "A comprehensive collection of handy web tools including calculators, generators, and utilities",
    siteName: "Toolkit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolkit — Handy Web Tools",
    description: "A comprehensive collection of handy web tools including calculators, generators, and utilities",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} min-h-screen flex flex-col antialiased`}>
        <ThemeProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Navigation />
             <Preloader />
            <main className="flex-1">{children}</main>
            <Footer />
          </Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
