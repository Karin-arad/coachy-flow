
import React from 'react';
import ConversationHeader from './conversation/ConversationHeader';
import ConversationTextarea from './conversation/ConversationTextarea';
import ConversationActions from './conversation/ConversationActions';
import { useConversationScreen } from '@/hooks/useConversationScreen';
import { useWorldBackground } from '@/hooks/useWorldBackground';
import { worldBackground } from '@/lib/worlds';

const ConversationScreen = () => {
  const {
    screenRef,
    isInitialized,
    userConversation,
    setUserConversation,
    handleContinue,
    handlePrevious,
    currentScreen
  } = useConversationScreen();

  useWorldBackground(worldBackground('neutral'));

  if (currentScreen !== 5) {
    return null;
  }

  return (
    <div ref={screenRef} className="screen">
      <ConversationHeader />

      <ConversationTextarea
        value={userConversation}
        onChange={setUserConversation}
      />

      <ConversationActions
        onContinue={handleContinue}
        onPrevious={handlePrevious}
      />
    </div>
  );
};

export default ConversationScreen;
