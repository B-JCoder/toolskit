'use client'

import React, { memo } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { motion } from 'framer-motion'
import { Calculator, RotateCcw, TrendingUp, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import type { BMIData } from '@/hooks/useBMI'

interface BMIFormProps {
  data: BMIData
  errors: Record<string, string>
  progress: number
  isCalculating: boolean
  onUpdate: (field: keyof BMIData, value: string) => void
  onCalculate: () => Promise<boolean>
  onReset: () => void
}

const inputVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
  hover: {
    scale: 1.02,
    boxShadow: '0 8px 32px rgba(26,20,165,0.25)',
  },
}

const BMIFormComponent = ({
  data,
  errors,
  progress,
  isCalculating,
  onUpdate,
  onCalculate,
  onReset,
}: BMIFormProps) => {
  return (
    <div className="space-y-8">
      {/* Progress Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="flex justify-center gap-2 sm:gap-3 mb-6 flex-wrap">
          {['Sex', 'Age', 'Height', 'Weight'].map((step, index) => (
            <div
              key={step}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                progress >= ((index + 1) / 4) * 100
                  ? 'bg-bmi-primary text-black shadow-md'
                  : 'bg-bmi-hover text-bmi-muted'
              }`}
            >
              {index + 1}. {step}
            </div>
          ))}
        </div>

        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-bmi-primary" />
            <span className="text-sm text-bmi-muted">Progress: {Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </motion.div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 auto-rows-fr">
        {/* Gender Selection Card */}
        <motion.div custom={0} variants={inputVariants} initial="hidden" animate="visible" whileHover="hover">
          <Card
            className={`relative p-6 bg-gradient-to-br from-bmi-card to-bmi-hover border-bmi-input-border shadow-xl rounded-2xl overflow-hidden transition-all duration-500 ${
              errors.sex ? 'border-bmi-danger ring-2 ring-bmi-danger/40' : 'border-bmi-input-border hover:border-bmi-primary'
            }`}
          >
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-bmi-primary via-bmi-secondary to-bmi-accent opacity-40 blur-lg pointer-events-none" />

            <div className="relative flex items-center gap-3 mb-8 z-10">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-bmi-primary/40 text-bmi-primary font-bold shadow-inner">
                1
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">What is your sex?</h3>
            </div>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-8 z-10">
              {['male', 'female'].map(sex => (
                <motion.button
                  key={sex}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onUpdate('sex', sex)}
                  className={`group relative p-6 rounded-xl border-2 transition-all ${
                    data.sex === sex
                      ? 'border-bmi-selected-border bg-bmi-selected shadow-xl'
                      : 'border-bmi-input-border hover:border-bmi-primary hover:bg-bmi-hover/70'
                  }`}
                >
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden shadow-md group-hover:scale-110 transition-transform">
                    <Image
                      src={
                        sex === 'male'
                          ? 'https://as1.ftcdn.net/jpg/01/68/80/20/1000_F_168802075_Il6LeUG0NCK4JOELmkC7Ki81g0CiLpxU.webp'
                          : 'https://i.pinimg.com/1200x/17/f5/9e/17f59eaf91cdfad2ae723a4805fa60dc.jpg'
                      }
                      alt={sex.charAt(0).toUpperCase() + sex.slice(1)}
                      className="w-full h-full object-cover"
                      width={80}
                      height={80}
                    />
                  </div>
                  <span className="font-semibold text-foreground">{sex.charAt(0).toUpperCase() + sex.slice(1)}</span>
                </motion.button>
              ))}
            </div>

            {errors.sex && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mt-6 text-bmi-danger text-sm z-10">
                <AlertCircle className="w-4 h-4" />
                {errors.sex}
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Age Input Card */}
        <motion.div custom={1} variants={inputVariants} initial="hidden" animate="visible" whileHover="hover">
          <Card className={`relative p-6 bg-gradient-to-br from-bmi-card to-bmi-hover border-bmi-input-border shadow-xl rounded-2xl overflow-hidden ${errors.age ? 'border-bmi-danger ring-2 ring-bmi-danger/40' : 'hover:border-bmi-primary'}`}>
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-bmi-primary via-bmi-secondary to-bmi-accent opacity-40 blur-lg pointer-events-none" />

            <div className="relative flex items-center gap-3 mb-6 z-10">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-bmi-primary/40 text-bmi-primary font-bold">
                2
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-foreground">How old are you?</h3>
            </div>

            <div className="relative z-10">
              <Input
                type="number"
                value={data.age}
                onChange={e => onUpdate('age', e.target.value)}
                className={`w-full text-2xl font-light text-center border-2 rounded-xl py-3 transition-all ${
                  errors.age ? 'border-bmi-danger' : 'border-bmi-input-border focus:border-bmi-primary'
                }`}
                placeholder="25"
                min="2"
                max="120"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-bmi-muted font-medium">Years</span>
            </div>

            {errors.age && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mt-4 text-bmi-danger text-sm z-10">
                <AlertCircle className="w-4 h-4" />
                {errors.age}
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Height Input Card */}
        <motion.div custom={2} variants={inputVariants} initial="hidden" animate="visible" whileHover="hover">
          <Card className={`relative p-6 bg-gradient-to-br from-bmi-card to-bmi-hover border-bmi-input-border shadow-xl rounded-2xl overflow-hidden ${
            errors.heightFt || errors.heightIn || errors.heightCm ? 'border-bmi-danger ring-2 ring-bmi-danger/40' : 'hover:border-bmi-primary'
          }`}>
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-bmi-primary via-bmi-secondary to-bmi-accent opacity-40 blur-lg pointer-events-none" />

            <div className="relative flex items-center gap-3 mb-6 z-10">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-bmi-primary/40 text-bmi-primary font-bold">
                3
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-foreground">How tall are you?</h3>
            </div>

            <div className="relative space-y-4 z-10">
              {data.heightUnit === 'ft-in' ? (
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      type="number"
                      value={data.heightFt}
                      onChange={e => onUpdate('heightFt', e.target.value)}
                      className={`text-2xl font-light text-center border-2 rounded-xl py-3 ${errors.heightFt ? 'border-bmi-danger' : 'border-bmi-input-border'}`}
                      placeholder="5"
                      min="3"
                      max="8"
                    />
                    <div className="text-center mt-1 text-bmi-muted text-sm">ft</div>
                  </div>
                  <div className="flex-1">
                    <Input
                      type="number"
                      value={data.heightIn}
                      onChange={e => onUpdate('heightIn', e.target.value)}
                      className={`text-2xl font-light text-center border-2 rounded-xl py-3 ${errors.heightIn ? 'border-bmi-danger' : 'border-bmi-input-border'}`}
                      placeholder="7"
                      min="0"
                      max="11"
                    />
                    <div className="text-center mt-1 text-bmi-muted text-sm">in</div>
                  </div>
                </div>
              ) : (
                <div>
                  <Input
                    type="number"
                    value={data.heightCm}
                    onChange={e => onUpdate('heightCm', e.target.value)}
                    className={`text-2xl font-light text-center border-2 rounded-xl py-3 ${errors.heightCm ? 'border-bmi-danger' : 'border-bmi-input-border'}`}
                    placeholder="170"
                    min="100"
                    max="250"
                  />
                  <div className="text-center mt-1 text-bmi-muted text-sm">cm</div>
                </div>
              )}

              <div className="flex justify-center pt-2">
                <div className="flex bg-bmi-input-border rounded-full p-1">
                  {['ft-in', 'cm'].map(unit => (
                    <button
                      key={unit}
                      onClick={() => onUpdate('heightUnit', unit as 'ft-in' | 'cm')}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        data.heightUnit === unit ? 'bg-bmi-primary text-white shadow-md' : 'text-bmi-muted'
                      }`}
                    >
                      {unit === 'ft-in' ? 'ft/in' : 'cm'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {(errors.heightFt || errors.heightIn || errors.heightCm) && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mt-4 text-bmi-danger text-sm z-10">
                <AlertCircle className="w-4 h-4" />
                {errors.heightFt || errors.heightIn || errors.heightCm}
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Weight Input Card */}
        <motion.div custom={3} variants={inputVariants} initial="hidden" animate="visible" whileHover="hover">
          <Card className={`relative p-6 bg-gradient-to-br from-bmi-card to-bmi-hover border-bmi-input-border shadow-xl rounded-2xl overflow-hidden ${errors.weight ? 'border-bmi-danger ring-2 ring-bmi-danger/40' : 'hover:border-bmi-primary'}`}>
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-bmi-primary via-bmi-secondary to-bmi-accent opacity-40 blur-lg pointer-events-none" />

            <div className="relative flex items-center gap-3 mb-6 z-10">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-bmi-primary/40 text-bmi-primary font-bold">
                4
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-foreground">How much do you weigh?</h3>
            </div>

            <div className="relative space-y-4 z-10">
              <Input
                type="number"
                value={data.weight}
                onChange={e => onUpdate('weight', e.target.value)}
                className={`w-full text-2xl font-light text-center border-2 rounded-xl py-3 ${errors.weight ? 'border-bmi-danger' : 'border-bmi-input-border'}`}
                placeholder={data.weightUnit === 'kg' ? '70' : '154'}
                min={data.weightUnit === 'kg' ? '10' : '22'}
                max={data.weightUnit === 'kg' ? '300' : '660'}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-bmi-muted">{data.weightUnit === 'lb' ? 'lbs' : 'kg'}</span>

              <div className="flex justify-center pt-2">
                <div className="flex bg-bmi-input-border rounded-full p-1">
                  {['kg', 'lb'].map(unit => (
                    <button
                      key={unit}
                      onClick={() => onUpdate('weightUnit', unit as 'kg' | 'lb')}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        data.weightUnit === unit ? 'bg-bmi-primary text-white shadow-md' : 'text-bmi-muted'
                      }`}
                    >
                      {unit}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {errors.weight && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mt-4 text-bmi-danger text-sm z-10">
                <AlertCircle className="w-4 h-4" />
                {errors.weight}
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
        <Button onClick={onCalculate} disabled={isCalculating || progress < 100} className={`px-12 py-6 text-lg font-semibold text-white rounded-full transition-all ${isCalculating ? 'animate-pulse' : ''} ${progress === 100 ? 'shadow-lg hover:shadow-xl' : 'opacity-60 cursor-not-allowed'}`} style={{ background: 'var(--bmi-gradient-primary)' }}>
          {isCalculating ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
              Calculating...
            </>
          ) : (
            <>
              <Calculator className="w-5 h-5 mr-2" />
              Calculate BMI
            </>
          )}
        </Button>

        <Button onClick={onReset} variant="outline" className="px-6 py-6 text-sm font-medium border-2 border-bmi-input-border hover:border-bmi-primary hover:bg-bmi-hover transition-all">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </motion.div>
    </div>
  )
}

export const BMIForm = memo(BMIFormComponent)
