
import React from 'react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  
  // Generate dots for step indicator
  const dots = Array.from({ length: totalSteps }, (_, i) => (
    <div 
      key={i} 
      className={cn(
        'w-2 h-2 rounded-full transition-all duration-300',
        i < currentStep ? 'bg-coachy-blue' : 'bg-gray-200'
      )}
    />
  ));
  
  return (
    <div className={cn('coachy-card h-full flex flex-col', className)}>
      <div className="flex flex-col items-center justify-center flex-1 gap-4">
        <motion.div
          className="text-6xl mb-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {emojiIcon}
        </motion.div>
        
        <motion.h3
          className="text-lg font-medium mb-6"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {title}
        </motion.h3>
        
        <div className="w-full px-4 relative mb-4">
          <div className="flex justify-between mb-1 text-xs text-gray-500 px-2">
            <span>גבוה</span>
            <span>{currentValue}</span>
            <span>נמוך</span>
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
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          {showPrevious ? (
            <Button 
              variant="ghost" 
              onClick={onPrevious}
              className="text-gray-500 hover:text-gray-700"
            >
              <ChevronRight className="mr-1 h-4 w-4" />
              הקודם
            </Button>
          ) : (
            <div />
          )}
          
          <div className="flex gap-1">
            {dots}
          </div>
          
          <Button 
            variant="ghost" 
            onClick={onNext}
            className="text-coachy-blue hover:text-coachy-blue/80"
          >
            הבא
            <ChevronLeft className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
