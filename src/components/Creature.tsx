import React from 'react';
import { cn } from '@/lib/utils';

interface CreatureProps {
  /** 1 (flat on the floor) to 10 (tall, smiling, jumping) */
  value: number;
  color: string;
  /** 1 = full-size hero. Smaller values shrink the whole figure. */
  scale?: number;
  /** Gentle idle bounce, for loading states */
  bouncing?: boolean;
  className?: string;
}

const INK = '#17153B';

/**
 * The app's character. Its pose is the answer: height, eyes and smile
 * all follow the value. Decorative only; the slider carries the meaning.
 */
const Creature = ({ value, color, scale = 1, bouncing = false, className }: CreatureProps) => {
  const v = Math.min(10, Math.max(1, value));
  const width = (250 - v * 7) * scale;
  const height = (70 + v * 26) * scale;
  const jumping = v > 8;
  const shadowWidth = jumping ? 120 * scale : width - 20 * scale;
  const radius =
    v <= 3
      ? '60% 60% 28% 28% / 85% 85% 15% 15%'
      : v <= 7
        ? '50% 50% 40% 40% / 58% 58% 42% 42%'
        : '48% 52% 44% 46% / 42% 42% 58% 58%';
  const eyeHeight = (v <= 2 ? 5 : 6 + v * 2) * scale;
  const smileHeight = (v <= 3 ? 2 : 2 + v * 1.6) * scale;
  const stroke = Math.max(3, 5 * scale);

  return (
    <div
      aria-hidden="true"
      className={cn('relative w-full h-full', className)}
      style={{ minHeight: 120 * scale }}
    >
      <div
        className="absolute left-1/2 rounded-[50%] transition-all duration-300"
        style={{
          bottom: 12 * scale,
          width: shadowWidth,
          height: 22 * scale,
          marginLeft: -shadowWidth / 2,
          background: 'rgba(23, 21, 59, 0.14)',
        }}
      />
      <div
        className={cn('absolute left-1/2 flex flex-col items-center creature-body', bouncing && 'creature-bounce')}
        style={{
          bottom: (jumping ? 56 : 20) * scale,
          width,
          height,
          marginLeft: -width / 2,
          background: color,
          borderRadius: radius,
        }}
      >
        <div className="flex" style={{ gap: 34 * scale, marginTop: Math.round(height * 0.3) }}>
          {[0, 1].map((i) => (
            <span
              key={i}
              className="block transition-all duration-300"
              style={{ width: 18 * scale, height: eyeHeight, borderRadius: 9 * scale, background: INK }}
            />
          ))}
        </div>
        <span
          className="block transition-all duration-300"
          style={{
            width: 34 * scale,
            height: smileHeight,
            marginTop: 8 * scale,
            borderBottom: `${stroke}px solid ${INK}`,
            borderRadius: '0 0 50% 50%',
          }}
        />
      </div>
    </div>
  );
};

export default Creature;
