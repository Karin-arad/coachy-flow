
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TimeOptionProps {
  minutes: string;
  isSelected: boolean;
  onSelect: () => void;
}

const TimeOption = ({ minutes, isSelected, onSelect }: TimeOptionProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className={cn(
        'bg-white rounded-2xl p-5 text-center transition-all',
        isSelected
          ? 'border-2 border-[hsl(var(--primary))] shadow-[0_2px_12px_rgba(255,140,66,0.15)]'
          : 'border-[1.5px] border-[hsl(var(--border))]'
      )}
    >
      <div className={cn(
        'text-[28px] font-bold',
        isSelected ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--foreground))]'
      )}>
        {minutes}
      </div>
      <div className="text-[13px] text-[hsl(var(--muted-foreground))]">דקות</div>
    </motion.button>
  );
};

export default TimeOption;
