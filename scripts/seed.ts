import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const envContent = fs.readFileSync("d:\\RYZE WEBSITE\\.env.local", "utf8");
const env: Record<string, string> = {};
envContent.split("\n").forEach((l) => {
  const p = l.split("=");
  if (p.length >= 2) env[p[0].trim()] = p.slice(1).join("=").trim();
});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL || "",
  env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// Run seed logic
require("./seed.js");
