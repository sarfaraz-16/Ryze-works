"use server";

import { revalidatePath } from "next/cache";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export type LeadLifecycleStatus =
  | "new"
  | "reviewing"
  | "contacted"
  | "qualified"
  | "closed";

export type LeadActionResponse = {
  success: boolean;
  error?: string;
  data?: any;
};

export async function updateLeadStatus(
  id: string,
  status: LeadLifecycleStatus
): Promise<LeadActionResponse> {
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
      return { success: false, error: "Forbidden: Administrative credentials required." };
    }

    const { data, error } = await adminSupabase
      .from("leads")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("updateLeadStatus error:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/leads");
    revalidatePath("/admin");

    return { success: true, data };
  } catch (err: any) {
    console.error("updateLeadStatus exception:", err);
    return { success: false, error: err.message || "Failed to update lead status." };
  }
}

export async function deleteLead(id: string): Promise<LeadActionResponse> {
  try {
    const adminSupabase = createAdminClient();
    if (!adminSupabase) {
      return { success: false, error: "Database admin client unavailable." };
    }

    const { error } = await adminSupabase.from("leads").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/leads");
    revalidatePath("/admin");

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete lead." };
  }
}
