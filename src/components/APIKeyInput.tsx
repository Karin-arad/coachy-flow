
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { OPENAI_API_KEY_STORAGE } from '@/utils/apiHelpers';

interface APIKeyInputProps {
  onClose?: () => void;
}

const APIKeyInput = ({ onClose }: APIKeyInputProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [hasSavedKey, setHasSavedKey] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if API key exists in localStorage on component mount
    const savedKey = localStorage.getItem(OPENAI_API_KEY_STORAGE);
    if (savedKey) {
      setHasSavedKey(true);
      // For security, we don't display the actual key
      setApiKey(''); 
    }
  }, []);

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "שגיאה",
        description: "אנא הכנס מפתח API תקין",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem(OPENAI_API_KEY_STORAGE, apiKey);
    setHasSavedKey(true);
    setIsOpen(false);
    
    toast({
      title: "נשמר בהצלחה",
      description: "מפתח ה-API נשמר במכשיר שלך",
      variant: "default"
    });

    // Call onClose callback if provided
    onClose?.();
  };

  const removeApiKey = () => {
    localStorage.removeItem(OPENAI_API_KEY_STORAGE);
    setHasSavedKey(false);
    setApiKey('');
    
    toast({
      title: "הוסר",
      description: "מפתח ה-API הוסר מהמכשיר שלך",
      variant: "default"
    });
  };

  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(true)}
        className="text-xs px-3 py-1 h-8 bg-white/80 border border-gray-200 shadow-sm hover:bg-white fixed top-3 right-3 z-50 rtl:right-auto rtl:left-3"
      >
        {hasSavedKey ? "עדכון מפתח API" : "הגדרת מפתח API"}
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>מפתח API של OpenAI</DialogTitle>
            <DialogDescription>
              הכנס את מפתח ה-API של OpenAI כדי לאפשר פונקציונליות של בינה מלאכותית.
              המפתח יישמר באופן מקומי במכשיר שלך בלבד.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="apiKey">מפתח API</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="font-mono text-sm"
                dir="ltr"
              />
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between flex flex-row-reverse">
            {hasSavedKey && (
              <Button variant="outline" type="button" onClick={removeApiKey} className="ms-2">
                הסרת מפתח
              </Button>
            )}
            <div>
              <Button type="button" onClick={() => setIsOpen(false)} variant="outline" className="ml-2">
                ביטול
              </Button>
              <Button type="button" onClick={saveApiKey}>
                שמירה
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default APIKeyInput;
