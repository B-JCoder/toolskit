"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { tools, Tool } from "@/app/data/tools"
import { easeInOut } from "framer-motion"

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeInOut, // ✅ use function instead of string
    },
  },
}
// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}



export default function ToolsSection() {
  return (
    <section
      id="tools"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-center text-primary mb-12 drop-shadow-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🚀 Available Tools
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {tools.map((tool: Tool) => {
            const IconComponent = tool.icon
            return (
              <motion.div key={tool.href} variants={itemVariants}>
                <Card className="relative h-full border border-border/50 bg-background/70 backdrop-blur-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-primary/20 via-accent/20 to-primary/10 blur-2xl" />

                  <CardHeader className="relative pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-primary/90 bg-primary/10 px-2.5 py-1 rounded-full">
                        {tool.category}
                      </span>
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-semibold leading-tight">
                      {tool.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-sm sm:text-base mt-1">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button
                      asChild
                      className="w-full group-hover:scale-105 transition-transform duration-200"
                      size="sm"
                    >
                      <Link href={tool.href}>Use Tool</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
