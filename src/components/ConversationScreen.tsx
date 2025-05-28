
import React from 'react';
import AnimatedCard from './AnimatedCard';
import ConversationHeader from './conversation/ConversationHeader';
import ConversationTextarea from './conversation/ConversationTextarea';
import ConversationActions from './conversation/ConversationActions';
import { useConversationScreen } from '@/hooks/useConversationScreen';

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

  // Enhanced visibility check
  if (currentScreen !== 5) {
    console.log('🍎 ConversationScreen - Not rendering, screen:', currentScreen);
    return null;
  }

  console.log('🍎 ConversationScreen - RENDERING for screen 5, initialized:', isInitialized);

  return (
    <div 
      ref={screenRef}
      className="w-full h-full ios-conversation-screen-container"
      style={{
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        minHeight: '500px',
        transform: 'translateZ(0)',
        position: 'relative',
        zIndex: 10
      }}
    >
      <AnimatedCard 
        isVisible={true} 
        className="h-full flex flex-col ios-conversation-fix"
      >
        <div className="space-y-4 flex flex-col h-full text-sm">
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
      </AnimatedCard>
    </div>
  );
};

export default ConversationScreen;
