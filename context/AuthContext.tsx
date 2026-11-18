'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';

export interface ButtnsUser {
  id: string;
  _id?: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  paateeBalance: number;
  walletBalance: string;
}

interface AuthContextType {
  user: ButtnsUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: ButtnsUser, accessToken: string) => void;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ButtnsUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('buttns_user');
    localStorage.removeItem('buttns_token');
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!localStorage.getItem('buttns_token')) return;
    try {
      const freshUser = await api.get<ButtnsUser>('/users/me');
      setUser(freshUser);
      localStorage.setItem('buttns_user', JSON.stringify(freshUser));
    } catch {
      // 401 is handled automatically by api.ts event listener; offline keeps cache
    }
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => logout();
    window.addEventListener('buttns:unauthorized', handleUnauthorized);

    try {
      const savedUser = localStorage.getItem('buttns_user');
      const savedToken = localStorage.getItem('buttns_token');
      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
        refreshProfile();
      }
    } catch {
      logout();
    } finally {
      setIsLoading(false);
    }

    return () => window.removeEventListener('buttns:unauthorized', handleUnauthorized);
  }, [logout, refreshProfile]);

  const login = (userData: ButtnsUser, accessToken: string) => {
    setUser(userData);
    setToken(accessToken);
    localStorage.setItem('buttns_user', JSON.stringify(userData));
    localStorage.setItem('buttns_token', accessToken);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};