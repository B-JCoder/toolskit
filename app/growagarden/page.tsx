import type { Metadata } from 'next'
import { Sprout } from 'lucide-react'
import { ToolPageLayout } from '@/components/tool-page-layout'
import { GrowAGarden } from '@/components/growagarden/growagarden'
import { StructuredData } from '@/components/seo/structured-data'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'

export const metadata: Metadata = {
  title: 'GrowAGarden Calculator - Garden Planning Tool',
  description:
    'Calculate optimal garden layouts, plant spacing, and growing requirements. Plan your garden with our comprehensive gardening calculator and maximize your harvest.',
  keywords: [
    'garden calculator',
    'plant spacing',
    'garden planning',
    'gardening tool',
    'crop planning',
    'garden layout',
  ],
  openGraph: {
    title: 'GrowAGarden Calculator - Garden Planning Tool',
    description:
      'Calculate optimal garden layouts, plant spacing, and growing requirements. Plan your garden with our comprehensive gardening calculator.',
    type: 'website',
  },
}

export default function GrowAGardenPage() {
  return (
    <>
      <StructuredData
        type="WebApplication"
        name="GrowAGarden Calculator"
        description="Calculate optimal garden layouts, plant spacing, and growing requirements for your garden. Plan your perfect garden with scientific precision."
        url="https://toolkit.example.com/growagarden"
        applicationCategory="UtilityApplication"
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'GrowAGarden Calculator', href: '/growagarden' }]} />

        <ToolPageLayout
          icon={Sprout}
          title="GrowAGarden Calculator"
          description="Plan and optimize your garden layout. Calculate plant spacing, garden size, and growing requirements for maximum yield."
        >
          <GrowAGarden />

          <div className="mt-16 space-y-8 prose prose-gray dark:prose-invert max-w-none">
            <div className="bg-muted/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Garden Planning Made Easy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Proper garden planning is essential for maximizing your harvest and ensuring healthy plant growth. Our
                calculator helps you determine optimal spacing, layout, and resource requirements for your garden. Whether
                you&apos;re a beginner or experienced gardener, planning ahead leads to better results.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Key Garden Calculations:</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 rounded">
                  <p className="font-semibold">Plant Spacing</p>
                  <p className="text-sm text-muted-foreground">Optimal distance between plants</p>
                </div>
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 rounded">
                  <p className="font-semibold">Garden Area</p>
                  <p className="text-sm text-muted-foreground">Total space required for your crops</p>
                </div>
                <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                  <p className="font-semibold">Seed Quantity</p>
                  <p className="text-sm text-muted-foreground">How many seeds you&apos;ll need</p>
                </div>
                <div className="p-4 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950/20 rounded">
                  <p className="font-semibold">Harvest Estimates</p>
                  <p className="text-sm text-muted-foreground">Expected yield from your garden</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">How to Use the Calculator:</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Select the plants you want to grow from the available options</li>
                <li>Enter your available garden space dimensions (length and width)</li>
                <li>Specify the number of plants for each variety</li>
                <li>Get detailed spacing and layout recommendations</li>
                <li>Review harvest estimates and resource requirements</li>
                <li>Print or save your garden plan for reference</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Garden Planning Tips:</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Consider mature plant size when spacing to avoid overcrowding</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Plan for companion planting benefits (e.g., basil with tomatoes)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Account for walking paths between rows for easy maintenance</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Factor in sunlight requirements (full sun, partial shade, shade)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Plan for water accessibility and drainage</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Plan succession planting for continuous harvest throughout seasons</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Prepare soil with compost and nutrients before planting</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Common Vegetables Spacing Guide:</h3>
              <ul className="space-y-3 text-muted-foreground text-sm">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Tomatoes:</strong> 18-24 inches apart</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Carrots:</strong> 2-3 inches apart</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Lettuce:</strong> 6-8 inches apart</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Peppers:</strong> 12-18 inches apart</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Beans:</strong> 4-6 inches apart</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">🌱 Gardening Resources</h3>
              <p className="text-sm text-muted-foreground mb-3">
                For more detailed information about specific plants, growing seasons, and gardening techniques, visit
                gardening resources and local agricultural extension offices in your area.
              </p>
            </div>
          </div>
        </ToolPageLayout>
      </div>
    </>
  )
}
