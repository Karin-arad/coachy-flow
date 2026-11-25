import { useEffect } from 'react';

/**
 * Paints the whole app background for the current screen (see layout.css: --world-bg).
 * On a dark background, text and controls switch to their light tone.
 */
export const useWorldBackground = (color: string, dark = false) => {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--world-bg', color);
    root.dataset.tone = dark ? 'dark' : 'light';
  }, [color, dark]);
};
