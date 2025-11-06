// database/searchContext.tsx
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { searchProfiles } from '../services/searchService';
import { Profile } from '../services/profileService';
import { normalizeSearchError } from '../errorHandeling/searchErrors';

interface SearchContextType {
  query: string;
  setQuery: (value: string) => void;
  results: Profile[];
  loading: boolean;
  error: string | null;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Keep track of current search to cancel old ones
  const activeSearch = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setError(null);
      return;
    }

    const handler = setTimeout(() => {
      handleSearch(query);
    }, 400); // Slightly shorter debounce feels more responsive

    return () => clearTimeout(handler);
  }, [query]);

  const handleSearch = async (searchTerm: string) => {
    // Cancel previous search if still running
    if (activeSearch.current) activeSearch.current.abort();

    const controller = new AbortController();
    activeSearch.current = controller;

    try {
      setLoading(true);
      setError(null);

      const data = await searchProfiles(searchTerm, { signal: controller.signal });
      setResults(data);

      if (data.length === 0) setError('No users found.');
    } catch (err: any) {
      if (err.name === 'AbortError') return; // ignore canceled searches
      const message = normalizeSearchError(err);
      console.error('Search error:', err);
      setError(message || 'Search Failed');
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
