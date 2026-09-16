import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { FEATURED_PROJECTS } from "@/data/siteData";
import { createClient } from "@/lib/supabase/server";
import { ProjectsClient } from "./ProjectsClient";
import { Sparkles } from "lucide-react";
import { Project } from "@/types";

export const revalidate = 3600;

export const metadata = {
  title: "Projects & Selected Work | RYZE WORKS",
  description: "Explore our verified client outcomes across hardware diagnostics, high-growth consumer e-commerce, urban EV fleets, and fintech platforms."
};

export default async function ProjectsPage() {
  let projects: Project[] = FEATURED_PROJECTS;

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
          tags,
          is_featured
        `)
        .eq("status", "published")
        .order("created_at", { ascending: true });

      if (!error && data && data.length > 0) {
        projects = data.map((p) => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          client: p.client,
          category: p.category,
          industry: p.industry,
          description: p.description,
          heroImage: p.hero_image,
          tags: p.tags || [],
          isFeatured: p.is_featured,
          linkText: `${p.industry} →`
        }));
      }
    }
  } catch (err) {
    console.warn("Supabase projects query fallback:", err);
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#030014]/40 text-zinc-100 overflow-x-hidden relative selection:bg-[#7042FF]/30 selection:text-[#B896FF]">
      <Navbar />

      {/* Hero Ambient Backlight */}
      <div className="absolute top-0 right-0 left-0 h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(112,66,255,0.28),rgba(8,4,23,0))] pointer-events-none" />

      <section className="pt-36 pb-24 max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-[11px] font-mono text-[#B896FF] uppercase tracking-widest mb-3 font-medium flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
            FEATURED WORK &amp; CASE ARCHIVE
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.01em] [word-spacing:0.1em] text-white mb-6">
            Selected projects that created real impact.
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-2xl">
            Explore our verified client outcomes across hardware diagnostics, high-growth consumer e-commerce, urban EV fleets, and fintech platforms.
          </p>
        </div>

        {/* Client Interactive Filter & Search Grid */}
        <ProjectsClient initialProjects={projects} />
      </section>

      {/* Pre-footer Anchor Marquee & Closing CTA */}
      <ClosingCTA />

      <Footer />
    </main>
  );
}
