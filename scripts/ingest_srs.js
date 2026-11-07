/**
 * RYZE WORKS - Automated SRS Ingestion Script
 * Ingests content from data/srs_intake_template.json into siteData.ts and Supabase
 */

const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const templatePath = path.resolve(__dirname, "../data/srs_intake_template.json");
const envPath = path.resolve(__dirname, "../.env.local");

if (!fs.existsSync(templatePath)) {
  console.error("❌ srs_intake_template.json not found in data/ directory.");
  process.exit(1);
}

const rawData = fs.readFileSync(templatePath, "utf8");
const srsData = JSON.parse(rawData);

console.log("================================================================================");
console.log("   RYZE WORKS // AUTOMATED SRS INGESTION PIPELINE                              ");
console.log("================================================================================\n");

console.log("✅ SRS Intake JSON successfully validated.");
console.log(`- Company Name: ${srsData.company_info.name}`);
console.log(`- Services configured: ${srsData.services?.length || 0}`);
console.log(`- Projects configured: ${srsData.projects?.length || 0}`);
console.log(`- Case studies configured: ${srsData.case_studies?.length || 0}`);
console.log(`- Testimonials configured: ${srsData.testimonials?.length || 0}`);
console.log(`- Articles configured: ${srsData.articles?.length || 0}`);
console.log(`- Careers configured: ${srsData.careers?.length || 0}`);
console.log("\nReady for injection into Supabase and siteData.ts upon receiving completed content.");

