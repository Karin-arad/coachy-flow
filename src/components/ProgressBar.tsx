
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
    <div className="relative w-full">
      <div className={cn('w-full mx-auto h-1 rounded-full my-4 overflow-hidden bg-gray-100', className)}>
        <div 
          className="h-full rounded-full transition-all duration-700 ease-in-out relative coachy-rainbow-gradient bg-[length:300%_100%]"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {progress === 100 && (
        <div className="absolute -right-1 top-0 pointer-events-none">
          <div className="relative">
            <Sparkles 
              className="text-amber-500 drop-shadow-lg animate-pulse-gentle" 
              size={16} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
