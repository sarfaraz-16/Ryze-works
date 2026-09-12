import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { Sparkles, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "AI Disclosure & Ethics | RYZE WORKS",
  description: "AI Disclosure, security policies, and safety principles at Ryze Works."
};

export default function AIDisclosurePage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#080417] text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-4xl mx-auto px-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E085A]/50 border border-[#7042FF]/30 text-[#B896FF] font-mono text-[10px] sm:text-[11px] uppercase tracking-wider mb-6 shadow-lg shadow-[#1E085A]/40">
          <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
          GOVERNANCE & RESPONSIBLE AI
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.01em] [word-spacing:0.1em] text-white mb-6">
          AI Disclosure & Safety Standards
        </h1>
        <p className="font-mono text-xs text-zinc-400 mb-10 pb-4 border-b border-white/[0.08]">
          Last Updated: September 2024 • Bangalore, India
        </p>

        <div className="rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] p-8 sm:p-12 shadow-2xl shadow-black/50 space-y-8 text-sm sm:text-base text-zinc-300 leading-relaxed">
          <p>
            As an AI-native creative & technology partner, transparency in our computational pipelines is foundational to client trust.
          </p>
          <div className="pt-4 border-t border-white/[0.08]">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 tracking-[-0.01em] [word-spacing:0.08em]">Server-Side Key Isolation</h2>
            <p>
              All AI model inferences (Google Gemini and OpenAI) are mediated exclusively through secure server-side Edge Functions. Client API keys and provider tokens never touch the browser window or client bundles.
            </p>
          </div>
          <div className="pt-4 border-t border-white/[0.08]">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 tracking-[-0.01em] [word-spacing:0.08em]">Grounded Retrieval & Anti-Hallucination Policy</h2>
            <p>
              The Ryze AI assistant enforces a strict zero-hallucination constraint. The model is constrained to ground all factual statements in verified project registries and case studies, explicitly refusing to fabricate client metrics or pricing.
            </p>
          </div>
          <div className="pt-4 border-t border-white/[0.08]">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 tracking-[-0.01em] [word-spacing:0.08em]">Human-in-the-Loop Review</h2>
            <p>
              While AI accelerates initial asset exploration and prototyping, every production deliverable shipped to clients undergoes rigorous human code review, accessibility testing, and security auditing.
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
