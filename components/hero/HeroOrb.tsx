"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Sparkles, Code2, TrendingUp, Layers, Zap } from "lucide-react";
import { usePreloaderReveal } from "@/hooks/usePreloaderReveal";

const HeroOrb3D = dynamic(() => import("@/components/hero/HeroOrb3D"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full aspect-square max-w-[620px] mx-auto flex items-center justify-center">
      <div className="w-[340px] h-[340px] rounded-full bg-violet-600/15 blur-3xl animate-pulse" />
    </div>
  ),
});

export const HeroOrb: React.FC = () => {
  const revealed = usePreloaderReveal();

  return (
    <div className="relative w-full max-w-[620px] aspect-square flex items-center justify-center select-none">
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

      {/* 3D WebGL Hero Orb Canvas */}
      <div className="relative w-full h-full flex items-center justify-center">
        {revealed && <HeroOrb3D />}
      </div>

      {/* Floating Badges Container: z-30, pointer-events-none so mouse drag passes through to 3D canvas */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {/* Orbiting Badge 1: Top (AI STRATEGY) */}
        <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 animate-float-1 pointer-events-auto">
          <Link
            href="/services/strategy"
            className="block bg-[#080417]/70 border border-white/15 backdrop-blur-md text-zinc-200 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#1E085A]/40 hover:border-[#B896FF]/40 hover:scale-105 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
            <span className="font-semibold tracking-wider uppercase text-[10px] sm:text-xs">
              AI STRATEGY
            </span>
          </Link>
        </div>

        {/* Orbiting Badge 2: Top Right (BRANDING) */}
        <div className="absolute top-16 sm:top-20 right-2 sm:right-4 animate-float-2 pointer-events-auto">
          <Link
            href="/services/brand-creative"
            className="block bg-[#080417]/70 border border-white/15 backdrop-blur-md text-zinc-200 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#1E085A]/40 hover:border-[#B896FF]/40 hover:scale-105 transition-all cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-[#B896FF]" />
            <span className="font-semibold tracking-wider uppercase text-[10px] sm:text-xs">
              BRANDING
            </span>
          </Link>
        </div>

        {/* Orbiting Badge 3: Center Left (</> TECHNOLOGY) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 sm:left-2 animate-float-5 pointer-events-auto">
          <Link
            href="/services/technology"
            className="block bg-[#080417]/70 border border-white/15 backdrop-blur-md text-zinc-200 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#1E085A]/40 hover:border-[#B896FF]/40 hover:scale-105 transition-all cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold tracking-wider uppercase text-[10px] sm:text-xs">
              &lt;/&gt; TECHNOLOGY
            </span>
          </Link>
        </div>

        {/* Orbiting Badge 4: Bottom Left (EXPERIENCES) */}
        <div className="absolute bottom-12 sm:bottom-16 left-3 sm:left-6 animate-float-4 pointer-events-auto">
          <Link
            href="/services"
            className="block bg-[#080417]/70 border border-white/15 backdrop-blur-md text-zinc-200 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#1E085A]/40 hover:border-[#B896FF]/40 hover:scale-105 transition-all cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-[#B896FF]" />
            <span className="font-semibold tracking-wider uppercase text-[10px] sm:text-xs">
              EXPERIENCES
            </span>
          </Link>
        </div>

        {/* Orbiting Badge 5: Bottom Right (GROWTH) */}
        <div className="absolute bottom-10 sm:bottom-16 right-3 sm:right-6 animate-float-3 pointer-events-auto">
          <Link
            href="/services"
            className="block bg-[#080417]/70 border border-white/15 backdrop-blur-md text-zinc-200 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#1E085A]/40 hover:border-[#B896FF]/40 hover:scale-105 transition-all cursor-pointer"
          >
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold tracking-wider uppercase text-[10px] sm:text-xs">
              GROWTH
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
