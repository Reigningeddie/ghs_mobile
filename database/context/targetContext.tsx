// database/targetContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { fetchTargetProfile, TargetProfile } from '../services/targetService';

interface TargetContextType {
  targetUser: TargetProfile | null;
  fetchUser: (userId: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const TargetContext = createContext<TargetContextType | undefined>(undefined);

export const TargetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [targetUser, setTargetUser] = useState<TargetProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async (userId: string) => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchTargetProfile(userId);
      setTargetUser(data);
      console.log(targetUser)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user');
      setTargetUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TargetContext.Provider value={{ targetUser, fetchUser, loading, error }}>
      {children}
    </TargetContext.Provider>
  );
};

export const useTarget = () => {
  const context = useContext(TargetContext);
  if (!context) {
    throw new Error('useTarget must be used within a TargetProvider');
  }
  return context;
};
