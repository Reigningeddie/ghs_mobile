// src/contexts/auth/authErrors.ts
export const normalizeAuthError = (
  context: "login" | "signup",
  rawMessage?: string
): string => {
  if (!rawMessage) return "Unexpected error occurred.";

  const msg = rawMessage.toLowerCase();

  if (context === "signup") {
    if (msg.includes("already registered") || msg.includes("duplicate key"))
      return "This email is already in use. Please log in instead.";
    if (msg.includes("password"))
      return "Password is too weak. Please choose a stronger one.";
    if (msg.includes("rate limit"))
      return "Too many attempts. Please try again later.";
    return "Sign up failed. Please try again.";
  }

  if (context === "login") {
    if (msg.includes("invalid login credentials"))
      return "Invalid email or password.";
    if (msg.includes("email not confirmed"))
      return "Please confirm your email before logging in.";
    if (msg.includes("rate limit"))
      return "Too many login attempts. Please try again later.";
    return "Login failed. Please try again.";
  }

  return "Unexpected error occurred.";
};