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

const GEMINI_API_KEY = env.GEMINI_API_KEY;

async function getEmbedding(text) {
  const cleanText = text.replace(/\s+/g, " ").trim();
  const modelsToTry = ["gemini-embedding-001", "text-embedding-004"];

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:embedContent?key=${GEMINI_API_KEY}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: { parts: [{ text: cleanText }] },
          outputDimensionality: 1536,
        }),
      });

      if (!res.ok) continue;
      const data = await res.json();
      const vals = data.embedding?.values;
      if (vals && vals.length > 0) {
        if (vals.length === 1536) return vals;
        if (vals.length === 768) return vals.concat(new Array(768).fill(0));
        if (vals.length > 1536) return vals.slice(0, 1536);
        const p = [...vals];
        while (p.length < 1536) p.push(0);
        return p;
      }
    } catch (e) {
      // Continue to next model
    }
  }
  throw new Error(`Failed to generate embedding for text: "${text.substring(0, 50)}..."`);
}

async function seedEmbeddings() {
  console.log("================================================================================");
  console.log("   RYZE WORKS // KNOWLEDGE BASE VECTOR INGESTION PIPELINE (pgvector)           ");
  console.log("================================================================================\n");

  if (!GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY missing from environment.");
    process.exit(1);
  }

  // 1. Query all source tables
  console.log("[STEP 1] Querying published entities from PostgreSQL tables...");
  const [servicesRes, projectsRes, caseStudiesRes, articlesRes] = await Promise.all([
    admin.from("services").select("*").eq("status", "published"),
    admin.from("projects").select("*").eq("status", "published"),
    admin.from("case_studies").select("*").eq("status", "published"),
    admin.from("articles").select("*").eq("status", "published"),
  ]);

  const services = servicesRes.data || [];
  const projects = projectsRes.data || [];
  const caseStudies = caseStudiesRes.data || [];
  const articles = articlesRes.data || [];

  console.log(`  - Services: ${services.length} rows`);
  console.log(`  - Projects: ${projects.length} rows`);
  console.log(`  - Case Studies: ${caseStudies.length} rows`);
  console.log(`  - Insights Articles: ${articles.length} rows`);

  // 2. Format structured semantic chunks
  console.log("\n[STEP 2] Formulating structured semantic chunks...");
  const documents = [];

  // Services
  for (const s of services) {
    const deliverablesStr = Array.isArray(s.deliverables) ? s.deliverables.join(", ") : "";
    documents.push({
      title: `${s.name} (${s.tagline || "Core Capability"})`,
      url: `/services/${s.slug}`,
      category: "service",
      content: `Discipline: ${s.name} (${s.tagline || ""}). Group: ${s.group_name || ""}. Description: ${s.description}. Key Deliverables & Solutions: ${deliverablesStr}. URL: /services/${s.slug}`,
    });
  }

  // Projects
  for (const p of projects) {
    const tagsStr = Array.isArray(p.tags) ? p.tags.join(", ") : "";
    documents.push({
      title: `${p.title} Project`,
      url: `/projects/${p.slug}`,
      category: "project",
      content: `Project Title: ${p.title}. Client: ${p.client || p.title}. Category: ${p.category || ""}. Industry: ${p.industry || ""}. Description: ${p.description}. Solutions & Capabilities: ${tagsStr}. URL: /projects/${p.slug}`,
    });
  }

  // Case Studies
  for (const c of caseStudies) {
    const resultsStr = typeof c.results === "object" ? JSON.stringify(c.results) : c.results || "";
    documents.push({
      title: `${c.client} Case Study: ${c.headline || c.title}`,
      url: `/case-studies/${c.slug}`,
      category: "case_study",
      content: `Client: ${c.client}. Title: ${c.title}. Headline: ${c.headline || ""}. Challenge: ${c.challenge}. Strategy: ${c.strategy}. Execution & Technical Architecture: ${c.execution}. Measured Results & Outcomes: ${resultsStr}. URL: /case-studies/${c.slug}`,
    });
  }

  // Articles
  for (const a of articles) {
    documents.push({
      title: a.title,
      url: `/insights/${a.slug}`,
      category: "insight",
      content: `Article Title: ${a.title}. Category: ${a.category}. Executive Summary: ${a.summary}. Content: ${a.content ? a.content.substring(0, 1500) : ""}. URL: /insights/${a.slug}`,
    });
  }

  console.log(`  Total semantic documents prepared: ${documents.length}`);

  // 3. Clear existing documents
  console.log("\n[STEP 3] Resetting public.knowledge_documents table...");
  const { error: delErr } = await admin.from("knowledge_documents").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (delErr) {
    console.warn("  Warning clearing documents:", delErr.message);
  }

  // 4. Generate embeddings and upsert
  console.log("\n[STEP 4] Generating 1536-dim embeddings via Google Gemini & inserting into pgvector...");

  let insertedCount = 0;
  for (let i = 0; i < documents.length; i++) {
    const doc = documents[i];
    process.stdout.write(`  [${i + 1}/${documents.length}] Embedding "${doc.title.substring(0, 40)}..." `);

    try {
      const embedding = await getEmbedding(doc.content);
      const { data, error: insErr } = await admin.from("knowledge_documents").insert({
        title: doc.title,
        url: doc.url,
        category: doc.category,
        content: doc.content,
        embedding: embedding,
      }).select();

      if (insErr) {
        console.log(`❌ Error: ${insErr.message}`);
      } else {
        console.log(`✓ (dim: ${embedding.length}, id: ${data[0].id.substring(0, 8)})`);
        insertedCount++;
      }
    } catch (err) {
      console.log(`❌ Error: ${err.message}`);
    }

    // Short pause to adhere to Gemini API rate limits
    await new Promise((r) => setTimeout(r, 200));
  }

  // 5. Verification
  console.log("\n[STEP 5] Verifying live pgvector records in public.knowledge_documents...");
  const { data: verifyDocs, error: verifyErr } = await admin
    .from("knowledge_documents")
    .select("id, title, url, category")
    .order("created_at", { ascending: true });

  if (verifyErr) {
    console.error("Verification failed:", verifyErr);
    process.exit(1);
  }

  console.log(`✓ Total documents stored in public.knowledge_documents: ${verifyDocs.length}`);
  console.log("Sample records:");
  verifyDocs.slice(0, 5).forEach((d) => console.log(`  - [${d.category.toUpperCase()}] ${d.title} -> ${d.url}`));

  console.log("\n================================================================================");
  console.log("   VECTOR INGESTION COMPLETE! pgvector RAG KNOWLEDGE BASE IS ONLINE!            ");
  console.log("================================================================================");
}

seedEmbeddings();
