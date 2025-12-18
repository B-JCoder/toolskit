'use client'

import { useState, useEffect, useCallback, memo, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Calculator, Plus, Trash2 } from 'lucide-react'

interface Course {
  id: string
  name: string
  grade: string
  credits: number
}

// Extract constants outside component
const GRADE_POINTS: { [key: string]: number } = {
  'A+': 4.0,
  A: 4.0,
  'A-': 3.7,
  'B+': 3.3,
  B: 3.0,
  'B-': 2.7,
  'C+': 2.3,
  C: 2.0,
  'C-': 1.7,
  'D+': 1.3,
  D: 1.0,
  'D-': 0.7,
  F: 0.0,
}

const GRADE_LIST = Object.keys(GRADE_POINTS)

const GPACalculatorComponent = () => {
  const [courses, setCourses] = useState<Course[]>([{ id: '1', name: '', grade: '', credits: 3 }])
  const [gpa, setGpa] = useState(0)

  // Memoized GPA calculation
  const calculateGpaValue = useCallback((courseList: Course[]) => {
    let totalPoints = 0
    let totalCredits = 0

    courseList.forEach(course => {
      if (course.grade && course.credits > 0) {
        totalPoints += GRADE_POINTS[course.grade] * course.credits
        totalCredits += course.credits
      }
    })

    return totalCredits > 0 ? totalPoints / totalCredits : 0
  }, [])

  // Update GPA when courses change
  useEffect(() => {
    setGpa(calculateGpaValue(courses))
  }, [courses, calculateGpaValue])

  // Memoized add course handler
  const addCourse = useCallback(() => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: '',
      grade: '',
      credits: 3,
    }
    setCourses(prev => [...prev, newCourse])
  }, [])

  // Memoized remove course handler
  const removeCourse = useCallback((id: string) => {
    setCourses(prev => (prev.length > 1 ? prev.filter(course => course.id !== id) : prev))
  }, [])

  // Memoized update course handler
  const updateCourse = useCallback((id: string, field: keyof Course, value: string | number) => {
    setCourses(prev =>
      prev.map(course =>
        course.id === id
          ? {
              ...course,
              [field]: field === 'credits' ? Math.max(0, Math.min(12, value as number)) : value,
            }
          : course
      )
    )
  }, [])

  // Memoized reset handler
  const resetCalculator = useCallback(() => {
    setCourses([{ id: '1', name: '', grade: '', credits: 3 }])
  }, [])

  // Memoized statistics
  const stats = useMemo(() => {
    const coursesWithGrades = courses.filter(c => c.grade)
    const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0)
    const qualityPoints = courses.reduce((sum, c) => (c.grade ? sum + GRADE_POINTS[c.grade] * c.credits : sum), 0)

    const getStatus = (gpaValue: number) => {
      if (gpaValue >= 3.9) return '🏆'
      if (gpaValue >= 3.5) return '⭐'
      if (gpaValue >= 3.0) return '🎓'
      if (gpaValue >= 2.5) return '📚'
      return '📝'
    }

    return {
      courseCount: coursesWithGrades.length,
      totalCredits,
      qualityPoints: qualityPoints.toFixed(1),
      status: getStatus(gpa),
    }
  }, [courses, gpa])

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-8">
          {/* Course Input Card */}
          <Card className="bg-card shadow-lg border-border/50 rounded-2xl">
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <CardTitle className="text-2xl">Course Grades</CardTitle>
                  <CardDescription>Enter your courses, grades, and credit hours</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={addCourse} variant="outline" size="sm" className="border-2">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Course
                  </Button>
                  <Button onClick={resetCalculator} variant="outline" size="sm" className="border-2">
                    Reset
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Name</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead>Quality Points</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map(course => (
                      <TableRow key={course.id}>
                        <TableCell>
                          <Input
                            placeholder="Course name"
                            value={course.name}
                            onChange={e => updateCourse(course.id, 'name', e.target.value)}
                            className="border-2"
                          />
                        </TableCell>
                        <TableCell>
                          <Select value={course.grade} onValueChange={value => updateCourse(course.id, 'grade', value)}>
                            <SelectTrigger className="w-24 border-2">
                              <SelectValue placeholder="Grade" />
                            </SelectTrigger>
                            <SelectContent>
                              {GRADE_LIST.map(grade => (
                                <SelectItem key={grade} value={grade}>
                                  {grade}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            max="12"
                            value={course.credits}
                            onChange={e => updateCourse(course.id, 'credits', parseInt(e.target.value) || 0)}
                            className="w-20 border-2"
                          />
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium text-foreground">
                            {course.grade ? (GRADE_POINTS[course.grade] * course.credits).toFixed(2) : '0.00'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => removeCourse(course.id)}
                            variant="ghost"
                            size="sm"
                            disabled={courses.length === 1}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* GPA Results Card */}
          <Card className="bg-gradient-to-br from-green-50 to-green-50/50 dark:from-green-950/20 dark:to-green-950/10 shadow-lg border border-green-200 dark:border-green-800 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">GPA Results</CardTitle>
              <CardDescription>Your calculated Grade Point Average</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                <div>
                  <div className="text-6xl font-bold text-green-600 dark:text-green-400 mb-2">{gpa.toFixed(2)}</div>
                  <div className="text-xl text-muted-foreground">Current GPA</div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-white dark:bg-black/20 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{stats.courseCount}</div>
                    <div className="text-sm text-muted-foreground mt-1">Courses</div>
                  </div>
                  <div className="p-4 bg-white dark:bg-black/20 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{stats.totalCredits}</div>
                    <div className="text-sm text-muted-foreground mt-1">Total Credits</div>
                  </div>
                  <div className="p-4 bg-white dark:bg-black/20 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{stats.qualityPoints}</div>
                    <div className="text-sm text-muted-foreground mt-1">Quality Points</div>
                  </div>
                  <div className="p-4 bg-white dark:bg-black/20 rounded-lg">
                    <div className="text-4xl font-bold">{stats.status}</div>
                    <div className="text-sm text-muted-foreground mt-1">Status</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

const GPACalculator = memo(GPACalculatorComponent)

export default GPACalculator
