# AI Quiz Router — Design Spec

## Overview

An interactive quiz that routes visitors to the most relevant destination on the site based on their emotional state, intent, and energy level. The experience is fast, intuitive, and feels like a conversation with someone who sees you — not a personality test.

## Product Goals

1. Strong on-site experience — everything happens inside the website
2. Dynamic catalog — items managed in Notion, no code changes needed to add destinations
3. AI-powered matching — a real agent with a prompt that feels alive and human
4. Bilingual — Hebrew and English, gender-neutral language throughout
5. Lead generation (v1) — optional email capture after result with "your vibe today" hook

## Architecture

### Stack

- **Frontend:** Vite + React SPA (existing project)
- **Backend/API:** Make.com webhook scenario
- **Data source:** Notion database (catalog of site destinations)
- **AI:** Claude or GPT (decided in Make scenario configuration)
- **Lead gen:** Make scenario sends "your vibe today" email using site agents (psychologist, astrologer, etc.)

### Flow

```
User visits /discover
  → Answers 4-5 bubble questions on dark background
  → Client POSTs answers to Make webhook
    → Make queries Notion DB (active items only)
    → Make builds prompt: answers + catalog + tone instructions
    → Make calls AI → receives JSON response
    → Make returns recommendation to client
  → Client shows result card with primary + secondary recommendation
  → (Optional) User leaves email → separate Make scenario sends "vibe analysis"
```

### File Structure (new files)

```
src/
  components/quiz/
    QuizFlow.tsx          — Main quiz flow (questions → loading → result)
    QuizQuestion.tsx      — Single question component (bubble style)
    QuizResultCard.tsx    — Vibe result card with two recommendations
    QuizLoading.tsx       — Mysterious loading animation
    QuizEmailCapture.tsx  — Optional email field after result
  pages/
    DiscoverPage.tsx      — The /discover route
  data/
    quizQuestions.ts      — Questions and answers (Hebrew + English)
  utils/
    recommendService.ts   — POST to Make webhook, parse response
  types/
    quiz.ts               — Types for quiz, catalog, and result
```

## UI Design

### Quiz Questions — Dark Bubbles

- Dark gradient background (#1a1a2e → #16213e)
- Questions centered with warm accent color (#FFD6A5)
- Answers as floating bubbles with orange tint borders
- Single-select: tap a bubble → advance to next question
- Progress dots at bottom (filled = answered)
- RTL support, Rubik/Heebo fonts
- Gender-neutral language throughout

### Result Card — Vibe Card with Two Options

- Same dark background
- Card with subtle orange border containing:
  - "הוויב שלך עכשיו" / "Your vibe right now" label
  - AI-generated sharp insight (2 lines max)
  - Short explanation
- Primary recommendation: prominent orange button with destination name
- Secondary recommendation: subtle outlined button below
- Both resolve to real site URLs from the catalog

### Loading Animation — Minimal Mystery

- Near-empty dark screen
- Text sequence: "רגע..." → "רואים משהו מעניין..." → "הנה."
- Stars/sparkle symbols (✦ ✧ ✦)
- Typing indicator dots
- Creates curiosity through emptiness, not visual noise

### Email Capture

- Appears below the result card
- Soft, non-intrusive design
- Copy: "רוצים לקבל את הוויב המלא שלכם היום?" / "Want your full vibe analysis today?"
- Promise: vibe analysis using site agents (psychologist, astrologer, etc.)
- Single email field + submit button
- Fully optional, does not gate the result

## Quiz Content

### Question 1 — Emotional State

**HE:** מה הכי נכון עכשיו?
**EN:** What feels most true right now?

| HE | EN | Value |
|----|-----|-------|
| הראש רועש | My head is noisy | noisy-head |
| תקוע/ה | I feel stuck | stuck |
| משעמם | I am bored | bored |
| רוצה משהו יצירתי | I want something creative | creative |
| מסובך רגשית | I feel emotionally tangled | emotionally-tangled |

### Question 2 — Desired Mode

**HE:** מה רוצים יותר עכשיו?
**EN:** What do you want more right now?

| HE | EN | Value |
|----|-----|-------|
| להבין | To understand | understand |
| לשחק | To play | play |
| לזוז | To move | move |
| לכתוב | To write | write |
| להתפרק מהר | To get unstuck quickly | unstuck-quickly |

### Question 3 — Energy Level

**HE:** כמה אנרגיה יש עכשיו?
**EN:** How much energy do you have?

| HE | EN | Value |
|----|-----|-------|
| מאוד נמוכה | Very low | very-low |
| בינונית | Medium | medium |
| גבוהה | High | high |

### Question 4 — Help Type

**HE:** מה נשמע הכי מועיל עכשיו?
**EN:** What sounds most helpful right now?

| HE | EN | Value |
|----|-----|-------|
| שאלות חדות | Sharp questions | sharp-questions |
| כלי | A tool | tool |
| משחק | A game | game |
| דחיפה קטנה | A small push | small-push |
| כיוון יצירתי | A creative direction | creative-direction |

### Question 5 (Optional)— Avoidance

**HE:** ממה הכי נמנעים?
**EN:** What are you avoiding most?

| HE | EN | Value |
|----|-----|-------|
| לחשוב בכנות | Thinking honestly | thinking-honestly |
| להתחיל | Starting | starting |
| לסיים | Finishing | finishing |
| להאט | Slowing down | slowing-down |
| להרגיש מה באמת קורה | Feeling what is actually going on | feeling-truth |

## API Contract

### Client → Make Webhook (POST)

```json
{
  "answers": {
    "emotionalState": "stuck",
    "desiredMode": "understand",
    "energyLevel": "medium",
    "helpType": "sharp-questions",
    "avoiding": "thinking-honestly"
  },
  "language": "he"
}
```

The `avoiding` field is optional. Question 5 shows a "דלג" / "Skip" button. If skipped, the field is omitted from the payload.

### Make → Client (Response)

```json
{
  "primary": {
    "id": "self-inquiry-agent",
    "title": "בירור עצמי",
    "description": "לא מחפשים הסחה. מחפשים להבין מה באמת מפריע.",
    "reason": "יש עומס שמנסה להתלבש כ׳אני בסדר׳. לא צריך לפתור — צריך לראות.",
    "url": "/agents/self-inquiry",
    "type": "agent"
  },
  "secondary": {
    "id": "cube-app",
    "title": "קוביית ההחלטות",
    "url": "/apps/cube",
    "type": "app"
  }
}
```

### Error Response

```json
{
  "error": "recommendation_failed",
  "fallback": {
    "id": "self-inquiry-agent",
    "title": "בירור עצמי",
    "url": "/agents/self-inquiry",
    "type": "agent"
  }
}
```

On error, the client shows a default recommendation with a softer message like "לא הצלחנו לקרוא את הוויב, אבל הנה נקודת התחלה טובה."

## Notion Catalog DB Schema

| Field | Type | Example |
|-------|------|---------|
| id | Text | `self-inquiry-agent` |
| title_he | Text | בירור עצמי |
| title_en | Text | Self Inquiry |
| type | Select | agent / game / app / workshop / content |
| shortDescription_he | Text | כלי בירור עצמי חד... |
| shortDescription_en | Text | A sharp self-inquiry tool... |
| url | URL | /agents/self-inquiry |
| emotionalTags | Multi-select | confusion, stuck, stress... |
| intentTags | Multi-select | understand, play, move... |
| energyLevel | Multi-select | low, medium, high |
| tone | Multi-select | intense, direct, playful, light... |
| audienceState | Multi-select | stuck, bored, heavy, searching... |
| active | Checkbox | ✓ |

Only items with `active = true` are included in recommendations.

## AI Prompt Design

The prompt sent to the AI model (built in Make) should:

1. **Receive:** User answers + full catalog (from Notion)
2. **Tone rules:**
   - Low energy → warm, empathetic
   - High energy → sharp, direct
   - Bored → playful, provocative
   - Emotionally tangled → gentle but honest
3. **Language:** Match the `language` field (he/en), gender-neutral throughout
4. **Constraints:**
   - Choose ONLY from provided catalog items
   - Never invent tools, pages, or offers
   - Return exactly one primary and one secondary recommendation
   - Return valid JSON matching the response schema
5. **Output quality:**
   - The `description` should feel like a sharp human insight, not a summary
   - The `reason` should feel like a friend explaining why this is right for you
   - Max 2 sentences each

## Lead Generation — "Your Vibe Today"

### Flow

1. User completes quiz and sees result
2. Below the result card: "רוצים לקבל את הוויב המלא שלכם היום?"
3. User enters email (optional, does not gate result)
4. Client POSTs to a second Make webhook:
   ```json
   {
     "email": "user@example.com",
     "answers": { /* same answers object from quiz */ },
     "language": "he"
   }
   ```
5. Make scenario:
   - Runs quiz answers through multiple site agents (psychologist, astrologer, etc.)
   - Compiles a short "your vibe today" analysis
   - Sends via email (Brevo/Mailchimp/Gmail)

### V1 Scope

- Email capture UI is built
- Make webhook receives the data
- The actual "vibe analysis" email content and agent integration is a separate phase

## Out of Scope (v1)

- Analytics/tracking of quiz completions
- A/B testing of questions
- Admin panel for managing questions
- Dynamic questions from Notion (questions are hardcoded in v1)
- The actual "vibe today" email content generation (webhook + capture only)
