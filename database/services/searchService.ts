// database/services/searchService.ts
import { supabase } from "../supabase";
import { Profile } from './profileService';

export const searchProfiles = async (
  query: string,
): Promise<Profile[]> => {
  if (!query.trim()) return [];

  let queryBuilder = supabase
    .from("profiles")
    .select("id, user_id, user_name")
    .ilike("user_name", `%${query}%`);

  const { data, error } = await queryBuilder;

  if (error) throw error;
  return data as Profile[];
};
