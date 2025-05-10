
import React from 'react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import EmotionAnimation from './EmotionAnimation';
import { playSound } from '@/utils/soundEffects';

interface EmotionQuestionCardProps {
  title: string;
  question: string;
  emojiIcon: string;
  currentValue: number;
  onChange: (value: number[]) => void;
  onNext: () => void;
  onPrevious: () => void;
  showPrevious: boolean;
  emotionType: "energy" | "bounciness" | "alertness" | "lightness";
  step: number;
  totalSteps: number;
  maxValue: number;
}

const EmotionQuestionCard: React.FC<EmotionQuestionCardProps> = ({
  title,
  question,
  emojiIcon,
  currentValue,
  onChange,
  onNext,
  onPrevious,
  showPrevious,
  emotionType,
  step,
  totalSteps,
  maxValue
}) => {
  const getGradientColor = () => {
    switch (emotionType) {
      case 'energy': return 'from-coachy-yellow to-coachy-pink';
      case 'bounciness': return 'from-coachy-pink to-coachy-blue';
      case 'alertness': return 'from-coachy-blue to-coachy-green';
      case 'lightness': return 'from-coachy-green to-coachy-yellow';
      default: return 'from-coachy-blue to-coachy-green';
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <div className="text-sm text-gray-500">{step}/{totalSteps}</div>
          <div className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r animate-pulse-gentle" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}>
            <span className={cn("bg-gradient-to-r bg-clip-text text-transparent", getGradientColor())}>
              {title}
            </span>
          </div>
        </div>
        
        <motion.div 
          className="w-full bg-gray-100 h-1 rounded-full overflow-hidden"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className={cn("h-full bg-gradient-to-r", getGradientColor())}
            initial={{ width: '0%' }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-between py-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="text-4xl mb-2">{emojiIcon}</div>
          <h3 className="text-lg font-medium text-center mb-6">{question}</h3>
        </motion.div>

        <div className="w-full space-y-8 mb-8">
          <div className="flex justify-between text-xl font-bold">
            <div className={cn("text-transparent bg-clip-text bg-gradient-to-r", getGradientColor())}>
              {currentValue}
            </div>
          </div>
          
          <Slider
            value={[currentValue]}
            min={1}
            max={maxValue}
            step={1}
            onValueChange={(value) => {
              onChange(value);
              playSound('ding');
            }}
            className="w-full"
            emotionType={emotionType}
          />
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>גבוה</span>
            <span>נמוך</span>
          </div>
        </div>

        <div className="mt-4 w-full">
          <EmotionAnimation 
            type={emotionType} 
            value={currentValue} 
            maxValue={maxValue} 
          />
        </div>
      </div>

      <div className="mt-auto pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center">
          {showPrevious ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onPrevious();
                playSound('click');
              }}
              className="flex items-center gap-1 text-xs h-8"
            >
              <ChevronRight size={14} />
              <span>הקודם</span>
            </Button>
          ) : (
            <div></div>
          )}
          
          <div className="flex gap-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div 
                key={i}
                className={cn(
                  "h-1.5 transition-all duration-300",
                  i === step - 1 ? 
                    cn("w-4 rounded-full bg-gradient-to-r", getGradientColor()) : 
                    "w-1.5 rounded-full bg-gray-200"
                )}
              />
            ))}
          </div>
          
          <Button
            variant="joyful"
            size="sm"
            onClick={() => {
              onNext();
              playSound('click');
            }}
            className="flex items-center gap-1 text-xs h-8"
          >
            <span>הבא</span>
            <ChevronLeft size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmotionQuestionCard;
