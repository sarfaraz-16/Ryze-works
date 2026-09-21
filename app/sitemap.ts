import { MetadataRoute } from "next";
import { createAdminClient } from "@/lib/supabase/server";
import { REPORTS_DATA } from "@/data/reportsData";
import { RESOURCES_DATA } from "@/data/resourcesData";

const BASE_URL = "https://ryzeworks.tech";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  // Static Public Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/case-studies`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/insights`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/reports`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/resources`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ai`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/ai/lab`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/testimonials`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/start-a-project`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/advertise`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/media-kit`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/partners`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${BASE_URL}/careers`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cookie-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/ai-disclosure`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic Reports & Resources
  const reportRoutes: MetadataRoute.Sitemap = REPORTS_DATA.map((r) => ({
    url: `${BASE_URL}/reports/${r.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const resourceRoutes: MetadataRoute.Sitemap = RESOURCES_DATA.map((r) => ({
    url: `${BASE_URL}/resources/${r.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // Dynamic Database Routes
  const dynamicDbRoutes: MetadataRoute.Sitemap = [];
  try {
    const supabase = createAdminClient();
    if (supabase) {
      const [servicesRes, projectsRes, caseStudiesRes, articlesRes] = await Promise.all([
        supabase.from("services").select("slug, updated_at").eq("status", "published"),
        supabase.from("projects").select("slug, updated_at").eq("status", "published"),
        supabase.from("case_studies").select("slug, updated_at").eq("status", "published"),
        supabase.from("articles").select("slug, updated_at").eq("status", "published"),
      ]);

      if (servicesRes.data) {
        servicesRes.data.forEach((s) => {
          dynamicDbRoutes.push({
            url: `${BASE_URL}/services/${s.slug}`,
            lastModified: s.updated_at ? new Date(s.updated_at) : currentDate,
            changeFrequency: "weekly",
            priority: 0.85,
          });
        });
      }

      if (projectsRes.data) {
        projectsRes.data.forEach((p) => {
          dynamicDbRoutes.push({
            url: `${BASE_URL}/projects/${p.slug}`,
            lastModified: p.updated_at ? new Date(p.updated_at) : currentDate,
            changeFrequency: "monthly",
            priority: 0.85,
          });
        });
      }

      if (caseStudiesRes.data) {
        caseStudiesRes.data.forEach((c) => {
          dynamicDbRoutes.push({
            url: `${BASE_URL}/case-studies/${c.slug}`,
            lastModified: c.updated_at ? new Date(c.updated_at) : currentDate,
            changeFrequency: "monthly",
            priority: 0.85,
          });
        });
      }

      if (articlesRes.data) {
        articlesRes.data.forEach((a) => {
          dynamicDbRoutes.push({
            url: `${BASE_URL}/insights/${a.slug}`,
            lastModified: a.updated_at ? new Date(a.updated_at) : currentDate,
            changeFrequency: "weekly",
            priority: 0.8,
          });
        });
      }
    }
  } catch (err) {
    console.error("Error generating dynamic sitemap routes:", err);
  }

  return [...staticRoutes, ...reportRoutes, ...resourceRoutes, ...dynamicDbRoutes];
}
