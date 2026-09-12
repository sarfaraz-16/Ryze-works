import { NextResponse } from "next/server";
import { generateEmbedding } from "@/lib/ai/embeddings";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { query, threshold = 0.35, limit = 6 } = await req.json();

    if (!query || typeof query !== "string" || !query.trim()) {
      return NextResponse.json(
        { error: "Query string is required." },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "Vector database is not configured." },
        { status: 503 }
      );
    }

    const startTime = Date.now();
    const queryEmbedding = await generateEmbedding(query.trim());
    const embedTimeMs = Date.now() - startTime;

    const rpcStart = Date.now();
    const { data: matches, error: rpcErr } = await supabaseAdmin.rpc(
      "match_knowledge",
      {
        query_embedding: queryEmbedding,
        match_threshold: Number(threshold),
        match_count: Number(limit),
      }
    );
    const searchTimeMs = Date.now() - rpcStart;

    if (rpcErr) {
      console.error("Vector similarity search RPC error:", rpcErr);
      return NextResponse.json(
        { error: "Failed to execute vector search." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      query: query.trim(),
      results: matches || [],
      count: matches?.length || 0,
      telemetry: {
        embedTimeMs,
        searchTimeMs,
        totalTimeMs: embedTimeMs + searchTimeMs,
        dimension: queryEmbedding.length,
      },
    });
  } catch (err: any) {
    console.error("Semantic search route exception:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error during semantic vector retrieval." },
      { status: 500 }
    );
  }
}
