// components/InstallPWAButton.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { Download, Sparkles } from 'lucide-react';

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-zinc-950 text-white p-3.5 rounded-2xl border border-zinc-800 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-black">Install Buttns App</h4>
          <p className="text-[10px] text-gray-400">Add to home screen for fast access</p>
        </div>
      </div>
      <button
        onClick={handleInstallClick}
        className="bg-amber-400 hover:bg-amber-300 text-zinc-950 px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all active:scale-95"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Install</span>
      </button>
    </div>
  );
}