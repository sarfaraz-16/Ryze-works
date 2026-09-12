const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

const envContent = fs.readFileSync("d:\\RYZE WEBSITE\\.env.local", "utf8");
const env = {};
envContent.split("\n").forEach(l => {
  const p = l.split("=");
  if (p.length >= 2) env[p[0].trim()] = p.slice(1).join("=").trim();
});

const supabaseAdmin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function run() {
  console.log("Checking storage buckets...");
  const { data: buckets, error: bErr } = await supabaseAdmin.storage.listBuckets();
  if (bErr) {
    console.error("List buckets error:", bErr);
    return;
  }

  const hasMedia = buckets.some(b => b.name === "media" || b.id === "media");
  if (!hasMedia) {
    console.log("Creating 'media' bucket with public: true...");
    const { data: newB, error: cErr } = await supabaseAdmin.storage.createBucket("media", {
      public: true,
      fileSizeLimit: 52428800 // 50MB
    });
    if (cErr) {
      console.error("Failed to create media bucket:", cErr);
    } else {
      console.log("Successfully created 'media' bucket:", newB);
    }
  } else {
    console.log("'media' bucket already exists.");
  }

  // Inspect column names of tables
  const tables = ["services", "projects", "project_services", "case_studies", "articles", "profiles"];
  for (const t of tables) {
    const { data, error } = await supabaseAdmin.from(t).select("*").limit(0);
    if (error) {
      console.log(`${t} error:`, error.message);
    } else {
      console.log(`${t} query successful.`);
    }
  }
}

run();
