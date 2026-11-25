import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const ProgressBar = ({ currentStep, totalSteps, className }: ProgressBarProps) => {
  return (
    <div
      className={`flex items-center gap-1.5 px-2 ${className || ''}`}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-valuenow={currentStep}
      aria-label={`שלב ${currentStep} מתוך ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }, (_, i) => (
        <span
          key={i}
          className="flex-1 h-1.5 rounded-full transition-all duration-300"
          style={{ background: 'var(--ink)', opacity: i < currentStep ? 1 : 0.18 }}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
