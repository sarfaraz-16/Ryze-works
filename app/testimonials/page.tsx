"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { TESTIMONIALS_DATA } from "@/data/siteData";
import { Star, CheckCircle2, ShieldCheck, Send, Loader2 } from "lucide-react";

export default function TestimonialsPage() {
  const [formData, setFormData] = useState({
    authorName: "",
    role: "",
    company: "",
    quote: "",
    rating: "5",
    consentGiven: false
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
        body: JSON.stringify(formData)
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
        consentGiven: false
      });
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#07070b] text-white">
      <Navbar />

      <section className="pt-36 pb-24 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/40 text-purple-300 text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            CLIENT INTEGRITY & VERIFICATION
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            Trusted by founders and teams worldwide.
          </h1>
          <p className="text-base text-white/60 leading-relaxed">
            Every quote displayed here is backed by written client consent and an approved editorial verification record.
          </p>
        </div>

        {/* Existing Approved Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-[#0c0d16]/80 border border-white/[0.08] p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm font-medium text-white/90 leading-relaxed mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-5 border-t border-white/[0.06] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-800 to-indigo-600 border border-white/20 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {item.authorName.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{item.authorName}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <div className="text-[11px] text-white/50">
                    {item.role}, {item.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Submission Form (Pending-by-default pipeline) */}
        <div className="max-w-2xl mx-auto rounded-3xl bg-[#0d0e1a] border border-purple-900/30 p-8 sm:p-12 shadow-2xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Share Your Client Experience
            </h2>
            <p className="text-xs text-white/50">
              New submissions are queued for editorial review (pending-by-default) before publication.
            </p>
          </div>

          {submitStatus && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/30 border border-emerald-600/40 text-xs text-emerald-300">
              {submitStatus}
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-950/30 border border-rose-600/40 text-xs text-rose-300">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-white/60 uppercase block mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.authorName}
                  onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                  placeholder="e.g. Sarah Connor"
                  className="w-full bg-[#131422] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-white/60 uppercase block mb-1.5">
                  Your Role & Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. VP of Product"
                  className="w-full bg-[#131422] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-white/60 uppercase block mb-1.5">
                  Company / Organization *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Apex Health"
                  className="w-full bg-[#131422] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-white/60 uppercase block mb-1.5">
                  Rating (1 to 5 Stars)
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className="w-full bg-[#131422] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="5">★★★★★ (5 Stars)</option>
                  <option value="4">★★★★☆ (4 Stars)</option>
                  <option value="3">★★★☆☆ (3 Stars)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-white/60 uppercase block mb-1.5">
                Your Feedback / Testimonial *
              </label>
              <textarea
                required
                rows={4}
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                placeholder="Describe your collaboration with Ryze Works, the team's velocity, and outcomes achieved..."
                className="w-full bg-[#131422] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex items-start gap-2.5 pt-2">
              <input
                type="checkbox"
                id="consent"
                required
                checked={formData.consentGiven}
                onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                className="mt-0.5 rounded border-white/20 bg-[#131422] text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="consent" className="text-xs text-white/60 leading-normal">
                I give explicit consent for Ryze Works to review and display this quote and company attribution on the public website.
              </label>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={submitting}
                className="w-full justify-center"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Submit Testimonial For Verification"
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
