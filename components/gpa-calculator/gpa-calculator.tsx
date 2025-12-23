"use client";

import { useState, useEffect, useCallback, memo, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: number;
}

const GRADE_POINTS: Record<string, number> = {
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
};

const GRADE_LIST = Object.keys(GRADE_POINTS);

const GPACalculatorComponent = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "", grade: "", credits: 3 },
  ]);
  const [gpa, setGpa] = useState(0);

  const calculateGpa = useCallback((list: Course[]) => {
    let totalPoints = 0;
    let totalCredits = 0;

    list.forEach((c) => {
      if (c.grade && c.credits > 0) {
        totalPoints += GRADE_POINTS[c.grade] * c.credits;
        totalCredits += c.credits;
      }
    });

    return totalCredits ? totalPoints / totalCredits : 0;
  }, []);

  useEffect(() => {
    setGpa(calculateGpa(courses));
  }, [courses, calculateGpa]);

  const addCourse = () =>
    setCourses((p) => [
      ...p,
      { id: Date.now().toString(), name: "", grade: "", credits: 3 },
    ]);

  const removeCourse = (id: string) =>
    setCourses((p) => (p.length > 1 ? p.filter((c) => c.id !== id) : p));

  const updateCourse = (
    id: string,
    field: keyof Course,
    value: string | number
  ) =>
    setCourses((p) =>
      p.map((c) =>
        c.id === id
          ? {
              ...c,
              [field]:
                field === "credits"
                  ? Math.max(0, Math.min(12, Number(value)))
                  : value,
            }
          : c
      )
    );

  const reset = () =>
    setCourses([{ id: "1", name: "", grade: "", credits: 3 }]);

  const stats = useMemo(() => {
    const totalCredits = courses.reduce((s, c) => s + c.credits, 0);
    const qualityPoints = courses.reduce(
      (s, c) => (c.grade ? s + GRADE_POINTS[c.grade] * c.credits : s),
      0
    );

    return {
      totalCredits,
      qualityPoints: qualityPoints.toFixed(1),
    };
  }, [courses]);

  return (
    <div className="min-h-screen bg-background px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* INPUT CARD */}
        <Card className="rounded-2xl shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div>
                <CardTitle className="text-2xl">Course Grades</CardTitle>
                <CardDescription>
                  Add courses, grades, and credit hours
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={addCourse}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Course
                </Button>
                <Button
                  onClick={reset}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Reset
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>
                        <Input
                          value={c.name}
                          placeholder="Course name"
                          onChange={(e) =>
                            updateCourse(c.id, "name", e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={c.grade}
                          onValueChange={(v) => updateCourse(c.id, "grade", v)}
                        >
                          <SelectTrigger className="w-full min-w-[90px]">
                            <SelectValue placeholder="Grade" />
                          </SelectTrigger>
                          <SelectContent>
                            {GRADE_LIST.map((g) => (
                              <SelectItem key={g} value={g}>
                                {g}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={c.credits}
                          min={0}
                          max={12}
                          onChange={(e) =>
                            updateCourse(c.id, "credits", e.target.value)
                          }
                          className="min-w-[80px]"
                        />
                      </TableCell>
                      <TableCell>
                        {c.grade
                          ? (GRADE_POINTS[c.grade] * c.credits).toFixed(2)
                          : "0.00"}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={courses.length === 1}
                          onClick={() => removeCourse(c.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* MOBILE CARDS */}
            <div className="md:hidden space-y-4">
              {courses.map((c) => (
                <div key={c.id} className="border rounded-xl p-4 space-y-3">
                  <Input
                    placeholder="Course name"
                    value={c.name}
                    onChange={(e) => updateCourse(c.id, "name", e.target.value)}
                  />

                  <div className="flex gap-3">
                    <Select
                      value={c.grade}
                      onValueChange={(v) => updateCourse(c.id, "grade", v)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {GRADE_LIST.map((g) => (
                          <SelectItem key={g} value={g}>
                            {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Input
                      type="number"
                      value={c.credits}
                      min={0}
                      max={12}
                      onChange={(e) =>
                        updateCourse(c.id, "credits", e.target.value)
                      }
                      className="w-24"
                    />
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span>
                      Points:{" "}
                      <strong>
                        {c.grade
                          ? (GRADE_POINTS[c.grade] * c.credits).toFixed(2)
                          : "0.00"}
                      </strong>
                    </span>

                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={courses.length === 1}
                      onClick={() => removeCourse(c.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* RESULT CARD */}
        <Card className="rounded-2xl shadow-lg bg-green-50 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle className="text-2xl">GPA Result</CardTitle>
            <CardDescription>Your current GPA</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="text-6xl font-bold text-green-600">
              {gpa.toFixed(2)}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white dark:bg-black/20 rounded-lg">
                <div className="text-xl font-bold">{courses.length}</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
              <div className="p-4 bg-white dark:bg-black/20 rounded-lg">
                <div className="text-xl font-bold">{stats.totalCredits}</div>
                <div className="text-sm text-muted-foreground">Credits</div>
              </div>
              <div className="p-4 bg-white dark:bg-black/20 rounded-lg">
                <div className="text-xl font-bold">{stats.qualityPoints}</div>
                <div className="text-sm text-muted-foreground">
                  Quality Points
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default memo(GPACalculatorComponent);
