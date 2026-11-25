import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useConversationScreen } from '@/hooks/useConversationScreen';
import { useWorldBackground } from '@/hooks/useWorldBackground';
import { useFitScale } from '@/hooks/useFitScale';
import { worlds, worldBackground } from '@/lib/worlds';
import Creature from './Creature';
import NavigationButtons from './NavigationButtons';

/**
 * Quick answers. The person reads the Hebrew label; the model and the YouTube
 * search get the English value, because English queries find far more videos.
 */
const CHIPS = [
  { label: 'גב רגיש', value: 'sensitive lower back' },
  { label: 'ברכיים', value: 'knee friendly' },
  { label: 'כתפיים וצוואר', value: 'gentle on neck and shoulders' },
  { label: 'רק פלג עליון', value: 'upper body only' },
  { label: 'בלי קפיצות', value: 'low impact no jumping' },
  { label: 'רק מתיחות', value: 'stretching only' },
];
const CHIP_VALUES = CHIPS.map((chip) => chip.value);
const SEPARATOR = ', ';

const ConversationScreen = () => {
  const {
    screenRef,
    userConversation,
    setUserConversation,
    handleContinue,
    handlePrevious,
    currentScreen
  } = useConversationScreen();

  // The answer is stored as one string: the chosen chips, then anything typed
  const [selected, setSelected] = useState<string[]>(() =>
    CHIP_VALUES.filter((value) => userConversation.split(SEPARATOR).includes(value))
  );
  const [other, setOther] = useState(() =>
    userConversation.split(SEPARATOR).filter((part) => part && !CHIP_VALUES.includes(part)).join(SEPARATOR)
  );
  const [otherOpen, setOtherOpen] = useState(() => other.length > 0);

  useEffect(() => {
    setUserConversation([...selected, other.trim()].filter(Boolean).join(SEPARATOR));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, other]);

  useWorldBackground(worldBackground('lightness'));
  const { ref: stageRef, scale } = useFitScale(300);

  if (currentScreen !== 5) {
    return null;
  }

  const toggle = (value: string) =>
    setSelected((current) =>
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    );

  const hasAnswer = selected.length > 0 || other.trim().length > 0;

  return (
    <div ref={screenRef} className="screen">
      <h1 className="t-title">משהו שכדאי לי לדעת?</h1>

      <div ref={stageRef} className="flex-1 min-h-0">
        <Creature value={6} color={worlds.lightness.creature} scale={scale} />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {CHIPS.map((chip) => (
            <button
              key={chip.value}
              type="button"
              aria-pressed={selected.includes(chip.value)}
              onClick={() => toggle(chip.value)}
              className={cn('chip chip-toggle', selected.includes(chip.value) && 'chip-on')}
            >
              {chip.label}
            </button>
          ))}
          <button
            type="button"
            aria-expanded={otherOpen}
            onClick={() => setOtherOpen((open) => !open)}
            className={cn('chip chip-toggle', (otherOpen || other.trim()) && 'chip-on')}
          >
            משהו אחר
          </button>
        </div>

        {otherOpen && (
          <textarea
            value={other}
            onChange={(e) => setOther(e.target.value)}
            aria-label="משהו אחר שכדאי לדעת"
            placeholder="כמה מילים"
            rows={2}
            autoFocus
            className="w-full rounded-[20px] bg-white px-4 py-3 t-body resize-none focus:outline focus:outline-[3px] focus:outline-[#17153B]"
          />
        )}
      </div>

      <NavigationButtons
        onNext={handleContinue}
        onPrevious={handlePrevious}
        nextLabel={hasAnswer ? 'יאללה, נמשיך' : 'אין, נמשיך'}
        previousLabel="חזרה"
        showChevron={false}
      />
    </div>
  );
};

export default ConversationScreen;
