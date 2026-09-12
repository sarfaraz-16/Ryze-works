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
    <main className="min-h-[calc(100vh-80px)] bg-[#080417] text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono text-[#B896FF] uppercase tracking-widest mb-3 font-medium flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
                GET IN TOUCH
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.01em] [word-spacing:0.1em] text-white mb-6">
                Let&apos;s create impact together.
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed mb-8">
                Whether you have an early-stage brief, need technical architecture guidance, or want to scale an existing brand, our partners are ready to collaborate.
              </p>
            </div>

            <div className="space-y-6 pt-8 border-t border-white/[0.08]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1E085A]/60 border border-[#7042FF]/30 flex items-center justify-center text-[#B896FF] shadow-lg shadow-[#1E085A]/50">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase font-medium text-zinc-400 block">Email Us Directly</span>
                  <a href="mailto:teamryzeworks@gmail.com" className="text-sm font-semibold text-white hover:text-[#B896FF] transition-colors">
                    teamryzeworks@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1E085A]/60 border border-[#7042FF]/30 flex items-center justify-center text-[#B896FF] shadow-lg shadow-[#1E085A]/50">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase font-medium text-zinc-400 block">Studio Headquarters</span>
                  <span className="text-sm font-semibold text-white">Bangalore, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] p-8 sm:p-12 shadow-2xl shadow-black/50">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2 tracking-[-0.01em] [word-spacing:0.08em]">Send a Message</h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-normal mb-8">
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
                    className="w-full bg-white/[0.04] border border-white/15 focus:border-[#B896FF] focus:ring-1 focus:ring-[#B896FF] rounded-xl px-4 py-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none transition-all"
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
                    className="w-full bg-white/[0.04] border border-white/15 focus:border-[#B896FF] focus:ring-1 focus:ring-[#B896FF] rounded-xl px-4 py-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none transition-all"
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
                    className="w-full bg-white/[0.04] border border-white/15 focus:border-[#B896FF] focus:ring-1 focus:ring-[#B896FF] rounded-xl px-4 py-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] font-medium text-zinc-300 uppercase block mb-1.5">
                    Primary Service
                  </label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className="w-full bg-[#0d0e17] border border-white/15 focus:border-[#B896FF] focus:ring-1 focus:ring-[#B896FF] rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all"
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
                <label className="font-mono text-[11px] font-medium text-zinc-300 uppercase block mb-1.5">
                  How can we help you? *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your timeline, scope, and objectives..."
                  className="w-full bg-white/[0.04] border border-white/15 focus:border-[#B896FF] focus:ring-1 focus:ring-[#B896FF] rounded-xl px-4 py-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full justify-center px-6 py-3.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#7042FF] to-[#4318D1] hover:brightness-110 shadow-lg shadow-[#7042FF]/30 border border-[#B896FF]/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
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
