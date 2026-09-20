"use client";

import React, { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export function TestimonialsSubmissionForm() {
  const [formData, setFormData] = useState({
    authorName: "",
    role: "",
    company: "",
    quote: "",
    rating: "5",
    consentGiven: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitStatus(null);

    if (!formData.consentGiven) {
      setErrorMsg("You must confirm consent before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit testimonial.");
      }
      setSubmitStatus(data.message);
      setFormData({
        authorName: "",
        role: "",
        company: "",
        quote: "",
        rating: "5",
        consentGiven: false,
      });
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto rounded-3xl bg-[#0B0813]/80 backdrop-blur-2xl border border-white/10 p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.15),transparent_70%)] pointer-events-none" />
      
      <div className="relative z-10">
        <div className="mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2 tracking-tight">
            Share Your Client Experience
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-normal">
            New submissions are queued for editorial review (pending-by-default) before publication.
          </p>
        </div>

        {submitStatus && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{submitStatus}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[11px] font-medium text-zinc-300 uppercase block mb-1.5">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                placeholder="e.g. Sarah Connor"
                className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/60 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-500 transition-all outline-none"
              />
            </div>

            <div>
              <label className="font-mono text-[11px] font-medium text-zinc-300 uppercase block mb-1.5">
                Your Role &amp; Title *
              </label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. VP of Product"
                className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/60 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-500 transition-all outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[11px] font-medium text-zinc-300 uppercase block mb-1.5">
                Company / Organization *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Apex Health"
                className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/60 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-500 transition-all outline-none"
              />
            </div>

            <div>
              <label className="font-mono text-[11px] font-medium text-zinc-300 uppercase block mb-1.5">
                Rating (1 to 5 Stars)
              </label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                className="w-full bg-[#0B0813] border border-white/10 hover:border-white/20 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/60 rounded-xl px-4 py-3 text-sm text-zinc-200 transition-all outline-none"
              >
                <option value="5">★★★★★ (5 Stars - Exceptional)</option>
                <option value="4">★★★★☆ (4 Stars - Strong)</option>
                <option value="3">★★★☆☆ (3 Stars - Satisfactory)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-mono text-[11px] font-medium text-zinc-300 uppercase block mb-1.5">
              Your Feedback / Testimonial *
            </label>
            <textarea
              required
              rows={4}
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
              placeholder="Describe your collaboration with Ryze Works, the team's velocity, and outcomes achieved..."
              className="w-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/60 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-500 transition-all outline-none"
            />
          </div>

          <div className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              id="consent"
              required
              checked={formData.consentGiven}
              onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
              className="mt-1 rounded border-white/20 bg-white/[0.05] accent-violet-600 focus:ring-violet-500 cursor-pointer"
            />
            <label htmlFor="consent" className="text-xs text-zinc-300 leading-normal cursor-pointer select-none">
              I give explicit consent for Ryze Works to review and display this quote and company attribution on the public website.
            </label>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(139,92,246,0.3)] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting For Verification...
                </span>
              ) : (
                "Submit Testimonial For Verification →"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
