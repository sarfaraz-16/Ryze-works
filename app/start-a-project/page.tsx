"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { Sparkles, Loader2, CheckCircle2, ArrowRight } from "lucide-react";

export default function StartAProjectPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    serviceInterest: "Technology & AI",
    budget: "$15k - $30k",
    timeline: "4 - 8 weeks",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          message: `[Budget: ${formData.budget} | Timeline: ${formData.timeline}] ${formData.message}`
        })
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-transparent text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            START A PROJECT BRIEF
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
            Let&apos;s map your product sprint.
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 max-w-xl mx-auto leading-relaxed mb-6">
            Fill out this structured intake to receive an architectural review and sprint milestone estimation within 24 hours.
          </p>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-emerald-400 mb-10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Turnaround: 24-hour architectural review &amp; sprint scope
          </div>
        </div>

        {submitted ? (
          <div className="p-10 sm:p-14 rounded-3xl bg-[#0d0e17]/85 border border-[#7042FF]/40 text-center space-y-5 shadow-2xl shadow-black/60 backdrop-blur-md">
            <div className="w-16 h-16 rounded-full bg-[#1E085A]/80 border border-[#7042FF]/40 flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-[#1E085A]/60">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-[-0.01em] [word-spacing:0.08em]">Project Brief Received!</h2>
            <p className="text-sm text-zinc-300 font-normal max-w-md mx-auto leading-relaxed">
              Our partners will analyze your requirements and reach out via email with an architectural roadmap proposal.
            </p>
            <div className="pt-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#7042FF] to-[#4318D1] hover:brightness-110 shadow-lg shadow-[#7042FF]/30 border border-[#B896FF]/30 transition-all"
              >
                <span>Return to Home</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-[#0B0813]/80 backdrop-blur-2xl border border-white/10 hover:border-white/15 rounded-3xl p-7 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] relative overflow-hidden text-left">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-600/15 blur-[110px] rounded-full -z-10 pointer-events-none" />
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Liam Vance"
                    className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500/70 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/70 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. liam@acme.com"
                    className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500/70 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/70 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Acme Labs"
                    className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500/70 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/70 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider mb-2">
                    Primary Service Focus
                  </label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500/70 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/70 rounded-xl px-4 py-3 text-sm text-zinc-100 transition-all outline-none appearance-none"
                  >
                    <option value="Technology & AI" className="bg-[#0B0813] text-zinc-100">Technology, Web Apps &amp; AI</option>
                    <option value="Brand Identity" className="bg-[#0B0813] text-zinc-100">Brand Identity &amp; Strategy</option>
                    <option value="Growth & Marketing" className="bg-[#0B0813] text-zinc-100">Growth &amp; Performance Marketing</option>
                    <option value="Full Agency Partner" className="bg-[#0B0813] text-zinc-100">Full Agency Partner (End-to-End)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider mb-2">
                    Anticipated Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500/70 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/70 rounded-xl px-4 py-3 text-sm text-zinc-100 transition-all outline-none appearance-none"
                  >
                    <option value="< $15k" className="bg-[#0B0813] text-zinc-100">&lt; $15k (Sprint MVP)</option>
                    <option value="$15k - $30k" className="bg-[#0B0813] text-zinc-100">$15k - $30k (Standard Sprint)</option>
                    <option value="$30k - $60k" className="bg-[#0B0813] text-zinc-100">$30k - $60k (Comprehensive)</option>
                    <option value="$60k+" className="bg-[#0B0813] text-zinc-100">$60k+ (Enterprise / Retainer)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider mb-2">
                    Desired Delivery Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500/70 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/70 rounded-xl px-4 py-3 text-sm text-zinc-100 transition-all outline-none appearance-none"
                  >
                    <option value="Immediate (< 4 weeks)" className="bg-[#0B0813] text-zinc-100">Immediate (&lt; 4 weeks)</option>
                    <option value="4 - 8 weeks" className="bg-[#0B0813] text-zinc-100">4 - 8 weeks (Recommended)</option>
                    <option value="8 - 12 weeks" className="bg-[#0B0813] text-zinc-100">8 - 12 weeks</option>
                    <option value="Flexible" className="bg-[#0B0813] text-zinc-100">Flexible / Discovery</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-zinc-400 uppercase tracking-wider mb-2">
                  Project Description &amp; Target Objectives *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Summarize the core problem, user flow, or market opportunity..."
                  className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500/70 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/70 rounded-xl p-4 text-sm text-zinc-100 placeholder:text-zinc-600 transition-all outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl py-4 shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all flex items-center justify-center gap-2 group cursor-pointer text-sm sm:text-base disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting Brief...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Submit Project Brief →
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </section>

      {/* Pre-footer Anchor Marquee & Closing CTA */}
      <ClosingCTA />

      <Footer />
    </main>
  );
}
