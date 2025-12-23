import type { Metadata } from 'next'
import { Timer } from 'lucide-react'
import { ToolPageLayout } from '@/components/tool-page-layout'
import { PomodoroTimer } from '@/components/pomodoro/pomodoro-timer'
import { StructuredData } from '@/components/seo/structured-data'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'

export const metadata: Metadata = {
  title: 'Online Pomodoro Timer - Focus & Productivity Tool',
  description:
    'Boost productivity with this free online Pomodoro timer. Customizable work/break intervals, task tracking, and notification sounds.',
  keywords: [
    'pomodoro timer',
    'productivity timer',
    'focus timer',
    'study timer',
    'work timer',
    'time management',
  ],
  openGraph: {
    title: 'Online Pomodoro Timer - Focus & Productivity Tool',
    description:
      'Boost productivity with this free online Pomodoro timer. Stay focused with the Pomodoro technique.',
    type: 'website',
  },
}

export default function PomodoroPage() {
  return (
    <>
      <StructuredData
        type="WebApplication"
        name="Pomodoro Timer"
        description="Free online Pomodoro timer utility with task management."
        url="https://toolkit.com/pomodoro"
        applicationCategory="UtilityApplication"
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Pomodoro Timer', href: '/pomodoro' }]} />

        <ToolPageLayout
          icon={Timer}
          title="Pomodoro Focus Timer"
          description="Master your time and boost productivity using the proven Pomodoro Technique."
        >
          <PomodoroTimer />

          <div className="mt-16 space-y-8 prose prose-gray dark:prose-invert max-w-none">
            <div className="bg-muted/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">What is the Pomodoro Technique?</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. 
                It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.
              </p>
              <h3 className="text-lg font-semibold mt-4 mb-2">How to use it effectively:</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Decide on the task to be done and add it to the list</li>
                <li>Set the timer to 25 minutes (Work mode)</li>
                <li>Work on the task until the timer rings</li>
                <li>Take a short 5-minute break</li>
                <li>Every 4 pomodoros, take a longer 15-minute break</li>
              </ol>
            </div>
          </div>
        </ToolPageLayout>
      </div>
    </>
  )
}
