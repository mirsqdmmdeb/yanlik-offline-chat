import { useState, useEffect, useCallback } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ExternalLink, Shield } from 'lucide-react';

interface ExternalLinkWarningProps {
  children?: React.ReactNode;
}

export const ExternalLinkWarning = ({ children }: ExternalLinkWarningProps) => {
  const [open, setOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  const isExternalLink = (url: string): boolean => {
    try {
      const linkUrl = new URL(url, window.location.origin);
      return linkUrl.origin !== window.location.origin;
    } catch {
      return false;
    }
  };

  const handleLinkClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    
    if (anchor && anchor.href && isExternalLink(anchor.href)) {
      e.preventDefault();
      setPendingUrl(anchor.href);
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, [handleLinkClick]);

  const handleConfirm = () => {
    if (pendingUrl) {
      window.open(pendingUrl, '_blank', 'noopener,noreferrer');
    }
    setOpen(false);
    setPendingUrl(null);
  };

  return (
    <>
      {children}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-yellow-500" />
              </div>
              <AlertDialogTitle>Harici Bağlantı</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="space-y-3">
              <p>
                <Shield className="inline w-4 h-4 mr-1" />
                <strong>Güvenlik Uyarısı:</strong> Yanlik dışında bir siteye yönlendiriliyorsunuz.
              </p>
              <div className="p-3 rounded-lg bg-secondary/50 break-all text-sm">
                {pendingUrl}
              </div>
              <p className="text-sm text-muted-foreground">
                Harici sitelerin içeriği üzerinde kontrolümüz yoktur. 
                Kişisel bilgilerinizi paylaşırken dikkatli olun.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingUrl(null)}>
              Vazgeç
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Devam Et
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ExternalLinkWarning;
