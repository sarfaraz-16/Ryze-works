"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Loader2, Bot } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const RyzeAIPanel: React.FC = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [sources, setSources] = useState<string[]>([]);

  useEffect(() => {
    const handleCustomPrompt = (e: CustomEvent<string>) => {
      if (e.detail) {
        setQuery(e.detail);
        submitQuery(e.detail);
      }
    };
    window.addEventListener("ryze-ai-prompt" as any, handleCustomPrompt);
    return () => window.removeEventListener("ryze-ai-prompt" as any, handleCustomPrompt);
  }, []);

  const submitQuery = async (userQuery: string) => {
    if (!userQuery.trim()) return;
    setLoading(true);
    setResponse(null);
    setSources([]);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userQuery })
      });
      const data = await res.json();
      setResponse(data.content);
      setSources(data.sources || []);
    } catch (err) {
      console.error("Ryze AI query error:", err);
      setResponse("I encountered an issue connecting to the AI Gateway. Please try again or reach out at hello@ryzeworks.tech.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuery(query);
  };

  const handleChipClick = (promptText: string) => {
    setQuery(promptText);
    submitQuery(promptText);
  };

  return (
    <section id="ryze-ai" className="py-24 max-w-7xl mx-auto px-6 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-[#7042FF]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="rounded-3xl bg-[#0d0e17]/90 border border-white/[0.08] hover:border-[#B896FF]/30 p-8 sm:p-12 lg:p-16 shadow-2xl shadow-black/70 backdrop-blur-xl relative overflow-hidden transition-all duration-300">
        {/* Decorative corner ambient aura */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#7042FF]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#4318D1]/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Info & Vision */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="text-[11px] font-mono text-[#B896FF] uppercase tracking-widest mb-2 font-medium">
              RYZE AI
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-snug tracking-[-0.01em] [word-spacing:0.1em] mb-3">
              Your creative AI partner.
            </h2>

            <div className="text-sm font-semibold text-[#B896FF] tracking-wide mb-4">
              Ask. Discover. Plan. Build.
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed mb-8 max-w-md">
              From project ideas to execution plans, Ryze AI helps you move from possibility to impact—faster.
            </p>

            <Button
              variant="primary"
              size="md"
              className="text-xs font-bold tracking-wider px-7 py-3"
              onClick={() => handleChipClick("Tell me what services Ryze Works offers and how you execute")}
            >
              EXPLORE RYZE AI →
            </Button>
          </div>

          {/* Center visual connector icon for desktop */}
          <div className="hidden lg:flex absolute left-[43%] top-1/2 -translate-y-1/2 z-20">
            <div className="w-10 h-10 rounded-full bg-[#1E085A] border border-[#7042FF]/50 shadow-[0_0_20px_rgba(112,66,255,0.4)] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#B896FF]" />
            </div>
          </div>

          {/* Right Column: Interactive Chat / Query Box */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#080417]/90 border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
              {/* Header inside widget */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#1E085A]/80 border border-[#7042FF]/40 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(112,66,255,0.3)]">
                  <Sparkles className="w-5 h-5 text-[#B896FF]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">
                    Hi, I&apos;m Ryze AI.
                  </div>
                  <div className="text-xs text-zinc-400">
                    How can I help you build?
                  </div>
                </div>
              </div>

              {/* Chat response bubble if available */}
              {loading && (
                <div className="mb-6 p-4 rounded-xl bg-[#1E085A]/30 border border-[#7042FF]/30 flex items-center gap-3 text-xs text-[#B896FF]">
                  <Loader2 className="w-4 h-4 animate-spin text-[#B896FF]" />
                  <span>Searching verified studio intelligence...</span>
                </div>
              )}

              {response && (
                <div className="mb-6 p-4 rounded-xl bg-[#1E085A]/35 border border-[#7042FF]/40 text-xs text-zinc-200 leading-relaxed animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-[#B896FF] uppercase mb-2">
                    <Bot className="w-3.5 h-3.5" />
                    <span>Grounded Studio Response</span>
                  </div>
                  <p className="whitespace-pre-line mb-3">{response}</p>
                  {sources.length > 0 && (
                    <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-2 text-[10px] text-zinc-400">
                      <span>Verified Sources:</span>
                      {sources.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded bg-[#7042FF]/20 text-[#B896FF] font-mono border border-[#7042FF]/30"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Input Form */}
              <form onSubmit={handleFormSubmit} className="relative mb-4">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full rounded-full bg-white/[0.04] border border-white/15 hover:border-[#B896FF]/50 focus:border-[#7042FF] focus:ring-1 focus:ring-[#7042FF] px-5 py-3.5 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none pr-14 transition-all shadow-inner"
                />
                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Send Query"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-gradient-to-r from-[#7042FF] to-[#4318D1] hover:from-[#8257ff] hover:to-[#5022e0] text-white flex items-center justify-center transition-all shadow-[0_0_15px_rgba(112,66,255,0.4)] disabled:opacity-50 transform hover:scale-105 active:scale-95"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Action Prompt Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleChipClick("Project Advisor: what is the recommended timeline and sprint model?")}
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-[#1E085A]/60 border border-white/10 hover:border-[#B896FF]/40 text-[11px] font-medium text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-3 h-3 text-[#B896FF]" />
                  <span>Project Advisor</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleChipClick("Case Study Search: show me outcomes for Razorpay, Zepto, and Simpl")}
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-[#1E085A]/60 border border-white/10 hover:border-[#B896FF]/40 text-[11px] font-medium text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-3 h-3 text-[#B896FF]" />
                  <span>Case Study Search</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleChipClick("Brief Generator: help me structure requirements for an AI product brief")}
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-[#1E085A]/60 border border-white/10 hover:border-[#B896FF]/40 text-[11px] font-medium text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-3 h-3 text-[#B896FF]" />
                  <span>Brief Generator</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
