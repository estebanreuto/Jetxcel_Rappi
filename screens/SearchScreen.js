import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = ({ route, navigation }) => {
  const [searchQuery, setSearchQuery] = useState(route.params?.query || '');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      performSearch();
    }
  }, []);

  const performSearch = () => {
    // Implement your search logic here
    // For now, we'll just set some dummy results
    const dummyResults = [
      { id: '1', title: 'Result 1' },
      { id: '2', title: 'Result 2' },
      { id: '3', title: 'Result 3' },
    ];
    setSearchResults(dummyResults);
  };

  const renderSearchItem = ({ item }) => (
    <TouchableOpacity style={styles.resultItem}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="¿Qué Buscas?"
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={performSearch}
          autoFocus
        />
        <TouchableOpacity onPress={performSearch} style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={searchResults}
        renderItem={renderSearchItem}
        keyExtractor={(item) => item.id}
        style={styles.resultsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  searchButton: {
    marginLeft: 10,
  },
  resultsList: {
    flex: 1,
  },
  resultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default SearchScreen;

