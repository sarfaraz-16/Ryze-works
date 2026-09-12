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
    <main className="min-h-[calc(100vh-80px)] bg-[#080417] text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-4xl mx-auto px-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E085A]/50 border border-[#7042FF]/30 text-[#B896FF] font-mono text-[10px] sm:text-[11px] uppercase tracking-wider mb-6 shadow-lg shadow-[#1E085A]/40">
          <ShieldCheck className="w-3.5 h-3.5 text-[#B896FF]" />
          DATA GOVERNANCE STANDARDS
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.01em] [word-spacing:0.1em] text-white mb-6">
          Privacy Policy
        </h1>
        <p className="font-mono text-xs text-zinc-400 mb-10 pb-4 border-b border-white/[0.08]">
          Last Updated: September 2024 • Chennai, India
        </p>

        <div className="rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] p-8 sm:p-12 shadow-2xl shadow-black/50 space-y-8 text-sm sm:text-base text-zinc-300 leading-relaxed">
          <p>
            At Ryze Works, we take privacy and intellectual property seriously. When you submit project inquiries, contact requests, or project briefs, your information is stored in secure, row-level security (RLS) encrypted databases hosted via Supabase.
          </p>
          <div className="pt-4 border-t border-white/[0.08]">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 tracking-[-0.01em] [word-spacing:0.08em]">Data We Collect</h2>
            <p>
              We collect contact credentials (name, email, company affiliation) and project scope details exclusively for the purpose of communicating with prospective clients and fulfilling contractual agency services.
            </p>
          </div>
          <div className="pt-4 border-t border-white/[0.08]">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 tracking-[-0.01em] [word-spacing:0.08em]">AI Processing & Data Segregation</h2>
            <p>
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
