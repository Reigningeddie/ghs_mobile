import { useState, createContext, useContext, useEffect } from 'react';
import { useAuth } from './authContext';
import { Alert } from 'react-native';
import { useTarget } from './targetContext';
import { checkExistingRequest, createRequest } from '../services/friendService';

interface friendsTable {
  id: number;
  user_id: string;
  friend_id: string;
  status: 'pending' | 'accepted' | 'blocked';
};

interface FriendsContextType {
  addFriend: () => Promise<void>;
  isLoading: boolean;
}

const FriendsContext = createContext<FriendsContextType | undefined>(undefined);

export const FriendsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authUser } =useAuth()
  const { targetUser } = useTarget();
  const [isLoading, setIsLoading] = useState(false)

  const addFriend = async () => {
    if (!authUser.id || !targetUser?.user_id) {
      Alert.alert('Error', 'User not found');
      return; 
    }

    setIsLoading(true);

    try {
      const existingRequest = await checkExistingRequest(authUser.id, targetUser.user_id);

      if (existingRequest) {
        Alert.alert('Info', 'Friend request already sent!');
        return;
      }

      await createRequest(authUser.id, targetUser.user_id);
      Alert.alert('Success', 'Friend request sent!');
    } catch (err) {
      Alert.alert('Error', 'Failed to send friend request');
      console.error('Error sending friend request:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FriendsContext.Provider value={{ addFriend, isLoading }}>
      {children}
    </FriendsContext.Provider>
  );
};

export const useFriends = () => {
  const context = useContext(FriendsContext);
  if (!context) throw new Error('useFriends must be used within FriendsProvider');
  return context;
}