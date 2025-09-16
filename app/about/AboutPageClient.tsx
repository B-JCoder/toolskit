"use client"

import { Info, Target, Users, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { motion } from "framer-motion"

export default function AboutPageClient() {
  return (
  <div className="container mx-auto px-4 py-16">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "About", href: "/about" }]} />

      {/* Hero Intro */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6 drop-shadow-lg">
          About Toolkit
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
          Your comprehensive collection of free, easy-to-use web tools designed to make everyday
          tasks simpler and more efficient.
        </p>
      </motion.div>

      {/* Mission & Why Choose */}
      <div className="grid md:grid-cols-2 gap-10 mb-20">
        {[
          {
            icon: <Target className="h-6 w-6 text-white" />,
            title: "Our Mission",
            desc: "To provide accessible, reliable, and user-friendly web tools that help people accomplish their daily tasks more efficiently. We believe in making powerful utilities available to everyone, completely free.",
          },
          {
            icon: <Zap className="h-6 w-6 text-white" />,
            title: "Why Choose Toolkit?",
            desc: (
              <ul className="space-y-2">
                <li>• Completely free to use</li>
                <li>• No registration required</li>
                <li>• Mobile-friendly design</li>
                <li>• Fast and reliable</li>
                <li>• Privacy-focused</li>
              </ul>
            ),
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <Card className="shadow-xl border border-border/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-background/70 backdrop-blur-md">
              <CardHeader className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-gradient-to-tr from-primary to-accent shadow-lg">
                  {item.icon}
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tools Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-20"
      >
        <Card className="shadow-xl border border-border/50 bg-background/70 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Users className="h-5 w-5 text-primary" />
              Our Tools
            </CardTitle>
            <CardDescription>A growing collection of utilities for different needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Health & Fitness", desc: "BMI Calculator for health monitoring" },
                { title: "Education", desc: "GPA Calculator for academic tracking" },
                { title: "Productivity", desc: "Typing Speed Test for skill improvement" },
                { title: "Gaming", desc: "CPS Checker for click speed testing" },
                { title: "Creative", desc: "Japanese Name Generator for projects" },
                { title: "Gardening", desc: "Garden Calculator for planning" },
              ].map((tool, i) => (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-5 border border-border rounded-xl hover:shadow-lg transition-all duration-300 bg-background/60 hover:-translate-y-1"
                >
                  <h3 className="font-semibold text-lg mb-2">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground">{tool.desc}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Privacy Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Card className="shadow-xl border border-border/50 bg-background/70 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
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
              <li>• We do not store or transmit your personal data</li>
              <li>• No tracking cookies or invasive analytics</li>
              <li>• Open-source and transparent development</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
