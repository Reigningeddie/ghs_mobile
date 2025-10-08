// database/services/gameService.ts
import { supabase } from "../supabase";

export const addPointsService = async (userId: string, amount: number) => {
  if (!userId) throw new Error("User ID is required");

  // Get current points
  const { data: profile, error: fetchError } = await supabase
    .from('profiles')
    .select('id, points')
    .eq('user_id', userId)
    .single();

  if (fetchError) throw fetchError;

  const newPoints = (profile?.points || 0) + amount;

  // Update points
  const { data, error: updateError } = await supabase
    .from('profiles')
    .update({ points: newPoints })
    .eq('id', profile.id)
    .select()
    .single();

  if (updateError) throw updateError;

  return data;
};
