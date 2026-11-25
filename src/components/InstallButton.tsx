
import React, { useEffect, useState } from 'react';
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
    <button
      type="button"
      onClick={handleInstallClick}
      className="icon-button"
      aria-label="התקנת האפליקציה"
    >
      <Download size={20} />
    </button>
  );
};

export default InstallButton;
