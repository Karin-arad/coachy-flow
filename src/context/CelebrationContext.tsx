
import React, { createContext, useContext, useState } from 'react';
import { CelebrationType } from '@/types/flow';

interface CelebrationContextType {
  celebrationType: CelebrationType;
  isCelebrating: boolean;
  triggerCelebration: (type: CelebrationType) => void;
}

const CelebrationContext = createContext<CelebrationContextType>({
  celebrationType: '',
  isCelebrating: false,
  triggerCelebration: () => {},
});

export const useCelebrationContext = () => useContext(CelebrationContext);

export const CelebrationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [celebrationType, setCelebrationType] = useState<CelebrationType>('');
  const [isCelebrating, setIsCelebrating] = useState<boolean>(false);
  
  const triggerCelebration = (type: CelebrationType) => {
    if (isCelebrating) return;
    
    setCelebrationType(type);
    setIsCelebrating(true);
    
    setTimeout(() => {
      setIsCelebrating(false);
      setCelebrationType('');
    }, 3000);
  };
  
  return (
    <CelebrationContext.Provider 
      value={{
        celebrationType,
        isCelebrating,
        triggerCelebration,
      }}
    >
      {children}
    </CelebrationContext.Provider>
  );
};
