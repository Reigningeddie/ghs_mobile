import { supabase } from '../supabase';

export type LeaderboardPlayer = {
  id: string;
  user_name: string;
  avatar_url?: string | null;
  points: number;
};

export const fetchLeaderboard = async (): Promise<LeaderboardPlayer[]> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, user_name, avatar_url, points')
    .order('points', { ascending: false });

  if (error) throw error;

  console.log(data)
  return data as LeaderboardPlayer[];
};