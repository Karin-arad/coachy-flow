
import React from 'react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="flex justify-center gap-2 mt-1">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div 
          key={index}
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-all duration-300",
            index === currentStep ? "bg-coachy-blue w-4" : "bg-gray-300"
          )}
        />
      ))}
    </div>
  );
};

export default StepIndicator;
