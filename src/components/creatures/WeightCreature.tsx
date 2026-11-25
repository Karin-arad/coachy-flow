import React from 'react';
import { cn } from '@/lib/utils';
import Face from './Face';

interface Props {
  value: number;
  color: string;
  scale?: number;
}

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Lightness: an iron ball that lands heavily at the low end,
 * a feather that drifts up at the high end, the plain creature in between.
 */
const WeightCreature = ({ value, color, scale = 1 }: Props) => {
  const v = Math.min(10, Math.max(1, value));
  const iron = clamp((5 - v) / 3); // 1 at 1-2, fades out by 5
  const feather = clamp((v - 6) / 3); // fades in from 7, full at 9-10
  const isIron = v <= 3;
  const isFeather = v >= 8;

  const width = (isIron ? 170 : isFeather ? 124 : 196) * scale;
  const height = (isIron ? 170 : isFeather ? 250 : 190) * scale;
  const altitude = (isIron ? 10 : 20 + (v - 4) * 22) * scale; // the feather ends ~150px up
  const radius = isIron
    ? '50% 50% 50% 50% / 50% 50% 50% 50%'
    : isFeather
      ? '90% 10% 90% 10% / 90% 10% 90% 10%'
      : '50% 50% 40% 40% / 58% 58% 42% 42%';
  const shadowWidth = (isIron ? 190 : 170 - (v - 3) * 14) * scale;

  return (
    <div aria-hidden="true" className="relative w-full h-full" style={{ minHeight: 120 * scale }}>
      <div
        className="absolute left-1/2 rounded-[50%] transition-all duration-500"
        style={{
          bottom: 12 * scale,
          width: shadowWidth,
          height: 22 * scale,
          marginLeft: -shadowWidth / 2,
          background: `rgba(23, 21, 59, ${0.26 - (v - 1) * 0.02})`,
        }}
      />
      {/* key: the landing thud replays every time the value drops into iron */}
      <div
        key={isIron ? `iron-${v}` : 'body'}
        className={cn('absolute left-1/2', isIron && 'iron-land', isFeather && 'feather-float')}
        style={{ bottom: altitude, width, marginLeft: -width / 2, height, transition: 'bottom 0.7s cubic-bezier(0.3, 0.8, 0.3, 1)' }}
      >
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            background: color,
            borderRadius: radius,
            transform: isFeather ? 'rotate(-18deg)' : 'none',
            transition: 'border-radius 0.5s ease, transform 0.5s ease',
          }}
        >
          {/* iron: cold metal with a highlight and rivets */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: iron,
              background: 'radial-gradient(circle at 34% 28%, #B4BDC7 0%, #6B7682 34%, #3D4651 68%, #262C34 100%)',
            }}
          >
            {[[18, 50], [82, 50], [50, 86]].map(([x, y], i) => (
              <span
                key={i}
                className="absolute rounded-full"
                style={{ left: `${x}%`, top: `${y}%`, width: 9 * scale, height: 9 * scale, margin: -4.5 * scale, background: '#1E242B' }}
              />
            ))}
          </div>
          {/* feather: pale, with a quill and fine barbs */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: feather,
              background:
                'linear-gradient(to bottom right, transparent calc(50% - 1.5px), rgba(18,110,100,0.4) calc(50% - 1.5px), rgba(18,110,100,0.4) calc(50% + 1.5px), transparent calc(50% + 1.5px)), repeating-linear-gradient(100deg, rgba(255,255,255,0.75) 0 2px, transparent 2px 8px), #C9F5EC',
            }}
          />
        </div>
        {/* the face stays upright while the feather tilts */}
        <div className="absolute inset-0 flex justify-center">
          <Face value={v} scale={scale} top={Math.round(height * 0.34)} color={isIron ? '#F2F4F7' : '#17153B'} />
        </div>
      </div>
    </div>
  );
};

export default WeightCreature;
