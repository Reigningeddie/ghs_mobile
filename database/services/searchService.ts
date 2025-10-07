// database/services/searchService.ts
import { supabase } from '../supabase';

export interface Profile {
  id: number;
  user_id: string;
  user_name: string;
}

export const searchProfiles = async (query: string): Promise<Profile[]> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, user_id, user_name')
    .ilike('user_name', `%${query}%`);

  if (error) throw error;
  return data as Profile[];
};
