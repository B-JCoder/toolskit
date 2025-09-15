import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ToolCardProps {
  title: string
  description: string
  children: React.ReactNode
  className?: string
}

export function ToolCard({ title, description, children, className = "max-w-2xl mx-auto" }: ToolCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
