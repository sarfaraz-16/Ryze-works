"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroOrb } from "./HeroOrb";

const PROMPTS = [
  "Scale our brand with custom AI models...",
  "Redesign mobile UX for 10M+ users...",
  "Automate enterprise creative workflows...",
  "Architect full-stack Next.js platforms...",
];

const QUICK_CHIPS = [
  {
    label: "AI Strategy",
    prompt: "AI Strategy: What are the best opportunities to embed AI in our enterprise stack?",
  },
  {
    label: "Product Design",
    prompt: "Product Design: How would Ryze approach a complete UX/UI overhaul for scale?",
  },
  {
    label: "Full-Stack Build",
    prompt: "Full-Stack Build: What is the recommended Next.js and Supabase architecture?",
  },
  {
    label: "Performance Growth",
    prompt: "Performance Growth: How can we optimize our conversion funnels and speed?",
  },
];

export const HeroSection: React.FC = () => {
  const [heroPrompt, setHeroPrompt] = useState("");
  const [placeholderText, setPlaceholderText] = useState(PROMPTS[0]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Animated Cycling Placeholder / Typewriter
  useEffect(() => {
    if (isFocused || heroPrompt) return;

    let currentPromptIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const tick = () => {
      const currentFullText = PROMPTS[currentPromptIdx];

      if (isDeleting) {
        charIdx--;
        setPlaceholderText(currentFullText.substring(0, charIdx));
        if (charIdx === 0) {
          isDeleting = false;
          currentPromptIdx = (currentPromptIdx + 1) % PROMPTS.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 25);
      } else {
        charIdx++;
        setPlaceholderText(currentFullText.substring(0, charIdx));
        if (charIdx === currentFullText.length) {
          isDeleting = true;
          timer = setTimeout(tick, 2600);
          return;
        }
        timer = setTimeout(tick, 45);
      }
    };

    timer = setTimeout(tick, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [isFocused, heroPrompt]);

  const handleHeroPromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = heroPrompt.trim() || placeholderText;
    if (!query) return;

    const aiSection = document.getElementById("ryze-ai");
    if (aiSection) {
      aiSection.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(
        new CustomEvent("ryze-ai-prompt", { detail: query })
      );
      setHeroPrompt("");
    }
  };

  const handleChipClick = (promptText: string) => {
    setHeroPrompt(promptText);
    inputRef.current?.focus();
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
                className="relative rounded-2xl bg-white/[0.04] border border-white/15 focus-within:border-violet-500/70 focus-within:ring-1 focus-within:ring-violet-500/30 focus-within:shadow-[0_0_25px_rgba(139,92,246,0.18)] p-3.5 px-4 shadow-2xl backdrop-blur-md transition-all duration-200 group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <label
                      htmlFor="hero-prompt-input"
                      className="text-[10px] tracking-wider uppercase font-medium text-zinc-400 mb-1 block select-none"
                    >
                      What are you trying to build?
                    </label>
                    <input
                      ref={inputRef}
                      id="hero-prompt-input"
                      type="text"
                      value={heroPrompt}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onChange={(e) => setHeroPrompt(e.target.value)}
                      placeholder={isFocused && !heroPrompt ? "Tell Ryze what you're working on..." : placeholderText}
                      className="w-full bg-transparent border-0 outline-none ring-0 focus:ring-0 focus:outline-none focus:border-0 shadow-none text-sm text-zinc-100 placeholder:text-zinc-500 font-sans caret-violet-400 p-0"
                    />
                  </div>
                  <button
                    type="submit"
                    aria-label="Send to Ryze AI"
                    className="w-8 h-8 rounded-full bg-violet-600 hover:bg-violet-500 text-white flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(139,92,246,0.35)]"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Interactive Quick-Starter Chips */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {QUICK_CHIPS.map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => handleChipClick(chip.prompt)}
                    className="text-[11px] text-zinc-400 bg-white/[0.03] border border-white/10 hover:border-violet-500/50 hover:text-white transition-all cursor-pointer rounded-full px-3 py-1 backdrop-blur-md active:scale-95 flex items-center gap-1.5 shadow-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400/70" />
                    <span>{chip.label}</span>
                  </button>
                ))}
              </div>

              {/* Secondary CTA Pairing */}
              <div className="mt-6 flex items-center gap-2">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-zinc-300 hover:text-white transition-colors group"
                >
                  <span>EXPLORE OUR WORK</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B896FF] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
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
