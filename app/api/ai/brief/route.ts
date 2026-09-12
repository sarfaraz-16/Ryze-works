import { NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";

export interface ValidatedProjectBrief {
  company: string;
  industry: string;
  objective: string;
  challenge: string;
  target_audience: string;
  timeline: string;
  budget: string;
  recommended_services: string[];
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      company,
      industry,
      objective,
      challenge,
      projectIdea,
      targetAudience,
      target_audience,
      timeline,
      budget,
      servicesNeeded,
      recommended_services,
      source,
    } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Work email is required to receive the project brief." },
        { status: 400 }
      );
    }

    const clientCompany = company || name || "Stealth Startup";
    const clientIndustry = industry || "Technology / AI";
    const clientObjective = objective || projectIdea || "Build next-generation product platform";
    const clientChallenge = challenge || "Accelerate speed-to-market while ensuring institutional-grade reliability";
    const clientAudience = target_audience || targetAudience || "Enterprise and tech-forward consumers";
    const clientTimeline = timeline || "6 to 10 weeks";
    const clientBudget = budget || "$15k - $30k";
    const clientServices = recommended_services || servicesNeeded || [
      "Brand Architecture & Positioning",
      "Fullstack Web Application (Next.js & Supabase)",
      "pgvector RAG AI Workflow",
      "Conversion & Growth Engine",
    ];

    let validatedBrief: ValidatedProjectBrief = {
      company: clientCompany,
      industry: clientIndustry,
      objective: clientObjective,
      challenge: clientChallenge,
      target_audience: clientAudience,
      timeline: clientTimeline,
      budget: clientBudget,
      recommended_services: Array.isArray(clientServices)
        ? clientServices
        : [clientServices],
    };

    // If Gemini API is available, synthesize and structure the brief with AI intelligence
    if (GEMINI_API_KEY) {
      try {
        const prompt = `
You are the Lead Systems & Brand Architect at Ryze Works.
Synthesize an architectural and commercial project brief based on this client intake:
- Company: ${clientCompany}
- Industry: ${clientIndustry}
- Objective: ${clientObjective}
- Challenge: ${clientChallenge}
- Target Audience: ${clientAudience}
- Timeline: ${clientTimeline}
- Budget Range: ${clientBudget}
- Initial Services Requested: ${JSON.stringify(clientServices)}

Return ONLY a valid JSON object with NO MARKDOWN formatting or backticks, matching this exact schema:
{
  "company": "string",
  "industry": "string",
  "objective": "string",
  "challenge": "string",
  "target_audience": "string",
  "timeline": "string",
  "budget": "string",
  "recommended_services": ["string", "string", "string"]
}
`.trim();

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ role: "user", parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.2,
                responseMimeType: "application/json",
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const rawJson =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawJson) {
            const parsed = JSON.parse(rawJson);
            validatedBrief = {
              company: parsed.company || clientCompany,
              industry: parsed.industry || clientIndustry,
              objective: parsed.objective || clientObjective,
              challenge: parsed.challenge || clientChallenge,
              target_audience: parsed.target_audience || clientAudience,
              timeline: parsed.timeline || clientTimeline,
              budget: parsed.budget || clientBudget,
              recommended_services: Array.isArray(parsed.recommended_services)
                ? parsed.recommended_services
                : [parsed.recommended_services || "Fullstack Technology & AI"],
            };
          }
        }
      } catch (aiErr) {
        console.warn("Gemini project brief structuring fallback:", aiErr);
      }
    }

    // Ingest into public.leads with type = 'project' and ai_brief = JSON payload
    let leadId: string | null = null;
    if (isSupabaseConfigured()) {
      try {
        const { data, error: leadErr } = await supabaseAdmin
          .from("leads")
          .insert([
            {
              name: name || clientCompany,
              email,
              company: validatedBrief.company,
              type: "project",
              service_interest: validatedBrief.recommended_services.join(", "),
              message: `[AI Brief] Objective: ${validatedBrief.objective}\nChallenge: ${validatedBrief.challenge}`,
              ai_brief: validatedBrief,
              source: source || "/ai",
              status: "new",
            },
          ])
          .select()
          .single();

        if (!leadErr && data) {
          leadId = data.id;
        } else if (leadErr) {
          console.error("Error inserting project lead with ai_brief:", leadErr);
        }
      } catch (dbErr) {
        console.error("Database lead ingestion exception:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      leadId,
      brief: validatedBrief,
      message: "Project brief successfully synthesized and recorded into CRM pipeline.",
    });
  } catch (error: any) {
    console.error("AI brief generation route error:", error);
    return NextResponse.json(
      { error: "Failed to generate project brief." },
      { status: 500 }
    );
  }
}
