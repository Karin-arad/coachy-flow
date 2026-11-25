import React from 'react';

interface FaceProps {
  /** 1-10: eyes open and the smile grows with the value */
  value: number;
  scale?: number;
  /** Distance from the top of the body, in px */
  top: number;
  color?: string;
}

/** Eyes and smile shared by every form of the creature. */
const Face = ({ value, scale = 1, top, color = '#17153B' }: FaceProps) => {
  const eyeHeight = (value <= 2 ? 5 : 6 + value * 2) * scale;
  const smileHeight = (value <= 3 ? 2 : 2 + value * 1.6) * scale;
  const stroke = Math.max(3, 5 * scale);
  return (
    <div className="relative flex flex-col items-center" style={{ marginTop: top }}>
      <div className="flex" style={{ gap: 34 * scale }}>
        {[0, 1].map((i) => (
          <span
            key={i}
            className="block transition-all duration-300"
            style={{ width: 18 * scale, height: eyeHeight, borderRadius: 9 * scale, background: color }}
          />
        ))}
      </div>
      <span
        className="block transition-all duration-300"
        style={{
          width: 34 * scale,
          height: smileHeight,
          marginTop: 8 * scale,
          borderBottom: `${stroke}px solid ${color}`,
          borderRadius: '0 0 50% 50%',
        }}
      />
    </div>
  );
};

export default Face;
