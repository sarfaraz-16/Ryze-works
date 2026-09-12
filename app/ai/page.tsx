"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { Sparkles, ArrowRight, Loader2, Bot, FileText, Cpu, CheckCircle2 } from "lucide-react";

export default function AIPage() {
  const [activeTab, setActiveTab] = useState<"chat" | "brief">("chat");

  // Chat State
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; text: string; sources?: string[] }>
  >([
    {
      role: "assistant",
      text: "Hello! I am Ryze AI, powered by grounded agency intelligence and Google Gemini. How can I assist your product roadmap today? You can ask about our service disciplines, case studies, or generate a structured project brief.",
      sources: ["/services", "/case-studies"]
    }
  ]);

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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
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
    <main className="min-h-[calc(100vh-80px)] bg-[#080417] text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
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
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#080417]/90 border border-white/[0.1] backdrop-blur-md w-fit shadow-xl">
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === "chat"
                  ? "bg-white text-black font-semibold shadow-md shadow-white/10"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>AI ASSISTANT (Q&amp;A)</span>
            </button>
            <button
              onClick={() => setActiveTab("brief")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === "brief"
                  ? "bg-white text-black font-semibold shadow-md shadow-white/10"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>PROJECT BRIEF GENERATOR</span>
            </button>
          </div>

          <Link
            href="/ai/lab"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-[#7042FF]/20 border border-white/10 hover:border-[#B896FF]/40 text-xs font-mono text-zinc-300 hover:text-white transition-all shadow-md"
          >
            <Cpu className="w-4 h-4 text-[#B896FF]" />
            <span>Open Vector RAG Lab →</span>
          </Link>
        </div>

        {/* Tab 1: Interactive Chat */}
        {activeTab === "chat" && (
          <div className="rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] p-6 sm:p-8 flex flex-col h-[650px] shadow-2xl shadow-black/60">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.role === "assistant" && (
                    <div className="w-9 h-9 rounded-2xl bg-[#1E085A]/80 border border-[#7042FF]/40 flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-[#1E085A]/50">
                      <Sparkles className="w-4 h-4 text-[#B896FF]" />
                    </div>
                  )}
                  <div
                    className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-gradient-to-r from-[#7042FF] to-[#4318D1] text-white font-medium shadow-lg shadow-[#7042FF]/20"
                        : "bg-[#080417]/80 border border-white/[0.08] text-zinc-200"
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.text}</p>
                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-white/[0.08] flex flex-wrap items-center gap-2 text-[10px] text-zinc-400 font-mono">
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
                </div>
              ))}
              {chatLoading && (
                <div className="flex items-center gap-3 text-xs text-[#B896FF] p-3 rounded-2xl bg-[#1E085A]/40 border border-[#7042FF]/30 font-mono">
                  <Loader2 className="w-4 h-4 animate-spin text-[#7042FF]" />
                  <span>Synthesizing grounded answer via Gemini 3.6 Flash...</span>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="relative pt-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask anything about Ryze Works capabilities, CRED, Zepto, or tech stack..."
                className="w-full bg-white/[0.04] border border-white/15 focus:border-[#B896FF] focus:ring-1 focus:ring-[#B896FF] rounded-2xl px-5 py-4 text-xs sm:text-sm text-white placeholder:text-zinc-500 pr-14 focus:outline-none transition-all shadow-inner"
              />
              <button
                type="submit"
                disabled={chatLoading}
                aria-label="Send Message"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-gradient-to-r from-[#7042FF] to-[#4318D1] hover:brightness-110 text-white flex items-center justify-center transition-all disabled:opacity-50 shadow-md shadow-[#7042FF]/30 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Project Brief Generator */}
        {activeTab === "brief" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] p-8 sm:p-10 shadow-2xl shadow-black/50">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 tracking-[-0.01em] [word-spacing:0.08em]">Project Parameters</h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-normal mb-6">
                Fill in your project vision. Our AI architect will structure an actionable scope and tech stack proposal.
              </p>

              <form onSubmit={handleGenerateBrief} className="space-y-4">
                <div>
                  <label className="font-mono text-[11px] font-medium text-zinc-300 uppercase block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={briefForm.name}
                    onChange={(e) => setBriefForm({ ...briefForm, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-white/[0.04] border border-white/15 focus:border-[#B896FF] focus:ring-1 focus:ring-[#B896FF] rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] font-medium text-zinc-300 uppercase block mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={briefForm.email}
                    onChange={(e) => setBriefForm({ ...briefForm, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className="w-full bg-white/[0.04] border border-white/15 focus:border-[#B896FF] focus:ring-1 focus:ring-[#B896FF] rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] font-medium text-zinc-300 uppercase block mb-1">
                    Company / Startup Name
                  </label>
                  <input
                    type="text"
                    value={briefForm.company}
                    onChange={(e) => setBriefForm({ ...briefForm, company: e.target.value })}
                    placeholder="e.g. Nova Robotics"
                    className="w-full bg-white/[0.04] border border-white/15 focus:border-[#B896FF] focus:ring-1 focus:ring-[#B896FF] rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] font-medium text-zinc-300 uppercase block mb-1">
                    Project Concept &amp; Vision *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={briefForm.projectIdea}
                    onChange={(e) => setBriefForm({ ...briefForm, projectIdea: e.target.value })}
                    placeholder="What are you building? Target features, user flows, and business goals..."
                    className="w-full bg-white/[0.04] border border-white/15 focus:border-[#B896FF] focus:ring-1 focus:ring-[#B896FF] rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={briefLoading}
                    className="w-full justify-center px-6 py-3.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#7042FF] to-[#4318D1] hover:brightness-110 shadow-lg shadow-[#7042FF]/30 border border-[#B896FF]/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
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

            {/* Output Panel */}
            <div className="lg:col-span-6 rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] p-8 sm:p-10 flex flex-col justify-between shadow-2xl shadow-black/50">
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
        )}
      </section>

      {/* Pre-footer Anchor Marquee & Closing CTA */}
      <ClosingCTA />

      <Footer />
    </main>
  );
}
