"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Star,
  Zap,
  Globe,
  Calculator,
  GraduationCap,
  Heart,
  Keyboard,
  ScanLine,
  KeyRound,
  Timer,
  Scale,
  Sprout,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolCard } from "@/components/tool-card";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Define tool interface
interface Tool {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: any;
  category: "all" | "productivity" | "health" | "dev" | "fun";
}

// Full list of tools
const TOOLS: Tool[] = [
  {
    id: "bmi",
    name: "BMI Calculator",
    description: "Instantly check your Body Mass Index.",
    href: "/bmi-calculator",
    icon: Heart,
    category: "health",
  },
  {
    id: "cps",
    name: "CPS Checker",
    description: "Test your click speed.",
    href: "/cps-checker",
    icon: Zap,
    category: "fun",
  },
  {
    id: "gpa",
    name: "GPA Calculator",
    description: "Calculate your academic GPA.",
    href: "/gpa-calculator",
    icon: GraduationCap,
    category: "productivity",
  },
  {
    id: "garden",
    name: "GrowAGarden",
    description: "Plan your garden layout.",
    href: "/growagarden",
    icon: Sprout,
    category: "fun",
  },
  {
    id: "japanese",
    name: "Japanese Names",
    description: "Generate authentic names.",
    href: "/japanese-names",
    icon: Globe,
    category: "fun",
  },
  {
    id: "typing",
    name: "Typing Speed",
    description: "Measure your wpm and accuracy.",
    href: "/typing-speed",
    icon: Keyboard,
    category: "productivity",
  },
  {
    id: "qr",
    name: "QR Code Generator",
    description: "Create custom QR codes instantly.",
    href: "/qr-code",
    icon: ScanLine,
    category: "productivity",
  },
  {
    id: "password",
    name: "Password Generator",
    description: "Create secure, strong passwords.",
    href: "/password-generator",
    icon: KeyRound,
    category: "dev",
  },
  {
    id: "pomodoro",
    name: "Pomodoro Timer",
    description: "Focus better with 25m intervals.",
    href: "/pomodoro",
    icon: Timer,
    category: "productivity",
  },
  {
    id: "converter",
    name: "Unit Converter",
    description: "Convert length, weight, and more.",
    href: "/unit-converter",
    icon: Scale,
    category: "productivity",
  },
];

export function ToolsGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load favorites from local storage
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("toolfixo-favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const newFavorites = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];

    setFavorites(newFavorites);
    localStorage.setItem("toolfixo-favorites", JSON.stringify(newFavorites));
  };

  // Filter tools
  const filteredTools = TOOLS.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      tool.category === activeTab ||
      (activeTab === "favorites" && favorites.includes(tool.id));

    return matchesSearch && matchesTab;
  });

  return (
    <section className="py-12 sm:py-16  relative" id="tools">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Search and Filter */}
        <div className="flex flex-col items-center mb-12 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-lg mb-4">
              Explore Our Powerful Tools
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A growing collection of free utilities to supercharge your day.
            </p>
          </div>

          <div className="w-full max-w-2xl space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search tools..."
                className="pl-10 h-12 text-lg bg-background shadow-sm border-2 focus-visible:border-primary/50 transition-all rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full flex justify-center"
            >
              <TabsList className="h-auto p-1 bg-background/50 backdrop-blur border shadow-sm rounded-xl flex-wrap justify-center gap-1">
                <TabsTrigger value="all" className="rounded-lg px-4 py-2">
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="productivity"
                  className="rounded-lg px-4 py-2"
                >
                  Productivity
                </TabsTrigger>
                <TabsTrigger value="health" className="rounded-lg px-4 py-2">
                  Health
                </TabsTrigger>
                <TabsTrigger value="dev" className="rounded-lg px-4 py-2">
                  Dev
                </TabsTrigger>
                <TabsTrigger value="fun" className="rounded-lg px-4 py-2">
                  Fun
                </TabsTrigger>
                <TabsTrigger
                  value="favorites"
                  className="rounded-lg px-4 py-2 flex items-center gap-2"
                >
                  <Star className="h-4 w-4 fill-current" /> Favorites
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => {
              const Icon = tool.icon;
              const isFav = favorites.includes(tool.id);

              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="group relative block h-full"
                >
                  <div className="h-full p-6 rounded-2xl bg-card shadow-lg border border-border/50 hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 z-10">
                      <button
                        onClick={(e) => toggleFavorite(e, tool.id)}
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                        title={
                          isFav ? "Remove from favorites" : "Add to favorites"
                        }
                      >
                        <Star
                          className={cn(
                            "h-5 w-5 transition-all text-muted-foreground",
                            isFav && "fill-yellow-400 text-yellow-400 scale-110"
                          )}
                        />
                      </button>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>

                    <p className="text-muted-foreground text-sm flex-grow">
                      {tool.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-sm">
                      <span className="capitalize text-xs font-medium px-2 py-1 rounded bg-primary/100 text-white">
                        {tool.category}
                      </span>
                      <span className="text-primary font-medium group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                        Try now →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground">
                No tools found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                }}
                className="mt-4 text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
