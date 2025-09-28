"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Apple, Dumbbell, Target } from "lucide-react"
import { motion } from "framer-motion"

interface HealthRecommendationsProps {
  category: string
  bmi: number
}

export const HealthRecommendations: React.FC<HealthRecommendationsProps> = ({ category, bmi }) => {
  const getRecommendations = (category: string) => {
    switch (category.toLowerCase()) {
      case "underweight":
        return {
          color: "from-bmi-accent/80 to-bmi-accent",
          icon: Target,
          title: "Healthy Weight Gain",
          tips: [
            "Focus on nutrient-dense, high-calorie foods",
            "Include healthy fats like nuts, avocados, and olive oil",
            "Eat frequent, smaller meals throughout the day",
            "Consider strength training to build muscle mass",
            "Consult with a nutritionist for personalized guidance",
          ],
        }
      case "normal weight":
        return {
          color: "from-bmi-success/80 to-bmi-success",
          icon: Heart,
          title: "Maintain Your Health",
          tips: [
            "Continue your current healthy lifestyle",
            "Maintain regular physical activity (150min/week)",
            "Eat a balanced diet with plenty of fruits and vegetables",
            "Monitor your weight regularly",
            "Focus on building strength and flexibility",
          ],
        }
      case "overweight":
        return {
          color: "from-bmi-warning/80 to-bmi-warning",
          icon: Apple,
          title: "Healthy Weight Loss",
          tips: [
            "Create a moderate calorie deficit (300-500 calories/day)",
            "Increase physical activity gradually",
            "Focus on whole foods and reduce processed foods",
            "Stay hydrated and get adequate sleep",
            "Consider consulting with a healthcare provider",
          ],
        }
      case "obese":
        return {
          color: "from-bmi-danger/80 to-bmi-danger",
          icon: Dumbbell,
          title: "Comprehensive Health Plan",
          tips: [
            "Consult with healthcare professionals immediately",
            "Consider medically supervised weight loss programs",
            "Start with low-impact exercises like walking",
            "Focus on sustainable dietary changes",
            "Monitor for related health conditions regularly",
          ],
        }
      default:
        return {
          color: "from-bmi-primary/80 to-bmi-primary",
          icon: Heart,
          title: "General Health",
          tips: ["Maintain a balanced lifestyle"],
        }
    }
  }

  const recommendations = getRecommendations(category)
  const IconComponent = recommendations.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="p-6 bg-gradient-to-br from-bmi-card to-bmi-hover border border-bmi-input-border shadow-lg rounded-2xl transition-transform duration-300 hover:scale-[1.02]">
        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          <div
            className={`p-3 rounded-full bg-gradient-to-br ${recommendations.color} text-white shadow-md shadow-black/20`}
          >
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">{recommendations.title}</h3>
            <Badge variant="outline" className="text-xs mt-1">
              Based on BMI {bmi.toFixed(1)}
            </Badge>
          </div>
        </div>

        {/* Tips */}
        <motion.ul
          className="space-y-2"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
        >
          {recommendations.tips.map((tip, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-2 text-sm text-bmi-muted"
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="w-1.5 h-1.5 bg-bmi-primary rounded-full mt-2 flex-shrink-0" />
              {tip}
            </motion.li>
          ))}
        </motion.ul>
      </Card>
    </motion.div>
  )
}
