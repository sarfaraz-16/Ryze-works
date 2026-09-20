"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { Sparkles, ArrowRight, Loader2, Bot, FileText, Cpu, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const parseMarkdown = (text: string) => {
  const blocks = text.split('\n');
  return blocks.map((block, bIdx) => {
    const parts = block.split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*)/g);
    return (
      <React.Fragment key={bIdx}>
        {parts.map((part, idx) => {
          const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
          if (linkMatch) {
            return (
              <a key={idx} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-[#B896FF] hover:text-violet-200 underline underline-offset-4 decoration-violet-500/50 transition-colors">
                {linkMatch[1]}
              </a>
            );
          }
          const boldMatch = part.match(/\*\*(.*?)\*\*/);
          if (boldMatch) {
            return <strong key={idx} className="font-semibold text-white">{boldMatch[1]}</strong>;
          }
          return <span key={idx}>{part}</span>;
        })}
        {bIdx < blocks.length - 1 && <br />}
      </React.Fragment>
    );
  });
};

export default function AIPage() {
  const [activeTab, setActiveTab] = useState<"chat" | "brief">("chat");

  // Chat State
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; text: string; sources?: string[] }>
  >([
    {
      role: "assistant",
      text: "Hello! I am Ryze AI, powered by grounded agency intelligence and Google Gemini. How can I assist your product roadmap today? You can ask about our service disciplines, case studies, or generate a structured project brief.",
      sources: ["/services", "/case-studies"]
    }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatLoading]);

  // Brief Generator State
  const [briefForm, setBriefForm] = useState({
    name: "",
    email: "",
    company: "",
    projectIdea: "",
    targetAudience: "",
    timeline: "4 to 8 weeks",
    servicesNeeded: "Fullstack Web & AI"
  });
  const [briefLoading, setBriefLoading] = useState(false);
  const [generatedBrief, setGeneratedBrief] = useState<any | null>(null);
  
  const [isTyping, setIsTyping] = useState(false);
  const typingTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
    setIsTyping(true);
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
    }
    typingTimerRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 400);
  };

  const sendMessage = async (userText: string) => {
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setChatInput("");
    setChatLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText })
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.content || "I don't have enough verified information to answer that.",
          sources: data.sources || []
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Connection to AI Gateway interrupted. Please try again or reach out at teamryzeworks@gmail.com."
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendMessage(chatInput.trim());
  };

  const handleGenerateBrief = async (e: React.FormEvent) => {
    e.preventDefault();
    setBriefLoading(true);
    try {
      const res = await fetch("/api/ai/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(briefForm)
      });
      const data = await res.json();
      setGeneratedBrief(data.brief);
    } catch (err) {
      console.error("Brief generation error:", err);
    } finally {
      setBriefLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#030014]/40 text-zinc-100 overflow-visible relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-[11px] font-mono text-[#B896FF] uppercase tracking-widest mb-3 font-medium flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
            INTELLIGENCE WORKSPACE
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.01em] [word-spacing:0.1em] text-white mb-6">
            Ryze AI Hub &amp; Brief Studio
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-2xl">
            Interact with our grounded knowledge agent powered by Gemini 3.6 Flash, or generate a structured, ready-to-execute project brief in seconds.
          </p>
        </div>

        {/* Tab Toggle & AI Lab Link */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="bg-[#0B0813]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-1.5 inline-flex items-center gap-1 shadow-lg relative">
            <button
              onClick={() => setActiveTab("chat")}
              className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === "chat" ? "text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>AI ASSISTANT (Q&amp;A)</span>
              {activeTab === "chat" && (
                <motion.div
                  layoutId="activeAiModePill"
                  className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("brief")}
              className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === "brief" ? "text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>PROJECT BRIEF GENERATOR</span>
              {activeTab === "brief" && (
                <motion.div
                  layoutId="activeAiModePill"
                  className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          </div>

          <Link
            href="/ai/lab"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-[#7042FF]/20 border border-white/10 hover:border-[#B896FF]/40 text-xs font-mono text-zinc-300 hover:text-white transition-all shadow-md"
          >
            <Cpu className="w-4 h-4 text-[#B896FF]" />
            <span>Open Vector RAG Lab →</span>
          </Link>
        </div>

        {/* Tab 1: Interactive Chat */}
        {activeTab === "chat" && (
          <div className="relative overflow-visible">
            {/* Symmetrical Central Spotlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)] blur-[90px] -z-10 pointer-events-none" />

            <div className="bg-[#0B0813]/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] relative flex flex-col min-h-[420px] max-h-[700px] z-10 overflow-visible">
              {/* Ambient Backlight */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.18),rgba(6,182,212,0.08),transparent_70%)] pointer-events-none rounded-3xl" />

            {/* Top Terminal Header Bar */}
            <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40 rounded-t-3xl">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                </div>
                <div className="font-mono text-[11px] text-zinc-400 tracking-widest hidden sm:block">
                  RYZE NEURAL CORE // GEMINI FLASH v3
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[10px] text-emerald-300 tracking-wider">ENGINE ONLINE</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 p-6 sm:p-8 relative z-10 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((m, i) => {
                if (i === 0 && messages.length === 1 && m.role === "assistant") {
                  return (
                    <div key={i} className="flex flex-col items-center justify-center text-center py-8 w-full h-full animate-in fade-in duration-500">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E085A]/60 border border-[#7042FF]/30 mb-5">
                        <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
                        <span className="text-[10px] font-mono text-[#B896FF] tracking-wider font-medium uppercase">
                          RYZE INTELLIGENCE ENGINE
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-8 max-w-lg">
                        How can Ryze AI accelerate your roadmap today?
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                        {[
                          "⚡ Generate full-stack brief for FinTech MVP",
                          "🔍 Explain Ryze AI-native design methodology",
                          "🛠️ Breakdown Nostic telemetry & hardware UX",
                          "📈 Analyze growth outcomes for Yulu & Zepto"
                        ].map((promptText, idx) => (
                          <button
                            key={idx}
                            onClick={() => sendMessage(promptText)}
                            className="bg-white/[0.03] hover:bg-violet-600/10 border border-white/10 hover:border-violet-500/40 rounded-xl p-3.5 text-xs text-zinc-300 hover:text-white transition-all text-left flex items-start gap-2.5"
                          >
                            <span className="mt-0.5 shrink-0 text-sm">{promptText.split(' ')[0]}</span>
                            <span className="leading-relaxed">{promptText.substring(promptText.indexOf(' ') + 1)}</span>
                          </button>
                        ))}
                      </div>
                      {m.sources && m.sources.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap justify-center items-center gap-2 text-[10px] text-zinc-400 font-mono w-full max-w-2xl">
                          <span>Verified Citations:</span>
                          {m.sources.map((src) => (
                            <span
                              key={src}
                              className="px-2 py-0.5 rounded-full bg-[#1E085A]/60 border border-[#7042FF]/30 text-[#B896FF]"
                            >
                              {src}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                <div
                  key={i}
                  className={`flex items-start gap-3 ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.role === "assistant" && (
                    <div className="w-10 h-10 rounded-2xl bg-[#1E085A]/80 border border-[#7042FF]/40 flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-[#1E085A]/50">
                      <Sparkles className="w-5 h-5 text-[#B896FF]" />
                    </div>
                  )}
                  <div className={`max-w-[90%] ${m.role === "user" ? "ml-auto" : ""}`}>
                    <div
                      className={`${
                        m.role === "user"
                          ? "bg-gradient-to-r from-violet-600/25 to-purple-600/25 border border-violet-500/30 text-white rounded-2xl rounded-tr-none px-4 py-2.5 text-xs sm:text-sm font-medium shadow-lg inline-block"
                          : "bg-white/[0.03] border border-white/10 rounded-2xl rounded-tl-none p-5 text-zinc-200 text-sm leading-relaxed"
                      }`}
                    >
                      <div className="whitespace-pre-line leading-relaxed">{parseMarkdown(m.text)}</div>
                      
                      {m.sources && m.sources.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                          <span>Verified Citations:</span>
                          {m.sources.map((src) => (
                            <span
                              key={src}
                              className="bg-white/[0.04] border border-white/10 hover:border-violet-500/40 text-violet-300 px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors"
                            >
                              {src}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )})}
              {chatLoading && (
                <div className="flex items-center gap-3 text-xs text-[#B896FF] p-4 rounded-2xl bg-white/[0.02] border border-[#7042FF]/30 font-mono w-fit backdrop-blur-md">
                  <Loader2 className="w-4 h-4 animate-spin text-[#7042FF]" />
                  <span>Synthesizing grounded answer via Gemini 3.6 Flash...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Dock */}
            <div className="p-6 relative z-10 bg-black/20 border-t border-white/10 backdrop-blur-md">
              <form onSubmit={handleSendMessage} className="relative">
                <div className="bg-white/[0.04] border border-white/10 focus-within:border-violet-500/60 focus-within:shadow-[0_0_25px_rgba(139,92,246,0.25)] rounded-2xl p-2 sm:p-2.5 flex items-center gap-3 transition-all">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={handleInputChange}
                    placeholder="Ask anything about Ryze Works capabilities, CRED, Zepto, or tech stack..."
                    className="flex-1 bg-transparent border-none px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-0"
                  />
                  <button
                    type="submit"
                    disabled={chatLoading}
                    aria-label="Send Message"
                    className="shrink-0 bg-violet-600 hover:bg-violet-500 text-white p-2.5 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        )}

        {/* Tab 2: Project Brief Generator */}
        {activeTab === "brief" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 rounded-3xl bg-[#0B0813]/80 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(139,92,246,0.1),transparent_60%)] pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 tracking-[-0.01em] [word-spacing:0.08em]">Project Parameters</h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-normal mb-8">
                  Fill in your project vision. Our AI architect will structure an actionable scope and tech stack proposal.
                </p>

                <form onSubmit={handleGenerateBrief} className="space-y-5">
                  <div>
                    <label className="font-mono text-[11px] font-medium text-zinc-300 uppercase block mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={briefForm.name}
                      onChange={(e) => setBriefForm({ ...briefForm, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/60 rounded-xl px-4 py-3 text-sm text-zinc-200 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[11px] font-medium text-zinc-300 uppercase block mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={briefForm.email}
                      onChange={(e) => setBriefForm({ ...briefForm, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/60 rounded-xl px-4 py-3 text-sm text-zinc-200 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[11px] font-medium text-zinc-300 uppercase block mb-1.5">
                      Company / Startup Name
                    </label>
                    <input
                      type="text"
                      value={briefForm.company}
                      onChange={(e) => setBriefForm({ ...briefForm, company: e.target.value })}
                      placeholder="e.g. Nova Robotics"
                      className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/60 rounded-xl px-4 py-3 text-sm text-zinc-200 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[11px] font-medium text-zinc-300 uppercase block mb-1.5">
                      Project Concept &amp; Vision *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={briefForm.projectIdea}
                      onChange={(e) => setBriefForm({ ...briefForm, projectIdea: e.target.value })}
                      placeholder="What are you building? Target features, user flows, and business goals..."
                      className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/60 rounded-xl px-4 py-3 text-sm text-zinc-200 transition-all outline-none"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={briefLoading}
                      className="w-full justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(139,92,246,0.3)] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {briefLoading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Generating Structured Brief...
                        </span>
                      ) : (
                        "Generate Executive Brief →"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Output Panel */}
            <div className="lg:col-span-6 rounded-3xl bg-[#0B0813]/80 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(139,92,246,0.05),transparent_60%)] pointer-events-none" />
              <div className="relative z-10 h-full">
                {generatedBrief ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-medium tracking-wider text-[#B896FF] uppercase">
                        Executive Summary
                      </span>
                      <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-[10px] text-emerald-300 font-mono">
                        Confidence: {generatedBrief.confidenceScore}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white tracking-[-0.015em]">
                      {generatedBrief.executiveSummary}
                    </h3>

                    <div>
                      <h4 className="font-mono text-[10px] font-medium tracking-wider text-zinc-400 uppercase mb-3">
                        Recommended Scope &amp; Deliverables
                      </h4>
                      <div className="space-y-2">
                        {generatedBrief.scopeDeliverables?.map((item: string, i: number) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-200">
                            <CheckCircle2 className="w-4 h-4 text-[#B896FF] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-mono text-[10px] font-medium tracking-wider text-zinc-400 uppercase mb-2">
                        Architectural Stack
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {generatedBrief.recommendedStack?.map((tech: string) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] text-[#B896FF] font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-300 font-mono">
                      <span>Estimated Sprint Duration:</span>
                      <span className="text-white font-bold">{generatedBrief.estimatedSprint}</span>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <div className="w-16 h-16 rounded-3xl bg-[#1E085A]/60 border border-[#7042FF]/30 flex items-center justify-center mb-4 shadow-lg shadow-[#1E085A]/50">
                      <Cpu className="w-8 h-8 text-[#B896FF]" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 tracking-[-0.015em]">
                      Awaiting Project Parameters
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 font-normal max-w-sm">
                      Submit the form to the left to have Gemini synthesize your project specifications into a structured proposal.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Pre-footer Anchor Marquee & Closing CTA */}
      <ClosingCTA />

      <Footer />
    </main>
  );
}
