"use server";

import { revalidatePath } from "next/cache";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export type ApplicationLifecycleStatus =
  | "submitted"
  | "reviewing"
  | "rejected"
  | "hired";

export type ApplicationActionResponse = {
  success: boolean;
  error?: string;
  data?: any;
  signedUrl?: string;
};

/**
 * Generate a secure, time-limited signed URL for private resumes
 * Expires after 300 seconds (5 minutes)
 */
export async function getSignedResumeUrl(
  resumePath: string
): Promise<ApplicationActionResponse> {
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

    if (!resumePath) {
      return { success: false, error: "No resume file attached to this application." };
    }

    // Generate signed URL with 300-second expiration (5 minutes)
    const { data, error } = await adminSupabase.storage
      .from("resumes")
      .createSignedUrl(resumePath, 300);

    if (error || !data?.signedUrl) {
      console.error("Supabase createSignedUrl error:", error);
      return {
        success: false,
        error: error?.message || "Failed to generate signed download URL.",
      };
    }

    return {
      success: true,
      signedUrl: data.signedUrl,
    };
  } catch (err: any) {
    console.error("getSignedResumeUrl exception:", err);
    return { success: false, error: err.message || "Failed to retrieve secure resume." };
  }
}

/**
 * Update candidate application status
 */
export async function updateApplicationStatus(
  id: string,
  status: ApplicationLifecycleStatus
): Promise<ApplicationActionResponse> {
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

    const { data, error } = await adminSupabase
      .from("job_applications")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/careers");
    revalidatePath("/admin");

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update application status." };
  }
}
