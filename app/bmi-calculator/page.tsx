import type { Metadata } from "next"
import { Heart } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { BMICalculator } from "@/components/bmi-calculator/bmi-calculator"
import { StructuredData } from "@/components/seo/structured-data"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"

export const metadata: Metadata = {
  title: "BMI Calculator - Calculate Your Body Mass Index",
  description:
    "Free BMI calculator to determine your Body Mass Index. Calculate BMI using height and weight with instant results and health category classification. Track your fitness goals.",
  keywords: [
    "BMI calculator",
    "body mass index",
    "weight calculator",
    "health calculator",
    "fitness tracker",
    "BMI chart",
  ],
  openGraph: {
    title: "BMI Calculator - Calculate Your Body Mass Index",
    description:
      "Free BMI calculator to determine your Body Mass Index. Calculate BMI using height and weight with instant results and health category classification.",
    type: "website",
  },
}

export default function BMICalculatorPage() {
  return (
    <>
      <StructuredData
        type="WebApplication"
        name="BMI Calculator"
        description="Calculate your Body Mass Index (BMI) using height and weight measurements. Get instant results with health category classification."
        url="https://toolkit.example.com/bmi-calculator"
        applicationCategory="HealthApplication"
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "BMI Calculator", href: "/bmi-calculator" }]} />

        <ToolPageLayout
          icon={Heart}
          title="BMI Calculator"
          description="Calculate your Body Mass Index and get insights about your health metrics."
        >
          <div className="mb-8 prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-4">What is BMI?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Body Mass Index (BMI) is a widely used screening tool that measures body fat based on height and weight.
              It provides a quick assessment of whether you're underweight, normal weight, overweight, or obese.
            </p>

            <h3 className="text-xl font-semibold mb-3">BMI Categories:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                <strong>Underweight:</strong> BMI less than 18.5
              </li>
              <li>
                <strong>Normal weight:</strong> BMI 18.5-24.9
              </li>
              <li>
                <strong>Overweight:</strong> BMI 25-29.9
              </li>
              <li>
                <strong>Obese:</strong> BMI 30 or greater
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">How to Use This Calculator:</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Enter your height in feet and inches or centimeters</li>
              <li>Enter your weight in pounds or kilograms</li>
              <li>Click calculate to get your BMI result instantly</li>
              <li>View your BMI category and health recommendations</li>
            </ol>
          </div>

          <BMICalculator />
        </ToolPageLayout>
      </div>
    </>
  )
}
