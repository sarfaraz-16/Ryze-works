import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { Sparkles, ShieldCheck, Zap, Globe2, Compass, ArrowRight, Award, Building2 } from "lucide-react";
import { TiltCard3D } from "@/components/ui/TiltCard3D";

export const metadata = {
  title: "About Us | Ryzeworks — Vision Into Influence",
  description: "Ryzeworks is a creative branding and marketing company transforming business visions into distinctive, memorable brands. A unit of AINTRIX Global Pvt. Ltd."
};

export default function AboutPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-transparent text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-6xl mx-auto px-6 relative z-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          ABOUT RYZEWORKS
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6">
          Vision Into Influence.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300">
            Creativity Into Distinction.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl leading-relaxed font-sans mb-8">
          Ryzeworks is a creative branding and marketing company built on the belief that every brand deserves to be distinctive, meaningful, and impossible to overlook.
        </p>

        <p className="text-base sm:text-lg text-zinc-400 max-w-3xl leading-relaxed font-sans mb-16">
          Through strategic branding, purposeful content, compelling visual storytelling, and insight-driven marketing, we help businesses establish a powerful identity, stand apart in their markets, and create lasting impressions.
        </p>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <TiltCard3D className="bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 rounded-3xl p-8 transition-all duration-300 relative group overflow-hidden shadow-2xl h-full flex flex-col">
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-300 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-violet-500/40 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all relative z-10">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Strategic Clarity</h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              We understand a brand&apos;s vision, positioning, audience, and market before developing creative and marketing strategies that bring its identity to life.
            </p>
          </TiltCard3D>

          <TiltCard3D className="bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 rounded-3xl p-8 transition-all duration-300 relative group overflow-hidden shadow-2xl h-full flex flex-col">
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-300 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-violet-500/40 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all relative z-10">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Cinematic Production</h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              From building cohesive visual systems to producing cinematic-quality content, we ensure every creative output serves a clear, measurable brand objective.
            </p>
          </TiltCard3D>

          <TiltCard3D className="bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 rounded-3xl p-8 transition-all duration-300 relative group overflow-hidden shadow-2xl h-full flex flex-col">
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-300 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-violet-500/40 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all relative z-10">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Insight-Driven Growth</h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Exceptional branding is about creating recognition, establishing trust, and shaping perception to build connections that endure.
            </p>
          </TiltCard3D>
        </div>

        {/* Corporate Governance & Leadership Card */}
        <div className="bg-[#0B0813]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 mb-16 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-violet-400 uppercase tracking-wider mb-3">
                <Building2 className="w-4 h-4" />
                <span>Corporate Identity &amp; Structure</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                A Unit of AINTRIX Global Pvt. Ltd.
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                Established in 2025, Ryzeworks operates as the creative and brand innovation arm of AINTRIX Global Pvt. Ltd., headquartered in Chennai, Tamil Nadu.
              </p>
              <div className="space-y-2 text-xs text-zinc-400 font-mono">
                <div><strong className="text-white">Director:</strong> Shanmuga Priya G</div>
                <div><strong className="text-white">Founded:</strong> 2025</div>
                <div><strong className="text-white">Headquarters:</strong> Mandaveli, Chennai, Tamil Nadu - 600028</div>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-300 flex items-center justify-center font-bold font-mono">
                  SP
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Shanmuga Priya G</h3>
                  <span className="text-xs text-violet-400 font-mono">Director, Ryzeworks</span>
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                &ldquo;At RYZE Works, we bring together people, ideas and creativity to challenge conventions, raise creative standards and build brands that command attention and distinction.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Studio Info */}
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-violet-600/15 blur-[100px] rounded-full -z-10 pointer-events-none" />
          <div className="bg-[#0B0813]/80 backdrop-blur-2xl border border-white/10 hover:border-violet-500/30 rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
            <div className="relative z-10">
              <div className="flex items-center gap-2 font-mono text-xs font-medium text-violet-400 uppercase tracking-wider mb-3">
                <Globe2 className="w-4 h-4" />
                <span>Chennai Studio &amp; Global Operations</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-[-0.01em]">
                Mandaveli, Chennai
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 font-normal max-w-md leading-relaxed">
                93/50, Ramakrishna Mutt Rd, Mandaveli, Chennai - 600028, Tamil Nadu. Serving emerging brands, founders, and global enterprises.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all shrink-0 relative z-10"
            >
              <span>Connect With Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pre-footer Anchor Marquee & Closing CTA */}
      <ClosingCTA />

      <Footer />
    </main>
  );
}
