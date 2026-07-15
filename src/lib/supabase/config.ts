export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return {
    url,
    key,
    isConfigured: Boolean(url && key),
  };
}

export function isPreviewAuthEnabled() {
  const mode = process.env.NEXT_PUBLIC_AUTH_MODE ?? process.env.AUTH_MODE;
  const config = getSupabaseConfig();

  return mode === "preview" || (!config.isConfigured && mode !== "supabase");
}
