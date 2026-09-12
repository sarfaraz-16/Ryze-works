"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Sparkles, Loader2, CheckCircle2, ArrowRight } from "lucide-react";

export default function StartAProjectPage() {
  const [step, setStep] = useState(1);
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
    <main className="min-h-screen bg-[#07070b] text-white">
      <Navbar />

      <section className="pt-36 pb-24 max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/40 text-purple-300 text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            START A PROJECT
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Let&apos;s map your product sprint.
          </h1>
          <p className="text-sm text-white/60 max-w-lg mx-auto leading-relaxed">
            Fill out this structured intake to receive an architectural review and sprint milestone estimation within 24 hours.
          </p>
        </div>

        {submitted ? (
          <div className="p-10 rounded-3xl bg-[#0c0d16] border border-purple-800/40 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-purple-900/30 border border-purple-600/40 flex items-center justify-center mx-auto text-purple-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Brief Received!</h2>
            <p className="text-xs text-white/60 max-w-md mx-auto leading-relaxed">
              Our partners will analyze your requirements and reach out via email with an architectural roadmap proposal.
            </p>
            <div className="pt-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl bg-[#0c0d16]/90 border border-white/[0.08] p-8 sm:p-12 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-white/60 uppercase block mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Liam Vance"
                    className="w-full bg-[#131422] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-white/60 uppercase block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. liam@acme.com"
                    className="w-full bg-[#131422] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-white/60 uppercase block mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Acme Labs"
                    className="w-full bg-[#131422] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-white/60 uppercase block mb-1.5">
                    Primary Service Focus
                  </label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="w-full bg-[#131422] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Technology & AI">Technology, Web Apps & AI</option>
                    <option value="Brand Identity">Brand Identity & Strategy</option>
                    <option value="Growth & Marketing">Growth & Performance Marketing</option>
                    <option value="Full Agency Partner">Full Agency Partner (End-to-End)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-white/60 uppercase block mb-1.5">
                    Anticipated Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#131422] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="< $15k">&lt; $15k (Sprint MVP)</option>
                    <option value="$15k - $30k">$15k - $30k (Standard Sprint)</option>
                    <option value="$30k - $60k">$30k - $60k (Comprehensive)</option>
                    <option value="$60k+">$60k+ (Enterprise / Retainer)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-white/60 uppercase block mb-1.5">
                    Desired Delivery Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full bg-[#131422] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Immediate (< 4 weeks)">Immediate (&lt; 4 weeks)</option>
                    <option value="4 - 8 weeks">4 - 8 weeks (Recommended)</option>
                    <option value="8 - 12 weeks">8 - 12 weeks</option>
                    <option value="Flexible">Flexible / Discovery</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-white/60 uppercase block mb-1.5">
                  Project Description & Target Objectives *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Summarize the core problem, user flow, or market opportunity..."
                  className="w-full bg-[#131422] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={loading}
                  className="w-full justify-center"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting Brief...
                    </span>
                  ) : (
                    "Submit Project Brief →"
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
