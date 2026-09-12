import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { FEATURED_PROJECTS, TESTIMONIALS_DATA } from "@/data/siteData";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Star } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return FEATURED_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = FEATURED_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Find matching testimonial if any
  const testimonial = TESTIMONIALS_DATA.find((t) =>
    t.company.toLowerCase().includes(project.slug.toLowerCase()) ||
    t.company.toLowerCase().includes(project.title.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#07070b] text-white">
      <Navbar />

      <section className="pt-36 pb-24 max-w-5xl mx-auto px-6">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO PROJECTS</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-purple-400 mb-3">
            <span>{project.industry}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Consent Record
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs text-white/80 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Project Scope Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-[#0d0e1a] border border-white/[0.08]">
            <span className="text-[11px] font-bold text-white/40 uppercase block mb-1">
              Client
            </span>
            <span className="text-base font-bold text-white">{project.client}</span>
          </div>
          <div className="p-6 rounded-xl bg-[#0d0e1a] border border-white/[0.08]">
            <span className="text-[11px] font-bold text-white/40 uppercase block mb-1">
              Discipline
            </span>
            <span className="text-base font-bold text-white">{project.category}</span>
          </div>
          <div className="p-6 rounded-xl bg-[#0d0e1a] border border-white/[0.08]">
            <span className="text-[11px] font-bold text-white/40 uppercase block mb-1">
              Status
            </span>
            <span className="text-base font-bold text-emerald-400">Production Live</span>
          </div>
        </div>

        {/* Narrative: Challenge & Solution */}
        <div className="space-y-8 rounded-2xl bg-[#0c0d16]/80 border border-white/[0.08] p-8 sm:p-10 mb-12">
          <div>
            <h2 className="text-xl font-bold text-white mb-3">The Challenge</h2>
            <p className="text-sm text-white/60 leading-relaxed">
              Scaling a category-defining experience in {project.industry} required a brand architecture and digital product stack that balances radical visual distinctiveness with ultra-low latency and intuitive clarity.
            </p>
          </div>

          <div className="pt-6 border-t border-white/[0.06]">
            <h2 className="text-xl font-bold text-white mb-3">The Ryze Works Approach</h2>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              We mobilized a dedicated cross-functional pod across strategy, procedural design, and modern fullstack engineering (Next.js, Supabase, and real-time systems) to execute sprint-by-sprint deliverables.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-xs text-white/80">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Zero-placeholder verified architecture</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/80">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>High-performance responsive design system</span>
              </div>
            </div>
          </div>
        </div>

        {/* Client Testimonial if available */}
        {testimonial && (
          <div className="rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#101222] to-slate-900/60 border border-purple-800/30 p-8 mb-12">
            <div className="flex items-center gap-1 mb-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <blockquote className="text-base sm:text-lg font-medium text-white/90 italic mb-4">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <div className="text-xs text-purple-300 font-bold">
              {testimonial.authorName} — {testimonial.role}, {testimonial.company}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-[#0d0e1a] border border-white/10">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              Have a similar project in mind?
            </h3>
            <p className="text-xs text-white/50">
              Let&apos;s evaluate your goals and map an AI-accelerated delivery plan.
            </p>
          </div>
          <Link href="/start-a-project">
            <Button variant="primary" size="md">
              Start a Project →
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
