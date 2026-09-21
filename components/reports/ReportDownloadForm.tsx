"use client";

import React, { useState } from "react";
import { CheckCircle2, Download, Loader2, FileText, Lock } from "lucide-react";

interface Props {
  reportTitle: string;
  reportSlug: string;
  fileSize: string;
}

export function ReportDownloadForm({ reportTitle, reportSlug, fileSize }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [downloadUnlocked, setDownloadUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          type: "general",
          service_interest: `Whitepaper: ${reportTitle}`,
          message: `Requested executive PDF report: ${reportTitle} (${reportSlug})`,
          source: "reports-gated-download",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to register download. Please try again.");
      }

      setDownloadUnlocked(true);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  if (downloadUnlocked) {
    return (
      <div className="rounded-3xl bg-[#0d0e17]/95 border border-emerald-500/30 p-8 text-center space-y-5 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl">
        <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Access Authorized</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
            A copy has been routed to <span className="text-white font-mono">{email}</span>. You can also download the executive PDF immediately below.
          </p>
        </div>
        <a
          href="#download-ready"
          onClick={(e) => {
            e.preventDefault();
            alert(`Initiating verified download for: ${reportTitle} (${fileSize})`);
          }}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Download Executive Whitepaper ({fileSize})</span>
        </a>
      </div>
    );
  }

  return (
    <div className="sticky top-28 bg-[#0B0813]/80 backdrop-blur-2xl border border-white/10 hover:border-violet-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.7)] relative overflow-hidden space-y-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-violet-600/15 blur-[90px] rounded-full -z-10 pointer-events-none" />
      <div className="flex items-center gap-3 pb-4 border-b border-white/10 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Instant Whitepaper Download</h3>
          <p className="text-[11px] text-zinc-400">Complete verification to unlock full findings.</p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sarah Chen"
            className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500/70 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/70 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 transition-all outline-none relative z-10"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
            Work Email *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="sarah@organization.com"
            className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500/70 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/70 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 transition-all outline-none relative z-10"
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 mb-1.5">
            Company / Organization *
          </label>
          <input
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Acme Scaleup"
            className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-violet-500/70 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/70 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 transition-all outline-none relative z-10"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full mt-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl py-3.5 shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 relative z-10"
        >
          {submitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Verifying &amp; Unlocking...</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>Unlock Report ({fileSize})</span>
            </>
          )}
        </button>

        <div className="text-center text-[10px] text-zinc-500 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          <span>Zero spam guarantee. Strictly used for research distribution.</span>
        </div>
      </form>
    </div>
  );
}
