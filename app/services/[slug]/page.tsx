import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { SERVICES_DATA } from "@/data/siteData";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export const revalidate = 3600;

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const supabase = createAdminClient() || (await createClient());
    if (supabase) {
      const { data } = await supabase.from("services").select("slug").eq("status", "published");
      if (data && data.length > 0) {
        return data.map((s) => ({ slug: s.slug }));
      }
    }
  } catch (err) {
    console.warn("generateStaticParams services fallback:", err);
  }
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  let service = SERVICES_DATA.find((s) => s.slug === slug);

  let linkedProjects: Array<{
    id: string;
    title: string;
    slug: string;
    client: string;
    category: string;
    industry: string;
    description: string;
    hero_image?: string;
  }> = [];

  try {
    const supabase = createAdminClient() || (await createClient());
    if (supabase) {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (!error && data) {
        service = {
          id: data.id,
          slug: data.slug,
          name: data.name,
          tagline: data.tagline || "",
          group: data.group_name || data.group,
          icon: data.icon || "Brain",
          description: data.description,
          deliverables: data.deliverables || []
        };

        // Query dynamically joined projects via project_services junction (Acceptance Test B)
        const { data: psData } = await supabase
          .from("project_services")
          .select("projects(id, title, slug, client, category, industry, description, hero_image)")
          .eq("service_id", data.id);

        if (psData && Array.isArray(psData)) {
          linkedProjects = psData
            .map((item: any) => item.projects)
            .filter(Boolean);
        }
      }
    }
  } catch (err) {
    console.warn("ServiceDetailPage fetch fallback:", err);
  }

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#080417] text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-6xl mx-auto px-6 relative z-10">
        {/* Back Link */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO SERVICES ARCHIVE</span>
        </Link>

        {/* Eyebrow & Title */}
        <div className="mb-12 sm:mb-16">
          <div className="text-[11px] font-mono text-[#B896FF] uppercase tracking-widest mb-3 font-medium flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
            {service.tagline} // {service.group}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.01em] [word-spacing:0.1em] text-white mb-6">
            {service.name}
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-3xl">
            {service.description}
          </p>
        </div>

        {/* Asymmetrical 12-Column Grid: Methodology on Left (cols 1-5), Capabilities on Right (cols 7-12) */}
        <div className="rounded-3xl bg-[#0d0e17]/85 backdrop-blur-md border border-white/[0.08] hover:border-[#B896FF]/30 shadow-2xl shadow-black/50 p-8 sm:p-12 mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-300">
          {/* Left (cols 1-5): Numerical indicator, title, scope summary, #7042FF pill button */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[11px] sm:text-[12px] font-medium tracking-wider uppercase text-[#B896FF] mb-2">
                01 // {service.tagline}
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.01em] [word-spacing:0.1em] text-white mb-3 leading-snug">
                AI-Native Methodology
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed mb-8">
                We bypass traditional multi-month agency bloat by deploying AI-accelerated research frameworks, procedural design tokens, and rapid fullstack prototyping to test and validate outcomes in weeks.
              </p>
            </div>
            <Link
              href="/start-a-project"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#7042FF] to-[#4318D1] hover:brightness-110 shadow-lg shadow-[#7042FF]/30 border border-[#B896FF]/30 transition-all w-fit"
            >
              <span>Initiate {service.name} Scope</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right (cols 7-12): 2x2 grid of capability tiles with checkmark badges */}
          <div className="lg:col-span-7 bg-[#080417]/80 rounded-2xl p-6 sm:p-8 border border-white/[0.06]">
            <div className="text-[10px] font-mono font-medium uppercase tracking-wider text-zinc-400 mb-4">
              CAPABILITIES &amp; SYSTEM DELIVERABLES
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {service.deliverables.map((d) => (
                <div
                  key={d}
                  className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-3.5 text-xs text-zinc-200 flex items-start gap-2.5 hover:border-[#B896FF]/30 hover:bg-white/[0.05] transition-all"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#B896FF] shrink-0 mt-0.5" />
                  <span className="font-medium leading-snug">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamically Linked Featured Projects (Acceptance Test B) */}
        {linkedProjects.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/[0.08]">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#B896FF] flex items-center gap-2 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FEATURED CLIENT WORKS // {service.name.toUpperCase()} DISCIPLINE</span>
              </div>
              <Link href="/projects" className="text-xs font-mono text-zinc-400 hover:text-white transition-colors">
                View All Projects →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {linkedProjects.map((p) => (
                <Link
                  key={p.id || p.slug}
                  href={`/projects/${p.slug}`}
                  className="group p-6 rounded-3xl bg-[#0d0e17]/85 border border-white/[0.08] hover:border-[#B896FF]/40 shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-mono uppercase text-[#B896FF] mb-1">
                      {p.category} • {p.industry}
                    </div>
                    <h4 className="text-xl font-bold text-white group-hover:text-[#B896FF] transition-colors mb-2">
                      {p.title}
                    </h4>
                    <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                      {p.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-zinc-300 group-hover:text-white">
                    <span>Explore Case &amp; System</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#B896FF]" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#1E085A]/50 via-[#0d0e17]/90 to-[#1E085A]/50 border border-[#7042FF]/30 backdrop-blur-md shadow-2xl shadow-black/50">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.01em] [word-spacing:0.1em] text-white mb-2 leading-snug">
              Ready to execute with {service.name}?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-normal">
              Speak with a practice lead or generate an instant AI-native project brief.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/start-a-project"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#7042FF] to-[#4318D1] hover:brightness-110 shadow-lg shadow-[#7042FF]/30 border border-[#B896FF]/30 transition-all"
            >
              Start Project Brief →
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
