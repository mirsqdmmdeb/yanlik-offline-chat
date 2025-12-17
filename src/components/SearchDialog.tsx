import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MessageSquare, Calendar, User, Bot, Filter, X, ArrowUp, ArrowDown } from 'lucide-react';
import { analytics } from '@/lib/analytics';

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
  matchCount: number;
}

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  onNavigateToMessage?: (index: number) => void;
}

type FilterType = 'all' | 'user' | 'assistant';

export const SearchDialog = ({ isOpen, onClose, messages, onNavigateToMessage }: SearchDialogProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const filteredMessages = useMemo(() => {
    if (filter === 'all') return messages;
    return messages.filter(m => m.role === filter);
  }, [messages, filter]);

  const search = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }
    
    analytics.searchUsed();

    const lowerQuery = searchQuery.toLowerCase();
    const searchResults: SearchResult[] = [];

    filteredMessages.forEach((message) => {
      const originalIndex = messages.indexOf(message);
      const lowerContent = message.content.toLowerCase();
      
      // Find all matches
      let matchCount = 0;
      let pos = 0;
      while ((pos = lowerContent.indexOf(lowerQuery, pos)) !== -1) {
        matchCount++;
        pos += lowerQuery.length;
      }
      
      const matchStart = lowerContent.indexOf(lowerQuery);
      
      if (matchStart !== -1) {
        searchResults.push({
          message,
          index: originalIndex,
          matchStart,
          matchEnd: matchStart + searchQuery.length,
          matchCount,
        });
      }
    });

    // Sort by match count (most matches first), then by recency
    searchResults.sort((a, b) => {
      if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
      return b.index - a.index;
    });

    setResults(searchResults);
    setSelectedIndex(0);
  }, [filteredMessages, messages]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      search(query);
    }, 150);

    return () => clearTimeout(debounce);
  }, [query, search]);

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setFilter('all');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            onNavigateToMessage?.(results[selectedIndex].index);
            onClose();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onNavigateToMessage, onClose]);

  // Scroll selected item into view
  useEffect(() => {
    const selectedElement = resultsRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    selectedElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [selectedIndex]);

  const highlightAllMatches = (text: string, searchQuery: string) => {
    if (!searchQuery.trim()) return text;

    const lowerText = text.toLowerCase();
    const lowerQuery = searchQuery.toLowerCase();
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let matchIndex = 0;

    let pos = 0;
    while ((pos = lowerText.indexOf(lowerQuery, pos)) !== -1) {
      // Add text before match
      if (pos > lastIndex) {
        const before = text.slice(lastIndex, pos);
        // Truncate if too far from match
        if (before.length > 40 && matchIndex === 0) {
          parts.push('...' + before.slice(-40));
        } else {
          parts.push(before);
        }
      }

      // Add highlighted match
      parts.push(
        <mark key={`match-${matchIndex}`} className="bg-primary/30 text-foreground px-0.5 rounded font-medium">
          {text.slice(pos, pos + searchQuery.length)}
        </mark>
      );

      lastIndex = pos + searchQuery.length;
      pos = lastIndex;
      matchIndex++;
    }

    // Add remaining text
    const remaining = text.slice(lastIndex);
    if (remaining.length > 50) {
      parts.push(remaining.slice(0, 50) + '...');
    } else {
      parts.push(remaining);
    }

    return <>{parts}</>;
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffDays = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return messageDate.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Dün ' + messageDate.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 7) {
      return messageDate.toLocaleDateString('tr-TR', { weekday: 'short', hour: '2-digit', minute: '2-digit' });
    }
    
    return messageDate.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filterButtons: { type: FilterType; label: string; icon: React.ReactNode }[] = [
    { type: 'all', label: 'Tümü', icon: <MessageSquare className="h-3 w-3" /> },
    { type: 'user', label: 'Sen', icon: <User className="h-3 w-3" /> },
    { type: 'assistant', label: 'Yanlik', icon: <Bot className="h-3 w-3" /> },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Konuşma Geçmişinde Ara
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Mesajlarda ara..."
              className="pl-10 pr-10"
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                onClick={() => setQuery('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-1">
              {filterButtons.map(({ type, label, icon }) => (
                <Button
                  key={type}
                  variant={filter === type ? 'secondary' : 'ghost'}
                  size="sm"
                  className="h-7 text-xs gap-1"
                  onClick={() => setFilter(type)}
                >
                  {icon}
                  {label}
                </Button>
              ))}
            </div>
            {query && (
              <Badge variant="outline" className="ml-auto text-xs">
                {results.length} sonuç
              </Badge>
            )}
          </div>

          {/* Results */}
          <ScrollArea className="h-[400px] -mx-4 px-4">
            <div ref={resultsRef} className="space-y-2 py-1">
              {results.length === 0 && query ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">Sonuç bulunamadı</p>
                  <p className="text-sm mt-1">Farklı bir arama terimi deneyin</p>
                </div>
              ) : !query ? (
                <div className="text-center py-12 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">Aramaya başlayın</p>
                  <p className="text-sm mt-1">{messages.length} mesaj arasında arayın</p>
                </div>
              ) : (
                results.map((result, idx) => (
                  <button
                    key={`${result.index}-${idx}`}
                    data-index={idx}
                    onClick={() => {
                      onNavigateToMessage?.(result.index);
                      onClose();
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-150 ${
                      idx === selectedIndex 
                        ? 'bg-primary/10 border border-primary/30 shadow-sm' 
                        : 'bg-muted/50 hover:bg-muted border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      {result.message.role === 'user' ? (
                        <div className="flex items-center gap-1.5 text-primary">
                          <User className="h-3.5 w-3.5" />
                          <span className="text-xs font-medium">Sen</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Bot className="h-3.5 w-3.5" />
                          <span className="text-xs font-medium">Yanlik</span>
                        </div>
                      )}
                      <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto">
                        <Calendar className="h-3 w-3" />
                        {formatDate(result.message.timestamp)}
                      </span>
                      {result.matchCount > 1 && (
                        <Badge variant="secondary" className="text-[10px] h-4 px-1">
                          {result.matchCount}×
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-foreground/80 line-clamp-2">
                      {highlightAllMatches(result.message.content, query)}
                    </p>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Keyboard Shortcuts */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <ArrowUp className="h-3 w-3" /><ArrowDown className="h-3 w-3" /> gezin
              </span>
              <span>Enter seç</span>
            </div>
            <span>ESC kapat</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
