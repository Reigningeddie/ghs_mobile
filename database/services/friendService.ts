// database/friendsService.ts
import { supabase } from '../supabase';

export const checkExistingRequest = async (userId: string, friendId: string) => {
  const { data, error } = await supabase
    .from('friends')
    .select('*')
    .eq('user_id', userId)
    .eq('friend_id', friendId)
    .maybeSingle();

  // Supabase throws "No data found" if no row exists
  if (error && error.message !== 'No data found') {
    throw error;
  }

  return data;
};

export const getFriendRequests = async (user_id: string) => {
  const { data , error } = await supabase
    .from('friends')
    .select(`
      id,
      user_id,
      friend_id,
      status,
      created_at,
      profiles!friends_user_id_fkey (user_name),
      friend_profile:profiles!friends_friend_id_fkey (username)
      `)
      .or(`friend_id.eq.${user_id}, user_id.eq.${user_id}`)
      .order('create_at', { ascending: false });
      
      if (error) throw error;
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
