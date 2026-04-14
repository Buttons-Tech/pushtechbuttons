"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ClipboardList, CreditCard } from "lucide-react";

// The Pre-Flight Checklist for the "Upgrade" Tier
const upgradeChecklist = [
  "Current Domain Registrar Access (HostAfrica/Whogohost)",
  "Existing Website Backend Credentials",
  "High-Res School Logo & Vision Statement",
  "List of Core Administrative Bottlenecks",
];

// 1. Define the shape of the details object
interface TierDetails {
  checklist: string[];
  deliverables: string[];
}

// 2. Define the Props interface
interface TierModalProps {
  isOpen: boolean;
  onClose: () => void;
  tierName: string;
  price: string;
  details: TierDetails; // This was the missing link
}

export default function TierModal({ isOpen, onClose, tierName, price, details }: TierModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-end md:items-center justify-center p-4"
        >
          <motion.div 
            initial={{ y: 100, scale: 0.9 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 100, scale: 0.9 }}
            className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl rounded-[40px] overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black">
              <div>
                <span className="text-[#00FF00] text-[10px] font-black tracking-widest uppercase">Initializing Category</span>
                <h3 className="text-white text-3xl font-black tracking-tighter uppercase">{tierName}</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-4 bg-white/5 rounded-full active:scale-90 transition-transform"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            <div className="p-8 space-y-10">
              {/* Deliverables Section */}
              <div>
                <h4 className="text-white font-black text-[10px] tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
                   <CheckCircle2 size={14} className="text-[#00FF00]" /> Deliverables
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* These would be dynamic based on tierName */}
                  <div className="p-5 bg-white/5 rounded-3xl border border-white/5 text-sm text-gray-400">
                    Full Next.js Infrastructure Migration
                  </div>
                  <div className="p-5 bg-white/5 rounded-3xl border border-white/5 text-sm text-gray-400">
                    Custom Admin/Parent Dashboard
                  </div>
                </div>
              </div>

              {/* Pre-Flight Checklist */}
              <div className="p-8 bg-[#00FF00]/5 rounded-[32px] border border-[#00FF00]/20">
                <h4 className="text-[#00FF00] font-black text-[10px] tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
                   <ClipboardList size={14} /> Pre-Flight Checklist
                </h4>
                <p className="text-gray-500 text-xs mb-6 font-medium">Have these ready before we commence:</p>
                <ul className="space-y-3">
                  {upgradeChecklist.map((item, i) => (
                    <li key={i} className="text-white text-xs font-bold flex gap-3">
                      <span className="text-[#00FF00]">→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* The "Validation" CTA */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-end mb-2">
                   <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Investment</p>
                   <p className="text-white text-4xl font-black tracking-tighter">{price}</p>
                </div>
                
                <button className="w-full py-6 bg-[#00FF00] text-black rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 active:scale-95 transition-all">
                  Pay Validation Fee (₦10,000) <CreditCard size={14} />
                </button>
                <p className="text-center text-gray-600 text-[9px] font-medium px-10">
                  The validation fee secures your development slot and is deducted from the final project cost.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}