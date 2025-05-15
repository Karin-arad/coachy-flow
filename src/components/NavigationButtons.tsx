
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface NavigationButtonsProps {
  onNext: () => void;
  onPrevious: () => void;
  isLastStep: boolean;
  isPreviousDisabled: boolean;
}

const NavigationButtons = ({ 
  onNext, 
  onPrevious, 
  isLastStep, 
  isPreviousDisabled 
}: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between mt-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onPrevious}
        disabled={isPreviousDisabled}
        className="flex items-center gap-1 text-xs h-8"
      >
        <ChevronRight size={14} />
        <span>הקודם</span>
      </Button>
      
      {isLastStep ? (
        <Button 
          onClick={onNext}
          variant="energetic"
          className="text-white px-4 py-1 transition-all duration-300 transform hover:scale-105 active:scale-95 rounded-xl shadow-sm hover:shadow-md hover:brightness-105 relative overflow-hidden group text-xs h-8"
        >
          <span className="relative z-10">יאללה, נמשיך</span>
          <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform origin-right duration-300"></span>
        </Button>
      ) : (
        <Button
          variant="joyful"
          size="sm"
          onClick={onNext}
          className="flex items-center gap-1 text-xs h-8"
        >
          <span>הבא</span>
          <ChevronLeft size={14} />
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
