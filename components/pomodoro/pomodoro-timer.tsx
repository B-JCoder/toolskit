"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle2, ListTodo } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type TimerMode = "work" | "shortBreak" | "longBreak"

const TIMER_MODES = {
  work: { label: "Work", minutes: 25, color: "text-primary" },
  shortBreak: { label: "Short Break", minutes: 5, color: "text-green-500" },
  longBreak: { label: "Long Break", minutes: 15, color: "text-blue-500" },
}

export function PomodoroTimer() {
  const [mode, setMode] = useState<TimerMode>("work")
  const [timeLeft, setTimeLeft] = useState(TIMER_MODES.work.minutes * 60)
  const [isActive, setIsActive] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [tasks, setTasks] = useState<{id: string, text: string, completed: boolean}[]>([])
  const [newTask, setNewTask] = useState("")

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio("/notification.mp3") // You might need a sound file, but we'll gracefully handle if missing
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
      if (soundEnabled && audioRef.current) {
        audioRef.current.play().catch(e => console.log("Audio play failed", e))
      }
    }

    return () => clearInterval(interval)
  }, [isActive, timeLeft, soundEnabled])

  const toggleTimer = () => setIsActive(!isActive)

  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(TIMER_MODES[mode].minutes * 60)
  }

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode)
    setIsActive(false)
    setTimeLeft(TIMER_MODES[newMode].minutes * 60)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.trim()) return
    setTasks([...tasks, { id: crypto.randomUUID(), text: newTask, completed: false }])
    setNewTask("")
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {/* Timer Section */}
      <Card className="p-8 flex flex-col items-center justify-center space-y-8 bg-gradient-to-br from-card to-muted/20 border-2">
        <div className="flex gap-2 p-1 bg-muted rounded-xl">
          {(Object.keys(TIMER_MODES) as TimerMode[]).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                mode === m 
                  ? "bg-background shadow-sm text-foreground scale-105" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {TIMER_MODES[m].label}
            </button>
          ))}
        </div>

        <div className="relative">
          <div className={cn("text-[8rem] font-bold font-mono tabular-nums leading-none tracking-tighter transition-colors", TIMER_MODES[mode].color)}>
            {formatTime(timeLeft)}
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-muted-foreground font-medium uppercase tracking-widest text-sm">
            {isActive ? "Focusing" : "Paused"}
          </div>
        </div>

        <div className="flex gap-4">
          <Button 
            size="lg" 
            className="h-16 w-32 text-xl rounded-2xl shadow-lg hover:shadow-primary/25 transition-all hover:scale-105"
            onClick={toggleTimer}
          >
            {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="h-16 w-16 rounded-2xl"
            onClick={resetTimer}
          >
            <RotateCcw className="h-6 w-6" />
          </Button>
        </div>

        <button 
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm"
        >
          {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          {soundEnabled ? "Sound On" : "Sound Off"}
        </button>
      </Card>

      {/* Tasks Section */}
      <Card className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
                <ListTodo className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Session Tasks</h3>
        </div>

        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <Input 
            value={newTask} 
            onChange={(e) => setNewTask(e.target.value)} 
            placeholder="Add a task to focus on..."
            className="h-12"
          />
          <Button type="submit" className="h-12 w-12 shrink-0">
             +
          </Button>
        </form>

        <div className="space-y-3 flex-1 overflow-auto pr-2">
            {tasks.length === 0 && (
                <div className="text-center text-muted-foreground py-12 border-2 border-dashed rounded-xl">
                    No tasks yet. Add one to get started!
                </div>
            )}
            {tasks.map(task => (
                <div 
                    key={task.id} 
                    className={cn(
                        "group flex items-center gap-3 p-3 rounded-lg border transition-all hover:shadow-sm",
                        task.completed ? "bg-muted/50 border-transparent opacity-60" : "bg-card border-border"
                    )}
                >
                    <button 
                        onClick={() => toggleTask(task.id)}
                        className={cn(
                            "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors",
                            task.completed ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground hover:border-primary"
                        )}
                    >
                        {task.completed && <CheckCircle2 className="h-4 w-4" />}
                    </button>
                    <span className={cn("flex-1 font-medium", task.completed && "line-through")}>
                        {task.text}
                    </span>
                    <button 
                        onClick={() => deleteTask(task.id)}
                        className="opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10 p-2 rounded transition-all"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
      </Card>
    </div>
  )
}
