import {View, TextInput, StyleSheet, Text, FlatList, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useRouter} from 'expo-router';
import {supabase} from '../../../../database/supabase';

// Define the type for the data you're fetching
interface Profile {
  id: number;
  user_id: string;
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
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [result, setResult] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  function handlePress(id: string) {
    router.push({
      pathname: 'user', 
      params: {id}
    });
  }
  
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
        .from('profiles')
        .select('id, user_id, user_name')
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
    <View style={styles.body}>
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
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable onPress={() => handlePress(item.user_id)} style={styles.userDiv}>
              <View style={styles.avatar}></View>
              <Text style={styles.users}>{item.user_name}</Text>
            </Pressable>
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
  body: {
    backgroundColor: '#D9D9D9',
    flex: 1,
  },
  input: {
    color: '#1B1B1B',
    fontSize: 20,
    borderWidth: 2,
    borderRadius: 5,
    height: 45,
    margin: 15,
    paddingLeft: 15,
    paddingTop: 0,
    paddingBottom: 0,
  },
  results: {
    padding: 20,
    fontSize: 20
  },
  userDiv: {
    height: 50,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: '#437BA1FF',
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: '#1B1B1B',
    borderRadius: 3,
    marginRight: 10
  },
  users: {
    margin: 3,
    fontSize: 23,
  }
})