'use client';

import React, { useState } from 'react';
import { Share2, Check, Loader2, Copy } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';

export interface BillLineItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

interface ShareBillButtonProps {
  vendorId?: string;
  vendorName: string;
  category: string;
  items: BillLineItem[];
  totalAmount: number;
  deliveryLocation?: string;
  onRequireAuth?: () => void;
  className?: string;
}

export const ShareBillButton: React.FC<ShareBillButtonProps> = ({
  vendorId,
  vendorName,
  category,
  items,
  totalAmount,
  deliveryLocation,
  onRequireAuth,
  className = '',
}) => {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const formattedTotal = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(totalAmount);

  const handleShareBill = async () => {
    setError('');

    if (!isAuthenticated || !user) {
      onRequireAuth?.();
      return;
    }

    if (!items.length || totalAmount <= 0) {
      setError('Add at least one item before sharing a bill.');
      return;
    }

    setLoading(true);
    try {
      const order = await api.post<{ _id: string; id?: string }>('/orders/share', {
        vendorId: vendorId || vendorName.toLowerCase().replace(/\s+/g, '-'),
        vendorName,
        category,
        items,
        totalAmount,
        deliveryLocation: deliveryLocation || user.location || 'Igando, Lagos',
      });

      const orderId = order.id || order._id;
      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://pushtechbuttons.com';
      const link = `${origin}/share/${orderId}`;
      setShareUrl(link);

      const shareText = `Hey! Please help me settle my ${vendorName} (${category}) bill of ${formattedTotal} on Buttns:\n${link}`;

      // Use native mobile share sheet on WhatsApp/Android/iOS if supported
      if (typeof navigator !== 'undefined' && navigator.share) {
        try {
          await navigator.share({
            title: `Buttns Bill Request - ${vendorName}`,
            text: shareText,
            url: link,
          });
          return;
        } catch {
          // User closed native share sheet — fall through to clipboard copy
        }
      }

      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3500);
    } catch (err: any) {
      setError(err.message || 'Could not create share link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <button
        type="button"
        onClick={handleShareBill}
        disabled={loading || items.length === 0}
        className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Generating Pay Link...</span>
          </>
        ) : copied ? (
          <>
            <Check className="w-4 h-4" />
            <span>Link Copied! Paste in WhatsApp</span>
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            <span>Ask Someone to Pay ({formattedTotal})</span>
          </>
        )}
      </button>

      {shareUrl && (
        <div className="flex items-center justify-between gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs">
          <span className="truncate font-medium text-emerald-900">{shareUrl}</span>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(shareUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 2500);
            }}
            className="shrink-0 inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-900"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy</span>
          </button>
        </div>
      )}

      {error && (
        <p className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-2 rounded-xl">
          {error}
        </p>
      )}
    </div>
  );
};