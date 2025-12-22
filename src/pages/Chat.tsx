import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getChatResponse } from '@/lib/chatResponses';
import { getAdvancedAIResponse } from '@/lib/advancedAI';
import { getGPT6Response } from '@/lib/gpt6Engine';
import { LogOut, Settings, Menu, Info, Send, Sparkles, User, Bot, Trash2, Mic, MicOff, Volume2, VolumeX, Star, Search, Zap, Flag, ThumbsUp, ThumbsDown, Copy, Check, AlertTriangle, FileText, HelpCircle, Map, Activity, Code2 } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useVoiceChat } from '@/hooks/useVoiceChat';
import { useFavorites } from '@/hooks/useFavorites';
import { MessageRenderer } from '@/components/MessageRenderer';
import { FavoritesPanel } from '@/components/FavoritesPanel';
import { SearchDialog } from '@/components/SearchDialog';
import { ThemeSelector } from '@/components/ThemeSelector';
import { AbuseReportDialog } from '@/components/AbuseReportDialog';
import { analytics } from '@/lib/analytics';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  feedback?: 'positive' | 'negative';
}

const STORAGE_KEY = 'yanlik_chat_history';
const FEEDBACK_KEY = 'yanlik_message_feedback';

// Hassas veri kalıpları
const SENSITIVE_PATTERNS = [
  { pattern: /\b\d{11}\b/g, name: 'T.C. Kimlik No', description: '11 haneli kimlik numarası tespit edildi' },
  { pattern: /\b\d{16}\b/g, name: 'Kredi Kartı', description: '16 haneli kart numarası tespit edildi' },
  { pattern: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, name: 'Kredi Kartı', description: 'Kart numarası formatı tespit edildi' },
  { pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, name: 'E-posta', description: 'E-posta adresi tespit edildi' },
  { pattern: /\b05\d{9}\b/g, name: 'Telefon', description: 'Cep telefonu numarası tespit edildi' },
  { pattern: /\bTR\d{24}\b/gi, name: 'IBAN', description: 'IBAN numarası tespit edildi' },
];

const PROMPT_SUGGESTIONS = [
  'İstanbul hakkında bilgi ver',
  'Saat kaç?',
  '/kronometre başlat',
  '1500 TL 3 kişiye bölünürse kaç eder?',
  'Motivasyon ver',
  'Ne yapabilirsin?'
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [useAdvancedAI, setUseAdvancedAI] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showAbuseReport, setShowAbuseReport] = useState(false);
  const [reportingMessage, setReportingMessage] = useState<Message | null>(null);
  const [sensitiveWarning, setSensitiveWarning] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isListening, isSpeaking, interimTranscript, startListening, stopListening, speak, stopSpeaking } = useVoiceChat();
  const { addFavorite, isFavorite } = useFavorites();

  // Hassas veri kontrolü
  const checkSensitiveData = (text: string): string | null => {
    for (const { pattern, name, description } of SENSITIVE_PATTERNS) {
      if (pattern.test(text)) {
        pattern.lastIndex = 0; // Reset regex
        return `⚠️ ${name}: ${description}. Bu veriyi paylaşmak istemeyebilirsiniz.`;
      }
    }
    return null;
  };

  // Input değiştiğinde hassas veri kontrolü
  useEffect(() => {
    if (input.length > 5) {
      const warning = checkSensitiveData(input);
      setSensitiveWarning(warning);
    } else {
      setSensitiveWarning(null);
    }
  }, [input]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        setShowFavorites(true);
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, []);

  // Load messages from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.map((m: Message) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        })));
      } catch (e) {
        console.error('Failed to load chat history', e);
      }
    } else {
      setMessages([
          { 
          role: 'assistant', 
          content: '## 👋 Merhaba! Ben Yanlik - GPT-6 Offline AI\n\nTamamen tarayıcınızda çalışan gelişmiş yapay zeka. Cloud/API yok, internet gerekmez!\n\n**🌟 Öne Çıkan Yetenekler:**\n- 🇹🇷 **Türkiye & 81 İl** bilgisi\n- 🧮 **Hesap Makinesi** (matematiksel işlemler)\n- ⏰ **Saat/Tarih/Kronometre**\n- 💪 **Motivasyon** sözleri\n- 💻 **Programlama** (400+ kategori bilgi)\n- 📚 **Bilim, Coğrafya, Sanat**\n\n**⌨️ Komutlar:** /kronometre başlat, /stil formal, /memory add\n\n*Ctrl+K: Arama | Ctrl+F: Favoriler*\n\n_Üretici: mirsqdmmdevs_', 
          timestamp: new Date() 
        }
      ]);
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    // Hassas veri uyarısı varsa onay iste
    if (sensitiveWarning) {
      const confirmed = window.confirm(`${sensitiveWarning}\n\nYine de göndermek istiyor musunuz?`);
      if (!confirmed) return;
    }

    const userMessage: Message = { role: 'user', content: input, timestamp: new Date() };
    const currentInput = input;
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSensitiveWarning(null);
    setIsTyping(true);
    
    // Track message sent
    analytics.chatMessageSent(currentInput.length);

    setTimeout(() => inputRef.current?.focus(), 100);

    // Simulate thinking time based on message complexity
    const thinkingTime = Math.min(500 + currentInput.length * 5 + Math.random() * 800, 2000);

    setTimeout(() => {
      // Get conversation history for context
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      
      // Use GPT-6 engine - most advanced offline AI
      const response = useAdvancedAI 
        ? getGPT6Response(currentInput, history)
        : getChatResponse(currentInput);
      
      const assistantMessage: Message = { role: 'assistant', content: response, timestamp: new Date() };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      
      if (autoSpeak) {
        // Strip markdown for speech
        const cleanText = response.replace(/[#*`_\[\]()]/g, '').replace(/\n+/g, '. ');
        speak(cleanText);
      }
    }, thinkingTime);
  };

  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      const started = startListening(
        (text) => {
          setInput(prev => prev ? prev + ' ' + text : text);
          analytics.chatVoiceUsed();
          toast({
            title: 'Ses Algılandı',
            description: `"${text}"`,
          });
        },
        (interim) => {
          // Show interim results in real-time
          setInput(prev => {
            const base = prev.replace(/\s*\[.*\]$/, ''); // Remove previous interim
            return interim ? `${base} [${interim}]` : base;
          });
        }
      );
      
      if (!started) {
        toast({
          title: 'Hata',
          description: 'Mikrofon erişimi sağlanamadı. Tarayıcı izinlerini kontrol edin.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleSpeakMessage = (content: string) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const cleanText = content.replace(/[#*`_\[\]()]/g, '').replace(/\n+/g, '. ');
      speak(cleanText);
    }
  };

  const handleAddFavorite = (message: Message) => {
    if (isFavorite(message.content, message.timestamp)) {
      toast({
        title: 'Zaten Favorilerde',
        description: 'Bu mesaj zaten favorilerinizde.',
      });
      return;
    }
    
    addFavorite({
      content: message.content,
      role: message.role,
      timestamp: message.timestamp,
    });
    
    analytics.favoriteAdded();
    toast({
      title: 'Favorilere Eklendi',
      description: 'Mesaj favorilerinize kaydedildi.',
    });
  };

  const handleFeedback = (messageIndex: number, feedback: 'positive' | 'negative') => {
    setMessages(prev => prev.map((m, i) => 
      i === messageIndex ? { ...m, feedback } : m
    ));
    
    // Save feedback
    const feedbackData = JSON.parse(localStorage.getItem(FEEDBACK_KEY) || '[]');
    feedbackData.push({
      messageContent: messages[messageIndex].content.substring(0, 100),
      feedback,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedbackData));
    
    toast({
      title: feedback === 'positive' ? '👍 Teşekkürler!' : '👎 Geri bildirim alındı',
      description: feedback === 'positive' 
        ? 'Olumlu geri bildiriminiz için teşekkürler.' 
        : 'Daha iyi olmak için çalışacağız.',
    });
  };

  const handleCopyMessage = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    toast({
      title: 'Kopyalandı',
      description: 'Mesaj panoya kopyalandı.',
    });
  };

  const handleReportAbuse = (message: Message) => {
    setReportingMessage(message);
    setShowAbuseReport(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const clearChat = () => {
    setMessages([
      { 
        role: 'assistant', 
        content: '## 🚀 Yeni Sohbet\n\nSohbet temizlendi. Yeni bir konuşma başlayalım!\n\nSize nasıl yardımcı olabilirim?', 
        timestamp: new Date() 
      }
    ]);
    localStorage.removeItem(STORAGE_KEY);
    toast({
      title: 'Sohbet Temizlendi',
      description: 'Tüm mesajlar silindi.',
    });
  };

  const useSuggestion = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  };

  const Sidebar = () => (
    <div className="flex h-full flex-col bg-card/50 backdrop-blur-sm border-r border-border/50 p-4">
      <div className="mb-6 space-y-2 animate-fade-in">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Yanlik</h1>
            <p className="text-xs text-muted-foreground">GPT-6 Offline AI</p>
          </div>
        </div>
      </div>
      
      {/* AI Mode Toggle */}
      <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium flex items-center gap-1">
            <Zap className="h-4 w-4 text-primary" />
            Gelişmiş AI
          </span>
          <Button
            variant={useAdvancedAI ? "default" : "outline"}
            size="sm"
            className="h-6 text-xs"
            onClick={() => setUseAdvancedAI(!useAdvancedAI)}
          >
            {useAdvancedAI ? 'Açık' : 'Kapalı'}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {useAdvancedAI ? 'TR 81 il, hesap, kronometre, bilgi' : 'Temel cevaplar'}
        </p>
      </div>
      
      <div className="flex-1" />
      
      <div className="space-y-1">
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-primary/10 transition-all duration-200"
          onClick={() => setShowSearch(true)}
        >
          <Search className="mr-2 h-4 w-4" />
          Ara (Ctrl+K)
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-primary/10 transition-all duration-200"
          onClick={() => setShowFavorites(true)}
        >
          <Star className="mr-2 h-4 w-4" />
          Favoriler (Ctrl+F)
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-primary/10 transition-all duration-200"
          onClick={clearChat}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Sohbeti Temizle
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-primary/10 transition-all duration-200"
          onClick={() => navigate('/faq')}
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          SSS
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-primary/10 transition-all duration-200"
          onClick={() => navigate('/about')}
        >
          <Info className="mr-2 h-4 w-4" />
          Hakkında
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-primary/10 transition-all duration-200"
          onClick={() => navigate('/settings')}
        >
          <Settings className="mr-2 h-4 w-4" />
          Ayarlar
        </Button>
        {user?.isAdmin && (
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-primary/10 transition-all duration-200"
            onClick={() => navigate('/admin')}
          >
            <Settings className="mr-2 h-4 w-4" />
            Admin Panel
          </Button>
        )}
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:bg-destructive/10 transition-all duration-200"
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Çıkış Yap
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64">
        <Sidebar />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <Sidebar />
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold">Yanlik</h2>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  {useAdvancedAI && <Zap className="h-3 w-3 text-primary" />}
                  {useAdvancedAI ? 'Gelişmiş AI' : 'Temel Mod'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeSelector />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowSearch(true)}
              className="hidden sm:flex"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowFavorites(true)}
              className="hidden sm:flex"
            >
              <Star className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Prompt Suggestions (only show at start) */}
            {messages.length === 1 && (
              <div className="space-y-3 animate-fade-in">
                <p className="text-sm text-muted-foreground text-center">Örnek sorular:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {PROMPT_SUGGESTIONS.map((suggestion, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="text-left justify-start h-auto py-3 hover:bg-primary/5 text-sm"
                      onClick={() => useSuggestion(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex gap-3 animate-fade-in ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <Avatar className="w-8 h-8 border-2 border-border flex-shrink-0">
                  <AvatarFallback className={message.role === 'user' ? 'bg-primary' : 'bg-gradient-to-br from-primary to-primary/80'}>
                    {message.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                  </AvatarFallback>
                </Avatar>

                {/* Message Bubble */}
                <div className={`flex-1 max-w-2xl ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border border-border/50'
                    }`}
                  >
                    {message.role === 'assistant' ? (
                      <MessageRenderer content={message.content} />
                    ) : (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    )}
                    <div className={`flex items-center justify-between mt-2 ${message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      <p className="text-xs">
                        {formatTime(message.timestamp)}
                      </p>
                      <div className="flex items-center gap-1">
                        {/* Copy Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-6 w-6 p-0 ${message.role === 'user' ? 'hover:bg-primary-foreground/10' : 'hover:bg-primary/10'}`}
                          onClick={() => handleCopyMessage(message.content, idx)}
                          title="Kopyala"
                        >
                          {copiedIndex === idx ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </Button>
                        
                        {/* Favorite Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-6 w-6 p-0 ${message.role === 'user' ? 'hover:bg-primary-foreground/10' : 'hover:bg-primary/10'}`}
                          onClick={() => handleAddFavorite(message)}
                          title="Favorilere ekle"
                        >
                          <Star className={`h-3 w-3 ${isFavorite(message.content, message.timestamp) ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                        </Button>
                        
                        {message.role === 'assistant' && (
                          <>
                            {/* Speak Button */}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-primary/10"
                              onClick={() => handleSpeakMessage(message.content)}
                              title={isSpeaking ? 'Durdur' : 'Sesli oku'}
                            >
                              {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                            </Button>
                            
                            {/* Feedback Buttons */}
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-6 w-6 p-0 hover:bg-green-500/10 ${message.feedback === 'positive' ? 'text-green-500' : ''}`}
                              onClick={() => handleFeedback(idx, 'positive')}
                              title="Faydalı"
                            >
                              <ThumbsUp className={`h-3 w-3 ${message.feedback === 'positive' ? 'fill-current' : ''}`} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-6 w-6 p-0 hover:bg-red-500/10 ${message.feedback === 'negative' ? 'text-red-500' : ''}`}
                              onClick={() => handleFeedback(idx, 'negative')}
                              title="Faydasız"
                            >
                              <ThumbsDown className={`h-3 w-3 ${message.feedback === 'negative' ? 'fill-current' : ''}`} />
                            </Button>
                            
                            {/* Report Button */}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-destructive/10"
                              onClick={() => handleReportAbuse(message)}
                              title="Sorun bildir"
                            >
                              <Flag className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 animate-fade-in">
                <Avatar className="w-8 h-8 border-2 border-border">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80">
                    <Bot className="w-4 h-4 text-white" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-card border border-border/50 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">Düşünüyorum...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Sensitive Data Warning */}
        {sensitiveWarning && (
          <div className="mx-4 mb-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-center gap-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
            <span className="text-yellow-600 dark:text-yellow-400">{sensitiveWarning}</span>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-border/50 bg-card/30 backdrop-blur-sm p-4">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Mesajınızı yazın... (örn: 'JavaScript closure açıkla' veya '150 * 3 hesapla')"
                  className={`min-h-[60px] max-h-[200px] resize-none bg-background pr-12 ${sensitiveWarning ? 'border-yellow-500' : ''}`}
                  disabled={isTyping}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={`absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 ${isListening ? 'text-red-500 animate-pulse' : ''}`}
                  onClick={handleVoiceInput}
                  title={isListening ? 'Kaydı durdur' : 'Sesli mesaj'}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
              <Button 
                type="submit" 
                size="icon" 
                className="h-[60px] w-[60px]"
                disabled={!input.trim() || isTyping}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                Tamamen çevrimdışı çalışır • API gerektirmez
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={`text-xs ${autoSpeak ? 'text-primary' : 'text-muted-foreground'}`}
                onClick={() => setAutoSpeak(!autoSpeak)}
              >
                <Volume2 className="h-3 w-3 mr-1" />
                {autoSpeak ? 'Ses Açık' : 'Ses Kapalı'}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Favorites Panel */}
      <FavoritesPanel isOpen={showFavorites} onClose={() => setShowFavorites(false)} />

      {/* Search Dialog */}
      <SearchDialog 
        isOpen={showSearch} 
        onClose={() => setShowSearch(false)} 
        messages={messages}
      />

      {/* Abuse Report Dialog */}
      <AbuseReportDialog
        open={showAbuseReport}
        onOpenChange={(open) => {
          setShowAbuseReport(open);
          if (!open) setReportingMessage(null);
        }}
        messageContent={reportingMessage?.content || ''}
      />
    </div>
  );
};

export default Chat;