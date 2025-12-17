import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const { i18n } = useTranslation();
  const isTurkish = i18n.language === 'tr';

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    // Reload to enable analytics
    window.location.reload();
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-4xl mx-auto bg-card/95 backdrop-blur-lg border border-border rounded-xl p-4 md:p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-3 text-primary">
            <Cookie className="w-8 h-8 shrink-0" />
          </div>
          
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-foreground">
              {isTurkish ? 'Çerez Kullanımı' : 'Cookie Usage'}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isTurkish 
                ? 'Bu web sitesi, deneyiminizi geliştirmek ve site trafiğini analiz etmek için çerezler kullanmaktadır. KVKK ve GDPR kapsamında, çerez kullanımına izin vermenizi rica ediyoruz. Detaylı bilgi için Gizlilik Politikamızı inceleyebilirsiniz.'
                : 'This website uses cookies to improve your experience and analyze site traffic. Under KVKK and GDPR regulations, we request your consent for cookie usage. Please review our Privacy Policy for more details.'}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReject}
              className="flex-1 md:flex-none"
            >
              {isTurkish ? 'Reddet' : 'Reject'}
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="flex-1 md:flex-none bg-primary hover:bg-primary/90"
            >
              {isTurkish ? 'Kabul Et' : 'Accept'}
            </Button>
          </div>

          <button
            onClick={handleReject}
            className="absolute top-2 right-2 md:static p-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
