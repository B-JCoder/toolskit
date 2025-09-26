import React from 'react';

interface BMIGaugeProps {
  bmi: number;
  category: string;
}

export const BMIGauge: React.FC<BMIGaugeProps> = ({ bmi, category }) => {
  // Calculate the position on the gauge (0-100%)
  const getGaugePosition = (bmi: number) => {
    if (bmi < 18.5) return (bmi / 18.5) * 25; // 0-25% for underweight
    if (bmi < 25) return 25 + ((bmi - 18.5) / (25 - 18.5)) * 25; // 25-50% for normal
    if (bmi < 30) return 50 + ((bmi - 25) / (30 - 25)) * 25; // 50-75% for overweight
    return Math.min(75 + ((bmi - 30) / 10) * 25, 100); // 75-100% for obese
  };

  const position = getGaugePosition(bmi);
  const strokeDashoffset = 251.2 - (position / 100) * 251.2;

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'underweight': return 'var(--bmi-accent)';
      case 'normal weight': return 'var(--bmi-success)';
      case 'overweight': return 'var(--bmi-warning)';
      case 'obese': return 'var(--bmi-danger)';
      default: return 'var(--bmi-primary)';
    }
  };

  return (
    <div className="relative w-64 h-32 mx-auto">
      <svg viewBox="0 0 200 100" className="w-full h-full">
        {/* Background arc */}
        <path
          d="M 20 80 A 80 80 0 0 1 180 80"
          fill="none"
          stroke="hsl(var(--bmi-input-border))"
          strokeWidth="8"
          strokeLinecap="round"
        />
        
        {/* Category sections */}
        <path d="M 20 80 A 80 80 0 0 1 70 20" fill="none" stroke="hsl(var(--bmi-accent))" strokeWidth="6" opacity="0.3" />
        <path d="M 70 20 A 80 80 0 0 1 130 20" fill="none" stroke="hsl(var(--bmi-success))" strokeWidth="6" opacity="0.3" />
        <path d="M 130 20 A 80 80 0 0 1 180 80" fill="none" stroke="hsl(var(--bmi-warning))" strokeWidth="6" opacity="0.3" />
        
        {/* Active arc */}
        <path
          d="M 20 80 A 80 80 0 0 1 180 80"
          fill="none"
          stroke={`hsl(${getCategoryColor(category)})`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="251.2"
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1500 ease-out"
          style={{ '--gauge-offset': strokeDashoffset } as React.CSSProperties}
        />
        
        {/* BMI labels */}
        <text x="20" y="95" textAnchor="start" className="fill-bmi-muted text-xs font-medium">18.5</text>
        <text x="100" y="15" textAnchor="middle" className="fill-bmi-muted text-xs font-medium">25</text>
        <text x="180" y="95" textAnchor="end" className="fill-bmi-muted text-xs font-medium">30+</text>
        
        {/* Center BMI value */}
        <text x="100" y="70" textAnchor="middle" className="fill-foreground text-2xl font-bold">
          {bmi}
        </text>
        <text x="100" y="85" textAnchor="middle" className="fill-bmi-muted text-xs font-medium">
          BMI
        </text>
      </svg>
      
      {/* Category labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-bmi-muted px-2">
        <span>Underweight</span>
        <span>Normal</span>
        <span>Overweight</span>
        <span>Obese</span>
      </div>
    </div>
  );
};