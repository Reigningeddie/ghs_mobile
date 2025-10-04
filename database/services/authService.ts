import { supabase } from "../supabase";

export const signUpService = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });

  // Explicit check: if identities is empty => already registered
  if (data?.user && data.user.identities?.length === 0) {
    return {
      data: null,
      error: { message: "This email is already registered." },
    };
  }

  return { data, error };
};

export const loginService = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};