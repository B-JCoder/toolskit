"use client"

import { Button } from "@/components/ui/button"
import { Copy, RefreshCw, Check } from "lucide-react"
import { useState } from "react"
import { ToolCard } from "@/components/tool-card"

const firstNames = {
  male: [
    "Akira",
    "Hiroshi",
    "Takeshi",
    "Kenji",
    "Yuki",
    "Satoshi",
    "Daisuke",
    "Ryouta",
    "Kazuki",
    "Haruto",
    "Yuuto",
    "Souta",
    "Ren",
    "Kaito",
    "Tsubasa",
    "Riku",
    "Hayato",
    "Shun",
    "Daiki",
    "Kenta",
    "Masato",
    "Naoki",
    "Shinji",
    "Tomoya",
  ],
  female: [
    "Sakura",
    "Yuki",
    "Akane",
    "Misaki",
    "Emi",
    "Rei",
    "Yui",
    "Mika",
    "Nana",
    "Hana",
    "Aoi",
    "Rin",
    "Saki",
    "Mio",
    "Kana",
    "Yuna",
    "Mei",
    "Risa",
    "Ayaka",
    "Chika",
    "Aya",
    "Maki",
    "Yuka",
    "Asuka",
    "Karin",
    "Natsuki",
  ],
}

const lastNames = [
  "Tanaka",
  "Suzuki",
  "Takahashi",
  "Watanabe",
  "Ito",
  "Yamamoto",
  "Nakamura",
  "Kobayashi",
  "Kato",
  "Yoshida",
  "Yamada",
  "Sasaki",
  "Yamaguchi",
  "Matsumoto",
  "Inoue",
  "Kimura",
  "Hayashi",
  "Shimizu",
  "Yamazaki",
  "Mori",
  "Abe",
  "Ikeda",
  "Hashimoto",
  "Yamashita",
  "Ishikawa",
  "Nakajima",
  "Maeda",
  "Fujita",
  "Ogawa",
  "Goto",
  "Okada",
  "Hasegawa",
]

export function JapaneseNames() {
  const [generatedName, setGeneratedName] = useState("")
  const [gender, setGender] = useState<"male" | "female">("male")
  const [copied, setCopied] = useState(false)

  const generateName = () => {
    const firstName = firstNames[gender][Math.floor(Math.random() * firstNames[gender].length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    setGeneratedName(`${firstName} ${lastName}`)
    setCopied(false)
  }

  const copyToClipboard = async () => {
    if (generatedName) {
      try {
        await navigator.clipboard.writeText(generatedName)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy:", err)
      }
    }
  }

  return (
    <ToolCard
      title="Japanese Name Generator Tool"
      description="Generate traditional and modern Japanese names with meanings and pronunciations."
    >
      <div className="space-y-6">
        {/* Gender Selection */}
        <div className="flex justify-center gap-2">
          <Button variant={gender === "male" ? "default" : "outline"} onClick={() => setGender("male")} size="sm">
            Male
          </Button>
          <Button variant={gender === "female" ? "default" : "outline"} onClick={() => setGender("female")} size="sm">
            Female
          </Button>
        </div>

        {/* Generated Name Display */}
        {generatedName && (
          <div className="text-center p-6 rounded-lg bg-muted border">
            <div className="text-2xl font-bold text-foreground mb-4">{generatedName}</div>
            <Button onClick={copyToClipboard} variant="outline" size="sm" className="gap-2 bg-transparent">
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied! 
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Name
                </>
              )}
            </Button>
          </div>
        )}

        {/* Generate Button */}
        <div className="text-center">
          <Button onClick={generateName} size="lg" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            {generatedName ? "Generate New Name" : "Generate Name"}
          </Button>
        </div>

        {/* Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Names are generated using common Japanese first and last names</p>
          <p className="mt-1">Perfect for characters, usernames, or creative projects</p>
        </div>
      </div>
    </ToolCard>
  )
}
