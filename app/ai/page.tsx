"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Sparkles, ArrowRight, Loader2, Bot, Send, CheckCircle2, FileText, Cpu } from "lucide-react";

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
          text: "Connection to AI Gateway interrupted. Please try again or reach out at hello@ryzeworks.tech."
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
    <main className="min-h-screen bg-[#07070b] text-white">
      <Navbar />

      <section className="pt-36 pb-24 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/40 text-purple-300 text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            INTELLIGENCE WORKSPACE
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            Ryze AI Hub & Brief Studio
          </h1>
          <p className="text-base text-white/60 leading-relaxed">
            Interact with our grounded knowledge agent powered by Gemini 3.6 Flash, or generate a structured, ready-to-execute project brief in seconds.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0d0e1a] border border-white/[0.08] w-fit mb-8">
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold tracking-wider transition-all ${
              activeTab === "chat"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>AI ASSISTANT (Q&A)</span>
          </button>
          <button
            onClick={() => setActiveTab("brief")}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold tracking-wider transition-all ${
              activeTab === "brief"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : "text-white/60 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>PROJECT BRIEF GENERATOR</span>
          </button>
        </div>

        {/* Tab 1: Interactive Chat */}
        {activeTab === "chat" && (
          <div className="rounded-3xl bg-[#0c0d16]/90 border border-white/[0.08] p-6 sm:p-8 flex flex-col h-[650px] shadow-2xl">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.role === "assistant" && (
                    <div className="w-8 h-8 rounded-xl bg-purple-950/60 border border-purple-600/40 flex items-center justify-center shrink-0 mt-1">
                      <Sparkles className="w-4 h-4 text-purple-300" />
                    </div>
                  )}
                  <div
                    className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-purple-600 text-white font-medium"
                        : "bg-[#121322] border border-white/[0.06] text-white/90"
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.text}</p>
                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-white/[0.08] flex flex-wrap items-center gap-2 text-[10px] text-white/50">
                        <span>Verified Citations:</span>
                        {m.sources.map((src) => (
                          <span
                            key={src}
                            className="px-2 py-0.5 rounded bg-purple-900/30 text-purple-300 font-mono"
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
                <div className="flex items-center gap-3 text-xs text-purple-300 p-3 rounded-xl bg-purple-950/20 border border-purple-800/20">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
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
                className="w-full bg-[#121320] border border-white/10 rounded-2xl px-5 py-3.5 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 pr-14"
              />
              <button
                type="submit"
                disabled={chatLoading}
                aria-label="Send Message"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center transition-colors disabled:opacity-50"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Project Brief Generator */}
        {activeTab === "brief" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 rounded-3xl bg-[#0c0d16]/90 border border-white/[0.08] p-8">
              <h2 className="text-xl font-bold text-white mb-2">Project Brief Details</h2>
              <p className="text-xs text-white/50 mb-6">
                Fill in your project vision. Our AI architect will structure an actionable scope and tech stack proposal.
              </p>

              <form onSubmit={handleGenerateBrief} className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-white/60 uppercase block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={briefForm.name}
                    onChange={(e) => setBriefForm({ ...briefForm, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-[#131422] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-white/60 uppercase block mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={briefForm.email}
                    onChange={(e) => setBriefForm({ ...briefForm, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className="w-full bg-[#131422] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-white/60 uppercase block mb-1">
                    Company / Startup Name
                  </label>
                  <input
                    type="text"
                    value={briefForm.company}
                    onChange={(e) => setBriefForm({ ...briefForm, company: e.target.value })}
                    placeholder="e.g. Nova Robotics"
                    className="w-full bg-[#131422] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-white/60 uppercase block mb-1">
                    Project Concept & Vision *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={briefForm.projectIdea}
                    onChange={(e) => setBriefForm({ ...briefForm, projectIdea: e.target.value })}
                    placeholder="What are you building? Target features, user flows, and business goals..."
                    className="w-full bg-[#131422] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={briefLoading}
                    className="w-full justify-center"
                  >
                    {briefLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating Structured Brief...
                      </span>
                    ) : (
                      "Generate Executive Brief →"
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Output Panel */}
            <div className="lg:col-span-6 rounded-3xl bg-[#0c0d16]/90 border border-white/[0.08] p-8 flex flex-col justify-between">
              {generatedBrief ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider text-purple-400 uppercase">
                      Executive Summary
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-600/40 text-[10px] text-emerald-300 font-mono">
                      Confidence: {generatedBrief.confidenceScore}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {generatedBrief.executiveSummary}
                  </h3>

                  <div>
                    <h4 className="text-xs font-bold tracking-wider text-white/50 uppercase mb-3">
                      Recommended Scope & Deliverables
                    </h4>
                    <div className="space-y-2">
                      {generatedBrief.scopeDeliverables?.map((item: string, i: number) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-white/80">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold tracking-wider text-white/50 uppercase mb-2">
                      Architectural Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {generatedBrief.recommendedStack?.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-[11px] text-purple-300 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-white/60">
                    <span>Estimated Sprint Duration:</span>
                    <span className="text-white font-bold">{generatedBrief.estimatedSprint}</span>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <Cpu className="w-12 h-12 text-purple-500/40 mb-4 animate-pulse" />
                  <h3 className="text-base font-bold text-white mb-2">
                    Awaiting Project Parameters
                  </h3>
                  <p className="text-xs text-white/50 max-w-sm">
                    Submit the form to the left to have Gemini synthesize your project specifications into a structured proposal.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
