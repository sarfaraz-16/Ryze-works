"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { Mail, MapPin, Loader2, CheckCircle2, Sparkles, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    serviceInterest: "Technology",
    message: ""
  });
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit lead.");
      setSuccessMsg(data.message || "Thank you! We have received your message.");
      setFormData({
        name: "",
        email: "",
        company: "",
        serviceInterest: "Technology",
        message: ""
      });
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-transparent text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                GET IN TOUCH
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                Let&apos;s create impact together.
              </h1>
              <p className="text-base sm:text-lg text-zinc-300 max-w-md leading-relaxed mb-8">
                Whether you have an early-stage brief, need technical architecture guidance, or want to scale an existing brand, our partners are ready to collaborate.
              </p>
            </div>

            <div className="space-y-4 pt-8 border-t border-white/10">
              <div className="bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <a href="mailto:teamryzeworks@gmail.com" className="text-sm font-semibold text-white hover:text-violet-300 transition-colors block">
                    teamryzeworks@gmail.com
                  </a>
                  <span className="font-mono text-[10px] uppercase text-zinc-400">Direct Practice Inquiries</span>
                </div>
              </div>

              <div className="bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-white block">Chennai, India</span>
                  <span className="font-mono text-[10px] uppercase text-zinc-400">13.0827° N, 80.2707° E // Global Operations</span>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Response SLA: Sub-4 hour turnaround
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7 bg-[#0B0813]/75 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/15 blur-[100px] rounded-full -z-10 pointer-events-none" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">Send a Message</h2>
            <p className="font-mono text-xs text-zinc-400 mb-8">
              Inbound inquiries are encrypted and routed directly to our practice leadership.
            </p>

            {successMsg && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[11px] font-medium text-zinc-300 uppercase block mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Lin"
                    className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500/70 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/70 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] font-medium text-zinc-300 uppercase block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. maya@company.com"
                    className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500/70 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/70 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[11px] font-medium text-zinc-300 uppercase block mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. HyperScale Inc"
                    className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500/70 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/70 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] font-medium text-zinc-300 uppercase block mb-1.5">
                    Primary Service
                  </label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500/70 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/70 rounded-xl px-4 py-3 text-sm text-zinc-100 transition-all outline-none"
                  >
                    <option value="Technology">Technology &amp; Web Apps</option>
                    <option value="Strategy">Brand &amp; GTM Strategy</option>
                    <option value="Creative">Creative Systems &amp; Design</option>
                    <option value="Marketing">Growth &amp; Performance</option>
                    <option value="Experiences">Immersive Experiences</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-mono text-[11px] font-medium text-zinc-300 uppercase block mb-2">
                  Project Budget
                </label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["<$15k", "$15k–$35k", "$35k–$75k", "$75k+"].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-mono border transition-all cursor-pointer ${budget === b ? "bg-violet-600/20 border-violet-500 text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]" : "bg-white/[0.03] border-white/10 text-zinc-400 hover:border-white/20"}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-mono text-[11px] font-medium text-zinc-300 uppercase block mb-1.5">
                  How can we help you? *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your timeline, scope, and objectives..."
                  className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500/70 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/70 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 transition-all outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl py-3.5 shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Routing Inbound Brief...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-3.5 h-3.5" />
                      Send Inbound Message →
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Pre-footer Anchor Marquee & Closing CTA */}
      <ClosingCTA />

      <Footer />
    </main>
  );
}
