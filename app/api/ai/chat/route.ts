import { NextResponse } from "next/server";
import { SERVICES_DATA, FEATURED_PROJECTS, CASE_STUDIES, TESTIMONIALS_DATA, ARTICLES_DATA } from "@/data/siteData";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message string is required." }, { status: 400 });
    }

    const query = message.trim();

    // Prepare verified grounded knowledge context
    const knowledgeContext = `
YOU ARE "RYZE AI", THE OFFICIAL AI PARTNER FOR "RYZE WORKS".
YOUR BEHAVIOR MUST ADHERE TO STRICT PROFESSIONAL ACCURACY:
- Ground all responses strictly in the verified facts below.
- Do NOT fabricate clients, metrics, projects, pricing, or capabilities.
- If asked about something not supported by the verified knowledge below, politely refuse: "I don't have enough verified information to answer that. Please contact our team at hello@ryzeworks.tech."
- Never expose API keys or internal server configurations.

VERIFIED FACTS ABOUT RYZE WORKS:
- Positioning: AI-Native Creative & Technology Partner helping ambitious brands build, grow, and scale with clarity, creativity, and intelligent systems.
- Location: Bangalore, India | Contact: hello@ryzeworks.tech
- Core Capabilities:
  1. THINK (Strategy): Brand positioning, research, GTM strategy, AI opportunity mapping.
  2. CREATE (Brand + Creative): Visual identity systems, design systems, creative content, motion design.
  3. BUILD (Technology): Next.js & React web applications, Supabase/PostgreSQL, custom AI assistants, pgvector RAG, mobile apps.
  4. GROW (Marketing): Growth marketing, performance optimization, conversion funnels, distribution.
  5. ACTIVATE (Experiences): Interactive web experiences, 3D WebGL, product launches, community activations.
- Verified Featured Projects:
  - NOSTIC: Branding, Website, Marketing for medical diagnostics hardware. Link: /projects/nostic
  - ZEPTO: Branding, Campaign, Content for India's 10-minute grocery delivery leader. Link: /projects/zepto
  - YULU: Branding, App, Campaign for clean urban EV micro-mobility. Link: /projects/yulu
  - CRED: Brand system, fintech UX, and animations. Link: /projects/cred
  - SIMPL: 1-tap cardless checkout interface & user flow design. Link: /projects/simpl
- Verified Case Studies:
  - Nostic: FDA-aligned usability, +280% user engagement, multi-hospital rollouts. Link: /case-studies/nostic-transformation
  - Razorpay: Scaled national brand trust across India, 40M+ daily transactions. Link: /case-studies/razorpay-scale
  - Simpl: 99.4% checkout success rate, 1.8x repeat frequency. Link: /case-studies/simpl-engagement
- Verified Testimonials:
  - Kunal Shah (Founder, CRED): "Ryze Works didn't just build our brand — they helped shape our entire business direction."
  - Aadit Palicha (Co-founder, Zepto): "They understood our vision better than we did. The results speak for themselves."
  - Amit Gupta (Co-founder, Yulu): "The team is exceptional — strategic, creative and incredibly execution-focused."
- Verified Insights Articles:
  - "The Future of Brand Building in an AI World" (5 min read)
  - "Growth Strategies That Actually Work in 2024" (6 min read)
  - "How AI is Transforming Digital Products" (7 min read)
  - "From Idea To Execution for Startups Founders" (6 min read)
`;

    // Attempt calling real Gemini 3.6 Flash API
    if (GEMINI_API_KEY) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `${knowledgeContext}\n\nUSER QUESTION: ${query}\n\nProvide a concise, helpful, grounded response. At the end, cite any relevant pages as links (e.g. /services, /projects, /case-studies, /contact).`
                    }
                  ]
                }
              ],
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 600
              }
            })
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const generatedText =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

          if (generatedText) {
            // Extract sources/links mentioned
            const sources: string[] = [];
            const matches = generatedText.match(/\/(services|projects|case-studies|insights|about|contact|ai)[a-z0-9\-_/]*/gi);
            if (matches) {
              matches.forEach((m: string) => {
                if (!sources.includes(m)) sources.push(m);
              });
            }
            if (sources.length === 0) {
              sources.push("/services", "/contact");
            }

            return NextResponse.json({
              role: "assistant",
              content: generatedText,
              sources,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            });
          }
        } else {
          console.warn("Gemini API returned error:", await geminiRes.text());
        }
      } catch (geminiErr) {
        console.error("Gemini API call failed, falling back to local grounded logic:", geminiErr);
      }
    }

    // Local grounded fallback if Gemini API is unreachable or rate-limited
    const lowerQuery = query.toLowerCase();
    let reply = "";
    let fallbackSources: string[] = [];

    if (lowerQuery.includes("cred")) {
      reply = `For CRED, Ryze Works delivered Brand System, App, and Campaign assets. Quote from Kunal Shah (Founder, CRED): "Ryze Works didn't just build our brand — they helped shape our entire business direction."`;
      fallbackSources = ["/projects/cred", "/testimonials"];
    } else if (lowerQuery.includes("zepto")) {
      reply = `For Zepto, Ryze Works delivered Brand Identity & Hyper-Growth Launch Campaigns across India. Quote from Aadit Palicha (Co-founder, Zepto): "They understood our vision better than we did. The results speak for themselves."`;
      fallbackSources = ["/projects/zepto", "/testimonials"];
    } else if (lowerQuery.includes("yulu")) {
      reply = `For Yulu, Ryze Works designed the mobile IoT platform, visual identity, and urban EV campaigns. Quote from Amit Gupta (Co-founder, Yulu): "The team is exceptional — strategic, creative and incredibly execution-focused."`;
      fallbackSources = ["/projects/yulu", "/testimonials"];
    } else if (lowerQuery.includes("case study") || lowerQuery.includes("results")) {
      reply = `We have published three verified deep-dive case studies:\n• Nostic: Transforming medical hardware diagnostics (+280% user engagement)\n• Razorpay: Scaling brand trust & high-speed payments (40M+ daily transactions)\n• Simpl: 1-Tap checkout interface & repeat purchase conversion (99.4% checkout success)`;
      fallbackSources = ["/case-studies/nostic-transformation", "/case-studies/razorpay-scale", "/case-studies/simpl-engagement"];
    } else if (lowerQuery.includes("service") || lowerQuery.includes("capability") || lowerQuery.includes("what do you do")) {
      reply = `Ryze Works provides end-to-end capabilities across 5 disciplines:\n• THINK (Strategy)\n• CREATE (Brand + Creative)\n• BUILD (Technology & AI)\n• GROW (Marketing)\n• ACTIVATE (Experiences)`;
      fallbackSources = ["/services"];
    } else {
      reply = "I don't have enough verified information to answer that specific inquiry. You can explore our verified case studies, capabilities, or connect directly with our leadership team at hello@ryzeworks.tech.";
      fallbackSources = ["/contact", "/services"];
    }

    return NextResponse.json({
      role: "assistant",
      content: reply,
      sources: fallbackSources,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    });
  } catch (error) {
    console.error("AI chat route error:", error);
    return NextResponse.json({ error: "Error processing conversational query." }, { status: 500 });
  }
}
