"use client"
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calculator, Plus, Trash2 } from "lucide-react";

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: number;
}

const GPACalculator = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: '', grade: '', credits: 3 }
  ]);
  const [gpa, setGpa] = useState(0);

  const gradePoints: { [key: string]: number } = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'F': 0.0
  };

  const calculateGpa = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      if (course.grade && course.credits > 0) {
        totalPoints += gradePoints[course.grade] * course.credits;
        totalCredits += course.credits;
      }
    });

    const calculatedGpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    setGpa(calculatedGpa);
  };

  useEffect(() => {
    calculateGpa();
  }, [courses]);

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: '',
      grade: '',
      credits: 3
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const resetCalculator = () => {
    setCourses([{ id: '1', name: '', grade: '', credits: 3 }]);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">GPA Calculator</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Calculate your Grade Point Average with ease and precision
          </p>
        </div>

        <div className="grid gap-8">
          <Card className="bg-gradient-card shadow-card border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Course Grades</CardTitle>
                  <CardDescription>
                    Enter your courses, grades, and credit hours
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={addCourse}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Course
                  </Button>
                  <Button
                    onClick={resetCalculator}
                    variant="outline"
                    size="sm"
                  >
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
                      <TableHead>Points</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>
                          <Input
                            placeholder="Course name"
                            value={course.name}
                            onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={course.grade}
                            onValueChange={(value) => updateCourse(course.id, 'grade', value)}
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue placeholder="Grade" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(gradePoints).map((grade) => (
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
                            onChange={(e) => updateCourse(course.id, 'credits', parseInt(e.target.value) || 0)}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {course.grade ? 
                              (gradePoints[course.grade] * course.credits).toFixed(2) : 
                              '0.00'
                            }
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => removeCourse(course.id)}
                            variant="ghost"
                            size="sm"
                            disabled={courses.length === 1}
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

          <Card className="bg-gradient-card shadow-card border-border/50">
            <CardHeader>
              <CardTitle>GPA Results</CardTitle>
              <CardDescription>Your calculated Grade Point Average</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-4">
                  {gpa.toFixed(2)}
                </div>
                <div className="text-xl text-muted-foreground mb-6">
                  Current GPA
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="text-lg font-semibold">
                      {courses.filter(c => c.grade).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Courses</div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="text-lg font-semibold">
                      {courses.reduce((sum, c) => sum + c.credits, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Credits</div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="text-lg font-semibold">
                      {courses.reduce((sum, c) => 
                        c.grade ? sum + (gradePoints[c.grade] * c.credits) : sum, 0
                      ).toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">Quality Points</div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="text-lg font-semibold">
                      {gpa >= 3.5 ? '🏆' : gpa >= 3.0 ? '🎓' : gpa >= 2.5 ? '📚' : '📝'}
                    </div>
                    <div className="text-sm text-muted-foreground">Status</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GPACalculator;