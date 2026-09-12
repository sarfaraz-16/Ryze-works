import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Terms of Use | RYZE WORKS",
  description: "Terms of Use and client engagement framework at Ryze Works."
};

export default function TermsPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#080417] text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-4xl mx-auto px-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E085A]/50 border border-[#7042FF]/30 text-[#B896FF] font-mono text-[10px] sm:text-[11px] uppercase tracking-wider mb-6 shadow-lg shadow-[#1E085A]/40">
          <ShieldCheck className="w-3.5 h-3.5 text-[#B896FF]" />
          CLIENT ENGAGEMENT TERMS
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.01em] [word-spacing:0.1em] text-white mb-6">
          Terms of Use
        </h1>
        <p className="font-mono text-xs text-zinc-400 mb-10 pb-4 border-b border-white/[0.08]">
          Last Updated: September 2024 • Chennai, India
        </p>

        <div className="rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] p-8 sm:p-12 shadow-2xl shadow-black/50 space-y-8 text-sm sm:text-base text-zinc-300 leading-relaxed">
          <p>
            Welcome to Ryze Works (&quot;Ryze Works&quot;, &quot;we&quot;, &quot;us&quot;). By accessing our website, tools, and digital platforms, you agree to comply with and be bound by these Terms of Use.
          </p>
          <div className="pt-4 border-t border-white/[0.08]">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 tracking-[-0.01em] [word-spacing:0.08em]">Intellectual Property & Deliverables</h2>
            <p>
              All custom designs, codebases, and systems produced during contracted sprints become the exclusive intellectual property of the commissioning client upon receipt of final milestone settlement.
            </p>
          </div>
          <div className="pt-4 border-t border-white/[0.08]">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 tracking-[-0.01em] [word-spacing:0.08em]">AI Generated Outputs</h2>
            <p>
              Outputs generated through the Ryze AI assistant and Project Brief Studio are provided on an advisory basis to assist project scoping. Final engineering architectures are validated by human solutions architects.
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
