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
    <main className="min-h-[calc(100vh-80px)] bg-transparent text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-6xl mx-auto px-6 relative z-10">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono text-zinc-400 hover:text-white bg-white/[0.04] border border-white/10 hover:border-violet-500/40 transition-all mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO ALL WORK</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="font-mono text-xs uppercase tracking-wider text-violet-300 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-md inline-flex items-center gap-2 mb-4">
            <span>{project.industry}</span>
            <span className="opacity-50">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Consent
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-zinc-300 max-w-3xl leading-relaxed font-sans mb-10">
            {project.description}
          </p>

          <div className="bg-[#0B0813]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-12 flex flex-wrap items-center gap-6 text-left">
            <div>
              <div className="text-[11px] font-mono uppercase text-zinc-500 mb-1.5">Core Stack</div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono bg-white/[0.05] border border-white/10 text-cyan-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Media Hero Showcase Theater */}
        <div className="w-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.7)] bg-[#0B0813]/80 mb-16 relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/[0.05] via-transparent to-cyan-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <ProjectDetailHero
            slug={project.slug}
            client={project.client}
            title={project.title}
            category={project.category}
            industry={project.industry}
          />
        </div>

        {/* Project Scope Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-[#0B0813]/75 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 rounded-2xl p-5 transition-all shadow-xl">
            <span className="text-3xl font-extrabold text-white tracking-tight block mb-1">
              {project.client}
            </span>
            <span className="text-[11px] font-mono uppercase text-zinc-400 mt-1 block">Client Partner</span>
          </div>
          <div className="bg-[#0B0813]/75 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 rounded-2xl p-5 transition-all shadow-xl">
            <span className="text-3xl font-extrabold text-white tracking-tight block mb-1">
              {project.category}
            </span>
            <span className="text-[11px] font-mono uppercase text-zinc-400 mt-1 block">Primary Discipline</span>
          </div>
          <div className="bg-[#0B0813]/75 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 rounded-2xl p-5 transition-all shadow-xl">
            <span className="text-3xl font-extrabold text-emerald-400 tracking-tight flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
              Live
            </span>
            <span className="text-[11px] font-mono uppercase text-zinc-400 mt-1 block">Status &amp; Verification</span>
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
        <div className="max-w-4xl mx-auto space-y-12 my-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4 flex items-center gap-3">The Problem</h2>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
              Scaling a category-defining experience in {project.industry} required a brand architecture and digital product stack that balances radical visual distinctiveness with ultra-low latency and intuitive clarity.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4 flex items-center gap-3">The Architectural Solution</h2>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-sans mb-6">
              We mobilized a dedicated cross-functional pod across strategy, procedural design, and modern fullstack engineering (Next.js, Supabase, and real-time systems) to execute sprint-by-sprint deliverables.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                <span className="text-zinc-200">Zero-placeholder verified architecture</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                <span className="text-zinc-200">High-performance responsive design system</span>
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

        {/* Next Project Navigator */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-12 border-t border-white/10 my-16">
          <Link
            href="/projects"
            className="w-full sm:w-1/2 p-6 rounded-2xl bg-[#0B0813]/60 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 transition-all flex flex-col text-left group"
          >
            <span className="text-[10px] font-mono uppercase text-zinc-500 mb-2">Previous Work</span>
            <span className="text-sm font-semibold text-white group-hover:text-violet-200 transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Return to Archive
            </span>
          </Link>
          <Link
            href="/projects"
            className="w-full sm:w-1/2 p-6 rounded-2xl bg-[#0B0813]/60 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 transition-all flex flex-col text-right group"
          >
            <span className="text-[10px] font-mono uppercase text-zinc-500 mb-2">Explore More</span>
            <span className="text-sm font-semibold text-white group-hover:text-violet-200 transition-colors flex items-center justify-end gap-2">
              View All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Project CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-10 rounded-3xl bg-[#0B0813]/80 backdrop-blur-2xl border border-white/10 hover:border-violet-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.7)] transition-all relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet-600/15 blur-[100px] rounded-full -z-10 pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-2">
              Have a similar challenge in mind?
            </h3>
            <p className="text-sm text-zinc-300">
              Let&apos;s evaluate your goals and map an AI-accelerated delivery plan.
            </p>
          </div>
          <Link
            href="/start-a-project"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all group cursor-pointer relative z-10 shrink-0"
          >
            <span>Start a Project Brief</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Pre-footer Anchor Marquee & Closing CTA */}
      <ClosingCTA />

      <Footer />
    </main>
  );
}
