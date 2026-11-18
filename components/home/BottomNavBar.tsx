'use client';

import React from 'react';
import { Home, Search, Heart, User } from 'lucide-react';

export interface BottomNavBarProps {
  activeTab?: 'home' | 'search' | 'favorites' | 'profile';
  onTabChange?: (tab: 'home' | 'search' | 'favorites' | 'profile') => void;
  onCenterButtnClick?: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab = 'home',
  onTabChange,
  onCenterButtnClick,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex justify-center pointer-events-none">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-lg border-t border-slate-200/80 rounded-t-3xl shadow-[0_-8px_30px_rgba(15,23,42,0.08)] px-6 py-2.5 flex items-center justify-between relative pointer-events-auto">
        <button
          onClick={() => onTabChange?.('home')}
          aria-label="Home"
          className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
            activeTab === 'home' ? 'text-slate-900' : 'text-slate-400'
          }`}
        >
          <Home className="w-6 h-6 fill-current" />
          {activeTab === 'home' && (
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          )}
        </button>

        <button
          onClick={() => onTabChange?.('search')}
          aria-label="Search"
          className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
            activeTab === 'search' ? 'text-slate-900' : 'text-slate-400'
          }`}
        >
          <Search className="w-6 h-6" />
          {activeTab === 'search' && (
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          )}
        </button>

        <div className="w-14" />

        <button
          onClick={onCenterButtnClick}
          aria-label="Quick Buttns Action"
          className="absolute left-1/2 -translate-x-1/2 -top-6 w-16 h-16 rounded-full bg-gradient-to-tr from-[#1D4ED8] to-[#3B82F6] text-white flex items-center justify-center shadow-xl shadow-blue-600/35 ring-4 ring-[#F4F7FC] hover:scale-105 active:scale-95 transition-transform"
        >
          <span className="text-2xl font-black tracking-tighter">B</span>
        </button>

        <button
          onClick={() => onTabChange?.('favorites')}
          aria-label="Favorites"
          className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
            activeTab === 'favorites' ? 'text-slate-900' : 'text-slate-400'
          }`}
        >
          <Heart className="w-6 h-6" />
          {activeTab === 'favorites' && (
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          )}
        </button>

        <button
          onClick={() => onTabChange?.('profile')}
          aria-label="Profile"
          className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
            activeTab === 'profile' ? 'text-slate-900' : 'text-slate-400'
          }`}
        >
          <User className="w-6 h-6" />
          {activeTab === 'profile' && (
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          )}
        </button>
      </div>
    </nav>
  );
};