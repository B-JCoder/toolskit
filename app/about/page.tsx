import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About ToolFixo - Free Web Tools Collection",
  description:
    "Learn about ToolFixo, your go-to collection of free web tools including calculators, generators, and utilities. Discover our mission to provide accessible online tools.",
  keywords: [
    "about toolfixo",
    "web tools",
    "free online tools",
    "calculator tools",
    "utility tools",
  ],
  openGraph: {
    title: "About ToolFixo - Free Web Tools Collection",
    description:
      "Learn about ToolFixo, your go-to collection of free web tools including calculators, generators, and utilities.",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
