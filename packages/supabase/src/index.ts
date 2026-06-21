import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

export type {
  AppRole,
  ApprovalStatus,
  BookingPathway,
  BookingStatus,
  Database,
  InvoiceStatus,
  Json,
  ProviderPlan,
  VerificationStatus,
} from "./database.types";

export type SupabaseConfig = {
  url: string;
  publishableKey: string;
};

type EnvInput = Record<string, unknown>;

let cachedClient: SupabaseClient<Database> | null = null;
let cachedClientKey: string | null = null;

function readImportMetaEnv(): EnvInput {
  return ((import.meta as ImportMeta & { env?: EnvInput }).env ?? {}) as EnvInput;
}

function readString(env: EnvInput, key: string): string | undefined {
  const value = env[key];
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

export function getSupabaseConfig(env: EnvInput = readImportMetaEnv()): SupabaseConfig | null {
  const url = readString(env, "VITE_SUPABASE_URL");
  const publishableKey = readString(env, "VITE_SUPABASE_PUBLISHABLE_KEY");

  if (!url || !publishableKey) {
    return null;
  }

  return { url, publishableKey };
}

export function isSupabaseConfigured(env: EnvInput = readImportMetaEnv()): boolean {
  return getSupabaseConfig(env) !== null;
}

export function requireSupabaseConfig(env: EnvInput = readImportMetaEnv()): SupabaseConfig {
  const config = getSupabaseConfig(env);

  if (!config) {
    throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY.");
  }

  return config;
}

export function createCareporterSupabaseClient(config: SupabaseConfig): SupabaseClient<Database> {
  return createClient<Database>(config.url, config.publishableKey, {
    auth: {
      autoRefreshToken: true,
      detectSessionInUrl: true,
      persistSession: true,
    },
  });
}

export function getCareporterSupabaseClient(env: EnvInput = readImportMetaEnv()): SupabaseClient<Database> {
  const config = requireSupabaseConfig(env);
  const cacheKey = `${config.url}:${config.publishableKey}`;

  if (!cachedClient || cachedClientKey !== cacheKey) {
    cachedClient = createCareporterSupabaseClient(config);
    cachedClientKey = cacheKey;
  }

  return cachedClient;
}

export function resetCareporterSupabaseClientForTests() {
  cachedClient = null;
  cachedClientKey = null;
}
