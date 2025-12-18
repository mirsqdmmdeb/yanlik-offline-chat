import { useState, useEffect, useCallback } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Timer } from 'lucide-react';

const TIMEOUT_DURATION = 30 * 60 * 1000; // 30 minutes
const WARNING_DURATION = 60 * 1000; // 1 minute warning

interface SessionTimeoutProps {
  onTimeout?: () => void;
  enabled?: boolean;
}

export const SessionTimeout = ({ onTimeout, enabled = true }: SessionTimeoutProps) => {
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const resetTimer = useCallback(() => {
    setLastActivity(Date.now());
    setShowWarning(false);
    setCountdown(60);
  }, []);

  const handleTimeout = useCallback(() => {
    // Clear sensitive data
    sessionStorage.clear();
    localStorage.removeItem('yanlik_session_disclaimer');
    
    if (onTimeout) {
      onTimeout();
    }
    
    setShowWarning(false);
  }, [onTimeout]);

  useEffect(() => {
    if (!enabled) return;

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    const handleActivity = () => {
      if (!showWarning) {
        setLastActivity(Date.now());
      }
    };

    events.forEach(event => {
      document.addEventListener(event, handleActivity);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [enabled, showWarning]);

  useEffect(() => {
    if (!enabled) return;

    const checkInterval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastActivity;

      if (elapsed >= TIMEOUT_DURATION - WARNING_DURATION && !showWarning) {
        setShowWarning(true);
      }

      if (elapsed >= TIMEOUT_DURATION) {
        handleTimeout();
      }
    }, 1000);

    return () => clearInterval(checkInterval);
  }, [enabled, lastActivity, showWarning, handleTimeout]);

  useEffect(() => {
    if (!showWarning) return;

    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [showWarning, handleTimeout]);

  if (!enabled) return null;

  return (
    <AlertDialog open={showWarning}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Timer className="w-6 h-6 text-yellow-500" />
            </div>
            <AlertDialogTitle>Oturum Zaman Aşımı</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="space-y-3">
            <p>
              Uzun süredir işlem yapmadınız. Güvenliğiniz için oturumunuz 
              <strong className="text-foreground"> {countdown} saniye</strong> içinde sonlandırılacak.
            </p>
            <p className="text-sm text-muted-foreground">
              Devam etmek için "Devam Et" butonuna tıklayın.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={resetTimer} className="w-full">
            Devam Et
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SessionTimeout;
