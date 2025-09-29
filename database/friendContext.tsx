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
  status: ['pending', 'accepted', 'blocked'];
};

export const friends = () => {
  const {id} = useLocalSearchParams();
  const { authUser, isLoading: authIsLoading } =useAuth()
  const {user} = userProfile(id as string)
  const [isLoading, setIsLoading] = useState(false)

  const add = async () => {
    if (!authUser.id || (!user as any).user_id) {
      Alert.alert('User not found');
      return; 
    }

    

    setIsLoading(true);


    try {
      const {data, error: err} = await supabase
        .from('friends')
        .insert({
          user_id: authUser?.id,
          friend_id: user?.user_id,
          status: 'pending'
        })
        Alert.alert('Friend Request sent');
        if (err) throw err;
    } catch (error) {
      Alert.alert('Failed to add friend');
      console.log('add friend error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return { add }
}