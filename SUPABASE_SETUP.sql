-- ═══════════════════════════════════════════════════════════════
-- CITIWAY DATABASE SCHEMA
-- ═══════════════════════════════════════════════════════════════
-- Run this entire file in Supabase SQL Editor
-- (Dashboard → SQL Editor → New Query → Paste this → Run)
-- ═══════════════════════════════════════════════════════════════

-- ============= PROPERTIES TABLE =============
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  developer TEXT,
  location TEXT NOT NULL,
  sub_location TEXT,
  category TEXT NOT NULL CHECK (category IN ('off-plan', 'sale', 'rent')),
  type TEXT,
  status TEXT,
  featured BOOLEAN DEFAULT false,
  hidden BOOLEAN DEFAULT false,
  price TEXT,
  price_from BIGINT,
  price_unit TEXT,
  completion TEXT,
  payment_plan TEXT,
  roi TEXT,
  bedrooms TEXT,
  bathrooms TEXT,
  area_min INTEGER,
  area_max INTEGER,
  unit TEXT DEFAULT 'sq ft',
  cover_image TEXT,
  gallery JSONB DEFAULT '[]',
  description TEXT,
  long_description TEXT,
  features JSONB DEFAULT '[]',
  amenities JSONB DEFAULT '[]',
  payment_schedule JSONB DEFAULT '[]',
  nearby JSONB DEFAULT '[]',
  location_lat NUMERIC,
  location_lng NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============= DEVELOPERS TABLE =============
CREATE TABLE IF NOT EXISTS developers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  founded TEXT,
  headquartered TEXT,
  description TEXT,
  logo TEXT,
  cover_image TEXT,
  website TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============= LEADS TABLE =============
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  message TEXT,
  property_slug TEXT,
  source TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============= ENABLE RLS =============
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE developers ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- ============= POLICIES =============
-- Anyone can read non-hidden properties
CREATE POLICY "Public can view non-hidden properties"
  ON properties FOR SELECT
  USING (hidden = false OR auth.role() = 'authenticated');

-- Only authenticated users can modify
CREATE POLICY "Authenticated users can insert properties"
  ON properties FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update properties"
  ON properties FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete properties"
  ON properties FOR DELETE
  TO authenticated
  USING (true);

-- Developers - public read, admin write
CREATE POLICY "Public can view developers"
  ON developers FOR SELECT
  USING (true);

CREATE POLICY "Authenticated can manage developers"
  ON developers FOR ALL
  TO authenticated
  USING (true);

-- Leads - anyone can create (contact form), only admin can read
CREATE POLICY "Anyone can create leads"
  ON leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated can view leads"
  ON leads FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can update leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (true);

-- ============= STORAGE BUCKET =============
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Public can view images
CREATE POLICY "Public can view images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');

-- Authenticated can upload
CREATE POLICY "Authenticated can upload images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'images');

-- Authenticated can delete
CREATE POLICY "Authenticated can delete images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'images');

-- ============= AUTO-UPDATE TIMESTAMPS =============
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_developers_updated_at
  BEFORE UPDATE ON developers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ═══════════════════════════════════════════════════════════════
-- DONE! Your database is ready.
-- ═══════════════════════════════════════════════════════════════
