import type { Metadata } from "next"
import { Globe } from "lucide-react"
import { ToolPageLayout } from "@/components/tool-page-layout"
import { JapaneseNames } from "@/components/japanese-names/japanese-names"
import { StructuredData } from "@/components/seo/structured-data"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"

export const metadata: Metadata = {
  title: "Japanese Name Generator - Create Authentic Japanese Names",
  description:
    "Generate authentic Japanese names for characters, stories, or creative projects. Choose from traditional and modern Japanese names with meanings and cultural significance.",
  keywords: [
    "Japanese name generator",
    "Japanese names",
    "anime names",
    "character names",
    "Japanese culture",
    "name meanings",
  ],
  openGraph: {
    title: "Japanese Name Generator - Create Authentic Japanese Names",
    description:
      "Generate authentic Japanese names for characters, stories, or creative projects. Choose from traditional and modern Japanese names with meanings.",
    type: "website",
  },
}

export default function JapaneseNamesPage() {
  return (
    <>
      <StructuredData
        type="WebApplication"
        name="Japanese Name Generator"
        description="Generate authentic Japanese names for characters, projects, or creative writing. Explore traditional and modern Japanese naming conventions."
        url="https://toolkit.example.com/japanese-names"
        applicationCategory="UtilityApplication"
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Japanese Name Generator", href: "/japanese-names" }]} />

        <ToolPageLayout
          icon={Globe}
          title="Japanese Name Generator"
          description="Generate authentic Japanese names for characters, projects, or creative writing."
        >
          <div className="mb-8 prose prose-gray dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-4">About Japanese Names</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Japanese names carry deep cultural significance and often reflect nature, virtues, or aspirations.
              Traditional Japanese names consist of a family name (surname) followed by a given name.
            </p>

            <h3 className="text-xl font-semibold mb-3">Japanese Name Structure:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                <strong>Family Name (姓):</strong> Comes first, inherited from parents
              </li>
              <li>
                <strong>Given Name (名):</strong> Personal name chosen by parents
              </li>
              <li>
                <strong>Kanji Characters:</strong> Most names use meaningful Chinese characters
              </li>
              <li>
                <strong>Pronunciation:</strong> Same kanji can have different readings
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">How to Use the Generator:</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Choose between male or female names</li>
              <li>Select traditional or modern style preferences</li>
              <li>Click generate to create authentic Japanese names</li>
              <li>Explore name meanings and cultural context</li>
            </ol>

            <h3 className="text-xl font-semibold mb-3 mt-6">Common Name Elements:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                <strong>Nature:</strong> Yama (mountain), Kawa (river), Hana (flower)
              </li>
              <li>
                <strong>Virtues:</strong> Makoto (truth), Ai (love), Yuki (happiness)
              </li>
              <li>
                <strong>Seasons:</strong> Haru (spring), Natsu (summer), Aki (autumn)
              </li>
              <li>
                <strong>Numbers:</strong> Ichiro (first son), Jiro (second son)
              </li>
            </ul>
          </div>

          <JapaneseNames />
        </ToolPageLayout>
      </div>
    </>
  )
}
