"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ClipboardList, CreditCard } from "lucide-react";

interface TierDetails {
  checklist: string[];
  deliverables: string[];
}

interface TierModalProps {
  isOpen: boolean;
  onClose: () => void;
  tierName: string;
  price: string;
  details: TierDetails;
}

export default function TierModal({ isOpen, onClose, tierName, price, details }: TierModalProps) {
  // Guard clause: If details aren't passed yet, don't render content
  if (!details) return null;

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
            initial={{ y: 100, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 100, scale: 0.95 }}
            className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl rounded-[40px] overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* STICKY HEADER */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/50 backdrop-blur-md">
              <div>
                <span className="text-[#00FF00] text-[10px] font-black tracking-[0.3em] uppercase">Category Profile</span>
                <h3 className="text-white text-3xl font-black tracking-tighter uppercase">{tierName}</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-4 bg-white/5 rounded-full active:scale-90 active:bg-[#00FF00]/20 transition-all"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="p-8 space-y-10 overflow-y-auto custom-scrollbar">
              
              {/* DYNAMIC DELIVERABLES */}
              <div>
                <h4 className="text-white font-black text-[10px] tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
                   <CheckCircle2 size={14} className="text-[#00FF00]" /> What You Get
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {details.deliverables.map((item, index) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={index} 
                      className="p-5 bg-white/5 rounded-3xl border border-white/5 text-[13px] font-medium text-gray-300 flex items-center gap-3"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00FF00] shadow-[0_0_8px_#00FF00]" />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* DYNAMIC PRE-FLIGHT CHECKLIST */}
              <div className="p-8 bg-[#00FF00]/5 rounded-[32px] border border-[#00FF00]/10">
                <h4 className="text-[#00FF00] font-black text-[10px] tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
                   <ClipboardList size={14} /> Pre-Flight Checklist
                </h4>
                <p className="text-gray-500 text-xs mb-6 font-medium italic">Ensure these are ready to avoid deployment delays:</p>
                <ul className="space-y-4">
                  {details.checklist.map((item, i) => (
                    <li key={i} className="text-white text-[13px] font-bold flex items-start gap-3">
                      <span className="text-[#00FF00] mt-1">→</span> 
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* DYNAMIC CTA */}
              <div className="pt-6 border-t border-white/5">
                <div className="flex justify-between items-end mb-6">
                   <div>
                     <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Total Package</p>
                     <p className="text-white text-5xl font-black tracking-tighter">{price}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-[#00FF00] text-[10px] font-black uppercase tracking-widest">Entry Fee</p>
                     <p className="text-white text-xl font-bold">₦10,000</p>
                   </div>
                </div>
                
                <button className="w-full py-6 bg-[#00FF00] text-black rounded-[24px] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 active:scale-95 active:shadow-[0_0_30px_#00FF00] transition-all touch-manipulation">
                  Pay Validation Fee & Lock Slot <CreditCard size={16} />
                </button>
                <p className="text-center text-gray-600 text-[10px] font-bold mt-4 uppercase tracking-tighter">
                  Secures 1 of 5 monthly development slots
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}