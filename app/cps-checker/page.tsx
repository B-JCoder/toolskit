import type { Metadata } from "next";
import { Zap } from "lucide-react";
import { ToolPageLayout } from "@/components/tool-page-layout";
import CPSChecker from "@/components/cps-checker/cps-checker";
import { StructuredData } from "@/components/seo/structured-data";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

export const metadata: Metadata = {
  title: "CPS Checker - Test Your Clicking Speed",
  description:
    "Free CPS (Clicks Per Second) test to measure your clicking speed. Challenge yourself with our click speed tester and improve your mouse clicking performance.",
  keywords: [
    "CPS test",
    "click speed test",
    "clicks per second",
    "mouse speed test",
    "clicking game",
    "reaction time",
  ],
  openGraph: {
    title: "CPS Checker - Test Your Clicking Speed",
    description:
      "Free CPS (Clicks Per Second) test to measure your clicking speed. Challenge yourself with our click speed tester and improve your mouse clicking performance.",
    type: "website",
  },
};

export default function CPSCheckerPage() {
  return (
    <>
      <StructuredData
        type="WebApplication"
        name="CPS Checker"
        description="Test your clicking speed with our clicks per second (CPS) checker. Measure how fast you can click and improve your mouse performance."
        url="https://toolfixo.online/cps-checker"
        applicationCategory="GameApplication"
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "CPS Checker", href: "/cps-checker" }]} />

        <ToolPageLayout
          icon={Zap}
          title="CPS Checker"
          description="Test your clicking speed and challenge yourself to improve your mouse control and reaction time."
        >
          <CPSChecker />

          <div className="mt-16 space-y-8 prose prose-gray dark:prose-invert max-w-none">
            <div className="bg-muted/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">
                What is CPS Testing?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                CPS (Clicks Per Second) testing measures how many times you can
                click your mouse in one second. It's a popular way to test your
                clicking speed, reaction time, and mouse control skills. This
                metric is important for gamers, professionals, and anyone
                looking to improve their mouse efficiency.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">CPS Score Ranges:</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 border-l-4 border-gray-500 bg-gray-50 dark:bg-gray-950/20 rounded">
                  <p className="font-semibold">Slow</p>
                  <p className="text-sm text-muted-foreground">
                    1-3 CPS - Beginner level
                  </p>
                </div>
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 rounded">
                  <p className="font-semibold">Average</p>
                  <p className="text-sm text-muted-foreground">
                    4-7 CPS - Normal clicking speed
                  </p>
                </div>
                <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                  <p className="font-semibold">Fast</p>
                  <p className="text-sm text-muted-foreground">
                    8-10 CPS - Above average
                  </p>
                </div>
                <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 rounded">
                  <p className="font-semibold">Very Fast</p>
                  <p className="text-sm text-muted-foreground">
                    11+ CPS - Professional level
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">
                How to Use the CPS Checker:
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>
                  Select your preferred test duration (5, 10, or 30 seconds)
                </li>
                <li>Click the "Start Test" button to begin</li>
                <li>Click as fast as you can within the time limit</li>
                <li>View your CPS score and performance rating</li>
                <li>Try multiple times to improve your score</li>
                <li>Track your personal best and compare with friends</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">
                Tips to Improve Your CPS:
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Use your index or middle finger for consistent clicking
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Keep your hand relaxed to avoid fatigue and cramping
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Practice regularly to build muscle memory</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Try different clicking techniques like jitter clicking or
                    butterfly clicking
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Ensure your mouse is responsive and properly calibrated
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Take breaks to maintain peak performance</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">💡 Pro Tip</h3>
              <p className="text-sm text-muted-foreground">
                Consistency matters more than speed. Focus on maintaining a
                steady click rate rather than sporadically clicking as hard as
                possible. Regular practice will naturally improve both your
                speed and endurance.
              </p>
            </div>
          </div>
        </ToolPageLayout>
      </div>
    </>
  );
}
