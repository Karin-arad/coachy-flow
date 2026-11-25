import { useEffect } from 'react';

/** Paints the whole app background for the current screen (see layout.css: --world-bg). */
export const useWorldBackground = (color: string) => {
  useEffect(() => {
    document.documentElement.style.setProperty('--world-bg', color);
  }, [color]);
};
