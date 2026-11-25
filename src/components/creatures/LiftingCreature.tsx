import React from 'react';
import Face from './Face';

interface Props {
  color: string;
  scale?: number;
}

const INK = '#17153B';

/** The creature doing overhead presses with a barbell. Used on the opening screen. */
const LiftingCreature = ({ color, scale = 1 }: Props) => {
  const s = scale;
  const bodyWidth = 194 * s;
  const bodyHeight = 250 * s;
  const ground = 20 * s;
  const barWidth = 290 * s;
  // low enough that the bar rests under the face between presses
  const shoulder = ground + bodyHeight * 0.34;
  const rig = {
    '--rig-low': `${10 * s}px`,
    '--rig-high': `${205 * s}px`,
  } as React.CSSProperties;

  return (
    <div aria-hidden="true" className="relative w-full h-full" style={{ minHeight: 380 * s }}>
      <div
        className="absolute left-1/2 rounded-[50%]"
        style={{
          bottom: 12 * s,
          width: bodyWidth,
          height: 22 * s,
          marginLeft: -bodyWidth / 2,
          background: 'rgba(23, 21, 59, 0.14)',
        }}
      />

      <div
        className="absolute left-1/2 flex flex-col items-center lift-body"
        style={{
          bottom: ground,
          width: bodyWidth,
          height: bodyHeight,
          marginLeft: -bodyWidth / 2,
          background: color,
          borderRadius: '50% 50% 40% 40% / 58% 58% 42% 42%',
        }}
      >
        <Face value={8} scale={s} top={Math.round(bodyHeight * 0.26)} />
      </div>

      {/* arms and barbell: the rig grows upward from the shoulders */}
      <div
        className="absolute left-1/2 lift-rig"
        style={{ bottom: shoulder, width: barWidth, marginLeft: -barWidth / 2, ...rig }}
      >
        {[-1, 1].map((side) => (
          <span
            key={side}
            className="absolute bottom-0 top-0 rounded-full"
            style={{
              left: '50%',
              width: 16 * s,
              marginLeft: side * (bodyWidth / 2 + 2 * s) - 8 * s,
              background: color,
            }}
          />
        ))}
        <span
          className="absolute left-0 right-0 rounded-full"
          style={{ top: -6 * s, height: 12 * s, background: INK }}
        />
        {[0, 1].map((i) => (
          <React.Fragment key={i}>
            <span
              className="absolute rounded-[8px]"
              style={{
                [i === 0 ? 'left' : 'right']: 0,
                top: -42 * s,
                width: 22 * s,
                height: 84 * s,
                background: INK,
              }}
            />
            <span
              className="absolute rounded-[6px]"
              style={{
                [i === 0 ? 'left' : 'right']: 26 * s,
                top: -28 * s,
                width: 14 * s,
                height: 56 * s,
                background: INK,
              }}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default LiftingCreature;
