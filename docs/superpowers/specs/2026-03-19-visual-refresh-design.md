# Coachy Flow - Visual Refresh Design Spec

**Date:** 2026-03-19
**Scope:** Visual refresh of the entire app - new color palette, mobile-first responsive layout, redesigned components, iOS fixes
**Approach:** Keep existing 7-step flow and logic intact. Redesign only the visual layer.

## Target Audience

People who want to work out but don't know what to do today. The app matches them to a personalized workout based on their current mood, energy, and available time. Not yoga-specific - all workout types.

## Design Direction

**Warm & Friendly** - soft warm colors, rounded shapes, conversational tone. Approachable and fun, not intimidating. Think Duolingo meets wellness.

## Screen-to-Component Mapping

The app has **7 separate screens**, each rendered as its own component in `Index.tsx`:

| Screen | Component | Description |
|--------|-----------|-------------|
| 1 | `BouncinessScreen.tsx` | Joy/positivity slider |
| 2 | `EnergyScreen.tsx` | Energy level slider |
| 3 | `AlertnessScreen.tsx` | Alertness slider |
| 4 | `LightnessScreen.tsx` | Lightness/mood slider |
| 5 | `ConversationScreen.tsx` | Free-text about practice intentions |
| 6 | `TimeAvailability.tsx` | Duration selection |
| 7 | `PracticeSummary.tsx` | Generated workout + video |

Each emotion screen (1-4) is a separate screen with its own dot in the progress bar. They are NOT grouped into a single screen with sub-steps.

## Color Palette

**Integration approach:** The current project uses shadcn/ui's HSL CSS variable system (e.g., `--primary: 210 70% 58%` in `src/styles/base.css`, consumed as `hsl(var(--primary))` in `tailwind.config.ts`). We keep this architecture intact and convert all new hex values to HSL, updating the CSS variables in `base.css`. The shadcn/ui component system continues to work unchanged.

| Token | Hex | HSL | Usage |
|-------|-----|-----|-------|
| `--primary` | `#FF8C42` | `24 100% 63%` | CTAs, active states, slider fills, accent. **Never used as text on white** (contrast 3.0:1 — passes for large text/UI components but not body text) |
| `--primary-light` | `#FFD6A5` | `30 100% 83%` | Highlights, hover states, borders |
| `--background` | `#FFF5E9` | `30 100% 95%` | Main page background (cream) |
| `--surface` | `#FFFFFF` | `0 0% 100%` | Cards, modals, input backgrounds |
| `--text-primary` | `#2D2D2D` | `0 0% 18%` | Headlines, important text |
| `--text-secondary` | `#6B7280` | `220 9% 46%` | Body text, descriptions |
| `--border` | `#E5DDD5` | `30 24% 87%` | Inactive borders, dividers. Note: overrides shadcn's default `--border` — this is intentional and will cascade to all shadcn components |
| `--success` | `#4CAF50` | `122 39% 49%` | Completion, positive states |
| `--energy` | `#FF6B6B` | `0 100% 71%` | High intensity indicator |

Replaces the current blue (#3A78D4) / pink (#DE4A8F) / light-blue background (#D6E6F5) scheme.

**Migration:** Remove the existing `coachy` color namespace (`coachy-pink`, `coachy-yellow`, `coachy-green`, `coachy-blue`, `coachy-lightBlue`, `coachy-gray`, `coachy-turquoise`, `coachy-text`, `coachy-red`) from `tailwind.config.ts`. Replace all `coachy-*` class usages in components with the new tokens above. Also remove the `backgroundImage` gradients (`sunrise-gradient`, `ocean-calm`, `full-spectrum`) and replace with warm equivalents where needed.

**Accessibility:** `primary` (#FF8C42) on white has a 3.0:1 contrast ratio — sufficient for large text (18px+) and UI components per WCAG AA, but NOT for body text. All body text uses `text-primary` (#2D2D2D, 14.5:1) or `text-secondary` (#6B7280, 4.6:1 — passes AA). Orange is only used for buttons (white text on orange = 3.1:1, acceptable for large bold text), tags, and decorative elements.

**Dark mode:** The current `base.css` has a `.dark` theme. Remove it entirely — dark mode is out of scope for this refresh. Can be re-added later with warm dark tones if desired.

## Typography

- **Font family:** Rubik (keep existing - warm and rounded, great for Hebrew)
- **Headline:** 24px, weight 700, color `text-primary`
- **Body:** 15px, weight 400, color `text-secondary`
- **Button primary:** 16px, weight 600, color white
- **Button secondary:** 15px, weight 500, color `text-secondary`
- **Tags/labels:** 12-13px, weight 600
- **Direction:** RTL (Hebrew primary), LTR-ready for future English support

## Component Designs

### Progress Bar

Replace the current rainbow gradient bar with **dot indicators**:
- 7 dots, one per step
- Completed: filled `primary` color
- Current: slightly larger + ring shadow (`box-shadow: 0 0 0 3-4px rgba(255,140,66,0.2)`)
- Upcoming: filled `border` color (#E5DDD5)
- Centered horizontally at top of screen

### Emotion Slider Screens (4 separate screens: Bounciness, Energy, Alertness, Lightness)

Each of the 4 emotion screens (`BouncinessScreen`, `EnergyScreen`, `AlertnessScreen`, `LightnessScreen`) wraps a shared `QuestionCard` component. The visual changes apply to `QuestionCard` and propagate to all 4 screens:

- White card on cream background, `border-radius: 20px`, subtle shadow (`0 4px 20px rgba(0,0,0,0.06)`)
- Large emoji (56px) at top of card
- Hebrew question as headline (24px bold)
- Subtitle in secondary text
- **Custom styled slider:** Orange gradient track (`primary-light` to `primary`), white thumb (24px) with orange border (3px) and shadow. Built with touch events for consistent cross-browser behavior. Drag sensitivity: 1:1 with finger movement. No snap points — continuous value. Emoji at top of card scales subtly (1.0→1.1) based on slider value.
- Labels at slider ends with emojis
- Card centered with 20px horizontal padding
- Related components to update: `EmotionParameterCard.tsx`, `EmotionQuestionCard.tsx`, `EmotionalRating.tsx`, `EmotionalRatingNew.tsx`, `EmotionAnimation.tsx`, `EmotionalPrompt.tsx`

### Navigation Buttons

- Two buttons at bottom: "back" (secondary) and "continue" (primary)
- Back: `flex: 1`, white background, border color `border`, rounded 14px
- Continue: `flex: 2`, `primary` background, white text, rounded 14px, orange shadow
- Minimum height: 48px (touch target)

### Conversation Screen

- **Coach message:** White bubble with rounded corners (18px 18px 4px 18px), max-width 85%, subtle shadow
- **User input:** White textarea card with `primary-light` border, rounded 16px
- **Quick-pick tags:** Horizontal row of pill buttons below textarea (strength, stretching, cardio) in cream background
- **Send button:** Orange circle (36px) with up-arrow icon
- **Skip option:** Centered text link below: "skip, surprise me" with sparkle emoji, underlined

### Time Selection

- 2x2 grid layout replacing current list
- Each option: white card, rounded 16px, border `border`
- Selected: border changes to `primary` (2px), orange shadow, number color changes to `primary`
- Content: large number (28px bold) + "minutes" label (13px)
- Grid gap: 12px

### Workout Result Card

- Celebration header: emoji (40px) + "Your workout is ready!" headline
- Single white card with rounded corners (20px), overflow hidden
- **Video thumbnail area:** Gradient background (`primary` to `energy`), centered play button (white circle with orange triangle), duration badge bottom-left
- **Workout info section:** Padding 20px
  - Tag row: pills with cream background, orange text (type, duration, intensity)
  - Workout title: 17px semibold
  - Description: 14px secondary text
- **Action buttons:** Stacked vertically
  - "Start workout": full-width primary button
  - "Find something else": full-width secondary button

### Loading State

Replace generic spinner with **pulsing orange dots** (3 dots, staggered animation).

### Celebration Effects

Keep confetti but change color palette to warm tones: orange, peach, gold, coral.

## Responsive Strategy

### Mobile (320px - 430px) — Primary

- Full-width layout with 20px horizontal padding
- All base styles target this range
- No max-width constraint on content
- `min-height: 100dvh` for full viewport

### Tablet (431px - 768px)

- Content centered with `max-width: 430px`
- Cream background visible on sides
- Same mobile layout inside the container

### Desktop (769px+)

- Phone-shaped container centered on screen
- `max-width: 430px`, subtle shadow around container
- "App in browser" feel - looks like a phone preview
- Cream background fills the rest of the viewport

## iOS / Safari Fixes

1. **Replace `100vh` with `100dvh`** everywhere - fixes iOS address bar viewport issues. Use fallback pattern: `min-height: 100vh; min-height: 100dvh;` for older browser support
2. **Remove all iOS-specific CSS hacks** (ios-card-fix, ios-conversation-fix, ios-textarea-fix classes) - clean slate
3. **Add `touch-action: manipulation`** on interactive elements - prevents 300ms tap delay
4. **Custom slider component** - replace native `<input type="range">` with touch-event-based slider for consistent cross-browser appearance
5. **Keyboard-aware conversation layout** - textarea adjusts when iOS keyboard opens (use `visualViewport` API)
6. **Safe area insets** - `env(safe-area-inset-*)` padding for notch and home indicator
7. **Remove `-webkit-touch-callout` workarounds** - use modern CSS equivalents

## Animations (Framer Motion)

All animations keep the existing Framer Motion setup but refine the values:

| Element | Animation | Values |
|---------|-----------|--------|
| Screen transitions | Slide + fade | `x: ±30px`, `opacity: 0→1`, duration 0.3s, ease `easeOut` |
| Card entrance | Scale + fade | `scale: 0.95→1`, `opacity: 0→1`, duration 0.25s |
| Slider thumb | Spring | `stiffness: 300`, `damping: 20` |
| Button press | Scale down | `scale: 0.97` on tap, duration 0.1s |
| Dot progress | Width + color | Animate dot size and ring on step change |
| Loading dots | Pulsing | 3 dots, `scale: 0.8→1.2`, staggered 0.15s |
| Celebration confetti | Burst | Warm palette: `['#FF8C42', '#FFD6A5', '#FF6B6B', '#FFD700']` |

## Files to Modify

### Styling
- `tailwind.config.ts` - Convert color tokens to new palette HSL values, remove `coachy` namespace, replace `backgroundImage` gradients
- `harmonized-theme.json` - Update all color values to match new warm palette. This file stores design tokens used as reference — update primary, complementary, neutral, and gradient definitions.
- `src/App.css` - Simplify, remove iOS hacks
- `src/styles/base.css` - Update CSS variables (`--primary`, `--border`, etc.) to new HSL values, remove `.dark` theme block
- `src/styles/animations.css` - Keep, update any color references to new palette
- `src/styles/layout.css` - Rewrite with mobile-first approach, remove iOS workarounds
- `src/styles/index.css` - Update imports, clean up
- `src/styles/timeOptions.css` - Remove (replaced by Tailwind classes in redesigned grid component)
- `src/styles/utilities.css` - Keep, update color references

### Screen Components (rendered in Index.tsx)
- `src/components/BouncinessScreen.tsx` - Update to new warm styling
- `src/components/EnergyScreen.tsx` - Update to new warm styling
- `src/components/AlertnessScreen.tsx` - Update to new warm styling
- `src/components/LightnessScreen.tsx` - Update to new warm styling
- `src/components/ConversationScreen.tsx` - Chat-like redesign
- `src/components/TimeAvailability.tsx` - Grid layout redesign
- `src/components/PracticeSummary.tsx` - New workout result card

### Shared Components
- `src/components/ProgressBar.tsx` - Dot indicators
- `src/components/QuestionCard.tsx` - New card design with warm styling
- `src/components/NavigationButtons.tsx` - New button styles
- `src/components/AnimatedCard.tsx` - Updated animation values
- `src/components/CelebrationEffects.tsx` - Warm color confetti
- `src/components/YouTubeVideo.tsx` - Thumbnail preview before play
- `src/components/VideoPlayerWithControls.tsx` - Update styling to match new design
- `src/components/InstallButton.tsx` - Update visual styling
- `src/components/StepIndicator.tsx` - May be removed or merged into new dot progress bar
- `src/components/TimeOption.tsx` - Redesign as grid card

### Emotion-related Components
- `src/components/EmotionalRating.tsx` - Custom slider with touch events
- `src/components/EmotionalRatingNew.tsx` - Custom slider with touch events
- `src/components/EmotionParameterCard.tsx` - Update card styling
- `src/components/EmotionQuestionCard.tsx` - Update card styling
- `src/components/EmotionAnimation.tsx` - Update colors/animations
- `src/components/EmotionalPrompt.tsx` - Update styling

### Conversation Sub-components
- `src/components/conversation/ConversationHeader.tsx` - Redesign
- `src/components/conversation/ConversationTextarea.tsx` - Chat-like input with quick-pick tags
- `src/components/conversation/ConversationActions.tsx` - Redesign actions

### Practice Sub-components
- `src/components/practice/LoadingState.tsx` - Pulsing orange dots
- `src/components/practice/ErrorState.tsx` - Warm error styling
- `src/components/practice/WorkoutDisplay.tsx` - Rich workout card with tags
- `src/components/practice/VideoSection.tsx` - Thumbnail preview

### Components to Consider Removing
- `src/components/IOSDebugInfo.tsx` - Debug overlay, remove from production
- `src/components/WorkoutPreferences.tsx` - Evaluate if still used, update or remove

### Layout
- `src/pages/Index.tsx` - Responsive container wrapper
- `src/App.tsx` - Responsive container wrapper
- `index.html` - Update theme-color meta tag to `#FFF5E9`

## Out of Scope

- No changes to the 7-step flow logic
- No changes to AI/YouTube API integration logic
- No new features (history, favorites, onboarding)
- No changes to context providers or hooks (beyond styling props)
- No i18n infrastructure (just keep RTL-first, don't add English yet)
