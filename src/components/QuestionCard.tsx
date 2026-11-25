import React from 'react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import NavigationButtons from './NavigationButtons';

interface QuestionCardProps {
  title: string;
  emojiIcon?: string;
  currentValue: number;
  onChange: (value: number[]) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  currentStep: number;
  totalSteps: number;
  emotionType?: "energy" | "bounciness" | "alertness" | "lightness";
  className?: string;
  showPrevious?: boolean;
}

const sliderLabels: Record<string, { high: string; low: string }> = {
  bounciness: { high: 'שמחה גבוהה', low: 'שמחה נמוכה' },
  energy: { high: 'הרבה אנרגיה', low: 'מעט אנרגיה' },
  alertness: { high: 'ערנות גבוהה', low: 'עייפות' },
  lightness: { high: 'קלילות', low: 'כבדות' },
};

const QuestionCard = ({
  title,
  emojiIcon = "✨",
  currentValue,
  onChange,
  onNext,
  onPrevious,
  currentStep,
  totalSteps,
  emotionType,
  className,
  showPrevious = true
}: QuestionCardProps) => {
  const labels = emotionType ? sliderLabels[emotionType] : { high: 'גבוה', low: 'נמוך' };

  return (
    <div className={cn('screen', className)}>
      <div className="screen-hero">
        <motion.div
          className="hero-badge"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        >
          {emojiIcon}
        </motion.div>
        <h1 className="t-title">{title}</h1>
      </div>

      <div className="surface">
        <div className="flex items-baseline justify-center gap-1 mb-5" dir="ltr">
          <span className="text-[44px] leading-none font-bold text-[hsl(var(--foreground))]">{currentValue}</span>
          <span className="t-sub">/ 10</span>
        </div>

        <Slider
          dir="rtl"
          value={[currentValue]}
          min={1}
          max={10}
          step={1}
          onValueChange={onChange}
          emotionType={emotionType}
          className="w-full"
        />

        {/* The slider runs right-to-left: its low end is on the right */}
        <div className="flex justify-between mt-4">
          <span className="t-label">{labels.low}</span>
          <span className="t-label">{labels.high}</span>
        </div>
      </div>

      {onNext && (
        <NavigationButtons
          onNext={onNext}
          onPrevious={onPrevious}
          hidePrevious={!showPrevious}
          nextLabel={currentStep === totalSteps ? 'יאללה, נמשיך' : 'הבא'}
          showChevron={currentStep !== totalSteps}
        />
      )}
    </div>
  );
};

export default QuestionCard;
