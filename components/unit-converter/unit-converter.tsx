"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRightLeft } from "lucide-react"

type Category = "length" | "weight" | "temperature" | "area"

const CONVERSION_RATES: Record<string, number> = {
  // Length (base: meter)
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  mi: 1609.34,
  yd: 0.9144,
  ft: 0.3048,
  in: 0.0254,

  // Weight (base: kg)
  kg: 1,
  g: 0.001,
  mg: 0.000001,
  lb: 0.453592,
  oz: 0.0283495,

  // Area (base: sq meter)
  sqm: 1,
  sqkm: 1000000,
  sqft: 0.092903,
  sqyd: 0.836127,
  acre: 4046.86,
  hectare: 10000,
}

const UNITS = {
  length: [
    { value: "m", label: "Meters (m)" },
    { value: "km", label: "Kilometers (km)" },
    { value: "cm", label: "Centimeters (cm)" },
    { value: "mm", label: "Millimeters (mm)" },
    { value: "mi", label: "Miles (mi)" },
    { value: "yd", label: "Yards (yd)" },
    { value: "ft", label: "Feet (ft)" },
    { value: "in", label: "Inches (in)" },
  ],
  weight: [
    { value: "kg", label: "Kilograms (kg)" },
    { value: "g", label: "Grams (g)" },
    { value: "mg", label: "Milligrams (mg)" },
    { value: "lb", label: "Pounds (lb)" },
    { value: "oz", label: "Ounces (oz)" },
  ],
  temperature: [
    { value: "c", label: "Celsius (°C)" },
    { value: "f", label: "Fahrenheit (°F)" },
    { value: "k", label: "Kelvin (K)" },
  ],
  area: [
    { value: "sqm", label: "Square Meters (m²)" },
    { value: "sqkm", label: "Square Kilometers (km²)" },
    { value: "sqft", label: "Square Feet (ft²)" },
    { value: "sqyd", label: "Square Yards (yd²)" },
    { value: "acre", label: "Acres" },
    { value: "hectare", label: "Hectares" },
  ],
}

export function UnitConverter() {
  const [category, setCategory] = useState<Category>("length")
  const [amount, setAmount] = useState<string>("1")
  const [fromUnit, setFromUnit] = useState<string>("m")
  const [toUnit, setToUnit] = useState<string>("ft")

  const handleCategoryChange = (value: string) => {
    const cat = value as Category
    setCategory(cat)
    // Set default units for new category
    if (cat === "length") { setFromUnit("m"); setToUnit("ft") }
    else if (cat === "weight") { setFromUnit("kg"); setToUnit("lb") }
    else if (cat === "temperature") { setFromUnit("c"); setToUnit("f") }
    else if (cat === "area") { setFromUnit("sqm"); setToUnit("sqft") }
  }

  const convert = (val: number, from: string, to: string, cat: Category): number => {
    if (cat === "temperature") {
      if (from === to) return val
      if (from === "c") return to === "f" ? (val * 9/5) + 32 : val + 273.15
      if (from === "f") return to === "c" ? (val - 32) * 5/9 : (val - 32) * 5/9 + 273.15
      if (from === "k") return to === "c" ? val - 273.15 : (val - 273.15) * 9/5 + 32
      return val
    }

    // Standard conversion
    const baseAmount = val * CONVERSION_RATES[from]
    return baseAmount / CONVERSION_RATES[to]
  }

  const result = amount ? convert(parseFloat(amount), fromUnit, toUnit, category) : 0

  return (
    <Card className="max-w-3xl mx-auto p-6 space-y-8">
      <Tabs defaultValue="length" value={category} onValueChange={handleCategoryChange}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="length">Length</TabsTrigger>
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="temperature">Temp</TabsTrigger>
          <TabsTrigger value="area">Area</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
        <div className="space-y-4">
            <Label>From</Label>
            <div className="flex gap-2">
                <Input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-lg"
                />
                <Select value={fromUnit} onValueChange={setFromUnit}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {UNITS[category].map(u => (
                            <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div className="flex justify-center pt-6 text-muted-foreground">
            <ArrowRightLeft className="w-6 h-6" />
        </div>

        <div className="space-y-4">
            <Label>To</Label>
            <div className="flex gap-2">
                <div className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                    {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                </div>
                <Select value={toUnit} onValueChange={setToUnit}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {UNITS[category].map(u => (
                            <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
      </div>

      <div className="bg-muted/30 p-4 rounded-lg text-center text-sm text-muted-foreground">
        formula: 
        {category !== "temperature" ? 
            ` 1 ${UNITS[category].find(u => u.value === fromUnit)?.label} = ${(CONVERSION_RATES[fromUnit] / CONVERSION_RATES[toUnit]).toPrecision(6)} ${UNITS[category].find(u => u.value === toUnit)?.label}`
            : " Temperature scales vary by offset and factor."
        }
      </div>
    </Card>
  )
}
