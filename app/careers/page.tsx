import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { CareerRoleCard, CareerRole } from "./CareerRoleCard";
import { Sparkles, Users, Zap, Shield } from "lucide-react";

export const metadata = {
  title: "Careers & Open Positions | RYZE WORKS",
  description: "Join the cross-functional studio shaping what's next. Explore open roles across Design, Engineering, Strategy, and Operations."
};

const FALLBACK_ROLES: CareerRole[] = [
  {
    id: "fd5ea147-56f5-45bc-b755-515b05576a53",
    slug: "senior-brand-designer",
    title: "Senior Brand Designer",
    department: "Design",
    employment_type: "Full-time",
    location: "Remote",
    badge: "hot",
    status: "published"
  },
  {
    id: "50d78440-4b46-445c-aee2-01685a443874",
    slug: "motion-designer",
    title: "Motion Designer",
    department: "Design",
    employment_type: "Full-time",
    location: "Hybrid · Chennai",
    badge: "new",
    status: "published"
  },
  {
    id: "628a9178-14a2-4bd9-81a8-a267f8b062d2",
    slug: "frontend-engineer",
    title: "Frontend Engineer",
    department: "Engineering",
    employment_type: "Full-time",
    location: "Remote",
    badge: "hot",
    status: "published"
  },
  {
    id: "e5876773-8de3-4917-a37f-ee7426fde40e",
    slug: "copywriter-strategist",
    title: "Copywriter & Strategist",
    department: "Strategy",
    employment_type: "Full-time",
    location: "Remote",
    badge: null,
    status: "published"
  },
  {
    id: "7765a0fe-d0bd-464a-9241-62ca8642203a",
    slug: "project-manager",
    title: "Project Manager",
    department: "Operations",
    employment_type: "Full-time",
    location: "Hybrid · Chennai",
    badge: null,
    status: "published"
  },
  {
    id: "bfb8a3ae-2256-4ef1-b159-374692426501",
    slug: "creative-intern",
    title: "Creative Intern",
    department: "Design",
    employment_type: "Internship",
    location: "Chennai",
    badge: "new",
    status: "published"
  }
];

export default async function CareersPage() {
  let roles: CareerRole[] = FALLBACK_ROLES;

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabaseAdmin
        .from("career_roles")
        .select("id, slug, title, department, employment_type, location, badge, status, created_at, updated_at")
        .eq("status", "published")
        .order("created_at", { ascending: true });

      if (!error && data && data.length > 0) {
        roles = data as CareerRole[];
      }
    } catch (err) {
      console.error("Error fetching career roles:", err);
    }
  }

  return (
    <main className="min-h-screen bg-[#07070b] text-white">
      <Navbar />

      <section className="pt-36 pb-20 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-800/40 text-purple-300 text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            OPEN POSITIONS
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Build the future of AI-driven creative engineering.
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed">
            We are looking for exceptional thinkers, builders, and designers to help shape category-defining brands and intelligence systems.
          </p>
        </div>

        {/* Roles List */}
        <div className="space-y-4 mb-24">
          {roles.map((role) => (
            <CareerRoleCard key={role.id} role={role} />
          ))}
        </div>

        {/* Culture & Perks Grid */}
        <div className="pt-16 border-t border-white/[0.08]">
          <div className="mb-10">
            <span className="text-xs font-bold tracking-[0.2em] text-purple-400 uppercase">STUDIO CULTURE</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">Why build with Ryze Works?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-800/40 flex items-center justify-center text-purple-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">AI-Native Workflow</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Work with bleeding-edge AI models, vector reasoning, and accelerated generative pipelines.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-950/40 border border-pink-800/40 flex items-center justify-center text-pink-400">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">High Autonomy</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Flat hierarchy with direct ownership from inception to release with senior leadership.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Competitive Equity</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Comprehensive health insurance, flexible remote/hybrid setups, and performance bonuses.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-950/40 border border-amber-800/40 flex items-center justify-center text-amber-400">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Craft Over Compromise</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Obsessive attention to craft, typography, performance budgets, and pixel precision.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
