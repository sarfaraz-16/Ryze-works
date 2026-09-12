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

const TEST_ADVERTISER = {
  company: "Apex Neural Dynamics",
  name: "Dr. Elena Vance",
  email: "elena.vance+test@apexneural.io",
  website: "https://apexneural.io",
  type: "advertiser",
  budget: "$15k-$30k",
  timeline: "Q4 2026",
  service_interest: ["Sponsored Insights", "Report Sponsorship"],
  message: "Commercial Partnership Inquiry: Launch developer awareness for Apex Inference SDK v2. Target Categories: AI, Technology. Placements: Sponsored Insights, Report Sponsorship. Budget: $15k-$30k. Timeline: Q4 2026. Website: https://apexneural.io",
  source: "/advertise",
};

async function runPhase4Verification() {
  console.log("================================================================================");
  console.log("   RYZE WORKS // PHASE 4 VERIFICATION GATE                                     ");
  console.log("   Staff CRM Pipeline, Commercial Capture Portals, & Applicant Management Desk  ");
  console.log("================================================================================\n");

  let testLeadId = null;

  try {
    // -------------------------------------------------------------------------
    // TEST 1: COMMERCIAL ADVERTISER INTAKE VIA /advertise -> POST /api/leads
    // -------------------------------------------------------------------------
    console.log("[CHECKPOINT 1] Submitting Commercial Lead via POST /api/leads (/advertise flow)...");

    // Clean up any existing test records with this email
    await admin.from("leads").delete().eq("email", TEST_ADVERTISER.email);

    const submitRes = await fetch("http://localhost:3000/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(TEST_ADVERTISER),
    });

    const submitJson = await submitRes.json();
    console.log("  HTTP Status Code:", submitRes.status);
    console.log("  API Response Body:", JSON.stringify(submitJson, null, 2));

    const testLeadIdRetrieved = submitJson.leadId || submitJson.lead?.id;
    if (!submitRes.ok || !submitJson.success || !testLeadIdRetrieved) {
      throw new Error(`Checkpoint 1 Failed: Lead submission failed with status ${submitRes.status}`);
    }

    testLeadId = testLeadIdRetrieved;
    console.log(`  ✓ Lead successfully generated with ID: ${testLeadId}`);

    // -------------------------------------------------------------------------
    // TEST 2: VERIFY LEAD IN DATABASE & STAFF CRM DESK FILTERING
    // -------------------------------------------------------------------------
    console.log("\n[CHECKPOINT 2] Verifying lead in public.leads table & CRM filtering properties...");

    const { data: leadRecord, error: leadErr } = await admin
      .from("leads")
      .select("*")
      .eq("id", testLeadId)
      .single();

    if (leadErr || !leadRecord) {
      throw new Error(`Checkpoint 2 Failed: Could not retrieve lead from database: ${leadErr?.message}`);
    }

    console.log("  Database Lead Record:");
    console.log(`    - ID: ${leadRecord.id}`);
    console.log(`    - Company: ${leadRecord.company}`);
    console.log(`    - Name: ${leadRecord.name}`);
    console.log(`    - Email: ${leadRecord.email}`);
    console.log(`    - Type: ${leadRecord.type} (Expected: 'advertiser')`);
    console.log(`    - Status: ${leadRecord.status} (Expected: 'new')`);
    console.log(`    - Source: ${leadRecord.source}`);
    console.log(`    - Budget: ${leadRecord.budget}`);
    console.log(`    - Timeline: ${leadRecord.timeline}`);
    console.log(`    - Service Interest: ${JSON.stringify(leadRecord.service_interest)}`);

    if (leadRecord.type !== "advertiser") {
      throw new Error(`Checkpoint 2 Failed: Expected type 'advertiser', got '${leadRecord.type}'`);
    }
    if (leadRecord.status !== "new") {
      throw new Error(`Checkpoint 2 Failed: Expected initial status 'new', got '${leadRecord.status}'`);
    }
    console.log("  ✓ Verified: Record correctly classified as type = 'advertiser' with status = 'new'");

    // Query /admin/leads CRM filter logic simulation
    const { data: advertiserLeads, error: filterErr } = await admin
      .from("leads")
      .select("*")
      .eq("type", "advertiser");

    if (filterErr) throw filterErr;
    console.log(`  ✓ Verified: Leads table currently holds ${advertiserLeads.length} advertiser lead(s) for the ADVERTISER CRM tab`);

    // -------------------------------------------------------------------------
    // TEST 3: LEAD LIFECYCLE MUTATION (new -> reviewing -> contacted)
    // -------------------------------------------------------------------------
    console.log("\n[CHECKPOINT 3] Mutating Lead Lifecycle Status ('new' -> 'reviewing')...");

    const { data: updatedLead, error: updateLeadErr } = await admin
      .from("leads")
      .update({ status: "reviewing" })
      .eq("id", testLeadId)
      .select()
      .single();

    if (updateLeadErr || !updatedLead) {
      throw new Error(`Checkpoint 3 Failed: Lead status mutation failed: ${updateLeadErr?.message}`);
    }

    console.log(`  Updated Lead Status: '${updatedLead.status}'`);
    if (updatedLead.status !== "reviewing") {
      throw new Error(`Checkpoint 3 Failed: Expected status 'reviewing', got '${updatedLead.status}'`);
    }
    console.log("  ✓ Verified: Database instantly reflects lead lifecycle progression to 'reviewing'");

    // -------------------------------------------------------------------------
    // TEST 4: APPLICANT REVIEW DESK & SECURE SIGNED RESUME URL (300 SECONDS)
    // -------------------------------------------------------------------------
    console.log("\n[CHECKPOINT 4] Candidate Dossier & Signed Private Resume URL Generation...");

    // Fetch existing job application joined with career_roles
    const { data: applications, error: appErr } = await admin
      .from("job_applications")
      .select("*, career_roles(id, title, department)")
      .order("created_at", { ascending: false });

    if (appErr || !applications || applications.length === 0) {
      throw new Error(`Checkpoint 4 Failed: No candidate applications found: ${appErr?.message}`);
    }

    const testApp = applications[0];
    console.log(`  Target Application ID: ${testApp.id}`);
    console.log(`  Candidate Name: ${testApp.applicant_name}`);
    console.log(`  Candidate Email: ${testApp.email}`);
    console.log(`  Role Applied: ${testApp.career_roles?.title || "General"} (${testApp.career_roles?.department || "General"})`);
    console.log(`  Current Status: ${testApp.status}`);
    console.log(`  Private Resume Storage Path: '${testApp.resume_path}'`);

    // Verify storage bucket is private
    const { data: buckets } = await admin.storage.listBuckets();
    const resumeBucket = buckets?.find((b) => b.name === "resumes");
    console.log(`  Resumes Bucket Configuration:`, resumeBucket ? { id: resumeBucket.id, public: resumeBucket.public } : "Not Found");

    if (resumeBucket && resumeBucket.public === true) {
      throw new Error("SECURITY FAILURE: Resumes storage bucket is marked public! Resumes must be strictly private.");
    }
    console.log("  ✓ Verified: 'resumes' bucket is strictly private (public = false)");

    // Test generating a 300-second signed URL using admin client
    console.log("  Generating 300-second signed URL via Supabase Storage Service Role...");
    const { data: signedData, error: signedErr } = await admin.storage
      .from("resumes")
      .createSignedUrl(testApp.resume_path, 300);

    if (signedErr || !signedData?.signedUrl) {
      throw new Error(`Checkpoint 4 Failed: Failed to generate signed URL: ${signedErr?.message}`);
    }

    console.log("  Signed URL Result:");
    console.log(`    ${signedData.signedUrl.substring(0, 100)}...[token truncated]`);

    if (!signedData.signedUrl.includes("token=")) {
      throw new Error("Checkpoint 4 Failed: Generated URL does not contain signed authentication token");
    }

    // Verify fetching the signed URL returns HTTP 200
    console.log("  Verifying signed URL access via HTTP GET...");
    const signedFetchRes = await fetch(signedData.signedUrl);
    console.log(`  Signed URL Response Code: ${signedFetchRes.status} ${signedFetchRes.statusText}`);
    console.log(`  Content-Type: ${signedFetchRes.headers.get("content-type")}`);
    console.log(`  Content-Length: ${signedFetchRes.headers.get("content-length")} bytes`);

    if (!signedFetchRes.ok) {
      throw new Error(`Checkpoint 4 Failed: Signed URL fetch returned status ${signedFetchRes.status}`);
    }
    console.log("  ✓ Verified: Signed resume URL resolves with HTTP 200 OK and valid file stream (300s TTL)");

    // Test unauthenticated direct access without signed token to prove quarantine
    const rawPublicUrl = `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resumes/${testApp.resume_path}`;
    const rawFetchRes = await fetch(rawPublicUrl);
    console.log(`  Unauthenticated Public Access Attempt Code: ${rawFetchRes.status}`);
    if (rawFetchRes.status === 200) {
      throw new Error("SECURITY FAILURE: Resume was accessible via unauthenticated public URL!");
    }
    console.log("  ✓ Verified: Direct unauthenticated public requests are blocked (HTTP 400/404)");

    // -------------------------------------------------------------------------
    // TEST 5: APPLICATION STATUS LIFECYCLE UPDATE
    // -------------------------------------------------------------------------
    console.log("\n[CHECKPOINT 5] Updating Application Lifecycle Status ('submitted' -> 'reviewing')...");

    const { data: updatedApp, error: updateAppErr } = await admin
      .from("job_applications")
      .update({ status: "reviewing" })
      .eq("id", testApp.id)
      .select()
      .single();

    if (updateAppErr || !updatedApp) {
      throw new Error(`Checkpoint 5 Failed: Failed to update application status: ${updateAppErr?.message}`);
    }

    console.log(`  Application Status successfully transitioned to: '${updatedApp.status}'`);
    console.log("  ✓ Verified: Application lifecycle status updated and persisted");

    // Reset status back to 'submitted' for cleanliness
    await admin
      .from("job_applications")
      .update({ status: "submitted" })
      .eq("id", testApp.id);
    console.log("  ✓ Reset application status to 'submitted' for ongoing candidate triage");

    // Clean up test lead
    await admin.from("leads").delete().eq("id", testLeadId);
    console.log(`  ✓ Cleaned up temporary test lead ${testLeadId}`);

    console.log("\n================================================================================");
    console.log("   ALL PHASE 4 ACCEPTANCE CRITERIA & VERIFICATION GATES PASSED CLEANLY!         ");
    console.log("================================================================================");
  } catch (error) {
    console.error("\n❌ PHASE 4 VERIFICATION FAILED:", error);
    if (testLeadId) {
      await admin.from("leads").delete().eq("id", testLeadId);
    }
    process.exit(1);
  }
}

runPhase4Verification();
