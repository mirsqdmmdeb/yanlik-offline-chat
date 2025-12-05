import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { FavoriteMessage, useFavorites } from '@/hooks/useFavorites';
import { Star, Trash2, Search, Copy, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FavoritesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FavoritesPanel = ({ isOpen, onClose }: FavoritesPanelProps) => {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredFavorites = favorites.filter(fav =>
    fav.content.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({
      title: 'Kopyalandı',
      description: 'Mesaj panoya kopyalandı.',
    });
  };

  const handleDelete = (id: string) => {
    removeFavorite(id);
    toast({
      title: 'Silindi',
      description: 'Favori mesaj silindi.',
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border shadow-xl animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <h2 className="text-lg font-semibold">Favoriler</h2>
              <span className="text-sm text-muted-foreground">({favorites.length})</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Favorilerde ara..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Favorites List */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-3">
              {filteredFavorites.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {search ? 'Sonuç bulunamadı' : 'Henüz favori mesaj yok'}
                </div>
              ) : (
                filteredFavorites.map((fav) => (
                  <div
                    key={fav.id}
                    className="p-4 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        fav.role === 'user' 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-secondary text-secondary-foreground'
                      }`}>
                        {fav.role === 'user' ? 'Sen' : 'Yanlik'}
                      </span>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleCopy(fav.content, fav.id)}
                        >
                          {copiedId === fav.id ? (
                            <Check className="h-3.5 w-3.5 text-green-500" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(fav.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm line-clamp-4 mb-2">{fav.content}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(fav.savedAt)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Footer */}
          {favorites.length > 0 && (
            <div className="p-4 border-t border-border">
              <Button
                variant="outline"
                className="w-full text-destructive hover:text-destructive"
                onClick={() => {
                  clearFavorites();
                  toast({
                    title: 'Temizlendi',
                    description: 'Tüm favoriler silindi.',
                  });
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Tümünü Temizle
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
