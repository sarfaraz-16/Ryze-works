import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { IconShield3D } from "@/components/ui/IconShield3D";
import { SERVICES_DATA } from "@/data/siteData";
import { createClient } from "@/lib/supabase/server";
import { Brain, PenTool, Code2, TrendingUp, Zap, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

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
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Brain": return <Brain className="w-6 h-6 text-[#B896FF]" />;
      case "PenTool": return <PenTool className="w-6 h-6 text-[#B896FF]" />;
      case "Code2": return <Code2 className="w-6 h-6 text-[#B896FF]" />;
      case "TrendingUp": return <TrendingUp className="w-6 h-6 text-[#B896FF]" />;
      case "Zap": return <Zap className="w-6 h-6 text-[#B896FF]" />;
      default: return <Brain className="w-6 h-6 text-[#B896FF]" />;
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#080417] text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

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

        {/* Services Asymmetrical 12-Column List */}
        <div className="space-y-8 mb-20">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className="rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#B896FF]/30 shadow-2xl shadow-black/50 p-8 sm:p-10 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column (cols 1-5): Numerical indicator, title, scope summary, #7042FF pill button */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <IconShield3D icon={getIcon(service.icon)} className="mb-0 shrink-0" />
                    <span className="font-mono text-[11px] sm:text-[12px] font-medium tracking-wider uppercase text-[#B896FF]">
                      0{idx + 1} // {service.tagline}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.01em] [word-spacing:0.1em] text-white mb-3 leading-snug">
                    {service.name}
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#7042FF] to-[#4318D1] hover:brightness-110 shadow-lg shadow-[#7042FF]/30 border border-[#B896FF]/30 transition-all w-fit"
                >
                  <span>View {service.name} Framework</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Right Column (cols 7-12): 2x2 grid of capability tiles with checkmark badges */}
              <div className="lg:col-span-7 bg-[#080417]/80 rounded-2xl p-6 sm:p-8 border border-white/[0.06]">
                <div className="text-[10px] font-mono font-medium uppercase tracking-wider text-zinc-400 mb-4">
                  CORE DELIVERABLES & CAPABILITIES
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.deliverables.map((item) => (
                    <div
                      key={item}
                      className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-3 text-xs text-zinc-200 flex items-start gap-2.5 hover:border-[#B896FF]/30 hover:bg-white/[0.05] transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#B896FF] shrink-0 mt-0.5" />
                      <span className="font-medium leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Consulting Card */}
        <div className="rounded-3xl bg-gradient-to-r from-[#1E085A]/50 via-[#0d0e17]/90 to-[#1E085A]/50 border border-[#7042FF]/30 p-8 sm:p-12 text-center flex flex-col items-center backdrop-blur-md shadow-2xl shadow-black/50">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.01em] [word-spacing:0.1em] text-white mb-3 leading-snug">
            Unsure which service model fits your roadmap?
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 font-normal max-w-xl mb-8 leading-relaxed">
            Consult Ryze AI for an instant scope advisory, or schedule a strategic briefing with our engineering and design partners.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/ai"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#7042FF] to-[#4318D1] hover:brightness-110 shadow-lg shadow-[#7042FF]/30 border border-[#B896FF]/30 transition-all"
            >
              Consult Ryze AI Advisor
            </Link>
            <Link
              href="/start-a-project"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-zinc-200 bg-white/[0.05] border border-white/15 hover:border-white/30 hover:bg-white/[0.08] transition-all"
            >
              Start a Project Brief →
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
