"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  saveArticleDraft,
  publishArticle,
  ArticleInput,
} from "./actions";
import { calculateReadingTime, slugify } from "@/lib/utils/readingTime";
import { ArrowLeft, Save, Send, AlertCircle, CheckCircle2, Loader2, Lock, Unlock, Clock, FileText, Search, ExternalLink } from "lucide-react";

interface Props {
  initialArticle?: ArticleInput & { id?: string; status?: string };
}

const CATEGORIES = [
  "TECHNOLOGY",
  "BRANDING",
  "MARKETING",
  "BUSINESS",
  "AI",
  "DESIGN",
  "STARTUPS",
  "GROWTH",
  "RESEARCH",
];

export function ArticleEditorForm({ initialArticle }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState(initialArticle?.title || "");
  const [slug, setSlug] = useState(initialArticle?.slug || "");
  const [slugLocked, setSlugLocked] = useState(!initialArticle?.id);
  const [category, setCategory] = useState(initialArticle?.category || "TECHNOLOGY");
  const [tags, setTags] = useState<string[]>(initialArticle?.tags || ["AI", "Engineering"]);
  const [tagInput, setTagInput] = useState("");
  const [coverImage, setCoverImage] = useState(
    initialArticle?.cover_image || "/images/insights/branding.jpg"
  );
  const [summary, setSummary] = useState(initialArticle?.summary || "");
  const [content, setContent] = useState(initialArticle?.content || "");

  // SEO Fields
  const [seoTitle, setSeoTitle] = useState(initialArticle?.seo_title || "");
  const [seoDescription, setSeoDescription] = useState(
    initialArticle?.seo_description || ""
  );

  // Status & Notification
  const [status, setStatus] = useState<string>(initialArticle?.status || "draft");
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Dynamic calculations
  const readingTime = calculateReadingTime(content || summary);
  const wordCount = content ? content.trim().split(/\s+/).filter(Boolean as any).length : 0;
  const seoDescLength = seoDescription.trim().length;
  const isSeoDescValid = seoDescLength >= 50;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (slugLocked) {
      setSlug(slugify(val));
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const cleaned = tagInput.trim().replace(/^,+|,+$/g, "");
      if (cleaned && !tags.includes(cleaned)) {
        setTags([...tags, cleaned]);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const getFormData = (): ArticleInput => ({
    id: initialArticle?.id,
    title,
    slug: slug.trim() || slugify(title),
    category,
    tags,
    cover_image: coverImage,
    summary,
    content,
    read_time: readingTime,
    seo_title: seoTitle,
    seo_description: seoDescription,
  });

  const handleSaveDraft = async () => {
    setNotification(null);
    startTransition(async () => {
      const res = await saveArticleDraft(getFormData());
      if (!res.success) {
        setNotification({
          type: "error",
          message: res.error || "Failed to save draft.",
        });
      } else {
        setStatus("draft");
        setNotification({
          type: "success",
          message: "Article draft saved securely. Quarantined from public visitors.",
        });
        if (!initialArticle?.id && res.article?.id) {
          router.replace(`/admin/articles/${res.article.id}`);
        }
      }
    });
  };

  const handlePublish = async () => {
    setNotification(null);
    startTransition(async () => {
      const res = await publishArticle(getFormData());
      if (!res.success) {
        setNotification({
          type: "error",
          message: res.error || "Publication rejected.",
        });
      } else {
        setStatus("published");
        setNotification({
          type: "success",
          message: `Article published successfully! Cache invalidated across /insights and /insights/${res.article?.slug}.`,
        });
        if (!initialArticle?.id && res.article?.id) {
          router.replace(`/admin/articles/${res.article.id}`);
        }
      }
    });
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <Link
            href="/admin/articles"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Articles CMS
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {initialArticle?.id ? "Edit Article" : "Author New Article"}
            </h1>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                status === "published"
                  ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                  : "bg-amber-500/15 border border-amber-500/30 text-amber-300"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={isPending}
            className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-zinc-200 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={handlePublish}
            disabled={isPending}
            className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(124,58,237,0.35)] transition-all cursor-pointer disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>Publish Article</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-xs flex items-start gap-3 transition-all ${
            notification.type === "success"
              ? "bg-emerald-950/40 border border-emerald-500/30 text-emerald-200"
              : "bg-red-950/40 border border-red-500/30 text-red-200"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          )}
          <div className="leading-relaxed font-medium">{notification.message}</div>
        </div>
      )}

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Core Content (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Slug */}
          <div className="rounded-3xl bg-[#0E0A24]/60 backdrop-blur-md border border-white/10 p-6 sm:p-7 space-y-5 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                Article Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. Architecting Scalable AI Workflows for Modern Brands"
                className="w-full px-4 py-3 bg-[#080417] border border-white/[0.1] rounded-xl text-base font-semibold text-white placeholder-zinc-500 focus:outline-none focus:border-[#7042FF] focus:ring-1 focus:ring-[#7042FF] transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  URL Slug
                </label>
                <button
                  type="button"
                  onClick={() => setSlugLocked(!slugLocked)}
                  className="text-[11px] font-mono text-zinc-500 hover:text-[#B896FF] flex items-center gap-1 cursor-pointer"
                >
                  {slugLocked ? (
                    <>
                      <Lock className="w-3 h-3" /> Auto-syncing with Title
                    </>
                  ) : (
                    <>
                      <Unlock className="w-3 h-3" /> Custom Slug Unlocked
                    </>
                  )}
                </button>
              </div>
              <div className="flex items-center">
                <span className="px-3.5 py-2.5 bg-white/[0.03] border border-r-0 border-white/[0.1] rounded-l-xl text-xs font-mono text-zinc-500">
                  /insights/
                </span>
                <input
                  type="text"
                  value={slug}
                  disabled={slugLocked}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  placeholder="architecting-scalable-ai-workflows"
                  className="flex-1 px-4 py-2.5 bg-[#080417] border border-white/[0.1] rounded-r-xl text-xs font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#7042FF] disabled:opacity-75 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Excerpt / Summary */}
          <div className="rounded-3xl bg-[#0E0A24]/60 backdrop-blur-md border border-white/10 p-6 sm:p-7 space-y-2 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                Executive Summary / Excerpt *
              </label>
              <span className="text-[11px] font-mono text-zinc-500">
                {summary.length} characters
              </span>
            </div>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="A concise 2-3 sentence overview rendered in card previews and RSS feeds..."
              className="w-full px-4 py-3 bg-[#080417] border border-white/[0.1] rounded-xl text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#7042FF] focus:ring-1 focus:ring-[#7042FF] leading-relaxed transition-colors"
            />
          </div>

          {/* Markdown Content Area with Word Count & Live Reading Time */}
          <div className="rounded-3xl bg-[#0E0A24]/60 backdrop-blur-md border border-white/10 p-6 sm:p-7 space-y-3 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#B896FF]" />
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                  Article Body (Markdown)
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                <span>{wordCount} words</span>
                <span className="flex items-center gap-1 text-[#B896FF]">
                  <Clock className="w-3.5 h-3.5" />
                  {readingTime}
                </span>
              </div>
            </div>

            <textarea
              rows={16}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="# Introduction&#10;&#10;Write the full article content in Markdown format...&#10;&#10;## Key Architecture Concepts&#10;- Strategy point 1&#10;- Technology point 2"
              className="w-full px-4 py-3 bg-[#080417] border border-white/[0.1] rounded-xl font-mono text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#7042FF] focus:ring-1 focus:ring-[#7042FF] leading-relaxed transition-colors"
            />
          </div>

          {/* PRE-PUBLISH SEO VALIDATION GATE SECTION */}
          <div className="rounded-3xl bg-[#0E0A24]/60 backdrop-blur-md border border-violet-500/30 p-6 sm:p-7 space-y-5 shadow-[0_4px_24px_rgba(124,58,237,0.12)]">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#B896FF]" />
                <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                  Pre-Publish SEO Validation Gate (§Acceptance Test E)
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#7042FF]/20 text-[#B896FF] border border-[#7042FF]/30">
                REQUIRED FOR PUBLISH
              </span>
            </div>

            {/* SEO Title Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                  SEO Meta Title *
                </label>
                <span className="text-[11px] font-mono text-zinc-500">
                  {seoTitle.length}/60 recommended
                </span>
              </div>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="e.g. AI-Native Brand Velocity & Architecture | Ryze Works"
                className="w-full px-4 py-2.5 bg-[#080417] border border-white/[0.1] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#7042FF] transition-colors"
              />
              <p className="text-[11px] text-zinc-500 mt-1">
                Must be non-empty (minimum 5 characters).
              </p>
            </div>

            {/* SEO Description Input with Live Validation Gate */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                  SEO Meta Description *
                </label>
                <span
                  className={`text-[11px] font-mono font-bold ${
                    isSeoDescValid ? "text-emerald-400" : "text-amber-400"
                  }`}
                >
                  {seoDescLength}/50 chars min ({isSeoDescValid ? "VALID" : "TOO SHORT"})
                </span>
              </div>
              <textarea
                rows={3}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="A compelling meta description between 50 and 160 characters summarizing the article for Google search snippets..."
                className={`w-full px-4 py-2.5 bg-[#080417] border rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                  isSeoDescValid
                    ? "border-emerald-500/40 focus:border-emerald-400"
                    : "border-amber-500/40 focus:border-amber-400"
                }`}
              />
              <div className="flex items-center justify-between mt-1 text-[11px]">
                <span
                  className={isSeoDescValid ? "text-emerald-400" : "text-amber-400"}
                >
                  {isSeoDescValid
                    ? "✓ Satisfies Acceptance Test E gate requirement (>= 50 chars)."
                    : `⚠️ Rejects publish if under 50 characters (${50 - seoDescLength} more needed).`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Metadata & Settings (1/3) */}
        <div className="space-y-6">
          {/* Category & Tags */}
          <div className="rounded-3xl bg-[#0E0A24]/60 backdrop-blur-md border border-white/10 p-6 space-y-5 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 pb-2 border-b border-white/[0.06]">
              Classification
            </h3>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#080417] border border-white/[0.1] rounded-xl text-xs text-white focus:outline-none focus:border-[#7042FF] transition-colors"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-[#080417]">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#7042FF]/15 border border-[#7042FF]/30 text-[#B896FF] text-[11px] font-mono"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-white ml-0.5 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Add tag and press Enter..."
                className="w-full px-3.5 py-2 bg-[#080417] border border-white/[0.1] rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#7042FF] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                Cover Image URL
              </label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="/images/insights/branding.jpg"
                className="w-full px-3.5 py-2 bg-[#080417] border border-white/[0.1] rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#7042FF] transition-colors mb-2"
              />
              <div className="rounded-xl overflow-hidden border border-white/[0.08] aspect-[16/9] bg-black/40 flex items-center justify-center text-xs text-zinc-500">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Publishing Checklist Card */}
          <div className="rounded-3xl bg-[#0E0A24]/60 backdrop-blur-md border border-white/10 p-6 space-y-4 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 pb-2 border-b border-white/[0.06]">
              Release Checklist
            </h3>

            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                {title.trim().length > 0 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-zinc-500 shrink-0" />
                )}
                <span className={title.trim().length > 0 ? "text-white" : "text-zinc-500"}>
                  Headline provided
                </span>
              </li>

              <li className="flex items-center gap-2">
                {content.trim().length > 50 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-zinc-500 shrink-0" />
                )}
                <span className={content.trim().length > 50 ? "text-white" : "text-zinc-500"}>
                  Content body written
                </span>
              </li>

              <li className="flex items-center gap-2">
                {seoTitle.trim().length >= 5 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className={seoTitle.trim().length >= 5 ? "text-white" : "text-amber-400"}>
                  SEO Title (&gt;= 5 chars)
                </span>
              </li>

              <li className="flex items-center gap-2">
                {isSeoDescValid ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className={isSeoDescValid ? "text-white" : "text-amber-400"}>
                  SEO Description (&gt;= 50 chars)
                </span>
              </li>
            </ul>

            {status === "published" && slug && (
              <div className="pt-3 border-t border-white/[0.06]">
                <Link
                  href={`/insights/${slug}`}
                  target="_blank"
                  className="text-xs text-[#B896FF] hover:underline flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Live Article Page</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
