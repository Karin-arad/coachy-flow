import React from 'react';
import Face from './Face';

interface Props {
  value: number;
  color: string;
  scale?: number;
}

/** Energy: the lower the value, the slower and flatter the bounce. */
const BouncingBall = ({ value, color, scale = 1 }: Props) => {
  const v = Math.min(10, Math.max(1, value));
  const size = 170 * scale;
  const height = (6 + v * 17) * scale; // 23px .. 176px
  const duration = 2.3 - v * 0.19; // 2.1s .. 0.4s
  const motion = {
    '--bounce-height': `${-height}px`,
    animationDuration: `${duration}s`,
  } as React.CSSProperties;

  return (
    <div aria-hidden="true" className="relative w-full h-full" style={{ minHeight: 120 * scale }}>
      <div
        className="absolute left-1/2 rounded-[50%] ball-shadow"
        style={{
          bottom: 12 * scale,
          width: size - 20 * scale,
          height: 22 * scale,
          marginLeft: -(size - 20 * scale) / 2,
          background: 'rgba(23, 21, 59, 0.16)',
          animationDuration: `${duration}s`,
        }}
      />
      <div
        className="absolute left-1/2 rounded-full ball-bounce"
        style={{ bottom: 20 * scale, width: size, height: size, marginLeft: -size / 2, background: color, ...motion }}
      >
        <Face value={v} scale={scale} top={Math.round(size * 0.32)} />
      </div>
    </div>
  );
};

export default BouncingBall;
