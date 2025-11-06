// database/services/searchService.ts
import { supabase } from '../supabase';
import { Profile } from './profileService';

export const searchProfiles = async (
  query: string,
  options?: { signal?: AbortSignal } // ✅ allow abort signal
): Promise<Profile[]> => {
  if (!query.trim()) return [];

  const controller = options?.signal;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .ilike('user_name', `%${query}%`);

  if (controller?.aborted) throw new DOMException('Aborted', 'AbortError');

  if (error) throw error;

  return data || [];
};
