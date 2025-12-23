"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sprout, Ruler, Sun } from "lucide-react";

const PLANTS = [
  {
    name: "Tomatoes",
    space: 24,
    type: "Vegetable",
    note: "Needs 2 feet of space",
  },
  {
    name: "Carrots",
    space: 3,
    type: "Vegetable",
    note: "Can be planted densely",
  },
  {
    name: "Lettuce",
    space: 6,
    type: "Vegetable",
    note: "Good for small spaces",
  },
  {
    name: "Peppers",
    space: 18,
    type: "Vegetable",
    note: "Space 18 inches apart",
  },
  {
    name: "Beans (Bush)",
    space: 4,
    type: "Vegetable",
    note: "4-6 inches apart",
  },
  {
    name: "Cucumbers",
    space: 12,
    type: "Vegetable",
    note: "Needs trellis or space",
  },
  {
    name: "Spinach",
    space: 4,
    type: "Vegetable",
    note: "Fast growing leafy green",
  },
  {
    name: "Broccoli",
    space: 18,
    type: "Vegetable",
    note: "Needs room to spread",
  },
  { name: "Onions", space: 4, type: "Vegetable", note: "Plant in sets" },
  {
    name: "Potatoes",
    space: 12,
    type: "Vegetable",
    note: "Hill soil around stems",
  },
  {
    name: "Zucchini",
    space: 24,
    type: "Vegetable",
    note: "Very productive summer squash",
  },
  { name: "Radishes", space: 2, type: "Vegetable", note: "Fastest harvest" },
];

export function GrowAGarden() {
  const [width, setWidth] = useState(4); // feet
  const [length, setLength] = useState(8); // feet
  const [selectedPlant, setSelectedPlant] = useState("Tomatoes");

  const totalArea = width * length;
  const plantInfo = PLANTS.find((p) => p.name === selectedPlant) || PLANTS[0];

  // Calculate how many plants fit
  // Convert garden dimensions to inches? No, let's stick to square foot gardening rough estimates
  // Each plant needs `space` inches diameter approx, or square inches?
  // Let's simplified: If a plant needs 12 inches spacing, it takes 1 sq ft.
  // If it needs 6 inches, you can fit 4 in 1 sq ft.
  // Formula: (Total Sq Ft * 144) / (Spacing * Spacing)

  // Wait, standard spacing is usually linear.
  // Plants per row = (Length * 12) / Spacing
  // Number of rows = (Width * 12) / Spacing
  // Total plants = Plants per row * Number of rows

  const plantsPerRow = Math.floor((length * 12) / plantInfo.space);
  const rows = Math.floor((width * 12) / plantInfo.space);
  const totalPlants = plantsPerRow * rows;

  return (
    <Card className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Ruler className="h-5 w-5 text-primary" />
            Garden Dimensions (Feet)
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="width">Width (ft)</Label>
              <Input
                id="width"
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                min={1}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="length">Length (ft)</Label>
              <Input
                id="length"
                type="number"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                min={1}
              />
            </div>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground">Total Area</div>
            <div className="text-2xl font-bold text-primary">
              {totalArea} sq. ft.
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Sprout className="h-5 w-5 text-green-600" />
            Crop Selection
          </h3>

          <div className="space-y-2">
            <Label>Select Plant</Label>
            <Select value={selectedPlant} onValueChange={setSelectedPlant}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PLANTS.map((p) => (
                  <SelectItem key={p.name} value={p.name}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="font-semibold text-green-900 dark:text-green-300">
                {plantInfo.name}
              </span>
              <div className="text-xs bg-white/50 px-2 py-1 rounded">
                {plantInfo.type}
              </div>
            </div>
            <p className="text-sm text-green-800 dark:text-green-400 mb-2">
              Spacing: {plantInfo.space} inches apart
            </p>
            <p className="text-xs text-muted-foreground italic">
              {plantInfo.note}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t pt-8">
        <h3 className="text-2xl font-bold text-center mb-8">
          You can grow approximately{" "}
          <span className="text-primary">{totalPlants}</span> {selectedPlant}{" "}
          plants!
        </h3>

        {/* Visual Grid Visualization (Simplified) */}
        <div className="w-full h-64 bg-[#3e2723] rounded-lg p-2 relative overflow-hidden flex flex-wrap content-start gap-1 justify-center shadow-inner">
          {Array.from({ length: Math.min(totalPlants, 100) }).map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 bg-green-500 rounded-full shadow-sm animate-in zoom-in duration-300"
              style={{ animationDelay: `${i * 10}ms` }}
            />
          ))}
          {totalPlants > 100 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-bold">
              + {totalPlants - 100} more
            </div>
          )}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2">
          Visualization capped at 100 plants.
        </p>
      </div>
    </Card>
  );
}
