import React from "react";
import { Activity, ShoppingBag, Bike, Sparkles, Check, ShieldCheck } from "lucide-react";

interface ProjectMockupProps {
  slug: string;
  className?: string;
}

export const ProjectMockup: React.FC<ProjectMockupProps> = ({ slug, className = "w-full h-full" }) => {
  switch (slug) {
    case "nostic":
      return (
        <div className={`w-full h-full bg-gradient-to-br from-[#161224] via-[#0f0b1a] to-[#07050e] relative flex items-center justify-center p-4 overflow-hidden ${className}`}>
          {/* Ambient subtle backlight */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-violet-500/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-slate-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* Hardware Diagnostic Device Mockup: Scaled ~30%, Angled Float, Shadow & Glint */}
          <div className="w-48 h-48 sm:w-56 sm:h-56 bg-[#141021] rounded-3xl border border-violet-400/25 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_25px_rgba(168,85,247,0.2)] flex flex-col items-center justify-between p-4 sm:p-5 transform -rotate-4 group-hover:rotate-0 group-hover:scale-105 group-hover:-translate-y-1.5 transition-transform duration-500 ease-out select-none">
            <div className="w-full flex items-center justify-between">
              <span className="font-mono text-[10px] sm:text-[11px] font-extrabold tracking-wider text-zinc-200 uppercase">NOSTIC PRO</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#10b981]" />
            </div>
            <div className="w-full h-16 sm:h-20 bg-[#090612] rounded-2xl flex flex-col items-center justify-center border border-violet-500/35 shadow-inner p-1.5">
              <span className="text-[13px] sm:text-[15px] font-mono font-bold text-violet-200">98.6°F • 99% SpO2</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <Activity className="w-3.5 h-3.5 inline" /> OPTIMAL VITALS
              </span>
            </div>
            <div className="w-full flex items-center justify-between pt-1 border-t border-white/10">
              <span className="w-8 h-1.5 bg-white/20 rounded-full" />
              <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400">BLE 5.3 MESH</span>
            </div>
          </div>
          <div className="absolute top-4 left-4 text-[11px] font-black tracking-wider text-white/50 uppercase pointer-events-none">
            nostic
          </div>
        </div>
      );

    case "zepto":
      return (
        <div className={`w-full h-full bg-gradient-to-br from-[#7042FF]/85 via-[#5D30DF]/75 to-[#1E085A] relative flex items-center justify-center p-4 overflow-hidden ${className}`}>
          <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-[#B896FF]/30 rounded-full blur-3xl pointer-events-none" />

          {/* Mobile App UI Render: Scaled ~30%, Angled Float, Shadow & Glint */}
          <div className="w-44 h-60 sm:w-52 sm:h-72 bg-[#080417] rounded-[28px] border-2 border-white/25 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85),0_0_30px_rgba(147,51,234,0.28)] p-3.5 sm:p-4 flex flex-col justify-between transform rotate-3 group-hover:rotate-0 group-hover:scale-105 group-hover:-translate-y-1.5 transition-transform duration-500 ease-out select-none">
            {/* Dynamic Island / Speaker Notch */}
            <div className="w-14 h-1.5 bg-white/20 rounded-full mx-auto mb-1 shrink-0" />
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[12px] sm:text-[13px] font-black text-amber-300 tracking-wider">zepto</span>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-400 text-purple-950">10 MIN</span>
            </div>
            <div className="my-auto py-1">
              <div className="w-full bg-white/[0.08] rounded-2xl p-2.5 mb-1.5 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-400/20 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-4 h-4 text-amber-300" />
                </div>
                <div className="leading-none">
                  <div className="text-[9px] sm:text-[10px] font-bold text-white">Fresh Berries</div>
                  <div className="text-[8px] text-zinc-400 mt-1">Delivering in 6 mins</div>
                </div>
              </div>
            </div>
            <div className="w-full py-2 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl text-[10px] sm:text-[11px] font-black text-purple-950 flex items-center justify-center shadow-lg shrink-0">
              TRACK DELIVERY
            </div>
          </div>
          <div className="absolute top-4 left-4 text-[11px] font-black tracking-wider text-white/70 pointer-events-none">
            zepto
          </div>
        </div>
      );

    case "yulu":
      return (
        <div className={`w-full h-full bg-gradient-to-br from-[#0c333a] via-[#09252c] to-[#041217] relative flex items-center justify-center p-4 overflow-hidden ${className}`}>
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/25 rounded-full blur-3xl pointer-events-none" />

          {/* Electric Mobility UI: Scaled ~30%, Angled Float, Shadow & Glint */}
          <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-[#06181d]/95 border border-cyan-400/35 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.25)] p-4 sm:p-5 flex flex-col justify-between transform -rotate-4 group-hover:rotate-0 group-hover:scale-105 group-hover:-translate-y-1.5 transition-transform duration-500 ease-out select-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px] font-bold text-cyan-300">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8]" />
                <span>YULU DEX</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-400/40">94%</span>
            </div>
            <div className="flex items-center justify-center py-2">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center shadow-[0_0_25px_rgba(56,189,248,0.3)]">
                <Bike className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-300" />
              </div>
            </div>
            <div className="flex justify-between items-center text-[10px] text-zinc-300 border-t border-cyan-900/60 pt-2">
              <span>Range: 68 km</span>
              <span className="text-cyan-400 font-bold">UNLOCKED</span>
            </div>
          </div>
          <div className="absolute top-4 left-4 text-[11px] font-bold tracking-wider text-cyan-300/80 pointer-events-none">
            yulu
          </div>
        </div>
      );

    case "cred":
      return (
        <div className={`w-full h-full bg-gradient-to-br from-[#181820] via-[#0d0d12] to-black relative flex items-center justify-center p-4 overflow-hidden ${className}`}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#B896FF]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Luxury Dark-Mode Fintech Interface: Scaled ~30%, Angled Float, Shadow & Glint */}
          <div className="w-44 h-60 sm:w-52 sm:h-72 bg-black rounded-[28px] border border-white/25 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9),0_0_25px_rgba(245,158,11,0.18)] p-3.5 sm:p-4 flex flex-col justify-between transform rotate-3 group-hover:rotate-0 group-hover:scale-105 group-hover:-translate-y-1.5 transition-transform duration-500 ease-out select-none">
            {/* Dynamic Island / Speaker Notch */}
            <div className="w-14 h-1.5 bg-white/20 rounded-full mx-auto mb-1 shrink-0" />
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-[9px] font-mono text-zinc-400 tracking-wider">CRED BLACK</span>
              <span className="text-[10px] font-mono font-bold text-emerald-400">842 SCORE</span>
            </div>
            <div className="my-auto py-1">
              <div className="w-full aspect-[1.6/1] bg-gradient-to-tr from-zinc-800 via-zinc-900 to-black rounded-xl border border-white/20 p-2.5 flex flex-col justify-between shadow-xl">
                <div className="w-5 h-3.5 rounded-sm bg-amber-400/80 shadow-sm" />
                <div className="text-[8px] sm:text-[9px] font-mono text-zinc-300 tracking-widest">•••• 8820</div>
              </div>
            </div>
            <div className="w-full py-2 bg-white/10 hover:bg-white/15 rounded-xl text-[10px] font-mono text-white flex items-center justify-center border border-white/20 transition-colors shrink-0">
              CLAIM REWARD
            </div>
          </div>
          <div className="absolute top-4 left-4 text-[11px] font-bold tracking-[0.2em] text-white/70 uppercase pointer-events-none">
            CRED
          </div>
        </div>
      );

    case "simpl":
      return (
        <div className={`w-full h-full bg-gradient-to-br from-[#0c362d] via-[#07241e] to-[#031410] relative flex items-center justify-center p-4 overflow-hidden ${className}`}>
          <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-emerald-400/25 rounded-full blur-3xl pointer-events-none" />

          {/* Checkout Interface Mockup: Scaled ~30%, Angled Float, Shadow & Glint */}
          <div className="w-44 h-60 sm:w-52 sm:h-72 bg-[#041d18] rounded-[28px] border-2 border-emerald-400/35 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85),0_0_30px_rgba(16,185,129,0.25)] p-3.5 sm:p-4 flex flex-col justify-between transform -rotate-3 group-hover:rotate-0 group-hover:scale-105 group-hover:-translate-y-1.5 transition-transform duration-500 ease-out select-none">
            {/* Dynamic Island / Speaker Notch */}
            <div className="w-14 h-1.5 bg-emerald-400/30 rounded-full mx-auto mb-1 shrink-0" />
            <div className="flex items-center justify-between border-b border-emerald-800/40 pb-2">
              <span className="text-[11px] sm:text-[12px] font-bold text-emerald-300">Simpl</span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400">1-TAP</span>
            </div>
            <div className="my-auto text-center py-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto mb-2 shadow-[0_0_20px_rgba(16,185,129,0.35)]">
                <Check className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400 stroke-[3]" />
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold text-white">₹2,490 Approved</div>
              <div className="text-[8px] text-emerald-300/80 mt-0.5">Biometric Verified</div>
            </div>
            <div className="w-full py-2 bg-emerald-500 rounded-xl text-[10px] sm:text-[11px] font-bold text-emerald-950 flex items-center justify-center shadow-lg shrink-0">
              SUCCESSFUL
            </div>
          </div>
          <div className="absolute top-4 left-4 text-[11px] font-bold tracking-wider text-emerald-300/80 pointer-events-none">
            simpl
          </div>
        </div>
      );

    case "razorpay":
      return (
        <div className={`w-full h-full bg-gradient-to-br from-[#0c1e3d] via-[#08152e] to-[#040a17] relative flex items-center justify-center p-4 overflow-hidden ${className}`}>
          <div className="absolute -top-8 -right-8 w-48 h-48 bg-blue-500/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />

          {/* Payment Interface Mockup: Scaled ~30%, Angled Float, Shadow & Glint */}
          <div className="w-44 h-60 sm:w-52 sm:h-72 bg-[#050e24] rounded-[28px] border-2 border-blue-400/35 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85),0_0_30px_rgba(59,130,246,0.25)] p-3.5 sm:p-4 flex flex-col justify-between transform rotate-3 group-hover:rotate-0 group-hover:scale-105 group-hover:-translate-y-1.5 transition-transform duration-500 ease-out select-none">
            {/* Dynamic Island / Speaker Notch */}
            <div className="w-14 h-1.5 bg-blue-400/30 rounded-full mx-auto mb-1 shrink-0" />
            <div className="flex items-center justify-between border-b border-blue-800/40 pb-2">
              <span className="text-[11px] sm:text-[12px] font-black italic tracking-wide text-blue-300">Razorpay</span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-blue-950 border border-blue-500/40 text-blue-400">INSTANT</span>
            </div>
            <div className="my-auto text-center py-2">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center mx-auto mb-2 shadow-[0_0_20px_rgba(59,130,246,0.35)]">
                <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400 stroke-[2.5]" />
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold text-white">₹45,000.00 Settled</div>
              <div className="text-[8px] text-blue-300/80 mt-0.5">Enterprise Payout API</div>
            </div>
            <div className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-[10px] sm:text-[11px] font-bold text-white flex items-center justify-center shadow-lg shrink-0">
              SUCCESSFUL
            </div>
          </div>
          <div className="absolute top-4 left-4 text-[11px] font-bold italic tracking-wider text-blue-300/80 pointer-events-none">
            Razorpay
          </div>
        </div>
      );

    default:
      return (
        <div className={`w-full h-full bg-[#0d0e17] rounded-2xl flex items-center justify-center ${className}`}>
          <Sparkles className="w-8 h-8 text-[#B896FF]" />
        </div>
      );
  }
};
