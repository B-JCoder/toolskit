"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { ToolCard } from "@/components/tool-card"
import { ResetButton } from "@/components/reset-button"

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
      color: "text-blue-600",
      description: "Below normal weight range",
    }
  }
  if (bmi < 25) {
    return {
      category: "Normal weight",
      color: "text-green-600",
      description: "Healthy weight range",
    }
  }
  if (bmi < 30) {
    return {
      category: "Overweight",
      color: "text-yellow-600",
      description: "Above normal weight range",
    }
  }
  return {
    category: "Obese",
    color: "text-red-600",
    description: "Significantly above normal weight range",
  }
}

export function BMICalculator() {
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [unit, setUnit] = useState("metric") // metric or imperial
  const [result, setResult] = useState<BMIResult | null>(null)

  const calculateBMI = () => {
    const weightNum = Number.parseFloat(weight)
    const heightNum = Number.parseFloat(height)

    if (!weightNum || !heightNum || weightNum <= 0 || heightNum <= 0) {
      setResult(null)
      return
    }

    let bmi: number

    if (unit === "metric") {
      // Weight in kg, height in cm
      const heightInMeters = heightNum / 100
      bmi = weightNum / (heightInMeters * heightInMeters)
    } else {
      // Weight in lbs, height in inches
      bmi = (weightNum / (heightNum * heightNum)) * 703
    }

    const category = getBMICategory(bmi)
    setResult({
      bmi,
      ...category,
    })
  }

  const resetCalculator = () => {
    setWeight("")
    setHeight("")
    setResult(null)
  }

  useEffect(() => {
    calculateBMI()
  }, [weight, height, unit])

  return (
    <ToolCard
      title="BMI Calculator Tool"
      description="Enter your height and weight to calculate your Body Mass Index and understand your health category."
    >
      <div className="space-y-6">
        {/* Unit Selection */}
        <div className="flex justify-center">
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="metric">Metric (kg, cm)</SelectItem>
              <SelectItem value="imperial">Imperial (lbs, in)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Weight {unit === "metric" ? "(kg)" : "(lbs)"}</Label>
            <Input
              id="weight"
              type="number"
              placeholder={unit === "metric" ? "70" : "154"}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height {unit === "metric" ? "(cm)" : "(inches)"}</Label>
            <Input
              id="height"
              type="number"
              placeholder={unit === "metric" ? "175" : "69"}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>
        </div>

        {/* BMI Result */}
        {result && (
          <div className="text-center p-6 rounded-lg bg-muted border">
            <div className="text-3xl font-bold text-foreground mb-2">BMI: {result.bmi.toFixed(1)}</div>
            <div className={`text-lg font-semibold mb-2 ${result.color}`}>{result.category}</div>
            <div className="text-muted-foreground">{result.description}</div>
          </div>
        )}

        {/* BMI Categories Reference */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-center">BMI Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between p-2 rounded bg-blue-50 dark:bg-blue-950/20">
              <span>Underweight</span>
              <span className="text-blue-600">{"< 18.5"}</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-green-50 dark:bg-green-950/20">
              <span>Normal weight</span>
              <span className="text-green-600">18.5 - 24.9</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-yellow-50 dark:bg-yellow-950/20">
              <span>Overweight</span>
              <span className="text-yellow-600">25 - 29.9</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-red-50 dark:bg-red-950/20">
              <span>Obese</span>
              <span className="text-red-600">{"≥ 30"}</span>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-center">
          <ResetButton onClick={resetCalculator}>Reset Calculator</ResetButton>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-muted-foreground text-center">
          <p>
            Note: BMI is a screening tool and does not diagnose body fatness or health. Consult a healthcare provider
            for health assessments.
          </p>
        </div>
      </div>
    </ToolCard>
  )
}
