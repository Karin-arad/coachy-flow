
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
    <div className={cn('w-full max-w-md mx-auto glass-card h-3 rounded-full my-4 shadow-sm overflow-hidden', className)}>
      <div 
        className="h-full bg-full-spectrum rounded-full transition-all duration-500 ease-in-out relative animate-color-shift bg-[length:300%_100%]"
        style={{ width: `${progress}%` }}
      >
        <div className="absolute inset-0 bg-white/20 rounded-full"></div>
      </div>
    </div>
  );
};

export default ProgressBar;
