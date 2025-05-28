
import React, { createContext, useContext, useState } from 'react';

interface UserDataContextType {
  timeAvailable: string;
  setTimeAvailable: (time: string) => void;
  workoutPreferences: string;
  setWorkoutPreferences: (preferences: string) => void;
  userConversation: string;
  setUserConversation: (conversation: string) => void;
}

const UserDataContext = createContext<UserDataContextType>({
  timeAvailable: '',
  setTimeAvailable: () => {},
  workoutPreferences: '',
  setWorkoutPreferences: () => {},
  userConversation: '',
  setUserConversation: () => {},
});

export const useUserDataContext = () => useContext(UserDataContext);

export const UserDataProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [timeAvailable, setTimeAvailable] = useState<string>('');
  const [workoutPreferences, setWorkoutPreferences] = useState<string>('');
  const [userConversation, setUserConversation] = useState<string>('');
  
  return (
    <UserDataContext.Provider 
      value={{
        timeAvailable,
        setTimeAvailable,
        workoutPreferences,
        setWorkoutPreferences,
        userConversation,
        setUserConversation,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
