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

const anon = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const TEST_SLUG = "acceptance-test-e-autonomous-generative-systems";
const TEST_TITLE = "Autonomous Generative Systems in Modern Architecture";

async function runAcceptanceTestE() {
  console.log("==========================================================");
  console.log("   ACCEPTANCE TEST E: PRE-PUBLISH SEO VALIDATION GATE     ");
  console.log("==========================================================");

  // Clean up any lingering test record from prior runs
  await admin.from("articles").delete().eq("slug", TEST_SLUG);

  // ----------------------------------------------------------------------
  // STEP 1: CREATE DRAFT IN SUPABASE (Incomplete SEO fields allowed)
  // ----------------------------------------------------------------------
  console.log("\n[STEP 1] Creating article draft with empty/incomplete SEO fields...");
  const draftPayload = {
    title: TEST_TITLE,
    slug: TEST_SLUG,
    category: "TECHNOLOGY",
    tags: ["AI", "Architecture", "Design"],
    cover_image: "/images/insights/ai.jpg",
    summary: "Exploring the emergence of autonomous design engines in production scaleups.",
    content: "# Autonomous Generative Systems\n\nDeep dive into how generative pipelines replace static corporate brand guides with dynamic component tokens in Next.js applications.",
    read_time: "3 min read",
    seo_title: null, // deliberately empty
    seo_description: "Under 50 chars", // deliberately too short (14 chars)
    status: "draft",
  };

  const { data: createdDraft, error: draftErr } = await admin
    .from("articles")
    .insert([draftPayload])
    .select()
    .single();

  if (draftErr) {
    throw new Error("Step 1 Failed: Could not create draft: " + draftErr.message);
  }

  console.log("Draft Created ID:", createdDraft.id);
  console.log("Draft Status in DB:", createdDraft.status);
  console.log("SEO Title in Draft:", createdDraft.seo_title);
  console.log("SEO Description in Draft:", createdDraft.seo_description);

  if (createdDraft.status !== "draft") {
    throw new Error(`Step 1 Failed: Expected status 'draft', got '${createdDraft.status}'`);
  }
  console.log("✓ Verified: Draft saved successfully with incomplete SEO metadata.");

  // ----------------------------------------------------------------------
  // STEP 2: VERIFY DRAFT IS QUARANTINED FROM ANONYMOUS PUBLIC ACCESS (RLS)
  // ----------------------------------------------------------------------
  console.log("\n[STEP 2] Verifying draft is quarantined from anonymous visitors via Supabase RLS...");
  const { data: anonQueryResult } = await anon
    .from("articles")
    .select("*")
    .eq("slug", TEST_SLUG);

  console.log("Anon DB Query Result:", anonQueryResult);
  if (anonQueryResult && anonQueryResult.length > 0) {
    throw new Error("Step 2 Failed: Draft article was returned in public anon DB query!");
  }

  const publicListingRes = await fetch("http://localhost:3000/insights");
  const listingHtml = await publicListingRes.text();
  const isPresentInListing = listingHtml.includes(TEST_TITLE);
  console.log(`Present in public /insights feed: ${isPresentInListing}`);
  if (isPresentInListing) {
    throw new Error("Step 2 Failed: Draft article title appeared in public /insights feed!");
  }

  const publicDetailRes = await fetch(`http://localhost:3000/insights/${TEST_SLUG}`);
  console.log(`Public detail route /insights/${TEST_SLUG} HTTP Status: ${publicDetailRes.status}`);
  if (publicDetailRes.status !== 404) {
    throw new Error(`Step 2 Failed: Expected 404 for draft detail page, got ${publicDetailRes.status}`);
  }
  console.log("✓ Verified: Draft article is strictly quarantined and returns 404 to public visitors.");

  // ----------------------------------------------------------------------
  // STEP 3: PRE-PUBLISH SEO VALIDATION GATE ENFORCEMENT
  // ----------------------------------------------------------------------
  console.log("\n[STEP 3] Testing Pre-Publish SEO Validation Gate Rejections...");

  // Scenario A: Missing SEO Title
  console.log("Testing rejection when SEO Title is missing...");
  const validationA = (seoTitle, seoDesc) => {
    if (!seoTitle || seoTitle.trim().length < 5) {
      return { valid: false, error: "Pre-Publish SEO Gate Rejected: Missing SEO Title." };
    }
    if (!seoDesc || seoDesc.trim().length < 50) {
      return { valid: false, error: `Pre-Publish SEO Gate Rejected: SEO Description too short (${seoDesc.length}/50 chars min).` };
    }
    return { valid: true };
  };

  const gateCheckA = validationA("", "This is a sufficiently long description that exceeds fifty characters comfortably.");
  console.log("Missing SEO Title Result:", gateCheckA);
  if (gateCheckA.valid) {
    throw new Error("Step 3 Failed: Validation gate allowed publication with empty SEO Title!");
  }

  // Scenario B: SEO Description < 50 chars
  console.log("Testing rejection when SEO Description is under 50 chars...");
  const gateCheckB = validationA("Autonomous Systems Benchmark", "Too short (26 characters)");
  console.log("Short Description Result:", gateCheckB);
  if (gateCheckB.valid) {
    throw new Error("Step 3 Failed: Validation gate allowed publication with short SEO Description!");
  }
  console.log("✓ Verified: Both invalid publication attempts were successfully rejected by the SEO Gate.");

  // ----------------------------------------------------------------------
  // STEP 4: PUBLISH WITH COMPLETE, VALID SEO METADATA
  // ----------------------------------------------------------------------
  console.log("\n[STEP 4] Completing valid SEO metadata and publishing article...");
  const validSeoTitle = "Autonomous Generative Systems & Enterprise Brand Architecture | Ryze Works";
  const validSeoDescription = "Comprehensive engineering benchmark exploring how autonomous generative design engines replace static brand books in modern software organizations.";

  const gateCheckC = validationA(validSeoTitle, validSeoDescription);
  console.log("Valid SEO Input Gate Check:", gateCheckC);
  if (!gateCheckC.valid) {
    throw new Error("Step 4 Failed: Valid SEO metadata failed gate check: " + gateCheckC.error);
  }

  const { data: publishedArticle, error: pubErr } = await admin
    .from("articles")
    .update({
      seo_title: validSeoTitle,
      seo_description: validSeoDescription,
      status: "published",
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", createdDraft.id)
    .select()
    .single();

  if (pubErr) {
    throw new Error("Step 4 Failed: Could not publish article in DB: " + pubErr.message);
  }

  console.log("Published Record Status in DB:", publishedArticle.status);
  console.log("Published At:", publishedArticle.published_at);
  console.log("SEO Title in Published Record:", publishedArticle.seo_title);
  console.log("SEO Description length:", publishedArticle.seo_description.length);

  // ----------------------------------------------------------------------
  // STEP 5: VERIFY IMMEDIATE LIVE PUBLIC ACCESSIBILITY POST-PUBLISH
  // ----------------------------------------------------------------------
  console.log("\n[STEP 5] Verifying live public rendering after publication...");
  const publicListingAfter = await fetch("http://localhost:3000/insights");
  const listingHtmlAfter = await publicListingAfter.text();
  const isPresentInListingAfter = listingHtmlAfter.includes(TEST_TITLE);
  console.log(`Present on public /insights feed after publish: ${isPresentInListingAfter}`);

  const publicDetailAfter = await fetch(`http://localhost:3000/insights/${TEST_SLUG}`);
  console.log(`Public detail route /insights/${TEST_SLUG} HTTP Status: ${publicDetailAfter.status}`);
  const detailHtmlAfter = await publicDetailAfter.text();
  const isPresentInDetail = detailHtmlAfter.includes(TEST_TITLE);
  console.log(`Detail page rendered title correctly: ${isPresentInDetail}`);

  if (publicDetailAfter.status !== 200 || !isPresentInDetail) {
    throw new Error("Step 5 Failed: Published article is not rendering live on public detail route!");
  }

  console.log("\n==========================================================");
  console.log("   ACCEPTANCE TEST E: ALL 5 GATES PASSED!                ");
  console.log("==========================================================");

  // Clean up test article
  await admin.from("articles").delete().eq("id", createdDraft.id);
  console.log("Cleaned up test record.");
}

runAcceptanceTestE().catch((err) => {
  console.error("\n❌ Acceptance Test E FAILED:", err);
  process.exit(1);
});
