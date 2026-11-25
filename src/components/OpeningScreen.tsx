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
      className="flex-1 flex flex-col text-start w-full"
    >
      <span ref={stageRef} className="flex-1 min-h-0 w-full block">
        <LiftingCreature color={worlds.bounciness.creature} scale={scale} />
      </span>
      <motion.span
        className="block pb-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
      >
        <span className="t-title block">נמצא לך אימון מושלם ביוטיוב</span>
        <span className="t-sub block mt-3" style={{ textWrap: 'balance' }}>ארבע שאלות קצרות על ההרגשה שלך, ויש לך סרטון</span>
      </motion.span>
    </button>
  );
};

export default OpeningScreen;
