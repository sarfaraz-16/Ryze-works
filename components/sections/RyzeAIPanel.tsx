"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { Sparkles, ArrowRight, Bot } from "lucide-react";
import { Button } from "@/components/ui/Button";

const AiNeuralCore3D = dynamic(() => import("@/components/ai/AiNeuralCore3D"), {
  ssr: false,
  loading: () => null,
});

export const RyzeAIPanel: React.FC = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [sources, setSources] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsTyping(true);
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }
    typingTimerRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 400);
  };

  const submitQuery = useCallback(async (userQuery: string) => {
    const trimmed = userQuery.trim();
    if (!trimmed || loading) return;

    setQuery("");
    setLoading(true);
    setResponse(null);
    setSources([]);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep(prev => prev + 1);
    }, 800);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed })
      });
      const data = await res.json();
      setResponse(data.content);
      setSources(data.sources || []);
    } catch (err) {
      console.error("Ryze AI query error:", err);
      setResponse("I encountered an issue connecting to the AI Gateway. Please try again or reach out at teamryzeworks@gmail.com.");
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    const handleCustomPrompt = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        submitQuery(customEvent.detail);
      }
    };
    window.addEventListener("ryze-ai-prompt", handleCustomPrompt as EventListener);
    return () => window.removeEventListener("ryze-ai-prompt", handleCustomPrompt as EventListener);
  }, [submitQuery]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;
    submitQuery(query);
  };

  const handlePillClick = (promptText: string) => {
    if (loading) return;
    setQuery(promptText);
    inputRef.current?.focus();
  };

  return (
    <section id="ryze-ai" className="py-24 max-w-7xl mx-auto px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-[#7042FF]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="rounded-3xl bg-[#0d0e17]/90 border border-white/[0.08] hover:border-[#B896FF]/30 p-8 sm:p-12 lg:p-16 shadow-2xl shadow-black/70 backdrop-blur-xl relative overflow-hidden transition-all duration-300">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#7042FF]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#4318D1]/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
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
              onClick={() => handlePillClick("Tell me what services Ryze Works offers and how you execute")}
            >
              EXPLORE RYZE AI →
            </Button>
          </div>

          <div className="hidden lg:flex absolute left-[43%] top-1/2 -translate-y-1/2 z-20">
            <div className="w-10 h-10 rounded-full bg-[#1E085A] border border-[#7042FF]/50 shadow-[0_0_20px_rgba(112,66,255,0.4)] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#B896FF]" />
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="absolute -inset-10 sm:-inset-16 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
              <AiNeuralCore3D isFocused={isFocused} isTyping={isTyping} queryLength={query.length} />
            </div>

            {/* Terminal Window Frame */}
            <div className="relative z-10 rounded-2xl border border-white/[0.08] bg-[#0c081e]/80 backdrop-blur-xl shadow-[0_0_40px_rgba(112,66,255,0.12)] overflow-hidden group">
              {/* Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-[#080417]/50">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10 border border-white/15 transition-colors group-hover:bg-[#7042FF]/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10 border border-white/15 transition-colors group-hover:bg-[#7042FF]/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10 border border-white/15 transition-colors group-hover:bg-[#7042FF]/50" />
                </div>
                <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                  RYZE-AI // ARCHITECTURE KERNEL
                </div>
                <div className="text-[10px] font-mono text-[#38bdf8]">
                  ● ONLINE • 14ms
                </div>
              </div>

              <div className="p-6 sm:p-8">
                {/* 3-Step Monospace Loading Readout */}
                {loading && (
                  <div className="mb-6 p-4 rounded-xl bg-[#080417]/80 border border-[#7042FF]/30 font-mono text-xs text-zinc-400 flex flex-col gap-2 shadow-inner">
                    <div className="flex items-center gap-2">
                      <span className="text-[#38bdf8]">&gt;</span> 
                      <span className="text-white">INITIALIZING NEURAL LINK...</span>
                    </div>
                    {loadingStep >= 1 && (
                      <div className="flex items-center gap-2 animate-in fade-in">
                        <span className="text-[#38bdf8]">&gt;</span> 
                        <span className="text-white">PARSING AGENCY CONTEXT...</span>
                      </div>
                    )}
                    {loadingStep >= 2 && (
                      <div className="flex items-center gap-2 animate-in fade-in">
                        <span className="text-[#38bdf8]">&gt;</span> 
                        <span className="text-emerald-400">SYNTHESIZING ARCHITECTURE...</span>
                      </div>
                    )}
                  </div>
                )}

                {/* AI Response Output */}
                {response && !loading && (
                  <div className="mb-6 p-4 rounded-xl bg-[#1E085A]/20 border border-[#7042FF]/30 text-xs text-zinc-200 leading-relaxed animate-in fade-in duration-200">
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

                {/* Interactive Preset Prompt Pills */}
                {!loading && (
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => handlePillClick("⚡ Full-stack Next.js")}
                      className="px-3 py-1.5 rounded bg-white/[0.04] hover:bg-[#7042FF]/20 border border-white/10 hover:border-[#7042FF]/40 text-[10px] font-mono text-zinc-300 hover:text-white transition-all"
                    >
                      ⚡ Full-stack Next.js
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePillClick("🎨 Design system audit")}
                      className="px-3 py-1.5 rounded bg-white/[0.04] hover:bg-[#7042FF]/20 border border-white/10 hover:border-[#7042FF]/40 text-[10px] font-mono text-zinc-300 hover:text-white transition-all"
                    >
                      🎨 Design system audit
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePillClick("🚀 AI pipeline")}
                      className="px-3 py-1.5 rounded bg-white/[0.04] hover:bg-[#7042FF]/20 border border-white/10 hover:border-[#7042FF]/40 text-[10px] font-mono text-zinc-300 hover:text-white transition-all"
                    >
                      🚀 AI pipeline
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePillClick("📈 Conversion engine")}
                      className="px-3 py-1.5 rounded bg-white/[0.04] hover:bg-[#7042FF]/20 border border-white/10 hover:border-[#7042FF]/40 text-[10px] font-mono text-zinc-300 hover:text-white transition-all"
                    >
                      📈 Conversion engine
                    </button>
                  </div>
                )}

                {/* Input & Execution State */}
                <form onSubmit={handleFormSubmit} className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#38bdf8] font-mono font-bold">
                    &gt;
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    disabled={loading}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                      setIsFocused(false);
                      setIsTyping(false);
                    }}
                    onChange={handleInputChange}
                    placeholder={loading ? "Executing kernel..." : "Enter architecture query..."}
                    className="w-full rounded-lg bg-[#080417]/60 border border-white/10 focus:border-[#7042FF] focus:ring-1 focus:ring-[#7042FF] py-3 pl-10 pr-14 text-sm font-mono text-white placeholder:text-zinc-600 focus:outline-none transition-all shadow-inner disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={loading || !query.trim()}
                    aria-label="Execute"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded bg-[#7042FF]/20 hover:bg-[#7042FF]/40 border border-[#7042FF]/50 text-[#B896FF] hover:text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed group/btn"
                  >
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
