"use client";

import React, { useState } from "react";
import { CheckCircle2, Send, Loader2, Sparkles, DollarSign, Calendar, Target } from "lucide-react";

const PLACEMENT_OPTIONS = [
  "Sponsored Insights Article",
  "In-Article Thought Leadership Card",
  "Research Report / Benchmark Co-Sponsorship",
  "Display & Anchor Brand Showcase",
];

const OBJECTIVES = [
  "Brand Awareness & Authority",
  "Enterprise Lead Generation",
  "Product / Feature Launch",
  "Developer & Engineering Hiring",
];

const BUDGET_RANGES = [
  "$5,000 – $15,000 (Single Campaign)",
  "$15,000 – $30,000 (Quarterly Retainer)",
  "$30,000+ (Strategic Enterprise Partner)",
];

const TIMELINES = [
  "Immediate (< 30 Days)",
  "Next Quarter (Q2/Q3)",
  "Exploratory / Flexible",
];

export function AdvertiserInquiryForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    website: "",
    objectives: [] as string[],
    placements: [] as string[],
    budget: BUDGET_RANGES[0],
    timeline: TIMELINES[0],
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleObjective = (obj: string) => {
    setFormData((prev) => ({
      ...prev,
      objectives: prev.objectives.includes(obj)
        ? prev.objectives.filter((o) => o !== obj)
        : [...prev.objectives, obj],
    }));
  };

  const togglePlacement = (plc: string) => {
    setFormData((prev) => ({
      ...prev,
      placements: prev.placements.includes(plc)
        ? prev.placements.filter((p) => p !== plc)
        : [...prev.placements, plc],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const payload = {
        name: formData.contactName,
        email: formData.email,
        company: formData.companyName,
        type: "advertiser",
        service_interest: `Advertising: ${formData.placements.join(", ") || "General Sponsorship"}`,
        message: formData.message || `Objectives: ${formData.objectives.join(", ") || "None specified"}. Budget: ${formData.budget}. Timeline: ${formData.timeline}. Website: ${formData.website}`,
        source: "advertise-portal",
        utm_params: {
          budget: formData.budget,
          timeline: formData.timeline,
          website: formData.website,
          objectives: formData.objectives,
          placements: formData.placements,
        },
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit advertising inquiry.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-3xl bg-[#0d0e17]/95 border border-emerald-500/30 p-10 text-center space-y-5 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl">
        <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white tracking-tight">Commercial Inquiry Received</h3>
          <p className="text-sm text-zinc-300 mt-2 max-w-md mx-auto leading-relaxed">
            Thank you, <span className="text-white font-semibold">{formData.contactName}</span>. Our partnership director has received your campaign requirements for <span className="text-[#B896FF] font-semibold">{formData.companyName}</span> and will respond within 24 business hours with our rate card and audience availability.
          </p>
        </div>
        <div className="pt-4">
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs font-mono text-[#B896FF] hover:underline"
          >
            Submit another commercial inquiry →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-[#0d0e17]/90 border border-white/[0.08] p-8 sm:p-12 shadow-2xl shadow-black/80 backdrop-blur-xl">
      <div className="mb-8 pb-6 border-b border-white/[0.08]">
        <div className="text-[11px] font-mono text-[#B896FF] uppercase tracking-widest mb-2 font-medium flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
          COMMERCIAL PLACEMENT INTAKE
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Request Sponsorship Specs &amp; Inventory
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Share your campaign goals to receive customized demographic targeting, placement specs, and rate card terms.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Coordinates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
              Brand / Company Name *
            </label>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="e.g. Stripe, Linear, Vercel"
              className="w-full px-4 py-3 bg-[#080417] border border-white/[0.1] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#7042FF] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
              Contact Name &amp; Title *
            </label>
            <input
              type="text"
              required
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              placeholder="e.g. Maya Lin, VP Marketing"
              className="w-full px-4 py-3 bg-[#080417] border border-white/[0.1] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#7042FF] transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
              Corporate Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="maya@company.com"
              className="w-full px-4 py-3 bg-[#080417] border border-white/[0.1] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#7042FF] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
              Website / Product URL *
            </label>
            <input
              type="url"
              required
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://company.com"
              className="w-full px-4 py-3 bg-[#080417] border border-white/[0.1] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#7042FF] transition-colors"
            />
          </div>
        </div>

        {/* Placement Formats */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-2">
            Placement Formats of Interest (Select all that apply)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PLACEMENT_OPTIONS.map((plc) => {
              const selected = formData.placements.includes(plc);
              return (
                <button
                  type="button"
                  key={plc}
                  onClick={() => togglePlacement(plc)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                    selected
                      ? "bg-[#7042FF]/15 border-[#7042FF] text-white font-medium"
                      : "bg-[#080417] border-white/[0.08] text-zinc-400 hover:border-white/20"
                  }`}
                >
                  <span>{plc}</span>
                  {selected && <CheckCircle2 className="w-3.5 h-3.5 text-[#B896FF] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Campaign Objectives */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-2">
            Primary Campaign Objectives
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {OBJECTIVES.map((obj) => {
              const selected = formData.objectives.includes(obj);
              return (
                <button
                  type="button"
                  key={obj}
                  onClick={() => toggleObjective(obj)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                    selected
                      ? "bg-[#7042FF]/15 border-[#7042FF] text-white font-medium"
                      : "bg-[#080417] border-white/[0.08] text-zinc-400 hover:border-white/20"
                  }`}
                >
                  <span>{obj}</span>
                  {selected && <CheckCircle2 className="w-3.5 h-3.5 text-[#B896FF] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Budget & Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
              Anticipated Campaign Budget
            </label>
            <select
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-4 py-3 bg-[#080417] border border-white/[0.1] rounded-xl text-xs text-white focus:outline-none focus:border-[#7042FF] transition-colors"
            >
              {BUDGET_RANGES.map((b) => (
                <option key={b} value={b} className="bg-[#080417]">
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
              Target Launch Timeline
            </label>
            <select
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              className="w-full px-4 py-3 bg-[#080417] border border-white/[0.1] rounded-xl text-xs text-white focus:outline-none focus:border-[#7042FF] transition-colors"
            >
              {TIMELINES.map((t) => (
                <option key={t} value={t} className="bg-[#080417]">
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Detailed Brief Message */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
            Brief Overview / Audience Alignment Notes
          </label>
          <textarea
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Share context on your product, target buyer persona, or specific topics you would like to align with..."
            className="w-full px-4 py-3 bg-[#080417] border border-white/[0.1] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#7042FF] leading-relaxed transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 px-8 rounded-full bg-gradient-to-r from-[#7042FF] to-[#7C3AED] hover:brightness-110 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#7042FF]/30 transition-all cursor-pointer disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Commercial Brief...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Commercial Inquiry →</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
