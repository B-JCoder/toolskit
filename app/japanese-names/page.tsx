import type { Metadata } from "next";
import { Globe } from "lucide-react";
import { ToolPageLayout } from "@/components/tool-page-layout";
import { JapaneseNames } from "@/components/japanese-names/japanese-names";
import { StructuredData } from "@/components/seo/structured-data";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

export const metadata: Metadata = {
  title: "Japanese Name Generator - Create Authentic Japanese Names",
  description:
    "Generate authentic Japanese names for characters, stories, or creative projects. Choose from traditional and modern Japanese names with cultural significance.",
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
};

export default function JapaneseNamesPage() {
  return (
    <>
      <StructuredData
        type="WebApplication"
        name="Japanese Name Generator"
        description="Generate authentic Japanese names for characters, projects, or creative writing. Explore traditional and modern Japanese naming conventions."
        url="https://toolfixo.online/japanese-names"
        applicationCategory="UtilityApplication"
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Japanese Name Generator", href: "/japanese-names" },
          ]}
        />

        <ToolPageLayout
          icon={Globe}
          title="Japanese Name Generator"
          description="Generate authentic and meaningful Japanese names for your characters, stories, and creative projects."
        >
          <JapaneseNames />

          <div className="mt-16 space-y-8 prose prose-gray dark:prose-invert max-w-none">
            <div className="bg-muted/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">
                About Japanese Names
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Japanese names carry deep cultural significance and often
                reflect nature, virtues, or aspirations. Each name tells a story
                and embodies meaningful elements. Traditional Japanese names
                consist of a family name (surname) followed by a given name, and
                most use kanji characters with rich meanings.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">
                Japanese Name Structure:
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 rounded">
                  <p className="font-semibold">Family Name (姓)</p>
                  <p className="text-sm text-muted-foreground">
                    Comes first, inherited from parents
                  </p>
                </div>
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 rounded">
                  <p className="font-semibold">Given Name (名)</p>
                  <p className="text-sm text-muted-foreground">
                    Personal name chosen by parents
                  </p>
                </div>
                <div className="p-4 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/20 rounded">
                  <p className="font-semibold">Kanji Characters</p>
                  <p className="text-sm text-muted-foreground">
                    Most names use meaningful Chinese characters
                  </p>
                </div>
                <div className="p-4 border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-950/20 rounded">
                  <p className="font-semibold">Pronunciation</p>
                  <p className="text-sm text-muted-foreground">
                    Same kanji can have different readings
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">
                How to Use the Generator:
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Choose between male or female names</li>
                <li>
                  Click the generate button to create a random Japanese name
                </li>
                <li>Use the copy button to save your favorite names</li>
                <li>
                  Refresh to generate new names until you find one you like
                </li>
                <li>Explore meanings and cultural context of each name</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">
                Common Name Elements & Meanings:
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg mb-2">
                    Nature Elements
                  </h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>
                        <strong>Yama (山)</strong> - Mountain
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>
                        <strong>Kawa (川)</strong> - River
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>
                        <strong>Hana (花)</strong> - Flower
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>
                        <strong>Ki (木)</strong> - Tree
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2">
                    Virtues & Values
                  </h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>
                        <strong>Makoto (誠)</strong> - Truth
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>
                        <strong>Ai (愛)</strong> - Love
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>
                        <strong>Yuki (勇気)</strong> - Courage
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>
                        <strong>Hikari (光)</strong> - Light
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2">Seasons</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>
                        <strong>Haru (春)</strong> - Spring
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>
                        <strong>Natsu (夏)</strong> - Summer
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>
                        <strong>Aki (秋)</strong> - Autumn
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>
                        <strong>Fuyu (冬)</strong> - Winter
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">
                Fun Facts About Japanese Names:
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Some Japanese names use the suffix "-ko" (-子) for females,
                    meaning "child," though this is less common in modern names
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Male names often end with "-o" (-男) or "-ro" (-郎), which
                    traditionally indicated a boy or man
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    The order of family name and given name follows the Japanese
                    convention (surname first, then given name)
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Japanese people traditionally receive a name based on hopes
                    and wishes parents have for them
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">
                📚 Cultural Context
              </h3>
              <p className="text-sm text-muted-foreground">
                Japanese naming conventions are deeply rooted in the country's
                culture and philosophy. Names are chosen with care, often
                reflecting family values, auspicious characteristics, or
                connections to nature. Whether you're writing fiction, creating
                characters, or simply interested in Japanese culture, this
                generator provides authentic names with meaningful connections.
              </p>
            </div>
          </div>
        </ToolPageLayout>
      </div>
    </>
  );
}
