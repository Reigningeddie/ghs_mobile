// database/targetService.ts
import { supabase } from '../supabase';

export interface TargetProfile {
  id: number;
  user_id: string;
  user_name: string;
  first_name?: string;
  last_name?: string;
  dom_hand: string;
  points: number;
}

export const fetchTargetProfile = async (userId: string): Promise<TargetProfile | null> => {
  if (!userId) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data as TargetProfile;
};
