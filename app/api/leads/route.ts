import { NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = body.name;
    const email = body.email;
    const company = body.company;
    const type = body.type || "project";
    const serviceInterest = body.service_interest || body.serviceInterest;
    const message = body.message;
    const aiBrief = body.ai_brief || body.aiBrief;
    const source = body.source || "website";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured()) {
      const { data, error } = await supabaseAdmin.from("leads").insert([
        {
          name,
          email,
          company: company || null,
          type,
          service_interest: serviceInterest || null,
          message,
          ai_brief: aiBrief || null,
          source,
          status: "new"
        }
      ]).select();

      if (error) {
        console.error("Supabase insert error:", error);
        return NextResponse.json(
          { error: "Failed to record lead in database." },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Thank you! We have received your project details and will reach out shortly.",
        leadId: data?.[0]?.id,
        lead: data?.[0]
      });
    }

    // Graceful fallback for local development without DB
    return NextResponse.json({
      success: true,
      message: "Lead recorded successfully (development mode).",
      lead: { name, email, company, serviceInterest }
    });
  } catch (err: any) {
    console.error("Lead submission error:", err);
    return NextResponse.json(
      { error: "Internal server error processing request." },
      { status: 500 }
    );
  }
}
