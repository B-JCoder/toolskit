import type { Metadata } from "next"
import { Zap } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { CPSChecker } from "@/components/cps-checker/cps-checker"
import { StructuredData } from "@/components/seo/structured-data"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"

export const metadata: Metadata = {
  title: "CPS Checker - Test Your Clicking Speed",
  description:
    "Free CPS (Clicks Per Second) test to measure your clicking speed. Challenge yourself with our click speed tester and improve your mouse clicking performance.",
  keywords: ["CPS test", "click speed test", "clicks per second", "mouse speed test", "clicking game", "reaction time"],
  openGraph: {
    title: "CPS Checker - Test Your Clicking Speed",
    description:
      "Free CPS (Clicks Per Second) test to measure your clicking speed. Challenge yourself with our click speed tester and improve your mouse clicking performance.",
    type: "website",
  },
}

export default function CPSCheckerPage() {
  return (
    <>
      <StructuredData
        type="WebApplication"
        name="CPS Checker"
        description="Test your clicking speed with our clicks per second (CPS) checker. Measure how fast you can click and improve your mouse performance."
        url="https://toolkit.example.com/cps-checker"
        applicationCategory="GameApplication"
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "CPS Checker", href: "/cps-checker" }]} />

        <ToolPageLayout
          icon={Zap}
          title="CPS Checker"
          description="Test your clicking speed with our clicks per second checker. See how fast you can click!"
        >
          <div className="mb-8 prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-4">What is CPS Testing?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              CPS (Clicks Per Second) testing measures how many times you can click your mouse in one second. It's a
              popular way to test your clicking speed, reaction time, and mouse control skills.
            </p>

            <h3 className="text-xl font-semibold mb-3">CPS Score Ranges:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                <strong>Slow:</strong> 1-3 CPS - Beginner level
              </li>
              <li>
                <strong>Average:</strong> 4-7 CPS - Normal clicking speed
              </li>
              <li>
                <strong>Fast:</strong> 8-10 CPS - Above average performance
              </li>
              <li>
                <strong>Very Fast:</strong> 11+ CPS - Professional level
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">How to Use the CPS Checker:</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Click the "Start Test" button to begin</li>
              <li>Click as fast as you can within the time limit</li>
              <li>View your CPS score and performance rating</li>
              <li>Try multiple times to improve your score</li>
            </ol>

            <h3 className="text-xl font-semibold mb-3 mt-6">Tips to Improve Your CPS:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Use your index finger for consistent clicking</li>
              <li>Keep your hand relaxed to avoid fatigue</li>
              <li>Practice regularly to build muscle memory</li>
              <li>Try different clicking techniques like jitter clicking</li>
            </ul>
          </div>

          <CPSChecker />
        </ToolPageLayout>
      </div>
    </>
  )
}
