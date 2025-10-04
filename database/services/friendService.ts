// database/friendsService.ts
import { supabase } from '../supabase';

export const checkExistingRequest = async (userId: string, friendId: string) => {
  const { data, error } = await supabase
    .from('friends')
    .select('*')
    .eq('user_id', userId)
    .eq('friend_id', friendId)
    .single();

  // Supabase throws "No data found" if no row exists
  if (error && error.message !== 'No data found') {
    throw error;
  }

  return data;
};

export const createRequest = async (userId: string, friendId: string) => {
  const { data, error } = await supabase
    .from('friends')
    .insert({
      user_id: userId,
      friend_id: friendId,
      status: 'pending'
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};
