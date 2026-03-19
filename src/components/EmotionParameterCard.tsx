
import React from 'react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import EmotionAnimation from './EmotionAnimation';

interface EmotionParameterCardProps {
  id: string;
  label: string;
  question: string;
  icon: React.ReactNode;
  value: number;
  onChange: (value: number[]) => void;
  maxValue: number;
  type: 'bounciness' | 'energy' | 'alertness' | 'lightness';
  scaleLabels: {
    min: string;
    max: string;
  };
}

const EmotionParameterCard = ({ 
  id, 
  label, 
  question, 
  icon, 
  value, 
  onChange, 
  maxValue,
  type,
  scaleLabels 
}: EmotionParameterCardProps) => {
  return (
    <div className={cn(
      "space-y-2 bg-gradient-to-r p-3 rounded-xl transition-all duration-300 shadow-sm",
      value > 4 ? 
        "from-white/80 to-white/50 shadow-md" :
        "from-white/60 to-transparent"
    )}>
      <div className="flex items-center gap-2">
        {icon}
        <div className="text-base font-semibold text-[hsl(var(--foreground))]">
          {question}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-xs text-[hsl(var(--muted-foreground))] font-medium">{label}</div>
        <div className="text-xl font-bold text-[hsl(var(--primary))]">
          {value}
        </div>
      </div>
      
      <Slider
        value={[maxValue + 1 - value]}
        min={1}
        max={maxValue}
        step={1}
        onValueChange={(newValue) => onChange(newValue)}
        className="my-4 w-full"
        emotionType={type}
      />
      
      <div className="flex justify-between text-xs text-gray-500 font-medium">
        <span>{scaleLabels.min}</span>
        <span>{scaleLabels.max}</span>
      </div>
      
      <div className="mt-4 mb-2">
        <EmotionAnimation
          type={type}
          value={value}
          maxValue={maxValue}
        />
      </div>
    </div>
  );
};

export default EmotionParameterCard;
