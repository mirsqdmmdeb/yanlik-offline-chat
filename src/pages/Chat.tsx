import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getChatResponse } from '@/lib/chatResponses';
import { LogOut, Settings, Menu, Info, Send, Sparkles, User, Bot, Trash2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useVoiceChat } from '@/hooks/useVoiceChat';
import { MessageRenderer } from '@/components/MessageRenderer';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const STORAGE_KEY = 'yanlik_chat_history';

const PROMPT_SUGGESTIONS = [
  'Yapay zeka hakkında bilgi ver',
  'Trading stratejileri nelerdir?',
  'React nasıl öğrenilir?',
  'Yanlik nedir?'
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isListening, isSpeaking, startListening, stopListening, speak, stopSpeaking } = useVoiceChat();

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
      // Initial welcome message
      setMessages([
        { 
          role: 'assistant', 
          content: 'Merhaba! Ben Yanlik, tarayıcıda çalışan yapay zeka asistanınız. Size nasıl yardımcı olabilirim?', 
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

    const userMessage: Message = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Focus back to input
    setTimeout(() => inputRef.current?.focus(), 100);

    setTimeout(() => {
      const response = getChatResponse(input);
      const assistantMessage: Message = { role: 'assistant', content: response, timestamp: new Date() };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      
      // Auto speak response if enabled
      if (autoSpeak) {
        speak(response);
      }
    }, 500 + Math.random() * 1000);
  };

  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening((text) => {
        setInput(text);
        toast({
          title: 'Ses Algılandı',
          description: `"${text}"`,
        });
      });
    }
  };

  const handleSpeakMessage = (content: string) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(content);
    }
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
        content: 'Sohbet temizlendi. Yeni bir konuşma başlayalım! 🚀', 
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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Yanlik</h1>
            <p className="text-xs text-muted-foreground">AI Asistanı</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1" />
      
      <div className="space-y-1">
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
                <p className="text-xs text-muted-foreground">Demo Sürüm</p>
              </div>
            </div>
          </div>

          <Button 
            variant="ghost" 
            size="sm"
            onClick={clearChat}
            className="hidden sm:flex"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Temizle
          </Button>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Prompt Suggestions (only show at start) */}
            {messages.length === 1 && (
              <div className="space-y-3 animate-fade-in">
                <p className="text-sm text-muted-foreground text-center">Örnek sorular:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PROMPT_SUGGESTIONS.map((suggestion, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="text-left justify-start h-auto py-3 hover:bg-primary/5"
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
                <Avatar className="w-8 h-8 border-2 border-border">
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
                      {message.role === 'assistant' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-primary/10"
                          onClick={() => handleSpeakMessage(message.content)}
                        >
                          {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                        </Button>
                      )}
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
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>
        </ScrollArea>

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
                  placeholder="Mesajınızı yazın veya sesli konuşun..."
                  className="min-h-[60px] max-h-[200px] resize-none bg-background pr-12"
                  disabled={isTyping}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={`absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 ${isListening ? 'text-red-500 animate-pulse' : ''}`}
                  onClick={handleVoiceInput}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex flex-col gap-1">
                <Button 
                  type="submit" 
                  size="icon" 
                  className="h-[60px] w-[60px]"
                  disabled={!input.trim() || isTyping}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                Verileriniz sadece tarayıcınızda saklanır.
              </p>
              <Button
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
    </div>
  );
};

export default Chat;