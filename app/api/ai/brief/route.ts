import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
  try {
    const { name, email, company, projectIdea, targetAudience, timeline, servicesNeeded } = await req.json();

    if (!email || !projectIdea) {
      return NextResponse.json(
        { error: "Email and project description are required." },
        { status: 400 }
      );
    }

    let structuredBrief = {
      executiveSummary: `Project brief for ${company || name || "innovative brand"} focused on building ${projectIdea}.`,
      scopeDeliverables: [
        "Brand Identity & Positioning Architecture",
        "Fullstack Next.js & Supabase Web Application",
        "AI Agent / RAG Workflow Integration",
        "Performance Growth & Conversion Engine"
      ],
      recommendedStack: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Supabase (PostgreSQL + RLS + pgvector)", "Gemini AI Gateway"],
      estimatedSprint: timeline || "4 to 8 weeks",
      confidenceScore: "96%"
    };

    if (GEMINI_API_KEY) {
      try {
        const prompt = `
You are the Lead Solutions Architect at Ryze Works (AI-Native Creative & Technology Partner).
Generate a structured JSON project brief for a potential client with these details:
- Client Name: ${name || "Anonymous"}
- Company: ${company || "Startup"}
- Project Idea: ${projectIdea}
- Target Audience: ${targetAudience || "Tech-forward consumers & businesses"}
- Timeline: ${timeline || "Not specified"}
- Services Needed: ${servicesNeeded || "Design + Technology"}

Output strictly valid JSON with no markdown backticks, matching this exact shape:
{
  "executiveSummary": "string",
  "scopeDeliverables": ["string", "string", "string", "string"],
  "recommendedStack": ["string", "string", "string"],
  "estimatedSprint": "string",
  "confidenceScore": "string"
}
`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ role: "user", parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.2,
                responseMimeType: "application/json"
              }
            })
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const rawJson = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawJson) {
            structuredBrief = JSON.parse(rawJson);
          }
        }
      } catch (err) {
        console.warn("Gemini brief parsing fallback:", err);
      }
    }

    // Save lead with AI brief to Supabase if configured
    if (isSupabaseConfigured()) {
      await supabase.from("leads").insert([
        {
          name: name || "Anonymous Lead",
          email,
          company: company || null,
          service_interest: servicesNeeded || "AI & Web Development",
          message: projectIdea,
          ai_brief: structuredBrief,
          source: "ai_brief_generator",
          status: "new"
        }
      ]);
    }

    return NextResponse.json({
      success: true,
      brief: structuredBrief,
      message: "AI project brief generated successfully!"
    });
  } catch (error) {
    console.error("AI brief route error:", error);
    return NextResponse.json(
      { error: "Error generating project brief." },
      { status: 500 }
    );
  }
}
