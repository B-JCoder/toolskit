"use client"

import React from "react"
import { motion } from "framer-motion"

interface BMIGaugeProps {
  bmi: number
  category: string
}

export const BMIGauge: React.FC<BMIGaugeProps> = ({ bmi, category }) => {
  // Gauge position logic
  const getGaugePosition = (bmi: number) => {
    if (bmi < 18.5) return (bmi / 18.5) * 25
    if (bmi < 25) return 25 + ((bmi - 18.5) / (25 - 18.5)) * 25
    if (bmi < 30) return 50 + ((bmi - 25) / (30 - 25)) * 25
    return Math.min(75 + ((bmi - 30) / 10) * 25, 100)
  }

  const position = getGaugePosition(bmi)
  const strokeDasharray = 251.2
  const strokeDashoffset = strokeDasharray - (position / 100) * strokeDasharray

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "underweight":
        return "hsl(var(--bmi-accent))"
      case "normal":
      case "normal weight":
        return "hsl(var(--bmi-success))"
      case "overweight":
        return "hsl(var(--bmi-warning))"
      case "obese":
        return "hsl(var(--bmi-danger))"
      default:
        return "hsl(var(--bmi-primary))"
    }
  }

  const needleRotation = -90 + (position / 100) * 180 // -90° to +90°

  return (
    <div className="relative w-72 h-40 mx-auto">
      <svg viewBox="0 0 200 120" className="w-full h-full">
        {/* Background arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="hsl(var(--bmi-input-border))"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Gradient defs */}
        <defs>
          <linearGradient id="bmiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--bmi-accent))" />
            <stop offset="33%" stopColor="hsl(var(--bmi-success))" />
            <stop offset="66%" stopColor="hsl(var(--bmi-warning))" />
            <stop offset="100%" stopColor="hsl(var(--bmi-danger))" />
          </linearGradient>
        </defs>

        {/* Animated Active Arc */}
        <motion.path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#bmiGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDasharray}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ filter: "drop-shadow(0 0 6px rgba(0,0,0,0.4))" }}
        />

        {/* Needle */}
        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="25"
          stroke={getCategoryColor(category)}
          strokeWidth="4"
          strokeLinecap="round"
          animate={{ rotate: needleRotation }}
          transform="rotate(-90 100 100)"
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <circle cx="100" cy="100" r="6" fill="hsl(var(--bmi-primary))" />

        {/* Labels */}
        <text x="20" y="115" textAnchor="start" className="fill-bmi-muted text-xs font-medium">
          18.5
        </text>
        <text x="100" y="30" textAnchor="middle" className="fill-bmi-muted text-xs font-medium">
          25
        </text>
        <text x="180" y="115" textAnchor="end" className="fill-bmi-muted text-xs font-medium">
          30+
        </text>

        {/* Center BMI Value */}
        <motion.text
          x="100"
          y="95"
          textAnchor="middle"
          className="fill-foreground text-3xl font-bold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {bmi.toFixed(1)}
        </motion.text>
        <text x="100" y="110" textAnchor="middle" className="fill-bmi-muted text-sm font-medium">
          BMI
        </text>
      </svg>

      {/* Category Labels */}
      <div className="absolute -bottom-2 left-0 right-0 flex justify-between text-[10px] sm:text-xs text-bmi-muted px-2">
        <span>Underweight</span>
        <span>Normal</span>
        <span>Overweight</span>
        <span>Obese</span>
      </div>
    </div>
  )
}
