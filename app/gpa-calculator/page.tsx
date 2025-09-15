import type { Metadata } from "next"
import { GraduationCap } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { GPACalculator } from "@/components/gpa-calculator/gpa-calculator"
import { StructuredData } from "@/components/seo/structured-data"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"

export const metadata: Metadata = {
  title: "GPA Calculator - Calculate Your Grade Point Average",
  description:
    "Free GPA calculator to compute your Grade Point Average. Enter your courses, grades, and credit hours to calculate your cumulative GPA instantly.",
  keywords: [
    "GPA calculator",
    "grade point average",
    "college GPA",
    "university grades",
    "academic calculator",
    "semester GPA",
  ],
  openGraph: {
    title: "GPA Calculator - Calculate Your Grade Point Average",
    description:
      "Free GPA calculator to compute your Grade Point Average. Enter your courses, grades, and credit hours to calculate your cumulative GPA instantly.",
    type: "website",
  },
}

export default function GPACalculatorPage() {
  return (
    <>
      <StructuredData
        type="WebApplication"
        name="GPA Calculator"
        description="Calculate your Grade Point Average (GPA) by entering your courses, grades, and credit hours. Get instant GPA calculations for academic planning."
        url="https://toolkit.example.com/gpa-calculator"
        applicationCategory="EducationalApplication"
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "GPA Calculator", href: "/gpa-calculator" }]} />

        <ToolPageLayout
          icon={GraduationCap}
          title="GPA Calculator"
          description="Calculate your Grade Point Average with ease. Enter your courses and grades to get your GPA."
        >
          <div className="mb-8 prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-4">What is GPA?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Grade Point Average (GPA) is a numerical representation of your academic performance. It's calculated by
              averaging the grade points earned in all courses, weighted by credit hours.
            </p>

            <h3 className="text-xl font-semibold mb-3">GPA Scale (4.0 System):</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                <strong>A:</strong> 4.0 - Excellent performance
              </li>
              <li>
                <strong>B:</strong> 3.0 - Good performance
              </li>
              <li>
                <strong>C:</strong> 2.0 - Satisfactory performance
              </li>
              <li>
                <strong>D:</strong> 1.0 - Below average performance
              </li>
              <li>
                <strong>F:</strong> 0.0 - Failing grade
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">How to Use the GPA Calculator:</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Enter your course name (optional)</li>
              <li>Select your letter grade for each course</li>
              <li>Enter the credit hours for each course</li>
              <li>Add more courses as needed</li>
              <li>View your calculated GPA instantly</li>
            </ol>

            <h3 className="text-xl font-semibold mb-3 mt-6">GPA Categories:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                <strong>Summa Cum Laude:</strong> 3.9-4.0 GPA
              </li>
              <li>
                <strong>Magna Cum Laude:</strong> 3.7-3.89 GPA
              </li>
              <li>
                <strong>Cum Laude:</strong> 3.5-3.69 GPA
              </li>
              <li>
                <strong>Dean's List:</strong> Usually 3.5+ GPA
              </li>
            </ul>
          </div>

          <GPACalculator />
        </ToolPageLayout>
      </div>
    </>
  )
}
