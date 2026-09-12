"use client";

import React from "react";
import { Sparkles, Code2, TrendingUp, Layers, Zap } from "lucide-react";

export const HeroOrb: React.FC = () => {
  return (
    <div className="relative w-full max-w-[540px] aspect-square flex items-center justify-center select-none">
      {/* Outer ambient glow using brand spectrum */}
      <div
        className="absolute inset-0 rounded-full blur-[90px] pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, rgba(112, 66, 255, 0.45) 0%, rgba(67, 24, 209, 0.3) 40%, rgba(30, 8, 90, 0.2) 70%, rgba(8, 4, 23, 0) 100%)"
        }}
      />

      {/* Secondary atmospheric rim glow */}
      <div className="absolute -inset-4 rounded-full bg-[radial-gradient(ellipse_at_top_right,rgba(184,150,255,0.25),transparent_60%)] blur-[50px] pointer-events-none" />

      {/* Central 3D Glowing Energy Orb */}
      <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full flex items-center justify-center">
        {/* Core sphere with rich dynamic gradient layers */}
        <div
          className="absolute inset-0 rounded-full border border-[#B896FF]/20 shadow-[inset_0_0_80px_rgba(112,66,255,0.45),0_0_60px_rgba(30,8,90,0.6)]"
          style={{
            background:
              "linear-gradient(135deg, #C5B0FA 0%, #A081F3 10%, #7D52EE 20%, #5D30DF 30%, #4726AF 40%, #341986 50%, #23135B 60%, #120839 70%, #04031A 80%, #010314 100%)"
          }}
        />

        {/* Rotating swirling plasma rings */}
        <div className="absolute inset-2 rounded-full border border-[#B896FF]/35 animate-orb-spin opacity-85" />
        <div
          className="absolute inset-5 rounded-full border-2 border-dashed border-[#7042FF]/30 animate-orb-spin"
          style={{ animationDirection: "reverse", animationDuration: "32s" }}
        />

        {/* Dynamic luminous light streaks (violet, electric blue, warm orange from reference) */}
        <div className="absolute inset-6 rounded-full overflow-hidden">
          {/* Neon violet energy swoop */}
          <div className="absolute -top-10 -left-10 w-full h-full rounded-full bg-gradient-to-r from-transparent via-[#7042FF]/50 to-transparent blur-md transform -rotate-45 animate-orb-pulse" />

          {/* Electric cyan streak */}
          <div className="absolute top-1/4 right-0 w-3/4 h-3/4 rounded-full bg-gradient-to-tr from-transparent via-cyan-400/35 to-transparent blur-lg transform rotate-12" />

          {/* Warm amber/orange flame streak matching reference image */}
          <div className="absolute bottom-5 left-1/4 w-3/5 h-2/5 rounded-full bg-gradient-to-r from-amber-500/45 via-orange-500/40 to-pink-500/25 blur-md transform -rotate-15" />

          {/* Inner core vortex */}
          <div className="absolute inset-8 rounded-full bg-radial from-[#B896FF]/30 via-[#1E085A]/60 to-black/90 shadow-[inset_0_0_50px_rgba(112,66,255,0.5)]" />
        </div>

        {/* Spherical glossy reflection highlight */}
        <div className="absolute top-5 left-12 w-32 h-16 rounded-full bg-white/20 blur-[8px] transform -rotate-30 pointer-events-none" />
      </div>

      {/* Orbiting Badge 1: Top (AI STRATEGY) */}
      <div className="absolute top-2 sm:top-5 left-1/2 -translate-x-1/2 z-20 animate-float-1">
        <div className="bg-[#080417]/70 border border-white/15 backdrop-blur-md text-zinc-200 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#1E085A]/40 hover:border-[#B896FF]/40 transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
          <span className="font-semibold tracking-wider uppercase text-[10px] sm:text-xs">
            AI STRATEGY
          </span>
        </div>
      </div>

      {/* Orbiting Badge 2: Top Right (BRANDING) */}
      <div className="absolute top-14 sm:top-20 right-0 sm:-right-2 z-20 animate-float-2">
        <div className="bg-[#080417]/70 border border-white/15 backdrop-blur-md text-zinc-200 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#1E085A]/40 hover:border-[#B896FF]/40 transition-colors">
          <Layers className="w-3.5 h-3.5 text-[#B896FF]" />
          <span className="font-semibold tracking-wider uppercase text-[10px] sm:text-xs">
            BRANDING
          </span>
        </div>
      </div>

      {/* Orbiting Badge 3: Center Left (</> TECHNOLOGY) */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6 z-20 animate-float-5">
        <div className="bg-[#080417]/70 border border-white/15 backdrop-blur-md text-zinc-200 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#1E085A]/40 hover:border-[#B896FF]/40 transition-colors">
          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold tracking-wider uppercase text-[10px] sm:text-xs">
            &lt;/&gt; TECHNOLOGY
          </span>
        </div>
      </div>

      {/* Orbiting Badge 4: Bottom Left (EXPERIENCES) */}
      <div className="absolute bottom-12 sm:bottom-16 left-2 sm:left-4 z-20 animate-float-4">
        <div className="bg-[#080417]/70 border border-white/15 backdrop-blur-md text-zinc-200 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#1E085A]/40 hover:border-[#B896FF]/40 transition-colors">
          <Zap className="w-3.5 h-3.5 text-[#B896FF]" />
          <span className="font-semibold tracking-wider uppercase text-[10px] sm:text-xs">
            EXPERIENCES
          </span>
        </div>
      </div>

      {/* Orbiting Badge 5: Bottom Right (GROWTH) */}
      <div className="absolute bottom-10 sm:bottom-16 right-2 sm:right-4 z-20 animate-float-3">
        <div className="bg-[#080417]/70 border border-white/15 backdrop-blur-md text-zinc-200 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#1E085A]/40 hover:border-[#B896FF]/40 transition-colors">
          <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold tracking-wider uppercase text-[10px] sm:text-xs">
            GROWTH
          </span>
        </div>
      </div>
    </div>
  );
};
