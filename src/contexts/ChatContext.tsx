import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { dbManager, IDBConversation, IDBMessage } from '@/lib/indexedDB';
import { useAuth } from './AuthContext';

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
  createConversation: () => Promise<string>;
  deleteConversation: (id: string) => Promise<void>;
  renameConversation: (id: string, title: string) => Promise<void>;
  switchConversation: (id: string) => void;
  addMessage: (message: Message) => Promise<void>;
  editMessage: (index: number, newContent: string) => Promise<void>;
  regenerateMessage: (index: number) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const loadConversations = async () => {
      if (!user) {
        setConversations([]);
        setCurrentConversationId(null);
        setIsInitialized(true);
        return;
      }

      const dbConversations = await dbManager.getConversationsByUser(user.id);
      const mapped = dbConversations.map(c => ({
        ...c,
        createdAt: new Date(c.createdAt),
        updatedAt: new Date(c.updatedAt),
        messages: c.messages.map(m => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }))
      }));
      
      setConversations(mapped);
      
      // Set current conversation from localStorage
      const storedCurrentId = localStorage.getItem(`yanlik_current_conversation_${user.id}`);
      if (storedCurrentId && mapped.find(c => c.id === storedCurrentId)) {
        setCurrentConversationId(storedCurrentId);
      } else if (mapped.length > 0) {
        setCurrentConversationId(mapped[0].id);
      }

      setIsInitialized(true);
    };

    loadConversations();
  }, [user]);

  useEffect(() => {
    if (currentConversationId && user) {
      localStorage.setItem(`yanlik_current_conversation_${user.id}`, currentConversationId);
    }
  }, [currentConversationId, user]);

  const createConversation = async (): Promise<string> => {
    if (!user) return '';

    const id = `conv_${Date.now()}`;
    const newConv: IDBConversation = {
      id,
      title: 'Yeni Sohbet',
      messages: [{ role: 'assistant', content: 'Merhaba! Ben Yanlik. Size nasıl yardımcı olabilirim?', timestamp: new Date() }],
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: user.id
    };

    await dbManager.addConversation(newConv);
    setConversations(prev => [newConv as Conversation, ...prev]);
    setCurrentConversationId(id);
    return id;
  };

  const deleteConversation = async (id: string): Promise<void> => {
    await dbManager.deleteConversation(id);
    setConversations(prev => prev.filter(c => c.id !== id));
    
    if (currentConversationId === id) {
      const remaining = conversations.filter(c => c.id !== id);
      setCurrentConversationId(remaining[0]?.id || null);
    }
  };

  const renameConversation = async (id: string, title: string): Promise<void> => {
    if (!user) return;

    const conv = conversations.find(c => c.id === id);
    if (!conv) return;

    const updated: IDBConversation = {
      ...conv,
      title,
      updatedAt: new Date(),
      userId: user.id
    };

    await dbManager.updateConversation(updated);
    setConversations(prev => prev.map(c => 
      c.id === id ? { ...c, title, updatedAt: new Date() } : c
    ));
  };

  const switchConversation = (id: string) => {
    setCurrentConversationId(id);
  };

  const addMessage = async (message: Message): Promise<void> => {
    if (!currentConversationId || !user) return;
    
    const conv = conversations.find(c => c.id === currentConversationId);
    if (!conv) return;

    const newMessages = [...conv.messages, message];
    const title = conv.title === 'Yeni Sohbet' && newMessages.length > 2
      ? newMessages[1].content.slice(0, 50) + (newMessages[1].content.length > 50 ? '...' : '')
      : conv.title;

    const updated: IDBConversation = {
      ...conv,
      messages: newMessages as IDBMessage[],
      title,
      updatedAt: new Date(),
      userId: user.id
    };

    await dbManager.updateConversation(updated);
    
    setConversations(prev => prev.map(c => {
      if (c.id !== currentConversationId) return c;
      return {
        ...c,
        messages: newMessages,
        title,
        updatedAt: new Date()
      };
    }));
  };

  const editMessage = async (index: number, newContent: string): Promise<void> => {
    if (!currentConversationId || !user) return;
    
    const conv = conversations.find(c => c.id === currentConversationId);
    if (!conv) return;

    const newMessages = [...conv.messages];
    newMessages[index] = { ...newMessages[index], content: newContent };

    const updated: IDBConversation = {
      ...conv,
      messages: newMessages as IDBMessage[],
      updatedAt: new Date(),
      userId: user.id
    };

    await dbManager.updateConversation(updated);
    
    setConversations(prev => prev.map(c => {
      if (c.id !== currentConversationId) return c;
      return { ...c, messages: newMessages, updatedAt: new Date() };
    }));
  };

  const regenerateMessage = (index: number) => {
    // Bu frontend-only simülasyonda sadece placeholder
    console.log('Regenerate message at index:', index);
  };

  const currentMessages = conversations.find(c => c.id === currentConversationId)?.messages || [];

  if (!isInitialized) {
    return null;
  }

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
