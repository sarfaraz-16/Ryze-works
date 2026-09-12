"use server";

import { revalidatePath } from "next/cache";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export interface ArticleInput {
  id?: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  cover_image: string;
  summary: string;
  content: string;
  read_time?: string;
  seo_title?: string;
  seo_description?: string;
}

import { calculateReadingTime, slugify } from "@/lib/utils/readingTime";

export type ArticleActionResponse = {
  success: boolean;
  error?: string;
  article?: any;
};

/**
 * Save Article as Draft
 * Permitted even if SEO title or description are incomplete.
 */
export async function saveArticleDraft(
  input: ArticleInput
): Promise<ArticleActionResponse> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return { success: false, error: "Server authentication unavailable." };
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Unauthorized: Active staff session required." };
    }

    const adminSupabase = createAdminClient();
    if (!adminSupabase) {
      return { success: false, error: "Database admin client unavailable." };
    }

    const { data: profile } = await adminSupabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || !["editor", "admin"].includes(profile.role)) {
      return { success: false, error: "Forbidden: Staff credentials required." };
    }

    if (!input.title || input.title.trim().length === 0) {
      return { success: false, error: "Article title is required." };
    }

    const slug = input.slug?.trim() || slugify(input.title);
    const readTime = input.read_time || calculateReadingTime(input.content || input.summary || "");

    const payload: Record<string, any> = {
      title: input.title.trim(),
      slug,
      category: input.category || "TECHNOLOGY",
      tags: Array.isArray(input.tags) ? input.tags : [],
      cover_image: input.cover_image?.trim() || "/images/insights/branding.jpg",
      summary: input.summary?.trim() || "",
      content: input.content || "",
      read_time: readTime,
      seo_title: input.seo_title?.trim() || null,
      seo_description: input.seo_description?.trim() || null,
      status: "draft",
      updated_at: new Date().toISOString(),
    };

    let result;
    if (input.id) {
      result = await adminSupabase
        .from("articles")
        .update(payload)
        .eq("id", input.id)
        .select()
        .single();
    } else {
      result = await adminSupabase
        .from("articles")
        .upsert(payload, { onConflict: "slug" })
        .select()
        .single();
    }

    if (result.error) {
      return { success: false, error: result.error.message };
    }

    revalidatePath("/admin/articles");
    revalidatePath("/admin");

    return { success: true, article: result.data };
  } catch (err: any) {
    console.error("saveArticleDraft exception:", err);
    return { success: false, error: err.message || "Failed to save draft." };
  }
}

/**
 * Publish Article with Acceptance Test E SEO Validation Gate
 * Rejects publication if:
 * 1. seo_title is missing/empty (< 5 chars)
 * 2. seo_description is under 50 characters
 */
export async function publishArticle(
  input: ArticleInput
): Promise<ArticleActionResponse> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return { success: false, error: "Server authentication unavailable." };
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Unauthorized: Active staff session required." };
    }

    const adminSupabase = createAdminClient();
    if (!adminSupabase) {
      return { success: false, error: "Database admin client unavailable." };
    }

    const { data: profile } = await adminSupabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || !["editor", "admin"].includes(profile.role)) {
      return { success: false, error: "Forbidden: Staff credentials required." };
    }

    // Basic Content Validation
    if (!input.title || input.title.trim().length === 0) {
      return { success: false, error: "Article title is required before publishing." };
    }

    // ========================================================
    // ACCEPTANCE TEST E: PRE-PUBLISH SEO VALIDATION GATE
    // ========================================================
    const seoTitle = input.seo_title?.trim() || "";
    const seoDescription = input.seo_description?.trim() || "";

    if (!seoTitle || seoTitle.length < 5) {
      return {
        success: false,
        error:
          "Pre-Publish SEO Gate Rejected: Missing SEO Title. A dedicated SEO title (minimum 5 characters) is required for search engine discoverability.",
      };
    }

    if (!seoDescription || seoDescription.length < 50) {
      return {
        success: false,
        error: `Pre-Publish SEO Gate Rejected: SEO Description too short (${seoDescription.length}/50 chars minimum). Provide at least 50 characters for indexation.`,
      };
    }

    const slug = input.slug?.trim() || slugify(input.title);
    const readTime = input.read_time || calculateReadingTime(input.content || input.summary || "");

    const payload: Record<string, any> = {
      title: input.title.trim(),
      slug,
      category: input.category || "TECHNOLOGY",
      tags: Array.isArray(input.tags) ? input.tags : [],
      cover_image: input.cover_image?.trim() || "/images/insights/branding.jpg",
      summary: input.summary?.trim() || "",
      content: input.content || "",
      read_time: readTime,
      seo_title: seoTitle,
      seo_description: seoDescription,
      status: "published",
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    let result;
    if (input.id) {
      result = await adminSupabase
        .from("articles")
        .update(payload)
        .eq("id", input.id)
        .select()
        .single();
    } else {
      result = await adminSupabase
        .from("articles")
        .upsert(payload, { onConflict: "slug" })
        .select()
        .single();
    }

    if (result.error) {
      return { success: false, error: result.error.message };
    }

    // On-demand cache invalidation
    revalidatePath("/insights");
    revalidatePath(`/insights/${slug}`);
    revalidatePath("/admin/articles");
    revalidatePath("/admin");
    revalidatePath("/");

    return { success: true, article: result.data };
  } catch (err: any) {
    console.error("publishArticle exception:", err);
    return { success: false, error: err.message || "Failed to publish article." };
  }
}

/**
 * Delete Article
 */
export async function deleteArticle(id: string): Promise<ArticleActionResponse> {
  try {
    const adminSupabase = createAdminClient();
    if (!adminSupabase) {
      return { success: false, error: "Database admin client unavailable." };
    }

    const { error } = await adminSupabase.from("articles").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/insights");
    revalidatePath("/admin/articles");
    revalidatePath("/admin");

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete article." };
  }
}
