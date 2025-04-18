
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  YOUTUBE_API_KEY_STORAGE,
  hasYouTubeApiKey,
  getYouTubeApiKey
} from '@/utils/apiHelpers';
import { API_KEYS } from '@/config/apiKeys';

export const useApiKeys = () => {
  const [youtubeKey, setYoutubeKey] = useState('');
  const [hasYouTubeKey, setHasYouTubeKey] = useState(false);
  const [isUsingGlobalYouTubeKey, setIsUsingGlobalYouTubeKey] = useState(false);
  const { toast } = useToast();

  // Check for existing YouTube API keys
  const checkKeys = () => {
    const hasYouTube = hasYouTubeApiKey();
    
    setHasYouTubeKey(hasYouTube);
    
    // Check if using global keys from config
    const youtubeLocalKey = localStorage.getItem(YOUTUBE_API_KEY_STORAGE);
    
    setIsUsingGlobalYouTubeKey(hasYouTube && !youtubeLocalKey);
  };

  // Initialize and check keys when component mounts
  useEffect(() => {
    checkKeys();
    
    const handleStorageChange = () => {
      checkKeys();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Save YouTube API key
  const saveYouTubeKey = () => {
    if (!youtubeKey.trim()) {
      toast({
        title: "שגיאה",
        description: "אנא הכנס מפתח API תקין",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem(YOUTUBE_API_KEY_STORAGE, youtubeKey);
    setHasYouTubeKey(true);
    setIsUsingGlobalYouTubeKey(false);
    setYoutubeKey('');
    
    toast({
      title: "נשמר בהצלחה",
      description: "מפתח ה-API של YouTube נשמר במכשיר שלך",
      variant: "default"
    });
    
    checkKeys();
  };

  // Remove YouTube API key
  const removeYouTubeKey = () => {
    localStorage.removeItem(YOUTUBE_API_KEY_STORAGE);
    const hasGlobalKey = API_KEYS.YOUTUBE !== "";
    setHasYouTubeKey(hasGlobalKey);
    setIsUsingGlobalYouTubeKey(hasGlobalKey);
    setYoutubeKey('');
    
    toast({
      title: "הוסר",
      description: "מפתח ה-API האישי של YouTube הוסר מהמכשיר שלך" + 
        (hasGlobalKey ? ". משתמש כעת במפתח הגלובלי" : ""),
      variant: "default"
    });
    
    checkKeys();
  };

  return {
    youtubeKey,
    setYoutubeKey,
    hasYouTubeKey,
    isUsingGlobalYouTubeKey,
    checkKeys,
    saveYouTubeKey,
    removeYouTubeKey
  };
};

