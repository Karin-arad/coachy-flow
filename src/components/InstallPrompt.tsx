import React, { useEffect, useState } from 'react';
import { Share, SquarePlus } from 'lucide-react';

const SEEN_KEY = 'coachy_install_prompt_seen';

const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  // iOS Safari reports an installed web app this way
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  // iPadOS identifies as a Mac with a touch screen
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

const alreadySeen = () => {
  try {
    return localStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return true; // no storage: don't nag on every visit
  }
};

/**
 * Offered once, on the first visit, and never inside the installed app.
 * Android/Chrome can install from the button. iOS has no install API,
 * so there the sheet shows the two steps to do it by hand.
 */
const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [showIosSteps, setShowIosSteps] = useState(false);
  const ios = isIOS();

  useEffect(() => {
    if (isStandalone() || alreadySeen()) return;

    if (ios) {
      setVisible(true);
      return;
    }

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall);
  }, [ios]);

  const close = () => {
    try {
      localStorage.setItem(SEEN_KEY, '1');
    } catch {
      // ignore
    }
    setVisible(false);
  };

  const save = async () => {
    if (ios) {
      setShowIosSteps(true);
      return;
    }
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
    }
    close();
  };

  if (!visible) return null;

  return (
    <div className="install-sheet" role="dialog" aria-label="שמירה למסך הבית">
      <div className="flex items-center gap-3">
        <img src="/icons/icon-192.png" alt="" width={56} height={56} className="rounded-[14px] flex-shrink-0" />
        <div>
          <p className="t-label !text-[18px] !font-semibold">לשמור את קואצ'י במסך הבית?</p>
          <p className="t-label !font-normal">ככה האימון הבא במרחק נגיעה</p>
        </div>
      </div>

      {showIosSteps ? (
        <>
          <ol className="flex flex-col gap-2 t-label !font-normal">
            <li className="flex items-center gap-2">
              <Share size={20} aria-hidden="true" className="flex-shrink-0" />
              <span>לוחצים על כפתור השיתוף בתחתית הדפדפן</span>
            </li>
            <li className="flex items-center gap-2">
              <SquarePlus size={20} aria-hidden="true" className="flex-shrink-0" />
              <span>בוחרים "הוספה למסך הבית"</span>
            </li>
          </ol>
          <button type="button" className="btn-primary !flex-none w-full" onClick={close}>
            הבנתי
          </button>
        </>
      ) : (
        <div className="screen-actions">
          <button type="button" className="btn-secondary !bg-[rgba(23,21,59,0.08)]" onClick={close}>
            לא עכשיו
          </button>
          <button type="button" className="btn-primary" onClick={save}>
            שמירה למסך הבית
          </button>
        </div>
      )}
    </div>
  );
};

export default InstallPrompt;
