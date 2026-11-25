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
        'w-full h-full rounded-[28px] px-6 flex items-center justify-between transition-all active:scale-[0.98]',
        isSelected
          ? 'bg-[#17153B] text-white'
          : 'bg-white text-[#17153B]'
      )}
    >
      <span className="flex items-baseline gap-2">
        <span className="text-[40px] leading-none font-semibold">{minutes}</span>
        <span className="text-[18px] font-medium">דקות</span>
      </span>
      <span
        className={cn(
          'w-7 h-7 rounded-full flex items-center justify-center',
          isSelected ? 'bg-white text-[#17153B]' : 'border-2 border-[rgba(23,21,59,0.25)]'
        )}
        aria-hidden="true"
      >
        {isSelected && <Check size={16} strokeWidth={3} />}
      </span>
    </button>
  );
};

export default TimeOption;
