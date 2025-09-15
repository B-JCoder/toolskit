import type { Metadata } from "next"
import { Calculator } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { GrowAGarden } from "@/components/growagarden/growagarden"
import { StructuredData } from "@/components/seo/structured-data"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"

export const metadata: Metadata = {
  title: "GrowAGarden Calculator - Garden Planning Tool",
  description:
    "Calculate optimal garden layouts, plant spacing, and growing requirements. Plan your garden with our comprehensive gardening calculator and maximize your harvest.",
  keywords: [
    "garden calculator",
    "plant spacing",
    "garden planning",
    "gardening tool",
    "crop planning",
    "garden layout",
  ],
  openGraph: {
    title: "GrowAGarden Calculator - Garden Planning Tool",
    description:
      "Calculate optimal garden layouts, plant spacing, and growing requirements. Plan your garden with our comprehensive gardening calculator.",
    type: "website",
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
        <Breadcrumbs items={[{ label: "GrowAGarden Calculator", href: "/growagarden" }]} />

        <ToolPageLayout
          icon={Calculator}
          title="GrowAGarden Calculator"
          description="Calculate optimal garden layouts, plant spacing, and growing requirements for your garden."
        >
          <div className="mb-8 prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Garden Planning Made Easy</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Proper garden planning is essential for maximizing your harvest and ensuring healthy plant growth. Our
              calculator helps you determine optimal spacing, layout, and resource requirements for your garden.
            </p>

            <h3 className="text-xl font-semibold mb-3">Key Garden Calculations:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                <strong>Plant Spacing:</strong> Optimal distance between plants
              </li>
              <li>
                <strong>Garden Area:</strong> Total space required for your crops
              </li>
              <li>
                <strong>Seed Quantity:</strong> How many seeds you'll need
              </li>
              <li>
                <strong>Harvest Estimates:</strong> Expected yield from your garden
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">How to Use the Calculator:</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Select the plants you want to grow</li>
              <li>Enter your available garden space dimensions</li>
              <li>Specify the number of plants for each variety</li>
              <li>Get detailed spacing and layout recommendations</li>
            </ol>

            <h3 className="text-xl font-semibold mb-3 mt-6">Garden Planning Tips:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Consider mature plant size when spacing</li>
              <li>Plan for companion planting benefits</li>
              <li>Account for walking paths between rows</li>
              <li>Factor in sunlight and water requirements</li>
              <li>Plan succession planting for continuous harvest</li>
            </ul>
          </div>

          <GrowAGarden />
        </ToolPageLayout>
      </div>
    </>
  )
}
