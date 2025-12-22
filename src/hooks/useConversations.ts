import { useState, useEffect } from 'react';

export interface Conversation {
  id: string;
  title: string;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    feedback?: 'positive' | 'negative';
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const CONVERSATIONS_KEY = 'yanlik_conversations';
const ACTIVE_CONVERSATION_KEY = 'yanlik_active_conversation';

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  // Load conversations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(CONVERSATIONS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConversations(parsed.map((conv: any) => ({
          ...conv,
          createdAt: new Date(conv.createdAt),
          updatedAt: new Date(conv.updatedAt),
          messages: conv.messages.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          })),
        })));
      } catch (e) {
        console.error('Failed to load conversations', e);
      }
    }

    const activeId = localStorage.getItem(ACTIVE_CONVERSATION_KEY);
    if (activeId) {
      setActiveConversationId(activeId);
    }
  }, []);

  // Save conversations to localStorage
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
    }
  }, [conversations]);

  // Save active conversation ID
  useEffect(() => {
    if (activeConversationId) {
      localStorage.setItem(ACTIVE_CONVERSATION_KEY, activeConversationId);
    }
  }, [activeConversationId]);

  const createConversation = (title?: string): Conversation => {
    const newConversation: Conversation = {
      id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: title || `Sohbet ${conversations.length + 1}`,
      messages: [
        {
          role: 'assistant',
          content: '## 👋 Yeni Sohbet Başlatıldı!\n\nBu yeni bir konuşma. Size nasıl yardımcı olabilirim?\n\n*Farklı konularda ayrı sohbetler oluşturabilirsiniz.*',
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    return newConversation;
  };

  const updateConversation = (id: string, updates: Partial<Conversation>) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === id
          ? { ...conv, ...updates, updatedAt: new Date() }
          : conv
      )
    );
  };

  const deleteConversation = (id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
    if (activeConversationId === id) {
      const remaining = conversations.filter(conv => conv.id !== id);
      setActiveConversationId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const getActiveConversation = (): Conversation | null => {
    return conversations.find(conv => conv.id === activeConversationId) || null;
  };

  const addMessageToConversation = (
    conversationId: string,
    message: Conversation['messages'][0]
  ) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: [...conv.messages, message],
              updatedAt: new Date(),
              // Auto-update title based on first user message
              title: conv.messages.length === 1 && message.role === 'user'
                ? message.content.slice(0, 30) + (message.content.length > 30 ? '...' : '')
                : conv.title,
            }
          : conv
      )
    );
  };

  const updateMessageFeedback = (
    conversationId: string,
    messageIndex: number,
    feedback: 'positive' | 'negative'
  ) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: conv.messages.map((m, i) =>
                i === messageIndex ? { ...m, feedback } : m
              ),
            }
          : conv
      )
    );
  };

  const renameConversation = (id: string, newTitle: string) => {
    updateConversation(id, { title: newTitle });
  };

  const clearConversationMessages = (id: string) => {
    updateConversation(id, {
      messages: [
        {
          role: 'assistant',
          content: '## 🚀 Sohbet Temizlendi\n\nBu sohbetin geçmişi silindi. Yeni bir konuşma başlayalım!',
          timestamp: new Date(),
        },
      ],
    });
  };

  const getConversationsByDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    const grouped = {
      today: [] as Conversation[],
      yesterday: [] as Conversation[],
      lastWeek: [] as Conversation[],
      older: [] as Conversation[],
    };

    conversations.forEach(conv => {
      const convDate = new Date(conv.updatedAt);
      convDate.setHours(0, 0, 0, 0);

      if (convDate.getTime() === today.getTime()) {
        grouped.today.push(conv);
      } else if (convDate.getTime() === yesterday.getTime()) {
        grouped.yesterday.push(conv);
      } else if (convDate >= lastWeek) {
        grouped.lastWeek.push(conv);
      } else {
        grouped.older.push(conv);
      }
    });

    return grouped;
  };

  return {
    conversations,
    activeConversationId,
    setActiveConversationId,
    createConversation,
    updateConversation,
    deleteConversation,
    getActiveConversation,
    addMessageToConversation,
    updateMessageFeedback,
    renameConversation,
    clearConversationMessages,
    getConversationsByDate,
  };
};

export default useConversations;