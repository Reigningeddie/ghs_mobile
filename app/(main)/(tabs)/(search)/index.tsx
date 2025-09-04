import {View, TextInput, StyleSheet, Text, FlatList} from 'react-native'
import React, {useState, useEffect} from 'react'
import {supabase} from '../../../../database/supabase';

const Search = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      const timer = setTimeout(() => {
        setLoading(true);
        searchDb(query);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setResult([]);
    }
  }, [query]);

  const searchDb = async (query:string) => {
    if (!query.trim()) {
      setResult([]);
      return;
    }

    try {
      const {data, error} = await supabase
        .from('profile')
        .select('*')
        .ilike('user_name', `%${query}%`);

      if (error) throw error;

      setResult(data);
    } catch (error:any) {
      console.error('Search error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(result)

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
        onChangeText={setQuery} />

        {loading ? (
        <Text style={styles.results}>Loading...</Text>
      ) : result.length > 0 ? (
        <FlatList
          style={styles.results}
          data={result}
          keyExtractor={(item) => item.id.toString()} 
          renderItem={({ item }) => (
            <View>
              {/* <Text>{`${item.firstName} ${item.lastName}`}</Text> */}
              <Text style={styles.users}>{item.use_name}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.results}>No results found</Text>
      )}
    </View>
  )
}

export default Search

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