"use client";

import React from "react";
import { Activity, ShoppingBag, Bike, Check, ShieldCheck, Sparkles } from "lucide-react";

export interface ProjectDetailHeroProps {
  slug: string;
  client: string;
  title: string;
  category: string;
  industry: string;
}

// Brand-specific ambient radial spotlights
const BRAND_GLOWS: Record<string, string> = {
  nostic: "rgba(168, 85, 247, 0.25)",   // Deep silver / violet glow
  zepto: "rgba(147, 51, 234, 0.30)",    // Electric purple / berry glow
  yulu: "rgba(6, 182, 212, 0.28)",      // Deep cyan / emerald glow
  cred: "rgba(245, 158, 11, 0.20)",     // Subtle obsidian / gold glow
  simpl: "rgba(16, 185, 129, 0.28)",    // Mint / emerald green glow
  razorpay: "rgba(59, 130, 246, 0.28)", // Royal blue / indigo glow
};

export const ProjectDetailHero: React.FC<ProjectDetailHeroProps> = ({
  slug,
  client,
  
  
  industry,
}) => {
  const brandGlow = BRAND_GLOWS[slug.toLowerCase()] || "rgba(168, 85, 247, 0.25)";

  const renderHeroMockup = () => {
    switch (slug.toLowerCase()) {
      case "nostic":
        return (
          <div className="w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 bg-[#141021] rounded-[36px] border border-violet-400/30 shadow-[0_35px_70px_-15px_rgba(0,0,0,0.9),0_0_45px_rgba(168,85,247,0.25)] p-6 sm:p-8 flex flex-col justify-between transform -rotate-3 hover:rotate-0 transition-transform duration-700 select-none">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs sm:text-sm font-extrabold tracking-widest text-zinc-200 uppercase">
                  NOSTIC PRO
                </span>
                <span className="text-[10px] font-mono text-violet-400/80 bg-violet-950/60 px-2 py-0.5 rounded-full border border-violet-500/30">
                  HW-DIAG 3.4
                </span>
              </div>
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_#10b981]" />
            </div>

            <div className="w-full h-28 sm:h-36 bg-[#090612] rounded-2xl sm:rounded-3xl border border-violet-500/40 shadow-inner flex flex-col items-center justify-center p-4">
              <span className="text-xl sm:text-3xl font-mono font-bold text-violet-200 tracking-tight drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]">
                98.6°F • 99% SpO2
              </span>
              <span className="text-xs sm:text-sm font-mono text-emerald-400 flex items-center gap-2 mt-2 font-medium">
                <Activity className="w-4 h-4 inline animate-pulse" /> OPTIMAL CLINICAL VITALS
              </span>
            </div>

            <div className="w-full flex items-center justify-between pt-3 border-t border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-8 h-2 bg-white/20 rounded-full" />
                <span className="text-[10px] sm:text-xs font-mono text-zinc-400">BLE 5.3 MESH PROTOCOL</span>
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-emerald-400 font-semibold">FDA CLASS II CERTIFIED</span>
            </div>
          </div>
        );

      case "zepto":
        return (
          <div className="w-64 h-[420px] sm:w-76 sm:h-[480px] bg-[#080417] rounded-[44px] border-2 border-white/30 shadow-[0_35px_70px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(147,51,234,0.3)] p-5 sm:p-6 flex flex-col justify-between transform rotate-2 hover:rotate-0 transition-transform duration-700 select-none">
            <div className="w-20 h-2 bg-white/25 rounded-full mx-auto mb-2 shrink-0" />
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-base sm:text-lg font-black text-amber-300 tracking-wider">zepto</span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-400 text-purple-950 shadow-md">
                10 MIN PROMISE
              </span>
            </div>
            <div className="my-auto py-2">
              <div className="w-full bg-white/[0.08] rounded-2xl p-3.5 mb-2.5 flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-400/20 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-6 h-6 text-amber-300" />
                </div>
                <div className="leading-none">
                  <div className="text-xs sm:text-sm font-bold text-white">Fresh Organic Berries</div>
                  <div className="text-[10px] sm:text-xs text-zinc-400 mt-1">Runner 400m away · 4 mins</div>
                </div>
              </div>
              <div className="w-full p-3 rounded-xl bg-violet-950/40 border border-violet-500/20 text-[10px] font-mono text-violet-300 flex items-center justify-between">
                <span>ORDER #ZP-9821</span>
                <span className="text-emerald-400 font-bold">DISPATCHED</span>
              </div>
            </div>
            <div className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl text-xs sm:text-sm font-black text-purple-950 flex items-center justify-center shadow-xl shrink-0">
              LIVE RUNNER TRACKING
            </div>
          </div>
        );

      case "yulu":
        return (
          <div className="w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 rounded-[40px] bg-[#06181d]/95 border border-cyan-400/40 shadow-[0_35px_70px_-15px_rgba(0,0,0,0.9),0_0_45px_rgba(6,182,212,0.3)] p-6 sm:p-8 flex flex-col justify-between transform -rotate-2 hover:rotate-0 transition-transform duration-700 select-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-cyan-300">
                <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8]" />
                <span>YULU DEX FLEET</span>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/90 px-3 py-1 rounded-full border border-cyan-400/40">
                94% DUAL BATTERY
              </span>
            </div>
            <div className="flex items-center justify-center py-4">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-cyan-950/80 border-2 border-cyan-400/50 flex items-center justify-center shadow-[0_0_35px_rgba(56,189,248,0.35)]">
                <Bike className="w-14 h-14 sm:w-20 sm:h-20 text-cyan-300" />
              </div>
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm text-zinc-300 border-t border-cyan-900/70 pt-3">
              <span>Estimated Range: 68 km</span>
              <span className="text-cyan-400 font-bold tracking-wider">SMART DOCK UNLOCKED</span>
            </div>
          </div>
        );

      case "cred":
        return (
          <div className="w-64 h-[420px] sm:w-76 sm:h-[480px] bg-black rounded-[44px] border border-white/30 shadow-[0_35px_70px_-15px_rgba(0,0,0,0.95),0_0_45px_rgba(245,158,11,0.22)] p-5 sm:p-6 flex flex-col justify-between transform rotate-2 hover:rotate-0 transition-transform duration-700 select-none">
            <div className="w-20 h-2 bg-white/25 rounded-full mx-auto mb-2 shrink-0" />
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-xs font-mono text-zinc-400 tracking-wider">CRED BLACK MEMBER</span>
              <span className="text-xs font-mono font-bold text-emerald-400">842 SCORE</span>
            </div>
            <div className="my-auto py-2">
              <div className="w-full aspect-[1.58/1] bg-gradient-to-tr from-zinc-800 via-zinc-900 to-black rounded-2xl border border-white/25 p-3.5 sm:p-4 flex flex-col justify-between shadow-2xl">
                <div className="w-7 h-4.5 rounded bg-amber-400/80 shadow-md" />
                <div className="text-xs sm:text-sm font-mono text-zinc-300 tracking-widest">•••• •••• •••• 8820</div>
              </div>
            </div>
            <div className="w-full py-2.5 bg-white/10 hover:bg-white/15 rounded-2xl text-xs sm:text-sm font-mono text-white flex items-center justify-center border border-white/25 transition-colors shrink-0">
              EXCLUSIVE PRIVILEGE UNLOCKED
            </div>
          </div>
        );

      case "simpl":
        return (
          <div className="w-64 h-[420px] sm:w-76 sm:h-[480px] bg-[#041d18] rounded-[44px] border-2 border-emerald-400/40 shadow-[0_35px_70px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(16,185,129,0.3)] p-5 sm:p-6 flex flex-col justify-between transform -rotate-2 hover:rotate-0 transition-transform duration-700 select-none">
            <div className="w-20 h-2 bg-emerald-400/30 rounded-full mx-auto mb-2 shrink-0" />
            <div className="flex items-center justify-between border-b border-emerald-800/40 pb-3">
              <span className="text-base sm:text-lg font-bold text-emerald-300">Simpl</span>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-semibold">
                1-TAP CHECKOUT
              </span>
            </div>
            <div className="my-auto text-center py-3">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400/50 flex items-center justify-center mx-auto mb-3 shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                <Check className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400 stroke-[3]" />
              </div>
              <div className="text-sm sm:text-base font-bold text-white">₹2,490.00 Approved</div>
              <div className="text-xs text-emerald-300/80 mt-1">Biometric Instant Clearance</div>
            </div>
            <div className="w-full py-2.5 bg-emerald-500 rounded-2xl text-xs sm:text-sm font-bold text-emerald-950 flex items-center justify-center shadow-xl shrink-0">
              TRANSACTION SETTLED
            </div>
          </div>
        );

      case "razorpay":
        return (
          <div className="w-64 h-[420px] sm:w-76 sm:h-[480px] bg-[#050e24] rounded-[44px] border-2 border-blue-400/40 shadow-[0_35px_70px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(59,130,246,0.3)] p-5 sm:p-6 flex flex-col justify-between transform rotate-2 hover:rotate-0 transition-transform duration-700 select-none">
            <div className="w-20 h-2 bg-blue-400/30 rounded-full mx-auto mb-2 shrink-0" />
            <div className="flex items-center justify-between border-b border-blue-800/40 pb-3">
              <span className="text-base sm:text-lg font-black italic tracking-wide text-blue-300">RazorpayX</span>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-950 border border-blue-500/40 text-blue-400 font-semibold">
                INSTANT PAYOUT
              </span>
            </div>
            <div className="my-auto text-center py-3">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-500/20 border-2 border-blue-400/50 flex items-center justify-center mx-auto mb-3 shadow-[0_0_25px_rgba(59,130,246,0.4)]">
                <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 stroke-[2.5]" />
              </div>
              <div className="text-sm sm:text-base font-bold text-white">₹45,000.00 Settled</div>
              <div className="text-xs text-blue-300/80 mt-1">Enterprise Banking Sub-second Rail</div>
            </div>
            <div className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl text-xs sm:text-sm font-bold text-white flex items-center justify-center shadow-xl shrink-0">
              SETTLEMENT VERIFIED
            </div>
          </div>
        );

      default:
        return (
          <div className="w-64 h-64 rounded-3xl bg-[#141021] border border-white/20 flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-[#B896FF]" />
          </div>
        );
    }
  };

  return (
    <div className="relative rounded-3xl overflow-hidden min-h-[460px] sm:min-h-[540px] md:min-h-[600px] border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl shadow-black/90 mb-14 flex items-center justify-center p-6 sm:p-12 relative select-none">
      {/* Dynamic Radial Spotlight Focused Directly Behind Mockup */}
      <div
        className="absolute inset-0 pointer-events-none opacity-85 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${brandGlow} 0%, transparent 68%)`,
        }}
      />

      {/* Subtle Background Grid Stardust Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      {/* Hero Showcase Center Stage */}
      <div className="relative z-10 w-full flex items-center justify-center py-6">
        {renderHeroMockup()}
      </div>

      {/* Top Left Watermark Tag */}
      <div className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-widest text-zinc-400/80 bg-white/[0.04] backdrop-blur-md px-3 py-1 rounded-full border border-white/10 pointer-events-none">
        {client} {"//"} {industry}
      </div>

      {/* Bottom Right Verified Badge */}
      <div className="absolute bottom-6 right-6 font-mono text-[9px] uppercase tracking-widest text-emerald-400 bg-emerald-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30 pointer-events-none">
        CASE ARTIFACT {"//"} VERIFIED
      </div>
    </div>
  );
};

export default ProjectDetailHero;
