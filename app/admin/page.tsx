import React from "react";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/server";
import {
  Inbox,
  MessageSquareQuote,
  Briefcase,
  BookOpen,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  PlusCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const supabase = createAdminClient();

  let totalLeads = 0;
  let pendingTestimonials = 0;
  let publishedProjects = 0;
  let publishedArticles = 0;
  let pendingList: Array<{
    id: string;
    author_name: string;
    company: string;
    role: string;
    rating: number;
    quote: string;
    submitted_at: string;
  }> = [];

  if (supabase) {
    try {
      const [leadsRes, testRes, projRes, artRes, pendingRes] = await Promise.all([
        supabase.from("leads").select("*", { count: "exact", head: true }),
        supabase.from("testimonials").select("*", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("projects").select("*", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("articles").select("*", { count: "exact", head: true }).eq("status", "published"),
        supabase
          .from("testimonials")
          .select("id, author_name, company, role, rating, quote, submitted_at")
          .eq("status", "pending")
          .order("submitted_at", { ascending: false })
          .limit(3),
      ]);

      totalLeads = leadsRes.count || 0;
      pendingTestimonials = testRes.count || 0;
      publishedProjects = projRes.count || 0;
      publishedArticles = artRes.count || 0;
      pendingList = pendingRes.data || [];
    } catch (err) {
      console.error("Error loading admin overview metrics:", err);
    }
  }

  const kpis = [
    {
      title: "Inbound Leads",
      value: totalLeads,
      description: "Client briefs & project inquiries",
      href: "/admin/leads",
      icon: Inbox,
      iconColor: "text-cyan-400",
      iconBg: "bg-cyan-500/10 border-cyan-500/25 shadow-[0_0_14px_rgba(34,211,238,0.2)]",
    },
    {
      title: "Pending Moderation",
      value: pendingTestimonials,
      description: "Awaiting editorial verification",
      href: "/admin/testimonials",
      icon: MessageSquareQuote,
      iconColor: "text-amber-400",
      iconBg: "bg-amber-500/10 border-amber-500/25 shadow-[0_0_14px_rgba(245,158,11,0.2)]",
      badge: pendingTestimonials > 0 ? "ACTION REQUIRED" : "CLEARED",
      badgeStyle:
        pendingTestimonials > 0
          ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
          : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
    },
    {
      title: "Published Projects",
      value: publishedProjects,
      description: "Active work showcase entries",
      href: "/projects",
      icon: Briefcase,
      iconColor: "text-[#B896FF]",
      iconBg: "bg-violet-500/10 border-violet-500/25 shadow-[0_0_14px_rgba(124,58,237,0.25)]",
    },
    {
      title: "Published Articles",
      value: publishedArticles,
      description: "Live insights & thought leadership",
      href: "/admin/articles",
      icon: BookOpen,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/10 border-emerald-500/25 shadow-[0_0_14px_rgba(52,211,153,0.2)]",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#B896FF] tracking-widest uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
            RYZE CONTROL // EDITORIAL DASHBOARD
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
            Command Center Overview
          </h1>
        </div>

        {/* Quick Triage Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/testimonials"
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.35)] transition-all cursor-pointer"
          >
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Moderate Testimonials</span>
            {pendingTestimonials > 0 && (
              <span className="w-5 h-5 rounded-full bg-white text-violet-700 text-[10px] font-bold flex items-center justify-center">
                {pendingTestimonials}
              </span>
            )}
          </Link>
          <Link
            href="/admin/articles"
            className="px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-violet-500/30 text-zinc-300 hover:text-white text-xs font-medium flex items-center gap-2 transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#B896FF]" />
            <span>Articles Desk</span>
          </Link>
          <Link
            href="/admin/leads"
            className="px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-violet-500/30 text-zinc-300 hover:text-white text-xs font-medium flex items-center gap-2 transition-all"
          >
            <Inbox className="w-3.5 h-3.5 text-cyan-400" />
            <span>Leads CRM</span>
          </Link>
        </div>
      </div>

      {/* Action Alert Banner if Testimonials Pending */}
      {pendingTestimonials > 0 && (
        <div className="rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-md shadow-lg shadow-amber-950/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-[0_0_16px_rgba(245,158,11,0.2)]">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-amber-200">
                {pendingTestimonials} Client Testimonial{pendingTestimonials > 1 ? "s" : ""} Pending Verification
              </div>
              <p className="text-xs text-amber-300/80 mt-1">
                New submissions are currently quarantined in the database with <code className="font-mono text-amber-200 bg-amber-500/10 px-1.5 py-0.5 rounded">status = &apos;pending&apos;</code> and hidden from public visitors.
              </p>
            </div>
          </div>
          <Link
            href="/admin/testimonials"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-black text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 shadow-md shadow-amber-500/20"
          >
            <span>Open Moderation Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* 4 Unified KPI Glass Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={kpi.title}
              href={kpi.href}
              className="rounded-2xl bg-[#0E0A24]/60 backdrop-blur-md border border-white/10 hover:border-violet-500/35 p-6 flex flex-col justify-between hover:translate-y-[-2px] transition-all duration-200 shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_30px_rgba(124,58,237,0.18)] group relative overflow-hidden"
            >
              {/* Subtle top edge shimmer */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] tracking-wider font-semibold uppercase text-violet-300/70 font-mono">
                    {kpi.title}
                  </span>
                  <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${kpi.iconBg}`}>
                    <Icon className={`w-4 h-4 ${kpi.iconColor}`} />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                  {kpi.value}
                </div>
                <div className="text-xs text-neutral-400 leading-relaxed">
                  {kpi.description}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
                {kpi.badge ? (
                  <span className={`px-2 py-0.5 rounded-full border font-mono text-[10px] font-bold ${kpi.badgeStyle}`}>
                    {kpi.badge}
                  </span>
                ) : (
                  <span className="text-neutral-500 font-mono text-[10px]">DATABASE RECORD</span>
                )}
                <span className="text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-all flex items-center gap-1 font-medium">
                  Review <ArrowRight className="w-3 h-3 text-[#B896FF]" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pending Submissions Preview Section */}
      <div className="rounded-3xl bg-[#0E0A24]/60 backdrop-blur-md border border-white/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-[#B896FF]">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-display">Pending Moderation Queue</h2>
              <p className="text-xs text-neutral-400">
                Latest client submissions requiring editorial sign-off.
              </p>
            </div>
          </div>
          <Link
            href="/admin/testimonials"
            className="text-xs font-semibold text-[#B896FF] hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>Full Verification Queue ({pendingTestimonials})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {pendingList.length === 0 ? (
          <div className="py-12 text-center text-neutral-500 text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-3 opacity-90 shadow-[0_0_12px_rgba(52,211,153,0.3)]" />
            <p className="text-neutral-200 font-medium">Verification queue is completely clear.</p>
            <p className="text-neutral-400 mt-1">All client testimonials have been editorialized.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pendingList.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-[#080417]/80 border border-white/[0.08] hover:border-violet-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono uppercase font-bold">
                      Pending Review
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      ★ {item.rating}/5
                    </span>
                  </div>
                  <blockquote className="text-xs text-neutral-300 italic mb-4 line-clamp-3 leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">{item.author_name}</div>
                    <div className="text-[10px] text-neutral-400">
                      {item.role}, {item.company}
                    </div>
                  </div>
                  <Link
                    href="/admin/testimonials"
                    className="text-[11px] font-mono text-[#B896FF] hover:underline"
                  >
                    Moderate →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
