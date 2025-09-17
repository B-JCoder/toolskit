"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react"
import { ToolCard } from "@/components/tool-card"
import { ResetButton } from "@/components/reset-button"
import { motion } from "framer-motion"

interface BMIResult {
  bmi: number
  category: string
  color: string
  description: string
}

const getBMICategory = (bmi: number): Omit<BMIResult, "bmi"> => {
  if (bmi < 18.5) {
    return {
      category: "Underweight",
      color: "text-blue-500",
      description: "Below normal weight range",
    }
  }
  if (bmi < 25) {
    return {
      category: "Normal weight",
      color: "text-green-500",
      description: "Healthy weight range",
    }
  }
  if (bmi < 30) {
    return {
      category: "Overweight",
      color: "text-yellow-500",
      description: "Above normal weight range",
    }
  }
  return {
    category: "Obese",
    color: "text-red-500",
    description: "Significantly above normal weight range",
  }
}

export function BMICalculator() {
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [unit, setUnit] = useState("metric") // metric or imperial
  const [result, setResult] = useState<BMIResult | null>(null)

  const resetCalculator = () => {
    setWeight("")
    setHeight("")
    setResult(null)
  }

  useEffect(() => {
    const weightNum = Number.parseFloat(weight)
    const heightNum = Number.parseFloat(height)

    if (!weightNum || !heightNum || weightNum <= 0 || heightNum <= 0) {
      setResult(null)
      return
    }

    let bmi: number

    if (unit === "metric") {
      const heightInMeters = heightNum / 100
      bmi = weightNum / (heightInMeters * heightInMeters)
    } else {
      bmi = (weightNum / (heightNum * heightNum)) * 703
    }

    const category = getBMICategory(bmi)
    setResult({
      bmi,
      ...category,
    })
  }, [weight, height, unit])

  return (
    <ToolCard
      title="BMI Calculator Tool"
      description="Check your Body Mass Index (BMI) and learn which category you fall into — stay on track with your health goals."
    >
      <div className="space-y-8">
        {/* Unit Selection */}
        <div className="flex justify-center">
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger className="w-52 bg-background border-primary/30 shadow-sm hover:shadow-md transition-all">
              <SelectValue placeholder="Choose unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="metric">Metric (kg, cm)</SelectItem>
              <SelectItem value="imperial">Imperial (lbs, in)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Label htmlFor="weight" className="font-semibold">
              Weight {unit === "metric" ? "(kg)" : "(lbs)"}
            </Label>
            <Input
              id="weight"
              type="number"
              placeholder={unit === "metric" ? "70" : "154"}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min="0"
              step="0.1"
              className="rounded-xl border-primary/30 shadow-sm focus:ring-2 focus:ring-primary/50"
            />
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Label htmlFor="height" className="font-semibold">
              Height {unit === "metric" ? "(cm)" : "(inches)"}
            </Label>
            <Input
              id="height"
              type="number"
              placeholder={unit === "metric" ? "175" : "69"}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              min="0"
              step="0.1"
              className="rounded-xl border-primary/30 shadow-sm focus:ring-2 focus:ring-primary/50"
            />
          </motion.div>
        </div>

        {/* BMI Result */}
        {result && (
          <motion.div
            className="text-center p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-4xl font-extrabold text-foreground mb-2">
              BMI: {result.bmi.toFixed(1)}
            </div>
            <div className={`text-lg font-semibold mb-2 ${result.color}`}>
              {result.category}
            </div>
            <div className="text-muted-foreground">{result.description}</div>
          </motion.div>
        )}

        {/* BMI Categories Reference */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            BMI Categories
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 shadow-sm">
              <span>Underweight</span>
              <span className="text-blue-500">{"< 18.5"}</span>
            </div>
            <div className="flex justify-between p-3 rounded-lg bg-green-50 dark:bg-green-950/20 shadow-sm">
              <span>Normal weight</span>
              <span className="text-green-500">18.5 - 24.9</span>
            </div>
            <div className="flex justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 shadow-sm">
              <span>Overweight</span>
              <span className="text-yellow-500">25 - 29.9</span>
            </div>
            <div className="flex justify-between p-3 rounded-lg bg-red-50 dark:bg-red-950/20 shadow-sm">
              <span>Obese</span>
              <span className="text-red-500">{">= 30"}</span>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-center">
          <ResetButton onClick={resetCalculator}>
            Reset Calculator
          </ResetButton>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-muted-foreground text-center">
          <p>
            Note: BMI is a general guideline and does not diagnose health conditions.
            Always consult a healthcare provider for medical advice.
          </p>
        </div>
      </div>
    </ToolCard>
  )
}
