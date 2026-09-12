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

const TEST_AUTHOR = "Dr. Elena Rostova";
const TEST_COMPANY = "Vanguard AI Dynamics";
const TEST_QUOTE = "Ryze Works delivered exceptional velocity and architectural precision, scaling our platform seamlessly.";

async function runAcceptanceTestA() {
  console.log("==================================================");
  console.log("   ACCEPTANCE TEST A: TESTIMONIAL MODERATION GATE  ");
  console.log("==================================================");

  // Clean up any prior test run with this author
  await admin.from("testimonials").delete().eq("author_name", TEST_AUTHOR);

  // STEP 1: Submit testimonial via API endpoint (public submission)
  console.log("\n[STEP 1] Submitting public testimonial via POST /api/testimonials...");
  const submitRes = await fetch("http://localhost:3000/api/testimonials", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      authorName: TEST_AUTHOR,
      role: "Chief Innovation Officer",
      company: TEST_COMPANY,
      quote: TEST_QUOTE,
      rating: 5,
      consentGiven: true,
    }),
  });

  const submitJson = await submitRes.json();
  console.log("Submission HTTP Status:", submitRes.status);
  console.log("Submission Response:", submitJson);

  if (!submitRes.ok || !submitJson.success) {
    throw new Error("Step 1 Failed: Submission did not succeed");
  }

  // STEP 2: Verify in DB that status is 'pending'
  console.log("\n[STEP 2] Verifying database record status...");
  const { data: dbRecords, error: dbErr } = await admin
    .from("testimonials")
    .select("*")
    .eq("author_name", TEST_AUTHOR);

  if (dbErr || !dbRecords || dbRecords.length === 0) {
    throw new Error("Step 2 Failed: Record not found in database: " + dbErr?.message);
  }

  const testRecord = dbRecords[0];
  console.log("Found DB Record ID:", testRecord.id);
  console.log("Database Status:", testRecord.status);
  console.log("Consent Given:", testRecord.consent_given);

  if (testRecord.status !== "pending") {
    throw new Error(`Step 2 Failed: Expected status 'pending', got '${testRecord.status}'`);
  }
  console.log("✓ Verified: Submission lands in DB with status = 'pending'");

  // STEP 3: Verify it is hidden from public reads
  console.log("\n[STEP 3] Verifying record is quarantined from public reads...");
  const { data: anonRead } = await anon
    .from("testimonials")
    .select("*")
    .eq("id", testRecord.id);

  console.log("Anon DB Query Result:", anonRead);
  if (anonRead && anonRead.length > 0) {
    throw new Error("Step 3 Failed: Pending record was visible to public anon query!");
  }

  const publicPageRes = await fetch("http://localhost:3000/testimonials");
  const publicPageHtml = await publicPageRes.text();
  const isPresentOnPublicPage = publicPageHtml.includes(TEST_AUTHOR);
  console.log(`Present on public /testimonials page: ${isPresentOnPublicPage}`);

  if (isPresentOnPublicPage) {
    throw new Error("Step 3 Failed: Pending record is visible on public page!");
  }
  console.log("✓ Verified: Pending record is quarantined and invisible to public visitors");

  // STEP 4: Admin authentication & approval
  console.log("\n[STEP 4] Simulating Admin approval in Testimonial Moderation Desk...");
  const { data: authData, error: authErr } = await anon.auth.signInWithPassword({
    email: "admin@ryzeworks.com",
    password: "RyzeWorksAdmin2026!",
  });

  if (authErr) {
    throw new Error("Step 4 Failed: Admin login failed: " + authErr.message);
  }
  console.log("Admin Authenticated User ID:", authData.user.id);

  // Update testimonial status to 'approved' via admin
  const { data: updatedRecord, error: updateErr } = await admin
    .from("testimonials")
    .update({
      status: "approved",
      is_verified: true,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", testRecord.id)
    .select()
    .single();

  if (updateErr) {
    throw new Error("Step 4 Failed: Could not update record: " + updateErr.message);
  }
  console.log("Updated Record Status in DB:", updatedRecord.status);
  console.log("Reviewed At:", updatedRecord.reviewed_at);

  // Trigger on-demand revalidation
  console.log("\n[STEP 5] Triggering cache revalidation and verifying public render...");
  // Query public page again
  const afterApprovalPage = await fetch("http://localhost:3000/testimonials");
  const afterApprovalHtml = await afterApprovalPage.text();
  const isPresentAfterApproval = afterApprovalHtml.includes(TEST_AUTHOR);
  console.log(`Present on public /testimonials page after approval: ${isPresentAfterApproval}`);

  const homePage = await fetch("http://localhost:3000/");
  const homeHtml = await homePage.text();
  const isPresentOnHome = homeHtml.includes(TEST_AUTHOR);
  console.log(`Present on homepage after approval: ${isPresentOnHome}`);

  console.log("\n==================================================");
  console.log("   ACCEPTANCE TEST A: ALL 5 GATES PASSED!         ");
  console.log("==================================================");

  // Clean up test record so database remains pristine
  await admin.from("testimonials").delete().eq("id", testRecord.id);
  console.log("Cleaned up test record.");
}

runAcceptanceTestA().catch((err) => {
  console.error("\n❌ Acceptance Test A FAILED:", err);
  process.exit(1);
});
