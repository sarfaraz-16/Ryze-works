"use client";

import React from "react";
import { Sparkles, Code2, TrendingUp, Layers, Compass } from "lucide-react";

export const HeroOrb: React.FC = () => {
  return (
    <div className="relative w-full max-w-[540px] aspect-square flex items-center justify-center select-none">
      {/* Outer ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-700/25 via-indigo-600/20 to-pink-600/20 rounded-full blur-[80px] pointer-events-none" />

      {/* Central 3D Glowing Energy Orb */}
      <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] rounded-full flex items-center justify-center">
        {/* Core sphere with rich dynamic gradient layers */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0d091a] via-[#1c1236] to-[#0b0818] border border-purple-500/20 shadow-[inset_0_0_60px_rgba(168,85,247,0.3)]" />

        {/* Rotating swirling plasma rings */}
        <div className="absolute inset-2 rounded-full border border-purple-500/30 animate-orb-spin opacity-80" />
        <div
          className="absolute inset-4 rounded-full border-2 border-dashed border-pink-500/20 animate-orb-spin"
          style={{ animationDirection: "reverse", animationDuration: "36s" }}
        />

        {/* Dynamic luminous light streaks (violet, electric blue, warm orange) */}
        <div className="absolute inset-6 rounded-full overflow-hidden">
          {/* Neon violet energy swoop */}
          <div className="absolute -top-10 -left-10 w-full h-full rounded-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent blur-md transform -rotate-45 animate-orb-pulse" />
          
          {/* Electric cyan streak */}
          <div className="absolute top-1/4 right-0 w-3/4 h-3/4 rounded-full bg-gradient-to-tr from-transparent via-cyan-400/30 to-transparent blur-lg transform rotate-12" />

          {/* Warm orange/amber streak (as in reference image) */}
          <div className="absolute bottom-6 left-1/4 w-3/5 h-2/5 rounded-full bg-gradient-to-r from-amber-500/35 via-orange-500/30 to-pink-500/20 blur-md transform -rotate-15" />
          
          {/* Inner core vortex */}
          <div className="absolute inset-8 rounded-full bg-radial from-purple-400/25 via-indigo-900/40 to-black/80 shadow-[inset_0_0_40px_rgba(236,72,153,0.4)]" />
        </div>

        {/* Spherical glossy reflection highlight */}
        <div className="absolute top-4 left-10 w-28 h-16 rounded-full bg-white/10 blur-[6px] transform -rotate-30 pointer-events-none" />
      </div>

      {/* Orbiting Badge 1: Top (AI STRATEGY) */}
      <div className="absolute top-2 sm:top-6 left-1/2 -translate-x-1/2 z-20 animate-float-1">
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#131322]/90 border border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.3)] backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-[11px] font-bold tracking-wider text-purple-200">
            AI STRATEGY
          </span>
        </div>
      </div>

      {/* Orbiting Badge 2: Top Right (BRANDING) */}
      <div className="absolute top-16 sm:top-24 right-0 sm:-right-2 z-20 animate-float-2">
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#131322]/90 border border-pink-500/40 shadow-[0_0_20px_rgba(236,72,153,0.3)] backdrop-blur-md">
          <Layers className="w-3.5 h-3.5 text-pink-400" />
          <span className="text-[11px] font-bold tracking-wider text-pink-200">
            BRANDING
          </span>
        </div>
      </div>

      {/* Orbiting Badge 3: Bottom Right (GROWTH) */}
      <div className="absolute bottom-14 sm:bottom-20 right-2 sm:right-4 z-20 animate-float-3">
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#131322]/90 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.25)] backdrop-blur-md">
          <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] font-bold tracking-wider text-amber-200">
            GROWTH
          </span>
        </div>
      </div>

      {/* Orbiting Badge 4: Bottom Left (EXPERIENCES) */}
      <div className="absolute bottom-16 sm:bottom-20 left-2 sm:left-4 z-20 animate-float-4">
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#131322]/90 border border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.3)] backdrop-blur-md">
          <Compass className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-[11px] font-bold tracking-wider text-indigo-200">
            EXPERIENCES
          </span>
        </div>
      </div>

      {/* Orbiting Badge 5: Center Left (</> TECHNOLOGY) */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6 z-20 animate-float-5">
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#131322]/90 border border-cyan-500/40 shadow-[0_0_20px_rgba(56,189,248,0.3)] backdrop-blur-md">
          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] font-bold tracking-wider text-cyan-200">
            &lt;/&gt; TECHNOLOGY
          </span>
        </div>
      </div>
    </div>
  );
};
