import React from 'react';
import { Card } from '@/components/ui/card';

export const BMIChart: React.FC = () => {
  const categories = [
    { range: '< 18.5', category: 'Underweight', color: 'bg-bmi-accent', textColor: 'text-bmi-accent' },
    { range: '18.5 - 24.9', category: 'Normal weight', color: 'bg-bmi-success', textColor: 'text-bmi-success' },
    { range: '25.0 - 29.9', category: 'Overweight', color: 'bg-bmi-warning', textColor: 'text-bmi-warning' },
    { range: '≥ 30.0', category: 'Obese', color: 'bg-bmi-danger', textColor: 'text-bmi-danger' }
  ];

  return (
    <Card className="p-6 bg-gradient-to-br from-bmi-card to-bmi-hover border-bmi-input-border shadow-lg">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
        BMI Categories Reference
      </h3>
      
      <div className="space-y-3">
        {categories.map((cat, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${cat.color}`} />
              <span className="font-medium text-foreground">{cat.category}</span>
            </div>
            <span className={`font-semibold ${cat.textColor}`}>{cat.range}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-bmi-hover rounded-lg">
        <p className="text-xs text-bmi-muted text-center">
          * BMI is a screening tool and may not reflect body composition. 
          Consult healthcare providers for comprehensive health assessment.
        </p>
      </div>
    </Card>
  );
};