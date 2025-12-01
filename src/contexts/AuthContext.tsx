import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { dbManager, IDBUser } from '@/lib/indexedDB';

interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}

interface AuthResult {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<AuthResult>;
  signup: (username: string, password: string) => Promise<AuthResult>;
  logout: () => void;
  deleteAccount: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      await dbManager.init();
      
      // Create default admin if no users exist
      const users = await dbManager.getAllUsers();
      if (users.length === 0) {
        const adminUser: IDBUser = {
          id: 'admin_default',
          username: 'mirsqdmmdevs',
          password: 'no1hastasi',
          isAdmin: true,
          createdAt: new Date()
        };
        await dbManager.addUser(adminUser);
      }

      // Check for stored session
      const storedUserId = localStorage.getItem('yanlik_user_id');
      if (storedUserId) {
        const allUsers = await dbManager.getAllUsers();
        const foundUser = allUsers.find(u => u.id === storedUserId);
        if (foundUser) {
          setUser({
            id: foundUser.id,
            username: foundUser.username,
            isAdmin: foundUser.isAdmin
          });
        }
      }
      
      setIsInitialized(true);
    };

    initAuth();
  }, []);

  const login = async (username: string, password: string): Promise<AuthResult> => {
    try {
      const foundUser = await dbManager.getUser(username);
      
      if (!foundUser) {
        return { success: false, error: 'Kullanıcı bulunamadı' };
      }

      if (foundUser.password !== password) {
        return { success: false, error: 'Şifre hatalı' };
      }

      const userData: User = {
        id: foundUser.id,
        username: foundUser.username,
        isAdmin: foundUser.isAdmin
      };
      
      setUser(userData);
      localStorage.setItem('yanlik_user_id', foundUser.id);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Giriş sırasında bir hata oluştu' };
    }
  };

  const signup = async (username: string, password: string): Promise<AuthResult> => {
    try {
      // Check if username already exists
      const existingUser = await dbManager.getUser(username);
      if (existingUser) {
        return { success: false, error: 'Bu kullanıcı adı zaten kullanılıyor' };
      }

      // Create new user
      const newUser: IDBUser = {
        id: `user_${Date.now()}`,
        username,
        password,
        isAdmin: false,
        createdAt: new Date()
      };

      await dbManager.addUser(newUser);

      // Auto login after signup
      const userData: User = {
        id: newUser.id,
        username: newUser.username,
        isAdmin: newUser.isAdmin
      };
      
      setUser(userData);
      localStorage.setItem('yanlik_user_id', newUser.id);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Kayıt sırasında bir hata oluştu' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('yanlik_user_id');
  };

  const deleteAccount = async () => {
    if (!user) return;
    
    try {
      // Delete all user conversations
      await dbManager.deleteAllConversationsByUser(user.id);
      
      // Delete user
      await dbManager.deleteUser(user.id);
      
      // Logout
      logout();
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, deleteAccount, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
