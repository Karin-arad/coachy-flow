
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  OPENAI_API_KEY_STORAGE, 
  YOUTUBE_API_KEY_STORAGE,
  hasOpenAIApiKey,
  hasYouTubeApiKey,
  getOpenAIApiKey,
  getYouTubeApiKey
} from '@/utils/apiHelpers';
import { API_KEYS } from '@/config/apiKeys';

export const useApiKeys = () => {
  const [openaiKey, setOpenaiKey] = useState('');
  const [youtubeKey, setYoutubeKey] = useState('');
  const [hasOpenAIKey, setHasOpenAIKey] = useState(false);
  const [hasYouTubeKey, setHasYouTubeKey] = useState(false);
  const [isUsingGlobalOpenAIKey, setIsUsingGlobalOpenAIKey] = useState(false);
  const [isUsingGlobalYouTubeKey, setIsUsingGlobalYouTubeKey] = useState(false);
  const { toast } = useToast();

  // Check for existing API keys
  const checkKeys = () => {
    const hasOpenAI = hasOpenAIApiKey();
    const hasYouTube = hasYouTubeApiKey();
    
    setHasOpenAIKey(hasOpenAI);
    setHasYouTubeKey(hasYouTube);
    
    // Check if using global keys from config
    const openaiLocalKey = localStorage.getItem(OPENAI_API_KEY_STORAGE);
    const youtubeLocalKey = localStorage.getItem(YOUTUBE_API_KEY_STORAGE);
    
    setIsUsingGlobalOpenAIKey(hasOpenAI && !openaiLocalKey);
    setIsUsingGlobalYouTubeKey(hasYouTube && !youtubeLocalKey);
  };

  // Save OpenAI API key
  const saveOpenAIKey = () => {
    if (!openaiKey.trim()) {
      toast({
        title: "שגיאה",
        description: "אנא הכנס מפתח API תקין",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem(OPENAI_API_KEY_STORAGE, openaiKey);
    setHasOpenAIKey(true);
    setIsUsingGlobalOpenAIKey(false);
    setOpenaiKey('');
    
    toast({
      title: "נשמר בהצלחה",
      description: "מפתח ה-API של OpenAI נשמר במכשיר שלך",
      variant: "default"
    });
  };

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
  };

  // Remove OpenAI API key
  const removeOpenAIKey = () => {
    localStorage.removeItem(OPENAI_API_KEY_STORAGE);
    const hasGlobalKey = API_KEYS.OPENAI !== "";
    setHasOpenAIKey(hasGlobalKey);
    setIsUsingGlobalOpenAIKey(hasGlobalKey);
    setOpenaiKey('');
    
    toast({
      title: "הוסר",
      description: "מפתח ה-API האישי של OpenAI הוסר מהמכשיר שלך" + 
        (hasGlobalKey ? ". משתמש כעת במפתח הגלובלי" : ""),
      variant: "default"
    });
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
  };

  return {
    openaiKey,
    setOpenaiKey,
    youtubeKey,
    setYoutubeKey,
    hasOpenAIKey,
    hasYouTubeKey,
    isUsingGlobalOpenAIKey,
    isUsingGlobalYouTubeKey,
    checkKeys,
    saveOpenAIKey,
    saveYouTubeKey,
    removeOpenAIKey,
    removeYouTubeKey
  };
};
