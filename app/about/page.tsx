import type { Metadata } from "next"
import { Info, Target, Users, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"

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
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "About", href: "/about" }]} />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">About Toolkit</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Your comprehensive collection of free, easy-to-use web tools designed to make everyday tasks simpler and
            more efficient.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To provide accessible, reliable, and user-friendly web tools that help people accomplish their daily
                tasks more efficiently. We believe in making powerful utilities available to everyone, completely free.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Why Choose Toolkit?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Completely free to use</li>
                <li>• No registration required</li>
                <li>• Mobile-friendly design</li>
                <li>• Fast and reliable</li>
                <li>• Privacy-focused</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Our Tools
            </CardTitle>
            <CardDescription>A growing collection of utilities designed for various needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold mb-2">Health & Fitness</h3>
                <p className="text-sm text-muted-foreground">BMI Calculator for health monitoring</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold mb-2">Education</h3>
                <p className="text-sm text-muted-foreground">GPA Calculator for academic tracking</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold mb-2">Productivity</h3>
                <p className="text-sm text-muted-foreground">Typing Speed Test for skill improvement</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold mb-2">Gaming</h3>
                <p className="text-sm text-muted-foreground">CPS Checker for click speed testing</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold mb-2">Creative</h3>
                <p className="text-sm text-muted-foreground">Japanese Name Generator for projects</p>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold mb-2">Gardening</h3>
                <p className="text-sm text-muted-foreground">Garden Calculator for planning</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We respect your privacy and are committed to protecting your personal information:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• All calculations are performed locally in your browser</li>
              <li>• We don't store or transmit your personal data</li>
              <li>• No tracking cookies or invasive analytics</li>
              <li>• Open-source and transparent development</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
