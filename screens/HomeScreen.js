import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MoviesContext } from '../context/MoviesContextProvider';

export default function HomeScreen() {
  const {
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    loading,
  } = useContext(MoviesContext);

  const [selectedCategory, setSelectedCategory] = useState('popular');

  const getFilteredMovies = () => {
    switch (selectedCategory) {
      case 'popular':
        return popularMovies;
      case 'top_rated':
        return topRatedMovies;
      case 'upcoming':
        return upcomingMovies;
      default:
        return [];
    }
  };

  const filteredMovies = getFilteredMovies();

  if (loading) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Popular" value="popular" />
        <Picker.Item label="Top Movies" value="top_rated" />
        <Picker.Item label="Upcoming Movies" value="upcoming" />
      </Picker>

      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.movie}>{item.title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  picker: {
    marginBottom: 10,
  },
  movie: {
    fontSize: 16,
    padding: 8,
  },
});
