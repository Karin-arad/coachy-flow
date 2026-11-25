
import { EmotionRatings } from '../types/video';

/** The number of minutes the person chose, e.g. "45" -> 45. */
export const parseMinutes = (timeAvailable: string): number | null => {
  const match = timeAvailable.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
};

const CURATED_DURATIONS = [5, 10, 15, 20, 30, 45, 60];

/**
 * Durations of the curated list, closest to the requested time first.
 * (This used to test with includes(), so "45" matched "5" and got 5-minute videos.)
 */
const mapTimeToDuration = (timeAvailable: string): string[] => {
  const minutes = parseMinutes(timeAvailable);
  if (minutes === null) {
    return ['15-minute', '10-minute', '20-minute', '30-minute'];
  }
  return [...CURATED_DURATIONS]
    // equally close: prefer the shorter one, so nobody gets more than they asked for
    .sort((a, b) => Math.abs(a - minutes) - Math.abs(b - minutes) || a - b)
    .slice(0, 3)
    .map((d) => `${d}-minute`);
};

const extractKeywords = (text: string): string[] => {
  const keywords: string[] = [];
  const lowerText = text.toLowerCase();
  
  // Hebrew keywords mapping
  if (lowerText.includes('גב') || lowerText.includes('back')) keywords.push('back pain relief');
  if (lowerText.includes('ברכיים') || lowerText.includes('knee')) keywords.push('knee friendly');
  if (lowerText.includes('צוואר') || lowerText.includes('neck')) keywords.push('neck stretch');
  if (lowerText.includes('כתפיים') || lowerText.includes('shoulder')) keywords.push('shoulder workout');
  if (lowerText.includes('בטן') || lowerText.includes('abs')) keywords.push('abs core');
  if (lowerText.includes('פלג עליון') || lowerText.includes('upper body')) keywords.push('upper body');
  if (lowerText.includes('רגליים') || lowerText.includes('legs')) keywords.push('legs workout');
  if (lowerText.includes('ללא ציוד') || lowerText.includes('no equipment')) keywords.push('no equipment');
  if (lowerText.includes('קפיצות') || lowerText.includes('no jumping') || lowerText.includes('low impact')) keywords.push('low impact');
  
  return keywords;
};

export const createSearchQueries = (
  workoutText: string,
  emotionRatings: EmotionRatings,
  timeAvailable: string,
  userConversation: string
): string[] => {
  const { energy, bounciness, alertness, lightness } = emotionRatings;
  const avgEnergy = (energy + bounciness + alertness + lightness) / 4;
  
  console.log('🎯 Creating search queries with parameters:', {
    avgEnergy: avgEnergy.toFixed(1),
    timeAvailable,
    workoutText: workoutText.substring(0, 50),
    userConversation: userConversation.substring(0, 50)
  });
  
  const queries: string[] = [];
  
  // Extract workout type from description
  const workoutTypes: string[] = [];
  const lowerWorkout = workoutText.toLowerCase();
  const lowerConversation = userConversation.toLowerCase();
  
  if (lowerWorkout.includes('yoga') || lowerConversation.includes('יוגה')) workoutTypes.push('yoga');
  if (lowerWorkout.includes('stretch') || lowerConversation.includes('מתיח') || lowerConversation.includes('stretch')) workoutTypes.push('stretching');
  if (lowerWorkout.includes('cardio') || lowerWorkout.includes('hiit') || lowerConversation.includes('קרדיו')) workoutTypes.push('cardio HIIT');
  if (lowerWorkout.includes('strength') || lowerConversation.includes('כוח')) workoutTypes.push('strength training');
  if (lowerWorkout.includes('pilates') || lowerConversation.includes('פילאטיס')) workoutTypes.push('pilates');
  if (lowerWorkout.includes('dance') || lowerConversation.includes('ריקוד')) workoutTypes.push('dance workout');
  
  // Energy level keywords with more variety
  let energyKeywords = '';
  let intensityLevel = '';
  
  if (avgEnergy >= 8) {
    energyKeywords = 'high intensity HIIT explosive power';
    intensityLevel = 'advanced';
  } else if (avgEnergy >= 6) {
    energyKeywords = 'moderate intensity cardio energizing';
    intensityLevel = 'intermediate';
  } else if (avgEnergy >= 4) {
    energyKeywords = 'gentle flow moderate easy';
    intensityLevel = 'beginner';
  } else {
    energyKeywords = 'relaxing calm restorative gentle';
    intensityLevel = 'restorative';
  }
  
  // Add randomization to query order and content
  const randomSeed = Math.floor(Math.random() * 3);
  // Say the length in words YouTube titles use: "45 minute", not a bare "45"
  const minutes = parseMinutes(timeAvailable);
  const timeAvailableText = minutes !== null ? `${minutes} minute` : timeAvailable;
  const timeVariations = minutes !== null ? [`${minutes} minute`, `${minutes} min`] : [timeAvailable];
  
  // Most specific search (includes workout type, energy, and time)
  if (workoutTypes.length > 0) {
    queries.push(`${workoutTypes[0]} ${energyKeywords} ${timeVariations[randomSeed % timeVariations.length]} workout`);
    if (workoutTypes.length > 1) {
      queries.push(`${workoutTypes[1]} ${intensityLevel} ${timeAvailableText} exercise`);
    }
  }
  
  // Energy-based searches with variations
  queries.push(`${energyKeywords} ${timeAvailableText} fitness workout exercise`);
  queries.push(`${intensityLevel} ${timeAvailableText} home workout routine`);
  
  // Add user-specific terms if available
  if (userConversation.trim()) {
    const conversationKeywords = extractKeywords(userConversation);
    if (conversationKeywords.length > 0) {
      queries.push(`${conversationKeywords.join(' ')} ${energyKeywords} ${timeAvailableText} workout`);
    }
  }
  
  // General search with rotation
  const generalTerms = ['fitness', 'exercise', 'workout', 'training'];
  queries.push(`${generalTerms[randomSeed % generalTerms.length]} ${timeAvailableText} ${intensityLevel}`);
  
  console.log('🔍 Generated search queries:', queries);
  return queries;
};

export { mapTimeToDuration };
