
import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const ProgressBar = ({ currentStep, totalSteps, className }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="relative">
      <div className={cn('w-full max-w-md mx-auto glass-card h-4 rounded-full my-4 shadow-sm overflow-hidden', className)}>
        <div 
          className="h-full bg-full-spectrum rounded-full transition-all duration-700 ease-in-out relative animate-color-shift bg-[length:300%_100%]"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 rounded-full"></div>
        </div>
      </div>
      {progress > 0 && progress < 100 && (
        <div 
          className="absolute top-0 h-full flex items-center transition-all duration-700 pointer-events-none"
          style={{ left: `calc(${progress}% - 8px)` }}
        >
          <Sparkles 
            className="text-white drop-shadow-lg animate-sparkle" 
            size={16} 
          />
        </div>
      )}
      {progress === 100 && (
        <div className="absolute -right-2 -top-2 pointer-events-none">
          <div className="relative">
            <Sparkles 
              className="text-amber-500 drop-shadow-lg animate-pulse-gentle" 
              size={24} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
