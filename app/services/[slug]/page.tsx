import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SERVICES_DATA, FEATURED_PROJECTS } from "@/data/siteData";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { Project } from "@/types";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Layers,
  Brain,
  PenTool,
  Code2,
  TrendingUp,
  Zap,
  LucideIcon,
} from "lucide-react";

export const revalidate = 3600;

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

const DISCIPLINE_GLOWS: Record<string, string> = {
  strategy: "rgba(168, 85, 247, 0.22)",        // Violet
  "brand-creative": "rgba(236, 72, 153, 0.20)", // Magenta / Rose
  technology: "rgba(6, 182, 212, 0.20)",       // Electric Cyan / Blue
  marketing: "rgba(16, 185, 129, 0.20)",        // Emerald / Growth Green
  experiences: "rgba(245, 158, 11, 0.20)",      // Radiant Amber / Gold
};

const ICON_MAP: Record<string, LucideIcon> = {
  Brain,
  PenTool,
  Code2,
  TrendingUp,
  Zap,
};

const FALLBACK_SERVICE_PROJECTS: Record<string, string[]> = {
  strategy: ["project-nostic", "project-zepto", "project-cred"],
  "brand-creative": ["project-zepto", "project-cred", "project-nostic"],
  technology: ["project-razorpay", "project-yulu", "project-simpl"],
  marketing: ["project-zepto", "project-simpl", "project-razorpay"],
  experiences: ["project-yulu", "project-cred", "project-zepto"],
};

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

  const glowColor =
    DISCIPLINE_GLOWS[service.slug.toLowerCase()] || "rgba(168, 85, 247, 0.20)";
  const IconComponent = ICON_MAP[service.icon || ""] || Brain;

  // Curated project fallback when Supabase junction yields no records
  const fallbackIds =
    FALLBACK_SERVICE_PROJECTS[slug.toLowerCase()] || ["project-nostic", "project-zepto", "project-cred"];
  const fallbackProjects = fallbackIds
    .map((id) => FEATURED_PROJECTS.find((p) => p.id === id))
    .filter(Boolean) as Project[];

  const finalProjects: Project[] =
    linkedProjects.length > 0
      ? linkedProjects.map((p: any) => ({
          id: p.id || `project-${p.slug}`,
          slug: p.slug,
          title: p.title || p.slug.toUpperCase(),
          client: p.client || p.title,
          category: p.category || "Case Study",
          industry: p.industry || "Technology",
          description: p.description || "",
          heroImage: p.hero_image || p.heroImage || `/images/projects/${p.slug}.jpg`,
          tags: p.tags || ["Next.js", "Fullstack", "Production"],
          isFeatured: true,
          linkText: "Case Study →",
        }))
      : fallbackProjects;

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#030014]/40 text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.22),transparent)] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-6xl mx-auto px-6 relative z-10">
        {/* Back Link */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO SERVICES ARCHIVE</span>
        </Link>

        {/* Eyebrow, Title & Luminous Discipline Emblem Badge */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="text-[11px] font-mono text-[#B896FF] uppercase tracking-widest mb-3 font-medium flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
              {service.tagline} // {service.group}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.01em] [word-spacing:0.1em] text-white mb-6">
              {service.name}
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Luminous Discipline Emblem Accent Badge */}
          <div className="relative rounded-3xl bg-[#0B0813]/60 backdrop-blur-xl border border-white/10 p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-2xl shadow-black/60 min-w-[280px] shrink-0 overflow-hidden group">
            {/* Ambient Discipline Glow */}
            <div
              className="absolute inset-0 pointer-events-none rounded-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${glowColor} 0%, transparent 70%)`,
              }}
            />

            {/* Concentric Decorative Ring */}
            <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center relative mb-4">
              <div className="absolute inset-2 rounded-full border border-violet-500/30 animate-pulse" />
              <IconComponent className="w-9 h-9 text-[#B896FF]" />
            </div>

            <div className="font-mono text-[10px] tracking-widest uppercase text-[#B896FF] font-semibold mb-1">
              {service.tagline} // DISCIPLINE
            </div>
            <div className="text-xs text-zinc-300 font-medium mb-3">
              AI-Accelerated Studio Runtime
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span>PRACTICE ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Asymmetrical 12-Column Grid: Methodology on Left (cols 1-5), Capabilities on Right (cols 7-12) */}
        <div className="rounded-3xl bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/40 shadow-2xl shadow-black/60 p-8 sm:p-12 mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-300 relative overflow-hidden group">
          {/* Discipline-Specific Corner Glow */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 z-0"
            style={{
              background: `radial-gradient(ellipse 70% 60% at 88% 12%, ${glowColor} 0%, transparent 70%)`,
            }}
          />

          {/* Left (cols 1-5): Numerical indicator, title, scope summary, obsidian action CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between relative z-10">
            <div>
              <div className="font-mono text-[11px] sm:text-[12px] font-medium tracking-wider uppercase text-[#B896FF] mb-2">
                01 // {service.tagline} METHODOLOGY
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3 leading-snug group-hover:text-violet-200 transition-colors">
                AI-Native Methodology
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed mb-8">
                We bypass traditional multi-month agency bloat by deploying AI-accelerated research frameworks, procedural design tokens, and rapid fullstack prototyping to test and validate outcomes in weeks.
              </p>
            </div>
            <Link
              href="/start-a-project"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider bg-violet-600/20 border border-violet-500/40 text-violet-200 hover:bg-violet-600 hover:text-white transition-all shadow-[0_0_15px_rgba(139,92,246,0.2)] group/btn w-fit"
            >
              <span>Initiate {service.name} Scope</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right (cols 7-12): 2x2 grid of frosted glass telemetry chips */}
          <div className="lg:col-span-7 bg-black/30 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/5 relative z-10">
            <div className="text-[10px] font-mono font-medium uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-violet-400" />
              <span>CAPABILITIES &amp; SYSTEM DELIVERABLES</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {service.deliverables.map((d) => (
                <div
                  key={d}
                  className="bg-white/[0.04] border border-white/10 hover:border-violet-500/30 hover:bg-violet-950/20 rounded-xl p-4 transition-all group/chip flex items-start gap-3 shadow-sm"
                >
                  {/* Glowing violet micro-dot */}
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 group-hover/chip:bg-violet-300 group-hover/chip:shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-all shrink-0 mt-1.5" />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-white group-hover/chip:text-violet-200 transition-colors leading-snug block">
                      {d}
                    </span>
                    <span className="text-[11px] text-zinc-400 leading-normal block mt-0.5 font-normal">
                      Verified studio outcome
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamically Linked Featured Projects with Mockups & 3D Tilt */}
        {finalProjects.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/[0.08]">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#B896FF] flex items-center gap-2 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FEATURED CLIENT WORKS // {service.name.toUpperCase()} DISCIPLINE</span>
              </div>
              <Link
                href="/projects"
                className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {finalProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* Action Bar */}
        <div className="relative rounded-3xl bg-[#0B0813]/70 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 p-8 sm:p-10 shadow-2xl shadow-black/60 overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 transition-all">
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl opacity-50 z-0"
            style={{
              background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${glowColor} 0%, transparent 70%)`,
            }}
          />

          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 leading-snug">
              Ready to execute with {service.name}?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-normal">
              Speak with a practice lead or generate an instant AI-native project brief.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <Link
              href="/start-a-project"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold tracking-wider text-white bg-violet-600 hover:bg-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
            >
              <span>Start Project Brief</span>
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
