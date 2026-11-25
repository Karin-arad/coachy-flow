/**
 * The visual world of each screen: a background that moves from a duller
 * tone (low value) to a brighter one (high value), and the creature's colour.
 */
export type WorldKey = 'bounciness' | 'energy' | 'alertness' | 'lightness' | 'neutral';

interface World {
  creature: string;
  bgLow: string;
  bgHigh: string;
  /** One phrase per pair of values, from 1-2 up to 9-10 */
  moods: [string, string, string, string, string];
}

export const worlds: Record<WorldKey, World> = {
  bounciness: {
    creature: '#FF4F79',
    bgLow: '#B4D6C6',
    bgHigh: '#CDF7E1',
    moods: ['על הרצפה', 'ככה ככה', 'בסדר', 'טוב לי', 'על הגג'],
  },
  energy: {
    creature: '#FF8A1F',
    bgLow: '#C8C5E6',
    bgHigh: '#E6E3FF',
    moods: ['סוללה ריקה', 'על אדים', 'יש משהו', 'טעינה מלאה', 'אנרגיה לחלק'],
  },
  alertness: {
    creature: '#7C5CFF',
    bgLow: '#E6D7A6',
    bgHigh: '#FFF2BA',
    moods: ['עוד בחלום', 'באמצע פיהוק', 'פה, בערך', 'ראש צלול', 'ערנות שיא'],
  },
  lightness: {
    creature: '#12A594',
    bgLow: '#E6C3CB',
    bgHigh: '#FFDEE5',
    moods: ['שק מלט', 'קצת כבד', 'באמצע', 'קליל', 'נוצה'],
  },
  neutral: {
    creature: '#FF4F79',
    bgLow: '#CDF7E1',
    bgHigh: '#CDF7E1',
    moods: ['', '', '', '', ''],
  },
};

const hexToRgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

/** Background for a value from 1 to 10, blended between the world's two tones. */
export const worldBackground = (key: WorldKey, value = 10): string => {
  const { bgLow, bgHigh } = worlds[key];
  const t = Math.min(1, Math.max(0, (value - 1) / 9));
  const a = hexToRgb(bgLow);
  const b = hexToRgb(bgHigh);
  const mix = a.map((c, i) => Math.round(c + (b[i] - c) * t));
  return `rgb(${mix[0]}, ${mix[1]}, ${mix[2]})`;
};

export const moodFor = (key: WorldKey, value: number): string =>
  worlds[key].moods[Math.min(4, Math.max(0, Math.ceil(value / 2) - 1))];
