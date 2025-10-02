import { useAuth } from './authContext';
import { Alert } from 'react-native';
import { useState } from 'react';
import { userProfile } from './userContext';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from './supabase';

interface friendsTable {
  id: number;
  user_id: string;
  friend_id: string;
  status: 'pending' | 'accepted' | 'blocked';
};

export const friends = () => {
  const {id} = useLocalSearchParams();
  const { authUser } =useAuth()
  const { user } = userProfile(id as string)
  const [isLoading, setIsLoading] = useState(false)

  const add = async () => {
    if (!authUser.id || !user?.user_id) {
      Alert.alert('Error', 'User not found');
      return; 
    }

    setIsLoading(true);

    try {
      const {data: existingRequest, error: checkErr} = await supabase
        .from('friends')
        .select('*')
        .eq('user_id', authUser?.id)
        .eq('friend_id', user?.user_id)
        .single();
        
        if (checkErr && checkErr.message !== 'No data found') {
          throw checkErr;
        }

        if (existingRequest) {
          Alert.alert('Info', 'Friend request already sent!');
          return;
        } 

        //create new friend request
        const { data, error: insertErr } = await supabase
          .from('friends')
          .insert({
            user_id: authUser?.id,
            friend_id: user?.user_id,
            status: 'pending'
          });

          if (insertErr) throw insertErr;

          Alert.alert('Success', 'Friend request sent!');
    } catch (error) {
      Alert.alert('Error', 'Failed to send friend request:');
      console.error('error sending friend request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { add }
}