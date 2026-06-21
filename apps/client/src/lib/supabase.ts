import {
  getCareporterSupabaseClient,
  getSupabaseConfig,
  isSupabaseConfigured,
  requireSupabaseConfig,
} from "@careporter/supabase";

export const supabaseConfig = getSupabaseConfig();
export const hasSupabaseConfig = isSupabaseConfigured();
export const requireClientSupabaseConfig = requireSupabaseConfig;
export const getSupabaseClient = getCareporterSupabaseClient;
