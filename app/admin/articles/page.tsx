import React from "react";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/server";
import {
  FileText,
  PlusCircle,
  ExternalLink,
  Edit,
  Clock,
  Search,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  const supabase = createAdminClient();

  let articles: any[] = [];
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("id, slug, title, category, read_time, status, published_at, created_at, seo_title, seo_description")
        .order("created_at", { ascending: false });

      if (!error && data) {
        articles = data;
      }
    } catch (err) {
      console.error("Error loading admin articles:", err);
    }
  }

  const publishedCount = articles.filter((a) => a.status === "published").length;
  const draftCount = articles.filter((a) => a.status === "draft").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#B896FF] tracking-widest uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#B896FF]" />
            KNOWLEDGE PUBLISHING ENGINE // CMS
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <FileText className="w-7 h-7 text-[#B896FF]" />
            <span>Articles &amp; Editorial Desk</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Manage thought leadership, research perspectives, and SEO indexation. All published articles
            satisfy the Pre-Publish SEO Validation Gate (§Acceptance Test E).
          </p>
        </div>

        {/* Primary Action Button */}
        <Link
          href="/admin/articles/new"
          className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.35)] transition-all cursor-pointer self-start sm:self-center"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* Overview Stat Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#0E0A24]/60 backdrop-blur-md border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <div className="text-[10px] font-mono uppercase tracking-wider text-violet-300/70 mb-1 font-semibold">Total Entries</div>
          <div className="text-2xl font-bold text-white font-display">{articles.length}</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0E0A24]/60 backdrop-blur-md border border-emerald-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 mb-1 font-semibold">Published Live</div>
          <div className="text-2xl font-bold text-white font-display">{publishedCount}</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0E0A24]/60 backdrop-blur-md border border-amber-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 mb-1 font-semibold">Drafts (Quarantined)</div>
          <div className="text-2xl font-bold text-white font-display">{draftCount}</div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="rounded-3xl bg-[#0E0A24]/60 backdrop-blur-md border border-white/10 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white font-display">Editorial Manifest</h2>
            <p className="text-xs text-neutral-400">
              Live index of all published insights and working drafts.
            </p>
          </div>
          <span className="text-xs font-mono text-violet-300/60">
            {articles.length} RECORD{articles.length !== 1 ? "S" : ""}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.02] text-neutral-400 font-mono uppercase text-[10px] border-b border-white/[0.06]">
              <tr>
                <th className="py-3.5 px-6">Article / Headline</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Reading Time</th>
                <th className="py-3.5 px-6">SEO Gate Status</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    No articles found. Click &quot;Write New Article&quot; to begin authoring.
                  </td>
                </tr>
              ) : (
                articles.map((item) => {
                  const isPublished = item.status === "published";
                  const hasSeoTitle = Boolean(item.seo_title && item.seo_title.length >= 5);
                  const hasSeoDesc = Boolean(item.seo_description && item.seo_description.length >= 50);
                  const satisfiesSeoGate = hasSeoTitle && hasSeoDesc;

                  return (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-white text-sm hover:text-[#B896FF] transition-colors">
                          <Link href={`/admin/articles/${item.id}`}>
                            {item.title}
                          </Link>
                        </div>
                        <div className="text-[11px] font-mono text-zinc-500 mt-0.5">
                          /insights/{item.slug}
                        </div>
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] text-[10px] font-mono text-zinc-300">
                          {item.category}
                        </span>
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap font-mono text-zinc-400">
                        {item.read_time || "5 min read"}
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap">
                        {satisfiesSeoGate ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                            <CheckCircle2 className="w-3 h-3" /> Gate Passed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400">
                            <AlertTriangle className="w-3 h-3" /> Incomplete
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap">
                        {isPublished ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold uppercase">
                            Published
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-bold uppercase">
                            Draft (Quarantined)
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right whitespace-nowrap space-x-3">
                        <Link
                          href={`/admin/articles/${item.id}`}
                          className="inline-flex items-center gap-1 text-xs text-[#B896FF] hover:text-white transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </Link>

                        {isPublished && (
                          <Link
                            href={`/insights/${item.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live</span>
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
