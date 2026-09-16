import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { ServiceCapabilityCard } from "@/components/services/ServiceCapabilityCard";
import { SERVICES_DATA } from "@/data/siteData";
import { createClient } from "@/lib/supabase/server";
import { Sparkles, ArrowRight } from "lucide-react";

export const revalidate = 3600;

export const metadata = {
  title: "Services & Capabilities | RYZE WORKS",
  description: "End-to-end capabilities across Strategy, Brand + Creative, Technology, Marketing, and Experiences."
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
            CAPABILITIES TAXONOMY
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.01em] [word-spacing:0.1em] text-white mb-6">
            End-to-end capabilities to build what&apos;s next.
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-2xl">
            We partner with ambitious founders and enterprise brands across 5 synchronized disciplines — fusing AI-native execution with craft and strategic rigor.
          </p>
        </div>

        {/* Services Asymmetrical 12-Column List with 3D Tilt & Obsidian Glass */}
        <div className="space-y-8 mb-20">
          {services.map((service, idx) => (
            <ServiceCapabilityCard
              key={service.id}
              service={service}
              index={idx}
            />
          ))}
        </div>

        {/* Consulting Advisory Card */}
        <div className="relative rounded-3xl bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 p-8 sm:p-12 text-center flex flex-col items-center shadow-2xl shadow-black/60 overflow-hidden transition-all">
          <div className="absolute inset-0 pointer-events-none rounded-3xl bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(139,92,246,0.15),transparent)] z-0" />

          <div className="relative z-10 max-w-2xl flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3 leading-snug">
              Unsure which service model fits your roadmap?
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-normal mb-8 leading-relaxed">
              Consult Ryze AI for an instant scope advisory, or schedule a strategic briefing with our engineering and design partners.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/ai"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold tracking-wider text-white bg-violet-600 hover:bg-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
              >
                <span>Consult Ryze AI Advisor</span>
                <Sparkles className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/start-a-project"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold tracking-wider text-zinc-200 bg-white/[0.05] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all"
              >
                <span>Start a Project Brief</span>
                <ArrowRight className="w-3.5 h-3.5" />
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

