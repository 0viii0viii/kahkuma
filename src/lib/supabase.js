import { createClient } from '@supabase/supabase-js';

// Publishable key + project URL are safe to ship in client code (like a Firebase
// config). All writes are gated by RLS to the artist's email; the anon/public
// key can only read the gallery.
const SUPABASE_URL = 'https://fapgsgcxgneifmwosbjt.supabase.co';
const SUPABASE_KEY = 'sb_publishable_1Ea9hnoHb3QwJ2w8oaNrHg_KJp053To';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Public URL for a stored model object (bucket: models).
export const modelUrl = (path) =>
  supabase.storage.from('models').getPublicUrl(path).data.publicUrl;

// Resolve a work's `file` to a loadable URL. Curated works keep local files
// (e.g. "/models/foo.glb"); uploaded works store a storage object path.
export const resolveModelUrl = (file) =>
  /^(https?:)?\//.test(file) ? file : modelUrl(file);
