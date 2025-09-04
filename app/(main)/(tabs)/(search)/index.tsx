import {View, TextInput, StyleSheet, Text, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {supabase} from '../../../../database/supabase';

// Define the type for the data you're fetching
interface Profile {
  user_name: string;
}

// Custom hook for debouncing a value
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if value changes or component unmounts
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Search = () => {
  const [query, setQuery] = useState<string>('');
  const [result, setResult] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  // Debounce the query with a 500ms delay
  const debouncedQuery = useDebounce<string>(query, 500);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      setLoading(true);
      searchDb(debouncedQuery);
    } else {
      setResult([]);
      setLoading(false);
    }
  }, [debouncedQuery]);

  const searchDb = async (searchQuery: string) => {
    try {
      const {data, error} = await supabase
        .from('profile')
        .select('user_name')
        .ilike('user_name', `%${searchQuery}%`);

      if (error) throw error;

      // Type-check the data before setting the state
      const typedData: Profile[] = data as Profile[];
      setResult(typedData);
    } catch (error: any) {
      console.error('Search error:', error.message);
      setResult([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TextInput
        textContentType="none"
        autoComplete="off"
        spellCheck={false}
        importantForAutofill="no"
        autoCorrect={false}
        style={styles.input}
        placeholder={'Search by name'}
        value={query}
        onChangeText={setQuery}
      />

      {loading ? (
        <Text style={styles.results}>Loading...</Text>
      ) : result.length > 0 ? (
        <FlatList
          style={styles.results}
          data={result}
          keyExtractor={(item) => item.user_name}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.users}>{item.user_name}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.results}>No results found</Text>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    color: '#1B1B1B',
    fontSize: 20,
    borderWidth: 2,
    borderRadius: 5,
    height: 43,
    margin: 15,
    paddingLeft: 15,
  },
  results: {
    padding: 20,
    fontSize: 20
  },
  users: {
    margin: 3,
    fontSize: 23 
  }
})