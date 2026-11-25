import React from 'react';
import { cn } from '@/lib/utils';

interface TimeOptionProps {
  minutes: string;
  isSelected: boolean;
  onSelect: () => void;
}

const COLORS: Record<string, string> = {
  '10': '#12A594',
  '20': '#FF8A1F',
  '30': '#FF4F79',
  '45': '#7C5CFF',
};

/** A clock face with the chosen minutes filled in, out of a full hour. */
const Clock = ({ minutes, color }: { minutes: number; color: string }) => {
  const size = 64;
  const c = size / 2;
  const r = 26;
  const angle = (minutes / 60) * 2 * Math.PI;
  const x = c + r * Math.sin(angle);
  const y = c - r * Math.cos(angle);
  const largeArc = minutes > 30 ? 1 : 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" className="flex-shrink-0">
      <circle cx={c} cy={c} r={30} fill="#fff" stroke="#17153B" strokeWidth="3" />
      <path d={`M${c} ${c} L${c} ${c - r} A${r} ${r} 0 ${largeArc} 1 ${x} ${y} Z`} fill={color} />
      {[0, 90, 180, 270].map((deg) => (
        <line key={deg} x1={c} y1={5} x2={c} y2={10} stroke="#17153B" strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${deg} ${c} ${c})`} />
      ))}
      <line x1={c} y1={c} x2={x} y2={y} stroke="#17153B" strokeWidth="3" strokeLinecap="round" />
      <circle cx={c} cy={c} r={3.5} fill="#17153B" />
    </svg>
  );
};

const TimeOption = ({ minutes, isSelected, onSelect }: TimeOptionProps) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={cn(
        'w-full h-full rounded-[28px] px-6 flex items-center justify-between transition-all active:scale-[0.98]',
        isSelected ? 'bg-[#17153B] text-white' : 'bg-white text-[#17153B]'
      )}
    >
      <span className="flex items-baseline gap-2">
        <span className="text-[40px] leading-none font-semibold">{minutes}</span>
        <span className="text-[18px] font-medium">דקות</span>
      </span>
      <Clock minutes={Number(minutes)} color={COLORS[minutes] ?? '#FF4F79'} />
    </button>
  );
};

export default TimeOption;
