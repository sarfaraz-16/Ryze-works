"use server";

import { revalidatePath } from "next/cache";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export type TestimonialActionResponse = {
  success: boolean;
  error?: string;
  data?: any;
};

export async function updateTestimonialStatus(
  id: string,
  status: "approved" | "rejected" | "pending",
  isFeatured?: boolean
): Promise<TestimonialActionResponse> {
  try {
    // 1. Authenticate user session
    const supabase = await createClient();
    if (!supabase) {
      return { success: false, error: "Server authentication client unavailable." };
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Unauthorized: Active staff session required." };
    }

    // 2. Verify staff role via admin client
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
      return { success: false, error: "Forbidden: Administrative role required." };
    }

    // 3. Perform mutation
    const updatePayload: Record<string, unknown> = {
      status,
      reviewed_at: new Date().toISOString(),
    };

    if (typeof isFeatured === "boolean") {
      updatePayload.is_featured = isFeatured;
    }

    if (status === "approved") {
      updatePayload.is_verified = true;
    }

    const { data, error } = await adminSupabase
      .from("testimonials")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Testimonial status update error:", error);
      return { success: false, error: error.message };
    }

    // 4. Enforce on-demand cache revalidation
    revalidatePath("/");
    revalidatePath("/testimonials");
    revalidatePath("/admin");
    revalidatePath("/admin/testimonials");

    return { success: true, data };
  } catch (err: any) {
    console.error("updateTestimonialStatus exception:", err);
    return {
      success: false,
      error: err.message || "Failed to update testimonial status.",
    };
  }
}

export async function toggleFeaturedTestimonial(
  id: string,
  isFeatured: boolean
): Promise<TestimonialActionResponse> {
  try {
    const adminSupabase = createAdminClient();
    if (!adminSupabase) {
      return { success: false, error: "Database admin client unavailable." };
    }

    const { data, error } = await adminSupabase
      .from("testimonials")
      .update({ is_featured: isFeatured })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/testimonials");
    revalidatePath("/admin/testimonials");

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to toggle featured status." };
  }
}
