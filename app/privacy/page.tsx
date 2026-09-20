import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | RYZE WORKS",
  description: "Privacy Policy and data governance standards at Ryze Works."
};

export default function PrivacyPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-transparent text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-32 pb-24 max-w-4xl mx-auto px-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-6">
          <ShieldCheck className="w-3.5 h-3.5" />
          DATA GOVERNANCE STANDARDS
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
          Privacy Policy
        </h1>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-400 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
          <span>Last Updated: September 2026 • Verified Governance</span>
        </div>

        <div className="bg-[#0B0813]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.7)] relative overflow-hidden space-y-10 text-left">
          <div className="absolute top-0 inset-x-12 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent pointer-events-none" />
          <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-sans pb-8 border-b border-white/10">
            At Ryze Works, we take privacy and intellectual property seriously. When you submit project inquiries, contact requests, or project briefs, your information is stored in secure, row-level security (RLS) encrypted databases hosted via Supabase.
          </p>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)] shrink-0" />
              Data We Collect
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              We collect contact credentials (name, email, company affiliation) and project scope details exclusively for the purpose of communicating with prospective clients and fulfilling contractual agency services.
            </p>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)] shrink-0" />
              AI Processing & Data Segregation
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              Client data is never used to train third-party public foundational models. All AI Gateway interactions mediated through Google Gemini or OpenAI are stateless API calls governed by enterprise zero-retention policies.
            </p>
          </div>
        </div>
      </section>

      {/* Pre-footer Anchor Marquee & Closing CTA */}
      <ClosingCTA />

      <Footer />
    </main>
  );
}
