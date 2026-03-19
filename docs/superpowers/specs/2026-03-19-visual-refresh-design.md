# Coachy Flow - Visual Refresh Design Spec

**Date:** 2026-03-19
**Scope:** Visual refresh of the entire app - new color palette, mobile-first responsive layout, redesigned components, iOS fixes
**Approach:** Keep existing 7-step flow and logic intact. Redesign only the visual layer.

## Target Audience

People who want to work out but don't know what to do today. The app matches them to a personalized workout based on their current mood, energy, and available time. Not yoga-specific - all workout types.

## Design Direction

**Warm & Friendly** - soft warm colors, rounded shapes, conversational tone. Approachable and fun, not intimidating. Think Duolingo meets wellness.

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#FF8C42` | CTAs, active states, slider fills, accent |
| `primary-light` | `#FFD6A5` | Highlights, hover states, borders |
| `background` | `#FFF5E9` | Main page background (cream) |
| `surface` | `#FFFFFF` | Cards, modals, input backgrounds |
| `text-primary` | `#2D2D2D` | Headlines, important text |
| `text-secondary` | `#6B7280` | Body text, descriptions |
| `border` | `#E5DDD5` | Inactive borders, dividers |
| `success` | `#4CAF50` | Completion, positive states |
| `energy` | `#FF6B6B` | High intensity indicator |

Replaces the current blue (#3A78D4) / pink (#DE4A8F) / light-blue background (#D6E6F5) scheme.

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

### Emotion Slider Screens (Bounciness, Energy, Alertness, Lightness)

- White card on cream background, `border-radius: 20px`, subtle shadow (`0 4px 20px rgba(0,0,0,0.06)`)
- Large emoji (56px) at top of card
- Hebrew question as headline (24px bold)
- Subtitle in secondary text
- Custom styled slider: orange gradient track (`primary-light` to `primary`), white thumb with orange border and shadow
- Labels at slider ends with emojis
- Card centered with 20px horizontal padding

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

1. **Replace `100vh` with `100dvh`** everywhere - fixes iOS address bar viewport issues
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
- `tailwind.config.ts` - Replace color tokens with new palette
- `harmonized-theme.json` - Update to new warm palette
- `src/App.css` - Simplify, remove iOS hacks
- `src/styles/*.css` - Rewrite with mobile-first approach, remove iOS workarounds

### Components
- `src/components/ProgressBar.tsx` - Dot indicators
- `src/components/QuestionCard.tsx` - New card design with warm styling
- `src/components/NavigationButtons.tsx` - New button styles
- `src/components/ConversationScreen.tsx` - Chat-like redesign
- `src/components/conversation/*.tsx` - Header, textarea, actions redesign
- `src/components/TimeAvailability.tsx` (or `TimeOption.tsx`) - Grid layout
- `src/components/PracticeSummary.tsx` - New workout result card
- `src/components/practice/*.tsx` - Loading, error, workout display, video section
- `src/components/AnimatedCard.tsx` - Updated animation values
- `src/components/CelebrationEffects.tsx` - Warm color confetti
- `src/components/YouTubeVideo.tsx` - Thumbnail preview before play
- `src/components/EmotionalRating.tsx` / `EmotionalRatingNew.tsx` - Custom slider

### Layout
- `src/App.tsx` - Responsive container wrapper
- `index.html` - Update theme-color meta tag to warm palette

## Out of Scope

- No changes to the 7-step flow logic
- No changes to AI/YouTube API integration logic
- No new features (history, favorites, onboarding)
- No changes to context providers or hooks (beyond styling props)
- No i18n infrastructure (just keep RTL-first, don't add English yet)
