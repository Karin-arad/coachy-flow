
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApiKeys } from '@/hooks/useApiKeys';
import YouTubeTab from './api-key-tabs/YouTubeTab';

const APIKeyInput = ({ onClose }: { onClose?: () => void }) => {
  const [isOpen, setIsOpen] = useState(true);
  const {
    youtubeKey,
    setYoutubeKey,
    hasYouTubeKey,
    isUsingGlobalYouTubeKey,
    checkKeys,
    saveYouTubeKey,
    removeYouTubeKey
  } = useApiKeys();

  // Always consider OpenAI key as set for this custom server
  const hasOpenAIKey = true;
  const isUsingGlobalOpenAIKey = false;

  // No need to check OpenAI keys
  useEffect(() => {
    checkKeys();
  }, []);
  
  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open && onClose) onClose();
    }}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle>מפתחות API</DialogTitle>
          <DialogDescription>
            הכנס את מפתחות ה-API כדי לאפשר פונקציונליות של YouTube.
            המפתחות יישמרו באופן מקומי במכשיר שלך בלבד.
            {isUsingGlobalYouTubeKey && " כרגע משתמש במפתחות גלובליים שהוגדרו על ידי מנהל האפליקציה."}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="youtube" className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="youtube">YouTube</TabsTrigger>
          </TabsList>
          
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
          <Button type="button" onClick={handleClose} variant="default">
            סגירה
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default APIKeyInput;
