"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { Sparkles, Search, Database, Cpu, ShieldCheck, Zap, ArrowRight, ExternalLink, Loader2, Terminal, Activity, Layers } from "lucide-react";
import { TiltCard3D } from "@/components/ui/TiltCard3D";

interface SearchMatch {
  id: string;
  title: string;
  url: string;
  content: string;
  similarity: number;
}

interface Telemetry {
  embedTimeMs: number;
  searchTimeMs: number;
  totalTimeMs: number;
  dimension: number;
}

const SAMPLE_QUERIES = [
  "FDA compliant medical device branding",
  "Fintech 1-tap checkout conversion optimization",
  "Next.js pgvector RAG architecture",
  "Clean urban EV micro-mobility apps",
  "Enterprise generative brand systems",
];

export default function AILabPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchMatch[] | null>(null);
  const [telemetry, setTelemetry] = useState<Telemetry | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchQuery: string) => {
    const text = searchQuery.trim();
    if (!text) return;

    setQuery(text);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text, threshold: 0.35, limit: 6 }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to search vector knowledge base.");
      }

      setResults(data.results || []);
      setTelemetry(data.telemetry || null);
    } catch (err: any) {
      setError(err.message || "Failed to execute semantic search.");
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-transparent text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[650px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      {/* Header Section */}
      <section className="pt-36 pb-16 max-w-6xl mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-[#B896FF] uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
          <span>RYZE // AI LAB &amp; RESEARCH PROTOTYPES</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.08] mb-6 max-w-4xl mx-auto">
          Semantic Retrieval &amp; pgvector Intelligence Lab
        </h1>

        <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-10">
          Explore Ryze Works&apos; live grounded RAG engine. Search our verified knowledge graph across services, featured projects, and case studies powered by Google Gemini embeddings and PostgreSQL vector similarity.
        </p>

        {/* Action Switcher */}
        <div className="flex items-center justify-center gap-4 text-xs font-mono">
          <Link
            href="/ai"
            className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 transition-colors inline-flex items-center gap-2"
          >
            <Cpu className="w-4 h-4 text-[#B896FF]" />
            <span>Interactive Chat Assistant</span>
          </Link>
          <a
            href="#architecture"
            className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 transition-colors inline-flex items-center gap-2"
          >
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Architecture Diagram</span>
          </a>
        </div>
      </section>

      {/* LIVE SEMANTIC CONTENT EXPLORER */}
      <section className="pb-24 max-w-5xl mx-auto px-6 relative z-10">
        <div className="bg-[#0B0813]/75 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(112,66,255,0.15),rgba(6,182,212,0.1),transparent_70%)] blur-[90px] -z-10 pointer-events-none" />
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-zinc-400">
              <Terminal className="w-4 h-4 text-[#B896FF]" />
              <span>Live pgvector Query Console</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Vector Node Online (1536-dim)</span>
            </div>
          </div>

          {/* Search Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }}
            className="relative mb-6"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search via natural language (e.g. 'How did Nostic transform diagnostics?')..."
              className="w-full bg-white/[0.04] border border-white/10 focus-within:border-cyan-500/60 focus-within:ring-1 focus-within:ring-cyan-500/60 rounded-xl px-4 py-3.5 pl-12 pr-32 text-sm text-zinc-100 placeholder:text-zinc-500 transition-all outline-none"
            />
            <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7042FF] to-[#4318D1] hover:brightness-110 text-white text-xs font-semibold disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-lg shadow-[#7042FF]/30 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Embedding...</span>
                </>
              ) : (
                <>
                  <span>Retrieve</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Sample Query Chips */}
          <div className="mb-8">
            <div className="text-[11px] font-mono text-zinc-500 uppercase mb-2.5">
              Suggested Retrieval Benchmarks:
            </div>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_QUERIES.map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => handleSearch(sample)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300 bg-white/[0.04] border border-white/10 hover:border-cyan-500/40 hover:text-white transition-all cursor-pointer text-left"
                >
                  &ldquo;{sample}&rdquo;
                </button>
              ))}
            </div>
          </div>

          {/* Telemetry Bar */}
          {telemetry && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#080417] border border-white/[0.06] text-xs font-mono mb-8">
              <div>
                <span className="text-zinc-500 text-[10px] uppercase block">Embedding Gen:</span>
                <span className="text-white font-bold">{telemetry.embedTimeMs} ms</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] uppercase block">Vector Cosine Match:</span>
                <span className="text-cyan-400 font-bold">{telemetry.searchTimeMs} ms</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] uppercase block">Total RAG Hop:</span>
                <span className="text-[#B896FF] font-bold">{telemetry.totalTimeMs} ms</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] uppercase block">Dimensionality:</span>
                <span className="text-emerald-400 font-bold">{telemetry.dimension} floats</span>
              </div>
            </div>
          )}

          {/* Error Notice */}
          {error && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs mb-6">
              {error}
            </div>
          )}

          {/* Results Grid */}
          {results && results.length > 0 && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-zinc-400 flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <span>Retrieved {results.length} Semantically Relevant Document(s)</span>
                <span className="text-emerald-400 font-bold">Grounded Context Matches</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((match, i) => (
                  <div
                    key={match.id || i}
                    className="p-5 rounded-2xl bg-[#080417]/80 border border-white/[0.08] hover:border-[#B896FF]/40 transition-all space-y-3 relative group flex flex-col justify-between"
                  >
                    <div>
                      {/* Match Metric & Title */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h2 className="text-sm font-semibold text-white group-hover:text-[#B896FF] transition-colors leading-snug">
                          {match.title}
                        </h2>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#7042FF]/20 text-[#B896FF] border border-[#7042FF]/30 shrink-0">
                          {(match.similarity * 100).toFixed(1)}% match
                        </span>
                      </div>

                      {/* Similarity Bar */}
                      <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden mb-3">
                        <div
                          className="h-full bg-gradient-to-r from-[#7042FF] to-cyan-400 rounded-full"
                          style={{ width: `${Math.min(100, Math.max(0, match.similarity * 100))}%` }}
                        />
                      </div>

                      {/* Content Snippet */}
                      <p className="text-xs text-zinc-300 leading-relaxed line-clamp-4">
                        {match.content}
                      </p>
                    </div>

                    {/* Deep Link */}
                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-500 truncate max-w-[200px]">
                        {match.url}
                      </span>
                      <Link
                        href={match.url}
                        className="text-xs text-[#B896FF] hover:text-white inline-flex items-center gap-1 font-semibold transition-colors"
                      >
                        <span>Open Resource</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results && results.length === 0 && (
            <div className="py-12 text-center text-zinc-500 text-xs">
              No verified documents crossed the similarity threshold for this query. The RAG engine enforces a strict refusal boundary.
            </div>
          )}
        </div>
      </section>

      {/* SYSTEM ARCHITECTURE DIAGRAM */}
      <section id="architecture" className="py-20 border-t border-white/[0.08] max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest mb-3 font-medium flex items-center justify-center gap-2">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>GROUNDED VECTOR RAG TOPOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Institutional RAG &amp; pgvector Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto mt-3">
            Every user query is tokenized, vectorized, similarity-matched against verified PostgreSQL documents, and gated with strict zero-hallucination guardrails.
          </p>
        </div>

        {/* Architecture Flowchart Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-violet-500/0 via-violet-500/30 to-cyan-500/0 -z-10" />
          
          {/* Step 1 */}
          <div className="bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 rounded-2xl p-6 transition-all duration-300 relative group">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/30 text-violet-300 font-mono text-xs font-bold flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.2)] mb-4">
              01
            </div>
            <h3 className="text-sm font-semibold text-white mb-2">Natural Query Ingestion</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Visitor inputs natural questions via the chat gateway or search console.
            </p>
            <div className="mt-4 text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-cyan-300 w-fit">
              POST /api/ai/chat
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 rounded-2xl p-6 transition-all duration-300 relative group">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/30 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.2)] mb-4">
              02
            </div>
            <h3 className="text-sm font-semibold text-white mb-2">Gemini Embeddings</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Text converted into a 1536-dimensional normalized floating point semantic vector.
            </p>
            <div className="mt-4 text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-cyan-300 w-fit">
              gemini-embedding-001 (1536d)
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 rounded-2xl p-6 transition-all duration-300 relative group">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/30 text-emerald-300 font-mono text-xs font-bold flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.2)] mb-4">
              03
            </div>
            <h3 className="text-sm font-semibold text-white mb-2">pgvector Cosine Search</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              PostgreSQL executes cosine distance calculation (<code className="text-cyan-300">&lt;=&gt;</code>) with 0.58 confidence threshold.
            </p>
            <div className="mt-4 text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-cyan-300 w-fit">
              RPC match_knowledge()
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 rounded-2xl p-6 transition-all duration-300 relative group">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/30 text-amber-300 font-mono text-xs font-bold flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.2)] mb-4">
              04
            </div>
            <h3 className="text-sm font-semibold text-white mb-2">Grounded Flash Synthesis</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Gemini Flash generates answers grounded strictly in retrieved documents with active route links.
            </p>
            <div className="mt-4 text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-cyan-300 w-fit">
              Gemini 3.6 Flash + Citations
            </div>
          </div>
        </div>
      </section>

      {/* BENCHMARKS & CASE STUDIES */}
      <section className="py-20 border-t border-white/[0.08] max-w-6xl mx-auto px-6 relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(112,66,255,0.1),transparent_70%)] blur-[90px] -z-20 pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TiltCard3D className="bg-[#0B0813]/75 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 rounded-3xl p-7 transition-all group flex flex-col items-start h-full shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/25 text-violet-300 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-violet-500/50 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Sub-180ms Vector Query Latency</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Native PostgreSQL pgvector cosine indexing combined with edge API handlers yields near-instantaneous semantic hops across enterprise corpora.
            </p>
          </TiltCard3D>

          <TiltCard3D className="bg-[#0B0813]/75 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 rounded-3xl p-7 transition-all group flex flex-col items-start h-full shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/25 text-violet-300 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-violet-500/50 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Zero-Hallucination Refusal Gate</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Dual-layer defense: Queries scoring below 0.58 cosine relevance trigger an immediate deterministic refusal, preventing AI hallucinations.
            </p>
          </TiltCard3D>

          <TiltCard3D className="bg-[#0B0813]/75 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 rounded-3xl p-7 transition-all group flex flex-col items-start h-full shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/25 text-violet-300 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-violet-500/50 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Automated Brief Synthesis</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Client briefs are autonomously mapped to deliverable scopes, tech stacks, and timeline milestones before syncing directly into our staff CRM.
            </p>
          </TiltCard3D>
        </div>
      </section>

      {/* Pre-footer Closing CTA */}
      <ClosingCTA />

      <Footer />
    </main>
  );
}
