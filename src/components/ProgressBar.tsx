import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const ProgressBar = ({ currentStep, totalSteps, className }: ProgressBarProps) => {
  return (
    <div className={`flex items-center justify-center gap-2.5 py-4 ${className || ''}`}>
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;

        return (
          <motion.div
            key={step}
            className="rounded-full"
            animate={{
              width: isCurrent ? 12 : 10,
              height: isCurrent ? 12 : 10,
              backgroundColor: isCompleted || isCurrent
                ? 'hsl(24, 100%, 63%)'
                : 'hsl(30, 24%, 87%)',
              boxShadow: isCurrent
                ? '0 0 0 4px rgba(255, 140, 66, 0.2)'
                : '0 0 0 0px rgba(255, 140, 66, 0)',
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
};

export default ProgressBar;
