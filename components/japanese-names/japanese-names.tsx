"use client";

import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Check } from "lucide-react";
import { useState, useCallback, memo, useMemo } from "react";
import { ToolCard } from "@/components/tool-card";

// Extract constants outside component
const MALE_FIRST_NAMES = [
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
  "Ken",
  "Ryu",
  "Hiro",
  "Shin",
  "Takumi",
  "Koji",
  "Yosuke",
  "Hideki",
  "Osamu",
  "Goro",
  "Jiro",
  "Saburo",
  "Taro",
  "Hideo",
  "Yoshio",
  "Masaru",
  "Noboru",
  "Isamu",
  "Minoru",
  "Shigeru",
];

const FEMALE_FIRST_NAMES = [
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
  "Ai",
  "Mai",
  "Rie",
  "Kyoko",
  "Yoko",
  "Naoko",
  "Junko",
  "Keiko",
  "Michiko",
  "Noriko",
  "Yoshiko",
  "Tomoko",
  "Mariko",
  "Satoko",
  "Hiroko",
  "Kazuko",
  "Hisako",
  "Fumiko",
  "Emiko",
  "Yuriko",
];

const LAST_NAMES = [
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
  "Sato",
  "Saito",
  "Kondo",
  "Fujiwara",
  "Murakami",
  "Nishimura",
  "Nakano",
  "Sakamoto",
  "Kawakami",
  "Okumura",
];

const getRandomElement = (array: string[]) =>
  array[Math.floor(Math.random() * array.length)];

const JapaneseNamesComponent = () => {
  const [generatedName, setGeneratedName] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [copied, setCopied] = useState(false);

  // Memoized name generation
  const generateName = useCallback(() => {
    const firstName =
      gender === "male"
        ? getRandomElement(MALE_FIRST_NAMES)
        : getRandomElement(FEMALE_FIRST_NAMES);
    const lastName = getRandomElement(LAST_NAMES);
    setGeneratedName(`${firstName} ${lastName}`);
    setCopied(false);
  }, [gender]);

  // Memoized copy handler
  const copyToClipboard = useCallback(async () => {
    if (generatedName) {
      try {
        await navigator.clipboard.writeText(generatedName);
        setCopied(true);
        const timer = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(timer);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  }, [generatedName]);

  // Memoized gender toggle
  const toggleGender = useCallback((newGender: "male" | "female") => {
    setGender(newGender);
    setGeneratedName("");
    setCopied(false);
  }, []);

  // Memoized button label
  const buttonLabel = useMemo(
    () => (generatedName ? "Generate New Name" : "Generate Name"),
    [generatedName]
  );

  return (
    <ToolCard
      title="Japanese Name Generator Tool"
      description="Generate traditional and modern Japanese names with cultural authenticity."
      className="max-w-2xl mx-auto"
    >
      <div className="space-y-8">
        {/* Gender Selection */}
        <div className="flex justify-center gap-4">
          <Button
            variant={gender === "male" ? "default" : "outline"}
            onClick={() => toggleGender("male")}
            size="lg"
            className="px-8"
          >
            Male Names
          </Button>
          <Button
            variant={gender === "female" ? "default" : "outline"}
            onClick={() => toggleGender("female")}
            size="lg"
            className="px-8"
          >
            Female Names
          </Button>
        </div>

        {/* Generated Name Display */}
        {generatedName && (
          <div className="p-8 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-center space-y-4">
            <div className="text-4xl font-bold text-foreground">
              {generatedName}
            </div>
            <Button
              onClick={copyToClipboard}
              variant="outline"
              size="sm"
              className="gap-2 border-2 hover:bg-background"
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    Copied!
                  </span>
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5" />
                  Copy Name
                </>
              )}
            </Button>
          </div>
        )}

        {/* Generate Button */}
        <div className="text-center">
          <Button
            onClick={generateName}
            size="lg"
            className="gap-2 px-8 py-6 text-lg font-semibold"
          >
            <RefreshCw
              className={`h-5 w-5 ${
                generatedName ? "group-hover:rotate-180" : ""
              }`}
            />
            {buttonLabel}
          </Button>
        </div>

        {/* Info Section */}
        <div className="p-4 bg-muted/50 rounded-lg text-center text-sm text-muted-foreground space-y-2">
          <p>
            ✨ Names are generated using authentic Japanese naming conventions
          </p>
          <p>🎨 Perfect for characters, usernames, or creative projects</p>
          <p className="text-xs mt-3">
            Each name combines a traditional first name with a common Japanese
            surname
          </p>
        </div>
      </div>
    </ToolCard>
  );
};

export const JapaneseNames = memo(JapaneseNamesComponent);
