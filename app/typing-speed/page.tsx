import type { Metadata } from 'next'
import { Keyboard } from 'lucide-react'
import { ToolPageLayout } from '@/components/tool-page-layout'
import TypingSpeed from '@/components/typing-speed/typing-speed'
import { StructuredData } from '@/components/seo/structured-data'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'

export const metadata: Metadata = {
  title: 'Typing Speed Test - Check Your WPM and Accuracy',
  description:
    'Free typing speed test to measure your words per minute (WPM) and accuracy. Improve your typing skills with our comprehensive typing speed checker and practice tool.',
  keywords: [
    'typing speed test',
    'WPM test',
    'words per minute',
    'typing accuracy',
    'keyboard skills',
    'typing practice',
  ],
  openGraph: {
    title: 'Typing Speed Test - Check Your WPM and Accuracy',
    description:
      'Free typing speed test to measure your words per minute (WPM) and accuracy. Improve your typing skills with our comprehensive typing speed checker.',
    type: 'website',
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
        <Breadcrumbs items={[{ label: 'Typing Speed Test', href: '/typing-speed' }]} />

        <ToolPageLayout
          icon={Keyboard}
          title="Typing Speed Test"
          description="Test your typing speed and accuracy. Track your words per minute (WPM) and identify areas for improvement."
        >
          <TypingSpeed />

          <div className="mt-16 space-y-8 prose prose-gray dark:prose-invert max-w-none">
            <div className="bg-muted/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">What is Typing Speed?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Typing speed is measured in Words Per Minute (WPM) and indicates how fast you can type accurately. It's an
                essential skill for productivity in today's digital world. Accuracy is equally important as speed, and this
                test measures both to give you a comprehensive assessment of your typing skills.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Typing Speed Levels:</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 border-l-4 border-gray-500 bg-gray-50 dark:bg-gray-950/20 rounded">
                  <p className="font-semibold">Beginner</p>
                  <p className="text-sm text-muted-foreground">10-20 WPM - Learning the basics</p>
                </div>
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 rounded">
                  <p className="font-semibold">Average</p>
                  <p className="text-sm text-muted-foreground">30-40 WPM - Typical office worker</p>
                </div>
                <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                  <p className="font-semibold">Good</p>
                  <p className="text-sm text-muted-foreground">50-60 WPM - Above average typist</p>
                </div>
                <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 rounded">
                  <p className="font-semibold">Excellent</p>
                  <p className="text-sm text-muted-foreground">70+ WPM - Professional level</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">How to Use the Typing Test:</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Select your preferred test duration (30, 60, or 120 seconds)</li>
                <li>Click "Start Test" to begin the typing challenge</li>
                <li>Type the displayed text as accurately as possible</li>
                <li>Focus on accuracy first, then speed will naturally follow</li>
                <li>The test ends automatically when time runs out</li>
                <li>View your WPM, accuracy, and detailed statistics</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Tips to Improve Your Typing:</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Use proper finger placement on the home row (ASDF JKL;)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Practice touch typing without looking at the keyboard</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Maintain good posture and hand position while typing</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Focus on accuracy before increasing speed</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Practice regularly with consistent 15-30 minute sessions</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Take breaks to avoid repetitive strain injuries</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Use typing practice software for targeted improvement</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Understanding Your Results:</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>WPM (Words Per Minute): Average number of words typed per minute</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Accuracy: Percentage of characters typed correctly</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Adjusted WPM: WPM minus errors (most accurate measure)</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">💡 Pro Tip</h3>
              <p className="text-sm text-muted-foreground">
                Aim for 95%+ accuracy before focusing on speed. A high accuracy rate with moderate speed is better than fast
                typing with many errors. Perfect your technique first, and speed will improve naturally with practice.
              </p>
            </div>
          </div>
        </ToolPageLayout>
      </div>
    </>
  )
}
