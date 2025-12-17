// Google Analytics Helper Functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GA_MEASUREMENT_ID = 'G-SXHEP649B8';

// Check if user has consented to cookies
export const hasConsent = (): boolean => {
  return localStorage.getItem('cookie-consent') === 'accepted';
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  if (!hasConsent() || typeof window.gtag !== 'function') return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title || document.title,
  });
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (!hasConsent() || typeof window.gtag !== 'function') return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Pre-defined event helpers
export const analytics = {
  // Chat events
  chatMessageSent: (messageLength: number) => 
    trackEvent('message_sent', 'chat', 'user_message', messageLength),
  
  chatNewConversation: () => 
    trackEvent('new_conversation', 'chat'),
  
  chatVoiceUsed: () => 
    trackEvent('voice_input', 'chat'),
  
  // User events
  userLogin: () => 
    trackEvent('login', 'user'),
  
  userSignup: () => 
    trackEvent('signup', 'user'),
  
  userLogout: () => 
    trackEvent('logout', 'user'),
  
  // Feature usage
  themeChanged: (theme: string) => 
    trackEvent('theme_change', 'settings', theme),
  
  languageChanged: (lang: string) => 
    trackEvent('language_change', 'settings', lang),
  
  searchUsed: () => 
    trackEvent('search', 'feature'),
  
  favoriteAdded: () => 
    trackEvent('favorite_added', 'feature'),
  
  // Navigation
  pageView: (pageName: string) => 
    trackPageView(window.location.pathname, pageName),
};

export default analytics;
