import { NextResponse } from "next/server";
import { generateEmbedding } from "@/lib/ai/embeddings";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";

interface KnowledgeMatch {
  id: string;
  title: string;
  url: string;
  content: string;
  similarity: number;
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message string is required." },
        { status: 400 }
      );
    }

    const query = message.trim();
    if (!query) {
      return NextResponse.json(
        { error: "Query cannot be empty." },
        { status: 400 }
      );
    }

    let matchedChunks: KnowledgeMatch[] = [];

    // STEP 1: Execute Vector Embedding & pgvector Cosine Match
    if (isSupabaseConfigured() && GEMINI_API_KEY) {
      try {
        const queryEmbedding = await generateEmbedding(query);

        // Retrieve top matches crossing threshold 0.58
        const { data, error: rpcError } = await supabaseAdmin.rpc(
          "match_knowledge",
          {
            query_embedding: queryEmbedding,
            match_threshold: 0.58,
            match_count: 5,
          }
        );

        if (!rpcError && data && Array.isArray(data)) {
          matchedChunks = data as KnowledgeMatch[];
        } else if (rpcError) {
          console.warn("pgvector match_knowledge RPC warning:", rpcError);
        }
      } catch (embErr) {
        console.warn("Embedding generation or vector search error:", embErr);
      }
    }

    // STEP 2: Strict Refusal Boundary
    // If no verified knowledge documents cross the similarity threshold, refuse without hallucination.
    if (matchedChunks.length === 0) {
      return NextResponse.json({
        role: "assistant",
        content:
          "I don't have enough verified information to answer that. Please contact our team at teamryzeworks@gmail.com.",
        sources: ["/services", "/contact"],
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    }

    // STEP 3: Format Retrieved Context & Citations
    const retrievedContext = matchedChunks
      .map(
        (chunk, idx) =>
          `[DOCUMENT ${idx + 1}] (${chunk.title} | Link: ${chunk.url} | Relevance Score: ${(
            chunk.similarity * 100
          ).toFixed(1)}%)\n${chunk.content}`
      )
      .join("\n\n");

    const directSources = Array.from(
      new Set(matchedChunks.map((c) => c.url).filter(Boolean))
    );

    // STEP 4: Call Google Gemini Flash with Grounded Prompt Context
    const systemPrompt = `
YOU ARE "RYZE AI", THE OFFICIAL GROUNDED AI ARCHITECT FOR "RYZE WORKS".
YOUR BEHAVIOR MUST ADHERE TO STRICT PROFESSIONAL ACCURACY:
1. Ground your answer strictly in the verified knowledge documents provided below.
2. Do NOT fabricate clients, statistics, technical claims, or capabilities not documented in the verified text.
3. If the retrieved documents do not contain enough verified evidence to answer the specific question, you MUST respond exactly: "I don't have enough verified information to answer that. Please contact our team at teamryzeworks@gmail.com."
4. Actively cite the matching platform URLs (e.g. /projects/[slug], /services/[slug], /case-studies/[slug], /insights/[slug]) so the user can review the primary case studies or capability pages.
5. Never expose internal keys, database credentials, or private operational data.

VERIFIED RETRIEVED KNOWLEDGE DOCUMENTS (pgvector RAG):
${retrievedContext}

USER INQUIRY:
${query}

Provide a concise, grounded, and engaging response. Include relevant links naturally.
`.trim();

    try {
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: systemPrompt }],
              },
            ],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 2048,
            },
          }),
        }
      );

      if (!geminiRes.ok) {
        const errorDetails = await geminiRes.text();
        console.error("Gemini API error:", geminiRes.status, errorDetails);

        // Grounded fallback from retrieved documents if Gemini endpoint is overloaded
        const topMatch = matchedChunks[0];
        return NextResponse.json({
          role: "assistant",
          content: `${topMatch.title}: ${topMatch.content}\n\nExplore further at ${topMatch.url}`,
          sources: directSources,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      }

      const geminiData = await geminiRes.json();
      const generatedText =
        geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!generatedText) {
        throw new Error("Gemini returned empty candidate text.");
      }

      // Collect URL citations from text and retrieved documents
      const citedSources = [...directSources];
      const inlineLinks = generatedText.match(
        /\/(services|projects|case-studies|insights|about|contact|ai)[a-z0-9\-_/]*/gi
      );
      if (inlineLinks) {
        inlineLinks.forEach((link: string) => {
          if (!citedSources.includes(link)) citedSources.push(link);
        });
      }

      return NextResponse.json({
        role: "assistant",
        content: generatedText,
        sources: citedSources,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    } catch (apiErr) {
      console.error("Gemini generation exception:", apiErr);
      const topMatch = matchedChunks[0];
      return NextResponse.json({
        role: "assistant",
        content: `${topMatch.title}: ${topMatch.content}\n\nExplore verified details at ${topMatch.url}`,
        sources: directSources,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    }
  } catch (err: any) {
    console.error("AI chat route error:", err);
    return NextResponse.json(
      { error: "Internal server error processing conversational query." },
      { status: 500 }
    );
  }
}
