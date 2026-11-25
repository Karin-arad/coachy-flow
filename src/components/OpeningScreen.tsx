import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import LiftingCreature from './creatures/LiftingCreature';
import { useFitScale } from '@/hooks/useFitScale';
import { worlds, worldBackground } from '@/lib/worlds';
import { useWorldBackground } from '@/hooks/useWorldBackground';

interface OpeningScreenProps {
  onDone: () => void;
}

/** How long the opening stays before the first question appears, in ms */
const OPENING_DURATION = 3400;

/**
 * Shown on every visit: the creature lifts a barbell, the promise is stated,
 * and the flow starts by itself. A tap anywhere skips ahead.
 */
const OpeningScreen = ({ onDone }: OpeningScreenProps) => {
  useWorldBackground(worldBackground('bounciness', 10));
  const { ref: stageRef, scale } = useFitScale(480);

  useEffect(() => {
    const timer = window.setTimeout(onDone, OPENING_DURATION);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <button
      type="button"
      onClick={onDone}
      aria-label="להתחיל"
      className="flex-1 flex flex-col items-center justify-center gap-8 text-center w-full"
    >
      {/* creature and words sit together in the middle of the screen */}
      <span ref={stageRef} className="w-full block" style={{ height: 'min(46dvh, 400px)' }}>
        <LiftingCreature color={worlds.bounciness.creature} scale={scale} />
      </span>
      <motion.span
        className="block"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
      >
        {/* the creature introduces itself: Coachy is its name */}
        <span className="t-mood block !mt-0 mb-2">היי, אני קואצ'י</span>
        <span className="t-title block whitespace-nowrap" style={{ fontSize: 'min(40px, 9.4vw)' }}>לחפש ביוטיוב? נאאא</span>
        <span className="t-sub block mt-3" style={{ textWrap: 'balance' }}>4 שאלות קצרות ונמצא לך אימון שמתאים בול</span>
      </motion.span>
    </button>
  );
};

export default OpeningScreen;
