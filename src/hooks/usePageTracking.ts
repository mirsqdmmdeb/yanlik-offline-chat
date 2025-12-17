import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';

const pageNames: Record<string, string> = {
  '/': 'Ana Sayfa',
  '/login': 'Giriş',
  '/chat': 'Sohbet',
  '/settings': 'Ayarlar',
  '/about': 'Hakkında',
  '/admin': 'Admin Paneli',
  '/privacy': 'Gizlilik Politikası',
  '/terms': 'Kullanım Koşulları',
};

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const pageName = pageNames[location.pathname] || location.pathname;
    trackPageView(location.pathname, pageName);
  }, [location.pathname]);
};

export default usePageTracking;
