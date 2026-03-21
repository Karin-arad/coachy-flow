import { QuizQuestion } from '@/types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'emotionalState',
    titleHe: 'מה הכי נכון עכשיו?',
    titleEn: 'What feels most true right now?',
    options: [
      { value: 'noisy-head', labelHe: 'הראש רועש', labelEn: 'My head is noisy' },
      { value: 'stuck', labelHe: 'תקוע/ה', labelEn: 'I feel stuck' },
      { value: 'bored', labelHe: 'משעמם', labelEn: 'I am bored' },
      { value: 'creative', labelHe: 'רוצה משהו יצירתי', labelEn: 'I want something creative' },
      { value: 'emotionally-tangled', labelHe: 'מסובך רגשית', labelEn: 'I feel emotionally tangled' },
    ],
  },
  {
    id: 'desiredMode',
    titleHe: 'מה רוצים יותר עכשיו?',
    titleEn: 'What do you want more right now?',
    options: [
      { value: 'understand', labelHe: 'להבין', labelEn: 'To understand' },
      { value: 'play', labelHe: 'לשחק', labelEn: 'To play' },
      { value: 'move', labelHe: 'לזוז', labelEn: 'To move' },
      { value: 'write', labelHe: 'לכתוב', labelEn: 'To write' },
      { value: 'unstuck-quickly', labelHe: 'להתפרק מהר', labelEn: 'To get unstuck quickly' },
    ],
  },
  {
    id: 'energyLevel',
    titleHe: 'כמה אנרגיה יש עכשיו?',
    titleEn: 'How much energy do you have?',
    options: [
      { value: 'very-low', labelHe: 'מאוד נמוכה', labelEn: 'Very low' },
      { value: 'medium', labelHe: 'בינונית', labelEn: 'Medium' },
      { value: 'high', labelHe: 'גבוהה', labelEn: 'High' },
    ],
  },
  {
    id: 'helpType',
    titleHe: 'מה נשמע הכי מועיל עכשיו?',
    titleEn: 'What sounds most helpful right now?',
    options: [
      { value: 'sharp-questions', labelHe: 'שאלות חדות', labelEn: 'Sharp questions' },
      { value: 'tool', labelHe: 'כלי', labelEn: 'A tool' },
      { value: 'game', labelHe: 'משחק', labelEn: 'A game' },
      { value: 'small-push', labelHe: 'דחיפה קטנה', labelEn: 'A small push' },
      { value: 'creative-direction', labelHe: 'כיוון יצירתי', labelEn: 'A creative direction' },
    ],
  },
  {
    id: 'avoiding',
    titleHe: 'ממה הכי נמנעים?',
    titleEn: 'What are you avoiding most?',
    optional: true,
    options: [
      { value: 'thinking-honestly', labelHe: 'לחשוב בכנות', labelEn: 'Thinking honestly' },
      { value: 'starting', labelHe: 'להתחיל', labelEn: 'Starting' },
      { value: 'finishing', labelHe: 'לסיים', labelEn: 'Finishing' },
      { value: 'slowing-down', labelHe: 'להאט', labelEn: 'Slowing down' },
      { value: 'feeling-truth', labelHe: 'להרגיש מה באמת קורה', labelEn: 'Feeling what is actually going on' },
    ],
  },
];
