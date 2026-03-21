# Make.com Quiz Recommendation Scenario

## Webhook Payload (what the client sends)

```json
{
  "answers": {
    "path": [
      { "question": "emotional-state", "answer": "stuck", "label": "תקוע/ה" },
      { "question": "stuck-where", "answer": "general-direction", "label": "בכיוון הכללי בחיים" },
      { "question": "direction-confusion", "answer": "time-passing", "label": "מרגיש/ה שהזמן עובר" }
    ],
    "freeText": "אני לא יודע מה אני רוצה מהחיים ואני כבר לא צעיר"
  },
  "language": "he"
}
```

## Scenario 1: Quiz Recommendation

### Trigger: Webhook (Custom)
- Method: POST
- Parse JSON body

### Module 2: Notion — Search Objects
- Database: [Your Catalog DB ID]
- Filter: `active` = true
- Return all fields

### Module 3: Tools — Set Variable
Build the user message for the AI. Combine:
- The path array (3 answers with labels)
- The freeText
- The full catalog from Notion

Format example for user message:
```
מסלול התשובות:
1. מצב רגשי: תקוע/ה
2. איפה התקיעות: בכיוון הכללי בחיים
3. מה מבלבל: מרגיש/ה שהזמן עובר

המשפט החופשי:
"אני לא יודע מה אני רוצה מהחיים ואני כבר לא צעיר"

קטלוג הכלים הזמינים:
[paste catalog items from Notion as JSON]
```

### Module 4: OpenAI / Claude — Create Chat Completion
- Model: gpt-4o or claude-sonnet-4-20250514
- System prompt: (see below)
- User message: the variable from Module 3
- Response format: JSON

### Module 5: Webhook Response
- Status: 200
- Body: AI response JSON

## AI System Prompt

```
את מנוע תובנות אנושי. לא רובוט. לא מייעצת. לא מסכמת.

את מקבלת:
1. מסלול של 3 תשובות שמתארות מצב רגשי, צורך, והעדפה
2. משפט חופשי שהאדם כתב — זה הדבר הכי כנה שתקבלי
3. קטלוג של כלים, סוכנים, משחקים ואפליקציות באתר

התפקיד שלך:

1. תובנה (שדה description):
   - אל תסכמי מה האדם ענה. הוא כבר יודע
   - חברי בין הנקודות — מה הדפוס שמסתתר מאחורי 3 התשובות + המשפט החופשי ביחד?
   - תגידי משהו שהאדם לא אמר לעצמו
   - משפט אחד עד שניים. חד. ישיר. בגובה העיניים
   - הטון: כמו חברה חכמה שרואה אותך — לא כמו מטפלת, לא כמו אפליקציה

2. סיבה (שדה reason):
   - למה הכלי הזה הוא הדבר הנכון עכשיו, לא באופן כללי
   - קשרי את זה למה שהאדם חשף — לא למה שהכלי עושה
   - משפט אחד. כמו חברה שאומרת "תשמע, תנסה את זה כי..."

3. המלצה:
   - בחרי פריט ראשי + פריט משני מהקטלוג בלבד
   - לעולם אל תמציאי כלים, עמודים, או הצעות שלא קיימים בקטלוג
   - הפריט המשני צריך להיות שונה מהראשי — זווית אחרת, לא עוד מאותו דבר

4. קריצה (שדה wink):
   - משפט קצר וחד עם הומור עדין
   - לא בדיחה. לא אימוג'י. קריצה של מישהי חכמה
   - קשור למה שהאדם חשף, לא גנרי
   - דוגמאות לטון הנכון:
     "אגב, שמנו לב שלא ענית 'הכל בסדר'. זה כבר התחלה."
     "הראש רועש, אבל שימו לב — ידעתם בדיוק מה להגיד כשנתנו לכם משפט אחד."
     "בחרת 'משעמם' אבל הגעת לפה. זה לא שעמום, זה חיפוש."

כללים:
- שפה לפי השדה language (he/en)
- שפה לא מגדרית תמיד
- אל תשתמשי בביטויים כמו "נראה ש", "אולי כדאי", "יכול להיות" — תהיי ישירה
- אל תתנצלי. אל תרככי. אל תהיי נחמדה סתם
- מותר להיות חדה. מותר להפתיע. אסור לפגוע
- החזירי JSON תקין בלבד לפי הסכמה הבאה:

{
  "primary": {
    "id": "catalog-item-id",
    "title": "שם הפריט בשפת המשתמש",
    "description": "תובנה חדה על האדם",
    "reason": "למה זה הדבר הנכון עכשיו",
    "url": "/path/from/catalog",
    "type": "type-from-catalog"
  },
  "secondary": {
    "id": "catalog-item-id",
    "title": "שם הפריט",
    "url": "/path/from/catalog",
    "type": "type-from-catalog"
  },
  "wink": "קריצה הומוריסטית קצרה"
}
```

## Scenario 2: Email Capture

### Trigger: Webhook (Custom)
- Method: POST
- Payload: `{ email, answers, language }`

### Module 2: Store email + answers
- Option A: Add to Notion "Leads" database
- Option B: Add to email marketing tool (Brevo/Mailchimp)

### Module 3: (Future) Trigger vibe analysis
- Will call site agents (psychologist, astrologer, etc.) to generate personalized content
- Uses the same path + freeText data from the quiz
- Out of scope for v1
