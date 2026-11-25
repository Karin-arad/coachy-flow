import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface NavigationButtonsProps {
  onNext: () => void;
  onPrevious?: () => void;
  /** Hide the back button (first screen) */
  hidePrevious?: boolean;
  nextLabel?: string;
  previousLabel?: string;
  nextDisabled?: boolean;
  /** Show the forward chevron next to the label */
  showChevron?: boolean;
}

/** The one navigation row used by every screen: back (secondary) + forward (primary). */
const NavigationButtons = ({
  onNext,
  onPrevious,
  hidePrevious = false,
  nextLabel = 'הבא',
  previousLabel = 'הקודם',
  nextDisabled = false,
  showChevron = true,
}: NavigationButtonsProps) => {
  return (
    <div className="screen-actions">
      {!hidePrevious && (
        <button type="button" onClick={onPrevious} className="btn-secondary">
          <ChevronRight size={18} />
          <span>{previousLabel}</span>
        </button>
      )}
      <button type="button" onClick={onNext} disabled={nextDisabled} className="btn-primary">
        <span>{nextLabel}</span>
        {showChevron && <ChevronLeft size={18} />}
      </button>
    </div>
  );
};

export default NavigationButtons;
