import type { Metadata } from "next";
import { Heart } from "lucide-react";
import { ToolPageLayout } from "@/components/tool-page-layout";
import { BMICalculator } from "@/components/bmi-calculator/BMICalculator";
import { StructuredData } from "@/components/seo/structured-data";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

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
};

export default function BMICalculatorPage() {
  return (
    <>
      <StructuredData
        type="WebApplication"
        name="BMI Calculator"
        description="Calculate your Body Mass Index (BMI) using height and weight measurements. Get instant results with health category classification."
        url="https://toolfixo.online/bmi-calculator"
        applicationCategory="HealthApplication"
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[{ label: "BMI Calculator", href: "/bmi-calculator" }]}
        />

        <ToolPageLayout
          icon={Heart}
          title="BMI Calculator"
          description="Calculate your Body Mass Index and get personalized health insights for a healthier lifestyle."
        >
          <BMICalculator />

          <div className="mt-16 space-y-8 prose prose-gray dark:prose-invert max-w-none">
            <div className="bg-muted/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">What is BMI?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Body Mass Index (BMI) is a widely used screening tool that
                measures body fat based on height and weight. It provides a
                quick assessment of whether you are underweight, normal weight,
                overweight, or obese. BMI is calculated using the formula:
                weight (kg) / (height (m))²
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">BMI Categories:</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 rounded">
                  <p className="font-semibold text-blue-900 dark:text-blue-200">
                    Underweight
                  </p>
                  <p className="text-sm text-muted-foreground">
                    BMI less than 18.5
                  </p>
                </div>
                <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 rounded">
                  <p className="font-semibold text-green-900 dark:text-green-200">
                    Normal weight
                  </p>
                  <p className="text-sm text-muted-foreground">BMI 18.5-24.9</p>
                </div>
                <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                  <p className="font-semibold text-yellow-900 dark:text-yellow-200">
                    Overweight
                  </p>
                  <p className="text-sm text-muted-foreground">BMI 25-29.9</p>
                </div>
                <div className="p-4 border-l-4 border-red-500 bg-red-50 dark:bg-red-950/20 rounded">
                  <p className="font-semibold text-red-900 dark:text-red-200">
                    Obese
                  </p>
                  <p className="text-sm text-muted-foreground">
                    BMI 30 or greater
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">
                How to Use This Calculator:
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Select your biological sex/gender</li>
                <li>Enter your age in years</li>
                <li>Enter your height in feet and inches, or centimeters</li>
                <li>Enter your weight in pounds or kilograms</li>
                <li>Click "Calculate BMI" to get your results</li>
                <li>Review your BMI category and health recommendations</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">
                Important Health Information:
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    BMI is a screening tool only and does not directly measure
                    body fat or overall health
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Athletes and muscular individuals may have a higher BMI
                    without excess body fat
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Age, gender, ethnicity, and muscle mass can affect BMI
                    interpretation
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Always consult with healthcare professionals for
                    personalized health advice
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">
                Who Should Use This Tool?
              </h3>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Adults wanting to track their general weight health</li>
                <li>Fitness enthusiasts monitoring body composition changes</li>
                <li>People starting a weight loss or weight gain journey</li>
                <li>Anyone mindful about cardiovascular health risks</li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-900 dark:text-blue-200">
                ⚕️ Disclaimer
              </h3>
              <p className="text-sm text-muted-foreground">
                This BMI calculator is for informational purposes only and
                should not be considered medical advice. Your BMI is just one
                indicator of health. For comprehensive health assessment and
                personalized recommendations, please consult with a qualified
                healthcare professional or doctor.
              </p>
            </div>
          </div>
        </ToolPageLayout>
      </div>
    </>
  );
}
