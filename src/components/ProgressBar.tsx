
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const ProgressBar = ({ currentStep, totalSteps, className }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className={cn('w-full max-w-md mx-auto bg-white/80 h-2 rounded-full my-4 shadow-sm overflow-hidden', className)}>
      <div 
        className="h-full bg-coachy-blue rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
