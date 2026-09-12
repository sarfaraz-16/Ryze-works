import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const ClosingCTA: React.FC = () => {
  const marqueeItems = [
    "AI-NATIVE ARCHITECTURE",
    "10X VELOCITY",
    "ZERO BLOAT",
    "FULL-STACK CRAFT",
    "COMPOUNDING VALUE",
    "CATEGORY LEADERSHIP"
  ];

  return (
    <section className="relative overflow-hidden border-t border-white/[0.08] bg-[#080417]">
      {/* Full-bleed Pre-footer Anchor Marquee */}
      <div className="py-3.5 border-b border-white/[0.06] bg-[#080417]/80 overflow-hidden relative select-none">
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
      <div className="relative py-20 sm:py-28">
        {/* Background ambient gradient glow with brand spectrum */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(112,66,255,0.25),rgba(8,4,23,0)_70%)] pointer-events-none" />

        {/* Background neon undulating light wave ribbons matching WEBSITE UI.jpeg */}
        <div className="absolute inset-0 pointer-events-none opacity-50">
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

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.01em] [word-spacing:0.1em] text-white leading-snug">
              Ready to build what&apos;s next?<br />
              <span className="text-zinc-200">Let&apos;s create impact together.</span>
            </h2>
          </div>

          <div className="shrink-0">
            <Link href="/start-a-project">
              <Button
                variant="primary"
                size="lg"
                className="text-xs font-bold tracking-[0.15em] px-8 py-4 rounded-xl"
              >
                START A PROJECT →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
