import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://agceovuputagifmobils.supabase.co";
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_oAxp9ClDIialYwISJZlUDw__BnPPQWh";

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export type ApplicationStatus = "draft" | "submitted" | "under_review" | "approved" | "rejected";

export type ApplicationRecord = {
  id: string;
  reference_number: string;
  applicant_email: string;
  entry_form: string;
  status: ApplicationStatus;
  created_at: string;
  submitted_at: string | null;
};
