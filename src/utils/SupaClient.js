import { createClient } from "@supabase/supabase-js";

const supabase_url = "https://wciaxcvrseypqzeyfgjc.supabase.co";

const supabase_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjaWF4Y3Zyc2V5cHF6ZXlmZ2pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0MTMwNzUsImV4cCI6MjA0MDk4OTA3NX0.LPLuq_KGkCShh7K096UB1xCcv75EmKgPYu9SigQRrKE ";

export const supabase = createClient(supabase_url, supabase_key);
