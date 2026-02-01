import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, SubscriptionPlan } from '@/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo
const mockUsers: Record<string, { user: User; password: string }> = {
  'aluno@pretaf360.com': {
    password: '123456',
    user: {
      id: '1',
      email: 'aluno@pretaf360.com',
      name: 'João Silva',
      role: 'USER',
      subscription: 'PRO',
      createdAt: new Date().toISOString(),
    },
  },
  'treinador@pretaf360.com': {
    password: '123456',
    user: {
      id: '2',
      email: 'treinador@pretaf360.com',
      name: 'Carlos Treinador',
      role: 'COACH',
      subscription: 'ELITE',
      createdAt: new Date().toISOString(),
    },
  },
  'admin@pretaf360.com': {
    password: '123456',
    user: {
      id: '3',
      email: 'admin@pretaf360.com',
      name: 'Admin Master',
      role: 'ADMIN',
      subscription: 'ELITE',
      createdAt: new Date().toISOString(),
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on mount
    const storedToken = localStorage.getItem('pretaf_token');
    const storedUser = localStorage.getItem('pretaf_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers[email.toLowerCase()];
    
    if (!mockUser || mockUser.password !== password) {
      setIsLoading(false);
      throw new Error('Email ou senha inválidos');
    }
    
    const newToken = `mock_jwt_token_${Date.now()}`;
    
    setToken(newToken);
    setUser(mockUser.user);
    
    localStorage.setItem('pretaf_token', newToken);
    localStorage.setItem('pretaf_user', JSON.stringify(mockUser.user));
    
    setIsLoading(false);
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: `user_${Date.now()}`,
      email,
      name,
      role: 'USER',
      subscription: 'FREE',
      createdAt: new Date().toISOString(),
    };
    
    const newToken = `mock_jwt_token_${Date.now()}`;
    
    setToken(newToken);
    setUser(newUser);
    
    localStorage.setItem('pretaf_token', newToken);
    localStorage.setItem('pretaf_user', JSON.stringify(newUser));
    localStorage.setItem('pretaf_needs_onboarding', 'true');
    
    setIsLoading(false);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('pretaf_token');
    localStorage.removeItem('pretaf_user');
    localStorage.removeItem('pretaf_needs_onboarding');
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('pretaf_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
