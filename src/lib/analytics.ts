// Google Analytics Helper Functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GA_MEASUREMENT_ID = 'G-SXHEP649B8';
const LOCAL_ANALYTICS_KEY = 'yanlik_analytics';

interface LocalAnalytics {
  pageViews: { page: string; count: number }[];
  events: { name: string; count: number }[];
  totalPageViews: number;
  totalEvents: number;
}

// Get local analytics data
const getLocalAnalytics = (): LocalAnalytics => {
  try {
    const stored = localStorage.getItem(LOCAL_ANALYTICS_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to parse local analytics', e);
  }
  return { pageViews: [], events: [], totalPageViews: 0, totalEvents: 0 };
};

// Save local analytics data
const saveLocalAnalytics = (data: LocalAnalytics) => {
  try {
    localStorage.setItem(LOCAL_ANALYTICS_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save local analytics', e);
  }
};

// Track locally for admin dashboard
const trackLocalPageView = (page: string) => {
  const data = getLocalAnalytics();
  const existing = data.pageViews.find(p => p.page === page);
  if (existing) {
    existing.count++;
  } else {
    data.pageViews.push({ page, count: 1 });
  }
  data.totalPageViews++;
  saveLocalAnalytics(data);
};

const trackLocalEvent = (eventName: string) => {
  const data = getLocalAnalytics();
  const existing = data.events.find(e => e.name === eventName);
  if (existing) {
    existing.count++;
  } else {
    data.events.push({ name: eventName, count: 1 });
  }
  data.totalEvents++;
  // Keep only last 20 event types
  if (data.events.length > 20) {
    data.events = data.events.slice(-20);
  }
  saveLocalAnalytics(data);
};

// Check if user has consented to cookies
export const hasConsent = (): boolean => {
  return localStorage.getItem('cookie-consent') === 'accepted';
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  // Always track locally for admin dashboard
  trackLocalPageView(title || path);
  
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
  // Always track locally for admin dashboard
  trackLocalEvent(`${category}:${action}`);
  
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
