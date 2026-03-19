
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface NavigationButtonsProps {
  onNext: () => void;
  onPrevious: () => void;
  isLastStep: boolean;
  isPreviousDisabled: boolean;
  isLastSlider?: boolean;
}

const NavigationButtons = ({
  onNext,
  onPrevious,
  isLastStep,
  isPreviousDisabled,
  isLastSlider
}: NavigationButtonsProps) => {
  return (
    <div className="flex gap-3 mt-2">
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onPrevious}
        disabled={isPreviousDisabled}
        className="flex-1 py-3.5 rounded-[14px] border-[1.5px] border-[hsl(var(--border))] bg-white text-[hsl(var(--muted-foreground))] font-medium text-[15px] flex items-center justify-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronRight size={16} />
        <span>הקודם</span>
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onNext}
        className="flex-[2] py-3.5 rounded-[14px] bg-[hsl(var(--primary))] text-white font-semibold text-base shadow-[0_4px_12px_rgba(255,140,66,0.3)] flex items-center justify-center gap-1"
      >
        {isLastStep ? (
          <span>יאללה, נמשיך</span>
        ) : (
          <>
            <span>הבא</span>
            <ChevronLeft size={16} />
          </>
        )}
      </motion.button>
    </div>
  );
};

export default NavigationButtons;
