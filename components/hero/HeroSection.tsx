"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroOrb } from "./HeroOrb";

export const HeroSection: React.FC = () => {
  const [heroPrompt, setHeroPrompt] = useState("");

  const handleHeroPromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroPrompt.trim()) return;

    const aiSection = document.getElementById("ryze-ai");
    if (aiSection) {
      aiSection.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(
        new CustomEvent("ryze-ai-prompt", { detail: heroPrompt.trim() })
      );
      setHeroPrompt("");
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Brand verified hero ambient backlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      {/* Secondary atmospheric soft flare */}
      <div className="absolute top-1/4 left-10 w-[450px] h-[450px] bg-[#4318D1]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E085A]/60 border border-[#7042FF]/40 text-[#B896FF] font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase mb-6 shadow-[0_0_20px_rgba(112,66,255,0.25)] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B896FF] animate-pulse" />
              <span>AI-NATIVE CREATIVE &amp; TECHNOLOGY PARTNER</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.01em] [word-spacing:0.1em] text-white mb-6">
              Strategy. Design.<br />
              Technology. Content.<br />
              <span className="gradient-text-purple">Powered by AI.</span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-xl mb-8">
              We help ambitious brands build, grow and scale with clarity, creativity and intelligent systems.
            </p>

            {/* Interactive Prompt Search Box */}
            <div className="w-full max-w-lg mb-8">
              <form
                onSubmit={handleHeroPromptSubmit}
                className="relative rounded-2xl bg-white/[0.04] border border-white/20 focus-within:border-[#B896FF] focus-within:ring-1 focus-within:ring-[#B896FF] p-4 shadow-2xl backdrop-blur-md transition-all duration-300 group"
              >
                <div className="font-mono text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  What are you trying to build?
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={heroPrompt}
                    onChange={(e) => setHeroPrompt(e.target.value)}
                    placeholder="Tell Ryze what you're working on..."
                    className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Send to Ryze AI"
                    className="w-9 h-9 rounded-full bg-gradient-to-r from-[#7042FF] to-[#4318D1] hover:from-[#8257ff] hover:to-[#5022e0] flex items-center justify-center text-white shrink-0 shadow-[0_0_20px_rgba(112,66,255,0.4)] transition-all transform hover:scale-105 active:scale-95"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Dual CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link href="#ryze-ai">
                <Button
                  variant="primary"
                  size="md"
                  icon={<Sparkles className="w-4 h-4 text-white" />}
                  className="text-xs font-bold tracking-wider px-7 py-3"
                >
                  START WITH AI
                </Button>
              </Link>
              <Link href="#work">
                <Button
                  variant="outline"
                  size="md"
                  className="border-white/20 hover:border-[#B896FF]/50 text-xs font-bold tracking-wider px-7 py-3 text-zinc-200 hover:text-white"
                >
                  EXPLORE OUR WORK →
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Glowing Orb & Orbiting Badges */}
          <div className="lg:col-span-5 flex items-center justify-center relative mt-8 lg:mt-0">
            <HeroOrb />
          </div>
        </div>
      </div>
    </section>
  );
};
