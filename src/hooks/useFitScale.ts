import { useEffect, useRef, useState } from 'react';

/**
 * Scale for a Creature so its tallest pose fits the element it sits in.
 * `fullHeight` is the stage height at which the creature is drawn at scale 1.
 */
export const useFitScale = (fullHeight = 400, min = 0.3) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const stage = ref.current;
    if (!stage) return;
    const fit = () => setScale(Math.min(1, Math.max(min, stage.clientHeight / fullHeight)));
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [fullHeight, min]);

  return { ref, scale };
};
