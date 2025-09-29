import { useState, useEffect } from 'react';
import { supabase } from './supabase';

interface profileTable {
  id: number;
  user_id: string;
  user_name: string;
  first_name?: string;
  last_name?: string;
  dom_hand: string;
  points: number;
};

export const userProfile = (userId: string) => {
  const [user, setUser] = useState<profileTable | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', userId)
          .single();

          
        if (fetchError) throw fetchError;

        const typedData: profileTable = data as profileTable;
        setUser(typedData || null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [userId]);

  



  return { user, loading, error };
};
