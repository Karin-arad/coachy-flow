import { QuizNode } from '@/types/quiz';

export const quizTree: QuizNode = {
  id: 'emotional-state',
  titleHe: 'מה הכי נכון עכשיו?',
  titleEn: 'What feels most true right now?',
  options: [
    // ── ענף 1: הראש רועש ──
    {
      value: 'noisy-head',
      labelHe: 'הראש רועש',
      labelEn: 'My head is noisy',
      next: {
        id: 'noisy-head-help',
        titleHe: 'מה הכי יעזור עכשיו?',
        titleEn: 'What would help most right now?',
        options: [
          {
            value: 'move-release',
            labelHe: 'לזוז ולשחרר אנרגיה',
            labelEn: 'Move and release energy',
            next: {
              id: 'move-time',
              titleHe: 'כמה זמן יש לך?',
              titleEn: 'How much time do you have?',
              options: [
                { value: '5min', labelHe: '5 דקות', labelEn: '5 minutes' },
                { value: '15min', labelHe: '15 דקות', labelEn: '15 minutes' },
                { value: '30min-plus', labelHe: 'חצי שעה+', labelEn: '30 minutes+' },
              ],
            },
          },
          {
            value: 'sharp-questions',
            labelHe: 'שמישהו ישאל אותי שאלות חדות',
            labelEn: 'Someone to ask me sharp questions',
            next: {
              id: 'noise-topic',
              titleHe: 'על מה הרעש?',
              titleEn: 'What is the noise about?',
              options: [
                { value: 'work', labelHe: 'עבודה', labelEn: 'Work' },
                { value: 'relationships', labelHe: 'יחסים', labelEn: 'Relationships' },
                { value: 'future', labelHe: 'עתיד', labelEn: 'The future' },
                { value: 'everything', labelHe: 'הכל ביחד', labelEn: 'Everything together' },
              ],
            },
          },
          {
            value: 'focus',
            labelHe: 'לעשות משהו שידרוש ריכוז',
            labelEn: 'Do something that requires focus',
            next: {
              id: 'focus-type',
              titleHe: 'מה מושך אותך?',
              titleEn: 'What draws you?',
              options: [
                { value: 'game', labelHe: 'משחק', labelEn: 'A game' },
                { value: 'writing', labelHe: 'כתיבה', labelEn: 'Writing' },
                { value: 'building', labelHe: 'בנייה של משהו', labelEn: 'Building something' },
              ],
            },
          },
          {
            value: 'breathe',
            labelHe: 'פשוט לנשום ולהרגע',
            labelEn: 'Just breathe and relax',
            next: {
              id: 'stress-level',
              titleHe: 'מה רמת הלחץ?',
              titleEn: 'What is the stress level?',
              options: [
                { value: 'very-high', labelHe: 'גבוה מאוד', labelEn: 'Very high' },
                { value: 'medium', labelHe: 'בינוני', labelEn: 'Medium' },
                { value: 'background', labelHe: 'סתם עומס רקע', labelEn: 'Just background noise' },
              ],
            },
          },
        ],
      },
    },

    // ── ענף 2: תקוע/ה ──
    {
      value: 'stuck',
      labelHe: 'תקוע/ה',
      labelEn: 'I feel stuck',
      next: {
        id: 'stuck-where',
        titleHe: 'איפה התקיעות?',
        titleEn: 'Where is the stuckness?',
        options: [
          {
            value: 'specific-decision',
            labelHe: 'בהחלטה ספציפית',
            labelEn: 'In a specific decision',
            next: {
              id: 'decision-block',
              titleHe: 'מה מונע ממך להחליט?',
              titleEn: 'What is preventing you from deciding?',
              options: [
                { value: 'fear-mistake', labelHe: 'פחד לטעות', labelEn: 'Fear of making a mistake' },
                { value: 'too-many-options', labelHe: 'יותר מדי אפשרויות', labelEn: 'Too many options' },
                { value: 'missing-info', labelHe: 'חסר מידע', labelEn: 'Missing information' },
              ],
            },
          },
          {
            value: 'general-direction',
            labelHe: 'בכיוון הכללי בחיים',
            labelEn: 'In the general direction of life',
            next: {
              id: 'direction-confusion',
              titleHe: 'מה הכי מבלבל?',
              titleEn: 'What is most confusing?',
              options: [
                { value: 'dont-know-want', labelHe: 'לא יודע/ת מה רוצה', labelEn: "Don't know what I want" },
                { value: 'know-but-dont-do', labelHe: 'יודע/ת אבל לא עושה', labelEn: 'Know but not doing' },
                { value: 'time-passing', labelHe: 'מרגיש/ה שהזמן עובר', labelEn: 'Feeling time is passing' },
              ],
            },
          },
          {
            value: 'stuck-emotion',
            labelHe: 'ברגש שלא זז',
            labelEn: 'In an emotion that won\'t move',
            next: {
              id: 'which-emotion',
              titleHe: 'מה הרגש?',
              titleEn: 'What is the emotion?',
              options: [
                { value: 'sadness', labelHe: 'עצב', labelEn: 'Sadness' },
                { value: 'anger', labelHe: 'כעס', labelEn: 'Anger' },
                { value: 'disappointment', labelHe: 'אכזבה', labelEn: 'Disappointment' },
                { value: 'unknown-feeling', labelHe: 'לא יודע/ת מה זה', labelEn: "Don't know what it is" },
              ],
            },
          },
          {
            value: 'no-motivation',
            labelHe: 'במוטיבציה — אין כוח להתחיל',
            labelEn: 'In motivation — no energy to start',
            next: {
              id: 'motivation-root',
              titleHe: 'מה הכי קרוב?',
              titleEn: 'What is closest?',
              options: [
                { value: 'burnout', labelHe: 'שחיקה', labelEn: 'Burnout' },
                { value: 'fear-failure', labelHe: 'פחד מכישלון', labelEn: 'Fear of failure' },
                { value: 'no-point', labelHe: 'לא רואה טעם', labelEn: "Don't see the point" },
                { value: 'physical-tired', labelHe: 'עייפות פיזית', labelEn: 'Physical tiredness' },
              ],
            },
          },
        ],
      },
    },

    // ── ענף 3: משעמם ──
    {
      value: 'bored',
      labelHe: 'משעמם',
      labelEn: 'I am bored',
      next: {
        id: 'boredom-type',
        titleHe: 'איזה שעמום זה?',
        titleEn: 'What kind of boredom is this?',
        options: [
          {
            value: 'need-stimulation',
            labelHe: 'חסר גירוי — רוצה משהו שיזיז',
            labelEn: 'Need stimulation — want something to move me',
            next: {
              id: 'stimulation-type',
              titleHe: 'מה סוג הגירוי שמחפש?',
              titleEn: 'What kind of stimulation?',
              options: [
                { value: 'physical', labelHe: 'פיזי', labelEn: 'Physical' },
                { value: 'mental', labelHe: 'מנטלי', labelEn: 'Mental' },
                { value: 'social', labelHe: 'חברתי', labelEn: 'Social' },
              ],
            },
          },
          {
            value: 'need-challenge',
            labelHe: 'חסר אתגר — הכל קל מדי',
            labelEn: 'Need challenge — everything is too easy',
            next: {
              id: 'challenge-area',
              titleHe: 'איפה רוצה אתגר?',
              titleEn: 'Where do you want a challenge?',
              options: [
                { value: 'game', labelHe: 'משחק', labelEn: 'A game' },
                { value: 'thinking', labelHe: 'חשיבה', labelEn: 'Thinking' },
                { value: 'creation', labelHe: 'יצירה', labelEn: 'Creation' },
              ],
            },
          },
          {
            value: 'need-surprise',
            labelHe: 'חסר הפתעה — הכל צפוי',
            labelEn: 'Need surprise — everything is predictable',
            next: {
              id: 'surprise-pref',
              titleHe: 'מה תעדיף?',
              titleEn: 'What would you prefer?',
              options: [
                { value: 'random', labelHe: 'משהו אקראי לגמרי', labelEn: 'Something completely random' },
                { value: 'unexpected-question', labelHe: 'שאלה שלא ציפיתי לה', labelEn: 'A question I didn\'t expect' },
                { value: 'new-experience', labelHe: 'חוויה חדשה', labelEn: 'A new experience' },
              ],
            },
          },
          {
            value: 'need-meaning',
            labelHe: 'חסר משמעות — עושה דברים אבל לא מרגיש כלום',
            labelEn: 'Need meaning — doing things but feeling nothing',
            next: {
              id: 'meaning-need',
              titleHe: 'מה הכי נכון?',
              titleEn: 'What feels most true?',
              options: [
                { value: 'understand-why', labelHe: 'רוצה להבין למה', labelEn: 'Want to understand why' },
                { value: 'do-something-meaningful', labelHe: 'רוצה לעשות משהו שמשנה', labelEn: 'Want to do something that matters' },
                { value: 'talk-about-it', labelHe: 'רוצה לדבר על זה עם מישהו', labelEn: 'Want to talk about it with someone' },
              ],
            },
          },
        ],
      },
    },

    // ── ענף 4: רוצה משהו יצירתי ──
    {
      value: 'creative',
      labelHe: 'רוצה משהו יצירתי',
      labelEn: 'I want something creative',
      next: {
        id: 'creativity-type',
        titleHe: 'איזה סוג יצירתיות?',
        titleEn: 'What kind of creativity?',
        options: [
          {
            value: 'write',
            labelHe: 'לכתוב — מילים, מחשבות, סיפורים',
            labelEn: 'Write — words, thoughts, stories',
            next: {
              id: 'writing-style',
              titleHe: 'מה מושך יותר?',
              titleEn: 'What draws you more?',
              options: [
                { value: 'free-writing', labelHe: 'כתיבה חופשית', labelEn: 'Free writing' },
                { value: 'guided-writing', labelHe: 'כתיבה מונחית עם שאלות', labelEn: 'Guided writing with prompts' },
                { value: 'personal-writing', labelHe: 'כתיבה על משהו אישי', labelEn: 'Writing about something personal' },
              ],
            },
          },
          {
            value: 'think-different',
            labelHe: 'לחשוב אחרת — לשבור דפוסים',
            labelEn: 'Think differently — break patterns',
            next: {
              id: 'thinking-mode',
              titleHe: 'מה מתאים עכשיו?',
              titleEn: 'What fits right now?',
              options: [
                { value: 'new-perspective', labelHe: 'פרספקטיבה חדשה על בעיה קיימת', labelEn: 'New perspective on an existing problem' },
                { value: 'philosophical', labelHe: 'שאלה פילוסופית', labelEn: 'A philosophical question' },
                { value: 'creative-exercise', labelHe: 'תרגיל חשיבה יצירתית', labelEn: 'A creative thinking exercise' },
              ],
            },
          },
          {
            value: 'play',
            labelHe: 'לשחק — משהו קליל ומפתיע',
            labelEn: 'Play — something light and surprising',
            next: {
              id: 'play-vibe',
              titleHe: 'מה הווייב?',
              titleEn: 'What is the vibe?',
              options: [
                { value: 'fast-chaotic', labelHe: 'מהיר וכאוטי', labelEn: 'Fast and chaotic' },
                { value: 'smart-quiet', labelHe: 'חכם ושקט', labelEn: 'Smart and quiet' },
                { value: 'funny-absurd', labelHe: 'מצחיק ואבסורדי', labelEn: 'Funny and absurd' },
              ],
            },
          },
          {
            value: 'build',
            labelHe: 'לבנות משהו — פרויקט, רעיון, תוכנית',
            labelEn: 'Build something — project, idea, plan',
            next: {
              id: 'build-stage',
              titleHe: 'באיזה שלב?',
              titleEn: 'At what stage?',
              options: [
                { value: 'have-idea-stuck', labelHe: 'יש רעיון אבל תקוע', labelEn: 'Have an idea but stuck' },
                { value: 'need-inspiration', labelHe: 'אין רעיון, רוצה השראה', labelEn: 'No idea, want inspiration' },
                { value: 'have-project-need-push', labelHe: 'יש פרויקט, צריך דחיפה', labelEn: 'Have a project, need a push' },
              ],
            },
          },
        ],
      },
    },

    // ── ענף 5: מסובך רגשית ──
    {
      value: 'emotionally-tangled',
      labelHe: 'מסובך רגשית',
      labelEn: 'I feel emotionally tangled',
      next: {
        id: 'emotional-area',
        titleHe: 'מה הכי קרוב?',
        titleEn: 'What is closest?',
        options: [
          {
            value: 'relationships',
            labelHe: 'יחסים — משהו בין אנשים',
            labelEn: 'Relationships — something between people',
            next: {
              id: 'relationship-need',
              titleHe: 'מה הכי נכון?',
              titleEn: 'What feels most true?',
              options: [
                { value: 'understand-other', labelHe: 'רוצה להבין את הצד השני', labelEn: 'Want to understand the other side' },
                { value: 'understand-self', labelHe: 'רוצה להבין את עצמי', labelEn: 'Want to understand myself' },
                { value: 'want-change-afraid', labelHe: 'רוצה לעשות שינוי אבל מפחד/ת', labelEn: 'Want to make a change but afraid' },
              ],
            },
          },
          {
            value: 'work-career',
            labelHe: 'עבודה / קריירה',
            labelEn: 'Work / career',
            next: {
              id: 'work-issue',
              titleHe: 'מה הכי מציק?',
              titleEn: 'What bothers you most?',
              options: [
                { value: 'wrong-place', labelHe: 'לא במקום הנכון', labelEn: 'Not in the right place' },
                { value: 'conflict', labelHe: 'קונפליקט עם מישהו', labelEn: 'Conflict with someone' },
                { value: 'undervalued', labelHe: 'חוסר הערכה', labelEn: 'Feeling undervalued' },
                { value: 'work-burnout', labelHe: 'שחיקה', labelEn: 'Burnout' },
              ],
            },
          },
          {
            value: 'heaviness',
            labelHe: 'תחושה כללית של כבדות',
            labelEn: 'A general feeling of heaviness',
            next: {
              id: 'heaviness-help',
              titleHe: 'מה יעזור יותר?',
              titleEn: 'What would help more?',
              options: [
                { value: 'talk', labelHe: 'לדבר על זה', labelEn: 'Talk about it' },
                { value: 'distract', labelHe: 'להסיח את הדעת', labelEn: 'Get distracted' },
                { value: 'something-small-good', labelHe: 'לעשות משהו קטן וטוב לעצמי', labelEn: 'Do something small and good for myself' },
              ],
            },
          },
          {
            value: 'specific-thing',
            labelHe: 'משהו ספציפי שלא מצליח לשחרר',
            labelEn: 'Something specific I can\'t let go of',
            next: {
              id: 'specific-approach',
              titleHe: 'מה מתאים?',
              titleEn: 'What fits?',
              options: [
                { value: 'sharp-questions-break', labelHe: 'שאלות חדות שיעזרו לפרק את זה', labelEn: 'Sharp questions to break it apart' },
                { value: 'quiet-space', labelHe: 'מרחב שקט לחשוב', labelEn: 'Quiet space to think' },
                { value: 'see-differently', labelHe: 'כלי שיעזור לראות את זה אחרת', labelEn: 'A tool to see it differently' },
              ],
            },
          },
        ],
      },
    },
  ],
};
