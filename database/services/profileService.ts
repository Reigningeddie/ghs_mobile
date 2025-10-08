// src/services/profileService.ts
import { supabase } from "../supabase";

export interface Profile {
  id: number;
  user_id: string;
  user_name?: string;
  first_name?: string;
  last_name?: string;
  dom_hand?: string;
  points?: number;
  mobile_number?: string;
}


export const fetchProfileService = async (userId: string): Promise<{ data: Profile | null; error?: any }> => {
  if (!userId) return { data: null, error: { message: "User ID is required" } };

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) throw error;

    return { data: data as Profile, error: null };
  } catch (err: any) {
    console.error("Error fetching profile:", err);
    return { data: null, error: err };
  }
};

export const updateProfileService = async (
  userId: string,
  updates: Partial<Profile>
): Promise<{ data: Profile | null; error?: any }> => {
  if (!userId) return { data: null, error: { message: "User ID is required" } };

  try {
    // Check if profile exists
    const { data: existingProfile, error: fetchError } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") throw fetchError; // ignore "No data" error

    let result;

    if (existingProfile) {
      // Update existing profile
      result = await supabase
        .from("profiles")
        .update({
          first_name: updates.first_name ?? null,
          last_name: updates.last_name ?? null,
          user_name: updates.user_name ?? null,
          mobile_number: updates.mobile_number ?? null,
          dom_hand: updates.dom_hand ?? null,
        })
        .eq("user_id", userId)
        .select()
        .single();
    } else {
      // Insert new profile
      result = await supabase
        .from("profiles")
        .insert({
          user_id: userId,
          first_name: updates.first_name ?? null,
          last_name: updates.last_name ?? null,
          user_name: updates.user_name ?? null,
          mobile_number: updates.mobile_number ?? null,
          dom_hand: updates.dom_hand ?? null,
        })
        .select()
        .single();
    }

    if (result.error) throw result.error;

    return { data: result.data as Profile, error: null };
  } catch (err: any) {
    console.error("Error updating profile:", err);
    return { data: null, error: err };
  }
};
