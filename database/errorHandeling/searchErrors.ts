// database/errorHandling/searchErrors.ts
export const searchErrorMessages = {
  network: 'Network connection failed. Please try again later.',
  noResults: 'No users found.',
  generic: 'An unexpected error occurred during search.',
};

export const normalizeSearchError = (error: any): string => {
  if (error?.message?.includes('Failed to fetch')) return searchErrorMessages.network;
  return searchErrorMessages.generic;
};
