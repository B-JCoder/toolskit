import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"

export const metadata: Metadata = {
  title: "About Toolkit - Free Web Tools Collection",
  description:
    "Learn about Toolkit, your go-to collection of free web tools including calculators, generators, and utilities. Discover our mission to provide accessible online tools.",
  keywords: ["about toolkit", "web tools", "free online tools", "calculator tools", "utility tools"],
  openGraph: {
    title: "About Toolkit - Free Web Tools Collection",
    description:
      "Learn about Toolkit, your go-to collection of free web tools including calculators, generators, and utilities.",
    type: "website",
  },
}

export default function AboutPage() {
  return <AboutPageClient />
}
