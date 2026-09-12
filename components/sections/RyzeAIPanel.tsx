"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Loader2, Bot, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const RyzeAIPanel: React.FC = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [sources, setSources] = useState<string[]>([]);

  // Listen for custom event from hero prompt
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
    <section id="ryze-ai" className="py-24 max-w-7xl mx-auto px-6">
      <div className="rounded-3xl bg-gradient-to-br from-[#121324] via-[#0d0e1a] to-[#07070b] border border-purple-900/30 p-8 sm:p-12 lg:p-16 shadow-[0_0_80px_-20px_rgba(124,58,237,0.25)] relative overflow-hidden">
        {/* Subtle background ambient mesh */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Info & Vision */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-purple-400 mb-3">
              RYZE AI
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              Your creative AI partner.
            </h2>

            <div className="text-sm font-semibold text-purple-300 tracking-wide mb-4">
              Ask. Discover. Plan. Build.
            </div>

            <p className="text-sm text-white/60 leading-relaxed mb-8 max-w-md">
              From project ideas to execution plans, Ryze AI helps you move from possibility to impact—faster.
            </p>

            <Button
              variant="primary"
              size="md"
              className="bg-[#6366f1] hover:bg-[#4f46e5] text-xs font-bold tracking-wider px-6 py-3"
              onClick={() => handleChipClick("Tell me what services Ryze Works offers")}
            >
              EXPLORE RYZE AI →
            </Button>
          </div>

          {/* Right Column: Interactive Chat / Query Box */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#090a12]/90 border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
              {/* Header inside widget */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-600/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  <Sparkles className="w-5 h-5 text-purple-300" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Hi, I&apos;m Ryze AI.
                  </div>
                  <div className="text-xs text-white/50">
                    How can I help you build?
                  </div>
                </div>
              </div>

              {/* Chat response bubble if available */}
              {loading && (
                <div className="mb-6 p-4 rounded-xl bg-purple-950/20 border border-purple-800/30 flex items-center gap-3 text-xs text-purple-200">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                  <span>Searching verified project knowledge base...</span>
                </div>
              )}

              {response && (
                <div className="mb-6 p-4 rounded-xl bg-purple-950/25 border border-purple-700/30 text-xs text-white/90 leading-relaxed animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-purple-300 uppercase mb-2">
                    <Bot className="w-3.5 h-3.5" />
                    <span>Grounded Assistant Response</span>
                  </div>
                  <p className="whitespace-pre-line mb-3">{response}</p>
                  {sources.length > 0 && (
                    <div className="pt-2 border-t border-purple-800/20 flex flex-wrap items-center gap-2 text-[10px] text-white/50">
                      <span>Verified Sources:</span>
                      {sources.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded bg-purple-900/40 text-purple-300 font-mono"
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
                  className="w-full rounded-xl bg-[#121320] border border-white/10 hover:border-purple-500/40 focus:border-purple-500/80 px-4 py-3.5 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none pr-12 transition-all shadow-inner"
                />
                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Send Query"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center transition-colors shadow-md disabled:opacity-50"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Action Prompt Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleChipClick("Project Advisor: what is the recommended timeline and sprint model?")}
                  className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-purple-950/50 border border-white/10 hover:border-purple-500/40 text-[11px] font-medium text-white/70 hover:text-purple-200 transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span>Project Advisor</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleChipClick("Case Study Search: show me results for Razorpay, Zepto, and Simpl")}
                  className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-purple-950/50 border border-white/10 hover:border-purple-500/40 text-[11px] font-medium text-white/70 hover:text-purple-200 transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span>Case Study Search</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleChipClick("Brief Generator: help me structure requirements for an AI product")}
                  className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-purple-950/50 border border-white/10 hover:border-purple-500/40 text-[11px] font-medium text-white/70 hover:text-purple-200 transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-purple-400" />
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
