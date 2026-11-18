"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ShieldCheck,
  MapPin,
  Store,
  CheckCircle2,
  Copy,
  Check,
  Wallet,
  Building2,
  Loader2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { QuickAuthModal } from "@/components/auth/QuickAuthModal";

interface PublicBill {
  id: string;
  requesterName: string;
  requesterPhoneMasked: string;
  vendorName: string;
  category: string;
  items: { name: string; quantity: number; unitPrice: number }[];
  totalAmount: number;
  deliveryLocation: string;
  status: string;
  payerName?: string;
  expiresAt: string;
}

// Replace with your live Buttns corporate / OPay collection account details
const BUTTNS_COLLECTION_ACCOUNT = {
  bankName: "OPay Digital Services",
  accountNumber: "8100000000",
  accountName: "Buttons Urban Tech Ltd",
};

export default function SharedBillPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.orderId as string;
  const { user, isAuthenticated, login, refreshProfile } = useAuth();

  const [bill, setBill] = useState<PublicBill | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<
    "OPAY_TRANSFER" | "PAATEE_WALLET"
  >("OPAY_TRANSFER");
  const [payerName, setPayerName] = useState("");
  const [payerPhone, setPayerPhone] = useState("");
  const [payerEmail, setPayerEmail] = useState("");
  const [copiedAcct, setCopiedAcct] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [payError, setPayError] = useState("");
  const [receipt, setReceipt] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setPayerName(user.name || "");
      setPayerPhone(user.phone || "");
      setPayerEmail(user.email || "");
    }
  }, [user]);

  useEffect(() => {
    if (!orderId) return;
    setLoading(true);
    api
      .get<PublicBill>(`/orders/public/${orderId}`, { auth: false })
      .then((data) => setBill(data))
      .catch((err: any) =>
        setFetchError(err.message || "Unable to load bill request."),
      )
      .finally(() => setLoading(false));
  }, [orderId]);

  const formatNaira = (amount: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);

  const handleCopyAccount = async () => {
    await navigator.clipboard.writeText(
      BUTTNS_COLLECTION_ACCOUNT.accountNumber,
    );
    setCopiedAcct(true);
    setTimeout(() => setCopiedAcct(false), 2500);
  };

  const handleConfirmPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPayError("");

    if (paymentMethod === "PAATEE_WALLET" && !isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post(`/orders/public/${orderId}/pay`, {
        paymentMethod,
        payerName,
        payerPhone,
        payerEmail: payerEmail || undefined,
      });

      setReceipt(res.receipt);
      setBill((prev) => (prev ? { ...prev, status: "PAID", payerName } : prev));

      if (paymentMethod === "PAATEE_WALLET") {
        await refreshProfile();
      } else if (
        !isAuthenticated &&
        res.payerSession?.user &&
        res.payerSession?.accessToken
      ) {
        // Silently log Mjay into her newly created Buttns account
        login(res.payerSession.user, res.payerSession.accessToken);
      }
    } catch (err: any) {
      setPayError(
        err.message || "Payment confirmation failed. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex justify-center">
      <div className="w-full max-w-md bg-[#F4F7FC] min-h-screen shadow-2xl pb-12">
        {/* Header Banner */}
        <div className="bg-gradient-to-br from-[#2356B8] to-[#3B7CF3] text-white px-5 pt-7 pb-8 rounded-b-[2rem]">
          <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-blue-100 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Buttns Request Pay</span>
          </div>
          <h1 className="text-xl font-extrabold leading-snug">
            {bill
              ? `${bill.requesterName} asked you to settle a bill`
              : "Shared Bill Request"}
          </h1>
          <p className="text-xs text-blue-100 mt-1">
            Verified hyper-local estate order • Direct vendor settlement
          </p>
        </div>

        <div className="px-5 -mt-4 space-y-4">
          {loading && (
            <div className="bg-white rounded-3xl p-8 text-center shadow-sm">
              <Loader2 className="w-7 h-7 animate-spin text-[#2962CC] mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-500">
                Loading bill details...
              </p>
            </div>
          )}

          {fetchError && (
            <div className="bg-white rounded-3xl p-6 text-center shadow-sm space-y-3">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
              <p className="text-sm font-bold text-slate-800">{fetchError}</p>
              <button
                onClick={() => router.push("/")}
                className="px-4 py-2.5 rounded-xl bg-[#2962CC] text-white text-xs font-extrabold"
              >
                Explore Buttns Home
              </button>
            </div>
          )}

          {/* RECEIPT / ALREADY PAID STATE */}
          {bill && (receipt || bill.status !== "PENDING_PAYMENT") && (
            <div className="bg-white rounded-3xl p-6 shadow-md border border-emerald-100 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  {bill.status === "EXPIRED" ? "Link Expired" : "Bill Settled"}
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  {formatNaira(bill.totalAmount)}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {bill.status === "EXPIRED"
                    ? "This payment link has expired."
                    : `Paid for ${bill.requesterName} • ${bill.vendorName}`}
                </p>
              </div>

              {receipt?.reference && (
                <div className="bg-slate-50 rounded-2xl p-3 text-xs text-slate-600">
                  Reference:{" "}
                  <span className="font-mono font-bold text-slate-900">
                    {receipt.reference}
                  </span>
                </div>
              )}

              <button
                onClick={() => router.push("/")}
                className="w-full py-3.5 rounded-2xl bg-[#2962CC] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <span>Open Your Buttns Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ACTIVE UNPAID BILL SUMMARY + CHECKOUT */}
          {bill && !receipt && bill.status === "PENDING_PAYMENT" && (
            <>
              {/* Order Breakdown Card */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-3.5">
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#2962CC] flex items-center justify-center shrink-0">
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase text-slate-400">
                        {bill.category}
                      </p>
                      <h2 className="font-extrabold text-slate-900 text-sm">
                        {bill.vendorName}
                      </h2>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-slate-400">Total Due</p>
                    <p className="text-lg font-black text-[#2962CC]">
                      {formatNaira(bill.totalAmount)}
                    </p>
                  </div>
                </div>

                {/* Line Items */}
                <div className="space-y-2">
                  {bill.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-xs text-slate-700"
                    >
                      <span>
                        <strong className="text-slate-900">
                          {item.quantity}x
                        </strong>{" "}
                        {item.name}
                      </span>
                      <span className="font-bold">
                        {formatNaira(item.quantity * item.unitPrice)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                  <MapPin className="w-4 h-4 text-[#2962CC] shrink-0" />
                  <span>
                    Delivering to:{" "}
                    <strong className="text-slate-700">
                      {bill.deliveryLocation}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Payment Method Selector + Form */}
              <form
                onSubmit={handleConfirmPayment}
                className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4"
              >
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Choose Payment Option
                </h3>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("OPAY_TRANSFER")}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      paymentMethod === "OPAY_TRANSFER"
                        ? "border-[#2962CC] bg-blue-50/70 text-[#2962CC]"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    <Building2 className="w-4 h-4 mb-1" />
                    <p className="text-xs font-extrabold">OPay / Transfer</p>
                    <p className="text-[10px] opacity-80">
                      Instant bank transfer
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("PAATEE_WALLET")}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      paymentMethod === "PAATEE_WALLET"
                        ? "border-[#2962CC] bg-blue-50/70 text-[#2962CC]"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    <Wallet className="w-4 h-4 mb-1" />
                    <p className="text-xs font-extrabold">Paatee Wallet</p>
                    <p className="text-[10px] opacity-80">
                      {isAuthenticated ? user?.walletBalance : "Sign in to use"}
                    </p>
                  </button>
                </div>

                {paymentMethod === "OPAY_TRANSFER" && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-bold text-slate-500">
                          {BUTTNS_COLLECTION_ACCOUNT.bankName}
                        </p>
                        <p className="text-base font-black tracking-wider text-slate-900">
                          {BUTTNS_COLLECTION_ACCOUNT.accountNumber}
                        </p>
                        <p className="text-[11px] font-medium text-slate-600">
                          {BUTTNS_COLLECTION_ACCOUNT.accountName}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyAccount}
                        className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-extrabold text-[#2962CC] flex items-center gap-1 shadow-xs"
                      >
                        {copiedAcct ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedAcct ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-2.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Name (Sender)
                    </label>
                    <input
                      type="text"
                      required
                      value={payerName}
                      onChange={(e) => setPayerName(e.target.value)}
                      placeholder="e.g. Mjay"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2962CC] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your WhatsApp Number (for receipt)
                    </label>
                    <input
                      type="tel"
                      required
                      value={payerPhone}
                      onChange={(e) => setPayerPhone(e.target.value)}
                      placeholder="08012345678"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2962CC] focus:bg-white"
                    />
                  </div>
                </div>

                {payError && (
                  <p className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-2.5 rounded-xl">
                    {payError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirming Payment...</span>
                    </>
                  ) : (
                    <span>
                      {paymentMethod === "OPAY_TRANSFER"
                        ? `I Have Sent ${formatNaira(bill.totalAmount)}`
                        : `Pay ${formatNaira(bill.totalAmount)} from Paatee`}
                    </span>
                  )}
                </button>

               
              </form>
            </>
          )}
        </div>

        <QuickAuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    </div>
  );
}
