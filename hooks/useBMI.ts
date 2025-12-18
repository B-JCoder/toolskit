import { useCallback, useState } from 'react'

export interface BMIData {
  sex: 'male' | 'female' | ''
  age: string
  heightFt: string
  heightIn: string
  heightCm: string
  weight: string
  heightUnit: 'ft-in' | 'cm'
  weightUnit: 'lb' | 'kg'
}

export interface BMIResult {
  bmi: number
  category: string
  interpretation: string
  healthRisk: string
}

interface ValidationErrors {
  [key: string]: string
}

const GRADEPOINTS = {
  male: { min: 3, max: 8, unit: 'feet' },
  female: { min: 3, max: 8, unit: 'feet' },
} as const

export function useBMI() {
  const [data, setData] = useState<BMIData>({
    sex: '',
    age: '',
    heightFt: '',
    heightIn: '',
    heightCm: '',
    weight: '',
    heightUnit: 'ft-in',
    weightUnit: 'lb',
  })

  const [result, setResult] = useState<BMIResult | null>(null)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isCalculating, setIsCalculating] = useState(false)

  const validateField = useCallback((field: keyof BMIData, value: string): string => {
    switch (field) {
      case 'age': {
        const age = parseFloat(value)
        if (!value) return 'Age is required'
        if (age < 2 || age > 120) return 'Age must be between 2 and 120'
        break
      }
      case 'weight': {
        const weight = parseFloat(value)
        if (!value) return 'Weight is required'
        if (data.weightUnit === 'kg' && (weight < 10 || weight > 300)) {
          return 'Weight must be between 10-300 kg'
        }
        if (data.weightUnit === 'lb' && (weight < 22 || weight > 660)) {
          return 'Weight must be between 22-660 lbs'
        }
        break
      }
      case 'heightFt': {
        const ft = parseFloat(value)
        if (data.heightUnit === 'ft-in' && (!value || ft < 3 || ft > 8)) {
          return 'Height must be between 3-8 feet'
        }
        break
      }
      case 'heightIn': {
        const inches = parseFloat(value)
        if (data.heightUnit === 'ft-in' && (!value || inches < 0 || inches >= 12)) {
          return 'Inches must be between 0-11'
        }
        break
      }
      case 'heightCm': {
        const cm = parseFloat(value)
        if (data.heightUnit === 'cm' && (!value || cm < 100 || cm > 250)) {
          return 'Height must be between 100-250 cm'
        }
        break
      }
    }
    return ''
  }, [data.heightUnit, data.weightUnit])

  const updateData = useCallback((field: keyof BMIData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
    
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }, [errors])

  const calculateBMI = useCallback(async () => {
    const newErrors: ValidationErrors = {}

    if (!data.sex) newErrors.sex = 'Please select your sex'

    Object.keys(data).forEach(key => {
      const field = key as keyof BMIData
      if (typeof data[field] === 'string') {
        const error = validateField(field, data[field] as string)
        if (error) newErrors[field] = error
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return false
    }

    setErrors({})
    setIsCalculating(true)

    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Convert height to cm
    let heightInCm: number
    if (data.heightUnit === 'ft-in') {
      const feet = parseFloat(data.heightFt)
      const inches = parseFloat(data.heightIn)
      heightInCm = (feet * 12 + inches) * 2.54
    } else {
      heightInCm = parseFloat(data.heightCm)
    }

    // Convert weight to kg
    let weightInKg: number
    if (data.weightUnit === 'lb') {
      weightInKg = parseFloat(data.weight) * 0.453592
    } else {
      weightInKg = parseFloat(data.weight)
    }

    // Calculate BMI
    const heightInM = heightInCm / 100
    const bmi = weightInKg / (heightInM * heightInM)

    // Determine category and health risk
    let category: string
    let interpretation: string
    let healthRisk: string

    if (bmi < 18.5) {
      category = 'Underweight'
      interpretation = 'You may need to gain weight for optimal health. Focus on nutrient-dense foods and consider consulting with a healthcare provider.'
      healthRisk = 'Increased risk of nutritional deficiencies and weakened immune system.'
    } else if (bmi < 25) {
      category = 'Normal weight'
      interpretation = 'Excellent! You\'re maintaining a healthy weight for your height. Keep up your current lifestyle.'
      healthRisk = 'Lowest risk for weight-related health issues.'
    } else if (bmi < 30) {
      category = 'Overweight'
      interpretation = 'You may benefit from lifestyle changes to reach a healthier weight range through diet and exercise.'
      healthRisk = 'Moderately increased risk of cardiovascular disease and diabetes.'
    } else {
      category = 'Obese'
      interpretation = 'Consider consulting with healthcare professionals about comprehensive weight management strategies.'
      healthRisk = 'Significantly increased risk of serious health conditions.'
    }

    setResult({
      bmi: Math.round(bmi * 10) / 10,
      category,
      interpretation,
      healthRisk,
    })

    setIsCalculating(false)
    return true
  }, [data, validateField])

  const reset = useCallback(() => {
    setData({
      sex: '',
      age: '',
      heightFt: '',
      heightIn: '',
      heightCm: '',
      weight: '',
      heightUnit: 'ft-in',
      weightUnit: 'lb',
    })
    setResult(null)
    setErrors({})
  }, [])

  const getProgress = useCallback(() => {
    const fields = [data.sex, data.age, data.weight]
    const heightComplete = data.heightUnit === 'ft-in' ? data.heightFt && data.heightIn : data.heightCm
    if (heightComplete) fields.push('height')
    const completed = fields.filter(Boolean).length
    return (completed / 4) * 100
  }, [data])

  return {
    data,
    result,
    errors,
    isCalculating,
    updateData,
    calculateBMI,
    reset,
    getProgress,
  }
}
