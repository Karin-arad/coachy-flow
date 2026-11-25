import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimeOptionProps {
  minutes: string;
  isSelected: boolean;
  onSelect: () => void;
}

const TimeOption = ({ minutes, isSelected, onSelect }: TimeOptionProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={cn(
        'w-full h-full bg-white rounded-3xl px-6 flex items-center justify-between transition-all active:scale-[0.98]',
        isSelected
          ? 'border-2 border-[hsl(var(--primary))] shadow-[0_2px_12px_rgba(255,140,66,0.2)]'
          : 'border-[1.5px] border-[hsl(var(--border))]'
      )}
    >
      <span className="flex items-baseline gap-2">
        <span className="text-[40px] leading-none font-bold text-[hsl(var(--foreground))]">{minutes}</span>
        <span className="t-sub">דקות</span>
      </span>
      <span
        className={cn(
          'w-7 h-7 rounded-full flex items-center justify-center',
          isSelected ? 'bg-[hsl(var(--primary))] text-white' : 'border-[1.5px] border-[hsl(var(--border))]'
        )}
        aria-hidden="true"
      >
        {isSelected && <Check size={16} strokeWidth={3} />}
      </span>
    </button>
  );
};

export default TimeOption;
