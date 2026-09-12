import { NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const authorName = body.author_name || body.authorName;
    const quote = body.quote;
    const role = body.role || "Client";
    const company = body.company || "Partner";
    const rating = Number(body.rating) || 5;
    const consentGiven = body.consent_given ?? body.consentGiven ?? false;

    if (!authorName || !quote) {
      return NextResponse.json(
        { error: "author_name and quote are required." },
        { status: 400 }
      );
    }

    if (!consentGiven) {
      return NextResponse.json(
        { success: false, message: "Consent is required to submit a testimonial." },
        { status: 400 }
      );
    }

    const payload = {
      author_name: authorName,
      role,
      company,
      quote,
      rating,
      status: "pending", // ALWAYS pending by default per workflow rules
      is_featured: false,
      is_verified: false,
      consent_given: consentGiven,
      submitted_at: new Date().toISOString()
    };

    if (isSupabaseConfigured()) {
      const { data, error } = await supabaseAdmin.from("testimonials").insert([payload]).select();
      if (error) {
        console.error("Supabase testimonials insert error:", error);
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }
      return NextResponse.json({
        success: true,
        data,
        message: "Thank you! Your testimonial has been received and is queued for verification and approval by the Ryze Works editorial team.",
        status: "pending"
      });
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your testimonial has been received and is queued for verification and approval by the Ryze Works editorial team.",
      status: "pending"
    });
  } catch (error: any) {
    console.error("Testimonial submission error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error submitting testimonial." },
      { status: 500 }
    );
  }
}
