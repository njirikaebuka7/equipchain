import { createClient } from "@supabase/supabase-js";

// =============================================================================
// STRICT SERVER-SIDE SAFEGUARD
// =============================================================================
if (typeof globalThis !== "undefined" && "window" in globalThis) {
  throw new Error("CRITICAL SAFETY VIOLATION: Supabase Server Client (using Service Role Key) was imported on the client-side!");
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.");
}

// Initialize server-side admin client using the high-privilege service role key.
// Always disable session persistence on the server side to keep auth concerns separate and stateless.
export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
