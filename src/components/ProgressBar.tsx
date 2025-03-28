
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
    <div className={cn('w-full max-w-md mx-auto bg-white/50 backdrop-blur-sm h-3 rounded-full my-4 shadow-sm overflow-hidden border border-white/60', className)}>
      <div 
        className="h-full bg-gradient-to-r from-coachy-blue to-indigo-600 rounded-full transition-all duration-500 ease-in-out relative"
        style={{ width: `${progress}%` }}
      >
        <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
      </div>
    </div>
  );
};

export default ProgressBar;
