
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface APIKeyInputProps {
  onClose?: () => void;
}

const APIKeyInput = ({ onClose }: APIKeyInputProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openaiKey, setOpenaiKey] = useState('');
  const [youtubeKey, setYoutubeKey] = useState('');
  const [hasOpenAIKey, setHasOpenAIKey] = useState(false);
  const [hasYouTubeKey, setHasYouTubeKey] = useState(false);
  const [isUsingGlobalOpenAIKey, setIsUsingGlobalOpenAIKey] = useState(false);
  const [isUsingGlobalYouTubeKey, setIsUsingGlobalYouTubeKey] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if API keys exist in localStorage on component mount
    const checkKeys = () => {
      setHasOpenAIKey(hasOpenAIApiKey());
      setHasYouTubeKey(hasYouTubeApiKey());
      
      // Check if using global keys from config
      const openaiLocalKey = localStorage.getItem(OPENAI_API_KEY_STORAGE);
      const youtubeLocalKey = localStorage.getItem(YOUTUBE_API_KEY_STORAGE);
      
      setIsUsingGlobalOpenAIKey(hasOpenAIApiKey() && !openaiLocalKey);
      setIsUsingGlobalYouTubeKey(hasYouTubeApiKey() && !youtubeLocalKey);
    };
    
    checkKeys();
  }, [isOpen]);

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

  const removeOpenAIKey = () => {
    localStorage.removeItem(OPENAI_API_KEY_STORAGE);
    const hasGlobalKey = API_KEYS.OPENAI !== "your-openai-api-key-here";
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

  const removeYouTubeKey = () => {
    localStorage.removeItem(YOUTUBE_API_KEY_STORAGE);
    const hasGlobalKey = API_KEYS.YOUTUBE !== "your-youtube-api-key-here";
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

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(true)}
        className="text-xs px-3 py-1 h-8 bg-white/80 border border-gray-200 shadow-sm hover:bg-white fixed top-3 right-3 z-50 rtl:right-auto rtl:left-3"
      >
        {hasOpenAIKey || hasYouTubeKey ? "עדכון מפתחות API" : "הגדרת מפתחות API"}
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>מפתחות API</DialogTitle>
            <DialogDescription>
              הכנס את מפתחות ה-API כדי לאפשר פונקציונליות של בינה מלאכותית ושירותי YouTube.
              המפתחות יישמרו באופן מקומי במכשיר שלך בלבד.
              {(isUsingGlobalOpenAIKey || isUsingGlobalYouTubeKey) && 
                " כרגע משתמש במפתחות גלובליים שהוגדרו על ידי מנהל האפליקציה."}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="openai" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="openai">OpenAI</TabsTrigger>
              <TabsTrigger value="youtube">YouTube</TabsTrigger>
            </TabsList>
            
            <TabsContent value="openai" className="mt-4">
              <div className="grid gap-2">
                <Label htmlFor="openaiKey">מפתח API של OpenAI</Label>
                {isUsingGlobalOpenAIKey && (
                  <div className="text-sm text-green-600 mb-2">
                    משתמש במפתח גלובלי של האפליקציה
                  </div>
                )}
                <Input
                  id="openaiKey"
                  type="password"
                  placeholder="sk-..."
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  className="font-mono text-sm"
                  dir="ltr"
                />
                <div className="flex justify-between mt-2">
                  {hasOpenAIKey && !isUsingGlobalOpenAIKey && (
                    <Button variant="outline" type="button" onClick={removeOpenAIKey}>
                      הסרת מפתח
                    </Button>
                  )}
                  <Button type="button" onClick={saveOpenAIKey}>
                    שמירה
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="youtube" className="mt-4">
              <div className="grid gap-2">
                <Label htmlFor="youtubeKey">מפתח API של YouTube</Label>
                {isUsingGlobalYouTubeKey && (
                  <div className="text-sm text-green-600 mb-2">
                    משתמש במפתח גלובלי של האפליקציה
                  </div>
                )}
                <Input
                  id="youtubeKey"
                  type="password"
                  placeholder="AIza..."
                  value={youtubeKey}
                  onChange={(e) => setYoutubeKey(e.target.value)}
                  className="font-mono text-sm"
                  dir="ltr"
                />
                <div className="flex justify-between mt-2">
                  {hasYouTubeKey && !isUsingGlobalYouTubeKey && (
                    <Button variant="outline" type="button" onClick={removeYouTubeKey}>
                      הסרת מפתח
                    </Button>
                  )}
                  <Button type="button" onClick={saveYouTubeKey}>
                    שמירה
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-4">
            <Button type="button" onClick={handleClose} variant="outline">
              סגירה
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default APIKeyInput;
