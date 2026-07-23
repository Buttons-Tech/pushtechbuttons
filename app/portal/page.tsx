"use client";

import React, { useState } from "react";
import {
  Briefcase,
  GraduationCap,
  TrendingUp,
  Handshake,
  Users,
  ChevronRight,
  X,
  CheckCircle2,
  Building2,
} from "lucide-react";

interface RoleDetails {
  title: string;
  category: string;
  stipend: string;
  perks: string[];
  description: string;
}

const POLICY_DATA: Record<string, RoleDetails> = {
  nysc: {
    title: "NYSC Onboarding Policy",
    category: "Graduate Internship",
    stipend: "₦50,000 / month",
    perks: [
      "Company Accommodation",
      "Performance Bonuses",
      "Mentorship & Career Path",
    ],
    description:
      "Designed for active NYSC corps members ready to work on live products in software engineering, UI/UX, and growth marketing.",
  },
  siwes: {
    title: "SIWES / Student Internship Policy",
    category: "Undergraduate Attachment",
    stipend: "₦25,000 - ₦35,000 / month",
    perks: [
      "Logistics Support",
      "Hands-on Product Tasks",
      "Letter of Recommendation",
    ],
    description:
      "Structured for university/polytechnic students fulfilling industrial training requirements. Emphasis is on practical skills in Next.js, design systems, and operations.",
  },
  investors: {
    title: "Investor & Partner Access",
    category: "Strategic Growth",
    stipend: "Equity & Revenue Share",
    perks: [
      "Quarterly Pitch Decks",
      "Financial Metrics Dashboard",
      "Direct Founders Desk Access",
    ],
    description:
      "Dedicated portal for prospective and existing partners backing Buttns urban tech footprint.",
  },
};

export default function PortalHub() {
  const [selectedRole, setSelectedRole] = useState<RoleDetails | null>(null);

  const quickActions = [
    {
      id: "siwes",
      label: "SIWES / Interns",
      icon: GraduationCap,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      id: "nysc",
      label: "NYSC Corps",
      icon: Building2,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "staff",
      label: "Core Staff",
      icon: Briefcase,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: "investors",
      label: "Investors",
      icon: TrendingUp,
      color: "bg-amber-100 text-amber-600",
    },
    {
      id: "partners",
      label: "Partners",
      icon: Handshake,
      color: "bg-rose-100 text-rose-600",
    },
  ];

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen p-4 font-sans text-gray-800">
      {/* OPay Style Green Header Card */}
      <div className="bg-black rounded-2xl p-5 text-white shadow-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs uppercase tracking-wider opacity-80">
              Welcome to
            </p>
            <h1 className="text-2xl font-bold tracking-tight">
              Buttns Urban Tech
            </h1>
          </div>
          <span className="bg-emerald-500 text-xs px-2.5 py-1 rounded-full font-medium border border-emerald-400">
            Early Stage
          </span>
        </div>
        <p className="text-sm opacity-90">
          Building fast-paced tech solutions. Choose your onboarding path below.
        </p>
      </div>

      {/* OPay 4-Column / Grid Quick Actions */}
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-6 border border-gray-100">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Portal Access Point
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() =>
                  setSelectedRole(
                    POLICY_DATA[action.id] || POLICY_DATA["siwes"],
                  )
                }
                className="flex flex-col items-center justify-center text-center p-2 rounded-xl transition hover:bg-gray-50 active:scale-95"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 ${action.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-gray-700 leading-tight">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Notice Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <Users className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-amber-900">
            Priority Hiring Active
          </h3>
          <p className="text-xs text-amber-700 mt-0.5">
            We are actively enrolling NYSC members & SIWES interns across UI/UX,
            Next.js engineering, and creative design.
          </p>
        </div>
      </div>

      {/* Bottom Modal Sheet (OPay Style Slide-up detail) */}
      {selectedRole && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center sm:items-center">
          <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 shadow-xl animate-in slide-in-from-bottom duration-200">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">
                  {selectedRole.category}
                </span>
                <h3 className="text-lg font-bold text-gray-900">
                  {selectedRole.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRole(null)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              {selectedRole.description}
            </p>

            <div className="bg-gray-50 p-3 rounded-xl mb-4 border border-gray-100">
              <span className="text-xs text-gray-500 block mb-1">
                Monthly Compensation / Stipend
              </span>
              <span className="text-base font-bold text-emerald-600">
                {selectedRole.stipend}
              </span>
            </div>

            <div className="space-y-2 mb-6">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                Key Benefits
              </span>
              {selectedRole.perks.map((perk, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            {/* <button
              onClick={() => alert("Proceeding to application portal...")}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition"
            >
              Apply / Enter Portal <ChevronRight className="w-4 h-4" />
            </button> */}

            <a
              href="https://forms.gle/zPK7Tk3AUvAdvuH2A"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition text-center"
            >
              Apply / Enter Portal <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
