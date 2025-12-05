import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Search, MessageSquare, Calendar, User, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface SearchResult {
  message: Message;
  index: number;
  matchStart: number;
  matchEnd: number;
}

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  onNavigateToMessage?: (index: number) => void;
}

export const SearchDialog = ({ isOpen, onClose, messages, onNavigateToMessage }: SearchDialogProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const search = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    const searchResults: SearchResult[] = [];

    messages.forEach((message, index) => {
      const lowerContent = message.content.toLowerCase();
      const matchStart = lowerContent.indexOf(lowerQuery);
      
      if (matchStart !== -1) {
        searchResults.push({
          message,
          index,
          matchStart,
          matchEnd: matchStart + searchQuery.length,
        });
      }
    });

    setResults(searchResults);
  }, [messages]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      search(query);
    }, 200);

    return () => clearTimeout(debounce);
  }, [query, search]);

  const highlightText = (text: string, start: number, end: number) => {
    const before = text.slice(0, start);
    const match = text.slice(start, end);
    const after = text.slice(end);

    // Truncate if too long
    const maxLength = 150;
    let displayBefore = before;
    let displayAfter = after;

    if (before.length > 50) {
      displayBefore = '...' + before.slice(-50);
    }
    if (after.length > 50) {
      displayAfter = after.slice(0, 50) + '...';
    }

    return (
      <span>
        {displayBefore}
        <mark className="bg-primary/30 text-foreground px-0.5 rounded">{match}</mark>
        {displayAfter}
      </span>
    );
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Konuşma Geçmişinde Ara
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Mesajlarda ara..."
              className="pl-10"
              autoFocus
            />
          </div>

          {/* Results Count */}
          {query && (
            <p className="text-sm text-muted-foreground">
              {results.length} sonuç bulundu
            </p>
          )}

          {/* Results */}
          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {results.length === 0 && query ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Sonuç bulunamadı</p>
                </div>
              ) : (
                results.map((result, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onNavigateToMessage?.(result.index);
                      onClose();
                    }}
                    className="w-full text-left p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {result.message.role === 'user' ? (
                        <User className="h-4 w-4 text-primary" />
                      ) : (
                        <Bot className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="text-sm font-medium">
                        {result.message.role === 'user' ? 'Sen' : 'Yanlik'}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(result.message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {highlightText(result.message.content, result.matchStart, result.matchEnd)}
                    </p>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Keyboard Shortcuts */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
            <span>ESC ile kapat</span>
            <span>Ctrl+K ile aç</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
