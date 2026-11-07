import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { ServiceCapabilityCard } from "@/components/services/ServiceCapabilityCard";
import { SERVICES_DATA, RYZE_CATALOGUE_10_SERVICES, TARGET_INDUSTRIES } from "@/data/siteData";
import { createClient } from "@/lib/supabase/server";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export const revalidate = 3600;

export const metadata = {
  title: "Services & Capabilities | Ryzeworks",
  description: "Explore Ryzeworks creative, branding, marketing, video production, and technology services."
};

export default async function ServicesPage() {
  let services = SERVICES_DATA;

  try {
    const supabase = await createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("status", "published")
        .order("display_order", { ascending: true });

      if (!error && data && data.length > 0) {
        services = data.map((s) => ({
          id: s.id,
          slug: s.slug,
          name: s.name,
          tagline: s.tagline || "",
          group: s.group_name || s.group,
          icon: s.icon || "Brain",
          description: s.description,
          deliverables: s.deliverables || []
        }));
      }
    }
  } catch (err) {
    console.warn("Supabase services fetch fallback:", err);
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#030014]/40 text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.22),transparent)] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-[11px] font-mono text-[#B896FF] uppercase tracking-widest mb-3 font-medium flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
            OUR SERVICES &amp; CAPABILITIES
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.01em] [word-spacing:0.1em] text-white mb-6">
            Connecting creativity with commercial impact.
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-2xl">
            We combine strategy, creativity, content and execution to help brands build a stronger presence, connect with their audience and turn attention into opportunity.
          </p>
        </div>

        {/* 10 Services Detailed Grid */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <div>
              <span className="font-mono text-xs text-violet-400 uppercase tracking-widest block mb-1">
                SERVICE DIRECTORY
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                10 Core Delivery Capabilities
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              {RYZE_CATALOGUE_10_SERVICES.length} Practices
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RYZE_CATALOGUE_10_SERVICES.map((item) => (
              <div
                key={item.num}
                className="bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 font-mono text-xs text-zinc-400">
                    <span className="text-violet-400 font-bold">{item.num} // {item.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-xs text-violet-300 font-medium mb-3">{item.tagline}</p>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Inquire for project scope</span>
                  <Link
                    href="/start-a-project"
                    className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Request Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Target Industries */}
        <div className="rounded-3xl bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 p-8 sm:p-12 mb-20">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono text-violet-400 uppercase tracking-wider block mb-2">
              SECTOR EXPERTISE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Specialized Industry Knowledge
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              We are particularly suited to businesses that recognize the importance of strategic branding, quality creative communication, and consistent marketing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TARGET_INDUSTRIES.map((ind) => (
              <div
                key={ind.name}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                  <h4 className="text-sm font-bold text-white">{ind.name}</h4>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed pl-6">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Consulting Advisory Card */}
        <div className="relative rounded-3xl bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 p-8 sm:p-12 text-center flex flex-col items-center shadow-2xl shadow-black/60 overflow-hidden transition-all">
          <div className="absolute inset-0 pointer-events-none rounded-3xl bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(139,92,246,0.15),transparent)] z-0" />

          <div className="relative z-10 max-w-2xl flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3 leading-snug">
              Ready to turn your brand into your competitive edge?
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-normal mb-8 leading-relaxed">
              Schedule a strategic discovery briefing with Ryzeworks to map your brand, content, and growth trajectory.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/start-a-project"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold tracking-wider text-white bg-violet-600 hover:bg-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
              >
                <span>Start a Project Enquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold tracking-wider text-zinc-200 bg-white/[0.05] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all"
              >
                <span>Contact Mandaveli Studio</span>
                <Sparkles className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-footer Anchor Marquee & Closing CTA */}
      <ClosingCTA />

      <Footer />
    </main>
  );
}

