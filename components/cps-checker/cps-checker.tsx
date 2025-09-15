"use client"

import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { ToolCard } from "@/components/tool-card"
import { StatsGrid } from "@/components/stats-grid"
import { ResetButton } from "@/components/reset-button"

export function CPSChecker() {
  const [clicks, setClicks] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [isActive, setIsActive] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [cps, setCps] = useState(0)
  const [bestCps, setBestCps] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const savedBestCps = localStorage.getItem("bestCps")
    if (savedBestCps) {
      setBestCps(Number.parseFloat(savedBestCps))
    }
  }, [])

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0 && isActive) {
      finishTest()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, timeLeft])

  const startTest = () => {
    setIsActive(true)
    setIsFinished(false)
    setClicks(0)
    setTimeLeft(10)
    setCps(0)
  }

  const handleClick = () => {
    if (isActive && timeLeft > 0) {
      setClicks((prev) => prev + 1)
    }
  }

  const finishTest = () => {
    setIsActive(false)
    setIsFinished(true)
    const finalCps = clicks / 10
    setCps(finalCps)

    // Save best CPS to localStorage
    if (finalCps > bestCps) {
      setBestCps(finalCps)
      localStorage.setItem("bestCps", finalCps.toString())
    }
  }

  const resetTest = () => {
    setIsActive(false)
    setIsFinished(false)
    setClicks(0)
    setTimeLeft(10)
    setCps(0)
  }

  const stats = [
    { value: clicks, label: "Clicks" },
    { value: `${timeLeft}s`, label: "Time Left" },
  ]

  return (
    <ToolCard
      title="CPS Checker Tool"
      description="Click as fast as you can to measure your clicks per second (CPS) and compare with others."
    >
      <div className="text-center space-y-6">
        {/* Stats Display */}
        <StatsGrid stats={stats} />

        {/* Click Area */}
        {!isFinished && (
          <Button
            onClick={handleClick}
            disabled={!isActive}
            size="lg"
            className="w-48 h-48 rounded-full text-xl font-bold"
            variant={isActive ? "default" : "outline"}
          >
            {!isActive ? "Click to Start" : "CLICK!"}
          </Button>
        )}

        {/* Results */}
        {isFinished && (
          <div className="space-y-4">
            <div className="p-6 rounded-lg bg-primary/10 border">
              <div className="text-3xl font-bold text-primary mb-2">{cps.toFixed(2)} CPS</div>
              <div className="text-muted-foreground">You clicked {clicks} times in 10 seconds</div>
            </div>

            {bestCps > 0 && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Trophy className="h-4 w-4" />
                Best: {bestCps.toFixed(2)} CPS
              </div>
            )}
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-2 justify-center">
          {!isActive && !isFinished && (
            <Button onClick={startTest} size="lg">
              Start Test
            </Button>
          )}
          {(isFinished || isActive) && <ResetButton onClick={resetTest} />}
        </div>
      </div>
    </ToolCard>
  )
}
