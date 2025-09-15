import type { Metadata } from "next"
import { Keyboard } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { TypingSpeed } from "@/components/typing-speed/typing-speed"
import { StructuredData } from "@/components/seo/structured-data"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"

export const metadata: Metadata = {
  title: "Typing Speed Test - Check Your WPM and Accuracy",
  description:
    "Free typing speed test to measure your words per minute (WPM) and accuracy. Improve your typing skills with our comprehensive typing speed checker and practice tool.",
  keywords: [
    "typing speed test",
    "WPM test",
    "words per minute",
    "typing accuracy",
    "keyboard skills",
    "typing practice",
  ],
  openGraph: {
    title: "Typing Speed Test - Check Your WPM and Accuracy",
    description:
      "Free typing speed test to measure your words per minute (WPM) and accuracy. Improve your typing skills with our comprehensive typing speed checker.",
    type: "website",
  },
}

export default function TypingSpeedPage() {
  return (
    <>
      <StructuredData
        type="WebApplication"
        name="Typing Speed Test"
        description="Test and improve your typing speed and accuracy with our comprehensive typing test. Measure your words per minute (WPM) and track your progress."
        url="https://toolkit.example.com/typing-speed"
        applicationCategory="EducationalApplication"
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Typing Speed Test", href: "/typing-speed" }]} />

        <ToolPageLayout
          icon={Keyboard}
          title="Typing Speed Checker"
          description="Test and improve your typing speed and accuracy with our comprehensive typing test."
        >
          <div className="mb-8 prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-4">What is Typing Speed?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Typing speed is measured in Words Per Minute (WPM) and indicates how fast you can type accurately. It's an
              essential skill for productivity in today's digital world.
            </p>

            <h3 className="text-xl font-semibold mb-3">Typing Speed Levels:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                <strong>Beginner:</strong> 10-20 WPM - Learning the basics
              </li>
              <li>
                <strong>Average:</strong> 30-40 WPM - Typical office worker
              </li>
              <li>
                <strong>Good:</strong> 50-60 WPM - Above average typist
              </li>
              <li>
                <strong>Excellent:</strong> 70+ WPM - Professional level
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">How to Use the Typing Test:</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Click "Start Test" to begin the typing challenge</li>
              <li>Type the displayed text as accurately as possible</li>
              <li>Focus on accuracy first, then speed</li>
              <li>View your WPM, accuracy, and detailed statistics</li>
            </ol>

            <h3 className="text-xl font-semibold mb-3 mt-6">Tips to Improve Your Typing:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Use proper finger placement on the home row</li>
              <li>Practice touch typing without looking at keys</li>
              <li>Maintain good posture and hand position</li>
              <li>Focus on accuracy before increasing speed</li>
              <li>Practice regularly with consistent sessions</li>
            </ul>
          </div>

          <TypingSpeed />
        </ToolPageLayout>
      </div>
    </>
  )
}
