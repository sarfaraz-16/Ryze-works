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

    // Scroll to the Ryze AI section and dispatch custom event to set the prompt
    const aiSection = document.getElementById("ryze-ai");
    if (aiSection) {
      aiSection.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(
        new CustomEvent("ryze-ai-prompt", { detail: heroPrompt })
      );
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/40 text-purple-300 text-[11px] font-bold tracking-[0.15em] uppercase mb-6">
              AI-NATIVE CREATIVE & TECHNOLOGY PARTNER
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              Strategy. Design.<br />
              Technology. Content.<br />
              <span className="gradient-text-purple">Powered by AI.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-white/60 max-w-xl leading-relaxed mb-8">
              We help ambitious brands build, grow and scale with clarity, creativity and intelligent systems.
            </p>

            {/* Interactive Prompt Search Box */}
            <div className="w-full max-w-lg mb-8">
              <form
                onSubmit={handleHeroPromptSubmit}
                className="relative rounded-xl bg-[#0f101a]/90 border border-white/10 hover:border-purple-500/40 focus-within:border-purple-500/60 p-3.5 shadow-xl transition-all duration-200"
              >
                <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-1.5">
                  What are you trying to build?
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={heroPrompt}
                    onChange={(e) => setHeroPrompt(e.target.value)}
                    placeholder="Tell Ryze what you're working on..."
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Send to Ryze AI"
                    className="w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center text-white shrink-0 shadow-md transition-colors"
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
                  icon={<Sparkles className="w-4 h-4 text-purple-200" />}
                  className="bg-[#6366f1] hover:bg-[#4f46e5] text-xs font-bold tracking-wider px-6 py-3"
                >
                  START WITH AI
                </Button>
              </Link>
              <Link href="#work">
                <Button
                  variant="outline"
                  size="md"
                  className="border-white/15 text-xs font-bold tracking-wider px-6 py-3 text-white/90 hover:text-white hover:border-white/30"
                >
                  EXPLORE OUR WORK →
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Glowing Orb & Orbiting Badges */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <HeroOrb />
          </div>
        </div>
      </div>
    </section>
  );
};
