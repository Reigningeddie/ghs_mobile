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
      profiles!friends_user_id_fkey (user_name: user_name, avatar_url),
      friend_profile:profiles!friends_friend_id_fkey (user_name: user_name, avatar_url)
      `)
      .or(`friend_id.eq.${user_id}, user_id.eq.${user_id}`)
      .order('created_at', { ascending: false });
      
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

export const updateRequestStatus = async (id: number, status: string) => {
  const { error } = await supabase
    .from('friends')
    .update({ status })
    .eq('id', id);
  if (error) throw error;
};

export const deleteRequestStatus = async (id: number) => {
  const { error } = await supabase
    .from('friends')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

export const getFollowersAndFollowing = async (userId: string) => {
  // Count followers: users who have sent you a request that was accepted
  const { count: followersCount, error: followersError } = await supabase
    .from('friends')
    .select('id', { count: 'exact' })
    .eq('friend_id', userId)
    .eq('status', 'accepted');

  if (followersError) throw followersError;

  // Count following: users you have sent a request to that was accepted
  const { count: followingCount, error: followingError } = await supabase
    .from('friends')
    .select('id', { count: 'exact' })
    .eq('user_id', userId)
    .eq('status', 'accepted');

  if (followingError) throw followingError;

  return { followersCount, followingCount };
};