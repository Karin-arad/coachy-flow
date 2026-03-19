
import React from 'react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';

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
  return (
    <div className={cn('bg-white rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex flex-col', className)}>
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="text-[56px] text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {emojiIcon}
        </motion.div>

        <motion.h3
          className="text-2xl font-bold text-[hsl(var(--foreground))] text-center mb-4"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {title}
        </motion.h3>

        <div className="w-full px-2 relative mb-2">
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
          <div className="flex justify-between mt-2 px-1">
            <span className="text-sm text-muted-foreground">😊</span>
            <span className="text-sm text-muted-foreground">😔</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
