import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gxxsvromclerlhqvmwiv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4eHN2cm9tY2xlcmxocXZtd2l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkzNDc4ODUsImV4cCI6MjAwNDkyMzg4NX0.BsipXlz11fw6pRBxbYtWyCgNy3DQUAI4S9kGTqlpbWk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
