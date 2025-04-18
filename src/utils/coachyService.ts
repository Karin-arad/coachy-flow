
/**
 * Utility service for communicating with the Coachy API
 */

// משתנה לבדיקה האם השרת זמין כרגע
let isServerAvailable = true; // מתחיל כזמין בהנחה שהכל תקין
let lastServerCheckTime = 0;
const SERVER_CHECK_INTERVAL = 60000; // בדיקה פעם בדקה לכל היותר

/**
 * בדיקה האם השרת זמין כעת
 * @returns הבטחה שמתרגמת לבוליאני המציין האם השרת זמין
 */
export const isCoachyServerAvailable = async (): Promise<boolean> => {
  const now = Date.now();
  
  // אם כבר נבדק לאחרונה, נחזיר את הערך המאוחסן
  if (now - lastServerCheckTime < SERVER_CHECK_INTERVAL) {
    return isServerAvailable;
  }
  
  try {
    const response = await fetch('https://coachylovable.karinzahav.repl.co/health', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // הגדרת טיימאאוט קצר לבדיקת זמינות
      signal: AbortSignal.timeout(5000),
    });
    
    isServerAvailable = response.ok;
    lastServerCheckTime = now;
    console.log('🔄 Server availability check:', isServerAvailable ? 'Online' : 'Offline');
    return isServerAvailable;
  } catch (error) {
    console.warn('⚠️ Server connection check failed:', error);
    isServerAvailable = false;
    lastServerCheckTime = now;
    return false;
  }
};

/**
 * Send a question to the Coachy AI and get a response
 * 
 * @param question The user's question/message
 * @returns The AI's response message
 */
export const askCoachyAI = async (question: string): Promise<string> => {
  console.log('🔵 Sending question to Coachy API:', question);
  console.log('🌐 API URL:', 'https://coachylovable.karinzahav.repl.co/ask');
  
  // בדיקת זמינות השרת לפני שליחת השאלה
  const serverAvailable = await isCoachyServerAvailable();
  if (!serverAvailable) {
    console.error('⛔ Server is currently offline or unreachable');
    throw new Error('השרת אינו זמין כרגע. אנא נסה שוב מאוחר יותר.');
  }
  
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
      // הגדרת טיימאאוט ארוך יותר לשאלה עצמה
      signal: AbortSignal.timeout(15000),
    });
    
    console.log('📡 Raw response:', response);
    
    if (!response.ok) {
      console.error('⛔ Server error:', response.status, response.statusText);
      if (response.status === 503 || response.status === 429) {
        throw new Error('השרת עמוס ברגע זה, אנא נסה שוב בעוד מספר דקות.');
      }
      throw new Error(`שגיאה בתקשורת עם השרת: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Received response data from Coachy API:', data);
    
    if (!data.answer) {
      console.error('❌ Server response missing answer field:', data);
      throw new Error('התקבלה תשובה לא תקינה מהשרת.');
    }
    
    return data.answer;
  } catch (error) {
    console.error('❌ Error communicating with Coachy API:', error);
    
    // בדיקה אם הבעיה היא בטיימאאוט
    if (error.name === 'AbortError' || error.name === 'TimeoutError') {
      throw new Error('השרת לא הגיב בזמן סביר. אנא נסה שוב מאוחר יותר.');
    }
    
    throw new Error('לא ניתן להתחבר לשירות הבינה המלאכותית כרגע. אנא נסה שוב מאוחר יותר.');
  }
};
