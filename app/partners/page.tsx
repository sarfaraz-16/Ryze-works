import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { Handshake, Megaphone, FileSpreadsheet, Sparkles, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Partnerships & Media | RYZE WORKS",
  description: "Brand partnerships, agency co-marketing, and media inquiries."
};

export default function PartnersPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#080417] text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-5xl mx-auto px-6 text-center relative z-10">
        <div className="text-[11px] font-mono text-[#B896FF] uppercase tracking-widest mb-3 font-medium flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
          COMMERCIAL &amp; MEDIA CHANNELS
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white mb-6 tracking-[-0.01em] [word-spacing:0.1em] leading-[1.08]">
          Partnerships &amp; Media Operations
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 font-normal max-w-2xl mx-auto leading-relaxed mb-16">
          Our specialized advertising platform and self-serve media kit are slated for Phase 2. In the interim, custom commercial partnerships and executive sponsorships are handled directly by our leadership team.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 text-left">
          <Link
            href="/advertise"
            className="group p-8 rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#B896FF]/40 shadow-2xl shadow-black/50 transition-all duration-300 block"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1E085A]/60 border border-[#7042FF]/30 flex items-center justify-center text-[#B896FF] mb-5 shadow-lg shadow-[#1E085A]/50 group-hover:scale-105 transition-transform">
              <Megaphone className="w-5 h-5" />
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-white mb-2 tracking-[-0.01em] [word-spacing:0.08em] group-hover:text-[#B896FF] transition-colors flex items-center justify-between">
              <span>Advertise</span>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#B896FF] group-hover:translate-x-1 transition-all" />
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
              Sponsored newsletter editions, editorial placements, and AI summit co-branding.
            </p>
          </Link>

          <Link
            href="/media-kit"
            className="group p-8 rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#B896FF]/40 shadow-2xl shadow-black/50 transition-all duration-300 block"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1E085A]/60 border border-[#7042FF]/30 flex items-center justify-center text-cyan-400 mb-5 shadow-lg shadow-[#1E085A]/50 group-hover:scale-105 transition-transform">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-white mb-2 tracking-[-0.01em] [word-spacing:0.08em] group-hover:text-[#B896FF] transition-colors flex items-center justify-between">
              <span>Media Kit</span>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#B896FF] group-hover:translate-x-1 transition-all" />
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
              Request readership demographics, tech founder reach, and brand assets.
            </p>
          </Link>

          <div className="p-8 rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#B896FF]/30 shadow-2xl shadow-black/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#1E085A]/60 border border-[#7042FF]/30 flex items-center justify-center text-amber-400 mb-5 shadow-lg shadow-[#1E085A]/50">
              <Handshake className="w-5 h-5" />
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-white mb-2 tracking-[-0.01em] [word-spacing:0.08em]">Ecosystem Alliances</h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
              Integration partnerships with AI foundation model labs, cloud vendors, and VCs.
            </p>
          </div>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1E085A]/50 via-[#0d0e17]/90 to-[#1E085A]/50 border border-[#7042FF]/30 backdrop-blur-md shadow-2xl shadow-black/50 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2 tracking-[-0.01em] [word-spacing:0.08em]">
            Inquire About Commercial Partnerships
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 font-normal mb-8">
            Direct your inquiry to teamryzeworks@gmail.com or use our direct contact desk.
          </p>
          <div className="flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#7042FF] to-[#4318D1] hover:brightness-110 shadow-lg shadow-[#7042FF]/30 border border-[#B896FF]/30 transition-all"
            >
              <span>Contact Partnerships Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
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
