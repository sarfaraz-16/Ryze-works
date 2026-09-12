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

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@ryzeworks.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "RyzeWorksAdmin2026!";

async function setup() {
  console.log("=== Provisioning Admin Account & Initial Testimonials ===");

  // 1. Check if admin user exists in auth.users
  const { data: userList, error: listErr } = await admin.auth.admin.listUsers();
  if (listErr) {
    console.error("Failed to list users:", listErr);
    process.exit(1);
  }

  let adminUser = userList.users.find((u) => u.email === ADMIN_EMAIL);

  if (!adminUser) {
    console.log(`Creating user ${ADMIN_EMAIL}...`);
    const { data: createdUser, error: createErr } = await admin.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: {
        full_name: "Ryze Works Admin",
        role: "admin",
      },
    });

    if (createErr) {
      console.error("Error creating admin user:", createErr);
      process.exit(1);
    }
    adminUser = createdUser.user;
    console.log(`Created admin user with ID: ${adminUser.id}`);
  } else {
    console.log(`Admin user ${ADMIN_EMAIL} exists with ID: ${adminUser.id}`);
    // Ensure password and confirmation are up to date
    await admin.auth.admin.updateUserById(adminUser.id, {
      password: ADMIN_PASSWORD,
      email_confirm: true,
    });
  }

  // 2. Ensure admin profile exists in public.profiles
  const { data: profile, error: pErr } = await admin
    .from("profiles")
    .select("*")
    .eq("id", adminUser.id)
    .single();

  if (!profile) {
    console.log("Creating profile for admin user...");
    const { error: insErr } = await admin.from("profiles").insert([
      {
        id: adminUser.id,
        full_name: "Ryze Works Admin",
        role: "admin",
      },
    ]);
    if (insErr) {
      console.error("Error creating admin profile:", insErr);
      process.exit(1);
    }
    console.log("Admin profile created.");
  } else if (profile.role !== "admin") {
    console.log("Updating profile role to admin...");
    await admin.from("profiles").update({ role: "admin" }).eq("id", adminUser.id);
  } else {
    console.log("Admin profile verified with role: admin.");
  }

  // 3. Seed initial 3 approved testimonials if not already in DB
  const initialApproved = [
    {
      author_name: "Kunal Shah",
      role: "Founder",
      company: "CRED",
      avatar: "/images/testimonials/kunal.jpg",
      quote: "Ryze Works didn't just build our brand — they helped shape our entire business direction.",
      rating: 5,
      is_verified: true,
      is_featured: true,
      status: "approved",
      consent_given: true,
    },
    {
      author_name: "Aadit Palicha",
      role: "Co-founder",
      company: "Zepto",
      avatar: "/images/testimonials/aadit.jpg",
      quote: "They understood our vision better than we did. The results speak for themselves.",
      rating: 5,
      is_verified: true,
      is_featured: true,
      status: "approved",
      consent_given: true,
    },
    {
      author_name: "Amit Gupta",
      role: "Co-founder",
      company: "Yulu",
      avatar: "/images/testimonials/amit.jpg",
      quote: "The team is exceptional — strategic, creative and incredibly execution-focused.",
      rating: 5,
      is_verified: true,
      is_featured: true,
      status: "approved",
      consent_given: true,
    },
  ];

  for (const t of initialApproved) {
    const { data: existing } = await admin
      .from("testimonials")
      .select("id")
      .eq("author_name", t.author_name)
      .eq("company", t.company);

    if (!existing || existing.length === 0) {
      const { error: insErr } = await admin.from("testimonials").insert([t]);
      if (insErr) console.error(`Error inserting testimonial for ${t.author_name}:`, insErr);
      else console.log(`Seeded approved testimonial: ${t.author_name} (${t.company})`);
    } else {
      // Ensure it is approved
      await admin.from("testimonials").update({ status: "approved" }).eq("id", existing[0].id);
      console.log(`Verified approved testimonial: ${t.author_name}`);
    }
  }

  // 4. Summarize database state
  const { data: allProfiles } = await admin.from("profiles").select("id, full_name, role");
  const { data: testCounts } = await admin.from("testimonials").select("status");
  const pendingCount = testCounts.filter((t) => t.status === "pending").length;
  const approvedCount = testCounts.filter((t) => t.status === "approved").length;

  console.log("\n=== Summary ===");
  console.log("Profiles count:", allProfiles.length, allProfiles);
  console.log(`Testimonials: ${approvedCount} approved, ${pendingCount} pending, total: ${testCounts.length}`);
  console.log("Admin email:", ADMIN_EMAIL);
  console.log("Admin password:", ADMIN_PASSWORD);
  console.log("Setup complete!\n");
}

setup();
