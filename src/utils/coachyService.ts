
/**
 * Utility service for communicating with the Coachy API
 */

/**
 * Send a question to the Coachy AI and get a response
 * 
 * @param question The user's question/message
 * @returns The AI's response message
 */
export const askCoachyAI = async (question: string): Promise<string> => {
  console.log('🔵 Sending question to Coachy API:', question);
  console.log('🌐 API URL:', 'https://coachylovable.karinzahav.repl.co/ask');
  
  try {
    console.log('📡 Preparing request with question:', question);
    const response = await fetch('https://coachylovable.karinzahav.repl.co/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question
      }),
    });
    
    console.log('📡 Raw response:', response);
    
    if (!response.ok) {
      console.error('⛔ Server error:', response.status, response.statusText);
      throw new Error(`שגיאה בתקשורת עם השרת: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Received response data from Coachy API:', data);
    return data.answer;
  } catch (error) {
    console.error('❌ Error communicating with Coachy API:', error);
    throw new Error('לא ניתן להתחבר לשירות הבינה המלאכותית כרגע. אנא נסה שוב מאוחר יותר.');
  }
};
