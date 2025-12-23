import type { Metadata } from 'next'
import { Scale } from 'lucide-react'
import { ToolPageLayout } from '@/components/tool-page-layout'
import { UnitConverter } from '@/components/unit-converter/unit-converter'
import { StructuredData } from '@/components/seo/structured-data'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'

export const metadata: Metadata = {
  title: 'Universal Unit Converter - Length, Weight, Temp & Area',
  description:
    'Free online unit converter for length, weight, temperature, and area. Instantly convert between metric and imperial units with precision.',
  keywords: [
    'unit converter',
    'metric converter',
    'imperial converter',
    'length converter',
    'weight converter',
    'temperature converter',
  ],
  openGraph: {
    title: 'Universal Unit Converter - Length, Weight, Temp & Area',
    description:
      'Free online unit converter for length, weight, temperature, and area. Fast and accurate conversions.',
    type: 'website',
  },
}

export default function UnitConverterPage() {
  return (
    <>
      <StructuredData
        type="WebApplication"
        name="Unit Converter"
        description="Free online unit converter utility for common measurements."
        url="https://toolkit.com/unit-converter"
        applicationCategory="UtilityApplication"
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Unit Converter', href: '/unit-converter' }]} />

        <ToolPageLayout
          icon={Scale}
          title="Universal Unit Converter"
          description="Convert between different units of measurement quickly and accurately."
        >
          <UnitConverter />

          <div className="mt-16 space-y-8 prose prose-gray dark:prose-invert max-w-none">
            <div className="bg-muted/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Supported Conversions</h2>
              <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
                <div>
                   <h3 className="font-semibold text-foreground mb-2">Length</h3>
                   <p>Meters, Kilometers, Centimeters, Millimeters, Miles, Yards, Feet, Inches</p>
                </div>
                <div>
                   <h3 className="font-semibold text-foreground mb-2">Weight/Mass</h3>
                   <p>Kilograms, Grams, Milligrams, Pounds, Ounces</p>
                </div>
                <div>
                   <h3 className="font-semibold text-foreground mb-2">Temperature</h3>
                   <p>Celsius, Fahrenheit, Kelvin</p>
                </div>
                <div>
                   <h3 className="font-semibold text-foreground mb-2">Area</h3>
                   <p>Square Meters, Square Feet, Acres, Hectares, etc.</p>
                </div>
              </div>
            </div>
          </div>
        </ToolPageLayout>
      </div>
    </>
  )
}
