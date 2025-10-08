// src/errorHandling/profileErrors.ts
export const normalizeProfileError = (error: any) => {
  if (!error) return "Unknown error occurred";
  if (error.message.includes("duplicate")) return "Profile already exists";
  if (error.message.includes("required")) return "Missing required field";
  return error.message;
};
