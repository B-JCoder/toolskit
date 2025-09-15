"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface ResetButtonProps {
  onClick: () => void
  children?: React.ReactNode
}

export function ResetButton({ onClick, children = "Reset" }: ResetButtonProps) {
  return (
    <Button onClick={onClick} variant="outline" className="gap-2 bg-transparent">
      <RotateCcw className="h-4 w-4" />
      {children}
    </Button>
  )
}
