
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      toast({
        title: "התקנה",
        description: "האפליקציה כבר מותקנת או שההתקנה אינה זמינה כרגע",
      });
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      toast({
        title: "תודה!",
        description: "האפליקציה מותקנת בהצלחה",
      });
    }
    
    setDeferredPrompt(null);
  };

  if (!deferredPrompt) return null;

  return (
    <Button
      onClick={handleInstallClick}
      variant="calm"
      size="sm"
      className="fixed top-5 left-5 z-50 gap-2 rtl:left-auto rtl:right-5"
    >
      <Download className="h-4 w-4" />
      <span>התקן את האפליקציה</span>
    </Button>
  );
};

export default InstallButton;
