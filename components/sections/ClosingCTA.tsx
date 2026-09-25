"use client";

import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";

const CosmicHorizon3D = dynamic(() => import("@/components/ui/CosmicHorizon3D"), {
  ssr: false,
  loading: () => null,
});

export const ClosingCTA: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const arrowRef = useRef<HTMLDivElement>(null);
  
  const marqueeItems = [
    "AI-NATIVE ARCHITECTURE",
    "10X VELOCITY",
    "ZERO BLOAT",
    "FULL-STACK CRAFT",
    "COMPOUNDING VALUE",
    "CATEGORY LEADERSHIP"
  ];

  useEffect(() => {
    if (shouldReduceMotion) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!arrowRef.current) return;
      const rect = arrowRef.current.getBoundingClientRect();
      const diskCenterX = rect.left + rect.width / 2;
      const diskCenterY = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - diskCenterY, e.clientX - diskCenterX) * (180 / Math.PI);
      
      arrowRef.current.style.transform = `rotate(${angle}deg)`;
    };
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion]);

  return (
    <section className="relative overflow-hidden border-t border-white/[0.08] bg-[#080417]">
      {/* Full-bleed Pre-footer Anchor Marquee */}
      <div className="py-3.5 border-b border-white/[0.06] bg-[#080417]/80 overflow-hidden relative select-none z-20">
        <div className="animate-marquee flex items-center gap-12 font-mono text-[11px] font-bold tracking-[0.25em] text-[#B896FF]/70 uppercase">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-12 shrink-0">
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#7042FF] shadow-[0_0_8px_#7042FF]" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Closing CTA Container */}
      <div className="relative py-24 md:py-32 flex flex-col items-center justify-center min-h-[70vh]">
        
        {/* Curved Cosmic Horizon Backdrop */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[350px] rounded-[100%] bg-gradient-to-t from-[#7042FF]/15 via-transparent to-transparent pointer-events-none blur-2xl z-0" />

        {/* 3D Cosmic Event Horizon Warp Grid */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <CosmicHorizon3D />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#030014]/40 to-[#030014] pointer-events-none" />
        </div>

        {/* Background ambient gradient glow with brand spectrum */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(112,66,255,0.25),rgba(8,4,23,0)_70%)] pointer-events-none z-0" />

        {/* Background neon undulating light wave ribbons matching WEBSITE UI.jpeg */}
        <div className="absolute inset-0 pointer-events-none opacity-50 z-0">
          <svg
            viewBox="0 0 1440 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover"
          >
            <path
              d="M-100,140 C300,280 800,40 1600,180"
              stroke="url(#brand-neon-purple)"
              strokeWidth="3.5"
              filter="url(#glow-filter-brand)"
            />
            <path
              d="M-100,180 C400,60 900,260 1600,120"
              stroke="url(#brand-neon-light)"
              strokeWidth="2"
              opacity="0.8"
            />
            <path
              d="M-100,210 C500,110 850,220 1600,150"
              stroke="url(#brand-neon-deep)"
              strokeWidth="1.5"
              opacity="0.6"
            />
            <defs>
              <linearGradient id="brand-neon-purple" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E085A" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#7042FF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#4318D1" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="brand-neon-light" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7042FF" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#B896FF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#7042FF" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="brand-neon-deep" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4318D1" stopOpacity="0" />
                <stop offset="50%" stopColor="#7042FF" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#B896FF" stopOpacity="0" />
              </linearGradient>
              <filter id="glow-filter-brand" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>

        {/* Main Content Overlay */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center">
          
          {/* Agency Metadata & Availability */}
          <div className="text-xs font-mono tracking-widest uppercase text-emerald-400 flex items-center justify-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
            ACCEPTING SELECT Q4 2026 PROJECTS
          </div>

          {/* Giant Display Typography */}
          <div className="flex flex-col items-center justify-center gap-2 md:gap-4 mb-16 relative pointer-events-none">
            <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.95] text-white uppercase text-center">
              HAVE A VISION?
            </h2>
            <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.95] uppercase text-center bg-gradient-to-r from-white via-[#c7d2fe] to-[#7042FF] bg-clip-text text-transparent">
              LET&apos;S BUILD IT.
            </h2>
          </div>

          {/* Interactive Compass Action Disk */}
          <div className="relative mt-10 mb-12 cursor-pointer z-20">
            <Link href="/contact" className="block relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7042FF] rounded-full" aria-label="Start a project">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-[#120a2e]/90 border-2 border-[#7042FF]/40 shadow-[0_0_40px_rgba(112,66,255,0.25)] hover:border-[#38bdf8] hover:shadow-[0_0_60px_rgba(56,189,248,0.35)] transition-all duration-300 flex flex-col items-center justify-center">
                <span className="text-[12px] font-mono tracking-widest text-slate-200 font-semibold group-hover:text-white uppercase mb-2">
                  START
                </span>
                {/* Center dot/pivot */}
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#38bdf8]/30 transition-colors">
                  <div 
                    ref={arrowRef} 
                    className="absolute w-full h-full flex items-center justify-center transition-transform duration-75 ease-out origin-center"
                    style={shouldReduceMotion ? {} : { transform: 'rotate(0deg)' }}
                  >
                    <ArrowRight className="w-6 h-6 text-white group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Quick-access email */}
          <a href="mailto:hello@ryzeworks.com" className="text-slate-400 hover:text-white hover:underline underline-offset-4 transition-colors font-mono text-sm tracking-wide z-20 relative">
            HELLO@RYZEWORKS.COM
          </a>
          
        </div>
      </div>
    </section>
  );
};
