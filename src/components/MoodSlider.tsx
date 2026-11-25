import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { playSound } from '@/utils/soundEffects';

interface MoodSliderProps {
  value: number;
  onChange: (value: number[]) => void;
  color: string;
  label: string;
}

/** Right-to-left slider, 1 to 10: the low end is on the right. */
const MoodSlider = ({ value, onChange, color, label }: MoodSliderProps) => (
  <SliderPrimitive.Root
    dir="rtl"
    value={[value]}
    min={1}
    max={10}
    step={1}
    onValueChange={onChange}
    onValueCommit={() => playSound('ding')}
    className="relative flex w-full touch-none select-none items-center h-11"
  >
    <SliderPrimitive.Track className="relative h-[18px] w-full grow overflow-hidden rounded-full slider-track">
      <SliderPrimitive.Range className="absolute h-full" style={{ background: color }} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      aria-label={label}
      className="slider-thumb block h-11 w-11 rounded-full border-[5px] border-white shadow-[0_4px_0_rgba(23,21,59,0.18)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4"
    />
  </SliderPrimitive.Root>
);

export default MoodSlider;
