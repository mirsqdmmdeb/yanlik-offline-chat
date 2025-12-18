import { dbManager } from '@/lib/indexedDB';

export interface ExportData {
  exportDate: string;
  version: string;
  user: {
    id: string;
    username: string;
  };
  conversations: any[];
  settings: Record<string, any>;
  favorites: any[];
  analytics: any;
}

export const exportUserData = async (userId: string, username: string): Promise<ExportData> => {
  // Get conversations
  const conversations = await dbManager.getConversationsByUser(userId);
  
  // Get settings from localStorage
  const settings: Record<string, any> = {};
  const settingsKeys = [
    'yanlik_settings',
    'yanlik_theme',
    'yanlik_color_theme',
    'cookie-consent',
  ];
  
  settingsKeys.forEach(key => {
    const value = localStorage.getItem(key);
    if (value) {
      try {
        settings[key] = JSON.parse(value);
      } catch {
        settings[key] = value;
      }
    }
  });

  // Get favorites
  let favorites = [];
  const favoritesData = localStorage.getItem('yanlik_favorites');
  if (favoritesData) {
    try {
      favorites = JSON.parse(favoritesData);
    } catch {
      favorites = [];
    }
  }

  // Get analytics (anonymized)
  let analytics = null;
  const analyticsData = localStorage.getItem('yanlik_analytics');
  if (analyticsData) {
    try {
      analytics = JSON.parse(analyticsData);
    } catch {
      analytics = null;
    }
  }

  return {
    exportDate: new Date().toISOString(),
    version: '1.0.0',
    user: {
      id: userId,
      username: username,
    },
    conversations: conversations.map(conv => ({
      id: conv.id,
      title: conv.title,
      messageCount: conv.messages.length,
      messages: conv.messages,
      createdAt: conv.createdAt,
      updatedAt: conv.updatedAt,
    })),
    settings,
    favorites,
    analytics,
  };
};

export const downloadExportData = async (userId: string, username: string): Promise<void> => {
  const data = await exportUserData(userId, username);
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `yanlik-verilerim-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  URL.revokeObjectURL(url);
};

export const clearAllUserData = async (): Promise<void> => {
  // Clear localStorage
  const keysToKeep = ['yanlik_age_verified']; // Keep age verification
  const allKeys = Object.keys(localStorage);
  
  allKeys.forEach(key => {
    if (key.startsWith('yanlik_') && !keysToKeep.includes(key)) {
      localStorage.removeItem(key);
    }
  });
  
  // Also clear other app-related keys
  localStorage.removeItem('cookie-consent');
  
  // Clear IndexedDB
  try {
    const dbs = await indexedDB.databases();
    for (const db of dbs) {
      if (db.name && db.name.startsWith('yanlik')) {
        indexedDB.deleteDatabase(db.name);
      }
    }
  } catch (e) {
    console.error('Failed to clear IndexedDB', e);
  }
  
  // Clear sessionStorage
  sessionStorage.clear();
};

export default {
  exportUserData,
  downloadExportData,
  clearAllUserData,
};
