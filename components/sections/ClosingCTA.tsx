import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const ClosingCTA: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden border-t border-white/[0.06] bg-[#07070b]">
      {/* Background neon undulating light wave ribbons */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg
          viewBox="0 0 1440 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
        >
          <path
            d="M-100,140 C300,280 800,40 1600,180"
            stroke="url(#neon-purple-grad)"
            strokeWidth="3"
            filter="url(#glow-filter)"
          />
          <path
            d="M-100,180 C400,60 900,260 1600,120"
            stroke="url(#neon-pink-grad)"
            strokeWidth="2"
            opacity="0.7"
          />
          <path
            d="M-100,210 C500,110 850,220 1600,150"
            stroke="url(#neon-cyan-grad)"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <defs>
            <linearGradient id="neon-purple-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="neon-pink-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="neon-cyan-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
            </linearGradient>
            <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Ready to build what&apos;s next?<br />
            <span className="text-white/85">Let&apos;s create impact together.</span>
          </h2>
        </div>

        <div className="shrink-0">
          <Link href="#contact">
            <Button
              variant="gradient"
              size="lg"
              className="bg-[#6366f1] hover:bg-[#4f46e5] text-xs font-bold tracking-[0.15em] px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(99,102,241,0.5)]"
            >
              START A PROJECT →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
