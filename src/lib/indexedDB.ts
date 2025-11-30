// IndexedDB wrapper for Yanlik
const DB_NAME = 'YanlikDB';
const DB_VERSION = 1;
const CONVERSATIONS_STORE = 'conversations';
const USERS_STORE = 'users';

export interface IDBMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface IDBConversation {
  id: string;
  title: string;
  messages: IDBMessage[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface IDBUser {
  id: string;
  username: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
}

class IndexedDBManager {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains(CONVERSATIONS_STORE)) {
          const conversationStore = db.createObjectStore(CONVERSATIONS_STORE, { keyPath: 'id' });
          conversationStore.createIndex('userId', 'userId', { unique: false });
        }

        if (!db.objectStoreNames.contains(USERS_STORE)) {
          db.createObjectStore(USERS_STORE, { keyPath: 'id' });
        }
      };
    });
  }

  // Users
  async addUser(user: IDBUser): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([USERS_STORE], 'readwrite');
      const store = transaction.objectStore(USERS_STORE);
      const request = store.add(user);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getUser(username: string): Promise<IDBUser | undefined> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([USERS_STORE], 'readonly');
      const store = transaction.objectStore(USERS_STORE);
      const request = store.getAll();
      request.onsuccess = () => {
        const users = request.result as IDBUser[];
        resolve(users.find(u => u.username === username));
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getAllUsers(): Promise<IDBUser[]> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([USERS_STORE], 'readonly');
      const store = transaction.objectStore(USERS_STORE);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteUser(userId: string): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([USERS_STORE], 'readwrite');
      const store = transaction.objectStore(USERS_STORE);
      const request = store.delete(userId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Conversations
  async addConversation(conversation: IDBConversation): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([CONVERSATIONS_STORE], 'readwrite');
      const store = transaction.objectStore(CONVERSATIONS_STORE);
      const request = store.add(conversation);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getConversationsByUser(userId: string): Promise<IDBConversation[]> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([CONVERSATIONS_STORE], 'readonly');
      const store = transaction.objectStore(CONVERSATIONS_STORE);
      const index = store.index('userId');
      const request = index.getAll(userId);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async updateConversation(conversation: IDBConversation): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([CONVERSATIONS_STORE], 'readwrite');
      const store = transaction.objectStore(CONVERSATIONS_STORE);
      const request = store.put(conversation);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async deleteConversation(conversationId: string): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([CONVERSATIONS_STORE], 'readwrite');
      const store = transaction.objectStore(CONVERSATIONS_STORE);
      const request = store.delete(conversationId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async deleteAllConversationsByUser(userId: string): Promise<void> {
    if (!this.db) await this.init();
    const conversations = await this.getConversationsByUser(userId);
    const promises = conversations.map(c => this.deleteConversation(c.id));
    await Promise.all(promises);
  }

  async getAllConversations(): Promise<IDBConversation[]> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([CONVERSATIONS_STORE], 'readonly');
      const store = transaction.objectStore(CONVERSATIONS_STORE);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

export const dbManager = new IndexedDBManager();
