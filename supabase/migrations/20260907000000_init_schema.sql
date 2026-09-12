-- ==========================================================
-- RYZE WORKS: Supabase Database Schema, RLS & pgvector Setup
-- ==========================================================

-- Enable pgvector extension for AI retrieval and embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- 1. ENUMS
CREATE TYPE service_group_enum AS ENUM (
  'Strategy', 'Brand + Creative', 'Technology', 'Marketing', 'Experiences'
);

CREATE TYPE content_status_enum AS ENUM (
  'draft', 'published', 'archived'
);

CREATE TYPE testimonial_status_enum AS ENUM (
  'pending', 'approved', 'rejected'
);

CREATE TYPE user_role_enum AS ENUM (
  'public', 'editor', 'admin'
);

-- 2. PROFILES (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role user_role_enum DEFAULT 'public' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  group_name service_group_enum NOT NULL,
  description TEXT NOT NULL,
  deliverables TEXT[] DEFAULT '{}',
  icon TEXT,
  display_order INT DEFAULT 0,
  status content_status_enum DEFAULT 'published' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  category TEXT NOT NULL,
  industry TEXT NOT NULL,
  description TEXT NOT NULL,
  hero_image TEXT NOT NULL,
  gallery TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT TRUE,
  status content_status_enum DEFAULT 'published' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. PROJECT_SERVICES (M2M)
CREATE TABLE IF NOT EXISTS project_services (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, service_id)
);

-- 6. CASE STUDIES TABLE
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  client TEXT NOT NULL,
  title TEXT NOT NULL,
  headline TEXT NOT NULL,
  challenge TEXT NOT NULL,
  strategy TEXT NOT NULL,
  execution TEXT NOT NULL,
  results TEXT NOT NULL,
  accent_color TEXT DEFAULT 'from-purple-950/40 via-indigo-950/20 to-slate-950/60',
  hero_image TEXT NOT NULL,
  tag TEXT,
  status content_status_enum DEFAULT 'published' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  avatar TEXT,
  quote TEXT NOT NULL,
  rating SMALLINT CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  status testimonial_status_enum DEFAULT 'pending' NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  consent_given BOOLEAN DEFAULT FALSE,
  submitted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  reviewed_at TIMESTAMPTZ
);

-- 8. ARTICLES / INSIGHTS
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  cover_image TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT,
  read_time TEXT DEFAULT '5 min read',
  seo_title TEXT,
  seo_description TEXT,
  status content_status_enum DEFAULT 'published' NOT NULL,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 9. LEADS & BRIEF GENERATOR
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT DEFAULT 'project' NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service_interest TEXT,
  message TEXT NOT NULL,
  ai_brief JSONB,
  source TEXT DEFAULT 'website',
  utm_params JSONB,
  page_url TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 10. KNOWLEDGE BASE EMBEDDINGS (For Ryze AI Grounded RAG)
CREATE TABLE IF NOT EXISTS knowledge_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT NOT NULL,
  embedding VECTOR(1536), -- OpenAI Ada/3-small or Gemini text-embedding-004
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Cosine similarity match function for RAG
CREATE OR REPLACE FUNCTION match_knowledge(
  query_embedding VECTOR(1536),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  url TEXT,
  content TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    kd.id,
    kd.title,
    kd.url,
    kd.content,
    1 - (kd.embedding <=> query_embedding) AS similarity
  FROM knowledge_documents kd
  WHERE 1 - (kd.embedding <=> query_embedding) > match_threshold
  ORDER BY kd.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- 11. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_documents ENABLE ROW LEVEL SECURITY;

-- Public read policies (published content only)
CREATE POLICY "Public can view published services" ON services
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view published projects" ON projects
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view published case studies" ON case_studies
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view approved testimonials" ON testimonials
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Public can view published articles" ON articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can search knowledge docs" ON knowledge_documents
  FOR SELECT USING (true);

-- Public insert policies (Contact forms & testimonial submission)
CREATE POLICY "Public can submit contact leads" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can submit testimonials with pending status" ON testimonials
  FOR INSERT WITH CHECK (status = 'pending');

-- Admin/Staff policies (Full access to authenticated admins)
CREATE POLICY "Admins full access profiles" ON profiles
  FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins full access services" ON services
  FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins full access projects" ON projects
  FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins full access case_studies" ON case_studies
  FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins full access testimonials" ON testimonials
  FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins full access articles" ON articles
  FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins full access leads" ON leads
  FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
