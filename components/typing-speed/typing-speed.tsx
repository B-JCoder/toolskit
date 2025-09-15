"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Play, Pause } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { ToolCard } from "@/components/tool-card"
import { StatsGrid } from "@/components/stats-grid"
import { ResetButton } from "@/components/reset-button"

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet and is commonly used for typing practice. It helps improve finger dexterity and keyboard familiarity.",
  "Technology has revolutionized the way we communicate, work, and live. From smartphones to artificial intelligence, innovation continues to shape our future in remarkable ways that were once unimaginable.",
  "Learning to type efficiently is a valuable skill in today's digital world. Practice makes perfect, and with dedication, anyone can improve their typing speed and accuracy significantly over time.",
  "The art of programming requires patience, logic, and creativity. Developers solve complex problems by breaking them down into smaller, manageable pieces and implementing elegant solutions.",
  "Climate change is one of the most pressing challenges of our time. It requires global cooperation, innovative solutions, and immediate action to protect our planet for future generations.",
]

export function TypingSpeed() {
  const [sampleText, setSampleText] = useState("")
  const [userInput, setUserInput] = useState("")
  const [timeLeft, setTimeLeft] = useState(60)
  const [isActive, setIsActive] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [startTime, setStartTime] = useState<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    // Set initial sample text
    setSampleText(sampleTexts[0])
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
    setUserInput("")
    setTimeLeft(60)
    setStartTime(Date.now())
    setWpm(0)
    setAccuracy(100)
    // Focus on textarea
    setTimeout(() => {
      textareaRef.current?.focus()
    }, 100)
  }

  const pauseTest = () => {
    setIsActive(false)
  }

  const resumeTest = () => {
    setIsActive(true)
  }

  const finishTest = () => {
    setIsActive(false)
    setIsFinished(true)
    calculateResults()
  }

  const calculateResults = () => {
    if (!startTime) return

    const timeElapsed = (Date.now() - startTime) / 1000 / 60 // in minutes
    const wordsTyped = userInput.trim().split(/\s+/).length
    const calculatedWpm = Math.round(wordsTyped / timeElapsed)

    // Calculate accuracy
    let correctChars = 0
    const minLength = Math.min(userInput.length, sampleText.length)

    for (let i = 0; i < minLength; i++) {
      if (userInput[i] === sampleText[i]) {
        correctChars++
      }
    }

    const calculatedAccuracy = minLength > 0 ? Math.round((correctChars / minLength) * 100) : 100

    setWpm(calculatedWpm)
    setAccuracy(calculatedAccuracy)
  }

  const resetTest = () => {
    setIsActive(false)
    setIsFinished(false)
    setUserInput("")
    setTimeLeft(60)
    setStartTime(null)
    setWpm(0)
    setAccuracy(100)
    // Generate new sample text
    const randomIndex = Math.floor(Math.random() * sampleTexts.length)
    setSampleText(sampleTexts[randomIndex])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isActive && !isFinished) {
      startTest()
    }
    setUserInput(e.target.value)
  }

  const getCharacterClass = (index: number) => {
    if (index >= userInput.length) return "text-muted-foreground"
    if (userInput[index] === sampleText[index]) return "text-green-600 bg-green-100 dark:bg-green-900/20"
    return "text-red-600 bg-red-100 dark:bg-red-900/20"
  }

  const stats = [
    { value: `${timeLeft}s`, label: "Time Left" },
    { value: wpm, label: "WPM" },
    { value: `${accuracy}%`, label: "Accuracy" },
  ]

  return (
    <ToolCard
      title="Typing Speed Checker Tool"
      description="Measure your words per minute (WPM) and accuracy to track your typing improvement."
      className="max-w-4xl mx-auto"
    >
      <div className="space-y-6">
        {/* Stats Display */}
        <StatsGrid stats={stats} columns={3} />

        {/* Sample Text Display */}
        <div className="p-4 rounded-lg bg-muted border">
          <h3 className="text-sm font-medium mb-2">Type the following text:</h3>
          <div className="text-lg leading-relaxed font-mono">
            {sampleText.split("").map((char, index) => (
              <span key={index} className={getCharacterClass(index)}>
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="space-y-2">
          <label htmlFor="typing-input" className="text-sm font-medium">
            Start typing here:
          </label>
          <Textarea
            id="typing-input"
            ref={textareaRef}
            value={userInput}
            onChange={handleInputChange}
            placeholder="Start typing to begin the test..."
            className="min-h-32 text-lg font-mono"
            disabled={isFinished}
          />
        </div>

        {/* Results */}
        {isFinished && (
          <div className="text-center p-6 rounded-lg bg-primary/10 border">
            <h3 className="text-xl font-bold mb-4">Test Complete!</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-2xl font-bold text-primary">{wpm} WPM</div>
                <div className="text-muted-foreground">Words per minute</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{accuracy}%</div>
                <div className="text-muted-foreground">Accuracy</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              You typed {userInput.trim().split(/\s+/).length} words in 60 seconds
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-2 justify-center">
          {!isActive && !isFinished && (
            <Button onClick={startTest} size="lg" className="gap-2">
              <Play className="h-4 w-4" />
              Start Test
            </Button>
          )}
          {isActive && (
            <Button onClick={pauseTest} variant="outline" size="lg" className="gap-2 bg-transparent">
              <Pause className="h-4 w-4" />
              Pause
            </Button>
          )}
          {!isActive && !isFinished && userInput && (
            <Button onClick={resumeTest} size="lg" className="gap-2">
              <Play className="h-4 w-4" />
              Resume
            </Button>
          )}
          <ResetButton onClick={resetTest} />
        </div>

        {/* Instructions */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Type the text above as accurately and quickly as possible.</p>
          <p className="mt-1">The test will automatically start when you begin typing.</p>
        </div>
      </div>
    </ToolCard>
  )
}
