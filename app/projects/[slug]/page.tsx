import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { ProjectDetailHero } from "@/components/projects/ProjectDetailHero";
import { FEATURED_PROJECTS, TESTIMONIALS_DATA } from "@/data/siteData";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Star } from "lucide-react";

export const revalidate = 3600;

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const supabase = await createClient();
    if (supabase) {
      const { data } = await supabase.from("projects").select("slug").eq("status", "published");
      if (data && data.length > 0) {
        return data.map((p) => ({ slug: p.slug }));
      }
    }
  } catch (err) {
    console.warn("generateStaticParams projects fallback:", err);
  }
  return FEATURED_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  let project = FEATURED_PROJECTS.find((p) => p.slug === slug) as any;
  let relatedServices: Array<{ slug: string; name: string; tagline?: string; group?: string }> = [];

  try {
    const supabase = await createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("projects")
        .select(`
          id,
          slug,
          title,
          client,
          category,
          industry,
          description,
          hero_image,
          gallery,
          tags,
          is_featured,
          project_services (
            services (
              id,
              name,
              slug,
              tagline,
              group_name
            )
          )
        `)
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (!error && data) {
        project = {
          id: data.id,
          slug: data.slug,
          title: data.title,
          client: data.client,
          category: data.category,
          industry: data.industry,
          description: data.description,
          heroImage: data.hero_image,
          tags: data.tags || [],
          isFeatured: data.is_featured,
          linkText: `${data.industry} →`
        };

        if (data.project_services && Array.isArray(data.project_services) && data.project_services.length > 0) {
          relatedServices = data.project_services
            .map((ps: any) => ps.services)
            .filter(Boolean)
            .map((s: any) => ({
              slug: s.slug,
              name: s.name,
              tagline: s.tagline,
              group: s.group_name
            }));
        }

        if (relatedServices.length === 0 && data.id) {
          const adminSupabase = createAdminClient();
          if (adminSupabase) {
            const { data: psData } = await adminSupabase
              .from("project_services")
              .select("services(id, name, slug, tagline, group_name)")
              .eq("project_id", data.id);
            if (psData && Array.isArray(psData)) {
              relatedServices = psData
                .map((ps: any) => ps.services)
                .filter(Boolean)
                .map((s: any) => ({
                  slug: s.slug,
                  name: s.name,
                  tagline: s.tagline,
                  group: s.group_name
                }));
            }
          }
        }
      }
    }
  } catch (err) {
    console.warn("ProjectDetailPage fetch fallback:", err);
  }

  if (!project) {
    notFound();
  }

  // Find matching testimonial if any
  const testimonial = TESTIMONIALS_DATA.find((t) =>
    t.company.toLowerCase().includes(project.slug.toLowerCase()) ||
    t.company.toLowerCase().includes(project.title.toLowerCase())
  );

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#030014]/40 text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-6xl mx-auto px-6 relative z-10">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO WORK ARCHIVE</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#B896FF] mb-4">
            <span className="bg-[#1E085A]/50 border border-[#7042FF]/30 px-3 py-1 rounded-full">{project.industry}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Consent Record
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.01em] [word-spacing:0.1em] text-white mb-6">
            {project.title}
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-normal max-w-3xl leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="font-mono text-[10px] text-zinc-300 bg-white/[0.05] border border-white/10 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Media Hero Showcase Theater */}
        <ProjectDetailHero
          slug={project.slug}
          client={project.client}
          title={project.title}
          category={project.category}
          industry={project.industry}
        />

        {/* Project Scope Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-5 rounded-2xl bg-[#0B0813]/60 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 transition-all shadow-xl">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#B896FF] block mb-1">
              Client Partner
            </span>
            <span className="text-base font-semibold text-white">{project.client}</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#0B0813]/60 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 transition-all shadow-xl">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#B896FF] block mb-1">
              Primary Discipline
            </span>
            <span className="text-base font-semibold text-white">{project.category}</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#0B0813]/60 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 transition-all shadow-xl">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#B896FF] block mb-1">
              Status &amp; Verification
            </span>
            <span className="text-base font-semibold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
              Production Live
            </span>
          </div>
        </div>

        {/* Dynamic Related Services from project_services join */}
        {relatedServices.length > 0 && (
          <div className="mb-14">
            <div className="text-[11px] font-mono text-[#B896FF] uppercase tracking-widest mb-3 font-medium">
              DEPLOYED DISCIPLINES &amp; SERVICES
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedServices.map((srv) => (
                <Link
                  key={srv.slug}
                  href={`/services/${srv.slug}`}
                  className="p-5 rounded-2xl bg-[#0B0813]/60 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 transition-all duration-300 group shadow-lg"
                >
                  <div className="text-[10px] font-mono text-[#B896FF] uppercase mb-1">
                    {srv.tagline || srv.group}
                  </div>
                  <div className="text-sm font-semibold text-white group-hover:text-[#B896FF] transition-colors flex items-center justify-between">
                    <span>{srv.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Narrative: Challenge & Approach */}
        <div className="space-y-8 rounded-3xl bg-[#0B0813]/60 backdrop-blur-xl border border-white/10 p-8 sm:p-12 mb-14 shadow-2xl shadow-black/50">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.01em] [word-spacing:0.1em] text-white mb-3 leading-snug">The Challenge</h2>
            <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
              Scaling a category-defining experience in {project.industry} required a brand architecture and digital product stack that balances radical visual distinctiveness with ultra-low latency and intuitive clarity.
            </p>
          </div>

          <div className="pt-6 border-t border-white/10">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.01em] [word-spacing:0.1em] text-white mb-3 leading-snug">The Ryze Works Approach</h2>
            <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed mb-6">
              We mobilized a dedicated cross-functional pod across strategy, procedural design, and modern fullstack engineering (Next.js, Supabase, and real-time systems) to execute sprint-by-sprint deliverables.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/10 text-xs text-zinc-300 hover:border-violet-500/30 transition-all">
                <CheckCircle2 className="w-4 h-4 text-[#B896FF] shrink-0" />
                <span>Zero-placeholder verified architecture</span>
              </div>
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/10 text-xs text-zinc-300 hover:border-violet-500/30 transition-all">
                <CheckCircle2 className="w-4 h-4 text-[#B896FF] shrink-0" />
                <span>High-performance responsive design system</span>
              </div>
            </div>
          </div>
        </div>

        {/* Client Testimonial if available */}
        {testimonial && (
          <div className="rounded-3xl bg-[#0B0813]/60 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 p-8 sm:p-10 mb-14 shadow-2xl shadow-black/50 transition-all">
            <div className="flex items-center gap-1.5 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <blockquote className="text-base font-medium text-zinc-200 italic mb-6 leading-relaxed">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <div className="font-mono text-xs text-[#B896FF] font-medium uppercase tracking-wider">
              {testimonial.authorName} — {testimonial.role}, {testimonial.company}
            </div>
          </div>
        )}

        {/* Project CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-10 rounded-3xl bg-[#0B0813]/60 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 shadow-2xl shadow-black/50 transition-all">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.01em] [word-spacing:0.1em] text-white mb-2 leading-snug">
              Have a similar challenge in mind?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-normal">
              Let&apos;s evaluate your goals and map an AI-accelerated delivery plan.
            </p>
          </div>
          <Link
            href="/start-a-project"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#7042FF] to-[#4318D1] hover:brightness-110 shadow-lg shadow-[#7042FF]/30 border border-[#B896FF]/30 transition-all shrink-0"
          >
            <span>Start a Project Brief</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Pre-footer Anchor Marquee & Closing CTA */}
      <ClosingCTA />

      <Footer />
    </main>
  );
}
