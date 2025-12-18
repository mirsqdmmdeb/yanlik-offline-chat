import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle } from 'lucide-react';

const DISCLAIMER_KEY = 'yanlik_disclaimer_accepted';
const SESSION_KEY = 'yanlik_session_disclaimer';

export const AIDisclaimerModal = () => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Check if already accepted this session
    const sessionAccepted = sessionStorage.getItem(SESSION_KEY);
    if (!sessionAccepted) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    if (checked) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      localStorage.setItem(DISCLAIMER_KEY, new Date().toISOString());
      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
            </div>
            <AlertDialogTitle className="text-xl">Önemli Uyarı</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-left space-y-3">
            <p>
              <strong>Yanlik bir demo yapay zeka asistanıdır.</strong> Aşağıdaki hususları kabul etmeniz gerekmektedir:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>AI hata yapabilir ve yanıltıcı bilgi verebilir</li>
              <li>Tıbbi, hukuki veya finansal tavsiye yerine geçmez</li>
              <li>Üretilen içeriklerin doğruluğunu kendiniz teyit edin</li>
              <li>Verileriniz yalnızca cihazınızda işlenir</li>
            </ul>
            <p className="text-xs text-muted-foreground">
              mirsqdmmdevs, AI çıktılarından kaynaklanan hatalardan sorumlu tutulamaz.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center space-x-2 py-4">
          <Checkbox 
            id="disclaimer" 
            checked={checked} 
            onCheckedChange={(c) => setChecked(c === true)} 
          />
          <label
            htmlFor="disclaimer"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Yukarıdaki uyarıları okudum ve kabul ediyorum
          </label>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction 
            onClick={handleAccept} 
            disabled={!checked}
            className="w-full"
          >
            Devam Et
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AIDisclaimerModal;
