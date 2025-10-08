// src/contexts/authContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { supabase } from "../supabase";
import { signUpService, loginService, logoutService } from "../services/authService";
import { normalizeAuthError } from "../errorHandeling/authErrors";

interface AuthContextType {
  authUser: any | null;
  isLoading: boolean;
  err: string | null;
  signUp: (email: string, password: string) => Promise<{ data: any; error?: any }>;
  login: (email: string, password: string) => Promise<{ data: any; error?: any }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authUser, setAuthUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) setAuthUser(session.user);
      else setAuthUser(null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await signUpService(email, password);
      if (error) {
        const message = normalizeAuthError("signup", error.message);
        setErr(message);
        return { data: null, error: { message } };
      }
      return { data, error: null };
    } catch (err: any) {
      const message = err.message ?? "Unexpected error";
      setErr(message);
      return { data: null, error: { message } };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await loginService(email, password);
      if (error) {
        const message = normalizeAuthError("login", error.message);
        setErr(message);
        return { data: null, error: { message } };
      }
      return { data, error: null };
    } catch (err: any) {
      const message = err.message ?? "Unexpected error";
      setErr(message);
      return { data: null, error: { message } };
    }
  };

  const logout = async () => {
    try {
      await logoutService();
      setAuthUser(null);
    } catch (err: any) {
      setErr(err.message || "Failed to log out");
    }
  };

  return (
    <AuthContext.Provider value={{ authUser, isLoading, err, signUp, login, logout }}>
      {!isLoading ? children : (
        <View style={styles.view}><Text style={styles.loading}>Loading...</Text></View>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

const styles = StyleSheet.create({
  view: { flex: 1, alignItems: "center", justifyContent: "center" },
  loading: { fontSize: 30, backgroundColor: "#F5F5F5" },
});
