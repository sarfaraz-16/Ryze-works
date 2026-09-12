import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

const applySchema = z.object({
  applicant_name: z.string().trim().min(2, "applicant_name must be at least 2 characters."),
  email: z.string().trim().email("email must be a valid email address."),
  role_id: z.string().uuid("role_id must be a valid UUID.")
});

export async function POST(req: Request) {
  try {
    let applicantName: string | null = null;
    let email: string | null = null;
    let roleId: string | null = null;
    let resumeFile: File | null = null;

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await req.formData();
      applicantName = formData.get("applicant_name")?.toString() || null;
      email = formData.get("email")?.toString() || null;
      roleId = formData.get("role_id")?.toString() || null;
      const file = formData.get("resume");
      if (file && typeof file === "object" && "name" in file && "size" in file) {
        if ((file as File).size > 0) {
          resumeFile = file as File;
        }
      }
    } else {
      const body = await req.json();
      applicantName = body.applicant_name || null;
      email = body.email || null;
      roleId = body.role_id || null;
    }

    const parsed = applySchema.safeParse({
      applicant_name: applicantName,
      email,
      role_id: roleId
    });

    if (!parsed.success) {
      const errorMessage = parsed.error.issues.map((i) => i.message).join(" ");
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    const { applicant_name, email: validEmail, role_id } = parsed.data;

    let resume_path: string | null = null;
    if (resumeFile) {
      const MAX_SIZE = 5 * 1024 * 1024; // 5MB
      if (resumeFile.size > MAX_SIZE) {
        return NextResponse.json(
          { error: "Resume file size exceeds the 5MB limit." },
          { status: 400 }
        );
      }

      const fileName = resumeFile.name.toLowerCase();
      const validExtensions = [".pdf", ".doc", ".docx"];
      const isValidExt = validExtensions.some((ext) => fileName.endsWith(ext));
      if (!isValidExt) {
        return NextResponse.json(
          { error: "Resume must be a PDF, DOC, or DOCX file." },
          { status: 400 }
        );
      }

      const ext = fileName.split(".").pop();
      const storageKey = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;
      const arrayBuffer = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from("resumes")
        .upload(storageKey, buffer, {
          contentType: resumeFile.type || "application/octet-stream",
          upsert: false
        });

      if (uploadError) {
        console.error("Supabase resume storage error:", uploadError);
        return NextResponse.json(
          { error: `Failed to upload resume: ${uploadError.message}` },
          { status: 500 }
        );
      }

      resume_path = uploadData?.path || storageKey;
    }

    const payload = {
      applicant_name,
      email: validEmail,
      role_id,
      resume_path,
      status: "submitted" as const
    };

    if (isSupabaseConfigured()) {
      const { data, error } = await supabaseAdmin
        .from("job_applications")
        .insert([payload])
        .select();

      if (error) {
        console.error("Supabase job_applications insert error:", error);
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        data,
        message: "Thank you! Your application has been submitted successfully.",
        status: "submitted"
      });
    }

    return NextResponse.json({
      success: true,
      data: [payload],
      message: "Thank you! Your application has been submitted successfully.",
      status: "submitted"
    });
  } catch (error: any) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error submitting application." },
      { status: 500 }
    );
  }
}
