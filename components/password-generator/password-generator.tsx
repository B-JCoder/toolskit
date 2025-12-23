"use client"

import { useState, useEffect, useCallback } from "react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Copy, RefreshCw, ShieldCheck } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function PasswordGenerator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(16)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })
  const [strength, setStrength] = useState(0)

  const generatePassword = useCallback(() => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"
    const numberChars = "0123456789"
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-="

    let charset = ""
    if (options.uppercase) charset += uppercaseChars
    if (options.lowercase) charset += lowercaseChars
    if (options.numbers) charset += numberChars
    if (options.symbols) charset += symbolChars

    if (charset === "") {
        setPassword("")
        setStrength(0)
        return
    }

    let result = ""
    for (let i = 0; i < length; i++) {
        result += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(result)
    calculateStrength(result)
  }, [length, options])

  const calculateStrength = (pwd: string) => {
    let score = 0
    if (pwd.length > 8) score += 1
    if (pwd.length > 12) score += 1
    if (/[A-Z]/.test(pwd)) score += 1
    if (/[0-9]/.test(pwd)) score += 1
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1
    setStrength(score)
  }

  useEffect(() => {
    generatePassword()
  }, [generatePassword])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    toast.success("Password copied to clipboard")
  }

  const getStrengthColor = () => {
    if (strength <= 1) return "bg-red-500"
    if (strength <= 3) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthText = () => {
    if (strength <= 1) return "Weak"
    if (strength <= 3) return "Moderate"
    return "Strong"
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Card className="p-8 border-2 border-primary/20 shadow-lg">
        <div className="relative mb-8">
            <div className="bg-muted/50 p-6 rounded-xl border border-input flex items-center justify-between gap-4 group hover:border-primary/50 transition-colors">
                <span className="text-3xl font-mono break-all tracking-wider text-primary font-bold">
                    {password || "Select options"}
                </span>
                <div className="flex gap-2 shrink-0">
                    <Button variant="ghost" size="icon" onClick={generatePassword} className="hover:text-primary">
                        <RefreshCw className="h-5 w-5" />
                    </Button>
                    <Button onClick={copyToClipboard} size="icon" className="hover:scale-105 transition-transform">
                        <Copy className="h-5 w-5" />
                    </Button>
                </div>
            </div>
            {/* Strength Indicator */}
            <div className="mt-4 flex items-center gap-4">
                <div className="text-sm font-medium w-20 text-muted-foreground">Strength:</div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                        className={cn("h-full transition-all duration-500 ease-out", getStrengthColor())} 
                        style={{ width: `${(strength / 5) * 100}%` }}
                    />
                </div>
                <div className={cn("text-sm font-bold min-w-[80px]", 
                    strength <= 1 ? "text-red-500" : strength <= 3 ? "text-yellow-500" : "text-green-500"
                )}>
                    {getStrengthText()}
                </div>
            </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-muted/30 p-4 rounded-lg">
              <Label className="text-base font-semibold">Password Length</Label>
              <span className="text-2xl font-bold text-primary">{length}</span>
            </div>
            <Slider
              value={[length]}
              onValueChange={(vals) => setLength(vals[0])}
              min={6}
              max={64}
              step={1}
              className="py-4"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
              <Label htmlFor="uppercase" className="flex flex-col gap-1 cursor-pointer">
                <span className="font-medium">Uppercase</span>
                <span className="text-xs text-muted-foreground">A, B, C...</span>
              </Label>
              <Switch
                id="uppercase"
                checked={options.uppercase}
                onCheckedChange={(c) => setOptions({ ...options, uppercase: c })}
              />
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
              <Label htmlFor="lowercase" className="flex flex-col gap-1 cursor-pointer">
                <span className="font-medium">Lowercase</span>
                <span className="text-xs text-muted-foreground">a, b, c...</span>
              </Label>
              <Switch
                id="lowercase"
                checked={options.lowercase}
                onCheckedChange={(c) => setOptions({ ...options, lowercase: c })}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
              <Label htmlFor="numbers" className="flex flex-col gap-1 cursor-pointer">
                <span className="font-medium">Numbers</span>
                <span className="text-xs text-muted-foreground">1, 2, 3...</span>
              </Label>
              <Switch
                id="numbers"
                checked={options.numbers}
                onCheckedChange={(c) => setOptions({ ...options, numbers: c })}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
              <Label htmlFor="symbols" className="flex flex-col gap-1 cursor-pointer">
                <span className="font-medium">Symbols</span>
                <span className="text-xs text-muted-foreground">!, @, #...</span>
              </Label>
              <Switch
                id="symbols"
                checked={options.symbols}
                onCheckedChange={(c) => setOptions({ ...options, symbols: c })}
              />
            </div>
          </div>
        </div>
      </Card>
      
      <div className="flex justify-center gap-8 text-muted-foreground text-sm">
        <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Generated locally in your browser</span>
        </div>
        <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Never sent to any server</span>
        </div>
      </div>
    </div>
  )
}
