'use client'

import React, { memo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'
import { useBMI } from '@/hooks/useBMI'
import { BMIForm } from './BMIForm'
import { BMIResults } from './BMIResults'

const BMICalculatorComponent = () => {
  const [progress, setProgress] = useState(0)
  const { data, result, errors, isCalculating, updateData, calculateBMI, reset, getProgress } = useBMI()
  const { toast } = useToast()

  // Update progress
  useEffect(() => {
    setProgress(getProgress())
  }, [data, getProgress])

  const handleCalculate = async () => {
    const success = await calculateBMI()
    if (success) {
      toast({
        title: 'BMI Calculated Successfully',
        description: `Your BMI is ${result?.bmi} (${result?.category})`,
      })
    } else {
      toast({
        title: 'Validation Error',
        description: 'Please fix the highlighted fields.',
        variant: 'destructive',
      })
    }
  }

  const handleReset = () => {
    reset()
    toast({
      title: 'Calculator Reset',
      description: 'All fields have been cleared.',
    })
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {!result ? (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            <BMIForm data={data} errors={errors} progress={progress} isCalculating={isCalculating} onUpdate={updateData} onCalculate={handleCalculate} onReset={handleReset} />
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="mb-6 flex justify-center">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center gap-2"
              >
                ↺ Calculate Again
              </button>
            </div>
            <BMIResults result={result} />
          </motion.div>
        )}
      </div>
    </div>
  )
}

export const BMICalculator = memo(BMICalculatorComponent)
