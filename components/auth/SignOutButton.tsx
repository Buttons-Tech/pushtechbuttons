'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export interface SignOutButtonProps {
  className?: string;
  onSignOut?: () => void;
}

export const SignOutButton: React.FC<SignOutButtonProps> = ({
  className = '',
  onSignOut,
}) => {
  const { logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  const handleSignOut = () => {
    logout();
    onSignOut?.();
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className={`flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl transition-colors ${className}`}
    >
      <LogOut className="w-3.5 h-3.5" />
      <span>Sign Out</span>
    </button>
  );
};