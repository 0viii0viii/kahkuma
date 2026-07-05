import { supabase, resolveModelUrl } from './supabase.js';

// All artworks from Supabase, shaped like the static curated entries.
export async function fetchWorks() {
  const { data, error } = await supabase
    .from('works')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) {
    console.warn('fetchWorks:', error.message);
    return [];
  }
  return (data || []).map((w) => ({
    id: w.id,
    title: w.title,
    caption: w.caption || '',
    year: w.year || '',
    medium: w.medium || '3D Sculpture · GLB',
    file: resolveModelUrl(w.file),
    palette: w.palette || undefined,
    accent: '#9a9ea3',
  }));
}
