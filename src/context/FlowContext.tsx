
import React from 'react';
import { NavigationProvider } from './NavigationContext';
import { EmotionProvider } from './EmotionContext';
import { CelebrationProvider } from './CelebrationContext';
import { UserDataProvider } from './UserDataContext';
import { useFlowContext } from '@/hooks/useFlowContext';

export { useFlowContext };

export const FlowProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <NavigationProvider>
      <EmotionProvider>
        <CelebrationProvider>
          <UserDataProvider>
            {children}
          </UserDataProvider>
        </CelebrationProvider>
      </EmotionProvider>
    </NavigationProvider>
  );
};
