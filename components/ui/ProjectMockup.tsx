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
        <div className={`w-full h-full bg-gradient-to-br from-slate-200 via-slate-300 to-blue-200 rounded-2xl overflow-hidden relative flex items-center justify-center p-6 border border-white/20 shadow-inner ${className}`}>
          {/* Ambient subtle backlight */}
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-blue-500/30 rounded-full blur-3xl pointer-events-none" />

          {/* Hardware Diagnostic Device Mockup */}
          <div className="w-36 h-36 sm:w-44 sm:h-44 bg-white rounded-3xl shadow-2xl border border-slate-300 flex flex-col items-center justify-between p-4 transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
            <div className="w-full flex items-center justify-between">
              <span className="font-mono text-[9px] font-extrabold tracking-wider text-slate-800 uppercase">NOSTIC PRO</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
            </div>
            <div className="w-full h-14 bg-slate-950 rounded-xl flex flex-col items-center justify-center border border-slate-800 shadow-inner p-1">
              <span className="text-[12px] font-mono font-bold text-sky-400">98.6°F • 99% SpO2</span>
              <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                <Activity className="w-3 h-3 inline" /> OPTIMAL VITALS
              </span>
            </div>
            <div className="w-full flex items-center justify-between pt-1 border-t border-slate-100">
              <span className="w-6 h-1.5 bg-slate-200 rounded-full" />
              <span className="text-[8px] font-mono text-slate-500">BLE 5.3 MESH</span>
            </div>
          </div>
          <div className="absolute top-4 left-4 text-[11px] font-black tracking-wider text-slate-800/80 uppercase">
            nostic
          </div>
        </div>
      );

    case "zepto":
      return (
        <div className={`w-full h-full bg-gradient-to-br from-[#7042FF] via-[#5D30DF] to-[#1E085A] rounded-2xl overflow-hidden relative flex items-center justify-center p-6 border border-[#B896FF]/30 shadow-inner ${className}`}>
          <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-[#B896FF]/30 rounded-full blur-3xl pointer-events-none" />

          {/* Mobile App UI Render */}
          <div className="w-32 h-44 sm:w-36 sm:h-52 bg-[#080417] rounded-3xl border-2 border-white/20 shadow-2xl p-3 flex flex-col justify-between transform rotate-2 group-hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[11px] font-black text-amber-300 tracking-wider">zepto</span>
              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-amber-400 text-purple-950">10 MIN</span>
            </div>
            <div className="my-auto py-1">
              <div className="w-full bg-white/[0.06] rounded-xl p-2 mb-1.5 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-400/20 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-4 h-4 text-amber-300" />
                </div>
                <div className="leading-none">
                  <div className="text-[8px] font-bold text-white">Fresh Berries</div>
                  <div className="text-[7px] text-zinc-400 mt-0.5">Delivering in 6 mins</div>
                </div>
              </div>
            </div>
            <div className="w-full py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg text-[9px] font-black text-purple-950 flex items-center justify-center shadow-md">
              TRACK DELIVERY
            </div>
          </div>
          <div className="absolute top-4 left-4 text-[11px] font-black tracking-wider text-white/90">
            zepto
          </div>
        </div>
      );

    case "yulu":
      return (
        <div className={`w-full h-full bg-gradient-to-br from-[#0c333a] via-[#09252c] to-[#041217] rounded-2xl overflow-hidden relative flex items-center justify-center p-6 border border-cyan-500/30 shadow-inner ${className}`}>
          <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-400/25 rounded-full blur-3xl pointer-events-none" />

          {/* Electric Mobility UI */}
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-[#06181d]/90 border border-cyan-400/30 p-3.5 flex flex-col justify-between shadow-2xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-300">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                <span>YULU DEX</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-400/30">94%</span>
            </div>
            <div className="flex items-center justify-center py-2">
              <div className="w-16 h-16 rounded-full bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                <Bike className="w-8 h-8 text-cyan-300" />
              </div>
            </div>
            <div className="flex justify-between items-center text-[9px] text-zinc-300 border-t border-cyan-900/60 pt-1.5">
              <span>Range: 68 km</span>
              <span className="text-cyan-400 font-bold">UNLOCKED</span>
            </div>
          </div>
          <div className="absolute top-4 left-4 text-[11px] font-bold tracking-wider text-cyan-300">
            yulu
          </div>
        </div>
      );

    case "cred":
      return (
        <div className={`w-full h-full bg-gradient-to-br from-[#181820] via-[#0d0d12] to-black rounded-2xl overflow-hidden relative flex items-center justify-center p-6 border border-white/15 shadow-inner ${className}`}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-[#B896FF]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Luxury Dark-Mode Fintech Interface */}
          <div className="w-32 h-44 sm:w-36 sm:h-52 bg-black rounded-3xl border border-white/25 shadow-2xl p-3 flex flex-col justify-between transform rotate-2 group-hover:rotate-0 transition-transform duration-500">
            <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
              <span className="text-[8px] font-mono text-zinc-400">CRED BLACK</span>
              <span className="text-[9px] font-mono font-bold text-emerald-400">842 SCORE</span>
            </div>
            <div className="my-auto py-1">
              <div className="w-full aspect-[1.6/1] bg-gradient-to-tr from-zinc-800 via-zinc-900 to-black rounded-xl border border-white/20 p-2 flex flex-col justify-between shadow-lg">
                <div className="w-4 h-2.5 rounded-sm bg-amber-400/70" />
                <div className="text-[7px] font-mono text-zinc-400 tracking-wider">•••• 8820</div>
              </div>
            </div>
            <div className="w-full py-1.5 bg-white/10 hover:bg-white/15 rounded-lg text-[9px] font-mono text-white flex items-center justify-center border border-white/20 transition-colors">
              CLAIM REWARD
            </div>
          </div>
          <div className="absolute top-4 left-4 text-[11px] font-bold tracking-[0.2em] text-white/80 uppercase">
            CRED
          </div>
        </div>
      );

    case "simpl":
      return (
        <div className={`w-full h-full bg-gradient-to-br from-[#0c362d] via-[#07241e] to-[#031410] rounded-2xl overflow-hidden relative flex items-center justify-center p-6 border border-emerald-500/30 shadow-inner ${className}`}>
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

          {/* Checkout Interface Mockup */}
          <div className="w-32 h-44 sm:w-36 sm:h-52 bg-[#041d18] rounded-3xl border-2 border-emerald-400/30 shadow-2xl p-3 flex flex-col justify-between transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center justify-between border-b border-emerald-800/40 pb-1.5">
              <span className="text-[10px] font-bold text-emerald-300">Simpl</span>
              <span className="text-[8px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400">1-TAP</span>
            </div>
            <div className="my-auto text-center py-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto mb-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Check className="w-5 h-5 text-emerald-400 stroke-[3]" />
              </div>
              <div className="text-[9px] font-bold text-white">₹2,490 Approved</div>
              <div className="text-[7px] text-emerald-300/70">Biometric Verified</div>
            </div>
            <div className="w-full py-1.5 bg-emerald-500 rounded-lg text-[9px] font-bold text-emerald-950 flex items-center justify-center shadow-md">
              SUCCESSFUL
            </div>
          </div>
          <div className="absolute top-4 left-4 text-[11px] font-bold tracking-wider text-emerald-300">
            simpl
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
