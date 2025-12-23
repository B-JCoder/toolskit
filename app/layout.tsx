import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Suspense } from "react";

// import Preloader from "@/components/Preloader"
export const metadata: Metadata = {
  title: {
    default: "ToolFixo — Handy Web Tools",
    template: "%s | ToolFixo",
  },
  metadataBase: new URL("https://toolfixo.online"),
  alternates: {
    canonical: "/",
  },
  applicationName: "ToolFixo",
  appleWebApp: {
    capable: true,
    title: "ToolFixo",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
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
  authors: [{ name: "ToolFixo" }],
  creator: "ToolFixo",
  publisher: "ToolFixo",
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
    url: "https://toolfixo.online",
    title: "ToolFixo — Handy Web Tools",
    description:
      "A comprehensive collection of handy web tools including calculators, generators, and utilities",
    siteName: "ToolFixo",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolFixo — Handy Web Tools",
    description:
      "A comprehensive collection of handy web tools including calculators, generators, and utilities",
  },
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} min-h-screen flex flex-col antialiased`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Navigation />
          {/* <Preloader />         */}
          <main className="flex-1">{children}</main>
          <Footer />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
