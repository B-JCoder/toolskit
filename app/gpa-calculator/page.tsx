import type { Metadata } from 'next'
import { GraduationCap } from 'lucide-react'
import { ToolPageLayout } from '@/components/tool-page-layout'
import GPACalculator from '@/components/gpa-calculator/gpa-calculator'
import { StructuredData } from '@/components/seo/structured-data'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'

export const metadata: Metadata = {
  title: 'GPA Calculator - Calculate Your Grade Point Average',
  description:
    'Free GPA calculator to compute your Grade Point Average. Enter your courses, grades, and credit hours to calculate your cumulative GPA instantly.',
  keywords: [
    'GPA calculator',
    'grade point average',
    'college GPA',
    'university grades',
    'academic calculator',
    'semester GPA',
  ],
  openGraph: {
    title: 'GPA Calculator - Calculate Your Grade Point Average',
    description:
      'Free GPA calculator to compute your Grade Point Average. Enter your courses, grades, and credit hours to calculate your cumulative GPA instantly.',
    type: 'website',
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
        <Breadcrumbs items={[{ label: 'GPA Calculator', href: '/gpa-calculator' }]} />

        <ToolPageLayout
          icon={GraduationCap}
          title="GPA Calculator"
          description="Calculate your Grade Point Average with precision. Track your academic performance and plan your educational goals."
        >
          <GPACalculator />

          <div className="mt-16 space-y-8 prose prose-gray dark:prose-invert max-w-none">
            <div className="bg-muted/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">What is GPA?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Grade Point Average (GPA) is a numerical representation of your academic performance. It's calculated by
                averaging the grade points earned in all courses, weighted by credit hours. GPA is commonly used by schools,
                colleges, and employers to assess academic achievement and competency.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">GPA Scale (4.0 System):</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 rounded">
                  <p className="font-semibold">A</p>
                  <p className="text-sm text-muted-foreground">4.0 - Excellent performance</p>
                </div>
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 rounded">
                  <p className="font-semibold">B</p>
                  <p className="text-sm text-muted-foreground">3.0 - Good performance</p>
                </div>
                <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                  <p className="font-semibold">C</p>
                  <p className="text-sm text-muted-foreground">2.0 - Satisfactory performance</p>
                </div>
                <div className="p-4 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950/20 rounded">
                  <p className="font-semibold">D</p>
                  <p className="text-sm text-muted-foreground">1.0 - Below average performance</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">How to Use the GPA Calculator:</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Enter your course name (optional but helpful for organization)</li>
                <li>Select your letter grade for each course</li>
                <li>Enter the credit hours for each course</li>
                <li>Add more courses by clicking the "Add Course" button</li>
                <li>Remove courses if needed using the delete button</li>
                <li>View your calculated GPA instantly as you add courses</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">GPA Categories & Honors:</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/20 rounded">
                  <p className="font-semibold">Summa Cum Laude</p>
                  <p className="text-sm text-muted-foreground">3.9-4.0 GPA</p>
                </div>
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 rounded">
                  <p className="font-semibold">Magna Cum Laude</p>
                  <p className="text-sm text-muted-foreground">3.7-3.89 GPA</p>
                </div>
                <div className="p-4 border-l-4 border-cyan-500 bg-cyan-50 dark:bg-cyan-950/20 rounded">
                  <p className="font-semibold">Cum Laude</p>
                  <p className="text-sm text-muted-foreground">3.5-3.69 GPA</p>
                </div>
                <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 rounded">
                  <p className="font-semibold">Dean's List</p>
                  <p className="text-sm text-muted-foreground">Usually 3.5+ GPA</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Important Notes:</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Credit hours are weighted automatically in the calculation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Different institutions may use different grading scales</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Some schools round GPA to 2 decimal places</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Transfer credits or AP courses may be calculated differently</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Always verify your GPA with your academic institution</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">📚 Academic Tips</h3>
              <p className="text-sm text-muted-foreground">
                Use this calculator to track your GPA throughout the semester and set academic goals. Monitor your progress
                and adjust your study habits as needed to achieve your target GPA. Remember that consistency and effort are
                key to academic success.
              </p>
            </div>
          </div>
        </ToolPageLayout>
      </div>
    </>
  )
}
