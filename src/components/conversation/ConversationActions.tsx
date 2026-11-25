import React from 'react';
import NavigationButtons from '../NavigationButtons';

interface ConversationActionsProps {
  onContinue: () => void;
  onPrevious: () => void;
}

const ConversationActions = ({ onContinue, onPrevious }: ConversationActionsProps) => {
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={onContinue}
        className="t-label underline underline-offset-4 self-center h-11 px-4"
      >
        אפשר לדלג, תפתיעו אותי
      </button>

      <NavigationButtons
        onNext={onContinue}
        onPrevious={onPrevious}
        nextLabel="יאללה, נמשיך"
        previousLabel="חזרה"
        showChevron={false}
      />
    </div>
  );
};

export default ConversationActions;
