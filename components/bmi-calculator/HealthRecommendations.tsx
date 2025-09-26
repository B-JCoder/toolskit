import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Apple, Dumbbell, Target } from 'lucide-react';

interface HealthRecommendationsProps {
  category: string;
  bmi: number;
}

export const HealthRecommendations: React.FC<HealthRecommendationsProps> = ({ category, bmi }) => {
  const getRecommendations = (category: string) => {
    switch (category.toLowerCase()) {
      case 'underweight':
        return {
          color: 'bg-bmi-accent',
          icon: Target,
          title: 'Healthy Weight Gain',
          tips: [
            'Focus on nutrient-dense, high-calorie foods',
            'Include healthy fats like nuts, avocados, and olive oil',
            'Eat frequent, smaller meals throughout the day',
            'Consider strength training to build muscle mass',
            'Consult with a nutritionist for personalized guidance'
          ]
        };
      case 'normal weight':
        return {
          color: 'bg-bmi-success',
          icon: Heart,
          title: 'Maintain Your Health',
          tips: [
            'Continue your current healthy lifestyle',
            'Maintain regular physical activity (150min/week)',
            'Eat a balanced diet with plenty of fruits and vegetables',
            'Monitor your weight regularly',
            'Focus on building strength and flexibility'
          ]
        };
      case 'overweight':
        return {
          color: 'bg-bmi-warning',
          icon: Apple,
          title: 'Healthy Weight Loss',
          tips: [
            'Create a moderate calorie deficit (300-500 calories/day)',
            'Increase physical activity gradually',
            'Focus on whole foods and reduce processed foods',
            'Stay hydrated and get adequate sleep',
            'Consider consulting with a healthcare provider'
          ]
        };
      case 'obese':
        return {
          color: 'bg-bmi-danger',
          icon: Dumbbell,
          title: 'Comprehensive Health Plan',
          tips: [
            'Consult with healthcare professionals immediately',
            'Consider medically supervised weight loss programs',
            'Start with low-impact exercises like walking',
            'Focus on sustainable dietary changes',
            'Monitor for related health conditions regularly'
          ]
        };
      default:
        return {
          color: 'bg-bmi-primary',
          icon: Heart,
          title: 'General Health',
          tips: ['Maintain a balanced lifestyle']
        };
    }
  };

  const recommendations = getRecommendations(category);
  const IconComponent = recommendations.icon;

  return (
    <Card className="p-6 bg-gradient-to-br from-bmi-card to-bmi-hover border-bmi-input-border shadow-lg animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-full ${recommendations.color} text-white`}>
          <IconComponent className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{recommendations.title}</h3>
          <Badge variant="outline" className="text-xs">
            Based on BMI {bmi}
          </Badge>
        </div>
      </div>
      
      <ul className="space-y-2">
        {recommendations.tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-bmi-muted">
            <div className="w-1.5 h-1.5 bg-bmi-primary rounded-full mt-2 flex-shrink-0" />
            {tip}
          </li>
        ))}
      </ul>
    </Card>
  );
};