
import { useNavigationContext } from '@/context/NavigationContext';
import { useEmotionContext } from '@/context/EmotionContext';
import { useCelebrationContext } from '@/context/CelebrationContext';
import { useUserDataContext } from '@/context/UserDataContext';

export const useFlowContext = () => {
  const navigation = useNavigationContext();
  const emotion = useEmotionContext();
  const celebration = useCelebrationContext();
  const userData = useUserDataContext();
  
  return {
    ...navigation,
    ...emotion,
    ...celebration,
    ...userData,
  };
};
