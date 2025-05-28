
import { EmotionRatings } from '../types/video';

// Map time strings to duration categories for better matching
const mapTimeToDuration = (timeAvailable: string): string[] => {
  const lowerTime = timeAvailable.toLowerCase();
  
  // Return array of durations in order of preference
  if (lowerTime.includes('5') || lowerTime.includes('חמש')) {
    return ['5-minute', '10-minute', '15-minute'];
  } else if (lowerTime.includes('10') || lowerTime.includes('עשר')) {
    return ['10-minute', '5-minute', '15-minute'];
  } else if (lowerTime.includes('15') || lowerTime.includes('חמש עשרה')) {
    return ['15-minute', '10-minute', '20-minute'];
  } else if (lowerTime.includes('20') || lowerTime.includes('עשרים')) {
    return ['20-minute', '15-minute', '30-minute'];
  } else if (lowerTime.includes('30') || lowerTime.includes('שלושים')) {
    return ['30-minute', '20-minute', '45-minute'];
  } else if (lowerTime.includes('45') || lowerTime.includes('ארבעים וחמש')) {
    return ['45-minute', '30-minute', '60-minute'];
  } else if (lowerTime.includes('60') || lowerTime.includes('שישים') || lowerTime.includes('שעה')) {
    return ['60-minute', '45-minute', '30-minute'];
  }
  
  // Default fallback for unrecognized time formats
  return ['15-minute', '10-minute', '20-minute', '30-minute'];
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
  if (lowerWorkout.includes('stretch') || lowerConversation.includes('מתיחה')) workoutTypes.push('stretching');
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
  const timeVariations = [timeAvailable, timeAvailable.replace('דקות', 'minute'), timeAvailable.replace('דקה', 'min')];
  
  // Most specific search (includes workout type, energy, and time)
  if (workoutTypes.length > 0) {
    queries.push(`${workoutTypes[0]} ${energyKeywords} ${timeVariations[randomSeed % timeVariations.length]} workout`);
    if (workoutTypes.length > 1) {
      queries.push(`${workoutTypes[1]} ${intensityLevel} ${timeAvailable} exercise`);
    }
  }
  
  // Energy-based searches with variations
  queries.push(`${energyKeywords} ${timeAvailable} fitness workout exercise`);
  queries.push(`${intensityLevel} ${timeAvailable} home workout routine`);
  
  // Add user-specific terms if available
  if (userConversation.trim()) {
    const conversationKeywords = extractKeywords(userConversation);
    if (conversationKeywords.length > 0) {
      queries.push(`${conversationKeywords.join(' ')} ${energyKeywords} ${timeAvailable} workout`);
    }
  }
  
  // General search with rotation
  const generalTerms = ['fitness', 'exercise', 'workout', 'training'];
  queries.push(`${generalTerms[randomSeed % generalTerms.length]} ${timeAvailable} ${intensityLevel}`);
  
  console.log('🔍 Generated search queries:', queries);
  return queries;
};

export { mapTimeToDuration };
