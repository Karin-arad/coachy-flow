# Coachy Flow Visual Refresh - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign Coachy Flow's visual layer with a warm color palette, mobile-first responsive layout, and polished components — without changing any flow logic.

**Architecture:** Update CSS variables and Tailwind config to new warm palette, then restyle each component top-down (layout → shared components → screens). All changes are visual only — context providers, hooks, and API logic remain untouched.

**Tech Stack:** React 18, TypeScript, Tailwind CSS 3, Framer Motion, shadcn/ui (Radix), Vite

**Spec:** `docs/superpowers/specs/2026-03-19-visual-refresh-design.md`

---

## File Structure

### Modified Files (by task order)

| Task | Files | Responsibility |
|------|-------|---------------|
| 1 | `src/styles/base.css`, `tailwind.config.ts`, `harmonized-theme.json`, `src/components/ui/button.tsx`, `src/components/ui/slider.tsx` | Color system + UI primitives |
| 2 | `src/styles/layout.css`, `src/App.css`, `src/pages/Index.tsx`, `src/App.tsx`, `index.html` | Responsive layout shell |
| 3 | `src/components/ProgressBar.tsx` | Dot progress indicator |
| 4 | `src/components/AnimatedCard.tsx`, `src/styles/animations.css` | Card entrance + transitions |
| 5 | `src/components/QuestionCard.tsx`, `src/components/NavigationButtons.tsx` | Slider card + nav buttons |
| 6 | `src/components/BouncinessScreen.tsx`, `src/components/EnergyScreen.tsx`, `src/components/AlertnessScreen.tsx`, `src/components/LightnessScreen.tsx` | 4 emotion screens |
| 7 | `src/components/ConversationScreen.tsx`, `src/components/conversation/ConversationHeader.tsx`, `src/components/conversation/ConversationTextarea.tsx`, `src/components/conversation/ConversationActions.tsx` | Chat-style conversation |
| 8 | `src/components/TimeAvailability.tsx`, `src/components/TimeOption.tsx` | Grid time picker |
| 9 | `src/components/PracticeSummary.tsx`, `src/components/practice/LoadingState.tsx`, `src/components/practice/ErrorState.tsx`, `src/components/practice/WorkoutDisplay.tsx`, `src/components/practice/VideoSection.tsx`, `src/components/YouTubeVideo.tsx`, `src/components/VideoPlayerWithControls.tsx` | Workout result + video |
| 10 | `src/components/CelebrationEffects.tsx` | Warm confetti colors |
| 11 | `src/components/InstallButton.tsx`, `src/components/APIKeyInput.tsx`, `src/components/StepIndicator.tsx` | Remaining components |
| 12 | `src/styles/base.css`, `src/styles/utilities.css` | iOS fixes + cleanup |

### Files to Delete
- `src/styles/timeOptions.css` (replaced by Tailwind classes in Task 8)
- `src/components/IOSDebugInfo.tsx` (debug-only, remove from production)

---

## Task 1: Color System Foundation

**Files:**
- Modify: `src/styles/base.css` (lines 11-88 — CSS variables + dark mode block)
- Modify: `tailwind.config.ts` (lines 55-65 — coachy colors, lines 202-206 — gradients)
- Modify: `harmonized-theme.json` (entire file)

- [ ] **Step 1: Update CSS variables in base.css**

Replace the `:root` light-mode CSS variables (lines 11-50) with the new warm palette:

```css
:root {
  --background: 30 100% 95%;       /* #FFF5E9 cream */
  --foreground: 0 0% 18%;          /* #2D2D2D */
  --card: 0 0% 100%;               /* #FFFFFF */
  --card-foreground: 0 0% 18%;     /* #2D2D2D */
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 18%;
  --primary: 24 100% 63%;          /* #FF8C42 */
  --primary-foreground: 0 0% 100%; /* white text on primary */
  --secondary: 30 100% 83%;        /* #FFD6A5 */
  --secondary-foreground: 30 40% 20%;
  --muted: 30 20% 92%;
  --muted-foreground: 220 9% 46%;  /* #6B7280 */
  --accent: 30 100% 83%;           /* #FFD6A5 */
  --accent-foreground: 0 0% 18%;
  --destructive: 0 100% 71%;       /* #FF6B6B */
  --destructive-foreground: 0 0% 100%;
  --border: 30 24% 87%;            /* #E5DDD5 */
  --input: 30 24% 87%;
  --ring: 24 100% 63%;             /* matches primary */
  --radius: 1rem;
  --surface: 0 0% 100%;            /* #FFFFFF - cards, modals, inputs */
  --success: 122 39% 49%;          /* #4CAF50 */
  --energy: 0 100% 71%;            /* #FF6B6B */
  --primary-light: 30 100% 83%;    /* #FFD6A5 */
}
```

- [ ] **Step 2: Remove the `.dark` theme block**

Delete the entire `.dark { }` block (lines 52-88 approximately). Dark mode is out of scope.

- [ ] **Step 3: Update tailwind.config.ts colors**

Remove the `coachy` color namespace (lines 55-65):
```typescript
// DELETE this entire block:
coachy: {
  pink: '#FF6483',
  yellow: '#FFD36E',
  // ... etc
}
```

Remove the `backgroundImage` gradients (lines 202-206):
```typescript
// DELETE:
'sunrise-gradient': '...',
'ocean-calm': '...',
'full-spectrum': '...',
```

Add new warm gradient as replacement:
```typescript
backgroundImage: {
  'warm-gradient': 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--energy)))',
  'warm-subtle': 'linear-gradient(180deg, hsl(var(--background)), hsl(var(--primary-light)))',
},
```

- [ ] **Step 4: Update harmonized-theme.json**

Replace the entire file content with:
```json
{
  "name": "Coachy Warm",
  "primary": {
    "main": "#FF8C42",
    "light": "#FFD6A5",
    "hsl": "24 100% 63%"
  },
  "background": {
    "main": "#FFF5E9",
    "surface": "#FFFFFF",
    "hsl": "30 100% 95%"
  },
  "text": {
    "primary": "#2D2D2D",
    "secondary": "#6B7280"
  },
  "border": "#E5DDD5",
  "accent": {
    "success": "#4CAF50",
    "energy": "#FF6B6B"
  },
  "celebration": ["#FF8C42", "#FFD6A5", "#FF6B6B", "#FFD700"]
}
```

- [ ] **Step 5: Update button.tsx variants**

The file `src/components/ui/button.tsx` has button variants (`rainbow`, `energetic`, `calm`, `joyful`) that use `coachy-*` classes. Update these to use the warm palette:
- Replace `rainbow` variant: use `bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary))]/90`
- Replace `energetic` variant: use `bg-[hsl(var(--primary))] text-white shadow-[0_4px_12px_rgba(255,140,66,0.3)]`
- Replace `calm` variant: use `bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))]`
- Replace `joyful` variant: use `bg-[hsl(var(--background))] text-[hsl(var(--primary))] border border-[hsl(var(--primary-light))]`
- Remove any `coachy-*` class references from all variants

- [ ] **Step 6: Update slider.tsx emotion colors**

The file `src/components/ui/slider.tsx` has a `getEmotionColor()` function that returns `coachy-*` classes. Replace the function body to return warm palette colors:
- All emotion types should use orange-based colors instead of the old per-emotion colors
- Track: `bg-gradient-to-l from-[hsl(var(--primary))] to-[hsl(var(--primary-light))]`
- Thumb: `border-[hsl(var(--primary))]` with shadow `shadow-[0_2px_8px_rgba(255,140,66,0.3)]`
- Remove all `coachy-*` class references

- [ ] **Step 7: Verify the app still builds**

Run: `cd /tmp/coachy-flow && npm run build`
Expected: Build succeeds. There will be Tailwind warnings about missing `coachy-*` classes in other components — that's expected, we'll fix them in subsequent tasks.

- [ ] **Step 8: Commit**

```bash
git add src/styles/base.css tailwind.config.ts harmonized-theme.json src/components/ui/button.tsx src/components/ui/slider.tsx
git commit -m "feat: update color system to warm palette, update UI primitives"
```

---

## Task 2: Responsive Layout Shell

**Files:**
- Modify: `src/styles/layout.css`
- Modify: `src/App.css`
- Modify: `src/pages/Index.tsx` (lines 77-118 — main render)
- Modify: `src/App.tsx`
- Modify: `index.html` (theme-color meta tag)

- [ ] **Step 1: Rewrite layout.css for mobile-first**

Replace the entire file with:
```css
/* Mobile-first responsive layout */
.app-container {
  min-height: 100vh;
  min-height: 100dvh;
  background: hsl(var(--background));
  direction: rtl;
  font-family: 'Rubik', 'Heebo', sans-serif;
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}

.flow-container {
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

/* Tablet: center content */
@media (min-width: 431px) {
  .flow-container {
    max-width: 430px;
    margin: 0 auto;
  }
}

/* Desktop: phone-in-browser */
@media (min-width: 769px) {
  .app-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flow-container {
    max-width: 430px;
    min-height: auto;
    height: 100vh;
    height: 100dvh;
    border-radius: 24px;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
    background: hsl(var(--background));
    overflow-y: auto;
  }
}
```

- [ ] **Step 2: Simplify App.css**

Remove all iOS-specific hacks and old styling. Do NOT add `@tailwind` directives here — they already exist in `base.css`. Keep only minimal global styles:
```css
* {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

body {
  background: hsl(var(--background));
  overflow-x: hidden;
}
```

- [ ] **Step 3: Update Index.tsx layout wrapper**

In `src/pages/Index.tsx`, update the main render (around lines 77-118) to use the new layout classes. **IMPORTANT: Preserve all existing functional components** (CelebrationEffects, InstallButton, Settings button, APIKeyInput modal). Only change the outer layout wrapper and the screen transition animation. The structure should be:
```tsx
return (
  <div className="app-container">
    <div className="flow-container">
      <ProgressBar currentStep={currentScreen} totalSteps={7} />
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full"
        >
          {renderCurrentScreen()}
        </motion.div>
      </div>
      {/* Keep all existing components below: */}
      <CelebrationEffects ... />
      <InstallButton ... />
      {/* Settings button + APIKeyInput modal - keep as-is */}
    </div>
  </div>
);
```

Do NOT remove any functional components. Only wrap them in the new `app-container` / `flow-container` layout and update the `motion.div` transition values.

- [ ] **Step 4: Update theme-color in index.html**

Find the `<meta name="theme-color"` tag and change its value to `#FFF5E9` (cream background).

- [ ] **Step 5: Verify builds and layout works**

Run: `cd /tmp/coachy-flow && npm run build`
Expected: Build succeeds.

Run: `cd /tmp/coachy-flow && npm run dev` (briefly check in browser if possible)

- [ ] **Step 6: Commit**

```bash
git add src/styles/layout.css src/App.css src/pages/Index.tsx src/App.tsx index.html
git commit -m "feat: mobile-first responsive layout shell"
```

---

## Task 3: Dot Progress Bar

**Files:**
- Modify: `src/components/ProgressBar.tsx` (38 lines — full rewrite)

- [ ] **Step 1: Rewrite ProgressBar component**

Replace the entire file:
```tsx
import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const ProgressBar = ({ currentStep, totalSteps, className }: ProgressBarProps) => {
  return (
    <div className={`flex items-center justify-center gap-2.5 py-4 ${className || ''}`}>
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;

        return (
          <motion.div
            key={step}
            className="rounded-full"
            animate={{
              width: isCurrent ? 12 : 10,
              height: isCurrent ? 12 : 10,
              backgroundColor: isCompleted || isCurrent
                ? 'hsl(24, 100%, 63%)'   /* primary */
                : 'hsl(30, 24%, 87%)',    /* border */
              boxShadow: isCurrent
                ? '0 0 0 4px rgba(255, 140, 66, 0.2)'
                : '0 0 0 0px rgba(255, 140, 66, 0)',
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
};

export default ProgressBar;
```

- [ ] **Step 2: Verify build**

Run: `cd /tmp/coachy-flow && npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProgressBar.tsx
git commit -m "feat: replace rainbow progress bar with dot indicators"
```

---

## Task 4: AnimatedCard + Animations

**Files:**
- Modify: `src/components/AnimatedCard.tsx` (full rewrite)
- Modify: `src/styles/animations.css`

- [ ] **Step 1: Rewrite AnimatedCard**

Replace the entire file — remove `ios-card-fix` class, use warm styling:
```tsx
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: ReactNode;
  isVisible: boolean;
  className?: string;
}

const AnimatedCard = ({ children, isVisible, className }: AnimatedCardProps) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn(
        'bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] w-full max-w-md mx-auto overflow-hidden',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
```

- [ ] **Step 2: Update animations.css**

Replace any old color references in keyframes with warm palette colors. Replace `coachy-*` color references with new tokens. Keep the keyframe structure but update colors used in `color-shift`, `sparkle`, `confetti-explosion`, etc.

- [ ] **Step 3: Commit**

```bash
git add src/components/AnimatedCard.tsx src/styles/animations.css
git commit -m "feat: warm animated card with scale entrance"
```

---

## Task 5: QuestionCard + NavigationButtons

**Files:**
- Modify: `src/components/QuestionCard.tsx` (121 lines — full restyle)
- Modify: `src/components/NavigationButtons.tsx` (58 lines — full restyle)

- [ ] **Step 1: Restyle QuestionCard**

Update the component to use warm styling. Keep the same props interface. Key changes:
- Replace all `coachy-*` color classes with new palette
- Card: `bg-white rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]`
- Emoji: `text-[56px]` centered at top
- Title: `text-2xl font-bold text-[hsl(var(--foreground))]`
- Slider: The shadcn `<Slider>` component was already updated in Task 1 Step 6 (`slider.tsx`). The warm colors are applied via the `getEmotionColor()` function. No additional CSS selectors needed here — just pass the `emotionType` prop as before.
- Slider labels: emojis at each end, `text-sm text-muted-foreground`
- Remove `ProgressBar` rendering from within QuestionCard if it renders one (the parent Index.tsx now handles it)

- [ ] **Step 2: Restyle NavigationButtons**

**IMPORTANT: Keep the existing props interface** (`onNext`, `onPrevious`, `isLastStep`, `isPreviousDisabled`, `isLastSlider`) to avoid breaking callers (BouncinessScreen, EnergyScreen, AlertnessScreen, LightnessScreen, ConversationActions, TimeAvailability all use this component). Only change the visual styling, not the API.

Update the JSX to use warm styling while preserving all existing props:
- Back button: `className="flex-1 py-3.5 rounded-[14px] border-[1.5px] border-[hsl(var(--border))] bg-white text-[hsl(var(--muted-foreground))] font-medium text-[15px]"`
- Continue button: `className="flex-[2] py-3.5 rounded-[14px] bg-[hsl(var(--primary))] text-white font-semibold text-base shadow-[0_4px_12px_rgba(255,140,66,0.3)]"`
- Wrap both buttons in `<motion.button whileTap={{ scale: 0.97 }}>` for tactile press feel
- Replace any `coachy-*` class references
- Keep disabled state logic for `isPreviousDisabled`

- [ ] **Step 3: Verify build**

Run: `cd /tmp/coachy-flow && npm run build`

- [ ] **Step 4: Commit**

```bash
git add src/components/QuestionCard.tsx src/components/NavigationButtons.tsx
git commit -m "feat: warm question card with orange slider and navigation buttons"
```

---

## Task 6: Emotion Screens (1-4)

**Files:**
- Modify: `src/components/BouncinessScreen.tsx`
- Modify: `src/components/EnergyScreen.tsx`
- Modify: `src/components/AlertnessScreen.tsx`
- Modify: `src/components/LightnessScreen.tsx`
- Modify: `src/components/EmotionParameterCard.tsx`
- Modify: `src/components/EmotionQuestionCard.tsx`
- Modify: `src/components/EmotionalRating.tsx`
- Modify: `src/components/EmotionalRatingNew.tsx`
- Modify: `src/components/EmotionalPrompt.tsx`
- Modify: `src/components/EmotionAnimation.tsx`

- [ ] **Step 1: Update the 4 screen components**

Each screen (Bounciness, Energy, Alertness, Lightness) follows the same pattern — they wrap `QuestionCard`. Update any `coachy-*` class references to new palette classes. These should be minimal changes since the heavy lifting is in QuestionCard (Task 5).

Replace any `className` props that reference old colors. Ensure each screen passes `currentStep` correctly (1, 2, 3, 4).

- [ ] **Step 2: Update EmotionParameterCard and EmotionQuestionCard**

Replace `coachy-*` color classes with warm palette equivalents:
- Card backgrounds: `bg-white`
- Borders: `border-[hsl(var(--border))]`
- Active/selected states: `border-[hsl(var(--primary))]` with `shadow-[0_2px_12px_rgba(255,140,66,0.15)]`
- Text: `text-[hsl(var(--foreground))]` for primary, `text-[hsl(var(--muted-foreground))]` for secondary

- [ ] **Step 3: Update EmotionalRating and EmotionalRatingNew**

Replace slider styling to use orange gradient. Update any color references from blue/pink to warm palette. The slider track should use `bg-gradient-to-l from-[hsl(var(--primary))] to-[hsl(var(--primary-light))]`.

- [ ] **Step 4: Update EmotionalPrompt and EmotionAnimation**

Replace color references. EmotionAnimation likely uses colored elements — update to warm palette. EmotionalPrompt text should use `text-[hsl(var(--foreground))]` and `text-[hsl(var(--muted-foreground))]`.

- [ ] **Step 5: Verify build**

Run: `cd /tmp/coachy-flow && npm run build`

- [ ] **Step 6: Commit**

```bash
git add src/components/BouncinessScreen.tsx src/components/EnergyScreen.tsx src/components/AlertnessScreen.tsx src/components/LightnessScreen.tsx src/components/EmotionParameterCard.tsx src/components/EmotionQuestionCard.tsx src/components/EmotionalRating.tsx src/components/EmotionalRatingNew.tsx src/components/EmotionalPrompt.tsx src/components/EmotionAnimation.tsx
git commit -m "feat: warm styling for all 4 emotion slider screens"
```

---

## Task 7: Conversation Screen

**Files:**
- Modify: `src/components/ConversationScreen.tsx`
- Modify: `src/components/conversation/ConversationHeader.tsx`
- Modify: `src/components/conversation/ConversationTextarea.tsx`
- Modify: `src/components/conversation/ConversationActions.tsx`

- [ ] **Step 1: Redesign ConversationHeader**

Replace with coach message bubble style:
- White bubble: `bg-white rounded-[18px_18px_4px_18px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] max-w-[85%]`
- Text: `text-[15px] text-[hsl(var(--foreground))] leading-relaxed`
- The header should display the AI coach's contextual message based on the emotion ratings

- [ ] **Step 2: Redesign ConversationTextarea**

Update to chat-like input:
- Container: `bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border-[1.5px] border-[hsl(var(--primary-light))]`
- Textarea: clean, no visible border, placeholder in Hebrew
- Quick-pick tags row below textarea:
```tsx
<div className="flex gap-2 mt-3">
  {['💪 חיזוק', '🧘 מתיחות', '🔥 קרדיו'].map((tag) => (
    <button
      key={tag}
      onClick={() => appendTag(tag)}
      className="bg-[hsl(var(--background))] px-3 py-1.5 rounded-full text-xs"
    >
      {tag}
    </button>
  ))}
</div>
```
- Send button: orange circle (36px) with up-arrow

- [ ] **Step 3: Redesign ConversationActions**

Add skip option below the input:
```tsx
<div className="text-center mt-4">
  <button
    onClick={handleSkip}
    className="text-sm text-[hsl(var(--muted-foreground))] underline underline-offset-2"
  >
    דלגי, תפתיעו אותי ✨
  </button>
</div>
```

- [ ] **Step 4: Update ConversationScreen wrapper**

Remove `ios-conversation-fix` class. Remove any old styling classes. Use the new layout — the AnimatedCard wrapper should give it the white card on cream look.

- [ ] **Step 5: Verify build**

Run: `cd /tmp/coachy-flow && npm run build`

- [ ] **Step 6: Commit**

```bash
git add src/components/ConversationScreen.tsx src/components/conversation/ConversationHeader.tsx src/components/conversation/ConversationTextarea.tsx src/components/conversation/ConversationActions.tsx
git commit -m "feat: chat-style conversation screen with quick-pick tags"
```

---

## Task 8: Time Selection Grid

**Files:**
- Modify: `src/components/TimeAvailability.tsx` (124 lines — significant restyle)
- Modify: `src/components/TimeOption.tsx` (44 lines — full restyle)
- Delete: `src/styles/timeOptions.css`

- [ ] **Step 1: Rewrite TimeOption as grid card**

```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TimeOptionProps {
  minutes: string;
  isSelected: boolean;
  onSelect: () => void;
}

const TimeOption = ({ minutes, isSelected, onSelect }: TimeOptionProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className={cn(
        'bg-white rounded-2xl p-5 text-center transition-all',
        isSelected
          ? 'border-2 border-[hsl(var(--primary))] shadow-[0_2px_12px_rgba(255,140,66,0.15)]'
          : 'border-[1.5px] border-[hsl(var(--border))]'
      )}
    >
      <div className={cn(
        'text-[28px] font-bold',
        isSelected ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--foreground))]'
      )}>
        {minutes}
      </div>
      <div className="text-[13px] text-[hsl(var(--muted-foreground))]">דקות</div>
    </motion.button>
  );
};

export default TimeOption;
```

- [ ] **Step 2: Update TimeAvailability to use grid layout**

Replace the time options section with a 2x2 grid:
- Header: emoji (48px) + title (24px bold) + subtitle
- Grid: `grid grid-cols-2 gap-3`
- Navigation buttons at bottom
- Remove `import` of `timeOptions.css` if present
- Replace `coachy-*` classes with warm palette

- [ ] **Step 3: Delete timeOptions.css**

```bash
rm /tmp/coachy-flow/src/styles/timeOptions.css
```

Remove any imports of this file from `src/styles/index.css` or wherever it's imported.

- [ ] **Step 4: Verify build**

Run: `cd /tmp/coachy-flow && npm run build`

- [ ] **Step 5: Commit**

```bash
git add src/components/TimeAvailability.tsx src/components/TimeOption.tsx src/styles/
git commit -m "feat: 2x2 grid time selection with warm card design"
```

---

## Task 9: Workout Result + Video

**Files:**
- Modify: `src/components/PracticeSummary.tsx` (111 lines)
- Modify: `src/components/practice/LoadingState.tsx`
- Modify: `src/components/practice/ErrorState.tsx`
- Modify: `src/components/practice/WorkoutDisplay.tsx`
- Modify: `src/components/practice/VideoSection.tsx`
- Modify: `src/components/YouTubeVideo.tsx` (82 lines)
- Modify: `src/components/VideoPlayerWithControls.tsx` (179 lines)

- [ ] **Step 1: Create pulsing loading dots in LoadingState**

Replace the current loading spinner with:
```tsx
<div className="flex items-center justify-center gap-2 py-12">
  {[0, 1, 2].map((i) => (
    <motion.div
      key={i}
      className="w-3 h-3 rounded-full bg-[hsl(var(--primary))]"
      animate={{ scale: [0.8, 1.2, 0.8] }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        delay: i * 0.15,
        ease: 'easeInOut',
      }}
    />
  ))}
</div>
```

- [ ] **Step 2: Warm-style ErrorState**

Update to use warm colors:
- Container: `bg-white rounded-[20px] p-6`
- Error text: `text-[hsl(var(--destructive))]`
- Retry button: primary orange button style

- [ ] **Step 3: Redesign WorkoutDisplay**

Rich workout card:
- Tags row: `flex gap-2 flex-wrap mb-3`
- Each tag: `bg-[hsl(var(--background))] text-[hsl(var(--primary))] px-3 py-1 rounded-full text-xs font-semibold`
- Tags to show: workout type emoji + label, duration, intensity
- Title: `text-[17px] font-semibold text-[hsl(var(--foreground))]`
- Description: `text-sm text-[hsl(var(--muted-foreground))] leading-relaxed`

- [ ] **Step 4: Redesign VideoSection with thumbnail preview**

Add a thumbnail/gradient area before the video plays:
- Before play: show gradient background (`bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--energy))]`) with centered play button (white circle + triangle)
- On click: reveal the YouTube embed
- Duration badge: `absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2.5 py-1 rounded-md`

- [ ] **Step 5: Update PracticeSummary wrapper**

- Celebration header: emoji (40px) + "!האימון שלך מוכן" (22px bold)
- White card with `rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)]`
- Stacked action buttons:
  - "Start workout": full-width primary
  - "Find something else": full-width secondary
- Replace `coachy-*` classes

- [ ] **Step 6: Update YouTubeVideo and VideoPlayerWithControls**

Replace `coachy-*` classes. Update any color references to warm palette.

- [ ] **Step 7: Verify build**

Run: `cd /tmp/coachy-flow && npm run build`

- [ ] **Step 8: Commit**

```bash
git add src/components/PracticeSummary.tsx src/components/practice/ src/components/YouTubeVideo.tsx src/components/VideoPlayerWithControls.tsx
git commit -m "feat: rich workout result card with video thumbnail preview"
```

---

## Task 10: Celebration Effects

**Files:**
- Modify: `src/components/CelebrationEffects.tsx`

- [ ] **Step 1: Update confetti colors to warm palette**

Find the confetti color arrays and replace with warm tones:
```typescript
const warmColors = ['#FF8C42', '#FFD6A5', '#FF6B6B', '#FFD700'];
```

Replace anywhere that `canvas-confetti` or `react-confetti` is configured with color arrays. Update the `colors` prop/option to use `warmColors`.

- [ ] **Step 2: Verify build**

Run: `cd /tmp/coachy-flow && npm run build`

- [ ] **Step 3: Commit**

```bash
git add src/components/CelebrationEffects.tsx
git commit -m "feat: warm-toned celebration confetti colors"
```

---

## Task 11: Remaining Components Cleanup

**Files:**
- Modify: `src/components/InstallButton.tsx`
- Modify: `src/components/APIKeyInput.tsx`
- Modify: `src/components/StepIndicator.tsx`
- Delete: `src/components/IOSDebugInfo.tsx`
- Modify: `src/components/WorkoutPreferences.tsx`

- [ ] **Step 1: Update InstallButton**

Replace `coachy-*` classes. Use warm primary button styling:
- `bg-[hsl(var(--primary))] text-white rounded-[14px] font-semibold`

- [ ] **Step 2: Update APIKeyInput**

Replace `coachy-*` classes with warm palette. Modal/dialog should use `bg-white rounded-[20px]` with warm accents.

- [ ] **Step 3: Update or remove StepIndicator**

If StepIndicator is used inside emotion screens (sub-step dots), update to match warm palette. If it's redundant with the new ProgressBar, check usage and remove if unused.

- [ ] **Step 4: Remove IOSDebugInfo**

Delete the file and remove any imports/references:
```bash
rm /tmp/coachy-flow/src/components/IOSDebugInfo.tsx
```

Search for and remove any `<IOSDebugInfo` references and `import IOSDebugInfo` lines.

- [ ] **Step 5: Update WorkoutPreferences**

Check if it's actually used. If yes, update `coachy-*` classes. If unused, remove it.

- [ ] **Step 6: Verify build**

Run: `cd /tmp/coachy-flow && npm run build`

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: warm styling for remaining components, remove debug overlay"
```

---

## Task 12: iOS Fixes + Final CSS Cleanup

**Files:**
- Modify: `src/styles/base.css`
- Modify: `src/styles/utilities.css`

- [ ] **Step 1: Remove all iOS hack classes from base.css**

Delete these class definitions entirely:
- `.ios-card-fix` (around lines 139-149)
- `.ios-conversation-fix` (around lines 151-160)
- `.ios-textarea-fix` (around lines 162-175)
- Any `@supports (-webkit-touch-callout: none)` media query blocks
- Any remaining references to old `coachy-*` custom classes (`.coachy-rainbow-gradient`, `.coachy-card`)

- [ ] **Step 2: Add modern mobile CSS to base.css**

Add at the end of the file:
```css
/* Modern mobile support */
html {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

input, textarea, button, select {
  touch-action: manipulation;
}

/* Safe area support for notch devices */
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
```

- [ ] **Step 3: Clean up utilities.css**

Replace any `coachy-*` color references with warm palette equivalents. Remove any unused utility classes.

- [ ] **Step 4: Search for remaining `coachy-` references**

Run: `grep -r "coachy-" /tmp/coachy-flow/src/ --include="*.tsx" --include="*.ts" --include="*.css" -l`

Fix any remaining files that still reference `coachy-*` classes.

- [ ] **Step 5: Add keyboard-aware conversation layout**

In `src/components/conversation/ConversationTextarea.tsx`, add `visualViewport` API support so the textarea adjusts when the iOS keyboard opens:
```tsx
useEffect(() => {
  const viewport = window.visualViewport;
  if (!viewport) return;

  const handleResize = () => {
    // Scroll textarea into view when keyboard opens
    const textarea = document.querySelector('textarea');
    if (textarea && document.activeElement === textarea) {
      textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  viewport.addEventListener('resize', handleResize);
  return () => viewport.removeEventListener('resize', handleResize);
}, []);
```

- [ ] **Step 6: Update ConversationPage.tsx**

Check `src/pages/ConversationPage.tsx` — if it has any `coachy-*` classes or old styling, update to warm palette. This page redirects to Index but may still render briefly.

- [ ] **Step 7: Search for remaining `ios-` hack references**

Run: `grep -r "ios-card-fix\|ios-conversation-fix\|ios-textarea-fix\|ios-debug" /tmp/coachy-flow/src/ --include="*.tsx" --include="*.ts" --include="*.css" -l`

Remove any remaining references.

- [ ] **Step 8: Final build verification**

Run: `cd /tmp/coachy-flow && npm run build`
Expected: Clean build with no errors and no warnings about missing classes.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "fix: remove iOS hacks, add keyboard handling, clean up old color references"
```

---

## Execution Notes

- **No tests exist** in this project. Tasks are verified by successful builds only.
- **Order matters:** Task 1 (colors) and Task 2 (layout) must be done first. Tasks 3-11 can be done in any order but the listed order is recommended. Task 12 (cleanup) must be last.
- **Console.log cleanup:** Several components have `console.log` statements for debugging. Remove them as you encounter them, but don't make a separate task for it.
- **The `coachy-*` migration** will cause Tailwind warnings until all components are updated. This is expected — they'll resolve as each task completes.
- **Deferred: Custom touch-event slider.** The spec mentions replacing the native range input with a fully custom touch-event slider. For this plan, we update the existing Radix slider's visual styling (Task 1 Step 6). A fully custom touch slider can be built as a follow-up if the Radix slider has cross-browser issues on iOS.
- **`src/styles/index.css`** — When removing `timeOptions.css` in Task 8, also update `index.css` to remove its import if present.
