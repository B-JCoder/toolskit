'use client'

import React, { memo } from 'react'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { BMIGauge } from './BMIGauge'
import { HealthRecommendations } from './HealthRecommendations'
import { BMIChart } from './BMIChart'
import type { BMIResult } from '@/hooks/useBMI'

interface BMIResultsProps {
  result: BMIResult | null
}

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'underweight':
      return 'text-bmi-accent'
    case 'normal weight':
      return 'text-bmi-success'
    case 'overweight':
      return 'text-bmi-warning'
    case 'obese':
      return 'text-bmi-danger'
    default:
      return 'text-bmi-primary'
  }
}

const BMIResultsComponent = ({ result }: BMIResultsProps) => {
  if (!result) return null

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: 'easeOut' }} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Results Section */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-2 space-y-8">
          {/* BMI Gauge Card */}
          <Card className="p-8 bg-gradient-to-br from-bmi-card to-bmi-hover border-bmi-input-border shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Your BMI Result</h2>
              <p className="text-bmi-muted">Based on your height and weight measurements</p>
            </div>

            <BMIGauge bmi={result.bmi} category={result.category} />

            <div className="text-center mt-8 space-y-3">
              <div className={`text-4xl font-bold ${getCategoryColor(result.category)}`}>{result.bmi}</div>
              <div className={`text-2xl font-bold ${getCategoryColor(result.category)}`}>{result.category}</div>
              <p className="text-bmi-muted max-w-2xl mx-auto leading-relaxed">{result.interpretation}</p>
              <div className="p-4 bg-bmi-hover rounded-lg mt-6">
                <p className="text-sm text-bmi-muted">
                  <strong>Health Risk:</strong> {result.healthRisk}
                </p>
              </div>
            </div>
          </Card>

          {/* Health Recommendations */}
          <HealthRecommendations category={result.category} bmi={result.bmi} />
        </motion.div>

        {/* Reference Chart */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <BMIChart />
        </motion.div>
      </div>
    </motion.div>
  )
}

export const BMIResults = memo(BMIResultsComponent)
