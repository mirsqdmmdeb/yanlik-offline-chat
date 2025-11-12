import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface ChatContextType {
  conversations: Conversation[];
  currentConversationId: string | null;
  currentMessages: Message[];
  createConversation: () => string;
  deleteConversation: (id: string) => void;
  renameConversation: (id: string, title: string) => void;
  switchConversation: (id: string) => void;
  addMessage: (message: Message) => void;
  editMessage: (index: number, newContent: string) => void;
  regenerateMessage: (index: number) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const stored = localStorage.getItem('yanlik_conversations');
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((c: any) => ({
        ...c,
        createdAt: new Date(c.createdAt),
        updatedAt: new Date(c.updatedAt),
        messages: c.messages.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }))
      }));
    }
    return [];
  });

  const [currentConversationId, setCurrentConversationId] = useState<string | null>(() => {
    return localStorage.getItem('yanlik_current_conversation');
  });

  useEffect(() => {
    localStorage.setItem('yanlik_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    if (currentConversationId) {
      localStorage.setItem('yanlik_current_conversation', currentConversationId);
    }
  }, [currentConversationId]);

  const createConversation = () => {
    const id = `conv_${Date.now()}`;
    const newConv: Conversation = {
      id,
      title: 'Yeni Sohbet',
      messages: [{ role: 'assistant', content: 'Merhaba! Ben Yanlik. Size nasıl yardımcı olabilirim?', timestamp: new Date() }],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setConversations(prev => [newConv, ...prev]);
    setCurrentConversationId(id);
    return id;
  };

  const deleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    if (currentConversationId === id) {
      const remaining = conversations.filter(c => c.id !== id);
      setCurrentConversationId(remaining[0]?.id || null);
    }
  };

  const renameConversation = (id: string, title: string) => {
    setConversations(prev => prev.map(c => 
      c.id === id ? { ...c, title, updatedAt: new Date() } : c
    ));
  };

  const switchConversation = (id: string) => {
    setCurrentConversationId(id);
  };

  const addMessage = (message: Message) => {
    if (!currentConversationId) return;
    
    setConversations(prev => prev.map(c => {
      if (c.id !== currentConversationId) return c;
      
      const newMessages = [...c.messages, message];
      const title = c.title === 'Yeni Sohbet' && newMessages.length > 2
        ? newMessages[1].content.slice(0, 50) + (newMessages[1].content.length > 50 ? '...' : '')
        : c.title;
      
      return {
        ...c,
        messages: newMessages,
        title,
        updatedAt: new Date()
      };
    }));
  };

  const editMessage = (index: number, newContent: string) => {
    if (!currentConversationId) return;
    
    setConversations(prev => prev.map(c => {
      if (c.id !== currentConversationId) return c;
      
      const newMessages = [...c.messages];
      newMessages[index] = { ...newMessages[index], content: newContent };
      
      return { ...c, messages: newMessages, updatedAt: new Date() };
    }));
  };

  const regenerateMessage = (index: number) => {
    // Bu frontend-only simülasyonda sadece placeholder
    console.log('Regenerate message at index:', index);
  };

  const currentMessages = conversations.find(c => c.id === currentConversationId)?.messages || [];

  return (
    <ChatContext.Provider value={{
      conversations,
      currentConversationId,
      currentMessages,
      createConversation,
      deleteConversation,
      renameConversation,
      switchConversation,
      addMessage,
      editMessage,
      regenerateMessage,
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within ChatProvider');
  return context;
};
