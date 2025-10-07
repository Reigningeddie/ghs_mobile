// app/(main)/(tabs)/(search)/Search.tsx
import { View, TextInput, StyleSheet, Text, FlatList, Pressable } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useSearch } from '../../../../database/context/searchContext';

const Search = () => {
  const router = useRouter();
  const { query, setQuery, results, loading, error } = useSearch();

  function handlePress(id: string) {
    router.push({
      pathname: 'user',
      params: { id },
    });
  }

  return (
    <View style={styles.body}>
      <TextInput
        style={styles.input}
        placeholder="Search by name"
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
        spellCheck={false}
      />

      {loading && <Text style={styles.results}>Loading...</Text>}
      {error && !loading && <Text style={styles.results}>{error}</Text>}

      {!loading && results.length > 0 && (
        <FlatList
          style={styles.results}
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable onPress={() => handlePress(item.user_id)} style={styles.userDiv}>
              <View style={styles.avatar}></View>
              <Text style={styles.users}>{item.user_name}</Text>
            </Pressable>
          )}
        />
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
  },
  results: {
    padding: 20,
    fontSize: 20,
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
    marginRight: 10,
  },
  users: {
    margin: 3,
    fontSize: 23,
  },
});
