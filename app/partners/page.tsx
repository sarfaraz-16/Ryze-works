import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { TiltCard3D } from "@/components/ui/TiltCard3D";
import { Handshake, Megaphone, FileSpreadsheet, Sparkles, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Partnerships & Media | RYZE WORKS",
  description: "Brand partnerships, agency co-marketing, and media inquiries."
};

export default function PartnersPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-transparent text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-5xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          COMMERCIAL &amp; MEDIA CHANNELS
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
          Partnerships &amp; Media Operations
        </h1>
        <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-12">
          Our specialized advertising platform and self-serve media kit are slated for Phase 2. In the interim, custom commercial partnerships and executive sponsorships are handled directly by our leadership team.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 text-left">
          <Link href="/advertise" className="block h-full outline-none">
            <TiltCard3D className="bg-[#0B0813]/75 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 rounded-3xl p-7 sm:p-8 transition-all duration-300 relative group overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between text-left h-full">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/[0.07] via-transparent to-cyan-500/[0.04] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-300 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-violet-500/40 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all">
                  <Megaphone className="w-5 h-5" />
                </div>
                <h2 className="flex items-center justify-between text-xl font-bold text-white group-hover:text-violet-200 transition-colors mb-2">
                  <span>Advertise</span>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                </h2>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  Sponsored newsletter editions, editorial placements, and AI summit co-branding.
                </p>
              </div>
            </TiltCard3D>
          </Link>

          <Link href="/media-kit" className="block h-full outline-none">
            <TiltCard3D className="bg-[#0B0813]/75 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 rounded-3xl p-7 sm:p-8 transition-all duration-300 relative group overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between text-left h-full">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/[0.07] via-transparent to-cyan-500/[0.04] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-300 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-violet-500/40 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <h2 className="flex items-center justify-between text-xl font-bold text-white group-hover:text-violet-200 transition-colors mb-2">
                  <span>Media Kit</span>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                </h2>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  Request readership demographics, tech founder reach, and brand assets.
                </p>
              </div>
            </TiltCard3D>
          </Link>

          <TiltCard3D className="bg-[#0B0813]/75 backdrop-blur-2xl border border-white/10 hover:border-violet-500/40 rounded-3xl p-7 sm:p-8 transition-all duration-300 relative group overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between text-left h-full">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/[0.07] via-transparent to-cyan-500/[0.04] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-300 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-violet-500/40 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all">
                <Handshake className="w-5 h-5" />
              </div>
              <h2 className="flex items-center justify-between text-xl font-bold text-white group-hover:text-violet-200 transition-colors mb-2">
                <span>Ecosystem Alliances</span>
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                Integration partnerships with AI foundation model labs, cloud vendors, and VCs.
              </p>
            </div>
          </TiltCard3D>
        </div>

        <div className="max-w-2xl mx-auto mt-12 bg-[#0B0813]/80 backdrop-blur-2xl border border-white/10 hover:border-violet-500/30 rounded-3xl p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] relative overflow-hidden text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet-600/15 blur-[100px] rounded-full -z-10 pointer-events-none" />
          <h2 className="text-2xl font-bold text-white mb-2 relative z-10">
            Inquire About Commercial Partnerships
          </h2>
          <p className="text-sm text-zinc-300 mb-6 max-w-md mx-auto relative z-10">
            Direct your inquiry to teamryzeworks@gmail.com or use our direct contact desk.
          </p>
          <div className="flex justify-center relative z-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all group cursor-pointer"
            >
              <span>Contact Partnerships Team</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
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
