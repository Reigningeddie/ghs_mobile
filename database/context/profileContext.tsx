// src/contexts/profileContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchProfileService, updateProfileService, Profile } from "../services/profileService";
import { Alert } from "react-native";
import { useAuth } from "./authContext"; // ✅ import your auth context

interface ProfileContextType {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  isProfileComplete: boolean;
  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authUser } = useAuth(); // ✅ get the logged-in user from AuthContext
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  const checkProfileComplete = (data: Profile | null) => {
    if (!data) return false;
    return !!(data.user_name && data.first_name && data.dom_hand);
  };

  const fetchProfile = async (userId: string) => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await fetchProfileService(userId);
    if (error) {
      setError(error.message);
      Alert.alert("Error", error.message);
    } else if (data) {
      setProfile(data);
      setIsProfileComplete(checkProfileComplete(data));
    }
    setIsLoading(false);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    const userId = authUser?.id;
    if (!userId) return;
      setIsLoading(true);
      setError(null);
    const { data, error } = await updateProfileService(userId, updates);
      if (error) {
        setError(error.message);
      Alert.alert("Error", error.message);
    } else if (data) {
        setProfile(data);
        setIsProfileComplete(checkProfileComplete(data));
    }
    setIsLoading(false);
  };

  // ✅ Automatically fetch profile when user logs in or changes
  useEffect(() => {
  if (!authUser?.id) {
    setProfile(null);
    setIsProfileComplete(false);
    return;
  }

  // only refetch if user actually changed
  if (profile?.user_id !== authUser.id) {
    fetchProfile(authUser.id);
  }
}, [authUser?.id]);


  return (
    <ProfileContext.Provider
      value={{
        profile,
        isLoading,
        error,
        isProfileComplete,
        fetchProfile,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within a ProfileProvider");
  return context;
};
