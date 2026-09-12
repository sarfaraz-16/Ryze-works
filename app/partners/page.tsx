import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Handshake, Megaphone, FileSpreadsheet } from "lucide-react";

export const metadata = {
  title: "Partnerships & Media | RYZE WORKS",
  description: "Brand partnerships, agency co-marketing, and media inquiries."
};

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-[#07070b] text-white">
      <Navbar />

      <section className="pt-36 pb-24 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/40 text-purple-300 text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
          COMMERCIAL & MEDIA CHANNELS
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
          Partnerships & Media Operations
        </h1>
        <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto leading-relaxed mb-12">
          Our specialized advertising platform and self-serve media kit are slated for Phase 2. In the interim, custom commercial partnerships and executive sponsorships are handled directly by our leadership team.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 text-left">
          <div className="p-6 rounded-2xl bg-[#0c0d16] border border-white/[0.08]">
            <Megaphone className="w-6 h-6 text-purple-400 mb-3" />
            <h2 className="text-base font-bold text-white mb-1">Advertise</h2>
            <p className="text-xs text-white/50 leading-relaxed">
              Sponsored newsletter editions, editorial placements, and AI summit co-branding.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c0d16] border border-white/[0.08]">
            <FileSpreadsheet className="w-6 h-6 text-cyan-400 mb-3" />
            <h2 className="text-base font-bold text-white mb-1">Media Kit</h2>
            <p className="text-xs text-white/50 leading-relaxed">
              Request readership demographics, tech founder reach, and brand assets.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c0d16] border border-white/[0.08]">
            <Handshake className="w-6 h-6 text-amber-400 mb-3" />
            <h2 className="text-base font-bold text-white mb-1">Ecosystem Alliances</h2>
            <p className="text-xs text-white/50 leading-relaxed">
              Integration partnerships with AI foundation model labs, cloud vendors, and VCs.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-[#0d0e1a] border border-purple-800/30">
          <h2 className="text-lg font-bold text-white mb-2">
            Inquire About Commercial Partnerships
          </h2>
          <p className="text-xs text-white/50 mb-6">
            Direct your inquiry to partnerships@ryzeworks.tech or use our contact desk.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="md">
                Contact Partnerships Team →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
