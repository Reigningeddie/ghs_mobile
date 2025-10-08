import { createContext, useContext, useState } from "react";
import { addPointsService } from "../services/gameService";
import { fetchProfileService } from '../services/profileService'
import { useAuth } from "./authContext";
import { useProfile } from './profileContext';

interface AddPointsResult {
  data: any | null;
  error: { message: string } | null;
}

interface GameContextType {
  addPoints: (amount: number) => Promise<AddPointsResult>;
  isAdding: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authUser } = useAuth();
  const { isProfileComplete } = useProfile();
  const [isAdding, setIsAdding] = useState(false);

  const addPoints = async (amount: number): Promise<AddPointsResult> => {
    if (!authUser || !isProfileComplete) {
      console.log("Profile incomplete — cannot add points");
      return {data: null, error: {message: 'complete profile first'}};
    }

    setIsAdding(true);
    try {
      const result = await addPointsService(authUser.id, amount); // service returns {data, error}
      await fetchProfileService(authUser.id); // refresh profile
      return result;
    } catch (err: any) {
      console.error("Error adding points:", err);
      return { data: null, error: { message: err.message } };
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <GameContext.Provider value={{ addPoints, isAdding }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within a GameProvider");
  return context;
};
