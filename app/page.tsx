'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ButtnsHeader } from '@/components/home/ButtnsHeader';
import { DashboardHeroCard } from '@/components/home/DashboardHeroCard';
import { MainButtnsGrid } from '@/components/home/MainButtnsGrid';
import { VendorPromosSection } from '@/components/home/VendorPromosSection';
import { BottomNavBar } from '@/components/home/BottomNavBar';
import { QuickAuthModal } from '@/components/auth/QuickAuthModal';
import { SignOutButton } from '@/components/auth/SignOutButton';
import { MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';
import { api } from '@/lib/api';

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'favorites' | 'profile'>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Silent background wake-up ping for Render free-tier spin-up
  useEffect(() => {
    api.get('/health', { auth: false, retries: 0 }).catch(() => {
      // Silently ignore errors if server is still booting
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-200 flex justify-center">
      <div className="w-full max-w-md bg-[#F4F7FC] min-h-screen relative shadow-2xl overflow-x-hidden">
        {/* Curved Blue Top Backdrop */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#2356B8] via-[#2F6CE0] to-[#4A89F3] rounded-b-[2.5rem] pointer-events-none" />

        <div className="relative z-10">
          <ButtnsHeader
            isAuthenticated={isAuthenticated}
            userName={user?.name}
            location={user?.location || 'Igando / Isuti Rd'}
            balance={user?.walletBalance || '₦0.00'}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />

          {/* --- TAB 1: HOME DASHBOARD --- */}
          {activeTab === 'home' && (
            <>
              <DashboardHeroCard
                isAuthenticated={isAuthenticated}
                locationName={user?.location?.split(',')[0] || 'Igando'}
                onCtaClick={() => {
                  if (!isAuthenticated) setIsAuthModalOpen(true);
                }}
              />
              <MainButtnsGrid />
              <VendorPromosSection />
            </>
          )}

          {/* --- TAB 4: RESIDENT PROFILE & SIGN OUT --- */}
          {activeTab === 'profile' && isAuthenticated && user && (
            <section className="px-5 pt-2 pb-28 space-y-4">
              <div className="bg-white rounded-3xl p-5 shadow-md border border-slate-100">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mb-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Resident</span>
                    </div>
                    <h2 className="text-lg font-extrabold text-slate-900">
                      {user.name}
                    </h2>
                  </div>

                  {/* Sign Out Action */}
                  {/* <SignOutButton /> */}
                  <SignOutButton onSignOut={() => setActiveTab('home')} />
                </div>

                <div className="mt-4 space-y-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-[#2962CC] shrink-0" />
                    <span className="font-medium text-slate-800">{user.location}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#2962CC] shrink-0" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#2962CC] shrink-0" />
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        <BottomNavBar
          activeTab={activeTab}
          onTabChange={(tab) => {
            if (tab === 'profile' && !isAuthenticated) {
              setIsAuthModalOpen(true);
              return;
            }
            setActiveTab(tab);
          }}
        />

        <QuickAuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    </div>
  );
}