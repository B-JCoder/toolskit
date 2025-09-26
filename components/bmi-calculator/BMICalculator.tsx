"use client"
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { BMIGauge } from "./BMIGauge";
import { HealthRecommendations } from "./HealthRecommendations";
import { BMIChart } from "./BMIChart";
import { RotateCcw, Calculator, TrendingUp, AlertCircle } from "lucide-react";
import Image from "next/image";

interface BMIData {
  sex: "male" | "female" | "";
  age: string;
  heightFt: string;
  heightIn: string;
  heightCm: string;
  weight: string;
  heightUnit: "ft-in" | "cm";
  weightUnit: "lb" | "kg";
}

interface BMIResult {
  bmi: number;
  category: string;
  interpretation: string;
  healthRisk: string;
}

export const BMICalculator = () => {
  const [data, setData] = useState<BMIData>({
    sex: "",
    age: "",
    heightFt: "",
    heightIn: "",
    heightCm: "",
    weight: "",
    heightUnit: "ft-in",
    weightUnit: "lb",
  });

  const [result, setResult] = useState<BMIResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Calculate completion progress
  useEffect(() => {
    const fields = [data.sex, data.age, data.weight];
    const heightComplete =
      data.heightUnit === "ft-in"
        ? data.heightFt && data.heightIn
        : data.heightCm;
    if (heightComplete) fields.push("height");

    const completed = fields.filter(Boolean).length;
    setProgress((completed / 4) * 100);
  }, [data]);

  const validateField = (field: keyof BMIData, value: string): string => {
    switch (field) {
      case "age":
        const age = parseFloat(value);
        if (!value) return "Age is required";
        if (age < 2 || age > 120) return "Age must be between 2 and 120";
        break;
      case "weight":
        const weight = parseFloat(value);
        if (!value) return "Weight is required";
        if (data.weightUnit === "kg" && (weight < 10 || weight > 300)) {
          return "Weight must be between 10-300 kg";
        }
        if (data.weightUnit === "lb" && (weight < 22 || weight > 660)) {
          return "Weight must be between 22-660 lbs";
        }
        break;
      case "heightFt":
        const ft = parseFloat(value);
        if (data.heightUnit === "ft-in" && (!value || ft < 3 || ft > 8)) {
          return "Height must be between 3-8 feet";
        }
        break;
      case "heightIn":
        const inches = parseFloat(value);
        if (
          data.heightUnit === "ft-in" &&
          (!value || inches < 0 || inches >= 12)
        ) {
          return "Inches must be between 0-11";
        }
        break;
      case "heightCm":
        const cm = parseFloat(value);
        if (data.heightUnit === "cm" && (!value || cm < 100 || cm > 250)) {
          return "Height must be between 100-250 cm";
        }
        break;
    }
    return "";
  };

  const calculateBMI = async () => {
    // Reset errors
    const newErrors: { [key: string]: string } = {};

    // Validate all fields
    if (!data.sex) newErrors.sex = "Please select your sex";

    Object.keys(data).forEach((key) => {
      const field = key as keyof BMIData;
      if (typeof data[field] === "string") {
        const error = validateField(field, data[field] as string);
        if (error) newErrors[field] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast({
        title: "Validation Error",
        description: "Please fix the highlighted fields.",
        variant: "destructive",
      });
      return;
    }

    setErrors({});
    setIsCalculating(true);

    // Simulate calculation with progress
    for (let i = 0; i <= 100; i += 20) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Convert height to cm
    let heightInCm: number;
    if (data.heightUnit === "ft-in") {
      const feet = parseFloat(data.heightFt);
      const inches = parseFloat(data.heightIn);
      heightInCm = (feet * 12 + inches) * 2.54;
    } else {
      heightInCm = parseFloat(data.heightCm);
    }

    // Convert weight to kg
    let weightInKg: number;
    if (data.weightUnit === "lb") {
      weightInKg = parseFloat(data.weight) * 0.453592;
    } else {
      weightInKg = parseFloat(data.weight);
    }

    // Calculate BMI
    const heightInM = heightInCm / 100;
    const bmi = weightInKg / (heightInM * heightInM);

    // Determine category and health risk
    let category: string;
    let interpretation: string;
    let healthRisk: string;

    if (bmi < 18.5) {
      category = "Underweight";
      interpretation =
        "You may need to gain weight for optimal health. Focus on nutrient-dense foods and consider consulting with a healthcare provider.";
      healthRisk =
        "Increased risk of nutritional deficiencies and weakened immune system.";
    } else if (bmi < 25) {
      category = "Normal weight";
      interpretation =
        "Excellent! You're maintaining a healthy weight for your height. Keep up your current lifestyle.";
      healthRisk = "Lowest risk for weight-related health issues.";
    } else if (bmi < 30) {
      category = "Overweight";
      interpretation =
        "You may benefit from lifestyle changes to reach a healthier weight range through diet and exercise.";
      healthRisk =
        "Moderately increased risk of cardiovascular disease and diabetes.";
    } else {
      category = "Obese";
      interpretation =
        "Consider consulting with healthcare professionals about comprehensive weight management strategies.";
      healthRisk = "Significantly increased risk of serious health conditions.";
    }

    setResult({
      bmi: Math.round(bmi * 10) / 10,
      category,
      interpretation,
      healthRisk,
    });

    setIsCalculating(false);

    toast({
      title: "BMI Calculated Successfully",
      description: `Your BMI is ${Math.round(bmi * 10) / 10} (${category})`,
    });
  };

  const resetCalculator = () => {
    setData({
      sex: "",
      age: "",
      heightFt: "",
      heightIn: "",
      heightCm: "",
      weight: "",
      heightUnit: "ft-in",
      weightUnit: "lb",
    });
    setResult(null);
    setErrors({});
    setProgress(0);

    toast({
      title: "Calculator Reset",
      description: "All fields have been cleared.",
    });
  };

  const updateData = (field: keyof BMIData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));

    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "underweight":
        return "text-bmi-accent";
      case "normal weight":
        return "text-bmi-success";
      case "overweight":
        return "text-bmi-warning";
      case "obese":
        return "text-bmi-danger";
      default:
        return "text-bmi-primary";
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-bmi-primary" />
            <h1 className="text-4xl font-bold text-foreground">
              Body Mass Index Calculator
            </h1>
          </div>
          <p className="text-bmi-muted text-lg max-w-2xl mx-auto">
            Get accurate BMI calculations with personalized health insights and
            recommendations
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mt-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-bmi-primary" />
              <span className="text-sm text-bmi-muted">
                Progress: {Math.round(progress)}% complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gender Selection */}
              <Card
                className={`p-6 bg-gradient-to-br from-bmi-card to-bmi-hover border-2 transition-all duration-300 animate-scale-in ${
                  errors.sex
                    ? "border-bmi-danger"
                    : "border-bmi-input-border hover:border-bmi-primary"
                } ${data.sex ? "shadow-lg" : ""}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 bg-bmi-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    What is your sex?
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => updateData("sex", "male")}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                      data.sex === "male"
                        ? "border-bmi-selected-border bg-bmi-selected shadow-lg"
                        : "border-bmi-input-border bg-transparent hover:border-bmi-primary hover:bg-bmi-hover"
                    }`}
                  >
                    <Image
                      src="https://as1.ftcdn.net/jpg/01/68/80/20/1000_F_168802075_Il6LeUG0NCK4JOELmkC7Ki81g0CiLpxU.webp"
                      alt="Male"
                      className="w-12 h-12 mx-auto mb-2 rounded-full object-cover"
                      width={48}
                      height={48}
                    />
                    <span className="font-medium text-foreground">Male</span>
                  </button>

                  <button
                    onClick={() => updateData("sex", "female")}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                      data.sex === "female"
                        ? "border-bmi-selected-border bg-bmi-selected shadow-lg"
                        : "border-bmi-input-border bg-transparent hover:border-bmi-primary hover:bg-bmi-hover"
                    }`}
                  >
                    <Image
                      src="https://i.pinimg.com/1200x/17/f5/9e/17f59eaf91cdfad2ae723a4805fa60dc.jpg"
                      alt="Female"
                      className="w-12 h-12 mx-auto mb-2 rounded-full object-cover"
                      width={48}
                      height={48}
                    />
                    <span className="font-medium text-foreground">Female</span>
                  </button>
                </div>
                {errors.sex && (
                  <div className="flex items-center gap-2 mt-3 text-bmi-danger text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.sex}
                  </div>
                )}
              </Card>

              {/* Age Input */}
              <Card
                className={`p-6 bg-gradient-to-br from-bmi-card to-bmi-hover border-2 transition-all duration-300 animate-scale-in ${
                  errors.age
                    ? "border-bmi-danger"
                    : "border-bmi-input-border hover:border-bmi-primary"
                } ${data.age ? "shadow-lg" : ""}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 bg-bmi-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    How old are you?
                  </h3>
                </div>

                <div className="relative">
                  <Input
                    type="number"
                    value={data.age}
                    onChange={(e) => updateData("age", e.target.value)}
                    className={`text-2xl font-light text-center border-2 transition-all duration-300 focus:border-bmi-primary ${
                      errors.age
                        ? "border-bmi-danger"
                        : "border-bmi-input-border"
                    }`}
                    placeholder="25"
                    min="2"
                    max="120"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-bmi-muted">
                    Years
                  </span>
                </div>
                {errors.age && (
                  <div className="flex items-center gap-2 mt-3 text-bmi-danger text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.age}
                  </div>
                )}
              </Card>

              {/* Height Input */}
              <Card
                className={`p-6 bg-gradient-to-br from-bmi-card to-bmi-hover border-2 transition-all duration-300 animate-scale-in ${
                  errors.heightFt || errors.heightIn || errors.heightCm
                    ? "border-bmi-danger"
                    : "border-bmi-input-border hover:border-bmi-primary"
                } ${
                  (data.heightFt && data.heightIn) || data.heightCm
                    ? "shadow-lg"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 bg-bmi-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    How tall are you?
                  </h3>
                </div>

                {data.heightUnit === "ft-in" ? (
                  <div className="flex gap-4 items-end mb-4">
                    <div className="flex-1">
                      <Input
                        type="number"
                        value={data.heightFt}
                        onChange={(e) => updateData("heightFt", e.target.value)}
                        className={`text-2xl font-light text-center border-2 transition-all duration-300 focus:border-bmi-primary ${
                          errors.heightFt
                            ? "border-bmi-danger"
                            : "border-bmi-input-border"
                        }`}
                        placeholder="5"
                        min="3"
                        max="8"
                      />
                      <div className="text-center mt-1 text-bmi-muted">ft</div>
                    </div>
                    <div className="flex-1">
                      <Input
                        type="number"
                        value={data.heightIn}
                        onChange={(e) => updateData("heightIn", e.target.value)}
                        className={`text-2xl font-light text-center border-2 transition-all duration-300 focus:border-bmi-primary ${
                          errors.heightIn
                            ? "border-bmi-danger"
                            : "border-bmi-input-border"
                        }`}
                        placeholder="7"
                        min="0"
                        max="11"
                      />
                      <div className="text-center mt-1 text-bmi-muted">in</div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4">
                    <Input
                      type="number"
                      value={data.heightCm}
                      onChange={(e) => updateData("heightCm", e.target.value)}
                      className={`text-2xl font-light text-center border-2 transition-all duration-300 focus:border-bmi-primary ${
                        errors.heightCm
                          ? "border-bmi-danger"
                          : "border-bmi-input-border"
                      }`}
                      placeholder="170"
                      min="100"
                      max="250"
                    />
                    <div className="text-center mt-1 text-bmi-muted">cm</div>
                  </div>
                )}

                <div className="flex justify-center">
                  <div className="flex bg-bmi-input-border rounded-full p-1">
                    <button
                      onClick={() => updateData("heightUnit", "ft-in")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                        data.heightUnit === "ft-in"
                          ? "bg-bmi-primary text-white shadow-md"
                          : "text-bmi-muted hover:text-foreground"
                      }`}
                    >
                      ft/in
                    </button>
                    <button
                      onClick={() => updateData("heightUnit", "cm")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                        data.heightUnit === "cm"
                          ? "bg-bmi-primary text-white shadow-md"
                          : "text-bmi-muted hover:text-foreground"
                      }`}
                    >
                      cm
                    </button>
                  </div>
                </div>

                {(errors.heightFt || errors.heightIn || errors.heightCm) && (
                  <div className="flex items-center gap-2 mt-3 text-bmi-danger text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.heightFt || errors.heightIn || errors.heightCm}
                  </div>
                )}
              </Card>

              {/* Weight Input */}
              <Card
                className={`p-6 bg-gradient-to-br from-bmi-card to-bmi-hover border-2 transition-all duration-300 animate-scale-in ${
                  errors.weight
                    ? "border-bmi-danger"
                    : "border-bmi-input-border hover:border-bmi-primary"
                } ${data.weight ? "shadow-lg" : ""}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 bg-bmi-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    How much do you weigh?
                  </h3>
                </div>

                <div className="relative mb-4">
                  <Input
                    type="number"
                    value={data.weight}
                    onChange={(e) => updateData("weight", e.target.value)}
                    className={`text-2xl font-light text-center border-2 transition-all duration-300 focus:border-bmi-primary ${
                      errors.weight
                        ? "border-bmi-danger"
                        : "border-bmi-input-border"
                    }`}
                    placeholder={data.weightUnit === "kg" ? "70" : "154"}
                    min={data.weightUnit === "kg" ? "10" : "22"}
                    max={data.weightUnit === "kg" ? "300" : "660"}
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-bmi-muted">
                    {data.weightUnit === "lb" ? "lbs" : "kg"}
                  </span>
                </div>

                <div className="flex justify-center">
                  <div className="flex bg-bmi-input-border rounded-full p-1">
                    <button
                      onClick={() => updateData("weightUnit", "kg")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                        data.weightUnit === "kg"
                          ? "bg-bmi-primary text-white shadow-md"
                          : "text-bmi-muted hover:text-foreground"
                      }`}
                    >
                      kg
                    </button>
                    <button
                      onClick={() => updateData("weightUnit", "lb")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                        data.weightUnit === "lb"
                          ? "bg-bmi-primary text-white shadow-md"
                          : "text-bmi-muted hover:text-foreground"
                      }`}
                    >
                      lb
                    </button>
                  </div>
                </div>

                {errors.weight && (
                  <div className="flex items-center gap-2 mt-3 text-bmi-danger text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.weight}
                  </div>
                )}
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={calculateBMI}
                disabled={isCalculating || progress < 100}
                className={`px-12 py-4 text-lg font-semibold text-white rounded-full transform transition-all duration-300 hover:scale-105 ${
                  isCalculating ? "animate-pulse-glow" : ""
                } ${
                  progress === 100
                    ? "shadow-lg hover:shadow-xl"
                    : "opacity-60 cursor-not-allowed"
                }`}
                style={{ background: "var(--bmi-gradient-primary)" }}
              >
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

              <Button
                onClick={resetCalculator}
                variant="outline"
                className="px-6 py-4 text-sm font-medium border-2 border-bmi-input-border hover:border-bmi-primary hover:bg-bmi-hover transition-all duration-300 transform hover:scale-105"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Right Column - Reference Chart */}
          <div className="animate-fade-in">
            <BMIChart />
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-12 space-y-8 animate-bounce-in">
            {/* BMI Gauge */}
            <Card className="p-8 bg-gradient-to-br from-bmi-card to-bmi-hover border-bmi-input-border shadow-xl">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Your BMI Result
                </h2>
                <p className="text-bmi-muted">
                  Based on your height and weight measurements
                </p>
              </div>

              <BMIGauge bmi={result.bmi} category={result.category} />

              <div className="text-center mt-6 space-y-2">
                <div
                  className={`text-2xl font-bold ${getCategoryColor(
                    result.category
                  )}`}
                >
                  {result.category}
                </div>
                <p className="text-bmi-muted max-w-2xl mx-auto leading-relaxed">
                  {result.interpretation}
                </p>
                <div className="p-3 bg-bmi-hover rounded-lg mt-4">
                  <p className="text-sm text-bmi-muted">
                    <strong>Health Risk:</strong> {result.healthRisk}
                  </p>
                </div>
              </div>
            </Card>

            {/* Health Recommendations */}
            <HealthRecommendations
              category={result.category}
              bmi={result.bmi}
            />
          </div>
        )}
      </div>
    </div>
  );
};
