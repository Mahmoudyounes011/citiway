import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// createBrowserClient stores the auth session in COOKIES (not localStorage),
// so the server-side middleware can read and validate it on every request.
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// Helper: Check if user is logged in
export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Helper: Sign out
export async function signOut() {
  return await supabase.auth.signOut();
}

// PROPERTIES =================================================
export async function getAllProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getPropertyBySlug(slug) {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) throw error;
  return data;
}

export async function createProperty(property) {
  const { data, error } = await supabase
    .from('properties')
    .insert([property])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProperty(slug, updates) {
  const { data, error } = await supabase
    .from('properties')
    .update(updates)
    .eq('slug', slug)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProperty(slug) {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('slug', slug);
  if (error) throw error;
  return true;
}

// DEVELOPERS =================================================
export async function getAllDevelopers() {
  const { data, error } = await supabase
    .from('developers')
    .select('*')
    .order('name', { ascending: true });
  if (error) throw error;
  return data;
}

export async function createDeveloper(dev) {
  const { data, error } = await supabase
    .from('developers')
    .insert([dev])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateDeveloper(id, updates) {
  const { data, error } = await supabase
    .from('developers')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteDeveloper(id) {
  const { error } = await supabase
    .from('developers')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}

// IMAGE UPLOAD ===============================================
export async function uploadImage(file, folder = 'properties') {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('images')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function deleteImage(url) {
  // Extract path from URL
  const path = url.split('/images/')[1];
  if (!path) return;

  const { error } = await supabase.storage
    .from('images')
    .remove([path]);

  if (error) console.error('Delete image error:', error);
}

// LEADS / INQUIRIES ==========================================
export async function getAllLeads() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createLead(lead) {
  const { data, error } = await supabase
    .from('leads')
    .insert([lead])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateLeadStatus(id, status) {
  const { data, error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
