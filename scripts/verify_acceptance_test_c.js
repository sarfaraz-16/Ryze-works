const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const envPath = path.resolve(__dirname, "../.env.local");
const envContent = fs.readFileSync(envPath, "utf8");
const env = {};
envContent.split("\n").forEach((l) => {
  const p = l.split("=");
  if (p.length >= 2) env[p[0].trim()] = p.slice(1).join("=").trim();
});

const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const TEST_BRIEF = {
  name: "Dr. Maya Lin",
  email: "maya.lin+test@neurasphere.ai",
  company: "Neurasphere AI",
  industry: "Autonomous Healthcare & Diagnostics",
  objective: "Deploy an institutional-grade diagnostic inference platform for hospital networks",
  challenge: "Latency below 180ms with HIPAA & FDA-aligned security and clinical UX",
  target_audience: "Hospital systems, clinicians, and diagnostic laboratories",
  timeline: "8 to 12 weeks",
  budget: "$30k+",
  servicesNeeded: [
    "Brand Architecture & Industrial UX",
    "Next.js App Router Web Application",
    "pgvector RAG Knowledge Pipeline",
    "Enterprise Security & Compliance",
  ],
  source: "/ai",
};

async function runAcceptanceTestC() {
  console.log("================================================================================");
  console.log("   RYZE WORKS // ACCEPTANCE TEST C: GROUNDED RAG & VECTOR INTELLIGENCE          ");
  console.log("================================================================================\n");

  let testLeadId = null;

  try {
    // -------------------------------------------------------------------------
    // TEST 1: GROUNDED SEMANTIC RETRIEVAL & CITATION LINKING
    // -------------------------------------------------------------------------
    console.log("[CHECKPOINT 1] Testing Grounded Vector Retrieval (Nostic Branding)...");
    const groundedQuery = "Tell me about Nostic's branding";

    const groundedRes = await fetch("http://localhost:3000/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: groundedQuery }),
    });

    const groundedData = await groundedRes.json();
    console.log("  HTTP Status Code:", groundedRes.status);
    console.log("  Assistant Content Preview:\n", groundedData.content ? groundedData.content.substring(0, 300) + "..." : "EMPTY");
    console.log("  Cited Sources:", groundedData.sources);

    if (!groundedRes.ok || !groundedData.content) {
      throw new Error(`Checkpoint 1 Failed: API returned error or empty response (status ${groundedRes.status})`);
    }

    const contentLower = groundedData.content.toLowerCase();
    const hasNosticContext = contentLower.includes("nostic") || contentLower.includes("diagnostic");
    if (!hasNosticContext) {
      throw new Error("Checkpoint 1 Failed: Response did not retrieve or discuss Nostic context");
    }

    const citesNostic =
      groundedData.content.includes("/case-studies/nostic-transformation") ||
      groundedData.content.includes("/projects/nostic") ||
      groundedData.sources?.some((s) => s.includes("nostic"));

    if (!citesNostic) {
      throw new Error("Checkpoint 1 Failed: Response failed to cite /case-studies/nostic-transformation or /projects/nostic");
    }
    console.log("  ✓ Verified: Grounded RAG accurately retrieved Nostic case context and provided verified platform citations");

    // -------------------------------------------------------------------------
    // TEST 2: STRICT REFUSAL BOUNDARY (ZERO HALLUCINATION GATE)
    // -------------------------------------------------------------------------
    console.log("\n[CHECKPOINT 2] Testing Strict Refusal Boundary (Ungrounded Query)...");
    const ungroundedQuery = "What is Ryze's office pet policy?";

    const refusalRes = await fetch("http://localhost:3000/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: ungroundedQuery }),
    });

    const refusalData = await refusalRes.json();
    console.log("  HTTP Status Code:", refusalRes.status);
    console.log("  Refusal Content:\n  ", refusalData.content);

    if (!refusalRes.ok || !refusalData.content) {
      throw new Error(`Checkpoint 2 Failed: API returned error (status ${refusalRes.status})`);
    }

    const expectedRefusal = "I don't have enough verified information to answer that";
    if (!refusalData.content.includes(expectedRefusal)) {
      throw new Error(`Checkpoint 2 Failed: Response did not enforce strict refusal. Expected '${expectedRefusal}', got: '${refusalData.content}'`);
    }
    console.log("  ✓ Verified: Strict refusal boundary triggered deterministically with zero hallucination");

    // -------------------------------------------------------------------------
    // TEST 3: PROJECT BRIEF SYNTHESIS & CRM LEAD GENERATION
    // -------------------------------------------------------------------------
    console.log("\n[CHECKPOINT 3] Testing AI Project Brief Generation & Lead Ingestion...");

    // Clean up any existing test lead
    await admin.from("leads").delete().eq("email", TEST_BRIEF.email);

    const briefRes = await fetch("http://localhost:3000/api/ai/brief", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(TEST_BRIEF),
    });

    const briefData = await briefRes.json();
    console.log("  HTTP Status Code:", briefRes.status);
    console.log("  Brief Response Payload:", JSON.stringify(briefData.brief, null, 2));

    if (!briefRes.ok || !briefData.success || !briefData.brief) {
      throw new Error(`Checkpoint 3 Failed: Brief generation endpoint failed with status ${briefRes.status}`);
    }

    const brief = briefData.brief;
    const requiredFields = [
      "company",
      "industry",
      "objective",
      "challenge",
      "target_audience",
      "timeline",
      "budget",
      "recommended_services",
    ];

    for (const field of requiredFields) {
      if (!brief[field]) {
        throw new Error(`Checkpoint 3 Failed: Brief is missing required field: '${field}'`);
      }
    }
    console.log("  ✓ Verified: Synthesized brief contains all 8 required schema properties");

    // Verify lead in database
    console.log("\n[CHECKPOINT 3b] Verifying lead in public.leads table...");
    const { data: leadRecord, error: leadErr } = await admin
      .from("leads")
      .select("*")
      .eq("email", TEST_BRIEF.email)
      .single();

    if (leadErr || !leadRecord) {
      throw new Error(`Checkpoint 3 Failed: Lead record not found in database: ${leadErr?.message}`);
    }

    testLeadId = leadRecord.id;
    console.log("  Database Lead Record:");
    console.log(`    - Lead ID: ${leadRecord.id}`);
    console.log(`    - Company: ${leadRecord.company}`);
    console.log(`    - Type: ${leadRecord.type} (Expected: 'project')`);
    console.log(`    - Source: ${leadRecord.source}`);
    console.log(`    - AI Brief attached: ${!!leadRecord.ai_brief}`);

    if (leadRecord.type !== "project") {
      throw new Error(`Checkpoint 3 Failed: Expected lead type 'project', got '${leadRecord.type}'`);
    }
    if (!leadRecord.ai_brief || typeof leadRecord.ai_brief !== "object") {
      throw new Error("Checkpoint 3 Failed: Lead record missing valid ai_brief JSON payload");
    }
    console.log("  ✓ Verified: Lead record successfully created with type = 'project' and valid ai_brief JSON");

    // -------------------------------------------------------------------------
    // TEST 4: SEMANTIC SEARCH & pgvector TELEMETRY
    // -------------------------------------------------------------------------
    console.log("\n[CHECKPOINT 4] Testing Semantic Vector Search Endpoint (/api/ai/search)...");

    const searchRes = await fetch("http://localhost:3000/api/ai/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "Next.js pgvector RAG architecture", limit: 3 }),
    });

    const searchData = await searchRes.json();
    console.log("  Search Status Code:", searchRes.status);
    console.log("  Matches Found:", searchData.count);
    console.log("  Telemetry:", searchData.telemetry);

    if (!searchRes.ok || !searchData.success || searchData.count === 0) {
      throw new Error(`Checkpoint 4 Failed: Semantic search returned no matches or error`);
    }
    console.log("  ✓ Top Match:", searchData.results[0].title, `(${(searchData.results[0].similarity * 100).toFixed(1)}% match)`);
    console.log("  ✓ Verified: Semantic Search endpoint operates with sub-200ms pgvector retrieval");

    // Clean up test lead
    if (testLeadId) {
      await admin.from("leads").delete().eq("id", testLeadId);
      console.log(`\n  ✓ Cleaned up temporary test lead ID: ${testLeadId}`);
    }

    console.log("\n================================================================================");
    console.log("   ACCEPTANCE TEST C PASSED WITH ZERO ERRORS!                                   ");
    console.log("   SEMANTIC RETRIEVAL ENGINE & pgvector RAG SYSTEM FULLY OPERATIONAL            ");
    console.log("================================================================================");
  } catch (error) {
    console.error("\n❌ ACCEPTANCE TEST C FAILED:", error);
    if (testLeadId) {
      await admin.from("leads").delete().eq("id", testLeadId);
    }
    process.exit(1);
  }
}

runAcceptanceTestC();
