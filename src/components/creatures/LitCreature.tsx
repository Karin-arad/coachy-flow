import React from 'react';
import Creature from '../Creature';

interface Props {
  value: number;
  color: string;
  scale?: number;
}

/** Alertness: a lamp glow grows behind the creature and the creature brightens. */
const LitCreature = ({ value, color, scale = 1 }: Props) => {
  const v = Math.min(10, Math.max(1, value));
  const t = (v - 1) / 9;
  const glow = (160 + t * 260) * scale;
  const stars = v <= 2 ? 1 : v <= 4 ? 0.5 : 0;

  return (
    <div aria-hidden="true" className="relative w-full h-full">
      <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: stars }}>
        {[[12, 18, 4], [30, 46, 3], [78, 12, 5], [88, 40, 3], [60, 26, 4], [20, 70, 3]].map(([x, y, s], i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white star-twinkle"
            style={{ left: `${x}%`, top: `${y}%`, width: s, height: s, animationDelay: `${i * 0.4}s` }}
          />
        ))}
      </div>
      <div
        className="absolute left-1/2 rounded-full transition-all duration-500"
        style={{
          bottom: 40 * scale,
          width: glow,
          height: glow,
          marginLeft: -glow / 2,
          background: '#FFF7CF',
          opacity: 0.12 + t * 0.6,
        }}
      />
      <div
        className="absolute inset-0 transition-[filter] duration-500"
        style={{ filter: `brightness(${0.55 + t * 0.45}) saturate(${0.6 + t * 0.4})` }}
      >
        <Creature value={v} color={color} scale={scale} />
      </div>
    </div>
  );
};

export default LitCreature;
