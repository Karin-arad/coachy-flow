
/**
 * Utility functions for handling user input
 */

/**
 * Sanitizes user input by removing potentially unsafe characters
 * @param input The raw user input string
 * @returns Sanitized string
 */
export const sanitizeUserInput = (input: string): string => {
  if (!input) return '';
  
  // Remove emojis
  const noEmojis = input.replace(/[\u{1F600}-\u{1F64F}|\u{1F300}-\u{1F5FF}|\u{1F680}-\u{1F6FF}|\u{2600}-\u{26FF}|\u{2700}-\u{27BF}|\u{1F900}-\u{1F9FF}|\u{1F1E0}-\u{1F1FF}|\u{1F700}-\u{1F77F}|\u{1F780}-\u{1F7FF}|\u{1F800}-\u{1F8FF}|\u{1F900}-\u{1F9FF}|\u{1FA00}-\u{1FA6F}|\u{1FA70}-\u{1FAFF}]/gu, '');
  
  // Remove HTML tags
  const noHtml = noEmojis.replace(/<[^>]*>?/gm, '');
  
  // Remove or replace other potentially problematic characters
  const sanitized = noHtml
    .replace(/[^\w\s.,;:!?'"-]/g, '') // Keep only alphanumeric and common punctuation
    .trim();
  
  return sanitized;
};

/**
 * Creates a workout request prompt based on user inputs
 * @param emotionRatings User's emotional ratings from sliders
 * @param workoutPreferences User's additional workout preferences
 * @returns A formatted prompt string for the AI
 */
export const createWorkoutRequestPrompt = (
  emotionRatings: {
    energy: number;
    bounciness: number;
    alertness: number;
    lightness: number;
  },
  workoutPreferences?: string,
  timeAvailable?: string
): string => {
  // Format emotion ratings into human-readable descriptions
  const energyLevel = emotionRatings.energy > 7 ? "high energy" : 
                      emotionRatings.energy > 4 ? "moderate energy" : "low energy";
  
  const bouncinessLevel = emotionRatings.bounciness > 7 ? "very bouncy and active" : 
                          emotionRatings.bounciness > 4 ? "moderately bouncy" : "not bouncy, preferring calm movements";
  
  const alertnessLevel = emotionRatings.alertness > 7 ? "very alert and focused" : 
                         emotionRatings.alertness > 4 ? "moderately alert" : "tired and unfocused";
  
  const lightnessLevel = emotionRatings.lightness > 7 ? "feeling very light and flexible" : 
                         emotionRatings.lightness > 4 ? "moderately light" : "feeling heavy and stiff";

  // Construct the prompt following the new format
  let prompt = `You are Quiz – a smart, supportive fitness assistant that recommends YouTube workouts based on the user's physical, emotional and practical needs.

User's current state:
- Mood/Bounciness: ${bouncinessLevel}
- Energy level: ${energyLevel}
- Focus/Alertness: ${alertnessLevel}
- Physical feeling: ${lightnessLevel}`;
  
  // Add time available if provided
  if (timeAvailable) {
    prompt += `\n- Available time: ${timeAvailable}`;
  }
  
  // Add workout preferences if provided
  if (workoutPreferences && workoutPreferences.trim() !== '') {
    const sanitizedPreferences = sanitizeUserInput(workoutPreferences);
    prompt += `\n- Special request/limitation: ${sanitizedPreferences}`;
  }
  
  // Add the specific response instructions
  prompt += `

💡 Very important:
Do NOT default to yoga or stretching unless the input clearly asks for calm or softness.
Instead, explore a wide variety of workout styles, including: strength training, mobility, dance workouts, cardio, pilates, tai chi, HIIT, low-impact routines, and energizing drills.

🎯 Your response should be:
- Short (2–3 lines max)
- Clearly stating the recommended workout type
- Mentioning why this style fits the user's current state
- Including emotional tone if relevant (e.g. "This will help boost your mood without draining your energy")

Return only one suggestion. Do not offer a list.`;
  
  return prompt;
};
