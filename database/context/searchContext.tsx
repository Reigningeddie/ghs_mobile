// database/searchContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { searchProfiles } from '../services/searchService';
import { Profile } from '../services/profileService';
import { normalizeSearchError } from '../errorHandeling/searchErrors';
import { useAuth } from './authContext';

interface SearchContextType {
  query: string;
  setQuery: (value: string) => void;
  results: Profile[];
  loading: boolean;
  error: string | null;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authUser } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim()) handleSearch(query);
      else setResults([]);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  const handleSearch = async (searchTerm: string) => {
    try {
      setLoading(true);
      setError(null);

      // pass the current user's id to exclude from results
      const data = await searchProfiles(searchTerm);

      setResults(data);
      if (data.length === 0) setError('No users found.');
    } catch (err) {
      const message = normalizeSearchError(err);
      console.error('Search error:', err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContext.Provider value={{ query, setQuery, results, loading, error }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error('useSearch must be used within a SearchProvider');
  return context;
};
