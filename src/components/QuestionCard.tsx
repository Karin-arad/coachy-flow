import React from 'react';
import { cn } from '@/lib/utils';
import NavigationButtons from './NavigationButtons';
import Creature from './Creature';
import BouncingBall from './creatures/BouncingBall';
import LitCreature from './creatures/LitCreature';
import WeightCreature from './creatures/WeightCreature';
import MoodSlider from './MoodSlider';
import { worlds, worldBackground, moodFor, isDarkWorld, WorldKey } from '@/lib/worlds';
import { useWorldBackground } from '@/hooks/useWorldBackground';
import { useFitScale } from '@/hooks/useFitScale';

interface QuestionCardProps {
  title: string;
  /** No longer shown: the creature replaced the emoji */
  emojiIcon?: string;
  currentValue: number;
  onChange: (value: number[]) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  currentStep: number;
  totalSteps: number;
  emotionType?: "energy" | "bounciness" | "alertness" | "lightness";
  className?: string;
  showPrevious?: boolean;
}

const sliderLabels: Record<string, { high: string; low: string }> = {
  bounciness: { high: 'בא לי לרקוד', low: 'בא לי שמיכה' },
  energy: { high: 'מצב טיל', low: 'מצב ספה' },
  alertness: { high: 'אחרי שלושה', low: 'לפני קפה' },
  lightness: { high: 'בלון הליום', low: 'אחרי חמין' },
};

const QuestionCard = ({
  title,
  currentValue,
  onChange,
  onNext,
  onPrevious,
  currentStep,
  totalSteps,
  emotionType,
  className,
  showPrevious = true
}: QuestionCardProps) => {
  const worldKey: WorldKey = emotionType ?? 'bounciness';
  const world = worlds[worldKey];
  const labels = sliderLabels[worldKey];

  useWorldBackground(worldBackground(worldKey, currentValue), isDarkWorld(worldKey, currentValue));

  // Each question moves in its own way
  const Hero =
    worldKey === 'energy' ? BouncingBall
    : worldKey === 'alertness' ? LitCreature
    : worldKey === 'lightness' ? WeightCreature
    : Creature;

  // Shrink the creature on short phones so its tallest pose still fits the stage
  const { ref: stageRef, scale: creatureScale } = useFitScale();

  return (
    <div className={cn('screen', className)}>
      <div>
        <h1 className="t-title">{title}</h1>
        <p className="t-mood" aria-live="polite">{moodFor(worldKey, currentValue)}</p>
      </div>

      <div ref={stageRef} className="flex-1 min-h-0">
        <Hero value={currentValue} color={world.creature} scale={creatureScale} />
      </div>

      <div>
        <MoodSlider value={currentValue} onChange={onChange} color={world.creature} label={title} />
        {/* The slider runs right-to-left: its low end is on the right */}
        <div className="flex justify-between mt-1 t-label">
          <span>{labels.low}</span>
          <span>{currentValue} מתוך 10</span>
          <span>{labels.high}</span>
        </div>
      </div>

      {onNext && (
        <NavigationButtons
          onNext={onNext}
          onPrevious={onPrevious}
          hidePrevious={!showPrevious}
          nextLabel={currentStep === totalSteps ? 'יאללה, נמשיך' : 'הבא'}
          showChevron={currentStep !== totalSteps}
        />
      )}
    </div>
  );
};

export default QuestionCard;
