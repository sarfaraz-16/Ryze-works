CREATE TYPE application_status AS ENUM ('submitted', 'reviewing', 'rejected', 'hired');

CREATE TABLE career_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  department TEXT,
  employment_type TEXT,
  location TEXT,
  badge TEXT,
  status content_status_enum NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE career_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public can read published career roles" ON career_roles FOR SELECT USING (status = 'published');
CREATE POLICY "admins full access career_roles" ON career_roles FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('editor','admin')));
CREATE POLICY "admins can write career_roles" ON career_roles FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('editor','admin')));
CREATE POLICY "admins can update career_roles" ON career_roles FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('editor','admin')));

CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role_id UUID REFERENCES career_roles(id),
  resume_path TEXT,
  status application_status NOT NULL DEFAULT 'submitted',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins full access job_applications" ON job_applications FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('editor','admin')));
CREATE POLICY "anyone can submit an application" ON job_applications FOR INSERT WITH CHECK (true);

GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON career_roles TO postgres, anon, authenticated, service_role;
GRANT ALL ON job_applications TO postgres, anon, authenticated, service_role;

INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "anyone can upload a resume" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'resumes');
CREATE POLICY "only editors/admins can read resumes" ON storage.objects FOR SELECT USING (bucket_id = 'resumes' AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('editor','admin')));

INSERT INTO career_roles (slug, title, department, employment_type, location, badge, status) VALUES
('senior-brand-designer', 'Senior Brand Designer', 'Design', 'Full-time', 'Remote', 'hot', 'published'),
('motion-designer', 'Motion Designer', 'Design', 'Full-time', 'Hybrid · Chennai', 'new', 'published'),
('frontend-engineer', 'Frontend Engineer', 'Engineering', 'Full-time', 'Remote', 'hot', 'published'),
('copywriter-strategist', 'Copywriter & Strategist', 'Strategy', 'Full-time', 'Remote', null, 'published'),
('project-manager', 'Project Manager', 'Operations', 'Full-time', 'Hybrid · Chennai', null, 'published'),
('creative-intern', 'Creative Intern', 'Design', 'Internship', 'Chennai', 'new', 'published');
