import { useState, useEffect, useCallback } from 'react';

export interface FavoriteMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  savedAt: Date;
  conversationTitle?: string;
}

const FAVORITES_KEY = 'yanlik_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteMessage[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFavorites(parsed.map((f: any) => ({
          ...f,
          timestamp: new Date(f.timestamp),
          savedAt: new Date(f.savedAt),
        })));
      } catch (e) {
        console.error('Failed to load favorites', e);
      }
    }
  }, []);

  const saveFavorites = useCallback((newFavorites: FavoriteMessage[]) => {
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  }, []);

  const addFavorite = useCallback((message: Omit<FavoriteMessage, 'id' | 'savedAt'>) => {
    const newFavorite: FavoriteMessage = {
      ...message,
      id: `fav_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      savedAt: new Date(),
    };
    saveFavorites([newFavorite, ...favorites]);
    return newFavorite;
  }, [favorites, saveFavorites]);

  const removeFavorite = useCallback((id: string) => {
    saveFavorites(favorites.filter(f => f.id !== id));
  }, [favorites, saveFavorites]);

  const isFavorite = useCallback((content: string, timestamp: Date) => {
    return favorites.some(f => 
      f.content === content && 
      new Date(f.timestamp).getTime() === new Date(timestamp).getTime()
    );
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    saveFavorites([]);
  }, [saveFavorites]);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
  };
};
