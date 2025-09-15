"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import { ToolCard } from "@/components/tool-card"
import { ResetButton } from "@/components/reset-button"

interface Course {
  id: string
  name: string
  grade: string
  credits: string
}

const gradePoints: { [key: string]: number } = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
}

export function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "", grade: "", credits: "" },
    { id: "2", name: "", grade: "", credits: "" },
  ])
  const [gpa, setGpa] = useState<number | null>(null)

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: "",
      grade: "",
      credits: "",
    }
    setCourses([...courses, newCourse])
  }

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter((course) => course.id !== id))
    }
  }

  const updateCourse = (id: string, field: keyof Course, value: string) => {
    setCourses(courses.map((course) => (course.id === id ? { ...course, [field]: value } : course)))
  }

  const calculateGPA = () => {
    const validCourses = courses.filter(
      (course) => course.grade && course.credits && Number.parseFloat(course.credits) > 0,
    )

    if (validCourses.length === 0) {
      setGpa(null)
      return
    }

    let totalPoints = 0
    let totalCredits = 0

    for (const course of validCourses) {
      const credits = Number.parseFloat(course.credits)
      const points = gradePoints[course.grade] * credits
      totalPoints += points
      totalCredits += credits
    }

    const calculatedGpa = totalCredits > 0 ? totalPoints / totalCredits : 0
    setGpa(calculatedGpa)
  }

  const resetCalculator = () => {
    setCourses([
      { id: "1", name: "", grade: "", credits: "" },
      { id: "2", name: "", grade: "", credits: "" },
    ])
    setGpa(null)
  }

  useEffect(() => {
    calculateGPA()
  }, [courses])

  return (
    <ToolCard
      title="GPA Calculator Tool"
      description="This tool will help you calculate your Grade Point Average based on your course grades and credit hours."
      className="max-w-3xl mx-auto"
    >
      <div className="space-y-6">
        {/* Course List */}
        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground">
            <div className="col-span-5">Course Name</div>
            <div className="col-span-3">Grade</div>
            <div className="col-span-3">Credits</div>
            <div className="col-span-1"></div>
          </div>

          {courses.map((course) => (
            <div key={course.id} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-5">
                <Input
                  placeholder="Course name (optional)"
                  value={course.name}
                  onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                />
              </div>
              <div className="col-span-3">
                <Select value={course.grade} onValueChange={(value) => updateCourse(course.id, "grade", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(gradePoints).map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade} ({gradePoints[grade]})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-3">
                <Input
                  type="number"
                  placeholder="Credits"
                  min="0"
                  step="0.5"
                  value={course.credits}
                  onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                />
              </div>
              <div className="col-span-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeCourse(course.id)}
                  disabled={courses.length <= 1}
                  className="bg-transparent"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Course Button */}
        <div className="flex justify-center">
          <Button onClick={addCourse} variant="outline" className="gap-2 bg-transparent">
            <Plus className="h-4 w-4" />
            Add Course
          </Button>
        </div>

        {/* GPA Display */}
        {gpa !== null && (
          <div className="text-center p-6 rounded-lg bg-primary/10 border">
            <div className="text-3xl font-bold text-primary mb-2">GPA: {gpa.toFixed(2)}</div>
            <div className="text-muted-foreground">
              Based on {courses.filter((c) => c.grade && c.credits && Number.parseFloat(c.credits) > 0).length}{" "}
              course(s)
            </div>
          </div>
        )}

        {/* Reset Button */}
        <div className="flex justify-center">
          <ResetButton onClick={resetCalculator}>Reset Calculator</ResetButton>
        </div>

        {/* Grade Scale Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p className="mb-2">Grade Scale (4.0 system):</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div>A+/A: 4.0</div>
            <div>A-: 3.7</div>
            <div>B+: 3.3</div>
            <div>B: 3.0</div>
            <div>B-: 2.7</div>
            <div>C+: 2.3</div>
            <div>C: 2.0</div>
            <div>C-: 1.7</div>
            <div>D+: 1.3</div>
            <div>D: 1.0</div>
            <div>D-: 0.7</div>
            <div>F: 0.0</div>
          </div>
        </div>
      </div>
    </ToolCard>
  )
}
