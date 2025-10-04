// src/services/profileService.ts
import { supabase } from "../supabase"; // adjust path

export const fetchProfileService = async (userId: string): Promise<{ data: any | null; error: any | null }> => {
  // maybeSingle() returns null if row not found (no throw)
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  return { data: data ?? null, error: error ?? null };
};