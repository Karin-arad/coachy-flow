
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApiKeys } from '@/hooks/useApiKeys';
import OpenAITab from './api-key-tabs/OpenAITab';
import YouTubeTab from './api-key-tabs/YouTubeTab';

interface APIKeyInputProps {
  onClose?: () => void;
}

const APIKeyInput = ({ onClose }: APIKeyInputProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
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
  } = useApiKeys();

  // Show dialog automatically if no API keys are set and check keys on component mount
  useEffect(() => {
    checkKeys();
    
    // Auto-open dialog if no OpenAI key is set
    if (!hasOpenAIKey) {
      setIsOpen(true);
    }
  }, []);
  
  // Re-check keys when dialog opens
  useEffect(() => {
    if (isOpen) {
      checkKeys();
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <>
      <Button 
        variant={hasOpenAIKey ? "outline" : "destructive"}
        onClick={() => setIsOpen(true)}
        className="text-xs px-3 py-1 h-8 bg-white/80 border border-gray-200 shadow-sm hover:bg-white fixed top-3 right-3 z-50 rtl:right-auto rtl:left-3"
      >
        {hasOpenAIKey ? "עדכון מפתחות API" : "⚠️ נדרש מפתח API"}
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
              <OpenAITab 
                openaiKey={openaiKey}
                setOpenaiKey={setOpenaiKey}
                isUsingGlobalOpenAIKey={isUsingGlobalOpenAIKey}
                hasOpenAIKey={hasOpenAIKey}
                saveOpenAIKey={saveOpenAIKey}
                removeOpenAIKey={removeOpenAIKey}
              />
            </TabsContent>
            
            <TabsContent value="youtube" className="mt-4">
              <YouTubeTab 
                youtubeKey={youtubeKey}
                setYoutubeKey={setYoutubeKey}
                isUsingGlobalYouTubeKey={isUsingGlobalYouTubeKey}
                hasYouTubeKey={hasYouTubeKey}
                saveYouTubeKey={saveYouTubeKey}
                removeYouTubeKey={removeYouTubeKey}
              />
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-4">
            <Button type="button" onClick={handleClose} variant={hasOpenAIKey ? "outline" : "default"}>
              {hasOpenAIKey ? "סגירה" : "המשך ללא מפתח API"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default APIKeyInput;
